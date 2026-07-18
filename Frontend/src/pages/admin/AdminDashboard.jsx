import { useState, useEffect } from 'react';
import { complaintService, userService, analyticsService } from '../../services/api';
import { StatCard, Card, CardHeader } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { PageLoader } from '../../components/ui/Loader';
import { getCategoryIcon, timeAgo } from '../../utils/helpers';
import { HiOutlineClipboardDocumentList, HiOutlineUsers, HiOutlineExclamationTriangle, HiOutlineCheckBadge } from 'react-icons/hi2';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [charts, setCharts] = useState({ monthlyComplaintData: [], categoryDistribution: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cData, uData, analytics] = await Promise.all([
          complaintService.getAll(),
          userService.getAll(),
          analyticsService.get(),
        ]);
        setComplaints(cData);
        setUsers(uData);
        setCharts(analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  const totalStudents = users.filter((u) => u.role === 'student').length;
  const totalWardens = users.filter((u) => u.role === 'warden').length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;
  const pendingTotal = complaints.filter((c) => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">DASHBOARD</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">ALL FLOOR COMPLAINTS OVERVIEW AND ANALYTICS</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiOutlineUsers} label="Total Users" value={users.length} color="primary" />
        <StatCard icon={HiOutlineClipboardDocumentList} label="Total Complaints" value={complaints.length} color="warning" />
        <StatCard icon={HiOutlineCheckBadge} label="Resolved" value={resolved} color="success" trend={complaints.length ? `${Math.round((resolved / complaints.length) * 100)}%` : '0%'} trendUp />
        <StatCard icon={HiOutlineExclamationTriangle} label="Total Pending" value={pendingTotal} color="danger" trend={`${pendingTotal} need attention`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader title="Monthly Trends" subtitle="Complaints vs resolved over time" />
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.monthlyComplaintData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Complaints" />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution Pie */}
        <Card>
          <CardHeader title="Category Distribution" subtitle="Complaints by type" />
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.categoryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: '11px' }}>
                  {charts.categoryDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader title="Recent Complaints" subtitle="System-wide latest activity" />
        <div className="divide-y divide-dark-200 dark:divide-dark-700">
          {complaints.slice(0, 6).map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-dark-50 dark:hover:bg-dark-700/30 transition-colors">
              <div className="text-2xl">{getCategoryIcon(c.category)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-900 dark:text-white truncate">{c.title}</p>
                <p className="text-xs text-dark-500">{c.studentName} · Room {c.room} · {timeAgo(c.createdAt)}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
