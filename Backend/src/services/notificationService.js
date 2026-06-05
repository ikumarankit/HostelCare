import { Notification } from '../models/Notification.js';

export async function createNotification({ userId, message, type = 'info', complaintId = null }) {
  return Notification.create({ userId, message, type, complaintId });
}

export function formatNotification(n) {
  const doc = n.toObject ? n.toObject() : { ...n };
  return {
    id: doc._id.toString(),
    message: doc.message,
    type: doc.type,
    read: doc.read,
    complaintId: doc.complaintId,
    createdAt: doc.createdAt?.toISOString?.() ?? doc.createdAt,
  };
}
