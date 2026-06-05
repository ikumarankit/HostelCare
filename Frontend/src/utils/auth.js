export const normalizePhone = (value) => value.replace(/\D/g, '');

export const isEmailIdentifier = (value) => value.includes('@');

export const findUserByCredentials = (users, identifier, role) => {
  const trimmed = identifier.trim();
  if (!trimmed) return null;

  if (isEmailIdentifier(trimmed)) {
    return users.find((u) => u.email.toLowerCase() === trimmed.toLowerCase() && u.role === role);
  }

  const phoneDigits = normalizePhone(trimmed);
  if (phoneDigits.length < 10) return null;

  return users.find((u) => {
    if (u.role !== role || !u.phone) return false;
    const userPhone = normalizePhone(u.phone);
    return userPhone === phoneDigits || userPhone.endsWith(phoneDigits.slice(-10));
  });
};
