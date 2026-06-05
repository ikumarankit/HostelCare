import { useState, useEffect } from 'react';
import { userService } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { RoleBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { PageLoader } from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/helpers';
import { HiOutlineMagnifyingGlass, HiOutlinePlusCircle, HiOutlinePencilSquare, HiOutlineEnvelope, HiOutlinePhone, HiOutlineBuildingOffice } from 'react-icons/hi2';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'student', phone: '', room: '', floor: '1', floors: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openEdit = (user) => {
    setEditUser(user);
    setForm({
      name: user.name, email: user.email, role: user.role, phone: user.phone || '',
      room: user.room || '', floor: user.floor?.toString() || '1',
      floors: user.floors || [],
    });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditUser(null);
    setForm({ name: '', email: '', role: 'student', phone: '', room: '', floor: '1', floors: [] });
    setShowModal(true);
  };

  const toggleFloor = (floorNum) => {
    setForm((prev) => {
      const exists = prev.floors.includes(floorNum);
      return { ...prev, floors: exists ? prev.floors.filter((f) => f !== floorNum) : [...prev.floors, floorNum].sort((a, b) => a - b) };
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    if (form.role === 'warden' && form.floors.length === 0) { toast.error('Please assign at least one floor to the warden'); return; }
    const saveData = {
      name: form.name,
      email: form.email,
      role: form.role,
      phone: form.phone,
    };
    if (form.role === 'student') {
      saveData.room = form.room;
      saveData.floor = Number(form.floor);
    }
    if (form.role === 'warden') {
      saveData.floors = form.floors;
    }
    try {
      if (editUser) {
        const updated = await userService.update(editUser.id, saveData);
        setUsers((prev) => prev.map((u) => (u.id === editUser.id ? updated : u)));
        toast.success('User updated successfully');
      } else {
        const created = await userService.create(saveData);
        setUsers((prev) => [...prev, created]);
        toast.success('User added successfully');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save user');
    }
  };

  if (loading) return <PageLoader />;

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">User Management</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Manage students, wardens, and admin accounts</p>
        </div>
        <Button icon={HiOutlinePlusCircle} onClick={openAdd}>Add User</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-sm text-dark-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'student', 'warden', 'admin'].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer capitalize
                ${roleFilter === r ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* User table */}
      {filtered.length === 0 ? (
        <EmptyState title="No users found" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-50 dark:bg-dark-800/80 border-b border-dark-200 dark:border-dark-700">
                  {['User', 'Email', 'Role', 'Phone', 'Room / Floors', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-200 dark:divide-dark-700">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                          {u.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-dark-900 dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-dark-500 dark:text-dark-400">{u.email}</td>
                    <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                    <td className="px-4 py-3 text-sm text-dark-500 dark:text-dark-400">{u.phone || '—'}</td>
                    <td className="px-4 py-3 text-sm text-dark-500 dark:text-dark-400">
                      {u.role === 'warden' && u.floors?.length > 0
                        ? <span className="inline-flex items-center gap-1"><HiOutlineBuildingOffice className="w-3.5 h-3.5" /> Floor{u.floors.length > 1 ? 's' : ''} {u.floors.sort((a, b) => a - b).join(', ')}</span>
                        : u.room || '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-dark-400">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 transition-colors cursor-pointer">
                        <HiOutlinePencilSquare className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editUser ? 'Edit User' : 'Add User'}>
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={HiOutlineEnvelope} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} icon={HiOutlinePhone} />
          <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="warden">Warden</option>
            <option value="admin">Admin</option>
          </Select>
          {form.role === 'student' && (
            <div className="grid grid-cols-2 gap-4">
              <Input label="Room" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} />
              <Select label="Floor" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })}>
                {[1, 2, 3, 4, 5].map((f) => (<option key={f} value={f}>Floor {f}</option>))}
              </Select>
            </div>
          )}
          {form.role === 'warden' && (
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Assign Floors</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((f) => (
                  <button key={f} type="button" onClick={() => toggleFloor(f)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl border-2 transition-all cursor-pointer
                      ${form.floors.includes(f)
                        ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:border-primary-400 dark:text-primary-300 ring-2 ring-primary-200 dark:ring-primary-800'
                        : 'border-dark-300 dark:border-dark-600 text-dark-500 dark:text-dark-400 hover:border-primary-300 dark:hover:border-primary-600'}`}>
                    Floor {f}
                  </button>
                ))}
              </div>
              {form.floors.length === 0 && (
                <p className="text-xs text-red-500 mt-1.5">Select at least one floor</p>
              )}
            </div>
          )}
          <Button onClick={handleSave} className="w-full">{editUser ? 'Save Changes' : 'Add User'}</Button>
        </div>
      </Modal>
    </div>
  );
}
