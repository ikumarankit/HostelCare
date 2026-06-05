import { useState, useEffect } from 'react';
import { complaintService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PageLoader } from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import toast from 'react-hot-toast';
import { formatDate, getCategoryIcon, getCategoryLabel, STATUS_OPTIONS } from '../../utils/helpers';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel, HiOutlinePencilSquare, HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalType, setModalType] = useState(null); // 'status' | 'notes'
  const [formData, setFormData] = useState({ status: '', notes: '' });

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cData;
        if (user?.role === 'warden' && user?.floors?.length > 0) {
          cData = await complaintService.getByFloors(user.floors);
        } else {
          cData = await complaintService.getAll();
        }
        setComplaints(cData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const openModal = (complaint, type) => {
    setSelectedComplaint(complaint);
    setModalType(type);
    setFormData({ status: complaint.status, notes: complaint.notes || '' });
  };

  const handleUpdateStatus = async () => {
    if (!selectedComplaint?.id) return;
    try {
      const updated = await complaintService.updateStatus(
        selectedComplaint.id,
        formData.status,
        formData.notes
      );
      setComplaints((prev) =>
        prev.map((c) => (c.id === selectedComplaint.id ? { ...c, ...updated } : c))
      );
      toast.success('Status updated successfully');
      setModalType(null);
      setSelectedComplaint(null);
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  if (loading) return <PageLoader />;

  const filtered = complaints.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()) || c.studentName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Complaint Management</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">
          {user?.role === 'warden' && user?.floors?.length > 0
            ? `Managing complaints for Floor${user.floors.length > 1 ? 's' : ''} ${user.floors.sort((a, b) => a - b).join(', ')}`
            : 'View, update, and manage all complaints'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input type="text" placeholder="Search by title, ID, or student..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-sm text-dark-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <HiOutlineFunnel className="w-4 h-4 text-dark-400 flex-shrink-0" />
          {['all', 'pending', 'in-progress', 'resolved', 'rejected'].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer capitalize
                ${statusFilter === s ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700'}`}>
              {s === 'all' ? 'All' : s === 'in-progress' ? 'In Progress' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No complaints found" description="Adjust your filters to see results." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-50 dark:bg-dark-800/80 border-b border-dark-200 dark:border-dark-700">
                  {['ID', 'Complaint', 'Student', 'Category', 'Priority', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-200 dark:divide-dark-700">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/30 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-dark-500">{c.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-dark-900 dark:text-white truncate max-w-[200px]">{c.title}</p>
                      <p className="text-xs text-dark-400">Room {c.room}, Floor {c.floor}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-dark-600 dark:text-dark-300">{c.studentName}</td>
                    <td className="px-4 py-3 text-sm">{getCategoryIcon(c.category)} {getCategoryLabel(c.category)}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openModal(c, 'status')} title="Update Status" className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 transition-colors cursor-pointer">
                          <HiOutlinePencilSquare className="w-4 h-4" />
                        </button>
                        <button onClick={() => openModal(c, 'notes')} title="Add Notes" className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 transition-colors cursor-pointer">
                          <HiOutlineChatBubbleLeftEllipsis className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Update Status Modal */}
      <Modal isOpen={modalType === 'status'} onClose={() => setModalType(null)} title="Update Complaint Status">
        <div className="space-y-4">
          <p className="text-sm text-dark-500">{selectedComplaint?.id} — {selectedComplaint?.title}</p>
          <Select label="New Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            {STATUS_OPTIONS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
          </Select>
          <textarea placeholder="Add a note (optional)..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 resize-none" rows={3} />
          <Button onClick={handleUpdateStatus} className="w-full">Update Status</Button>
        </div>
      </Modal>

      {/* Notes Modal */}
      <Modal isOpen={modalType === 'notes'} onClose={() => setModalType(null)} title="Complaint Notes">
        <div className="space-y-4">
          <p className="text-sm text-dark-500">{selectedComplaint?.id} — {selectedComplaint?.title}</p>
          {selectedComplaint?.notes && (
            <div className="p-3 rounded-xl bg-dark-50 dark:bg-dark-700/50">
              <p className="text-xs text-dark-400 mb-1">Current Notes</p>
              <p className="text-sm text-dark-700 dark:text-dark-300">{selectedComplaint.notes}</p>
            </div>
          )}
          <textarea placeholder="Add new notes..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 resize-none" rows={4} />
          <Button onClick={handleUpdateStatus} className="w-full">Save Notes</Button>
        </div>
      </Modal>
    </div>
  );
}
