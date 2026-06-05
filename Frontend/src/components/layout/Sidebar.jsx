import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineHome, HiOutlinePlusCircle, HiOutlineClipboardDocumentList, HiOutlineUser,
  HiOutlineWrenchScrewdriver, HiOutlineUserGroup, HiOutlineChartBarSquare,
  HiOutlineCog6Tooth, HiOutlineArrowRightOnRectangle, HiOutlineXMark,
  HiOutlineBuildingOffice2, HiOutlineClipboardDocumentCheck, HiOutlineUsers,
} from 'react-icons/hi2';

const studentLinks = [
  { to: '/student/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/student/create-complaint', icon: HiOutlinePlusCircle, label: 'New Complaint' },
  { to: '/student/complaints', icon: HiOutlineClipboardDocumentList, label: 'My Complaints' },
  { to: '/student/profile', icon: HiOutlineUser, label: 'Profile' },
];

const wardenLinks = [
  { to: '/warden/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/warden/complaints', icon: HiOutlineClipboardDocumentCheck, label: 'Complaints' },
];

const adminLinks = [
  { to: '/admin/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/admin/users', icon: HiOutlineUsers, label: 'Users' },
  { to: '/admin/analytics', icon: HiOutlineChartBarSquare, label: 'Analytics' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'warden' ? wardenLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-dark-900 border-r border-dark-200 dark:border-dark-700
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-dark-200 dark:border-dark-700">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <HiOutlineBuildingOffice2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-dark-900 dark:text-white leading-tight">HOSTEL CARE</h1>
              <p className="text-[10px] text-dark-400 font-medium tracking-wider uppercase">Management</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer">
            <HiOutlineXMark className="w-5 h-5 text-dark-500" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-dark-200 dark:border-dark-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark-900 dark:text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-dark-500 dark:text-dark-400 capitalize">{user?.role || 'student'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest text-dark-400 dark:text-dark-500 uppercase">Navigation</p>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 shadow-sm'
                  : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 hover:text-dark-900 dark:hover:text-white'
                }`
              }
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-dark-200 dark:border-dark-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-all duration-200 cursor-pointer"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
