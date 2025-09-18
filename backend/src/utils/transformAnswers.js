// backend/src/utils/transformAnswer.js
/**
 * Transforms the AI-generated itinerary JSON to exactly match
 * the Mongoose Itinerary schema.
 * Ensures all required fields are present and valid.
 */

import { info, warn } from "./logger.js";

/**
 * Transform AI response to Mongoose schema
 * @param {object} aiResponse - Raw JSON from Cerebras AI
 * @returns {object} - Normalized itinerary object ready to save
 */
export const transformAIResponse = (aiResponse) => {
  try {
    if (!aiResponse) {
      throw new Error("AI response is null or undefined");
    }

    // Ensure required top-level fields
    const transformed = {
      user: aiResponse.user || null,
      destination: aiResponse.destination || null,
      trip_name: aiResponse.trip_name || "My Trip",
      start_date: aiResponse.start_date
        ? new Date(aiResponse.start_date)
        : new Date(),
      end_date: aiResponse.end_date ? new Date(aiResponse.end_date) : new Date(),
      total_days: aiResponse.total_days || 1,
      budget: aiResponse.budget || 0,
      travel_style: aiResponse.travel_style || "balanced",
      status: aiResponse.status || "draft",
      daily_plan: [],
      cost_breakdown: {
        transport: 0,
        accommodation: 0,
        activities: 0,
        total: 0,
        currency: "INR",
        ...aiResponse.cost_breakdown,
      },
    };

    // Normalize daily_plan
    if (Array.isArray(aiResponse.daily_plan)) {
      transformed.daily_plan = aiResponse.daily_plan.map((day) => {
        const activities =
          Array.isArray(day.activities) && day.activities.length > 0
            ? day.activities.map((act) => ({
                poi_id: act.poi_id || null,
                accommodation_id: act.accommodation_id || null,
                transport_mode: act.transport_mode || "walk",
                notes: act.notes || "",
                estimated_cost: act.estimated_cost || 0,
              }))
            : [];

        return {
          date: day.date ? new Date(day.date) : new Date(),
          activities,
        };
      });
    } else {
      warn("AI response daily_plan is missing or invalid", aiResponse.daily_plan);
    }

    // Auto-calculate total cost if not present
    if (!transformed.cost_breakdown.total) {
      const totalActivities = transformed.daily_plan.reduce((sum, day) => {
        return (
          sum +
          day.activities.reduce((aSum, act) => aSum + (act.estimated_cost || 0), 0)
        );
      }, 0);
      transformed.cost_breakdown.total =
        totalActivities +
        (transformed.cost_breakdown.transport || 0) +
        (transformed.cost_breakdown.accommodation || 0);
    }

    info("AI response transformed successfully");
    return transformed;
  } catch (err) {
    throw new Error(`Failed to transform AI response: ${err.message}`);
  }
};
