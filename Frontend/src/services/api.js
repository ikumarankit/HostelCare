const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('hostelcare_token');
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload.message || 'Request failed');
  }
  return payload.data ?? payload;
}

// ── Complaint Services ──
export const complaintService = {
  getAll: async () => request('/complaints'),

  getByStudent: async () => request('/complaints'),

  getByFloors: async () => request('/complaints'),

  getById: async (id) => request(`/complaints/${id}`),

  create: async (complaint) =>
    request('/complaints', {
      method: 'POST',
      body: {
        title: complaint.title,
        category: complaint.category,
        description: complaint.description,
        room: String(complaint.room),
        floor: Number(complaint.floor),
        priority: complaint.priority,
        image: complaint.image || null,
      },
    }),

  updateStatus: async (id, status, notes = '') =>
    request(`/complaints/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: { status, notes },
    }),
};

// ── User Services ──
export const userService = {
  getAll: async () => request('/users'),

  getById: async (id) => request(`/users/${id}`),

  create: async (userData) =>
    request('/users', {
      method: 'POST',
      body: userData,
    }),

  update: async (id, userData) =>
    request(`/users/${id}`, {
      method: 'PUT',
      body: userData,
    }),

  updateProfile: async (profile) =>
    request('/users/profile', {
      method: 'PATCH',
      body: profile,
    }),

  delete: async (id) =>
    request(`/users/${id}`, {
      method: 'DELETE',
    }),

  login: async (identifier, password, role) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password, role }),
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || 'Invalid credentials');
    return { user: payload.user, token: payload.token };
  },
};

// ── Notification Services ──
export const notificationService = {
  getAll: async () => request('/notifications'),
  markAllRead: async () => request('/notifications/read-all', { method: 'PATCH' }),
};

// ── Analytics ──
export const analyticsService = {
  get: async () => request('/analytics'),
};
