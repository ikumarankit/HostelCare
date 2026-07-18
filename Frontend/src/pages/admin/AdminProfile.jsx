import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { RoleBadge } from '../../components/ui/Badge';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineHome, HiOutlineShieldCheck } from 'react-icons/hi2';

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Your account information</p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b border-dark-200 dark:border-dark-700">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-violet-500/30">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{user?.name}</h2>
                <RoleBadge role={user?.role} />
              </div>
              <p className="text-sm text-dark-500 dark:text-dark-400">{user?.email}</p>
              <p className="text-xs text-dark-400 mt-1">{user?.hostel || 'Hostel A'} · Administrator</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: HiOutlineEnvelope, label: 'Email', value: user?.email },
              { icon: HiOutlinePhone, label: 'Phone', value: user?.phone || 'Not set' },
              { icon: HiOutlineHome, label: 'Hostel', value: user?.hostel || 'Hostel A' },
              { icon: HiOutlineShieldCheck, label: 'Role', value: 'Administrator' },
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
        </div>
      </Card>
    </div>
  );
}
