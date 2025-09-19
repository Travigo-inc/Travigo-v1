import express from "express";
import protect from "../middleware/authMiddleware.js";
import { updatePreferences, getPreferences, registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Update preferences (after login)
router.patch("/preferences", protect, updatePreferences);

// ✅ Get preferences
router.get("/preferences", protect, getPreferences);

import { submitKYC } from "../controllers/kycController.js";
// Submit KYC
router.post("/", protect, submitKYC);

export default router;
