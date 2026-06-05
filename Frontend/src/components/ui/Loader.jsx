export function Loader({ fullScreen = false, size = 'md' }) {
  const sizeClasses = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} border-4 border-dark-200 dark:border-dark-700 border-t-primary-500 rounded-full animate-spin`} />
      {size !== 'sm' && <p className="text-sm text-dark-500 dark:text-dark-400 animate-pulse">Loading...</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-950/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-dark-200 dark:border-dark-700 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-sm text-dark-500 dark:text-dark-400">Loading page...</p>
      </div>
    </div>
  );
}
