import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api';
import { Card, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineHome, HiOutlinePencilSquare } from 'react-icons/hi2';

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', room: user?.room || '' });

  const handleSave = async () => {
    try {
      const updated = await userService.updateProfile(form);
      updateUser(updated);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b border-dark-200 dark:border-dark-700">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary-500/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{user?.name}</h2>
                <RoleBadge role={user?.role} />
              </div>
              <p className="text-sm text-dark-500 dark:text-dark-400">{user?.email}</p>
              <p className="text-xs text-dark-400 mt-1">{user?.hostel} · Room {user?.room} · Floor {user?.floor}</p>
            </div>
            <Button variant="outline" size="sm" icon={HiOutlinePencilSquare} onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          {editing ? (
            <div className="space-y-4">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} icon={HiOutlinePhone} />
              <Input label="Room Number" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} icon={HiOutlineHome} />
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: HiOutlineEnvelope, label: 'Email', value: user?.email },
                { icon: HiOutlinePhone, label: 'Phone', value: user?.phone || 'Not set' },
                { icon: HiOutlineHome, label: 'Room', value: `Room ${user?.room}, Floor ${user?.floor}` },
                { icon: HiOutlineHome, label: 'Hostel', value: user?.hostel || 'Hostel A' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-dark-50 dark:bg-dark-700/50">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400 font-medium">{item.label}</p>
                    <p className="text-sm font-medium text-dark-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
