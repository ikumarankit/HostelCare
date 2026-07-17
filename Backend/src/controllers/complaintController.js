import { Complaint } from '../models/Complaint.js';
import { getNextComplaintId } from '../models/Counter.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { formatComplaint } from '../utils/formatComplaint.js';
import { createNotification } from '../services/notificationService.js';
import { User } from '../models/User.js';
import {
  findComplaintByParam,
  findComplaintByParamPopulated,
  wardenCanAccessFloor,
} from '../utils/findComplaint.js';

function buildComplaintQuery(user) {
  if (user.role === 'admin') return {};
  if (user.role === 'student') return { studentId: user._id };
  if (user.role === 'warden') {
    const floors = user.floors?.length ? user.floors : [];
    if (floors.length === 0) return { floor: -1 };
    return { floor: { $in: floors } };
  }
  return {};
}

export const getComplaints = asyncHandler(async (req, res) => {
  const query = buildComplaintQuery(req.user);
  const complaints = await Complaint.find(query)
    .populate('studentId', 'name email room floor')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: complaints.map(formatComplaint) });
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await findComplaintByParamPopulated(req.params.id);

  if (!complaint) throw new AppError('Complaint not found', 404);

  if (req.user.role === 'student' && complaint.studentId._id.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized', 403);
  }
  if (req.user.role === 'warden' && !wardenCanAccessFloor(req.user, complaint.floor)) {
    throw new AppError('Not authorized', 403);
  }

  res.json({ success: true, data: formatComplaint(complaint) });
});

export const createComplaint = asyncHandler(async (req, res) => {
  if (req.user.role !== 'student') {
    throw new AppError('Only students can create complaints', 403);
  }

  const { title, category, description, room, floor, priority, image } = req.body;

  if (!title?.trim() || !category || !description?.trim() || !room || !floor) {
    throw new AppError('Title, category, description, room, and floor are required', 400);
  }

  const complaintId = await getNextComplaintId();
  const complaint = await Complaint.create({
    complaintId,
    title: title.trim(),
    category,
    description: description.trim(),
    room: String(room).trim(),
    floor: Number(floor),
    priority: priority || 'medium',
    studentId: req.user._id,
    studentName: req.user.name,
    image: image || null,
  });

  const wardens = await User.find({ role: 'warden', floors: Number(floor) });
  await Promise.all(
    wardens.map((w) =>
      createNotification({
        userId: w._id,
        message: `New ${priority || 'medium'} priority complaint ${complaintId} on floor ${floor}`,
        type: priority === 'urgent' ? 'warning' : 'info',
        complaintId,
      })
    )
  );

  await createNotification({
    userId: req.user._id,
    message: `Your complaint ${complaintId} has been received`,
    type: 'info',
    complaintId,
  });

  res.status(201).json({ success: true, data: formatComplaint(complaint) });
});

export const updateComplaintStatus = asyncHandler(async (req, res) => {
  if (!['warden', 'admin'].includes(req.user.role)) {
    throw new AppError('Only wardens and admins can update complaints', 403);
  }

  const { status, notes } = req.body;
  const validStatuses = ['pending', 'in-progress', 'resolved', 'rejected'];
  if (status && !validStatuses.includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const complaint = await findComplaintByParam(req.params.id);

  if (!complaint) throw new AppError('Complaint not found', 404);

  if (req.user.role === 'warden' && !wardenCanAccessFloor(req.user, complaint.floor)) {
    throw new AppError('This complaint is outside your assigned floors', 403);
  }

  if (status) complaint.status = status;
  if (notes !== undefined) complaint.notes = notes;
  await complaint.save();

  const statusLabel =
    (status || complaint.status) === 'in-progress'
      ? 'In Progress'
      : (status || complaint.status).charAt(0).toUpperCase() + (status || complaint.status).slice(1);

  await createNotification({
    userId: complaint.studentId,
    message: `Complaint ${complaint.complaintId} status updated to ${statusLabel}`,
    type: (status || complaint.status) === 'resolved' ? 'success' : 'info',
    complaintId: complaint.complaintId,
  });

  const updated = await findComplaintByParamPopulated(complaint.complaintId);
  res.json({ success: true, data: formatComplaint(updated) });
});

export const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await findComplaintByParam(req.params.id);

  if (!complaint) throw new AppError('Complaint not found', 404);

  if (req.user.role !== 'student' || complaint.studentId.toString() !== req.user._id.toString()) {
    throw new AppError('Only the student who created this complaint can delete it', 403);
  }

  if (complaint.status !== 'pending') {
    throw new AppError('Only pending complaints can be deleted', 400);
  }

  await complaint.deleteOne();

  res.json({ success: true, message: 'Complaint deleted successfully' });
});
