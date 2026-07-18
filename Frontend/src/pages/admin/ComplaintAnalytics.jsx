import { useState, useEffect } from 'react';
import { complaintService, analyticsService } from '../../services/api';
import { Card, CardHeader } from '../../components/ui/Card';
import { PageLoader } from '../../components/ui/Loader';
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function ComplaintAnalytics() {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [charts, setCharts] = useState({
    categoryDistribution: [],
    monthlyComplaintData: [],
    floorWiseData: [],
    statusDistribution: [],
    priorityDistribution: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [cData, analytics] = await Promise.all([
          complaintService.getAll(),
          analyticsService.get(),
        ]);
        setComplaints(cData);
        setCharts(analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <PageLoader />;

  const pending = complaints.filter((c) => c.status === 'pending').length;
  const inProgress = complaints.filter((c) => c.status === 'in-progress').length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">COMPLAINTS ANALYSIS</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Detailed analytics and insights across all floor complaints</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: complaints.length, color: 'text-primary-600' },
          { label: 'Pending', value: pending, color: 'text-warning-600' },
          { label: 'In Progress', value: inProgress, color: 'text-blue-600' },
          { label: 'Resolved', value: resolved, color: 'text-success-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-dark-800 rounded-2xl p-4 border border-dark-200 dark:border-dark-700 text-center">
            <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Monthly Complaint Trend" subtitle="Complaints filed vs resolved" />
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.monthlyComplaintData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Filed" />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Category Distribution" subtitle="Breakdown by complaint type" />
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.categoryDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: '10px' }}>
                  {charts.categoryDistribution.map((entry, idx) => (<Cell key={idx} fill={entry.fill} />))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Floor-wise Analysis" subtitle="Complaints per floor" />
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.floorWiseData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="floor" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
                <Bar dataKey="resolved" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Status & Priority" subtitle="Current complaint breakdown" />
          <div className="p-5 grid grid-cols-2 gap-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.statusDistribution} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`} style={{ fontSize: '10px' }}>
                  {charts.statusDistribution.map((entry, idx) => (<Cell key={idx} fill={entry.fill} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts.priorityDistribution} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`} style={{ fontSize: '10px' }}>
                  {charts.priorityDistribution.map((entry, idx) => (<Cell key={idx} fill={entry.fill} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
