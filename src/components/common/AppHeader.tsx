import React from 'react';
import { Menu, Flame, Zap, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AppHeaderProps {
  onMenuToggle: () => void;
  pageTitle: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onMenuToggle, pageTitle }) => {
  const { profile } = useApp();

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400 hidden sm:inline">Upgrade Hub</span>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">/</span>
          <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight">{pageTitle}</h1>
        </div>
      </div>

      {/* Right side telemetry & student stats */}
      <div className="flex items-center gap-4">
        {/* Streak and XP telemetry (Zero-pill discipline: unboxed text with · separators) */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300 bg-slate-800/60 px-3.5 py-1.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-mono tabular-nums">{profile.streakDays} Day Streak</span>
          </div>

          <span className="text-slate-600" aria-hidden="true">·</span>

          <div className="flex items-center gap-1.5 text-purple-300 font-medium">
            <Zap className="w-3.5 h-3.5 fill-purple-400" />
            <span className="font-mono tabular-nums">{profile.currentXp.toLocaleString()} XP</span>
          </div>

          {profile.streakShieldActive && (
            <>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <div className="flex items-center gap-1 text-emerald-400" title="Streak Shield Active">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Shielded</span>
              </div>
            </>
          )}
        </div>

        {/* Student Avatar Lockup */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-purple-500/30"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">{profile.name}</p>
            <p className="text-[11px] text-slate-400 leading-tight">Level {profile.level} Scholar</p>
          </div>
        </div>
      </div>
    </header>
  );
};
