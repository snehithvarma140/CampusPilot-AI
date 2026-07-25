"use client";

import React, { useState } from "react";
import {
  Settings,
  Moon,
  Sun,
  User,
  Save,
  Download,
  CheckCircle2,
  Mail,
  Building,
  Target,
  Code,
  BookOpen
} from "lucide-react";
import { StudentProfile } from "@/lib/student-types";

interface SettingsViewProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  studentName: string;
  profile?: StudentProfile;
  onUpdateProfile?: (updated: StudentProfile) => void;
}

export function SettingsView({
  isDarkMode,
  setIsDarkMode,
  studentName,
  profile,
  onUpdateProfile
}: SettingsViewProps) {
  const [autoReplan, setAutoReplan] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Editable fields for Profile inside Settings
  const [name, setName] = useState(profile?.name || studentName || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [college, setCollege] = useState(profile?.college || "");
  const [branch, setBranch] = useState(profile?.branch || "");
  const [targetCompany, setTargetCompany] = useState(profile?.targetCompany || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile && onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        name,
        email,
        college,
        branch,
        targetCompany,
        primaryGoal: targetCompany
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex items-center justify-between ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 text-white shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">System Settings &amp; Student Profile</h2>
            <p className="text-xs text-slate-400">Manage account profile, theme modes, agent automation rules &amp; data exports</p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Student Profile Details & Settings */}
      {profile && (
        <form onSubmit={handleSaveProfile} className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="font-black text-base text-white">Student Profile Settings</h3>
            </div>
            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Saved to Profile!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>College / University *</span>
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Degree / Branch *</span>
              </label>
              <input
                type="text"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1 flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Target Career Goal / Company *</span>
              </label>
              <input
                type="text"
                required
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Update Settings Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 2: System Preferences */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        
        {/* Theme Setting */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h4 className="font-extrabold text-sm text-white">Interface Theme Mode</h4>
            <p className="text-xs text-slate-400">Toggle between Dark Mode and Light Mode</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold flex items-center space-x-2 hover:bg-slate-700 transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>

        {/* AI Agent Auto-Replan */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h4 className="font-extrabold text-sm text-white">Autonomous Schedule Replanning</h4>
            <p className="text-xs text-slate-400">Allow Reflection Agent to automatically adjust tomorrow&apos;s schedule when tasks are missed</p>
          </div>
          <input
            type="checkbox"
            checked={autoReplan}
            onChange={(e) => setAutoReplan(e.target.checked)}
            className="w-5 h-5 accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Weekly Digest */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h4 className="font-extrabold text-sm text-white">Automated Sunday Report Digest</h4>
            <p className="text-xs text-slate-400">Receive weekly reflection reports &amp; velocity analytics</p>
          </div>
          <input
            type="checkbox"
            checked={weeklyDigest}
            onChange={(e) => setWeeklyDigest(e.target.checked)}
            className="w-5 h-5 accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Export Data */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h4 className="font-extrabold text-sm text-white">Export StudentOS Memory &amp; History</h4>
            <p className="text-xs text-slate-400">Download complete JSON dump of roadmaps, tasks &amp; agent notes</p>
          </div>
          <button
            onClick={() => alert("All StudentOS profile and learning data exported to JSON!")}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>

      </div>

    </div>
  );
}
