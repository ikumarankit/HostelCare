import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/api';
import { StatCard, Card, CardHeader } from '../../components/ui/Card';
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { PageLoader } from '../../components/ui/Loader';
import { formatDate, getCategoryIcon, timeAgo } from '../../utils/helpers';
import { HiOutlineClipboardDocumentList, HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlinePlusCircle } from 'react-icons/hi2';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await complaintService.getByStudent(user.id);
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  if (loading) return <PageLoader />;

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === 'pending').length;
  const inProgress = complaints.filter((c) => c.status === 'in-progress').length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;

  const chartData = [
    { name: 'Pending', value: pending, fill: '#f59e0b' },
    { name: 'In Progress', value: inProgress, fill: '#3b82f6' },
    { name: 'Resolved', value: resolved, fill: '#22c55e' },
  ];

  const recentComplaints = [...complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-dark-900 dark:text-white">Hi! {user.name?.toUpperCase().split(' ')[0]}</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">HERE'S YOUR ALL COMPLAINT OVERVIEW</p>
        </div>
        <Link to="/student/create-complaint">
          <Button icon={HiOutlinePlusCircle}>New Complaint</Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiOutlineClipboardDocumentList} label="Total Complaints" value={total} color="primary" />
        <StatCard icon={HiOutlineClock} label="Pending" value={pending} color="warning" />
        <StatCard icon={HiOutlineExclamationTriangle} label="In Progress" value={inProgress} color="warning" />
        <StatCard icon={HiOutlineCheckCircle} label="Resolved" value={resolved} color="success"/>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader title="Complaint Status" subtitle="Overview of complaints" />
          <div className="p-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader
            title="Recent Complaints"
            subtitle="Your latest reported issues"
            action={<Link to="/student/complaints" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</Link>}
          />
          <div className="divide-y divide-dark-200 dark:divide-dark-700">
            {recentComplaints.length === 0 ? (
              <div className="p-8 text-center text-sm text-dark-400">Facing Issue. Create complaint! </div>
            ) : (
              recentComplaints.map((c) => (
                <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-dark-50 dark:hover:bg-dark-700/30 transition-colors">
                  <div className="text-2xl">{getCategoryIcon(c.category)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-900 dark:text-white truncate">{c.title}</p>
                    <p className="text-xs text-dark-500 dark:text-dark-400 mt-0.5">{c.id} · {timeAgo(c.createdAt)}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
