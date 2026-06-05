import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model('Counter', counterSchema);

export async function getNextComplaintId() {
  const counter = await Counter.findByIdAndUpdate(
    'complaint',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `CMP-${String(counter.seq).padStart(3, '0')}`;
}
