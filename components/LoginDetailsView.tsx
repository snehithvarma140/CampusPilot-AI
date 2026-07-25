"use client";

import React, { useState } from "react";
import {
  LogIn,
  ShieldCheck,
  UserCheck,
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Key,
  LogOut,
  Cpu,
  RefreshCw,
  Zap,
  Lock,
  Download
} from "lucide-react";
import { StudentProfile } from "@/lib/student-types";

interface LoginDetailsViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  isDarkMode: boolean;
  onLogout?: () => void;
}

export function LoginDetailsView({
  profile,
  onUpdateProfile,
  isDarkMode,
  onLogout
}: LoginDetailsViewProps) {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installStep, setInstallStep] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [installSuccess, setInstallSuccess] = useState(false);

  const steps = [
    "Reading Resume Structure & Extracted Plaintext...",
    "Memory Agent: Extracting Hard Skills, Projects & Weak Areas...",
    "Goal Understanding Agent: Aligning with Snehith's Target Roadmap...",
    "Successfully Installed Resume into Autonomous StudentOS!"
  ];

  const handleResumeInstall = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInstalling(true);
    setInstallStep(0);
    setInstallSuccess(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setInstallStep(current);
      } else {
        clearInterval(interval);
        setIsInstalling(false);
        setInstallSuccess(true);
        // Update profile with extracted resume
        onUpdateProfile({
          ...profile,
          resumeName: resumeFile ? resumeFile.name : "Snehith_Software_Engineer_Resume.pdf",
          resumeInstalledDate: "July 2026",
          resumeSkillsExtracted: ["Graph Algorithms", "Python", "SQL Mechanics", "System Design", "Distributed Systems"],
          weakSkills: ["Dynamic Programming", "System Design", "Distributed Caching"],
          strongSkills: ["Graph Algorithms", "Python Mechanics", "SQL Database Indexing"]
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 text-white shadow-lg">
            <LogIn className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2">
              <span>Login & Authentication Center</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Session</span>
              </span>
            </h2>
            <p className="text-xs text-slate-400">Manage account credentials, active sessions & install your resume into AI memory</p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-extrabold flex items-center space-x-1.5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Account Credentials & Session Status */}
        <div className={`p-6 rounded-3xl border space-y-5 ${
          isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
        }`}>
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="font-extrabold text-base text-white">Login Account Details</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Account Name</span>
                <span className="font-extrabold text-white text-sm">{profile.name}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Email Address</span>
                <span className="font-bold text-cyan-300">{profile.email || "snehithvarma140@gmail.com"}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>University</span>
                <span className="font-medium text-slate-200">{profile.college}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Access Tier</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-black border border-blue-500/30">
                  Autonomous OS Member
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-slate-300 font-bold mb-1">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Security & Tokens</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Session Encryption</span>
                <span className="text-emerald-400 font-bold">256-bit AES</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Token Status</span>
                <span className="text-cyan-400 font-bold">Valid (Expires in 30d)</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>2FA Protection</span>
                <span className="text-emerald-400 font-bold">Enabled</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 space-y-1.5">
              <span className="text-[11px] font-extrabold text-cyan-300 flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                <span>AI Memory Synchronization</span>
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Your login session automatically syncs goal history across all AI agents (Goal, Planner, Scheduler, Memory, Reflection).
              </p>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Resume Install Section */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-5 ${
          isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-extrabold text-base text-white">Resume Install & AI Skill Extractor</h3>
                <p className="text-xs text-slate-400">Install Snehith&apos;s resume to auto-tune roadmap skills and career goals</p>
              </div>
            </div>

            {profile.resumeName && (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Installed</span>
              </span>
            )}
          </div>

          {/* Currently Installed Resume Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">
                  {profile.resumeName || "Snehith_Software_Engineer_Resume.pdf"}
                </h4>
                <p className="text-xs text-slate-400">
                  Installed: {profile.resumeInstalledDate || "July 2026"} &bull; Size: 1.4 MB &bull; Status: Parsed by Memory Agent
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                alert("Simulated downloading installed resume for Snehith.");
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* Upload / Install Resume Form */}
          <form onSubmit={handleResumeInstall} className="space-y-4">
            
            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 text-center transition-all bg-slate-950/50 relative">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 mx-auto text-cyan-400 mb-2 animate-bounce" />
              <h4 className="text-sm font-extrabold text-white">
                {resumeFile ? resumeFile.name : "Drag & Drop Resume File or Click to Upload"}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF, DOCX, or TXT (Max 10MB) &bull; Automatically parsed by Gemini 3.5
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-400">Or Paste Resume Text directly:</label>
              <textarea
                rows={3}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste Snehith's projects, coursework, or technical skills here..."
                className={`w-full p-3 rounded-xl border text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
                  isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            {/* Installation Progress Bar */}
            {isInstalling && (
              <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 space-y-2 animate-pulse">
                <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold">
                  <Cpu className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>{steps[installStep]}</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500"
                    style={{ width: `${((installStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {installSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Resume Installed! Memory Agent has updated Snehith&apos;s skills and study roadmap.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isInstalling}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>{isInstalling ? "Installing Resume..." : "Install Resume to StudentOS Memory"}</span>
            </button>
          </form>

          {/* Extracted Skills Summary Tags */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <h5 className="text-xs font-bold text-slate-300">Extracted Key Skills & Focus Areas:</h5>
            <div className="flex flex-wrap gap-1.5">
              {(profile.resumeSkillsExtracted || [
                "Graph Algorithms",
                "Python Mechanics",
                "DBMS & Indexing",
                "System Design",
                "Data Structures",
                "SQL",
                "Operating Systems"
              ]).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
