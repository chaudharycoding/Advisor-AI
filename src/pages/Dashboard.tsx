import React from 'react';
import mockUserData from '../data/mockUser.json';

export const Dashboard: React.FC = () => {
  const { profile } = mockUserData;

  const progressPercentage = (profile.creditsCompleted / profile.creditsRequired) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="max-w-full mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <h2 className="text-lg text-slate-300 font-medium">Dashboard</h2>
          <h2 className="text-lg text-slate-500">Library</h2>
          <h2 className="text-lg text-slate-500">Insights</h2>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search insights..."
            className="bg-dark-panel border border-dark-border rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 w-64"
          />
          <button className="w-10 h-10 rounded-xl bg-dark-panel border border-dark-border flex items-center justify-center hover:border-accent-blue/50 transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
            <span className="text-sm font-bold">{profile.name.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-serif mb-4">Welcome back, {profile.name.split(' ')[0]}.</h1>
        <p className="text-slate-400 text-lg">
          Your academic trajectory is currently ascending. AdvisorAI has identified 3 new
          opportunities for research alignment.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* AI-Driven Insights Card */}
        <div className="col-span-2 card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">AI-Driven Insights</h2>
          </div>

          <div className="bg-dark-bg/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3">Course Recommendations</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Based on your strong performance in Data Structures (A) and Algorithms (A-),
              consider taking Advanced Algorithms next semester. Professor Martinez's section
              has high student success rates and aligns well with your learning style.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>GRADE PREDICTION</span>
                </div>
                <div className="text-2xl font-bold">A (94%)</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>OPTIMAL STUDY WINDOW</span>
                </div>
                <div className="text-2xl font-bold">9 PM - 11 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Degree Completion */}
        <div className="card flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-6">Degree Completion</h3>
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="rgba(125, 211, 252, 0.1)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold glow-text">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-slate-500 mt-1">{profile.creditsCompleted}/{profile.creditsRequired} credits</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">On track for Graduation:</p>
            <p className="text-slate-100 font-semibold">{profile.expectedGraduation}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="stat-card text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-8 h-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div className="text-3xl font-bold mb-1">08</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Active Courses</div>
        </div>
        <div className="stat-card text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Scholar Credits</div>
        </div>
        <div className="stat-card text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-8 h-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="text-3xl font-bold mb-1">24</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Study Hours/Week</div>
        </div>
        <div className="stat-card text-center">
          <div className="flex justify-center mb-2">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="text-3xl font-bold mb-1">02</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Tasks Pending</div>
        </div>
      </div>

      {/* GPA Trajectory & Academic Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* GPA Chart */}
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">GPA Trajectory</h2>
            <span className="text-slate-400 text-sm">Cumulative: {profile.gpa}</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {[
              { label: 'FALL 22', value: 3.7, forecast: false },
              { label: 'SPRING 23', value: 3.8, forecast: false },
              { label: 'FALL 23', value: 3.6, forecast: false },
              { label: 'SPRING 24', value: 3.75, forecast: false },
              { label: 'FALL 24', value: 3.9, forecast: false },
              { label: 'FORECAST', value: 3.85, forecast: true },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center h-40 mb-2">
                  <div
                    className={`w-full rounded-t-lg ${item.forecast ? 'bg-accent-blue/20 border-2 border-dashed border-accent-blue/50' : 'bg-gradient-to-t from-accent-blue to-accent-purple'}`}
                    style={{ height: `${(item.value / 4) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Academic Activity</h2>
            <button className="text-xs text-accent-blue hover:underline">View All History</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Advising Session: Thesis Direction</h4>
                <p className="text-xs text-slate-500">Completed with Dr. Julian Thomas • 2 hours ago</p>
              </div>
              <span className="text-xs px-2 py-1 bg-dark-bg rounded text-slate-500 flex-shrink-0">SESSION LOG</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Grade Updated: Quantum Mechanics II</h4>
                <p className="text-xs text-slate-500">Midterm Result: A+ (98%) • Yesterday</p>
              </div>
              <span className="text-xs px-2 py-1 bg-dark-bg rounded text-slate-500 flex-shrink-0">ACADEMIC RECORD</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-dark-panel-hover flex-shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Draft Submitted: AI Ethics Framework</h4>
                <p className="text-xs text-slate-500">To Research Portal • 2 days ago</p>
              </div>
              <span className="text-xs px-2 py-1 bg-dark-bg rounded text-slate-500 flex-shrink-0">SUBMISSION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
