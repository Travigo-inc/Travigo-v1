// src/controllers/itinerary.controller.js
import mongoose from 'mongoose';
import Itinerary from '../models/Itinerary.models.js';
import Destination from '../models/destination.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Helper: calculate total days between two dates (inclusive)
 */
const calcTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // round to full days, inclusive
  const diffMs = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1); // +1 inclusive
  return days;
};

/**
 * Helper: compute cost_breakdown from daily_plan (if provided)
 * - expects daily_plan to be an array of { activities: [{ estimated_cost }], ... }
 */
const computeCostBreakdown = (daily_plan = [], existing = {}) => {
  let transport = 0,
    accommodation = 0,
    activities = 0;
  for (const day of daily_plan) {
    if (!day || !Array.isArray(day.activities)) continue;
    for (const act of day.activities) {
      const c = Number(act.estimated_cost || 0);
      // take heuristics from act keys (if item type available)
      if (act.accommodation_id || act.accommodation) accommodation += c;
      else if (act.transport_mode) transport += c;
      else activities += c;
    }
  }
  const total = transport + accommodation + activities;
  return {
    transport: transport || existing.transport || 0,
    accommodation: accommodation || existing.accommodation || 0,
    activities: activities || existing.activities || 0,
    total,
    currency: existing.currency || 'INR',
  };
};

/**
 * POST /api/itineraries
 * Create a new itinerary (user must be logged in)
 * Body: { destination (id or slug), start_date, end_date, budget, travel_style, trip_name }
 */
export const createItinerary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { destination, start_date, end_date, budget, travel_style, trip_name } =
    req.body;

  if (!destination || !start_date || !end_date) {
    throw new ApiError(
      'destination, start_date and end_date are required',
      400
    );
  }

  // validate dates
  const s = new Date(start_date);
  const e = new Date(end_date);
  if (isNaN(s) || isNaN(e) || s > e) {
    throw new ApiError('Invalid start_date / end_date', 400);
  }

  // ensure destination exists
  const dest = await Destination.findById(destination).select(
    'name country images'
  );
  if (!dest) {
    throw new ApiError('Destination not found', 404);
  }

  const total_days = (() => {
    // compute inclusive days
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 1;
  })();

  const itinerary = await Itinerary.create({
    user: userId,
    destination: dest._id,
    trip_name: trip_name || `Trip to ${dest.name}`,
    start_date: s,
    end_date: e,
    total_days,
    budget: budget || 0,
    travel_style: travel_style || 'balanced',
    daily_plan: [], // initially empty; AI or user will add activities later
    cost_breakdown: {
      transport: 0,
      accommodation: 0,
      activities: 0,
      total: 0,
      currency: 'INR',
    },
    status: 'draft',
  });

  const payload = await Itinerary.findById(itinerary._id)
    .populate('destination', 'name country images')
    .lean();

  return new ApiResponse(201, 'Itinerary created successfully', payload).send(
    res
  );
});

/**
 * GET /api/itineraries
 * Get all itineraries for the logged-in user (paginated)
 * Query params: page, limit, status
 */
export const getUserItineraries = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const itineraries = await Itinerary.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("destination", "name country")
    .lean();

  const response = itineraries.map((it) => ({
    id: it._id,
    title: it.trip_name,
    destination: Array.isArray(it.destination)
      ? it.destination.map((d) => d.name).join(", ")
      : it.destination?.name || "Unknown",
    startDate: it.start_date,
    endDate: it.end_date,
    status: it.status,
    budget: it.budget,
    image: "/placeholder.svg", // Default image since it doesn't exist in the model
    activities: it.daily_plan?.reduce((count, day) => count + (day.activities?.length || 0), 0) || 0,
    hotels: 0, // Hotels count would need to be calculated from accommodations in daily_plan
  }));

  return new ApiResponse(200, "Itineraries fetched successfully", response).send(res);
});

/**
 * GET /api/itineraries/:id
 * Get single itinerary (ensure ownership)
 */

// Get itinerary by ID with deep population
/**
 * Generate a daily plan for an itinerary.
 * - Takes destination, budget, travel_style, start_date, end_date
 * - Fills daily_plan and cost_breakdown automatically
 */
