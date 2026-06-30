export type ViewId =
  | 'dashboard'
  | 'roadmaps'
  | 'resume'
  | 'fixer'
  | 'qa'
  | 'simulator';

export interface NavItem {
  id: ViewId;
  label: string;
  icon: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    description: 'Overview & recent activity',
  },
  {
    id: 'roadmaps',
    label: 'Roadmaps',
    icon: 'Compass',
    description: 'Domains & learning paths',
  },
  {
    id: 'resume',
    label: 'Resume & ATS',
    icon: 'FileText',
    description: 'Tailor resume, score match',
  },
  {
    id: 'fixer',
    label: 'Resume Fixer',
    icon: 'Wand2',
    description: 'Auto-rewrite weak bullets',
  },
  {
    id: 'qa',
    label: 'Q&A Prep',
    icon: 'MessagesSquare',
    description: 'Curated interview questions',
  },
  {
    id: 'simulator',
    label: 'Mock Interview',
    icon: 'Mic',
    description: 'AI simulator & feedback',
  },
];

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  targetRole: string;
  avatarInitials: string;
  streak: number;
  level: string;
  joinedDate: string;
}

export const USER: UserProfile = {
  name: 'Aarav Mehta',
  email: 'demo@prepai.dev',
  role: 'Full Stack Developer',
  targetRole: 'Senior Full Stack Engineer',
  avatarInitials: 'AM',
  streak: 12,
  level: 'Pro · Tier II',
  joinedDate: 'Mar 2025',
};

export interface StatCard {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
  accent: 'cyan' | 'emerald' | 'amber' | 'violet';
}

export const DASHBOARD_STATS: StatCard[] = [
  {
    id: 'mocks',
    label: 'Mock Interviews Completed',
    value: '4',
    delta: '+2 this week',
    trend: 'up',
    icon: 'Mic',
    accent: 'cyan',
  },
  {
    id: 'ats',
    label: 'Avg ATS Score',
    value: '78%',
    delta: '+6% vs last',
    trend: 'up',
    icon: 'Gauge',
    accent: 'emerald',
  },
  {
    id: 'roadmap',
    label: 'Roadmap Progress',
    value: '45%',
    delta: 'On track',
    trend: 'flat',
    icon: 'Route',
    accent: 'amber',
  },
  {
    id: 'streak',
    label: 'Day Streak',
    value: '12',
    delta: 'Personal best',
    trend: 'up',
    icon: 'Flame',
    accent: 'violet',
  },
];

export interface ActivityItem {
  id: string;
  title: string;
  meta: string;
  time: string;
  icon: string;
  accent: 'cyan' | 'emerald' | 'amber' | 'violet';
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    title: 'Mock Interview · System Design',
    meta: 'Score 82/100 · Communication strong',
    time: '2h ago',
    icon: 'Mic',
    accent: 'cyan',
  },
  {
    id: 'a2',
    title: 'Resume Scan · Senior Full Stack',
    meta: 'ATS match 74% · 6 keywords missing',
    time: 'Yesterday',
    icon: 'FileText',
    accent: 'emerald',
  },
  {
    id: 'a3',
    title: 'Roadmap milestone reached',
    meta: 'Intermediate · React Server Components',
    time: '2 days ago',
    icon: 'Route',
    accent: 'amber',
  },
  {
    id: 'a4',
    title: 'Q&A session · Behavioral',
    meta: '12 questions reviewed · STAR method',
    time: '3 days ago',
    icon: 'MessagesSquare',
    accent: 'violet',
  },
  {
    id: 'a5',
    title: 'Mock Interview · Behavioral',
    meta: 'Score 76/100 · Improve conciseness',
    time: '4 days ago',
    icon: 'Mic',
    accent: 'cyan',
  },
];

export interface WeeklyPoint {
  day: string;
  value: number;
}

export const WEEKLY_ACTIVITY: WeeklyPoint[] = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 68 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 72 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 64 },
];
