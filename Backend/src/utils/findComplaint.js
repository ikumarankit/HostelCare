import mongoose from 'mongoose';
import { Complaint } from '../models/Complaint.js';

/**
 * Find complaint by CMP-xxx id or MongoDB ObjectId.
 * Avoids CastError when id is not a valid ObjectId (e.g. "CMP-016").
 */
export function findComplaintByParam(id) {
  if (mongoose.isValidObjectId(id)) {
    return Complaint.findOne({
      $or: [{ complaintId: id }, { _id: id }],
    });
  }
  return Complaint.findOne({ complaintId: id });
}

export function findComplaintByParamPopulated(id) {
  if (mongoose.isValidObjectId(id)) {
    return Complaint.findOne({
      $or: [{ complaintId: id }, { _id: id }],
    }).populate('studentId', 'name email room floor');
  }
  return Complaint.findOne({ complaintId: id }).populate('studentId', 'name email room floor');
}

export function wardenCanAccessFloor(warden, floor) {
  const floors = (warden.floors || []).map((f) => Number(f));
  return floors.includes(Number(floor));
}
