// backend/src/controllers/generateItineraryController.js
/**
 * Controller for AI-generated itineraries using Cerebras AI
 * - Calls AI service
 * - Transforms the response
 * - Saves itinerary to MongoDB
 * - Returns JSON to frontend
 */

import Itinerary from "../models/Itinerary.models.js";
import { generateItineraryFromAI } from "../services/cerebrasService.js";
import { transformAIResponse } from "../utils/transformAnswers.js";
import { info, warn, error } from "../utils/logger.js";

/**
 * POST /api/itineraries/generate
 * Generates itinerary using Cerebras AI and saves to DB
 */
export const generateItinerary = async (req, res) => {
  try {
    const { user, destination, trip_name, start_date, end_date, budget, travel_style } =
      req.body;

    // Validate required fields
    if (!user || !destination || !start_date || !end_date) {
      warn("Missing required fields for itinerary generation", req.body);
      return res.status(400).json({
        error: "Required fields missing: user, destination, start_date, end_date",
      });
    }

    info("Starting AI itinerary generation", { user, destination });

    // Prepare input for AI
    const aiInput = { user, destination, trip_name, start_date, end_date, budget, travel_style };

    // Call Cerebras AI
    const aiResponse = await generateItineraryFromAI(aiInput);

    // Transform AI response to match Mongoose schema
    const transformed = transformAIResponse(aiResponse);

    // Save to MongoDB
    const itinerary = new Itinerary(transformed);
    await itinerary.save();

    info("AI-generated itinerary saved successfully", { itineraryId: itinerary._id });

    res.status(201).json(itinerary);
  } catch (err) {
    error("Failed to generate/save AI itinerary", err.message);
    res.status(500).json({ error: `Itinerary generation failed: ${err.message}` });
  }
};
