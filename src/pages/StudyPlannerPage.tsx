import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Play,
  Pause,
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudyPlannerPage: React.FC = () => {
  const { addXp } = useApp();

  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);

  // Kanban Tasks
  const [tasks, setTasks] = useState([
    {
      id: 't-1',
      title: 'Finish CS 201 graph algorithms problem set',
      subject: 'CS 201',
      status: 'inprogress',
      priority: 'high',
      dueDate: 'Today 5:00 PM',
    },
    {
      id: 't-2',
      title: 'Review Calculus II power series integration',
      subject: 'Math 212',
      status: 'todo',
      priority: 'medium',
      dueDate: 'Tomorrow',
    },
    {
      id: 't-3',
      title: 'Physics Lab: Quantum double-slit data error bars',
      subject: 'Phys 110',
      status: 'todo',
      priority: 'high',
      dueDate: 'Friday',
    },
    {
      id: 't-4',
      title: 'Draft thesis outline for Bioethics symposium',
      subject: 'Phil 140',
      status: 'done',
      priority: 'low',
      dueDate: 'Completed',
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('CS 201');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (timerMode === 'study') {
        setCompletedSessions((prev) => prev + 1);
        addXp(50, 'Completed 25-min Pomodoro Deep Work Block!');
        setTimerMode('break');
        setTimeLeft(5 * 60);
      } else {
        setTimerMode('study');
        setTimeLeft(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, timerMode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerMode === 'study' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (mode: 'study' | 'break') => {
    setIsRunning(false);
    setTimerMode(mode);
    setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          if (newStatus === 'done' && t.status !== 'done') {
            addXp(30, `Task finished: ${t.title}`);
          }
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: `task-${Date.now()}`,
        title: newTaskTitle.trim(),
        subject: newTaskSubject,
        status: 'todo',
        priority: 'medium',
        dueDate: 'Upcoming',
      },
    ]);
    setNewTaskTitle('');
  };

  const columns = [
    { id: 'todo', label: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
    {
      id: 'inprogress',
      label: 'In Progress',
      count: tasks.filter((t) => t.status === 'inprogress').length,
    },
    { id: 'done', label: 'Done', count: tasks.filter((t) => t.status === 'done').length },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Pomodoro Focus Timer Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
              <CalendarCheck className="w-4 h-4" />
              <span>Smart Study Timetable</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Study Planner & Kanban Board
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Break down semester milestones into bite-sized sprints. Move cards across stages to keep momentum visible and claim completion XP.
            </p>
          </div>

          <form onSubmit={handleAddTask} className="mt-6 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add quick study task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
            />
            <select
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
            >
              <option value="CS 201">CS 201</option>
              <option value="Math 212">Math 212</option>
              <option value="Phys 110">Phys 110</option>
              <option value="Phil 140">Phil 140</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </form>
        </div>

        {/* Pomodoro Timer Widget */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/30 p-6 flex flex-col justify-between text-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Focus Timer</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => switchMode('study')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  timerMode === 'study' ? 'bg-purple-600 text-white font-medium' : 'text-slate-400'
                }`}
              >
                25m Focus
              </button>
              <button
                onClick={() => switchMode('break')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  timerMode === 'break' ? 'bg-purple-600 text-white font-medium' : 'text-slate-400'
                }`}
              >
                5m Break
              </button>
            </div>
          </div>

          <div className="my-4">
            <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-wider tabular-nums">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {timerMode === 'study' ? 'Deep Work Flow Session' : 'Quick Brain Recharge'} ·{' '}
              <span className="text-purple-300 font-mono font-semibold">
                {completedSessions} blocks done today
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={toggleTimer}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all active:scale-95"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isRunning ? 'Pause Block' : 'Start Focus'}</span>
            </button>
            <button
              onClick={resetTimer}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{col.label}</h3>
                  <span className="text-xs font-mono tabular-nums text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                    {col.count}
                  </span>
                </div>
              </div>

              <div className="space-y-3 min-h-[220px]">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-white leading-snug">{task.title}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/40">
                      <span className="text-purple-300 font-medium">{task.subject}</span>
                      <span>{task.dueDate}</span>
                    </div>

                    {/* Move controls */}
                    <div className="flex items-center gap-1.5 pt-1 text-[10px]">
                      {col.id !== 'todo' && (
                        <button
                          onClick={() => moveTask(task.id, 'todo')}
                          className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 hover:text-white"
                        >
                          ← To Do
                        </button>
                      )}
                      {col.id !== 'inprogress' && (
                        <button
                          onClick={() => moveTask(task.id, 'inprogress')}
                          className="px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 hover:text-white"
                        >
                          {col.id === 'todo' ? 'Start →' : '← In Progress'}
                        </button>
                      )}
                      {col.id !== 'done' && (
                        <button
                          onClick={() => moveTask(task.id, 'done')}
                          className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 hover:text-white"
                        >
                          Done ✓
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center border border-dashed border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-500">No tasks in this lane</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
