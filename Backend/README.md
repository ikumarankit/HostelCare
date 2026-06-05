# Hostel Care — Backend API

Node.js + Express + MongoDB REST API for the Hostel Care complaint management system.

## Requirements

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Setup

```bash
cd Backend
npm install
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET
npm run seed
npm run dev
```

API base URL: `http://localhost:5000/api`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with auto-reload |
| `npm start` | Start production server |
| `npm run seed` | Reset DB and load sample users & complaints |

## Default login (after seed)

Password for all accounts: `hostel123` (or `DEFAULT_USER_PASSWORD` in `.env`)

| Role | Email | Mobile |
|------|--------|--------|
| Student | arjun@hostel.edu | 9876543210 |
| Warden (floors 1–3) | warden@hostel.edu | 9876500001 |
| Warden (floors 4–5) | warden2@hostel.edu | 9876500002 |
| Admin | admin@hostel.edu | 9876500000 |

## API overview

### Auth
- `POST /api/auth/login` — `{ identifier, password, role }`
- `GET /api/auth/me` — Bearer token required

### Users (admin unless noted)
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `PATCH /api/users/profile` — any logged-in user (own profile)

### Complaints (role-filtered on `GET`)
- `GET /api/complaints` — students: own; wardens: assigned floors; admin: all
- `GET /api/complaints/:id`
- `POST /api/complaints` — students only
- `PATCH /api/complaints/:id` — `{ status, notes }` — warden/admin

### Notifications
- `GET /api/notifications`
- `PATCH /api/notifications/read-all`

### Analytics
- `GET /api/analytics` — admin & warden

### Health
- `GET /api/health`

## Frontend connection

In `Frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Ensure `CLIENT_URL` in Backend `.env` matches your Vite dev URL (default `http://localhost:5173`).
