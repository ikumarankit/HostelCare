import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { PageLoader } from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate, formatDateTime, getCategoryIcon, getCategoryLabel } from '../../utils/helpers';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel, HiOutlineTrash } from 'react-icons/hi2';

export default function ComplaintHistory() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const filterRef = useRef(null);

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

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async (complaintId) => {
    setDeleting(true);
    try {
      await complaintService.delete(complaintId);
      setComplaints((prev) => prev.filter((c) => c.id !== complaintId));
      setDeleteConfirm(null);
      setSelectedComplaint(null);
    } catch (err) {
      alert(err.message || 'Failed to delete complaint');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <PageLoader />;

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const filtered = complaints.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-dark-900 dark:text-white">COMPLAINT HISTORY</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">View and track all reported issues</p>
      </div>

      {/* Search + Filter */}
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

        {/* Filter Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer
              ${statusFilter !== 'all'
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-500/50'
                : 'border-dark-300 dark:border-dark-600 text-dark-500 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-700'
              }`}
          >
            <HiOutlineFunnel className="w-4 h-4" />
            <span>{filterOptions.find((f) => f.value === statusFilter)?.label || 'Filter'}</span>
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-44 py-1.5 rounded-xl border border-dark-200 dark:border-dark-600 bg-white dark:bg-dark-800 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setStatusFilter(opt.value);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer
                    ${statusFilter === opt.value
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium'
                      : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Complaint Cards */}
      {filtered.length === 0 ? (
        <EmptyState title="No complaints found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} hover className="cursor-pointer relative group" onClick={() => setSelectedComplaint(c)}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{getCategoryIcon(c.category)}</div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.status} />
                    {c.status === 'pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(c);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                        title="Delete complaint"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white mb-1 line-clamp-1">{c.title}</h3>
                <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-dark-200 dark:border-dark-700">
                  <span className="text-xs text-dark-400">{c.id} · {formatDate(c.createdAt)}</span>
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
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedComplaint.status} />
                {selectedComplaint.status === 'pending' && (
                  <button
                    onClick={() => setDeleteConfirm(selectedComplaint)}
                    className="p-2 rounded-lg text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                    title="Delete complaint"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Complaint" size="sm">
        {deleteConfirm && (
          <div className="space-y-4">
            <p className="text-sm text-dark-600 dark:text-dark-300">
              Are you sure you want to delete complaint <span className="font-semibold text-dark-900 dark:text-white">{deleteConfirm.id}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-dark-300 dark:border-dark-600 text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 transition-all cursor-pointer"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
