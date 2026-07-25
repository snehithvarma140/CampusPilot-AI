"use client";

import React, { useState } from "react";
import {
  Map,
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Target,
  ExternalLink,
  Layers,
  Award,
  Zap,
  TrendingUp,
  Brain,
  Code2,
  CheckSquare
} from "lucide-react";
import { RoadmapPhase, RoadmapMilestone } from "@/lib/student-types";

interface RoadmapViewProps {
  roadmap: RoadmapPhase[];
  isDarkMode: boolean;
  targetGoal: string;
  onNavigateToTab: (tab: any) => void;
}

export function RoadmapView({
  roadmap,
  isDarkMode,
  targetGoal,
  onNavigateToTab
}: RoadmapViewProps) {
  const [activePhaseFilter, setActivePhaseFilter] = useState<number | "all">("all");
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string>("m1");

  const toggleExpand = (id: string) => {
    setExpandedMilestoneId(expandedMilestoneId === id ? "" : id);
  };

  // Calculate statistics for structural clarity
  const totalMilestones = roadmap.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = roadmap.reduce(
    (acc, p) => acc + p.milestones.filter((m) => m.status === "completed").length,
    0
  );
  const totalHours = roadmap.reduce(
    (acc, p) => acc + p.milestones.reduce((mAcc, m) => mAcc + m.estimatedHours, 0),
    0
  );
  const overallReadinessPercent = 68;

  const filteredRoadmap =
    activePhaseFilter === "all"
      ? roadmap
      : roadmap.filter((p) => p.phaseNumber === activePhaseFilter);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Structural Goal Header & Overview */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border-slate-800"
          : "bg-white border-slate-200 shadow-sm"
      }`}>
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Planner Agent Generated</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              6-Month Master Plan
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Autonomous Goal Roadmap: <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">{targetGoal}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A structured, step-by-step master roadmap optimized by AI agents to build algorithm mastery, CS core fundamentals, and high-scale system design readiness.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-semibold">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{totalHours} Total Estimated Hours</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>3 Structured Phases ({totalMilestones} Milestones)</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Target: Google SDE-1</span>
            </div>
          </div>
        </div>

        {/* Readiness Meter & Action Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 w-full lg:w-auto">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center space-x-4 w-full sm:w-auto justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Readiness</span>
              <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{overallReadinessPercent}% Ready</h3>
              <p className="text-[10px] text-slate-400">Tracked by Memory Agent</p>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-800 border-t-emerald-400 border-r-teal-400 flex items-center justify-center font-black text-xs text-emerald-300">
              {overallReadinessPercent}%
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab("workspace")}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all"
          >
            <Brain className="w-4 h-4" />
            <span>Re-Optimize Roadmap with AI</span>
          </button>
        </div>
      </div>

      {/* Structural Phase Filter Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setActivePhaseFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activePhaseFilter === "all"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            All Phases Overview ({roadmap.length})
          </button>
          {roadmap.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhaseFilter(phase.phaseNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activePhaseFilter === phase.phaseNumber
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              Phase {phase.phaseNumber}: {phase.duration}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-extrabold flex items-center space-x-1">
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          <span>{completedMilestones} of {totalMilestones} Milestones Completed</span>
        </span>
      </div>

      {/* Big Visual Roadmap Phases & Milestones Container */}
      <div className="space-y-12 relative">
        
        {filteredRoadmap.map((phase) => (
          <div key={phase.id} className="space-y-6 relative">
            
            {/* Structural Phase Card Banner */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-xl ${
                    phase.status === "completed"
                      ? "bg-emerald-500 text-slate-950"
                      : phase.status === "in-progress"
                      ? "bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}>
                    P{phase.phaseNumber}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        phase.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : phase.status === "in-progress"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        {phase.status === "in-progress" ? "Active Phase" : phase.status}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{phase.duration}</span>
                    </div>
                    <h2 className="text-lg font-black text-white mt-1">{phase.title}</h2>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-extrabold text-slate-300">
                    {phase.milestones.length} Milestones
                  </span>
                </div>
              </div>
            </div>

            {/* Milestones Vertical Pipeline */}
            <div className="space-y-6 pl-0 sm:pl-6 relative">
              {/* Connector Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/40 via-emerald-500/20 to-slate-800 hidden sm:block" />

              {phase.milestones.map((ms, index) => {
                const isExpanded = expandedMilestoneId === ms.id;
                const completedSubtaskCount = ms.subtasks.filter((s) => s.completed).length;
                const progressPct = ms.subtasks.length > 0 ? Math.round((completedSubtaskCount / ms.subtasks.length) * 100) : 0;

                return (
                  <div
                    key={ms.id}
                    className={`relative p-6 rounded-3xl border transition-all duration-300 ${
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    } ${
                      ms.status === "in-progress"
                        ? "border-cyan-500/50 shadow-xl shadow-cyan-500/5"
                        : "hover:border-slate-700"
                    }`}
                  >
                    {/* Milestone Top Bar */}
                    <div
                      onClick={() => toggleExpand(ms.id)}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-2xl text-xs font-black mt-1 sm:mt-0 ${
                          ms.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : ms.status === "in-progress"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse"
                            : "bg-slate-800 text-slate-500 border border-slate-700"
                        }`}>
                          {ms.status === "completed" ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          ) : ms.status === "locked" ? (
                            <Lock className="w-6 h-6 text-slate-500" />
                          ) : (
                            <Zap className="w-6 h-6 text-cyan-400" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider">
                              Milestone {index + 1}
                            </span>
                            <span>&bull;</span>
                            <span className="text-[11px] text-slate-400 font-bold">{ms.estimatedHours} Hours Estimated</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-white mt-0.5">{ms.title}</h3>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ms.description}</p>
                        </div>
                      </div>

                      {/* Right Status Badge & Expand Toggle */}
                      <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                        <div className="text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider block ${
                            ms.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : ms.status === "in-progress"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-800 text-slate-400"
                          }`}>
                            {ms.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                            {completedSubtaskCount} / {ms.subtasks.length} Subtasks
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="w-full bg-slate-950 h-1.5 rounded-full mt-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    {/* Expanded Detailed Milestone View */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-fade-in">
                        
                        {/* Skills Covered Pills */}
                        <div className="space-y-2">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                            Target Skills Mastered in this Milestone:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {ms.skillsCovered.map((sk, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold flex items-center space-x-1"
                              >
                                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{sk}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Subtask Practice Checklist */}
                        <div className="space-y-3">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                            Step-By-Step Practice Checklist ({ms.subtasks.length} Subtasks):
                          </span>

                          <div className="space-y-2">
                            {ms.subtasks.map((st) => (
                              <div
                                key={st.id}
                                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center space-x-3">
                                  <CheckCircle2
                                    className={`w-5 h-5 ${
                                      st.completed ? "text-emerald-400" : "text-slate-600"
                                    }`}
                                  />
                                  <span className={`font-semibold ${st.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                                    {st.title}
                                  </span>
                                </div>

                                {/* Direct Redirect Button for Subtask */}
                                <a
                                  href="https://leetcode.com/problemset/all/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-[11px] font-extrabold flex items-center space-x-1 transition-all"
                                >
                                  <span>Solve on LeetCode</span>
                                  <ExternalLink className="w-3 h-3 text-blue-400" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Platform Launch Buttons */}
                        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-slate-400 font-bold">Recommended Student Platforms:</span>
                            <a
                              href="https://leetcode.com/problemset/all/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center space-x-1"
                            >
                              <span>LeetCode</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href="https://www.geeksforgeeks.org/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center space-x-1"
                            >
                              <span>GeeksforGeeks</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href="https://codeforces.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center space-x-1"
                            >
                              <span>Codeforces</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <button
                            onClick={() => onNavigateToTab("resources")}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs flex items-center space-x-1.5 shadow-md"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Open Curated Resources</span>
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
