import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { RoleBadge } from '../../components/ui/Badge';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineHome, HiOutlineInformationCircle, HiOutlineBuildingOffice2 } from 'react-icons/hi2';

export default function WardenProfile() {
  const { user } = useAuth();

  const floorsManaged = user?.floors?.length > 0
    ? user.floors.sort((a, b) => a - b).join(', ')
    : 'Not assigned';

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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-500/30">
              {user?.name?.charAt(0).toUpperCase() || 'W'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">{user?.name}</h2>
                <RoleBadge role={user?.role} />
              </div>
              <p className="text-sm text-dark-500 dark:text-dark-400">{user?.email}</p>
              <p className="text-xs text-dark-400 mt-1">{user?.hostel || 'Hostel A'} · Floor{user?.floors?.length > 1 ? 's' : ''} {floorsManaged}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: HiOutlineEnvelope, label: 'Email', value: user?.email },
              { icon: HiOutlinePhone, label: 'Phone', value: user?.phone || 'Not set' },
              { icon: HiOutlineBuildingOffice2, label: 'Hostel', value: user?.hostel || 'Hostel A' },
              { icon: HiOutlineHome, label: 'Floors Managed', value: `Floor${user?.floors?.length > 1 ? 's' : ''} ${floorsManaged}` },
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

      {/* Info Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
        <HiOutlineInformationCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-amber-700 dark:text-amber-400">
          To update your profile details, please contact the main warden or admin. Wardens cannot modify their own credentials.
        </p>
      </div>
    </div>
  );
}
