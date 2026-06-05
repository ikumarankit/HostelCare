import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    complaintId: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['electricity', 'furniture', 'cleaning', 'water', 'wifi', 'washroom'],
      required: true,
    },
    description: { type: String, required: true },
    room: { type: String, required: true, trim: true },
    floor: { type: Number, required: true, min: 1 },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved', 'rejected'],
      default: 'pending',
    },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    notes: { type: String, default: '' },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

complaintSchema.index({ studentId: 1 });
complaintSchema.index({ floor: 1, status: 1 });
complaintSchema.index({ createdAt: -1 });

export const Complaint = mongoose.model('Complaint', complaintSchema);
