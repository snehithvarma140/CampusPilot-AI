"use client";

import React from "react";
import {
  Sprout,
  Sun,
  Moon,
  Globe,
  Settings2,
  Scan,
  MessageSquareText,
  BarChart2,
  TrendingUp,
  Sliders,
  ShieldCheck,
  Search
} from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: 'en' | 'te' | 'hi';
  setLanguage: (lang: 'en' | 'te' | 'hi') => void;
  farmName: string;
  location: string;
  onOpenProfileModal: () => void;
  onOpenScanModal: () => void;
  onToggleChat: () => void;
  healthScore?: number;
}

export function Navbar({
  currentTab,
  setCurrentTab,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  farmName,
  location,
  onOpenProfileModal,
  onOpenScanModal,
  onToggleChat,
  healthScore = 84
}: NavbarProps) {
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
      isDarkMode 
        ? "bg-slate-900/90 border-slate-800 text-slate-100" 
        : "bg-emerald-900/95 border-emerald-800 text-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Farm Branding */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 text-slate-950 shadow-md flex items-center justify-center">
              <Sprout className="w-6 h-6 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight">AI Farm Doctor</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Digital Twin v2.5
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 truncate max-w-[180px] sm:max-w-xs">
                {farmName} • {location}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setCurrentTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'overview'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'hover:bg-emerald-800/50 text-emerald-100'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Digital Twin</span>
            </button>

            <button
              onClick={() => setCurrentTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'simulator'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'hover:bg-emerald-800/50 text-emerald-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>What-If Lab</span>
            </button>

            <button
              onClick={() => setCurrentTab('predictive')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'predictive'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'hover:bg-emerald-800/50 text-emerald-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Predictive Radar</span>
            </button>

            <button
              onClick={() => setCurrentTab('market')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'market'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'hover:bg-emerald-800/50 text-emerald-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Mandi Search</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Health Score Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/40 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-200">Health:</span>
              <span className="text-xs font-extrabold text-emerald-300">{healthScore}/100</span>
            </div>

            {/* AI Crop Scan Button */}
            <button
              onClick={onOpenScanModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm flex items-center space-x-1.5 shadow-md transition-all transform active:scale-95"
              title="Scan Leaf / Crop Health with AI"
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Leaf Scanner</span>
            </button>

            {/* Language Switcher */}
            <div className="relative flex items-center bg-emerald-950/60 rounded-lg border border-emerald-600/40 p-0.5 text-xs">
              <Globe className="w-3.5 h-3.5 ml-1.5 text-emerald-300 hidden sm:inline" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-emerald-100 text-xs font-semibold py-1 px-1.5 focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-slate-100">English</option>
                <option value="te" className="bg-slate-900 text-slate-100">తెలుగు (Telugu)</option>
                <option value="hi" className="bg-slate-900 text-slate-100">हिंदी (Hindi)</option>
              </select>
            </div>

            {/* Farm Settings / Profile Button */}
            <button
              onClick={onOpenProfileModal}
              className="p-2 rounded-lg hover:bg-emerald-800/50 text-emerald-100 transition-all"
              title="Farm Profile & Parameters"
            >
              <Settings2 className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-emerald-800/50 text-emerald-100 transition-all"
              title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* AI Assistant Chat Trigger */}
            <button
              onClick={onToggleChat}
              className="relative p-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold transition-all shadow-md"
              title="Chat with AI Farm Doctor"
            >
              <MessageSquareText className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>

          </div>

        </div>

        {/* Mobile Tab Strip */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-emerald-800/50 text-xs">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`flex items-center space-x-1 px-2 py-1 rounded ${
              currentTab === 'overview' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-100'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Digital Twin</span>
          </button>

          <button
            onClick={() => setCurrentTab('simulator')}
            className={`flex items-center space-x-1 px-2 py-1 rounded ${
              currentTab === 'simulator' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>What-If</span>
          </button>

          <button
            onClick={() => setCurrentTab('predictive')}
            className={`flex items-center space-x-1 px-2 py-1 rounded ${
              currentTab === 'predictive' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Predictive</span>
          </button>

          <button
            onClick={() => setCurrentTab('market')}
            className={`flex items-center space-x-1 px-2 py-1 rounded ${
              currentTab === 'market' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Mandi Rates</span>
          </button>
        </div>

      </div>
    </header>
  );
}
