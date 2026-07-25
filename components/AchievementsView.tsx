"use client";

import React, { useState } from "react";
import {
  Trophy,
  Award,
  Zap,
  Lock,
  CheckCircle2,
  Sparkles,
  Target,
  Flame,
  Star,
  ExternalLink,
  Code2,
  Terminal,
  Globe
} from "lucide-react";
import { AchievementBadge } from "@/lib/student-types";

interface PlatformStreak {
  platform: string;
  streakDays: number;
  solvedCount: number;
  rankBadge: string;
  color: string;
  url: string;
}

interface AchievementsViewProps {
  badges: AchievementBadge[];
  xpPoints: number;
  level: number;
  isDarkMode: boolean;
}

export function AchievementsView({
  badges,
  xpPoints,
  level,
  isDarkMode
}: AchievementsViewProps) {
  const nextLevelXp = level * 500;
  const currentLevelProgress = Math.min(100, Math.round((xpPoints / nextLevelXp) * 100));

  const platformStreaks: PlatformStreak[] = [
    {
      platform: "LeetCode",
      streakDays: 45,
      solvedCount: 210,
      rankBadge: "Top 12% Knight",
      color: "from-amber-500 to-yellow-600 text-amber-300 border-amber-500/40",
      url: "https://leetcode.com"
    },
    {
      platform: "CodeChef",
      streakDays: 28,
      solvedCount: 145,
      rankBadge: "3★ Programmer (1684 Rating)",
      color: "from-amber-700 to-orange-800 text-orange-300 border-orange-500/40",
      url: "https://www.codechef.com"
    },
    {
      platform: "HackerRank",
      streakDays: 60,
      solvedCount: 180,
      rankBadge: "5★ Problem Solving Gold & 5★ SQL",
      color: "from-emerald-600 to-teal-500 text-emerald-300 border-emerald-500/40",
      url: "https://www.hackerrank.com"
    },
    {
      platform: "GeeksforGeeks",
      streakDays: 100,
      solvedCount: 320,
      rankBadge: "100-Day POTD Legend",
      color: "from-green-600 to-emerald-500 text-green-300 border-green-500/40",
      url: "https://www.geeksforgeeks.org"
    },
    {
      platform: "Codeforces",
      streakDays: 19,
      solvedCount: 95,
      rankBadge: "Specialist (1420 Rating)",
      color: "from-blue-600 to-indigo-600 text-cyan-300 border-blue-500/40",
      url: "https://codeforces.com"
    },
    {
      platform: "Unstop",
      streakDays: 14,
      solvedCount: 12,
      rankBadge: "National Hackathon Finalist",
      color: "from-purple-600 to-pink-600 text-purple-300 border-purple-500/40",
      url: "https://unstop.com"
    }
  ];

  const extendedBadges: AchievementBadge[] = [
    ...badges,
    {
      id: "b_lc",
      title: "LeetCode 200 Solved Master",
      description: "Successfully solved over 200 Medium/Hard problems across Graphs, DP & Arrays.",
      icon: "⚡",
      unlocked: true,
      unlockedDate: "July 2026",
      xpReward: 300
    },
    {
      id: "b_hr",
      title: "HackerRank 5★ Gold Badge",
      description: "Achieved maximum 5 Stars in Problem Solving and SQL Data Engineering certifications.",
      icon: "🏆",
      unlocked: true,
      unlockedDate: "June 2026",
      xpReward: 250
    },
    {
      id: "b_gfg",
      title: "GeeksforGeeks 100-Day Streak",
      description: "Maintained a 100-day consecutive Problem of the Day (POTD) streak.",
      icon: "🔥",
      unlocked: true,
      unlockedDate: "May 2026",
      xpReward: 400
    },
    {
      id: "b_cc",
      title: "CodeChef Starters Winner",
      description: "Ranked in top 50 in CodeChef Starters Division 2 contests.",
      icon: "⭐",
      unlocked: true,
      unlockedDate: "April 2026",
      xpReward: 350
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Level & XP Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? "bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black shadow-xl">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs">
                Student Level {level}
              </span>
              <span className="text-xs text-slate-400 font-bold">&bull; {xpPoints} XP Earned</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Gamified Achievements & Platform Badges</h2>
          </div>
        </div>

        {/* Level XP Progress Fill Bar */}
        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Level {level} Progress</span>
            <span className="text-amber-400">{xpPoints} / {nextLevelXp} XP</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-300 h-2.5 transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Platform Competitive Programming Streaks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <span>Platform Streaks & Contest Ratings</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">Live Synchronized Status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformStreaks.map((ps) => (
            <a
              key={ps.platform}
              href={ps.url}
              target="_blank"
              rel="noreferrer"
              className={`p-5 rounded-3xl border space-y-3 transition-all hover:scale-102 ${
                isDarkMode ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white flex items-center space-x-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>{ps.platform}</span>
                </span>
                <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-black">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{ps.streakDays} Day Streak</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-black block">Badges & Rank</span>
                <span className="text-xs font-bold text-cyan-300 block">{ps.rankBadge}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Total Solved: <strong className="text-white">{ps.solvedCount} Problems</strong></span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-400" />
          <span>Unlocked Student OS Achievement Badges</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {extendedBadges.map((b) => (
            <div
              key={b.id}
              className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden transition-all ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              } ${!b.unlocked && "opacity-60"}`}
            >
              {b.unlocked && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-bl-xl shadow-md">
                  UNLOCKED ✓
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="text-3xl p-3 rounded-2xl bg-slate-950 border border-slate-800 w-fit">
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white">{b.title}</h4>
                  <span className="text-xs font-bold text-amber-400">+{b.xpReward} XP</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>{b.unlocked ? `Unlocked: ${b.unlockedDate}` : "Locked Achievement"}</span>
                {b.unlocked ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-slate-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

