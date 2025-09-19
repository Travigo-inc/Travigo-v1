import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
};

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    throw new ApiError(400, "Please provide name, email, password and phone");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User already exists with this email");
  }

  const user = await User.create({ name, email, password, phone });
  if (!user) {
    throw new ApiError(500, "Failed to create user, please try again");
  }

  return new ApiResponse(201, "User registered successfully", {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    token: generateToken(user._id),
  }).send(res);
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  return new ApiResponse(200, "Login successful", {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    token: generateToken(user._id),
  }).send(res);
});

// Get user preferences
export const getPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("preferences");
  if (!user) throw new ApiError(404, "User not found");

  return new ApiResponse(
    200,
    "Preferences fetched successfully",
    user.preferences
  ).send(res);
});

// Update user preferences
export const updatePreferences = async (req, res, next) => {
  try {
    const { interests, travelStyle } = req.body;

    if (!interests && !travelStyle) {
      throw new ApiError(400, "No preferences provided");
    }

    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    if (interests) user.preferences.interests = interests;
    if (travelStyle) user.preferences.travelStyle = travelStyle;

    await user.save();

    return new ApiResponse(
      200,
      "Preferences updated successfully",
      user.preferences
    ).send(res);
  } catch (err) {
    next(err);
  }
};
