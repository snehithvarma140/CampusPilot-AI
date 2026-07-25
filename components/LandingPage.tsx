"use client";

import React from "react";
import {
  Sparkles,
  Bot,
  Map,
  Calendar,
  BookOpen,
  BarChart3,
  BrainCircuit,
  Zap,
  ArrowRight,
  Target,
  Clock,
  Layers,
  CheckCircle2,
  Cpu,
  Brain,
  Rocket,
  Compass,
  Trophy,
  Shield,
  Star
} from "lucide-react";

interface LandingPageProps {
  onStartFree: () => void;
  onLogin: () => void;
}

export function LandingPage({ onStartFree, onLogin }: LandingPageProps) {
  const stats = [
    { value: "10,000+", label: "Active Ambitious Students" },
    { value: "98.4%", label: "Goal Roadmap Accuracy" },
    { value: "5,000+", label: "Personalized Roadmaps Generated" },
    { value: "250,000+", label: "AI Missions Completed" }
  ];

  const aiAgents = [
    {
      name: "Goal Understanding Agent",
      role: "Decodes complex goals (e.g. 'Crack Google SDE in 6 months'), extracts skill gaps, timeline & target metrics.",
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 via-slate-900 to-blue-900/30 border-cyan-500/30"
    },
    {
      name: "Planner Agent",
      role: "Architects phased milestone roadmaps, actionable subtasks, and dependency graphs for your learning journey.",
      icon: <Map className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 via-slate-900 to-indigo-900/30 border-blue-500/30"
    },
    {
      name: "Resource Curator Agent",
      role: "Recommends hand-picked YouTube video playlists, LeetCode patterns, documentation & Coursera modules.",
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 via-slate-900 to-pink-900/30 border-purple-500/30"
    },
    {
      name: "Scheduler Agent",
      role: "Generates optimal daily time-blocked study missions fitting your college classes & personal rhythm.",
      icon: <Clock className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 via-slate-900 to-teal-900/30 border-emerald-500/30"
    },
    {
      name: "Memory Agent",
      role: "Retains long-term learning history, previous test performance, weak topics, and study habits.",
      icon: <BrainCircuit className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500/20 via-slate-900 to-orange-900/30 border-amber-500/30"
    },
    {
      name: "Progress Analysis Agent",
      role: "Tracks study velocity, mastery percentage, streak scores, and produces executive weekly reports.",
      icon: <BarChart3 className="w-6 h-6 text-indigo-400" />,
      color: "from-indigo-500/20 via-slate-900 to-violet-900/30 border-indigo-500/30"
    },
    {
      name: "Reflection Agent",
      role: "Detects missed study slots and dynamically recalculates future study plans without guilt or friction.",
      icon: <Zap className="w-6 h-6 text-rose-400" />,
      color: "from-rose-500/20 via-slate-900 to-red-900/30 border-rose-500/30"
    }
  ];

  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      title: "Goal-Driven Career Engineering",
      description: "State your target company or academic milestone. Our 7-agent engine breaks it down into daily actionable steps."
    },
    {
      icon: <Map className="w-6 h-6 text-indigo-400" />,
      title: "Interactive Multi-Phase Roadmaps",
      description: "Explore structured milestone paths with subtask checklists, estimated duration, and real-time skill badges."
    },
    {
      icon: <Calendar className="w-6 h-6 text-emerald-400" />,
      title: "Adaptive Daily Mission Schedule",
      description: "Morning, afternoon, evening & night time slots optimized for peak mental focus and active recall."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      title: "Hand-Curated Resource Library",
      description: "Zero fluff. Access verified video courses, practice platforms, documentation, and reference books."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-400" />,
      title: "Deep Productivity Analytics",
      description: "Visualize total hours studied, completion rates, study streaks, and subject mastery velocity charts."
    },
    {
      icon: <Trophy className="w-6 h-6 text-rose-400" />,
      title: "Gamified Study XP & Badges",
      description: "Earn experience points, unlock achievement badges, and level up as you complete daily missions."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Landing Header (Without Home, About, Contact links) */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-tight text-white">
                CampusPilot
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-cyan-300 font-black text-xs uppercase tracking-wider border border-indigo-400/30">
                StudentOS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onLogin}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              Log in
            </button>
            <button
              onClick={onStartFree}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Creative & Attractive Hero Section (Wide, Centered, No Adaptive Engine) */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-extrabold backdrop-blur-xl shadow-2xl shadow-cyan-500/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Autonomous AI Agentic Operating System for Students</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white">
            Turn Ambitious Goals into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Automated Daily Missions
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            CampusPilot AI isn&apos;t just a chatbot—it&apos;s an autonomous multi-agent student operating system. 
            Specify your goal, and watch 7 collaborative AI agents construct your personalized roadmap, curate top resources, time-block your study calendar, and adapt as you progress.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base shadow-2xl shadow-blue-500/35 flex items-center justify-center space-x-3 transition-all transform hover:scale-105 active:scale-95"
            >
              <span>Get Started &bull; Setup Student Profile</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all hover:border-slate-700"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>Log In to Dashboard</span>
            </button>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No credit card required</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Tailored for University &amp; Career Preparation</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Powered by Google Gemini 3.5 AI</span>
            </span>
          </div>

          {/* Creative Interactive Agent Simulation Banner */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="p-1 rounded-3xl bg-gradient-to-r from-blue-600/40 via-indigo-600/40 to-cyan-500/40 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[22px] bg-slate-950/95 p-6 space-y-6 text-left border border-slate-800">
                
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-cyan-300 font-bold">campuspilot-os://agent-orchestrator</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-black border border-indigo-500/30 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Goal: SDE @ Top Company in 6 Months</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-1.5">
                    <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                      <Target className="w-4 h-4" />
                      <span>Goal Agent</span>
                    </div>
                    <p className="text-slate-300 font-medium">Analyzed target company, identified missing skill gaps in Graphs &amp; System Design.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-1.5">
                    <div className="flex items-center space-x-2 text-blue-400 font-bold">
                      <Map className="w-4 h-4" />
                      <span>Planner Agent</span>
                    </div>
                    <p className="text-slate-300 font-medium">Generated 3 Phased Roadmaps, 12 Milestones, and 48 Daily Practice Subtasks.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1.5">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                      <Clock className="w-4 h-4" />
                      <span>Scheduler Agent</span>
                    </div>
                    <p className="text-slate-300 font-medium">Time-blocked 2h DSA practice in Morning slot &amp; Operating Systems at Night.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {s.value}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Agents Showcase */}
      <section className="py-20 relative px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-extrabold uppercase tracking-widest border border-cyan-500/20">
              Autonomous Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              7 Collaborative AI Agents Assigned To You
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              While conventional apps just answer questions, CampusPilot AI deploys 7 specialized agents that plan, schedule, remember, and continuously optimize your learning path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-gradient-to-b ${agent.color} border backdrop-blur-xl space-y-3 transition-all hover:scale-[1.02] shadow-lg`}
              >
                <div className="p-3 rounded-2xl bg-slate-950/90 w-fit border border-slate-800 shadow-md">
                  {agent.icon}
                </div>
                <h3 className="font-extrabold text-base text-white">{agent.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800/80 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-extrabold uppercase tracking-widest border border-indigo-500/20">
              Built For Modern Students
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Complete Student Life Management System
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Consolidate roadmaps, timetables, course materials, and progress reports into one high-performance dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3 group backdrop-blur-md"
              >
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-110 transition-transform shadow-md">
                  {feat.icon}
                </div>
                <h3 className="font-extrabold text-base text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Automate Your Academic Success?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto font-medium">
              Join thousands of students reaching their target software companies and university ranks with CampusPilot AI.
            </p>
            <button
              onClick={onStartFree}
              className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm sm:text-base hover:bg-slate-100 shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              Sign Up &amp; Launch StudentOS Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-slate-200">CampusPilot AI &bull; StudentOS</span>
          </div>
          <p>&copy; {new Date().getFullYear()} CampusPilot AI. Powered by Google Gemini Autonomous Multi-Agent System.</p>
        </div>
      </footer>

    </div>
  );
}
