// backend/src/controllers/generateItineraryController.js
import Itinerary from "../models/Itinerary.models.js";
import { generateItineraryFromAI } from "../services/cerebrasService.js";
import { transformAIResponse } from "../utils/transformAnswers.js";
import { info, warn, error } from "../utils/logger.js";
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
 * POST /api/itineraries/generate
 * Generates itinerary using Cerebras AI and saves to MongoDB
 */
export const generateItinerary = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const {
      tripName,
      destination, // string now
      startDate,
      endDate,
      budget,
      travelType,
      duration,
      activities,
      accommodation,
      transportation,
      specialRequests,
      travelers,
    } = req.body;

    // Validate required fields
    if (!destination || !startDate || !endDate) {
      warn("Missing required fields for itinerary generation", req.body);
      return res.status(400).json({
        error: "Required fields missing: destination, startDate, endDate",
      });
    }

    info("Starting AI itinerary generation", {
      userId,
      destination,
      startDate,
      endDate,
    });

    // Prepare AI input payload
    const aiInput = {
      tripName: tripName || "My Trip",
      destination, // sending name string to AI
      startDate,
      endDate,
      totalBudget: Array.isArray(budget) ? budget[0] : budget || 0,
      duration: duration || 1,
      travelType: travelType || "balanced",
      activities: activities || [],
      accommodation: accommodation || "",
      transportation: transportation || "",
      specialRequests: specialRequests || "",
      travelers: travelers || 1,
    };

    // Call Cerebras AI
    const aiResponse = await generateItineraryFromAI(aiInput);

    // Transform AI response into Mongoose schema
    // If you ever want to use ObjectId for destination, replace 'destination' below with safeObjectId(destination)
    const transformed = transformAIResponse(aiResponse, userId, destination);

    // Save to MongoDB
    const itinerary = new Itinerary(transformed);
    await itinerary.save();

    info("AI-generated itinerary saved successfully", { itineraryId: itinerary._id });

    res.status(201).json(itinerary);
  } catch (err) {
    error("Failed to generate/save AI itinerary", err);
    res.status(500).json({
      error: `Itinerary generation failed: ${err.message}`,
    });
  }
};