export const generatePlan = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const itineraryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
    throw new ApiError(400, 'Invalid itinerary ID');
  }

  // 1. Fetch itinerary
  const itinerary = await Itinerary.findById(itineraryId);
  if (!itinerary) throw new ApiError(404, 'Itinerary not found');
  if (itinerary.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'Not authorized to modify this itinerary');
  }

  // 2. Fetch destination details
  const destination = await Destination.findById(itinerary.destination).lean();
  if (!destination) throw new ApiError(404, 'Destination not found');

  const { start_date, end_date, budget, travel_style, total_days } = itinerary;

  // Defensive check: compute days
  const days =
    total_days ||
    Math.ceil(
      (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
    );

  // 3. Prepare POIs and Accommodations
  let pois = destination.city?.pois || [];
  let accommodations = destination.city?.accommodations || [];

  // Optional filtering logic (can be improved later)
  if (travel_style === 'budget') {
    accommodations = accommodations.filter((acc) => acc.cost_per_night <= 3000);
    pois = pois.filter((p) => (p.cost?.[0]?.amount || 0) <= 500);
  } else if (travel_style === 'luxury') {
    accommodations = accommodations.filter((acc) => acc.cost_per_night >= 5000);
  }

  // Pick first accommodation as default (can be randomized or optimized later)
  const chosenAccommodation = accommodations[0] || null;

  // 4. Distribute POIs across days
  const daily_plan = [];
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start_date);
    currentDate.setDate(currentDate.getDate() + i);

    // simple round-robin: 2 POIs per day
    const activities = pois.slice(i * 2, i * 2 + 2).map((poi) => ({
      poi_id: poi.id,
      accommodation_id: chosenAccommodation ? chosenAccommodation.id : null,
      notes: `Auto-planned: Visit ${poi.name.en || poi.name}`,
      estimated_cost: poi.cost?.[0]?.amount || 0,
    }));

    daily_plan.push({
      date: currentDate,
      activities,
    });
  }

  // 5. Cost breakdown
  const transportCost = 2000; // placeholder (could pull from destination.transport)
  const accommodationCost = chosenAccommodation
    ? chosenAccommodation.cost_per_night * days
    : 0;
  const activitiesCost = daily_plan.reduce(
    (sum, day) =>
      sum +
      day.activities.reduce((aSum, act) => aSum + (act.estimated_cost || 0), 0),
    0
  );
  const total = transportCost + accommodationCost + activitiesCost;

  // 6. Update itinerary
  itinerary.daily_plan = daily_plan;
  itinerary.cost_breakdown = {
    transport: transportCost,
    accommodation: accommodationCost,
    activities: activitiesCost,
    total,
    currency: 'INR',
  };
  itinerary.status = 'confirmed';

  await itinerary.save();

  return new ApiResponse(200, 'Itinerary plan generated', itinerary).send(res);
});
/**
 * PUT /api/itineraries/:id
 * Update itinerary fields (safe partial update)
 * Allowed updates: trip_name, start_date, end_date, budget, travel_style, daily_plan, status
 */
export const updateItinerary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError('Invalid itinerary id', 400);

  const allowed = [
    'trip_name',
    'start_date',
    'end_date',
    'budget',
    'travel_style',
    'daily_plan',
    'status',
  ];
  const updates = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }
  if (Object.keys(updates).length === 0)
    throw new ApiError('No updatable fields provided', 400);

  const itinerary = await Itinerary.findById(id);
  if (!itinerary) throw new ApiError('Itinerary not found', 404);
  if (itinerary.user.toString() !== userId.toString())
    throw new ApiError('Not authorized', 403);

  // If dates change -> recalc total_days
  if (updates.start_date || updates.end_date) {
    const start = updates.start_date
      ? new Date(updates.start_date)
      : itinerary.start_date;
    const end = updates.end_date
      ? new Date(updates.end_date)
      : itinerary.end_date;
    if (isNaN(start) || isNaN(end) || start > end)
      throw new ApiError('Invalid dates', 400);
    itinerary.start_date = start;
    itinerary.end_date = end;
    itinerary.total_days = calcTotalDays(start, end);
  }

  // Replace other allowed fields safely
  if (updates.trip_name !== undefined) itinerary.trip_name = updates.trip_name;
  if (updates.budget !== undefined) itinerary.budget = updates.budget;
  if (updates.travel_style !== undefined)
    itinerary.travel_style = updates.travel_style;
  if (updates.status !== undefined) itinerary.status = updates.status;

  // If daily_plan provided, validate basic shape and compute costs
  if (updates.daily_plan !== undefined) {
    if (!Array.isArray(updates.daily_plan))
      throw new ApiError('daily_plan must be an array', 400);
    itinerary.daily_plan = updates.daily_plan;
    // recalc cost summary
    itinerary.cost_breakdown = computeCostBreakdown(
      itinerary.daily_plan,
      itinerary.cost_breakdown
    );
  }

  await itinerary.save();

  const result = await Itinerary.findById(itinerary._id)
    .populate('destination', 'name country images')
    .lean();
  return new ApiResponse(200, 'Itinerary updated', result).send(res);
});

/**
 * DELETE /api/itineraries/:id
 * Delete an itinerary (soft delete or hard delete as desired)
 */
export const deleteItinerary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError('Invalid itinerary id', 400);

  const itinerary = await Itinerary.findById(id);
  if (!itinerary) throw new ApiError('Itinerary not found', 404);
  if (itinerary.user.toString() !== userId.toString())
    throw new ApiError('Not authorized', 403);

  // Hard delete
  await Itinerary.deleteOne({ _id: id });

  return new ApiResponse(200, 'Itinerary deleted successfully').send(res);
});
