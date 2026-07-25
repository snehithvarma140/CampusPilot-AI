export interface StudentProfile {
  name: string;
  email?: string;
  college: string;
  branch: string;
  semester: string;
  cgpa: string;
  targetCompany: string;
  primaryGoal: string;
  studyHoursPerDay: number;
  weakSkills: string[];
  strongSkills: string[];
  interests: string[];
  preferredLearningStyle: 'Video' | 'Reading' | 'Practice-based';
  preferredLanguage: string;
  targetDate: string;
  streakDays: number;
  xpPoints: number;
  level: number;
  resumeName?: string;
  resumeInstalledDate?: string;
  resumeSkillsExtracted?: string[];
  presentStatus?: string;
  educationLevel?: string;
  knownSkills?: string[];
  skillsToImprove?: string[];
  skillsToLearn?: string[];
  coursesInterested?: string[];
}

export interface StudentPlatform {
  id: string;
  name: string;
  category: 'DSA & Coding' | 'Competitive Programming' | 'CS Fundamentals' | 'Contests & Jobs' | 'Courses & Video';
  url: string;
  description: string;
  badge: string;
  color: string;
  iconBg: string;
  activeUsersCount?: string;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  durationMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  date?: string;
  milestoneId?: string;
  sourceAgent?: string;
  platformUrl?: string;
  platformName?: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  skillsCovered: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'locked' | 'in-progress' | 'completed';
  estimatedHours: number;
  subtasks: { id: string; title: string; completed: boolean }[];
  resourcesCount?: number;
  resourceCount?: number;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'pending' | 'upcoming';
  milestones: RoadmapMilestone[];
}

export interface LearningResource {
  id: string;
  title: string;
  topic: string;
  type: 'Video' | 'Article' | 'Course' | 'Book' | 'Practice';
  url: string;
  provider: string;
  estimatedTime: string;
  completed: boolean;
  rating: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'Exam' | 'Assignment' | 'Hackathon' | 'Interview' | 'Milestone';
  date: string;
  time: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface WeeklyReport {
  id?: string;
  weekRange: string;
  completionRatePercent: number;
  totalHoursStudied: number;
  tasksCompleted: number;
  strengths: string[];
  weaknesses: string[];
  nextWeekStrategy: string;
  agentReflectionNote: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  xpReward: number;
}

export interface AgentThinkingStep {
  id: number;
  agentName: 'Goal Understanding Agent' | 'Planner Agent' | 'Resource Agent' | 'Scheduler Agent' | 'Memory Agent' | 'Progress Agent' | 'Reflection Agent';
  actionText: string;
  status: 'pending' | 'running' | 'completed';
}

export interface AiSuggestion {
  id: string;
  title: string;
  description: string;
  actionButtonText: string;
  impactScore: string;
  category?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'AI_SUGGESTION' | 'SCHEDULE_ALERT' | 'MILESTONE_UNLOCKED' | 'SYSTEM';
  read: boolean;
}

export type TabType =
  | 'dashboard'
  | 'workspace'
  | 'roadmap'
  | 'planner'
  | 'resources'
  | 'calendar'
  | 'analytics'
  | 'reports'
  | 'achievements'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'login';
