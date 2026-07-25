"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Star,
  Sparkles,
  Search,
  BookMarked
} from "lucide-react";
import { LearningResource } from "@/lib/student-types";
import { StudentPlatformsHub } from "@/components/StudentPlatformsHub";

interface ResourceLibraryViewProps {
  resources: LearningResource[];
  onToggleResource: (id: string) => void;
  isDarkMode: boolean;
  onNavigateToTab: (tab: any) => void;
}

export function ResourceLibraryView({
  resources,
  onToggleResource,
  isDarkMode,
  onNavigateToTab
}: ResourceLibraryViewProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(r => {
    const matchesType = selectedType === "All" || r.type === selectedType;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="w-4 h-4 text-rose-400" />;
      case 'Article': return <FileText className="w-4 h-4 text-cyan-400" />;
      case 'Course': return <GraduationCap className="w-4 h-4 text-purple-400" />;
      default: return <BookMarked className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">AI Curated Resource Library</h2>
            <p className="text-xs text-slate-400">
              Curated by Resource Recommendation Agent &bull; Handpicked tutorials, problems & courses
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab("workspace")}
          className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-extrabold text-xs flex items-center space-x-1.5 hover:bg-purple-500/20 transition-all"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Find More Resources with AI</span>
        </button>
      </div>

      {/* Student Platforms Launchpad */}
      <StudentPlatformsHub isDarkMode={isDarkMode} />

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Type Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {["All", "Video", "Article", "Course", "Practice"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedType === type
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic or title..."
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300"
            }`}
          />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className={`p-5 rounded-3xl border space-y-4 flex flex-col justify-between transition-all ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            } ${res.completed ? "opacity-75" : "hover:border-purple-500/50"}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold">
                  {getTypeIcon(res.type)}
                  <span>{res.type}</span>
                </span>
                <span className="flex items-center space-x-1 text-amber-400 font-bold text-[11px]">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{res.rating}</span>
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-white line-clamp-2">{res.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{res.provider} &bull; Est. {res.estimatedTime}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-cyan-400 hover:underline flex items-center space-x-1"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onToggleResource(res.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                  res.completed
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${res.completed ? "text-emerald-400" : "text-slate-500"}`} />
                <span>{res.completed ? "Done" : "Mark Done"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
