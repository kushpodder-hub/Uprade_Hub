import React from 'react';
import { Flame, Users, Clock, Award, Check, Plus, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChallengesPage: React.FC = () => {
  const { challenges, joinChallenge, profile } = useApp();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400" />
            <span>Active Student Study Challenges</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compete in synchronized focus gauntlets, earn bonus XP, and maintain your streak.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Active Streak Shield Ready</span>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => {
          const progressPercent = Math.min(
            100,
            Math.round((challenge.progress / challenge.maxProgress) * 100)
          );

          return (
            <div
              key={challenge.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                challenge.joined
                  ? 'bg-slate-900/80 border-purple-500/40 shadow-lg shadow-purple-950/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-purple-400 tracking-wider uppercase">
                      {challenge.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                      {challenge.title}
                    </h3>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-purple-600/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold tabular-nums shrink-0">
                    +{challenge.xpReward} XP
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {challenge.description}
                </p>

                {/* Progress bar if joined */}
                {challenge.joined && (
                  <div className="mb-6 space-y-1.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Your Progress</span>
                      <span className="font-mono text-purple-300 font-semibold tabular-nums">
                        {challenge.progress} / {challenge.maxProgress} {challenge.unit} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {challenge.participantsCount.toLocaleString()} students
                  </span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {challenge.daysRemaining}d left
                  </span>
                </div>

                <button
                  onClick={() => joinChallenge(challenge.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all active:scale-95 ${
                    challenge.joined
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm shadow-purple-600/30'
                  }`}
                >
                  {challenge.joined ? 'Leave Challenge' : 'Join Challenge'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
