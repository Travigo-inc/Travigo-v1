import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import User from '../models/User.models.js';

const protect = (async (req, res, next) => {
  // 1. Extract token
  const token =
    req.cookies?.access_token ||
    req.headers?.authorization?.split(" ")[1]; 

  if (!token) {
    throw new ApiError("Not authorized, no token", 401); 
  }

  // 2. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError("Not authorized, invalid/expired token", 401);
  }

  const user_id = decoded?.userId;
  if (!user_id) {
    throw new ApiError("Not authorized, invalid token payload", 401);
  }

  // 3. Attach user to request
  req.user = await User.findById(user_id).select("-password -refreshToken"); 

  if (!req.user) {
    throw new ApiError("Not authorized, user not found", 404);
  }

  next();
});

export default protect;
