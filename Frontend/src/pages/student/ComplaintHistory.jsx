import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { PageLoader } from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate, formatDateTime, getCategoryIcon, getCategoryLabel } from '../../utils/helpers';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';

export default function ComplaintHistory() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

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

  const filtered = complaints.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Complaint History</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">View and track all your reported issues</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-sm text-dark-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineFunnel className="w-4 h-4 text-dark-400" />
          {['all', 'pending', 'in-progress', 'resolved', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer capitalize
                ${statusFilter === s
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700'
                }`}
            >
              {s === 'all' ? 'All' : s === 'in-progress' ? 'In Progress' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint Cards */}
      {filtered.length === 0 ? (
        <EmptyState title="No complaints found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} hover className="cursor-pointer" onClick={() => setSelectedComplaint(c)}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{getCategoryIcon(c.category)}</div>
                  <StatusBadge status={c.status} />
                </div>
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white mb-1 line-clamp-1">{c.title}</h3>
                <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-dark-200 dark:border-dark-700">
                  <span className="text-xs text-dark-400">{c.id} · Room {c.room}</span>
                  <PriorityBadge priority={c.priority} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={!!selectedComplaint} onClose={() => setSelectedComplaint(null)} title="Complaint Details" size="lg">
        {selectedComplaint && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-dark-400 font-medium">{selectedComplaint.id}</p>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mt-1">{selectedComplaint.title}</h3>
              </div>
              <StatusBadge status={selectedComplaint.status} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['Category', `${getCategoryIcon(selectedComplaint.category)} ${getCategoryLabel(selectedComplaint.category)}`],
                ['Priority', selectedComplaint.priority],
                ['Room', selectedComplaint.room],
                ['Floor', selectedComplaint.floor],
                ['Submitted', formatDateTime(selectedComplaint.createdAt)],
                ['Updated', formatDateTime(selectedComplaint.updatedAt)],
              ].map(([label, val]) => (
                <div key={label} className="p-3 rounded-xl bg-dark-50 dark:bg-dark-700/50">
                  <p className="text-[10px] text-dark-400 uppercase font-medium mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-dark-900 dark:text-white capitalize">{val}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs text-dark-400 uppercase font-medium mb-1">Description</p>
              <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">{selectedComplaint.description}</p>
            </div>

            {selectedComplaint.notes && (
              <div className="p-3 rounded-xl bg-dark-50 dark:bg-dark-700/50">
                <p className="text-xs text-dark-400 uppercase font-medium mb-1">Notes</p>
                <p className="text-sm text-dark-600 dark:text-dark-300">{selectedComplaint.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
