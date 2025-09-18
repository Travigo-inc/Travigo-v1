import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String }, // URL to avatar image
    preferences: {
      travelType: { type: String, default: 'Adventure' },
      budget: { type: String, default: '$1000-3000' },
      accommodation: { type: String, default: 'Hotels' },
      interests: [String],
      favoriteDestinations: [String],
    },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    dateOfBirth: { type: Date },
    gender: { type: String },
    kycStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    blockchainId: { type: String },
    refreshToken: { type: String }, // needed for refresh
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const User = model('User', userSchema);
export default User;
