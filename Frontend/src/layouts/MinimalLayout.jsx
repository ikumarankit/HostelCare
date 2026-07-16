import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineBuildingOffice2, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export default function MinimalLayout() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-950">
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-dark-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <HiOutlineBuildingOffice2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">HostelCare</span>
            </Link>

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
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>


      <footer className="hidden md:block bg-slate-900 dark:bg-dark-950 border-t border-slate-800">
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
          </div>
          <div className="mt-10 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} HostelCare. All rights reserved ( :</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
