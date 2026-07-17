import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../../services/api';
import { timeAgo } from '../../utils/helpers';
import {
  HiOutlineBars3, HiOutlineBell, HiOutlineSun, HiOutlineMoon,
  HiOutlineMagnifyingGlass, HiOutlineArrowRightOnRectangle, HiOutlineUser,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';

export default function Navbar({ onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    notificationService.getAll().then(setNotifications).catch(() => setNotifications([]));
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark notifications as read', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-dark-200 dark:border-dark-700">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer">
            <HiOutlineBars3 className="w-5 h-5 text-dark-600 dark:text-dark-300" />
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-dark-50 dark:bg-dark-800 rounded-xl px-3 py-2 border border-dark-200 dark:border-dark-700 w-64">
            <HiOutlineMagnifyingGlass className="w-4 h-4 text-dark-400" />
            <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none text-dark-900 dark:text-white placeholder-dark-400 w-full" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer" title="Toggle theme">
            {darkMode ? <HiOutlineSun className="w-5 h-5 text-yellow-400" /> : <HiOutlineMoon className="w-5 h-5 text-dark-500" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer">
              <HiOutlineBell className="w-5 h-5 text-dark-500 dark:text-dark-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full ring-2 ring-white dark:ring-dark-900" />
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-dark-200 dark:border-dark-700 animate-scale-in overflow-hidden">
                <div className="p-4 border-b border-dark-200 dark:border-dark-700 flex items-center justify-between">
                  <h3 className="font-semibold text-dark-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-dark-500 text-center">No notifications yet</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 border-b border-dark-100 dark:border-dark-700/50 ${!n.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}>
                        <p className="text-sm text-dark-700 dark:text-dark-300">{n.message}</p>
                        <p className="text-xs text-dark-400 mt-1">{timeAgo(n.createdAt)}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-dark-700 dark:text-dark-300">{user?.name?.toUpperCase().split(' ')[0]}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-dark-200 dark:border-dark-700 animate-scale-in overflow-hidden">
                <div className="p-3 border-b border-dark-200 dark:border-dark-700">
                  <p className="text-sm font-semibold text-dark-900 dark:text-white">{user?.name.toUpperCase()}</p>
                  <p className="text-xs text-dark-500 capitalize">{user?.role}</p>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={() => { setShowDropdown(false); navigate(`/${user?.role}/profile`); }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors cursor-pointer"
                  >
                    <HiOutlineUser className="w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors cursor-pointer"
                  >
                    <HiOutlineArrowRightOnRectangle className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
