import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import CreateComplaint from '../pages/student/CreateComplaint';
import ComplaintHistory from '../pages/student/ComplaintHistory';
import StudentProfile from '../pages/student/StudentProfile';

// Warden Pages
import WardenDashboard from '../pages/warden/WardenDashboard';
import ComplaintManagement from '../pages/warden/ComplaintManagement';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import ComplaintAnalytics from '../pages/admin/ComplaintAnalytics';

export default function AppRouter() {
  const { isAuthenticated, user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={isAuthenticated ? <Navigate to={`/${user?.role}/dashboard`} /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user?.role}/dashboard`} /> : <LoginPage />} />
        </Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/create-complaint" element={<CreateComplaint />} />
          <Route path="/student/complaints" element={<ComplaintHistory />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Route>

        {/* Warden Routes */}
        <Route element={<ProtectedRoute allowedRoles={['warden']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="/warden/dashboard" element={<WardenDashboard />} />
          <Route path="/warden/complaints" element={<ComplaintManagement />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/analytics" element={<ComplaintAnalytics />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
