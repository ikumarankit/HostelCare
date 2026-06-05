import { Link } from 'react-router-dom';
import {
  HiOutlineBoltSlash,
  HiOutlineWrenchScrewdriver,
  HiOutlineSparkles,
  HiOutlineSignal,
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineClipboardDocumentCheck,
  HiOutlineBellAlert,
  HiOutlineChartBar,
  HiOutlineBuildingOffice2,
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

const features = [
  { icon: HiOutlineBoltSlash, title: 'Electricity', desc: 'Fans, lights, sockets, and wiring faults.' },
  { icon: HiOutlineWrenchScrewdriver, title: 'Furniture', desc: 'Chairs, tables, cupboards, and beds.' },
  { icon: HiOutlineSparkles, title: 'Cleaning', desc: 'Room and corridor hygiene issues.' },
  { icon: HiOutlineBeaker, title: 'Water & plumbing', desc: 'Leaks, pressure, and blocked drains.' },
  { icon: HiOutlineSignal, title: 'Wi‑Fi', desc: 'Connectivity and speed problems.' },
  { icon: HiOutlineShieldCheck, title: 'Washroom', desc: 'Fixtures, tiles, and geysers.' },
];

const steps = [
  { num: '1', title: 'Report the issue', desc: 'Students submit complaints with category, room, floor, and priority.' },
  { num: '2', title: 'Warden takes charge', desc: 'Each warden handles complaints for their assigned floor or floors.' },
  { num: '3', title: 'Track to resolution', desc: 'Status moves from pending through in-progress to resolved with notes.' },
];

const highlights = [
  { icon: HiOutlineClipboardDocumentCheck, title: 'Structured complaints', desc: 'Categories and priorities keep maintenance organized.' },
  { icon: HiOutlineBellAlert, title: 'Clear accountability', desc: 'Wardens update status and notes so students know what is happening.' },
  { icon: HiOutlineChartBar, title: 'Admin oversight', desc: 'Administrators monitor trends and manage users across the hostel.' },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-slate-50 dark:bg-dark-950" />
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 text-xs font-semibold uppercase tracking-wide mb-6">
              <HiOutlineBuildingOffice2 className="w-3.5 h-3.5" />
              Hostel complaint system
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Maintenance requests,{' '}
              <span className="text-primary-600 dark:text-primary-400">handled by floor.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
              Hostel Care connects students, wardens, and administrators. Report room issues digitally; wardens manage one or multiple floors and close the loop with status updates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5"
              >
                Login
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-300 dark:border-dark-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-white dark:hover:bg-dark-800 transition-colors"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Role cards */}
          <div className="mt-16 grid sm:grid-cols-3 gap-4">
            {[
              { icon: HiOutlineHomeModern, title: 'Students', desc: 'File and track complaints for your room and floor.' },
              { icon: HiOutlineUserGroup, title: 'Wardens', desc: 'Review and resolve issues for assigned floors only—or several.' },
              { icon: HiOutlineChartBar, title: 'Administrators', desc: 'User management, analytics, and hostel-wide visibility.' },
            ].map((card) => (
              <div
                key={card.title}
                className="p-5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 shadow-sm"
              >
                <card.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{card.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white dark:bg-dark-900 border-y border-slate-200 dark:border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">Categories</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">What you can report</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl">Common hostel maintenance areas—each routed to the warden responsible for your floor.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group flex gap-4 p-5 rounded-2xl border border-slate-200 dark:border-dark-700 bg-slate-50/50 dark:bg-dark-800/50 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-dark-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">Workflow</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">How Hostel Care works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg flex items-center justify-center mx-auto md:mx-0 mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700">
                <h.icon className="w-7 h-7 text-primary-600 dark:text-primary-400 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{h.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 dark:bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Ready to sign in?</h2>
          <p className="text-slate-400 mb-8">
            Students, wardens, and admins each use the same portal with role-based dashboards.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Login
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
