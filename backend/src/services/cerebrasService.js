// backend/src/services/cerebrasService.js
/**
 * Service to communicate with Cerebras AI for itinerary generation
 * - Sends user input to AI
 * - Enforces strict JSON return
 * - Includes max token limits to prevent truncation
 * - Handles errors gracefully
 */

import axios from "axios";
import dotenv from "dotenv";
import { info, error } from "../utils/logger.js";

dotenv.config();

// Cerebras API URL & key from environment variables
const CEREBRAS_API_URL = process.env.CEREBRAS_API_URL;
const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY;

// Maximum tokens for AI output to avoid truncation
const MAX_TOKENS = 3000;

/**
 * Calls Cerebras AI to generate an itinerary
 * @param {object} inputJson - Full user input: { user, destination, trip_name, start_date, end_date, budget, travel_style }
 * @returns {object} - AI-generated itinerary JSON (daily_plan, cost_breakdown, total_days, etc.)
 */
export const generateItineraryFromAI = async (inputJson) => {
  try {
    info("Sending request to Cerebras AI", inputJson);

    const payload = {
      model: "cerebras/gpt-4.0",
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "system",
          content: `
            You are a travel itinerary planner AI.
            Always return strictly valid JSON matching this schema:
            {
              user: string (ObjectId),
              destination: string (ObjectId),
              trip_name: string,
              start_date: string (YYYY-MM-DD),
              end_date: string (YYYY-MM-DD),
              total_days: number,
              budget: number,
              travel_style: string (luxury | budget | balanced),
              daily_plan: [
                {
                  date: string (YYYY-MM-DD),
                  activities: [
                    {
                      poi_id: string (ObjectId),
                      accommodation_id: string (ObjectId),
                      transport_mode: string,
                      notes: string,
                      estimated_cost: number
                    }
                  ]
                }
              ],
              cost_breakdown: {
                transport: number,
                accommodation: number,
                activities: number,
                total: number,
                currency: string
              },
              status: string (draft | confirmed | completed | cancelled)
            }
            Do NOT include any extra text or explanation. Return JSON only.
          `,
        },
        {
          role: "user",
          content: `Generate itinerary based on the following input:\n${JSON.stringify(
            inputJson
          )}`,
        },
      ],
    };

    const response = await axios.post(CEREBRAS_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${CEREBRAS_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 60000, // 60 seconds timeout for API
    });

    info("Received response from Cerebras AI");

    const aiContent = response.data?.choices?.[0]?.message?.content;
    if (!aiContent) {
      error("AI response missing content", response.data);
      throw new Error("Cerebras AI returned empty content.");
    }

    let parsed;
    try {
      parsed = JSON.parse(aiContent);
    } catch (parseErr) {
      error("Failed to parse AI response JSON", parseErr);
      throw new Error("Cerebras AI returned invalid JSON.");
    }

    return parsed;
  } catch (err) {
    error("Cerebras API call failed", err.message);
    throw new Error(
      `Failed to generate itinerary from Cerebras AI: ${err.message}`
    );
  }
};
