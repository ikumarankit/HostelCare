import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isEmailIdentifier, normalizePhone } from '../utils/auth.js';
import { formatUser } from '../utils/formatUser.js';

const signToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

async function findUserByIdentifier(identifier, role) {
  const trimmed = identifier.trim();
  if (!trimmed) return null;

  if (isEmailIdentifier(trimmed)) {
    return User.findOne({ email: trimmed.toLowerCase(), role }).select('+password');
  }

  const phoneDigits = normalizePhone(trimmed);
  if (phoneDigits.length < 10) return null;

  const users = await User.find({ role, phone: { $exists: true, $ne: '' } }).select('+password');
  return users.find((u) => {
    const userPhone = normalizePhone(u.phone);
    return userPhone === phoneDigits || userPhone.endsWith(phoneDigits.slice(-10));
  });
}

export const login = asyncHandler(async (req, res) => {
  const { identifier, password, role } = req.body;

  if (!identifier?.trim() || !password?.trim() || !role) {
    throw new AppError('Identifier, password, and role are required', 400);
  }

  if (!['student', 'warden', 'admin'].includes(role)) {
    throw new AppError('Invalid role', 400);
  }

  const user = await findUserByIdentifier(identifier, role);
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = signToken(user._id);
  res.json({
    success: true,
    user: formatUser(user),
    token,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: formatUser(req.user) });
});
