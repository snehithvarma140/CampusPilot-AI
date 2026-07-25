"use client";

import React, { useState } from "react";
import { ExternalLink, Code2, Flame, Trophy, Award, Zap, Sparkles, Globe, Terminal, Layers } from "lucide-react";
import { StudentPlatform } from "@/lib/student-types";

export const STUDENT_PLATFORMS: StudentPlatform[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    category: "DSA & Coding",
    url: "https://leetcode.com/problemset/all/",
    description: "Top platform for Data Structures, Algorithms & Technical Interview Questions.",
    badge: "Top Interview 150",
    color: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    activeUsersCount: "2.4M Active"
  },
  {
    id: "gfg",
    name: "GeeksforGeeks",
    category: "CS Fundamentals",
    url: "https://www.geeksforgeeks.org/",
    description: "Comprehensive tutorials, CS core concepts, DBMS, OS, Systems & Practice problems.",
    badge: "CS Core Hub",
    color: "from-emerald-600 to-teal-500",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    activeUsersCount: "5M+ Readers"
  },
  {
    id: "codeforces",
    name: "Codeforces",
    category: "Competitive Programming",
    url: "https://codeforces.com/",
    description: "Premier competitive programming platform with regular Div 1/2/3 rounds & rating.",
    badge: "Div 1/2 Contests",
    color: "from-blue-600 to-indigo-600",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    activeUsersCount: "800K CP Coders"
  },
  {
    id: "codechef",
    name: "CodeChef",
    category: "Competitive Programming",
    url: "https://www.codechef.com/",
    description: "Starters contests, long challenges, learning tracks & global competitive rank.",
    badge: "Starters Live",
    color: "from-amber-700 to-amber-900",
    iconBg: "bg-amber-700/20 text-amber-300 border-amber-600/30",
    activeUsersCount: "1.2M Coders"
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    category: "DSA & Coding",
    url: "https://www.hackerrank.com/domains/skills-verification",
    description: "Skill certification badges, SQL practice, algorithm domains & company tests.",
    badge: "Skill Certificates",
    color: "from-emerald-500 to-green-600",
    iconBg: "bg-green-500/10 text-green-400 border-green-500/30",
    activeUsersCount: "18M Devs"
  },
  {
    id: "unstop",
    name: "Unstop (Dare2Compete)",
    category: "Contests & Jobs",
    url: "https://unstop.com/hackathons",
    description: "National hackathons, hiring challenges, coding contests, campus competitions & internships.",
    badge: "Hackathons & Contests",
    color: "from-purple-600 to-pink-600",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    activeUsersCount: "10M+ Students"
  },
  {
    id: "neetcode",
    name: "NeetCode.io",
    category: "DSA & Coding",
    url: "https://neetcode.io/practice",
    description: "NeetCode 150 & 250 curated roadmap with video solutions & pattern breakdowns.",
    badge: "Blind 75 / 150",
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    activeUsersCount: "1.5M Students"
  },
  {
    id: "atcoder",
    name: "AtCoder",
    category: "Competitive Programming",
    url: "https://atcoder.jp/",
    description: "High quality Beginner (ABC) and Regular (ARC) contests with clean algorithmic tasks.",
    badge: "ABC Contest",
    color: "from-slate-600 to-slate-800",
    iconBg: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    activeUsersCount: "300K Rated"
  },
  {
    id: "kaggle",
    name: "Kaggle",
    category: "CS Fundamentals",
    url: "https://www.kaggle.com/",
    description: "Machine learning, AI datasets, Jupyter notebooks & competitive data science challenges.",
    badge: "AI & Datasets",
    color: "from-sky-500 to-cyan-600",
    iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    activeUsersCount: "15M Data Sci"
  },
  {
    id: "mitocw",
    name: "MIT OpenCourseWare",
    category: "Courses & Video",
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
    description: "World-class computer science lectures on Algorithms, Data Structures & Systems.",
    badge: "MIT 6.006",
    color: "from-rose-600 to-red-700",
    iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    activeUsersCount: "Free World Class"
  }
];

interface StudentPlatformsHubProps {
  isDarkMode?: boolean;
  compact?: boolean;
}

export function StudentPlatformsHub({ isDarkMode = true, compact = false }: StudentPlatformsHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "DSA & Coding", "Competitive Programming", "CS Fundamentals", "Contests & Jobs"];

  const filteredPlatforms = STUDENT_PLATFORMS.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <div className={`p-6 rounded-3xl border space-y-5 ${
      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-white flex items-center space-x-2">
              <span>Student Coding & Contest Launchpad</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-black border border-cyan-500/30">
                Direct Redirects
              </span>
            </h3>
            <p className="text-xs text-slate-400">Quick launch direct links to LeetCode, Codeforces, GeeksforGeeks, Unstop, and top student hubs</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Student Platforms */}
      <div className={`grid grid-cols-1 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-5"} gap-3.5`}>
        {filteredPlatforms.map((platform) => (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/60 hover:bg-slate-800/40 transition-all duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${platform.iconBg}`}>
                  {platform.badge}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <h4 className="font-black text-sm text-white group-hover:text-cyan-300 transition-colors flex items-center space-x-1">
                  <span>{platform.name}</span>
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {platform.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-medium">{platform.activeUsersCount}</span>
              <span className="font-extrabold text-cyan-400 flex items-center space-x-0.5 group-hover:underline">
                <span>Open</span>
                <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              </span>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}
