// Category options for complaints
export const COMPLAINT_CATEGORIES = [
  { value: 'electricity', label: 'Electricity'},
  { value: 'furniture', label: 'Furniture'},
  { value: 'cleaning', label: 'Cleaning'},
  { value: 'water', label: 'Water Leakage'},
  { value: 'wifi', label: 'WiFi Issues'},
  { value: 'washroom', label: 'Washroom'},
];

export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'text-green-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-orange-500' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-500' },
];

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'rejected', label: 'Rejected' },
];

export const FLOORS = [1, 2, 3, 4, 5];

// Format date to readable string
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Time ago helper
export const timeAgo = (dateStr) => {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'Just now';
};

// Get status color classes
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-warning-50 text-warning-600 border-warning-200',
    'in-progress': 'bg-primary-50 text-primary-600 border-primary-200',
    resolved: 'bg-success-50 text-success-600 border-success-200',
    rejected: 'bg-danger-50 text-danger-600 border-danger-200',
  };
  return colors[status] || colors.pending;
};

// Get priority color classes
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    urgent: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[priority] || colors.low;
};

export const getCategoryIcon = (category) => {
  const cat = COMPLAINT_CATEGORIES.find((c) => c.value === category);
  return cat ? cat.icon : '📋';
};

export const getCategoryLabel = (category) => {
  const cat = COMPLAINT_CATEGORIES.find((c) => c.value === category);
  return cat ? cat.label : category;
};
