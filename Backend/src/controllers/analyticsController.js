import { Complaint } from '../models/Complaint.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const CATEGORY_COLORS = {
  electricity: '#3b82f6',
  furniture: '#f59e0b',
  cleaning: '#22c55e',
  water: '#06b6d4',
  wifi: '#8b5cf6',
  washroom: '#ef4444',
};

const CATEGORY_LABELS = {
  electricity: 'Electricity',
  furniture: 'Furniture',
  cleaning: 'Cleaning',
  water: 'Water',
  wifi: 'WiFi',
  washroom: 'Washroom',
};

export const getAnalytics = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find().lean();

  const categoryMap = {};
  const statusMap = { pending: 0, 'in-progress': 0, resolved: 0, rejected: 0 };
  const priorityMap = { low: 0, medium: 0, high: 0, urgent: 0 };
  const floorMap = {};

  const monthlyMap = {};

  for (const c of complaints) {
    categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
    statusMap[c.status] = (statusMap[c.status] || 0) + 1;
    priorityMap[c.priority] = (priorityMap[c.priority] || 0) + 1;

    const floorKey = `Floor ${c.floor}`;
    if (!floorMap[floorKey]) {
      floorMap[floorKey] = { floor: floorKey, total: 0, pending: 0, resolved: 0, inProgress: 0 };
    }
    floorMap[floorKey].total += 1;
    if (c.status === 'pending') floorMap[floorKey].pending += 1;
    else if (c.status === 'resolved') floorMap[floorKey].resolved += 1;
    else if (c.status === 'in-progress') floorMap[floorKey].inProgress += 1;

    const d = new Date(c.createdAt);
    const monthKey = d.toLocaleString('en-US', { month: 'short' });
    if (!monthlyMap[monthKey]) monthlyMap[monthKey] = { month: monthKey, complaints: 0, resolved: 0 };
    monthlyMap[monthKey].complaints += 1;
    if (c.status === 'resolved') monthlyMap[monthKey].resolved += 1;
  }

  const categoryDistribution = Object.entries(categoryMap).map(([key, value]) => ({
    name: CATEGORY_LABELS[key] || key,
    value,
    fill: CATEGORY_COLORS[key] || '#64748b',
  }));

  const statusDistribution = [
    { name: 'Pending', value: statusMap.pending, fill: '#f59e0b' },
    { name: 'In Progress', value: statusMap['in-progress'], fill: '#3b82f6' },
    { name: 'Resolved', value: statusMap.resolved, fill: '#22c55e' },
    { name: 'Rejected', value: statusMap.rejected, fill: '#ef4444' },
  ].filter((s) => s.value > 0);

  const priorityDistribution = [
    { name: 'Low', value: priorityMap.low, fill: '#22c55e' },
    { name: 'Medium', value: priorityMap.medium, fill: '#f59e0b' },
    { name: 'High', value: priorityMap.high, fill: '#f97316' },
    { name: 'Urgent', value: priorityMap.urgent, fill: '#ef4444' },
  ].filter((p) => p.value > 0);

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyComplaintData = Object.values(monthlyMap).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  const floorWiseData = Object.values(floorMap).sort(
    (a, b) => parseInt(a.floor.replace(/\D/g, ''), 10) - parseInt(b.floor.replace(/\D/g, ''), 10)
  );

  res.json({
    success: true,
    data: {
      categoryDistribution,
      statusDistribution,
      priorityDistribution,
      monthlyComplaintData,
      floorWiseData,
    },
  });
});
