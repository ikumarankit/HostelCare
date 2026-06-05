export const normalizePhone = (value) => String(value || '').replace(/\D/g, '');

export const isEmailIdentifier = (value) => String(value || '').includes('@');
