import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  TrendingUp,
  Flame,
  Award,
  Laugh,
  Store,
  Sparkles,
  Settings,
  Zap,
  ArrowLeft,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { profile } = useApp();

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: LayoutDashboard, end: true },
    { label: 'Study Planner', path: '/app/planner', icon: CalendarCheck },
    { label: 'My Progress', path: '/app/progress', icon: TrendingUp },
    { label: 'Challenges', path: '/app/challenges', icon: Flame },
    { label: 'Leaderboard', path: '/app/leaderboard', icon: Award },
    { label: 'Meme Zone', path: '/app/meme-zone', icon: Laugh },
    { label: 'Rewards Store', path: '/app/rewards', icon: Store },
    { label: 'AI Student Coach', path: '/app/coach', icon: Sparkles },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div>
          <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/20">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">Upgrade Hub</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600/15 text-purple-300 border border-purple-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Student Mini Profile & Navigation Return */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
              />
              <span className="absolute -bottom-1 -right-1 px-1 bg-purple-600 text-[10px] font-mono text-white rounded font-bold">
                L{profile.level}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{profile.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="font-mono tabular-nums text-purple-300 font-medium">
                  {profile.currentXp.toLocaleString()} XP
                </span>
                <span aria-hidden="true">·</span>
                <span>{profile.streakDays}d streak</span>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
