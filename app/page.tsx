"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { LandingPage } from "@/components/LandingPage";
import { AuthModal } from "@/components/AuthModal";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { DashboardView } from "@/components/DashboardView";
import { AiWorkspaceView } from "@/components/AiWorkspaceView";
import { RoadmapView } from "@/components/RoadmapView";
import { DailyPlannerView } from "@/components/DailyPlannerView";
import { ResourceLibraryView } from "@/components/ResourceLibraryView";
import { CalendarDeadlinesView } from "@/components/CalendarDeadlinesView";
import { ProgressAnalyticsView } from "@/components/ProgressAnalyticsView";
import { WeeklyReportsView } from "@/components/WeeklyReportsView";
import { AchievementsView } from "@/components/AchievementsView";
import { NotificationsView } from "@/components/NotificationsView";
import { ProfileView } from "@/components/ProfileView";
import { SettingsView } from "@/components/SettingsView";
import { LoginDetailsView } from "@/components/LoginDetailsView";

import {
  StudentProfile,
  Task,
  RoadmapPhase,
  LearningResource,
  AiSuggestion,
  CalendarEvent,
  WeeklyReport,
  AchievementBadge,
  NotificationItem,
  TabType
} from "@/lib/student-types";

const emptySubscribe = () => () => {};

