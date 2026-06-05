# Hostel Care

Hostel complaint and maintenance management — students report issues, wardens handle assigned floors, admins oversee the system.

## Project structure

| Folder | Description |
|--------|-------------|
| `Frontend/` | React + Vite + Tailwind UI |
| `Backend/` | Node.js + Express + MongoDB API |

## Quick start

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Runs at `http://localhost:5000`

### 2. Frontend

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5173`

### 3. Login (after seed)

Password: `hostel123`

- Student: `arjun@hostel.edu` or `9876543210`
- Warden (floors 1–3): `warden@hostel.edu`
- Admin: `admin@hostel.edu`

See [Backend/README.md](Backend/README.md) for full API documentation.
