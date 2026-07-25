"use client";

import React from "react";
import {
  Search,
  Bell,
  Sparkles,
  Zap,
  Moon,
  Sun,
  Bot,
  ChevronDown,
  User,
  LogOut,
  Target
} from "lucide-react";

interface TopNavbarProps {
  title: string;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  streakDays: number;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenQuickGoalModal: () => void;
  onOpenProfile: () => void;
  studentName: string;
  targetGoal: string;
}

export function TopNavbar({
  title,
  isDarkMode,
  setIsDarkMode,
  streakDays,
  unreadCount,
  onOpenNotifications,
  onOpenQuickGoalModal,
  onOpenProfile,
  studentName,
  targetGoal
}: TopNavbarProps) {
  return (
    <header
      className={`h-16 px-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md transition-colors ${
        isDarkMode
          ? "bg-slate-950/80 border-slate-800 text-slate-100"
          : "bg-white/80 border-slate-200 text-slate-900"
      }`}
    >
      {/* Title & Active Goal */}
      <div className="flex items-center space-x-4">
        <h2 className="font-extrabold text-lg tracking-tight flex items-center space-x-2">
          <span>{title}</span>
        </h2>

        {targetGoal && (
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            <Target className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium text-slate-400">Target:</span>
            <span className="font-bold text-blue-300 truncate max-w-xs">{targetGoal}</span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Agent Execution Trigger */}
        <button
          onClick={onOpenQuickGoalModal}
          className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95"
        >
          <Bot className="w-4 h-4" />
          <span>New AI Goal / Replan</span>
        </button>

        {/* Streak Pill */}
        <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
          <span>{streakDays} Days</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-white transition-all"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-white transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={onOpenProfile}
          className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800/50 transition-all border border-slate-800"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 text-white text-xs font-bold flex items-center justify-center">
            {studentName ? studentName.charAt(0) : "A"}
          </div>
          <span className="hidden md:inline text-xs font-bold text-slate-200">{studentName}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