export default function CampusPilotApp() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Auth & Onboarding Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<"login" | "signup">("login");
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Student Profile State
  const [profile, setProfile] = useState<StudentProfile>({
    name: "Snehith Varma",
    college: "Stanford University",
    branch: "Computer Science",
    semester: "6th",
    cgpa: "3.8 / 4.0",
    targetCompany: "Google SDE-1",
    primaryGoal: "Crack Google SDE in 6 months",
    studyHoursPerDay: 4,
    weakSkills: ["Graph Algorithms", "Dynamic Programming", "System Design"],
    strongSkills: ["Arrays & Hash Maps", "Python", "SQL Mechanics"],
    interests: ["AI/ML", "Competitive Programming", "Backend Architecture"],
    preferredLearningStyle: "Practice-based",
    preferredLanguage: "English",
    targetDate: "December 2026",
    streakDays: 7,
    xpPoints: 1250,
    level: 4
  });

  // Daily Tasks State
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "t1",
      title: "Solve 2 LeetCode Medium Graphs (Dijkstra & BFS)",
      subject: "Data Structures",
      durationMinutes: 60,
      priority: "High",
      timeSlot: "Morning",
      completed: true,
      milestoneId: "m1",
      sourceAgent: "Scheduler Agent",
      platformName: "LeetCode",
      platformUrl: "https://leetcode.com/problemset/all/"
    },
    {
      id: "t2",
      title: "Solve 1 Codeforces Div 2 Graph Problem (#743 Network Delay Time)",
      subject: "Competitive Programming",
      durationMinutes: 45,
      priority: "High",
      timeSlot: "Morning",
      completed: true,
      milestoneId: "m1",
      sourceAgent: "Goal Agent",
      platformName: "Codeforces",
      platformUrl: "https://codeforces.com/problemset"
    },
    {
      id: "t3",
      title: "Read GeeksforGeeks DBMS B-Tree Indexing & WAL Architecture",
      subject: "Database Systems",
      durationMinutes: 45,
      priority: "Medium",
      timeSlot: "Afternoon",
      completed: true,
      milestoneId: "m3",
      sourceAgent: "Memory Agent",
      platformName: "GeeksforGeeks",
      platformUrl: "https://www.geeksforgeeks.org/dbms/"
    },
    {
      id: "t4",
      title: "Active Recall Flashcards on OS Deadlocks & Semaphores",
      subject: "Operating Systems",
      durationMinutes: 30,
      priority: "High",
      timeSlot: "Afternoon",
      completed: false,
      milestoneId: "m3",
      sourceAgent: "Scheduler Agent",
      platformName: "GeeksforGeeks",
      platformUrl: "https://www.geeksforgeeks.org/operating-systems/"
    },
    {
      id: "t5",
      title: "System Design: Design Rate Limiter (Token Bucket Algorithm)",
      subject: "System Design",
      durationMinutes: 60,
      priority: "High",
      timeSlot: "Evening",
      completed: false,
      milestoneId: "m4",
      sourceAgent: "Planner Agent",
      platformName: "NeetCode",
      platformUrl: "https://neetcode.io/practice"
    },
    {
      id: "t6",
      title: "Review CodeChef & HackerRank Weekly Contest Solutions",
      subject: "Competitive Programming",
      durationMinutes: 40,
      priority: "Medium",
      timeSlot: "Evening",
      completed: false,
      milestoneId: "m1",
      sourceAgent: "Reflection Agent",
      platformName: "CodeChef",
      platformUrl: "https://www.codechef.com/contests"
    },
    {
      id: "t7",
      title: "Unstop Hackathon & Contest Registration Check",
      subject: "Career & Contests",
      durationMinutes: 20,
      priority: "High",
      timeSlot: "Night",
      completed: false,
      milestoneId: "m4",
      sourceAgent: "Resource Agent",
      platformName: "Unstop",
      platformUrl: "https://unstop.com/hackathons"
    },
    {
      id: "t8",
      title: "Daily Reflection & AI StudentOS Memory Sync",
      subject: "Autonomous Sync",
      durationMinutes: 15,
      priority: "Medium",
      timeSlot: "Night",
      completed: false,
      milestoneId: "m1",
      sourceAgent: "Reflection Agent",
      platformName: "CampusPilot AI",
      platformUrl: "#"
    }
  ]);

  // Visual Roadmap Phases State
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([
    {
      id: "p1",
      phaseNumber: 1,
      title: "Phase 1: Advanced Data Structures & Algorithmic Mastery",
      duration: "Months 1 - 2",
      status: "in-progress",
      milestones: [
        {
          id: "m1",
          title: "Graph Algorithms & Shortest Path Trees",
          description: "Master Dijkstra, Bellman-Ford, Topological Sort and Disjoint Set Union (DSU) patterns.",
          status: "in-progress",
          estimatedHours: 24,
          skillsCovered: ["Graphs", "Shortest Path", "DSU", "Python"],
          subtasks: [
            { id: "st1", title: "Implement Dijkstra Algorithm with PriorityQueue in Python", completed: true },
            { id: "st2", title: "Solve LeetCode #743 Network Delay Time", completed: true },
            { id: "st3", title: "Solve LeetCode #1584 Min Cost to Connect All Points", completed: false }
          ],
          resourcesCount: 4
        },
        {
          id: "m2",
          title: "Dynamic Programming Patterns & Memoization",
          description: "Solve 1D/2D DP, Knapsack, Longest Common Subsequence & Matrix Chain Multiplication.",
          status: "in-progress",
          estimatedHours: 30,
          skillsCovered: ["Dynamic Programming", "Memoization", "Tabulation"],
          subtasks: [
            { id: "st4", title: "Understand 0/1 Knapsack vs Unbounded Knapsack", completed: true },
            { id: "st5", title: "Solve LeetCode #1143 Longest Common Subsequence", completed: false }
          ],
          resourcesCount: 5
        }
      ]
    },
    {
      id: "p2",
      phaseNumber: 2,
      title: "Phase 2: CS Fundamentals (DBMS, OS, Computer Networks)",
      duration: "Months 3 - 4",
      status: "pending",
      milestones: [
        {
          id: "m3",
          title: "Database Mechanics & Indexing Deep Dive",
          description: "Understand B-Trees, B+ Trees, ACID transactions, WAL logs, and SQL query optimization.",
          status: "locked",
          estimatedHours: 20,
          skillsCovered: ["DBMS", "B-Trees", "Transactions", "SQL"],
          subtasks: [
            { id: "st6", title: "Study Postgres B-Tree Index Internal Architecture", completed: false }
          ],
          resourcesCount: 3
        }
      ]
    },
    {
      id: "p3",
      phaseNumber: 3,
      title: "Phase 3: High Scale System Design & Behavioral Mock Interviews",
      duration: "Months 5 - 6",
      status: "pending",
      milestones: [
        {
          id: "m4",
          title: "Distributed Caching & Scalable Architecture",
          description: "Design Redis caches, Consistent Hashing, Message Queues & Load Balancers.",
          status: "locked",
          estimatedHours: 28,
          skillsCovered: ["System Design", "Redis", "Consistent Hashing"],
          subtasks: [
            { id: "st7", title: "Design Distributed Rate Limiter & URL Shortener", completed: false }
          ],
          resourcesCount: 4
        }
      ]
    }
  ]);

  // Curated Resources State
  const [resources, setResources] = useState<LearningResource[]>([
    {
      id: "r1",
      title: "NeetCode 150: Complete Graph Patterns & Practice Problems",
      type: "Practice",
      provider: "NeetCode.io",
      url: "https://neetcode.io/practice",
      rating: 4.9,
      topic: "DSA / Graphs",
      estimatedTime: "2.5 Hours",
      completed: true
    },
    {
      id: "r2",
      title: "LeetCode Top 150 Interview Questions - Graph Algorithms",
      type: "Practice",
      provider: "LeetCode",
      url: "https://leetcode.com/studyplan/top-interview-150/",
      rating: 5.0,
      topic: "DSA / Interviews",
      estimatedTime: "3.0 Hours",
      completed: true
    },
    {
      id: "r3",
      title: "GeeksforGeeks DBMS Mechanics & B-Tree Indexing Guide",
      type: "Article",
      provider: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/dbms/",
      rating: 4.8,
      topic: "DBMS",
      estimatedTime: "45 Mins",
      completed: false
    },
    {
      id: "r4",
      title: "Codeforces Problemset: Graph Theory & Shortest Paths",
      type: "Practice",
      provider: "Codeforces",
      url: "https://codeforces.com/problemset?tags=graphs",
      rating: 4.9,
      topic: "Competitive Programming",
      estimatedTime: "2.0 Hours",
      completed: false
    },
    {
      id: "r5",
      title: "Unstop Hackathons & Live Student Contests Hub",
      type: "Practice",
      provider: "Unstop",
      url: "https://unstop.com/hackathons",
      rating: 4.9,
      topic: "Contests & Hackathons",
      estimatedTime: "1.0 Hour",
      completed: false
    },
    {
      id: "r6",
      title: "CodeChef Starters & Division Practice Arena",
      type: "Practice",
      provider: "CodeChef",
      url: "https://www.codechef.com/contests",
      rating: 4.7,
      topic: "Competitive Programming",
      estimatedTime: "1.5 Hours",
      completed: false
    },
    {
      id: "r7",
      title: "HackerRank Problem Solving & Skill Certification",
      type: "Course",
      provider: "HackerRank",
      url: "https://www.hackerrank.com/domains/skills-verification",
      rating: 4.8,
      topic: "Algorithms",
      estimatedTime: "2.0 Hours",
      completed: false
    },
    {
      id: "r8",
      title: "MIT 6.006: Introduction to Algorithms & Shortest Paths",
      type: "Course",
      provider: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
      rating: 5.0,
      topic: "Algorithms",
      estimatedTime: "4.0 Hours",
      completed: false
    },
    {
      id: "r9",
      title: "System Design Primer - Distributed Caching & Rate Limiters",
      type: "Article",
      provider: "GitHub / System Design",
      url: "https://github.com/donnemartin/system-design-primer",
      rating: 5.0,
      topic: "System Design",
      estimatedTime: "3.0 Hours",
      completed: false
    }
  ]);

  // AI Suggestions State
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([
    {
      id: "s1",
      title: "High Impact: Boost Graph Algorithm Practice",
      description: "Memory Agent noted 2 wrong attempts on Disjoint Set Union (DSU) questions. Spending 30 mins on DSU basics will increase your Google interview readiness by 12%.",
      impactScore: "+12% Readiness",
      actionButtonText: "Add 30 Min DSU Practice Session"
    },
    {
      id: "s2",
      title: "Adaptive Re-Schedule Nudge",
      description: "You completed morning tasks 20 minutes ahead of schedule! Reflection Agent suggests moving System Design reading to 4:00 PM for optimal retention.",
      impactScore: "Time Saved",
      actionButtonText: "Apply Re-Schedule Rule"
    }
  ]);

  // Calendar Events State
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "e1",
      title: "DBMS Midterm Examination",
      type: "Exam",
      date: "August 12, 2026",
      time: "10:00 AM",
      subject: "Database Systems",
      priority: "High"
    },
    {
      id: "e2",
      title: "Google SDE Mock Interview Session",
      type: "Interview",
      date: "August 20, 2026",
      time: "2:00 PM",
      subject: "System Design & Algorithms",
      priority: "High"
    },
    {
      id: "e3",
      title: "Global AI Student Hackathon",
      type: "Hackathon",
      date: "September 05, 2026",
      time: "9:00 AM",
      subject: "AI/ML Applications",
      priority: "Medium"
    }
  ]);

  // Achievement Badges State
  const [badges, setBadges] = useState<AchievementBadge[]>([
    {
      id: "b1",
      title: "7-Day Streak Master",
      description: "Studied consistently for 7 consecutive days without missing a time slot.",
      icon: "🔥",
      unlocked: true,
      unlockedDate: "July 24, 2026",
      xpReward: 250
    },
    {
      id: "b2",
      title: "Graph Algorithm Slayer",
      description: "Completed 10 Medium & Hard Graph problems on LeetCode.",
      icon: "⚡",
      unlocked: true,
      unlockedDate: "July 20, 2026",
      xpReward: 300
    },
    {
      id: "b3",
      title: "Early Bird Scholar",
      description: "Finished morning study mission before 9:00 AM three times.",
      icon: "🌅",
      unlocked: true,
      unlockedDate: "July 22, 2026",
      xpReward: 200
    },
    {
      id: "b4",
      title: "Google Interview Ready",
      description: "Complete all 3 Phase roadmap milestones and achieve 85%+ retention.",
      icon: "🏆",
      unlocked: false,
      xpReward: 1000
    }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      title: "Scheduler Agent Alert",
      message: "Morning mission completed! 2 tasks finished. Keep up the high velocity.",
      timestamp: "10 mins ago",
      type: "SCHEDULE_ALERT",
      read: false
    },
    {
      id: "n2",
      title: "New AI Resource Curated",
      message: "Resource Agent added MIT 6.006 Dijkstra lecture video to your library.",
      timestamp: "1 hour ago",
      type: "AI_SUGGESTION",
      read: false
    }
  ]);

  // Weekly Report State
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport>({
    weekRange: "July 18 – July 24, 2026",
    completionRatePercent: 88,
    totalHoursStudied: 28.5,
    tasksCompleted: 24,
    strengths: [
      "Excellent consistency on Graph Algorithms & Dijkstra implementations.",
      "Maintained 4.5+ study hours daily during peak midterm preparation.",
      "High accuracy on LeetCode Medium problem solving."
    ],
    weaknesses: [
      "Dynamic Programming memoization state transitions need faster speed.",
      "Missed 1 night reading block due to late university lectures."
    ],
    nextWeekStrategy: "Prioritize 2D Dynamic Programming state matrix problems in the morning slots. Introduce Redis distributed caching system design reading during night blocks.",
    agentReflectionNote: "Student velocity is tracking 12% ahead of target Google deadline. Excellent focus retention."
  });

  // Toggle Task Handler
  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Toggle Resource Handler
  const handleToggleResource = (resId: string) => {
    setResources(resources.map(r => r.id === resId ? { ...r, completed: !r.completed } : r));
  };

  // Add Calendar Event
  const handleAddEvent = (evt: CalendarEvent) => {
    setEvents([evt, ...events]);
  };

  // Handle Onboarding Completion
  const handleOnboardingComplete = (newProfile: StudentProfile, goalPrompt: string) => {
    setProfile(newProfile);
    setIsLoggedIn(true);
    setActiveTab("dashboard");
  };

  // Handle AI Workspace Plan Generation
  const handlePlanGenerated = (data: any) => {
    if (data.tasks) setTasks(data.tasks);
    if (data.roadmap) setRoadmap(data.roadmap);
    if (data.resources) setResources(data.resources);
    if (data.suggestions) setSuggestions(data.suggestions);
  };

  // Hydration safety check
  if (!isMounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  // If user is not logged in and wants to see Landing Page
  if (!isLoggedIn) {
    return (
      <>
        <LandingPage
          onStartFree={() => {
            setAuthModalInitialMode("signup");
            setIsAuthModalOpen(true);
          }}
          onLogin={() => {
            setAuthModalInitialMode("login");
            setIsAuthModalOpen(true);
          }}
        />
        <AuthModal
          key={`${isAuthModalOpen}-${authModalInitialMode}`}
          isOpen={isAuthModalOpen}
          initialMode={authModalInitialMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(profileData) => {
            if (profileData) {
              setProfile((prev) => ({ ...prev, ...profileData }));
            }
            setIsLoggedIn(true);
            setActiveTab("dashboard");
          }}
          isDarkMode={isDarkMode}
        />
        <OnboardingWizard
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onComplete={handleOnboardingComplete}
          isDarkMode={isDarkMode}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        studentName={profile.name}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Navbar */}
        <TopNavbar
          title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          streakDays={profile.streakDays}
          unreadCount={notifications.filter(n => !n.read).length}
          onOpenNotifications={() => setActiveTab("notifications")}
          onOpenQuickGoalModal={() => setIsOnboardingOpen(true)}
          onOpenProfile={() => setActiveTab("profile")}
          studentName={profile.name}
          targetGoal={profile.targetCompany}
        />

        {/* Tab View Container */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          
          {activeTab === "dashboard" && (
            <DashboardView
              profile={profile}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              suggestions={suggestions}
              events={events}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onSendQuickChat={(msg) => setActiveTab("workspace")}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === "workspace" && (
            <AiWorkspaceView
              profile={profile}
              isDarkMode={isDarkMode}
              onPlanGenerated={handlePlanGenerated}
            />
          )}

          {activeTab === "roadmap" && (
            <RoadmapView
              roadmap={roadmap}
              isDarkMode={isDarkMode}
              targetGoal={profile.primaryGoal}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "planner" && (
            <DailyPlannerView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              isDarkMode={isDarkMode}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "resources" && (
            <ResourceLibraryView
              resources={resources}
              onToggleResource={handleToggleResource}
              isDarkMode={isDarkMode}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarDeadlinesView
              events={events}
              onAddEvent={handleAddEvent}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === "analytics" && (
            <ProgressAnalyticsView isDarkMode={isDarkMode} />
          )}

          {activeTab === "reports" && (
            <WeeklyReportsView report={weeklyReport} isDarkMode={isDarkMode} />
          )}

          {activeTab === "achievements" && (
            <AchievementsView
              badges={badges}
              xpPoints={profile.xpPoints}
              level={profile.level}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === "notifications" && (
            <NotificationsView
              notifications={notifications}
              onMarkAllRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === "login" && (
            <LoginDetailsView
              profile={profile}
              onUpdateProfile={(up) => setProfile(up)}
              isDarkMode={isDarkMode}
              onLogout={() => setIsLoggedIn(false)}
            />
          )}

          {activeTab === "profile" && (
            <ProfileView
              key={`${profile.name}-${profile.email}-${profile.college}-${profile.targetCompany}`}
              profile={profile}
              onUpdateProfile={(up) => setProfile(up)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              key={`${profile.name}-${profile.email}-${profile.college}-${profile.targetCompany}`}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              studentName={profile.name}
              profile={profile}
              onUpdateProfile={(up) => setProfile(up)}
            />
          )}

        </main>
      </div>

      {/* Onboarding / Re-Plan Wizard Modal */}
      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
