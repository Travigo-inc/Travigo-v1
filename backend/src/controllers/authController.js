import User from '../models/User.models.js';
import ApiError from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

// ================== Register ==================
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    throw new ApiError('All fields are required', 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError('User already exists', 400);
  }

  const user = await User.create({ name, email, password, phone });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    sameSite: 'lax', // or "none" if cross-site
    secure: false, // must be true if using HTTPS
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: 'lax', // or "none" if cross-site
    secure: false, // must be true if using HTTPS
  });

  return new ApiResponse(201, 'User registered successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    accessToken,
    refreshToken,
  }).send(res);
});

// ================== Login ==================
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError('Email and password are required', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError('Invalid email or password', 401);
  }

  // generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // optionally save refreshToken in db if you want token revocation
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // send tokens in cookies + body
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    sameSite: 'lax', // or "none" if cross-site
    secure: false, // must be true if using HTTPS
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: 'lax', // or "none" if cross-site
    secure: false, // must be true if using HTTPS
  });

  return new ApiResponse(200, 'Login successful', {
    user: { id: user._id, name: user.name, email: user.email },
    accessToken,
    refreshToken,
  }).send(res);
});

// ================== Refresh Token ==================
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refresh_token || req.body.refreshToken;

  if (!refreshToken) {
    throw new ApiError('No refresh token provided', 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError('Invalid refresh token', 403);
    }

    const newAccessToken = user.generateAccessToken();

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return new ApiResponse(200, 'Access token refreshed', {
      accessToken: newAccessToken,
    }).send(res);
  } catch (err) {
    throw new ApiError('Invalid refresh token', 403);
  }
});

// ================== Logout ==================
export const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }

  res.clearCookie('access_token');
  res.clearCookie('refresh_token');

  return new ApiResponse(200, 'Logged out successfully').send(res);
});

// ================== Get Current User ==================
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    '-password -refreshToken'
  );
  if (!user) throw new ApiError('User not found', 404);

  return new ApiResponse(200, 'Current user fetched', user).send(res);
});

// ================ Get user profile ====================
export const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError('User not found', 404);
  }

  const user = await User.findById(req.user._id).select(
    '-password -refreshToken -__v'
  );

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return new ApiResponse(200, 'User profile fetched successfully', user).send(
    res
  );
});

// ================ Update user profile ===================

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;
  const allowedUpdates = [
    'name',
    'email',
    'phone',
    'avatar',
    'preferences', // travelType, budget, accommodation, interests, favoriteDestinations
    'password',
    'kycStatus', // might allow only admins to update later
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
  ];
  const updateData = {};

  Object.keys(updates).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      // Handle nested preferences object
      if (key === 'preferences' && typeof updates[key] === 'object') {
        updateData.preferences = {
          ...updateData.preferences,
          ...updates[key],
        };
      } else {
        updateData[key] = updates[key];
      }
    }
  });

  if (Object.keys(updateData).length === 0) {
    throw new ApiError('No valid fields provided for update', 400);
  }

  let user;

  // Handle password securely
  if (updateData.password) {
    user = await User.findById(req.user._id);
    if (!user) throw new ApiError('User not found', 404);

    user.password = updateData.password; // triggers pre-save hook
    delete updateData.password;

    Object.assign(user, updateData);
    await user.save();
  } else {
    user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
      select: '-password -refreshToken -__v',
    });
  }

  return new ApiResponse(200, 'User profile updated successfully', user).send(
    res
  );
});
