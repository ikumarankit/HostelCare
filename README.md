# Hostel Care

A full-stack hostel complaint and maintenance management system. Students report room and facility issues digitally; wardens handle complaints for their assigned floors; administrators oversee users, trends, and system-wide analytics.

## Features

### Students
- Submit complaints with category, priority, room, floor, description, and optional image
- Dashboard with personal stats and complaint overview
- Searchable and filterable complaint history with status tracking
- Profile view and edit

### Wardens
- Dashboard scoped to assigned floors
- Complaint management: update status (`pending` → `in-progress` → `resolved` / `rejected`) and add notes
- Automatic notifications when new complaints are filed on their floors

### Administrators
- System-wide dashboard with charts and key metrics
- User management: create, edit, and delete students, wardens, and admins
- Analytics: category, status, priority, monthly trends, and floor-wise breakdowns

### Shared
- JWT authentication with email or mobile number + role
- Role-based routing and API access control
- In-app notifications for complaint lifecycle events
- Dark / light theme
- Responsive layout with mobile sidebar

## Tech stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router 7, Recharts, React Hot Toast |
| **Backend** | Node.js 18+, Express 5, MongoDB, Mongoose, JWT, bcryptjs |
| **Auth** | Bearer token (JWT), role-based middleware |

## Project structure

```
HostelCare/
├── Backend/                 # REST API
│   └── src/
│       ├── config/          # Environment & database
│       ├── controllers/     # Route handlers
│       ├── middleware/      # Auth & error handling
│       ├── models/          # User, Complaint, Notification, Counter
│       ├── routes/          # API route definitions
│       ├── seed/            # Database seed script
│       ├── services/        # Notification service
│       └── utils/           # Helpers & formatters
├── Frontend/                # React SPA
│   └── src/
│       ├── components/      # UI primitives & layout (Sidebar, Navbar)
│       ├── context/         # Auth & theme state
│       ├── layouts/         # Public & dashboard shells
│       ├── pages/           # Role-specific pages
│       ├── routes/          # Router & protected routes
│       └── services/        # API client (fetch)
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [MongoDB](https://www.mongodb.com/) running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

## Quick start

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env
```

Edit `Backend/.env` and set at least `MONGODB_URI` and `JWT_SECRET`, then:

```bash
npm run seed    # Load sample users & complaints (optional, resets DB)
npm run dev     # http://localhost:5000
```

API base URL: `http://localhost:5000/api`

### 2. Frontend

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev     # http://localhost:5173
```

Ensure `VITE_API_URL` in `Frontend/.env` points to the backend (`http://localhost:5000/api`) and `CLIENT_URL` in `Backend/.env` matches the Vite dev server (`http://localhost:5173`).

### 3. Log in (after seed)

Password for all seeded accounts: **`hostel123`** (or `DEFAULT_USER_PASSWORD` in `Backend/.env`)

| Role | Email | Mobile | Notes |
|------|-------|--------|-------|
| Student | `arjun@hostel.edu` | `9876543210` | Room 204, Floor 2 |
| Warden | `warden@hostel.edu` | `9876500001` | Floors 1–3 |
| Warden | `warden2@hostel.edu` | `9876500002` | Floors 4–5 |
| Admin | `admin@hostel.edu` | `9876500000` | Full access |

Login accepts **email or mobile number** together with the selected role.

## Environment variables

### Backend (`Backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/hostelcare` | MongoDB connection string |
| `JWT_SECRET` | — | Secret for signing JWTs (required in production) |
| `JWT_EXPIRES_IN` | `7d` | Token expiry |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin |
| `DEFAULT_USER_PASSWORD` | `hostel123` | Password for admin-created users & seed data |

### Frontend (`Frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base URL |

## Complaint categories & workflow

**Categories:** electricity, furniture, cleaning, water, wifi, washroom

**Priorities:** low, medium, high, urgent

**Statuses:** pending → in-progress → resolved (or rejected)

Complaint IDs are auto-generated (`CMP-001`, `CMP-002`, …). Wardens only see and update complaints on floors assigned to them.

## API overview

| Area | Endpoints |
|------|-----------|
| **Auth** | `POST /api/auth/login`, `GET /api/auth/me` |
| **Users** | `GET/POST /api/users`, `PUT/DELETE /api/users/:id`, `PATCH /api/users/profile` |
| **Complaints** | `GET/POST /api/complaints`, `GET/PATCH /api/complaints/:id` |
| **Notifications** | `GET /api/notifications`, `PATCH /api/notifications/read-all` |
| **Analytics** | `GET /api/analytics` (admin & warden) |
| **Health** | `GET /api/health` |

Full endpoint documentation: [Backend/README.md](Backend/README.md)

## Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with auto-reload |
| `npm start` | Start production server |
| `npm run seed` | Reset database and load sample data |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License
This project is for educational and demonstration purposes.
