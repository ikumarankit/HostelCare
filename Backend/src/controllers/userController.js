import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { formatUser } from '../utils/formatUser.js';
import { env } from '../config/env.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, data: users.map(formatUser) });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, data: formatUser(user) });
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, role, phone, room, floor, floors, hostel, password } = req.body;

  if (!name?.trim() || !email?.trim() || !role) {
    throw new AppError('Name, email, and role are required', 400);
  }

  if (role === 'warden' && (!floors || floors.length === 0)) {
    throw new AppError('Wardens must be assigned at least one floor', 400);
  }

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    phone: phone?.trim() || undefined,
    hostel: hostel || 'Hostel A',
    password: password || env.defaultPassword,
  };

  if (role === 'student') {
    payload.room = room?.trim();
    payload.floor = Number(floor) || undefined;
  }
  if (role === 'warden') {
    payload.floors = floors.map(Number).sort((a, b) => a - b);
  }

  const user = await User.create(payload);
  res.status(201).json({
    success: true,
    data: formatUser(user),
    message: password ? undefined : `User created with default password: ${env.defaultPassword}`,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);

  const { name, email, role, phone, room, floor, floors, hostel } = req.body;

  if (name) user.name = name.trim();
  if (email) user.email = email.trim().toLowerCase();
  if (phone !== undefined) user.phone = phone?.trim() || '';
  if (hostel) user.hostel = hostel;

  if (req.user.role === 'admin') {
    if (role) user.role = role;
    if (user.role === 'student' || role === 'student') {
      if (room !== undefined) user.room = room;
      if (floor !== undefined) user.floor = Number(floor);
      user.floors = undefined;
    }
    if (user.role === 'warden' || role === 'warden') {
      if (floors) {
        if (floors.length === 0) throw new AppError('Wardens need at least one floor', 400);
        user.floors = floors.map(Number).sort((a, b) => a - b);
      }
      user.room = undefined;
      user.floor = undefined;
    }
  } else {
    if (user.role === 'student') {
      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone?.trim() || '';
      if (room !== undefined) user.room = room;
    }
  }

  await user.save();
  res.json({ success: true, data: formatUser(user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, room } = req.body;
  const user = req.user;

  if (name) user.name = name.trim();
  if (phone !== undefined) user.phone = phone?.trim() || '';
  if (user.role === 'student' && room !== undefined) user.room = room;

  await user.save();
  res.json({ success: true, data: formatUser(user) });
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    throw new AppError('Cannot delete your own account', 400);
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, message: 'User deleted' });
});
