import { getStatusColor, getPriorityColor } from '../../utils/helpers';

export function StatusBadge({ status }) {
  const label = status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'pending' ? 'bg-warning-500' :
        status === 'in-progress' ? 'bg-primary-500' :
        status === 'resolved' ? 'bg-success-500' : 'bg-danger-500'
      }`} />
      {label}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const label = priority.charAt(0).toUpperCase() + priority.slice(1);
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(priority)}`}>
      {label}
    </span>
  );
}

export function RoleBadge({ role }) {
  const colors = {
    student: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    warden: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    admin: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors[role] || colors.student}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}
