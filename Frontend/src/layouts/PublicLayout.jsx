import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineBuildingOffice2, HiOutlineSun, HiOutlineMoon, HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';

export default function PublicLayout() {
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-950">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-dark-900/85 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-dark-700'
            : 'bg-white/95 dark:bg-dark-900/0 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-dark-700'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <HiOutlineBuildingOffice2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">HostelCare</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                How it works
              </a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors cursor-pointer"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <HiOutlineSun className="w-5 h-5 text-amber-400" />
                ) : (
                  <HiOutlineMoon className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Login
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 cursor-pointer"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <HiOutlineSun className="w-5 h-5 text-amber-400" />
                ) : (
                  <HiOutlineMoon className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 cursor-pointer"
              >
                {mobileMenu ? (
                  <HiOutlineXMark className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                ) : (
                  <HiOutlineBars3 className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-white dark:bg-dark-900 border-b border-slate-200 dark:border-dark-700 animate-slide-up">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" onClick={() => setMobileMenu(false)} className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                How it works
              </a>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>



      <main className="flex-1">
        <Outlet />
      </main>



      <footer className="bg-slate-900 dark:bg-dark-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                  <HiOutlineBuildingOffice2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">HostelCare</span>
              </div>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Hostel Issue Management System. <br /> Students report issues; wardens resolve them floor by floor.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} HostelCare. All rights reserved ( :</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
