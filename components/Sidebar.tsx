"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Bot,
  Map,
  Calendar,
  BookOpen,
  CalendarDays,
  BarChart3,
  FileSpreadsheet,
  Trophy,
  Bell,
  Settings,
  Globe,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LogIn,
  User
} from "lucide-react";
import { TabType } from "@/lib/student-types";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode?: boolean;
  unreadNotificationsCount?: number;
  streakDays?: number;
  studentLevel?: number;
  studentName?: string;
  onOpenOnboarding?: () => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  isDarkMode = true,
  unreadNotificationsCount = 2,
  streakDays = 7,
  studentLevel = 4,
  studentName = "Snehith",
  onOpenOnboarding
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "workspace", label: "AI Agent Workspace", icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: "AI" },
    { id: "roadmap", label: "Roadmap", icon: <Map className="w-4 h-4 text-emerald-400" /> },
    { id: "planner", label: "Daily Planner", icon: <Calendar className="w-4 h-4 text-blue-400" /> },
    { id: "resources", label: "Resource Library", icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
    { id: "calendar", label: "Calendar & Deadlines", icon: <CalendarDays className="w-4 h-4 text-amber-400" /> },
    { id: "analytics", label: "Progress Analytics", icon: <BarChart3 className="w-4 h-4 text-indigo-400" /> },
    { id: "reports", label: "Weekly Reports", icon: <FileSpreadsheet className="w-4 h-4 text-rose-400" /> },
    { id: "achievements", label: "Achievements", icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
    { id: "notifications", label: "Notifications and history", icon: <Bell className="w-4 h-4" />, badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined },
    { id: "login", label: "Login & Resume", icon: <LogIn className="w-4 h-4 text-cyan-300" /> },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4 text-emerald-300" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4 text-slate-300" /> }
  ];

  return (
    <aside
      className={`relative z-30 h-screen sticky top-0 flex flex-col border-r transition-all duration-300 select-none ${
        isDarkMode ? "bg-slate-950/95 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
      } ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        {!isCollapsed && (
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-base tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent flex items-center space-x-1">
                <span>CampusPilot AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Autonomous StudentOS
              </p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mx-auto p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-white transition-all"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Student Quick Stats Pill (When Expanded) */}
      {!isCollapsed && (
        <div className="p-3 mx-3 my-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 font-bold flex items-center">
              <Zap className="w-3.5 h-3.5 mr-0.5 fill-amber-400" />
              {streakDays}d
            </span>
            <span className="text-slate-400">Streak</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-extrabold border border-blue-500/30">
              Lvl {studentLevel}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Buttons List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-none">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20 font-bold"
                  : isDarkMode
                  ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3 truncate">
                <span className={`p-1 rounded-lg ${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!isCollapsed && item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive
                      ? "bg-white text-blue-600"
                      : "bg-blue-500/20 text-cyan-300 border border-cyan-500/30"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center justify-center border border-white/20">
              {studentName ? studentName.charAt(0) : "A"}
            </div>
            <div className="flex-1 truncate">
              <p className="text-xs font-bold text-slate-200 truncate">{studentName}</p>
              <p className="text-[10px] text-slate-400 truncate flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Autonomous OS</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center justify-center">
            {studentName ? studentName.charAt(0) : "A"}
          </div>
        )}
      </div>
    </aside>
  );
}
