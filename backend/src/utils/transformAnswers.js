// backend/src/utils/transformAnswers.js
/**
 * Transforms frontend-ready AI itinerary JSON into MongoDB Mongoose schema
 * Ensures required fields are present
 * Destination is treated as a string instead of ObjectId
 */

import { info, warn } from "./logger.js";
// import mongoose from "mongoose"; // Uncomment if you want ObjectId conversion later

// Helper to safely convert strings to ObjectId (currently unused)
/*
const safeObjectId = (id) => {
  try {
    return mongoose.Types.ObjectId(id);
  } catch {
    return null;
  }
};
*/

/**
 * Transform frontend AI response to MongoDB itinerary schema
 * @param {object} aiResponse - AI output in frontend-ready format
 * @param {string} userId - Logged-in user's ObjectId
 * @param {string} destination - Destination name (string)
 * @returns {object} - Normalized itinerary object ready to save
 */
export const transformAIResponse = (aiResponse, userId, destination) => {
  if (!aiResponse) {
    throw new Error("AI response is null or undefined");
  }

  if (!userId) throw new Error("User ID is required");
  if (!destination) throw new Error("Destination is required");

  // Top-level mapping
  const transformed = {
    user: userId, // Use ObjectId if needed: safeObjectId(userId)
    destination: destination, // Currently a string; uncomment safeObjectId(destination) if using ObjectId
    trip_name: aiResponse.tripName || "My Trip",
    start_date: aiResponse.startDate ? new Date(aiResponse.startDate) : new Date(),
    end_date: aiResponse.endDate ? new Date(aiResponse.endDate) : new Date(),
    total_days: aiResponse.duration || 1,
    budget: aiResponse.totalBudget || 0,
    travel_style: aiResponse.travelType || "balanced",
    status: "draft",
    daily_plan: [],
    cost_breakdown: {
      transport: aiResponse.summary?.transport || 0,
      accommodation: aiResponse.summary?.accommodation || 0,
      activities: aiResponse.summary?.activities || 0,
      total:
        (aiResponse.summary?.flights || 0) +
        (aiResponse.summary?.accommodation || 0) +
        (aiResponse.summary?.activities || 0) +
        (aiResponse.summary?.meals || 0) +
        (aiResponse.summary?.transport || 0),
      currency: "INR",
    },
  };

  // Map dailyItinerary
  if (Array.isArray(aiResponse.dailyItinerary)) {
    transformed.daily_plan = aiResponse.dailyItinerary.map((day) => {
      const activities =
        Array.isArray(day.activities) && day.activities.length > 0
          ? day.activities.map((act) => ({
              poi_id: null, // AI doesn’t return DB POIs; set null or resolve later
              accommodation_id: null, // AI doesn’t return DB accommodations; set null
              transport_mode: act.type || "walk",
              notes: act.title || "",
              estimated_cost: act.cost || 0,
            }))
          : [];

      return {
        date: day.date ? new Date(day.date) : new Date(),
        activities,
      };
    });
  } else {
    warn("AI response dailyItinerary is missing or invalid", aiResponse.dailyItinerary);
  }

  info("AI response transformed successfully for DB");
  return transformed;
};
