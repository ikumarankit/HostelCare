const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/20',
  secondary: 'bg-dark-100 hover:bg-dark-200 text-dark-700 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-dark-200',
  danger: 'bg-danger-600 hover:bg-danger-700 text-white shadow-md shadow-danger-500/20',
  success: 'bg-success-600 hover:bg-success-700 text-white shadow-md shadow-success-500/20',
  outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  ghost: 'text-dark-600 hover:bg-dark-100 dark:text-dark-300 dark:hover:bg-dark-800',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', icon: Icon, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}
