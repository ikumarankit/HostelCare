export function formatComplaint(complaint) {
  if (!complaint) return null;
  const doc = complaint.toObject ? complaint.toObject() : { ...complaint };
  const { __v, _id, studentId: studentRef, ...rest } = doc;
  return {
    ...rest,
    id: doc.complaintId || doc.id,
    studentId: studentRef?._id?.toString?.() ?? studentRef?.toString?.() ?? doc.studentId,
    studentName: doc.studentName || studentRef?.name,
    createdAt: doc.createdAt?.toISOString?.() ?? doc.createdAt,
    updatedAt: doc.updatedAt?.toISOString?.() ?? doc.updatedAt,
  };
}
