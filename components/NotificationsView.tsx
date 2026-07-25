"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Sparkles,
  Clock,
  History,
  MessageSquare,
  Bot,
  User,
  Search,
  Filter,
  Trash2
} from "lucide-react";
import { NotificationItem } from "@/lib/student-types";

interface ChatHistoryItem {
  id: string;
  prompt: string;
  response: string;
  timestamp: string;
  agent: string;
  topic: string;
}

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  isDarkMode: boolean;
  chatHistory?: ChatHistoryItem[];
}

export function NotificationsView({
  notifications,
  onMarkAllRead,
  isDarkMode,
  chatHistory = []
}: NotificationsViewProps) {
  const [activeTab, setActiveTab] = useState<'notifications' | 'chat_history'>('notifications');
  const [searchQuery, setSearchQuery] = useState("");

  const defaultChatHistory: ChatHistoryItem[] = [
    {
      id: "ch1",
      prompt: "I want to crack Google SDE in 6 months",
      response: "Autonomous Multi-Agent strategy generated with 3 phases: Graph Algorithms, Dynamic Programming, and System Design.",
      timestamp: "Today, 10:15 AM",
      agent: "Goal & Planner Agent",
      topic: "Career Roadmap"
    },
    {
      id: "ch2",
      prompt: "Explain Dijkstra's shortest path algorithm with Python code",
      response: "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph using a Priority Queue (Min Heap). Time complexity is O((V + E) log V).",
      timestamp: "Yesterday, 4:30 PM",
      agent: "Resource & Tutor Agent",
      topic: "Algorithms"
    },
    {
      id: "ch3",
      prompt: "Give me top 5 DBMS interview questions on B-Trees and WAL",
      response: "1. Why B+ Trees are preferred over Binary Search Trees in Database Storage Engines. 2. Write-Ahead Logging (WAL) and ACID durability guarantees...",
      timestamp: "2 days ago",
      agent: "Tutor Agent",
      topic: "Database Systems"
    },
    {
      id: "ch4",
      prompt: "I have fever today and cannot study, replan my schedule",
      response: "Scheduler Agent: Shifted today's intensive Graph problems to Saturday and rescheduled 2 light active recall flashcard sessions for evening.",
      timestamp: "3 days ago",
      agent: "Scheduler Agent",
      topic: "Schedule Re-planning"
    }
  ];

  const historyList = chatHistory.length > 0 ? chatHistory : defaultChatHistory;

  const filteredHistory = historyList.filter(h =>
    h.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.response.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'AI_SUGGESTION': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'SCHEDULE_ALERT': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'MILESTONE_UNLOCKED': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Notifications and History</h2>
            <p className="text-xs text-slate-400">Real-time system alerts, AI schedule changes & archived chat conversation logs</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'notifications'
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts ({notifications.filter(n => !n.read).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chat_history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'chat_history'
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Chat Details & History ({historyList.length})</span>
          </button>
        </div>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold text-slate-400">System Notifications ({notifications.length})</span>
            <button
              onClick={onMarkAllRead}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 sm:p-5 rounded-2xl border flex items-start space-x-3.5 transition-all ${
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                } ${!n.read ? "border-l-4 border-l-cyan-400 bg-cyan-950/20" : "opacity-80"}`}
              >
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-white">{n.title}</h4>
                    <span className="text-[11px] text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat History Tab */}
      {activeTab === 'chat_history' && (
        <div className="space-y-4">
          {/* Search Box */}
          <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat history by keyword, topic, or AI response..."
              className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-500"
            />
          </div>

          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border space-y-3 transition-all ${
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                      {item.topic}
                    </span>
                    <span className="text-slate-400 font-semibold">&bull; Agent: {item.agent}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{item.timestamp}</span>
                </div>

                {/* User Prompt */}
                <div className="flex items-start space-x-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="p-1.5 rounded-lg bg-blue-600 text-white flex-shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-blue-400 block mb-0.5">Student Prompt</span>
                    <p className="text-xs font-bold text-white leading-relaxed">{item.prompt}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start space-x-3 bg-cyan-950/20 p-3.5 rounded-2xl border border-cyan-900/40">
                  <div className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-cyan-400 block mb-0.5">CampusPilot AI Answer</span>
                    <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">{item.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

