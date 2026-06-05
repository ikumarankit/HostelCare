import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export function Input({ label, error, icon: Icon, className = '', type = 'text', ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800
            text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200
            ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'} py-2.5 text-sm outline-none
            ${error ? 'border-danger-500 focus:ring-danger-500' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-danger-500">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">{label}</label>}
      <select
        className={`w-full rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800
          text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-all duration-200 px-4 py-2.5 text-sm outline-none cursor-pointer
          ${error ? 'border-danger-500 focus:ring-danger-500' : ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-danger-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">{label}</label>}
      <textarea
        className={`w-full rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800
          text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200
          px-4 py-2.5 text-sm outline-none resize-none
          ${error ? 'border-danger-500 focus:ring-danger-500' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger-500">{error}</p>}
    </div>
  );
}
