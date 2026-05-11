import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-20 bg-dark-panel/30 backdrop-blur-xl border-r border-dark-border/30 h-screen sticky top-0 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-12">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-glow">
          <span className="text-2xl font-bold">L</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-accent-blue/20 text-accent-blue shadow-glow'
                : 'text-slate-500 hover:text-slate-100 hover:bg-dark-panel-hover'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </NavLink>

        {/* Chat */}
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-accent-blue/20 text-accent-blue shadow-glow'
                : 'text-slate-500 hover:text-slate-100 hover:bg-dark-panel-hover'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </NavLink>

        {/* Roadmap */}
        <NavLink
          to="/roadmap"
          className={({ isActive }) =>
            `group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-accent-blue/20 text-accent-blue shadow-glow'
                : 'text-slate-500 hover:text-slate-100 hover:bg-dark-panel-hover'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </NavLink>

        {/* Courses */}
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-accent-blue/20 text-accent-blue shadow-glow'
                : 'text-slate-500 hover:text-slate-100 hover:bg-dark-panel-hover'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-accent-blue/20 text-accent-blue shadow-glow'
                : 'text-slate-500 hover:text-slate-100 hover:bg-dark-panel-hover'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </NavLink>
      </nav>

      {/* Settings Button */}
      <button className="w-14 h-14 rounded-2xl bg-dark-panel-hover border border-dark-border flex items-center justify-center text-slate-500 hover:text-accent-blue hover:border-accent-blue/50 transition-all duration-300">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </aside>
  );
};
