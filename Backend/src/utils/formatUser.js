export function formatUser(user) {
  if (!user) return null;
  const doc = user.toObject ? user.toObject() : { ...user };
  const { password, __v, _id, ...rest } = doc;
  const formatted = {
    ...rest,
    id: _id?.toString() ?? doc.id,
    createdAt: doc.createdAt?.toISOString?.() ?? doc.createdAt,
  };
  if (doc.role === 'student' && doc.floor != null) formatted.floor = doc.floor;
  if (doc.role === 'warden' && doc.floors?.length) formatted.floors = doc.floors;
  return formatted;
}
