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
  { icon: HiOutlineBoltSlash, title: 'Electricity', desc: 'Fans or lights not working, sockets not working.' },
  { icon: HiOutlineWrenchScrewdriver, title: 'Furniture', desc: 'Broken chairs, study-tables, cupboards, or beds.' },
  { icon: HiOutlineSparkles, title: 'Cleaning', desc: 'Dirty rooms or washroom' },
  { icon: HiOutlineBeaker, title: 'Water & Plumbing', desc: 'Water leaks or low pressure water' },
  { icon: HiOutlineSignal, title: 'Wi‑Fi', desc: 'Internet not working or too slow.' },
  { icon: HiOutlineShieldCheck, title: 'Washroom', desc: 'Broken taps, tiles, or geyser not working.' },
];

const steps = [
  { num: '1', title: 'Report your room problem', desc: 'Tell us what\'s wrong — pick the type, your room number, and how urgent it is.' },
  { num: '2', title: 'Warden looks into it', desc: 'Your floor warden sees the complaint and starts working on it.' },
  { num: '3', title: 'Problem gets fixed', desc: 'You can check the status anytime — from pending to in-progress to done.' },
];

const highlights = [
  { icon: HiOutlineClipboardDocumentCheck, title: 'Everything organized', desc: 'Each complaint is sorted by type and priority so nothing gets lost.' },
  { icon: HiOutlineBellAlert, title: 'Always know what\'s happening', desc: 'Wardens update the status so you can see when your issue will be fixed.' },
  { icon: HiOutlineChartBar, title: 'Admin keeps things running', desc: 'Admins can see all complaints, manage users, and check what needs attention.' },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero of landing page */}
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
              Hostel Issue Management System
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Having issues with your hostel room?{' '}
              <span className="text-primary-600 dark:text-primary-400">Report them here and track their status.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
              HostelCare lets you report hostel problems like Electricity, Furniture, Wifi, etc. Your warden gets notified and fixes it. You can track the progress of your complaint until it's resolve.
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
              { icon: HiOutlineHomeModern, title: 'Students', desc: 'Report problems of their room and check the status of reported problem.' },
              { icon: HiOutlineUserGroup, title: 'Wardens', desc: 'See complaints of their assign floors and update the status of the problem.' },
              { icon: HiOutlineChartBar, title: 'Admin', desc: 'Manage all students, wardens and view reports, and keep the system running smoothly.' },
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



      {/* Features or Categories*/}
      <section id="features" className="py-20 bg-white dark:bg-dark-900 border-y border-slate-200 dark:border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">Categories</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">What kind of problems can you report?</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl">Pick a category when you file a complaint — your floor warden will solve it.</p>
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
            <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">Simple steps</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">How does it work?</h2>
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
        </div>
      </section>

      {/* CTA or login direct page*/}
      <section className="py-20 bg-slate-900 dark:bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-slate-400 mb-8">
            Log in as a student, warden, or admin —
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
