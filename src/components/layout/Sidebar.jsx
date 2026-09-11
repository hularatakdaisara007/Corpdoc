import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  BarChart3,
  FileText,
  User,
  Settings,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ onCloseMobile }) => {
  const { user, logout } = useAuth();
  const { applications } = useApplications();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Find Jobs', path: '/jobs', icon: Briefcase, badge: 'Hot' },
    { name: 'Assessments', path: '/assessments', icon: FileCheck2 },
    { name: 'My Skills', path: '/skills', icon: BarChart3 },
    { name: 'Applications', path: '/applications', icon: FileText, count: applications.length },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200/80 flex flex-col justify-between select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Corpdoc</span>
                <span className="text-[10px] font-bold uppercase bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded border border-brand-200">
                  Student
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-tight">
                Prove you're ready. Then apply.
              </p>
            </div>
          </div>
        </div>

        {/* 75% Gate Guarantee Pill */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-brand-50 via-indigo-50 to-emerald-50 border border-brand-100/80 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800">75% Job Readiness Gate</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
            Every job requires demonstrating 75%+ score before applying.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-xs border border-brand-200/60 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Settings */}
      <div className="p-4 border-t border-slate-100 space-y-1">
        <NavLink
          to="/settings"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-brand-50 text-brand-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        {/* User Mini Card */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 px-1">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">{user?.name || "Ayush Jain"}</div>
            <div className="text-[11px] text-slate-500 truncate">{user?.education?.degree?.split(' in ')[0] || "CS Student"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
