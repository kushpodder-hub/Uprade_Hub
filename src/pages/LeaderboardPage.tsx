import React, { useState } from 'react';
import { Award, Flame, Zap, Trophy, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard } = useApp();
  const [cohortFilter, setCohortFilter] = useState<'campus' | 'global' | 'friends'>('campus');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>Student Study Leaderboard</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Healthy academic competition based on verified deep work hours and goal completion.
          </p>
        </div>

        {/* Cohort Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setCohortFilter('campus')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              cohortFilter === 'campus'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Stanford Cohort
          </button>
          <button
            onClick={() => setCohortFilter('global')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              cohortFilter === 'global'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Global All-Colleges
          </button>
          <button
            onClick={() => setCohortFilter('friends')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              cohortFilter === 'friends'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Study Circle
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((entry, idx) => {
          const podiumColor =
            idx === 0
              ? 'border-amber-400/50 bg-gradient-to-b from-amber-500/10 to-slate-900'
              : idx === 1
              ? 'border-slate-400/40 bg-gradient-to-b from-slate-400/10 to-slate-900'
              : 'border-amber-700/40 bg-gradient-to-b from-amber-700/10 to-slate-900';
          const medalLabel = idx === 0 ? '🥇 1st Place' : idx === 1 ? '🥈 2nd Place' : '🥉 3rd Place';

          return (
            <div
              key={entry.username}
              className={`p-6 rounded-2xl border ${podiumColor} flex flex-col items-center text-center relative`}
            >
              <span className="text-xs font-mono font-bold text-amber-400 mb-3">{medalLabel}</span>
              <img
                src={entry.avatarUrl}
                alt={entry.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 mb-3 shadow-md"
              />
              <h4 className="text-base font-bold text-white">{entry.name}</h4>
              <p className="text-xs text-slate-400">{entry.university}</p>

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800/80 w-full justify-center text-xs">
                <span className="font-mono text-purple-300 font-bold tabular-nums">
                  {entry.xp.toLocaleString()} XP
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-amber-400 font-mono tabular-nums">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {entry.streak}d streak
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <span>Student Scholar</span>
          <div className="flex items-center gap-8">
            <span className="w-20 text-right">Streak</span>
            <span className="w-24 text-right">XP Earned</span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60">
          {leaderboard.map((entry) => (
            <div
              key={entry.username}
              className={`px-6 py-4 flex items-center justify-between transition-colors ${
                entry.isCurrentUser
                  ? 'bg-purple-950/30 border-l-2 border-purple-500'
                  : 'hover:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-sm w-6 text-center tabular-nums text-slate-400">
                  #{entry.rank}
                </span>

                <img
                  src={entry.avatarUrl}
                  alt={entry.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{entry.name}</span>
                    {entry.isCurrentUser && (
                      <span className="text-[10px] font-mono font-bold bg-purple-600/30 text-purple-300 px-1.5 py-0.5 rounded">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{entry.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 text-xs font-mono tabular-nums">
                <div className="w-20 text-right flex items-center justify-end gap-1 text-amber-400 font-medium">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{entry.streak}d</span>
                </div>
                <div className="w-24 text-right font-bold text-purple-300">
                  {entry.xp.toLocaleString()} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
