// backend/src/services/cerebrasService.js


import axios from "axios";
import dotenv from "dotenv";
import { info, error } from "../utils/logger.js";
import mongoose from "mongoose";

dotenv.config();

const CEREBRAS_API_URL = process.env.CEREBRAS_API_URL;
const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "llama3.1-8b";
const MAX_TOKENS = 3000;

//hlper to conver string to ObjectId
const safeObjectId = (id) => {
  try {
    return mongoose.Types.ObjectId(id);
  } catch {
    return null;
  }
};

/**

 * @param {object} formData - Frontend form data + startDate/endDate
 * @returns {object} - AI-generated itinerary in frontend-ready format
 */
export const generateItineraryFromAI = async (formData) => {
  try {
    info("Sending request to Cerebras AI", formData);

    const payload = {
      model: AI_MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "system",
          content: `
            You are an expert travel planner AI.
            Generate a JSON itinerary in the exact structure expected by the frontend:
            {
              tripName: string,
              destination: string,
              duration: number,
              travelers: number,
              totalBudget: number,
              startDate: string (YYYY-MM-DD),
              endDate: string (YYYY-MM-DD),
              summary: {
                flights: number,
                accommodation: number,
                activities: number,
                meals: number,
                transport: number
              },
              dailyItinerary: [
                {
                  day: number,
                  date: string (YYYY-MM-DD),
                  city: string,
                  title: string,
                  activities: [
                    {
                      time: string,
                      type: string,
                      title: string,
                      duration: string,
                      cost: number
                    }
                  ]
                }
              ],
              accommodations: [
                {
                  city: string,
                  name: string,
                  rating: number,
                  pricePerNight: number,
                  nights: number,
                  amenities: string[]
                }
              ],
              transportation: [
                {
                  from: string,
                  to: string,
                  type: string,
                  cost: number
                }
              ]
            }
            Respond ONLY with valid JSON, no extra text.`,
        },
        {
          role: "user",
          content: `Generate a complete itinerary based on the following input:\n${JSON.stringify(
            formData
          )}`,
        },
      ],
    };

    const response = await axios.post(CEREBRAS_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${CEREBRAS_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
    });

    info("Received response from Cerebras AI");

    let aiContent = response.data?.choices?.[0]?.message?.content;
    if (!aiContent) {
      error("AI response missing content", response.data);
      throw new Error("Cerebras AI returned empty content.");
    }

    // Extract valid JSON only (strip extra text if AI adds commentary)
    const firstBrace = aiContent.indexOf("{");
    const lastBrace = aiContent.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1) {
      error("AI response does not contain valid JSON braces", aiContent);
      throw new Error("Cerebras AI did not return valid JSON.");
    }

    const jsonString = aiContent.slice(firstBrace, lastBrace + 1);

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseErr) {
      error("Failed to parse AI response JSON", parseErr);
      throw new Error("Cerebras AI returned invalid JSON.");
    }

    // Ensure numeric fields exist
    parsed.duration = parsed.duration || formData.duration || 1;
    parsed.travelers = parsed.travelers || formData.travelers || 1;
    parsed.totalBudget = parsed.totalBudget || formData.budget?.[0] || 0;

    return parsed;
  } catch (err) {
    error("Cerebras API call failed", err.message);
    throw new Error(`Failed to generate itinerary from Cerebras AI: ${err.message}`);
  }
};
