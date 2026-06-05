# HOSTEL CARE — Build Walkthrough

## What Was Built

A **production-ready, modern React.js frontend** for a hostel complaint and maintenance management system. The application supports 3 roles (Student, Warden, Admin) with role-based routing, 13 pages, 10+ reusable UI components, dark/light mode, charts, and mock data.

---

## Screenshots

### Login Page
The login page features a clean form with role selector and **quick demo login buttons** for instant access to any role.

![Login Page with Demo Buttons](C:\Users\kumar\.gemini\antigravity\brain\713d6693-e777-4475-af79-a0893f069e1d\login_page_1778952776873.png)

### Student Dashboard
Personalized dashboard with stat cards, bar chart, and recent complaints list.

![Student Dashboard](C:\Users\kumar\.gemini\antigravity\brain\713d6693-e777-4475-af79-a0893f069e1d\.system_generated\click_feedback\click_feedback_1778952826527.png)

### Admin Dashboard (Dark Mode)
System-wide analytics with line charts, pie charts, and full dark mode support.

![Admin Dashboard Dark Mode](C:\Users\kumar\.gemini\antigravity\brain\713d6693-e777-4475-af79-a0893f069e1d\.system_generated\click_feedback\click_feedback_1778952906179.png)

### Full Browser Session Recording
![Browser test recording showing all pages](C:\Users\kumar\.gemini\antigravity\brain\713d6693-e777-4475-af79-a0893f069e1d\landing_page_test_1778952716145.webp)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Vite + React 18** | Build tool & UI framework |
| **Tailwind CSS v4** | Utility-first styling with custom theme |
| **React Router DOM v6** | Client-side routing with protected routes |
| **Recharts** | Dashboard charts (Bar, Line, Pie) |
| **React Icons (Hi2)** | Consistent iconography |
| **React Hot Toast** | Notification toasts |
| **Context API** | Auth state & theme management |

---

## Project Structure (30+ files)

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx         — Role-aware collapsible sidebar
│   │   └── Navbar.jsx          — Top bar with search, theme, notifications
│   └── ui/
│       ├── Button.jsx          — Multi-variant button with loading state
│       ├── Badge.jsx           — Status, Priority, Role badges
│       ├── Card.jsx            — StatCard, Card, CardHeader
│       ├── Modal.jsx           — Animated overlay modal
│       ├── Input.jsx           — Input, Select, Textarea primitives
│       ├── Loader.jsx          — Spinner components
│       └── EmptyState.jsx      — Empty state placeholder
├── context/
│   ├── AuthContext.jsx         — Auth with login/register/logout + localStorage
│   └── ThemeContext.jsx        — Dark/light mode toggle
├── data/
│   └── mockData.js             — 15 complaints, 10 users, 6 staff, analytics
├── layouts/
│   ├── DashboardLayout.jsx     — Sidebar + Navbar + content area
│   └── PublicLayout.jsx        — Transparent navbar + footer
├── pages/
│   ├── public/
│   │   ├── LandingPage.jsx     — Hero, features, how-it-works, testimonials, CTA
│   │   ├── LoginPage.jsx       — Form + demo quick-login
│   │   └── RegisterPage.jsx    — Full registration form
│   ├── student/
│   │   ├── StudentDashboard.jsx — Stats, chart, recent complaints
│   │   ├── CreateComplaint.jsx  — Multi-field form with image upload
│   │   ├── ComplaintHistory.jsx — Filterable cards with detail modal
│   │   └── StudentProfile.jsx  — View/edit profile
│   ├── warden/
│   │   ├── WardenDashboard.jsx  — Floor-wise analytics
│   │   ├── ComplaintManagement.jsx — Table with status/staff/notes modals
│   │   └── StaffAssignment.jsx  — Staff cards with availability
│   └── admin/
│       ├── AdminDashboard.jsx   — System-wide stats and charts
│       ├── UserManagement.jsx   — User table with add/edit modals
│       └── ComplaintAnalytics.jsx — Full analytics page (5 charts)
├── routes/
│   ├── AppRouter.jsx           — All routes with role guards
│   └── ProtectedRoute.jsx     — Auth + role-based access control
├── services/
│   └── api.js                  — Mock service layer with simulated delays
├── utils/
│   └── helpers.js              — Constants, formatters, color utilities
├── App.jsx                     — Root with providers + Toaster
├── main.jsx                    — React DOM entry
└── index.css                   — Tailwind config + custom theme + animations
```

---

## Key Features Implemented

### Authentication & Routing
- **Demo login buttons** — Instantly login as Student, Warden, or Admin
- **Role-based protected routes** — `/student/*`, `/warden/*`, `/admin/*`
- **localStorage persistence** — Sessions survive page refresh

### Student Features
- Dashboard with 4 stat cards and status bar chart
- Create complaint form with category, priority, room/floor, image upload
- Searchable & filterable complaint history with detail modal
- Editable profile page

### Warden Features
- Dashboard with floor-wise stacked bar chart
- Complaint management table with inline actions:
  - Update status (Pending → In Progress → Resolved)
  - Assign maintenance staff
  - Add/edit notes
- Staff directory with availability indicators

### Admin Features
- System-wide dashboard with line chart (monthly trends) + pie chart (categories)
- User management table with add/edit modal and role filter
- Full analytics page with 5 charts: monthly trend, category, status, priority, floor-wise

### Design System
- **Dark/light mode** with `class`-based Tailwind toggle
- **Custom color palette** — Primary blue, success green, warning yellow, danger red
- **Inter font** from Google Fonts
- **Smooth animations** — fade-in, slide-up, scale-in
- **Responsive** — Mobile sidebar drawer, responsive grids, adaptive layouts
- **Toast notifications** on all user actions

---

## How to Run

```bash
cd HostelCare
npm run dev        # Development server at http://localhost:5173
npm run build      # Production build
```

## Connecting to a Real Backend

The `src/services/api.js` file contains all mock service functions. To connect to a real Node.js + Express backend:

1. Replace the mock functions with Axios calls
2. Point `baseURL` to your API server
3. Add the JWT token from `AuthContext` to request headers

No other changes are needed — the component layer is fully decoupled from the data layer.

---

## Verification Results

| Check | Result |
|---|---|
| `npm run build` | ✅ Compiled successfully |
| Landing page | ✅ Hero, features, steps, testimonials, footer |
| Login/Register | ✅ Forms work, demo login works |
| Student dashboard | ✅ Stats, charts, recent complaints |
| Warden dashboard | ✅ Floor-wise chart, complaint management |
| Admin dashboard | ✅ Line/pie charts, user management, analytics |
| Dark mode | ✅ Consistent across all pages |
| Role-based routing | ✅ Redirect on unauthorized access |
| Mobile responsive | ✅ Sidebar drawer, responsive grids |
