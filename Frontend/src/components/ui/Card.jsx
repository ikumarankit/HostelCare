export function StatCard({ icon: Icon, label, value, trend, trendUp, color = 'primary', className = '' }) {
  const bgColors = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
    success: 'bg-success-50 text-success-600 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-warning-50 text-warning-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-danger-50 text-danger-600 dark:bg-red-900/30 dark:text-red-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
  };

  return (
    <div className={`bg-white dark:bg-dark-800 rounded-2xl p-5 border border-dark-200 dark:border-dark-700
      hover:shadow-lg hover:shadow-dark-200/50 dark:hover:shadow-dark-900/50 transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-dark-500 dark:text-dark-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-dark-900 dark:text-white">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-2 ${trendUp ? 'text-success-600' : 'text-danger-600'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${bgColors[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700
      ${hover ? 'hover:shadow-lg hover:shadow-dark-200/50 dark:hover:shadow-dark-900/50 hover:-translate-y-0.5 transition-all duration-300' : ''}
      ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between p-5 border-b border-dark-200 dark:border-dark-700 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-dark-500 dark:text-dark-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
