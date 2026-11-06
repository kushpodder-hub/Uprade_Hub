import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  CheckCircle2,
  CalendarCheck,
  TrendingUp,
  Award,
  Laugh,
  Store,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  Check,
  BarChart2,
  Target,
  ShieldCheck,
  AlertCircle,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { profile, goals, progressData, achievements, toggleGoal, addGoal, deleteGoal } = useApp();
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [chartMetric, setChartMetric] = useState<'hours' | 'tasks'>('hours');
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);

  // New goal form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('CS 201 - Algorithms');
  const [newMinutes, setNewMinutes] = useState(45);
  const [newXp, setNewXp] = useState(60);
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Filtered goals
  const filteredGoals = goals.filter((goal) => {
    if (selectedSubjectFilter === 'all') return true;
    return goal.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
  });

  const completedGoalsCount = goals.filter((g) => g.completed).length;
  const totalGoalsCount = goals.length;
  const progressPercent = totalGoalsCount > 0 ? Math.round((completedGoalsCount / totalGoalsCount) * 100) : 0;

  // Maximum value for the chart scale
  const maxMetricValue = Math.max(
    ...progressData.map((d) => (chartMetric === 'hours' ? d.hours : d.tasks)),
    6
  );

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addGoal({
      title: newTitle.trim(),
      subject: newSubject,
      subjectColor: 'purple',
      estimatedMinutes: Number(newMinutes) || 30,
      xpReward: Number(newXp) || 50,
      priority: newPriority,
      deadline: 'Today, 8:00 PM',
    });

    setNewTitle('');
    setIsAddGoalModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. Welcome Section with Student Profile Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/50 border border-purple-500/20 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500/40 shadow-md shadow-purple-900/30"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-mono font-bold rounded-md shadow-sm">
                L{profile.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-purple-300 font-medium mb-1">
                <span>{profile.term}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{profile.university}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {profile.name.split(' ')[0]}!
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-300">
                <span className="text-purple-300 font-semibold">{profile.levelTitle}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.major}</span>
              </div>
            </div>
          </div>

          {/* Quick Streak & Today summary */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Streak Active</p>
                <p className="text-sm font-bold text-white font-mono tabular-nums">
                  {profile.streakDays} Days In A Row
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddGoalModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-sm shadow-purple-600/30 transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Overview Metric Cards (Single-Elevation Depth, Tabular Figures) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP Card */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Study XP</span>
            <div className="w-8 h-8 rounded-lg bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            {profile.currentXp.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span className="text-emerald-400 font-semibold font-mono tabular-nums">+320 XP</span>
            <span>earned today</span>
          </div>
        </div>

        {/* Current Level Card */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Current Level</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            Level {profile.level}
          </div>
          <div className="mt-2.5">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round(((profile.currentXp % 1000) / 1000) * 100)
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-mono tabular-nums">
              <span>{profile.currentXp} XP</span>
              <span>{profile.nextLevelXp} XP Target</span>
            </div>
          </div>
        </div>

        {/* Study Streak Card */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Study Streak</span>
            <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            {profile.streakDays} Days
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Streak shield equipped</span>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Tasks Completed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            {completedGoalsCount} / {totalGoalsCount}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span className="text-purple-300 font-mono tabular-nums font-semibold">
              {progressPercent}%
            </span>
            <span>daily sprint complete</span>
          </div>
        </div>
      </section>

      {/* 3. Main Dashboard Grid: Daily Goals & Weekly Study Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Daily Goals Section */}
        <section className="lg:col-span-7 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Daily Study Goals</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Check off items to claim XP and advance your daily sprint.
              </p>
            </div>

            {/* Subject Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-lg text-xs overflow-x-auto">
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedSubjectFilter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedSubjectFilter('CS 201')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedSubjectFilter === 'CS 201'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CS 201
              </button>
              <button
                onClick={() => setSelectedSubjectFilter('Calculus')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedSubjectFilter === 'Calculus'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Calc II
              </button>
              <button
                onClick={() => setSelectedSubjectFilter('Physics')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedSubjectFilter === 'Physics'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Physics
              </button>
            </div>
          </div>

          {/* Goal Item List */}
          <div className="space-y-3">
            {filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`group flex items-start justify-between gap-3 p-4 rounded-xl border transition-all ${
                  goal.completed
                    ? 'bg-slate-900/30 border-slate-800/60 opacity-75'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      goal.completed
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'border-slate-600 hover:border-purple-400 bg-slate-900'
                    }`}
                    aria-label={goal.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {goal.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold leading-snug transition-all ${
                        goal.completed ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {goal.title}
                    </p>

                    {/* Clean unboxed metadata with separators */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="text-purple-300 font-medium">{goal.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Clock className="w-3 h-3" />
                        {goal.estimatedMinutes}m
                      </span>
                      {goal.deadline && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-400/90">{goal.deadline}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right XP Reward Badge & Quick Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-mono font-semibold tabular-nums px-2.5 py-1 rounded-md ${
                      goal.completed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                    }`}
                  >
                    +{goal.xpReward} XP
                  </span>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 p-1 transition-opacity text-xs"
                    title="Delete goal"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {filteredGoals.length === 0 && (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl">
                <p className="text-xs text-slate-400">No goals found for this category.</p>
                <button
                  onClick={() => setIsAddGoalModalOpen(true)}
                  className="mt-2 text-xs text-purple-400 hover:text-purple-300 font-medium"
                >
                  Create one now
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Right Column (5 cols): Weekly Study Progress Chart */}
        <section className="lg:col-span-5 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-400" />
                <span>Weekly Study Velocity</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Total 26.5 hours logged this week (target: 30h)
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setChartMetric('hours')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  chartMetric === 'hours'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hours
              </button>
              <button
                onClick={() => setChartMetric('tasks')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  chartMetric === 'tasks'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tasks
              </button>
            </div>
          </div>

          {/* Interactive Bar Chart Representation */}
          <div className="pt-4">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-3 px-2 border-b border-slate-800 pb-2">
              {progressData.map((day) => {
                const val = chartMetric === 'hours' ? day.hours : day.tasks;
                const heightPercent = Math.round((val / maxMetricValue) * 100);
                const isToday = day.shortDay === 'Thu'; // Active mock day

                return (
                  <div key={day.shortDay} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Hover tooltip */}
                    <div className="absolute -top-12 bg-slate-950 border border-slate-700 text-white text-[10px] rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                      <span className="font-semibold">{day.day}</span>: {val}{' '}
                      {chartMetric === 'hours' ? 'hrs' : 'tasks'} (Focus {day.focusScore}%)
                    </div>

                    {/* Bar */}
                    <div className="w-full flex items-end justify-center h-36">
                      <div
                        className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                          isToday
                            ? 'bg-gradient-to-t from-purple-600 to-indigo-500 shadow-md shadow-purple-600/30'
                            : 'bg-slate-700/60 hover:bg-slate-600'
                        }`}
                        style={{ height: `${Math.max(12, heightPercent)}%` }}
                      />
                    </div>

                    {/* Day label */}
                    <span
                      className={`text-[11px] font-mono tabular-nums ${
                        isToday ? 'text-purple-300 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {day.shortDay}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subject Distribution legend */}
            <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>CS 201 (11.0h)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Calc II (7.3h)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Physics (4.7h)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Other (3.5h)</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Recent Achievements Section */}
      <section className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Recent Unlocked Achievements</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Badges earned through consistent deep work and assignment mastery.
            </p>
          </div>

          <Link
            to="/app/rewards"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <span>View All Badges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-amber-400/90">
                    {ach.rarity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ach.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs">
                <span className="text-slate-400">{ach.unlockedAt}</span>
                <span className="font-mono text-purple-300 font-semibold tabular-nums">
                  +{ach.xpAwarded} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quick Access to All Platform Features */}
      <section className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">
          Quick Access Feature Hub
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Jump straight into any area of Upgrade Hub to plan, train, or recharge.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <Link
            to="/app/planner"
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 transition-all text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Study Planner</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Kanban & Timetable</span>
          </Link>

          <Link
            to="/app/progress"
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 transition-all text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">My Progress</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Focus Analytics</span>
          </Link>

          <Link
            to="/app/challenges"
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 transition-all text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Challenges</span>
            <span className="text-[11px] text-slate-400 mt-0.5">4 Active Sprints</span>
          </Link>

          <Link
            to="/app/leaderboard"
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 transition-all text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Leaderboard</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Rank #4 Campus</span>
          </Link>

          <Link
            to="/app/meme-zone"
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 transition-all text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Laugh className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Meme Zone</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Study Breaks</span>
          </Link>

          <Link
            to="/app/coach"
            className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 transition-all text-center flex flex-col items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">AI Coach</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Revision Helper</span>
          </Link>
        </div>
      </section>

      {/* Add Goal Modal */}
      {isAddGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Add New Study Goal</h4>
              <button
                onClick={() => setIsAddGoalModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Goal Title / Milestone
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read Chapter 4 & finish problem set 3"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Course / Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="CS 201 - Algorithms">CS 201 - Algorithms</option>
                    <option value="Math 212 - Calculus II">Math 212 - Calculus II</option>
                    <option value="Phys 110 - Modern Physics">Phys 110 - Modern Physics</option>
                    <option value="CogSci 101 - Perception">CogSci 101 - Perception</option>
                    <option value="General Study">General Study</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Estimated Minutes
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="240"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    XP Reward Value
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    step="10"
                    value={newXp}
                    onChange={(e) => setNewXp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) =>
                      setNewPriority(e.target.value as 'low' | 'medium' | 'high')
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddGoalModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm shadow-purple-600/30"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
