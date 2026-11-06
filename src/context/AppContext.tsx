import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  DailyGoal,
  DayStudyData,
  Achievement,
  Challenge,
  LeaderboardEntry,
  MemeItem,
  RewardItem,
} from '../types';
import {
  initialStudentProfile,
  initialDailyGoals,
  weeklyStudyProgress,
  initialAchievements,
  initialChallenges,
  initialLeaderboard,
  initialMemes,
  initialRewards,
} from '../data/mockData';

interface ToastNotification {
  id: string;
  message: string;
  xpDelta?: number;
  type: 'success' | 'info' | 'reward';
}

interface AppContextType {
  profile: StudentProfile;
  goals: DailyGoal[];
  progressData: DayStudyData[];
  achievements: Achievement[];
  challenges: Challenge[];
  leaderboard: LeaderboardEntry[];
  memes: MemeItem[];
  rewards: RewardItem[];
  toasts: ToastNotification[];
  toggleGoal: (id: string) => void;
  addGoal: (goal: Omit<DailyGoal, 'id' | 'completed'>) => void;
  deleteGoal: (id: string) => void;
  joinChallenge: (id: string) => void;
  upvoteMeme: (id: string) => void;
  addMeme: (title: string, caption: string, tag: string) => void;
  purchaseReward: (id: string) => boolean;
  toggleRewardActive: (id: string) => void;
  addXp: (amount: number, reason: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(initialStudentProfile);
  const [goals, setGoals] = useState<DailyGoal[]>(initialDailyGoals);
  const [progressData] = useState<DayStudyData[]>(weeklyStudyProgress);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [memes, setMemes] = useState<MemeItem[]>(initialMemes);
  const [rewards, setRewards] = useState<RewardItem[]>(initialRewards);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, xpDelta?: number, type: 'success' | 'info' | 'reward' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, xpDelta, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addXp = (amount: number, reason: string) => {
    setProfile((prev) => {
      const newXp = Math.max(0, prev.currentXp + amount);
      let newLevel = prev.level;
      let nextTarget = prev.nextLevelXp;
      let title = prev.levelTitle;

      if (newXp >= nextTarget) {
        newLevel += 1;
        nextTarget += 1000;
        if (newLevel >= 15) title = "Academic Legend";
        else if (newLevel >= 13) title = "Summa Cum Laude Track";
      }

      return {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        nextLevelXp: nextTarget,
        levelTitle: title,
      };
    });

    // Also sync leaderboard for current user
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.isCurrentUser ? { ...entry, xp: Math.max(0, entry.xp + amount) } : entry
      )
    );

    showToast(reason, amount, amount > 0 ? 'success' : 'info');
  };

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextCompleted = !g.completed;
          const xp = nextCompleted ? g.xpReward : -g.xpReward;
          addXp(xp, nextCompleted ? `Goal completed: ${g.title}` : `Goal unchecked`);
          return { ...g, completed: nextCompleted };
        }
        return g;
      })
    );
  };

  const addGoal = (goalData: Omit<DailyGoal, 'id' | 'completed'>) => {
    const newGoal: DailyGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      completed: false,
    };
    setGoals((prev) => [newGoal, ...prev]);
    showToast(`Added new goal: ${goalData.title}`, undefined, 'info');
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    showToast('Goal removed', undefined, 'info');
  };

  const joinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const joined = !ch.joined;
          if (joined) {
            showToast(`Joined challenge: ${ch.title}! +50 XP bonus on first check-in`, 50, 'reward');
            setProfile((p) => ({ ...p, currentXp: p.currentXp + 50 }));
          } else {
            showToast(`Left challenge: ${ch.title}`);
          }
          return {
            ...ch,
            joined,
            participantsCount: joined ? ch.participantsCount + 1 : ch.participantsCount - 1,
          };
        }
        return ch;
      })
    );
  };

  const upvoteMeme = (id: string) => {
    setMemes((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const hasUpvoted = !m.hasUpvoted;
          const upvotes = hasUpvoted ? m.upvotes + 1 : m.upvotes - 1;
          if (hasUpvoted) {
            addXp(5, 'Meme upvoted');
          }
          return { ...m, upvotes, hasUpvoted };
        }
        return m;
      })
    );
  };

  const addMeme = (title: string, caption: string, tag: string) => {
    const newMeme: MemeItem = {
      id: `meme-${Date.now()}`,
      title,
      author: profile.username.replace('@', ''),
      timestamp: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
      caption,
      tag: tag || 'Student Life',
      type: 'text',
    };
    setMemes((prev) => [newMeme, ...prev]);
    addXp(25, 'Meme dropped in Meme Zone!');
  };

  const purchaseReward = (id: string): boolean => {
    const reward = rewards.find((r) => r.id === id);
    if (!reward) return false;

    if (profile.currentXp < reward.costXp) {
      showToast(`Not enough XP! You need ${reward.costXp - profile.currentXp} more XP.`, undefined, 'info');
      return false;
    }

    setProfile((prev) => ({
      ...prev,
      currentXp: prev.currentXp - reward.costXp,
    }));

    setRewards((prev) =>
      prev.map((r) => (r.id === id ? { ...r, purchased: true, active: true } : r))
    );

    showToast(`Unlocked ${reward.title}! Item ready in your inventory.`, -reward.costXp, 'reward');
    return true;
  };

  const toggleRewardActive = (id: string) => {
    setRewards((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextActive = !r.active;
          showToast(`${r.title} ${nextActive ? 'equipped' : 'unequipped'}`);
          return { ...r, active: nextActive };
        }
        return r;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        goals,
        progressData,
        achievements,
        challenges,
        leaderboard,
        memes,
        rewards,
        toasts,
        toggleGoal,
        addGoal,
        deleteGoal,
        joinChallenge,
        upvoteMeme,
        addMeme,
        purchaseReward,
        toggleRewardActive,
        addXp,
        removeToast,
      }}
    >
      {children}
      {/* Global Toast Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-purple-500/30 text-white shadow-xl shadow-purple-950/40 text-sm animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>{toast.message}</span>
            </div>
            {toast.xpDelta !== undefined && (
              <span
                className={`text-xs font-mono font-semibold tabular-nums ${
                  toast.xpDelta >= 0 ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {toast.xpDelta >= 0 ? `+${toast.xpDelta} XP` : `${toast.xpDelta} XP`}
              </span>
            )}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors ml-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
