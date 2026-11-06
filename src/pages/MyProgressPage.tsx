import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Target,
  BarChart2,
  Calendar,
  CheckCircle2,
  Zap,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyProgressPage: React.FC = () => {
  const { profile, progressData } = useApp();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');

  const subjectBreakdown = [
    { name: 'CS 201 - Algorithms', hours: 48.5, target: 50, percent: 97, color: 'bg-indigo-500' },
    { name: 'Math 212 - Calculus II', hours: 36.0, target: 40, percent: 90, color: 'bg-purple-500' },
    { name: 'Phys 110 - Modern Physics', hours: 28.5, target: 35, percent: 81, color: 'bg-sky-500' },
    { name: 'CogSci 101 - Perception', hours: 16.5, target: 20, percent: 82, color: 'bg-emerald-500' },
    { name: 'Phil 140 - Bioethics', hours: 13.0, target: 15, percent: 86, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <span>Academic Momentum & Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Quantified focus telemetry, cognitive endurance, and subject balance.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeRange === 'week' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeRange === 'month' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Past 30 Days
          </button>
          <button
            onClick={() => setTimeRange('semester')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeRange === 'semester' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Semester
          </button>
        </div>
      </div>

      {/* KPI metric strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Total Focus Hours</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
            {profile.totalStudyHours}h
          </p>
          <p className="text-xs text-emerald-400 mt-2 font-mono tabular-nums">
            +14% vs previous week
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Average Daily Focus</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
            3.8h
          </p>
          <p className="text-xs text-slate-400 mt-2">Optimal deep-work pacing</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Flow State Quality Index</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono tabular-nums mt-1">
            91%
          </p>
          <p className="text-xs text-slate-400 mt-2">Based on timer completions</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Tasks Closed</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
            {profile.tasksCompletedTotal}
          </p>
          <p className="text-xs text-purple-300 font-mono tabular-nums mt-2">
            89.4% on-time submission rate
          </p>
        </div>
      </div>

      {/* Subject Mastery and Time Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Course Time Allocation & Target Pacing</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Distribution of hours compared against recommended syllabus guidelines.
            </p>
          </div>

          <div className="space-y-4">
            {subjectBreakdown.map((subj) => (
              <div key={subj.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">{subj.name}</span>
                  <span className="font-mono tabular-nums text-slate-400">
                    {subj.hours}h / {subj.target}h target ({subj.percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${subj.color} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${subj.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Habit Insights */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-5">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Productivity Insights</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-bold text-white">Peak Focus Window</p>
              <p className="text-xs text-slate-300 mt-1">
                Your highest retention and fastest task completion happens between <strong>9:00 AM – 11:30 AM</strong>. Schedule proofs and code sprints here.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-bold text-white">Interleaved Cadence</p>
              <p className="text-xs text-slate-300 mt-1">
                Switching between Calculus and Computer Science after 50 minutes boosted your retention score by <strong>18%</strong> over continuous single-subject blocks.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-bold text-white">Streak Multiplier</p>
              <p className="text-xs text-slate-300 mt-1">
                14-day study streak is currently granting an automatic <strong>1.25x XP bonus</strong> across all checked daily goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
