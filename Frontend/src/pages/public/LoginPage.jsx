import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineBuildingOffice2,
  HiOutlineDevicePhoneMobile,
  HiOutlineArrowLeft,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineCog6Tooth,
  HiOutlineBolt,
} from 'react-icons/hi2';

const roleLabels = { student: 'Student', warden: 'Warden', admin: 'Admin' };

const demoAccounts = [
  {
    role: 'student',
    label: 'Student',
    email: 'arjun@hostel.edu',
    password: 'hostel123',
    name: 'Arjun Sharma',
    description: 'Room 204, Floor 2',
    icon: HiOutlineAcademicCap,
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10 dark:bg-blue-500/5',
    borderColor: 'border-blue-200 dark:border-blue-800/40',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
    textColor: 'text-blue-700 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    role: 'warden',
    label: 'Warden',
    email: 'warden@hostel.edu',
    password: 'hostel123',
    name: 'Mr. Rajendra Mishra',
    description: 'Floors 1–3',
    icon: HiOutlineShieldCheck,
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10 dark:bg-blue-500/5',
    borderColor: 'border-blue-200 dark:border-blue-800/40',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
    textColor: 'text-blue-700 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    role: 'admin',
    label: 'Admin',
    email: 'admin@hostel.edu',
    password: 'hostel123',
    name: 'Dr. Suresh Iyer',
    description: 'Full system access',
    icon: HiOutlineCog6Tooth,
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10 dark:bg-blue-500/5',
    borderColor: 'border-blue-200 dark:border-blue-800/40',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
    textColor: 'text-blue-700 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
];

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetContact, setResetContact] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const data = await login(identifier.trim(), password, role);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(`/${data.user.role}/dashboard`);
    } catch {
      toast.error('Invalid credentials. Check your details and role.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (account) => {
    setDemoLoading(account.role);
    try {
      const data = await login(account.email, account.password, account.role);
      toast.success(`Welcome, ${data.user.name}! (Demo ${account.label})`);
      navigate(`/${data.user.role}/dashboard`);
    } catch {
      toast.error(`Demo login failed. Make sure the backend is running and seeded.`);
    } finally {
      setDemoLoading(null);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetContact.trim()) {
      toast.error('Please enter your email or mobile number');
      return;
    }
    setResetLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setResetLoading(false);
    toast.success('Password reset request sent to your warden or administrator.');
    setShowForgotPassword(false);
    setResetContact('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Brand panel — desktop */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-600/40 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.07]"/>
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div>
            <h2 className="pt-50 text-1xl xl:text-3xl font-bold tracking-tight leading-tight">
              Having issues with your hostel room? Report them here and track their status.<br />
              <span className="text-primary-300">Relax! We'll help solve it.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-md">
              Students Report problems of their room and check the status of reported problem. Wardens see complaints of their assign floors and update the status of the problem. You can track everything from start to finish.
            </p>
          </div>
        </div>
      </div>



      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-24 lg:py-12 bg-slate-50 dark:bg-dark-950">
        <div className="w-full max-w-md animate-slide-up">
          <Link
            to="/"
            className="sm:pt-4 md:pt-6 lg:pt-8 xl:pt-10 inline-flex items-center gap-1.5 text-sm font-medium text-dark-500 hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-2xl font-bold text-dark-900 dark:text-white tracking-tight">Log in</h1>
          <p className="text-sm text-dark-500 dark:text-dark-400 mt-1 mb-8">
            Enter your hostel-registered email id or mobile number to log in.
          </p>

          <div className="bg-white dark:bg-dark-900 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email / Mobile toggle */}
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Log in with</label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-dark-800">
                  {[
                    { id: 'email', label: 'Email', icon: HiOutlineEnvelope },
                    { id: 'mobile', label: 'Mobile', icon: HiOutlineDevicePhoneMobile },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setLoginMethod(m.id); setIdentifier(''); }}
                      className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer
                        ${loginMethod === m.id
                          ? 'bg-white dark:bg-dark-700 text-primary-700 dark:text-primary-400 shadow-sm'
                          : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200'
                        }`}
                    >
                      <m.icon className="w-4 h-4" />
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label={loginMethod === 'email' ? 'Email address' : 'Mobile number'}
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={loginMethod === 'email' ? 'you@gmail.com' : '10-digit mobile number'}
                icon={loginMethod === 'email' ? HiOutlineEnvelope : HiOutlineDevicePhoneMobile}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={HiOutlineLockClosed}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Choose Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['student', 'warden', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer
                        ${role === r
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/25 text-primary-700 dark:text-primary-400'
                          : 'border-slate-200 dark:border-dark-600 text-dark-500 hover:border-slate-300 dark:hover:border-dark-500'
                        }`}
                    >
                      {roleLabels[r]}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Login
              </Button>

              {/* ── Quick Demo Login ── */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-dark-700" />
                  <span className="text-[10px] font-semibold text-dark-400 dark:text-dark-500 uppercase tracking-wider">Demo Login</span>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-dark-700" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {demoAccounts.map((account) => {
                    const isLoading = demoLoading === account.role;
                    return (
                      <button
                        key={account.role}
                        id={`demo-login-${account.role}`}
                        type="button"
                        disabled={demoLoading !== null}
                        onClick={() => handleDemoLogin(account)}
                        className={`py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer
                          ${account.borderColor} ${account.hoverBorder} ${account.textColor}
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isLoading ? 'Logging in…' : account.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} title="Reset password">
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
            Enter your hostel registered email id or mobile number. Your warden or admin will help you reset your password.
          </p>
          <Input
            label="Email or mobile number"
            type="text"
            placeholder="Email or 10-digit mobile"
            icon={HiOutlineEnvelope}
            value={resetContact}
            onChange={(e) => setResetContact(e.target.value)}
            required
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={resetLoading} className="flex-1">
              Submit request
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowForgotPassword(false)} className="px-4">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
