export interface StudentProfile {
  name: string;
  username: string;
  avatarUrl: string;
  university: string;
  major: string;
  term: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  streakShieldActive: boolean;
  totalStudyHours: number;
  tasksCompletedTotal: number;
}

export interface DailyGoal {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  estimatedMinutes: number;
  xpReward: number;
  completed: boolean;
  deadline?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DayStudyData {
  day: string;
  shortDay: string;
  hours: number;
  tasks: number;
  focusScore: number;
  subjects: { name: string; hours: number; color: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt: string;
  xpAwarded: number;
  category: 'streak' | 'focus' | 'mastery' | 'community';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  xpReward: number;
  participantsCount: number;
  daysRemaining: number;
  joined: boolean;
  progress: number;
  maxProgress: number;
  unit: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  username: string;
  avatarUrl: string;
  university: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface MemeItem {
  id: string;
  title: string;
  author: string;
  timestamp: string;
  upvotes: number;
  hasUpvoted?: boolean;
  caption: string;
  tag: string;
  type: 'image' | 'text' | 'tweet';
  imageUrl?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'Avatars' | 'Soundscapes' | 'Themes' | 'Badges';
  description: string;
  costXp: number;
  icon: string;
  purchased: boolean;
  active?: boolean;
}
