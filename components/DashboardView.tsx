"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Target,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Zap,
  Bot,
  MessageSquare,
  Send,
  AlertCircle,
  Award,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Code2,
  Layers,
  Flame
} from "lucide-react";
import { StudentProfile, Task, CalendarEvent, AiSuggestion } from "@/lib/student-types";
import { StudentPlatformsHub } from "@/components/StudentPlatformsHub";

interface DashboardViewProps {
  profile: StudentProfile;
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  suggestions: AiSuggestion[];
  events: CalendarEvent[];
  onNavigateToTab: (tab: any) => void;
  onSendQuickChat: (msg: string) => void;
  isDarkMode: boolean;
}

export function DashboardView({
  profile,
  tasks,
  onToggleTask,
  suggestions,
  events,
  onNavigateToTab,
  onSendQuickChat,
  isDarkMode
}: DashboardViewProps) {
  const [chatInput, setChatInput] = useState("");

  const completedCount = tasks.filter(t => t.completed).length;
  const todayProgressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const weeklyProgressPercent = 68;
  const monthlyProgressPercent = 82;

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendQuickChat(chatInput);
    setChatInput("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Greeting & Quick Mission Bar */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode
          ? "bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/50 border-slate-800"
          : "bg-white border-slate-200 shadow-sm"
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/20">
              ⚡ Streak Active: {profile.streakDays} Days
            </span>
            <span className="text-xs text-slate-400">&bull; Level {profile.level} Student</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Good Morning, {profile.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Autonomous StudentOS has prepared <span className="font-bold text-cyan-400">{tasks.length} missions</span> for your primary goal: <span className="font-semibold text-white">{profile.primaryGoal}</span>.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => onNavigateToTab("roadmap")}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 flex items-center space-x-1.5 transition-all"
          >
            <Target className="w-4 h-4" />
            <span>View Goal Roadmap</span>
          </button>
        </div>
      </div>

      {/* 3 Circular Progress Rings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ring 1: Today */}
        <div className={`p-5 rounded-2xl border flex items-center justify-between ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Today&apos;s Mission</span>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">{todayProgressPercent}%</h3>
            <p className="text-xs text-slate-400 mt-0.5">{completedCount} of {tasks.length} tasks finished</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-cyan-400 flex items-center justify-center font-black text-xs text-cyan-300">
            {todayProgressPercent}%
          </div>
        </div>

        {/* Ring 2: Weekly */}
        <div className={`p-5 rounded-2xl border flex items-center justify-between ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Weekly Target</span>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">{weeklyProgressPercent}%</h3>
            <p className="text-xs text-slate-400 mt-0.5">24.5 / 28.0 Hours Studied</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-400 flex items-center justify-center font-black text-xs text-emerald-300">
            {weeklyProgressPercent}%
          </div>
        </div>

        {/* Ring 3: Monthly */}
        <div className={`p-5 rounded-2xl border flex items-center justify-between ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Monthly Goal Velocity</span>
            <h3 className="text-2xl font-black text-purple-400 mt-1">{monthlyProgressPercent}%</h3>
            <p className="text-xs text-slate-400 mt-0.5">Target: {profile.targetCompany} SDE</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-purple-400 flex items-center justify-center font-black text-xs text-purple-300">
            {monthlyProgressPercent}%
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Mission & Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Today's Mission Checklist */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="font-extrabold text-base text-white">Today&apos;s AI Scheduled Missions</h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {completedCount} / {tasks.length} Completed
            </span>
          </div>

          {/* Progress Fill Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 transition-all duration-500"
              style={{ width: `${todayProgressPercent}%` }}
            />
          </div>

          {/* Checklist Task Items */}
          <div className="space-y-3 pt-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group ${
                  task.completed
                    ? "bg-slate-950/60 border-slate-800 text-slate-500 opacity-80"
                    : "bg-slate-800/40 border-slate-700/60 hover:border-cyan-500/50 text-slate-100"
                }`}
              >
                <div
                  onClick={() => onToggleTask(task.id)}
                  className="flex items-start sm:items-center space-x-3.5 cursor-pointer flex-1"
                >
                  <button className="text-cyan-400 mt-0.5 sm:mt-0 transition-transform group-hover:scale-110">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${task.completed ? "line-through text-slate-500" : "text-white"}`}>
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">{task.subject}</span>
                      <span>&bull;</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{task.durationMinutes} mins ({task.timeSlot})</span>
                      </span>
                      {task.sourceAgent && (
                        <>
                          <span>&bull;</span>
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/20">
                            {task.sourceAgent}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                  {task.platformUrl && (
                    <a
                      href={task.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[11px] font-bold border border-cyan-500/30 flex items-center space-x-1 transition-all"
                    >
                      <span>{task.platformName || "Launch"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    task.priority === "High"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "bg-blue-500/20 text-blue-300"
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onNavigateToTab("planner")}
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <span>Manage Full Timetable</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Col: Proactive AI Suggestions & Upcoming Deadlines */}
        <div className="space-y-6">
          
          {/* AI Suggestions Card */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h3 className="font-extrabold text-base text-white">Proactive AI Nudges</h3>
            </div>

            <div className="space-y-3">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between text-cyan-300 font-extrabold">
                    <span>{sug.title}</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[10px]">{sug.impactScore}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{sug.description}</p>
                  <button
                    onClick={() => onNavigateToTab("workspace")}
                    className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition-all"
                  >
                    {sug.actionButtonText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines Widget */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white">Upcoming Deadlines</h3>
              </div>
              <button
                onClick={() => onNavigateToTab("calendar")}
                className="text-xs text-amber-400 hover:underline font-bold"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {events.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{evt.title}</h4>
                    <p className="text-[11px] text-slate-400">{evt.subject} &bull; {evt.date}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    evt.type === 'Exam' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {evt.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Student Coding Platforms Launchpad */}
      <StudentPlatformsHub isDarkMode={isDarkMode} />

      {/* Persistent AI Chat Input Box */}
      <div className={`p-4 rounded-3xl border ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <form onSubmit={handleChatSubmit} className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask CampusPilot AI anything (e.g. 'Explain Dijkstra algorithm', 'Replan my day', 'DBMS interview questions')..."
            className={`flex-1 p-3 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
              isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300"
            }`}
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center space-x-1 disabled:opacity-40 shadow-md"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
