import express from "express";
import { generateItinerary } from "../controllers/generateItineraryController.js"; // fixed named import
import {
  createItinerary,
  getUserItineraries,
  generatePlan,
  updateItinerary,
  deleteItinerary,
   //added for itinerary generation model
} from "../controllers/itineraryController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All endpoints require auth in this MVP (only logged-in users manage itineraries)
router.post("/", protect, createItinerary);
router.get("/", protect, getUserItineraries);

// ✅ Cerebras AI itinerary generation endpoint
// Frontend should POST: { destination, trip_name, start_date, end_date, budget, travel_style }
// Response: JSON fully matching the Itinerary schema
// Moved above /:id route to prevent routing conflicts
router.post("/generate", protect, generateItinerary);

router.get("/:id", protect, generatePlan);
router.put("/:id", protect, updateItinerary);
router.delete("/:id", protect, deleteItinerary);

export default router;
