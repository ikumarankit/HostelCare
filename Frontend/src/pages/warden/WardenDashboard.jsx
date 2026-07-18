import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintService, analyticsService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { StatCard, Card, CardHeader } from '../../components/ui/Card';
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge';
import { PageLoader } from '../../components/ui/Loader';
import { getCategoryIcon, timeAgo } from '../../utils/helpers';
import { HiOutlineClipboardDocumentList, HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
export default function WardenDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [floorWiseData, setFloorWiseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, analytics] = await Promise.all([
          complaintService.getAll(),
          analyticsService.get(),
        ]);
        setComplaints(data);

        // Filter floor-wise data to only show warden's assigned floors
        const allFloorData = analytics.floorWiseData || [];
        if (user?.floors?.length > 0) {
          const assignedFloorLabels = user.floors.map((f) => `Floor ${f}`);
          setFloorWiseData(allFloorData.filter((d) => assignedFloorLabels.includes(d.floor)));
        } else {
          setFloorWiseData(allFloorData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <PageLoader />;

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === 'pending').length;
  const inProgress = complaints.filter((c) => c.status === 'in-progress').length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;

  const recentComplaints = [...complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">DASHBOARD</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">OVERVIEW OF YOUR ASSIGNED FLOOR COMPLAINTS</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiOutlineClipboardDocumentList} label="Total Complaints" value={total} color="primary" />
        <StatCard icon={HiOutlineClock} label="Pending" value={pending} color="warning" trend={`${pending} need attention`} />
        <StatCard icon={HiOutlineExclamationTriangle} label="In Progress" value={inProgress} color="warning" />
        <StatCard icon={HiOutlineCheckCircle} label="Resolved" value={resolved} color="success" trend={total ? `${Math.round((resolved / total) * 100)}% rate` : '0%'} trendUp />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Floor-wise Chart */}
        <Card>
          <CardHeader title="YOUR ASSIGNED FLOOR COMPLAINTS CHART" subtitle={user?.floors?.length > 0 ? `Floor${user.floors.length > 1 ? 's' : ''} ${user.floors.sort((a, b) => a - b).join(', ')}` : 'Distribution across floors'} />
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={floorWiseData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="floor" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
                <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} name="In Progress" />
                <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Complaints */}
        <Card>
          <CardHeader title="RECENT COMPLAINTS" subtitle="Latest reported issues" />
          <div className="divide-y divide-dark-200 dark:divide-dark-700 max-h-80 overflow-y-auto">
            {recentComplaints.map((c) => (
              <div key={c.id} onClick={() => navigate('/warden/complaints')} className="flex items-center gap-3 p-4 hover:bg-dark-50 dark:hover:bg-dark-700/30 transition-colors cursor-pointer">
                <div className="text-xl">{getCategoryIcon(c.category)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark-900 dark:text-white truncate">{c.title}</p>
                  <p className="text-xs text-dark-500 dark:text-dark-400">{c.studentName} · Room {c.room} · {timeAgo(c.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={c.status} />
                  <PriorityBadge priority={c.priority} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
