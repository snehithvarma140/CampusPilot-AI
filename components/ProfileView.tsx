"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Target,
  Brain,
  Save,
  CheckCircle2,
  BookOpen,
  Code,
  Mail,
  Building,
  Sparkles
} from "lucide-react";
import { StudentProfile } from "@/lib/student-types";

interface ProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  isDarkMode: boolean;
}

export function ProfileView({
  profile,
  onUpdateProfile,
  isDarkMode
}: ProfileViewProps) {
  // Editable Profile States
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [college, setCollege] = useState(profile.college || "");
  const [branch, setBranch] = useState(profile.branch || "");
  const [presentStatus, setPresentStatus] = useState(profile.presentStatus || profile.semester || "");
  const [educationLevel, setEducationLevel] = useState(profile.educationLevel || "Undergraduate");
  const [targetCompany, setTargetCompany] = useState(profile.targetCompany || "");
  const [primaryGoal, setPrimaryGoal] = useState(profile.primaryGoal || "");
  const [studyHours, setStudyHours] = useState(profile.studyHoursPerDay || 4);

  // Arrays
  const [knownSkills, setKnownSkills] = useState<string[]>(profile.strongSkills || profile.knownSkills || ["Python", "C++"]);
  const [weakSkills, setWeakSkills] = useState<string[]>(profile.weakSkills || profile.skillsToImprove || ["Data Structures"]);
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>(profile.skillsToLearn || ["System Design"]);
  const [coursesInterested, setCoursesInterested] = useState<string[]>(profile.coursesInterested || ["DSA"]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      email,
      college,
      branch,
      presentStatus,
      semester: presentStatus,
      educationLevel,
      targetCompany,
      primaryGoal,
      studyHoursPerDay: studyHours,
      strongSkills: knownSkills,
      knownSkills: knownSkills,
      weakSkills: weakSkills,
      skillsToImprove: weakSkills,
      skillsToLearn: skillsToLearn,
      coursesInterested: coursesInterested
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Top Banner Card */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            {name ? name.charAt(0).toUpperCase() : "S"}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">{name || "Student Profile"}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/20">
                StudentOS Member
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
              <span className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{email || "No email provided"}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>{college || "University"}</span>
              </span>
              <span>&bull;</span>
              <span>{branch}</span>
            </p>
          </div>
        </div>

        {saveSuccess && (
          <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40 flex items-center space-x-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile Saved Successfully!</span>
          </span>
        )}
      </div>

      {/* Main Form & Memory Context Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Detailed Editable Fields */}
        <form onSubmit={handleSave} className={`lg:col-span-2 p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-black text-lg text-white flex items-center space-x-2">
              <User className="w-5 h-5 text-cyan-400" />
              <span>Personal & Academic Profile Details</span>
            </h3>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs flex items-center space-x-2 shadow-lg transition-all transform hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Details</span>
            </button>
          </div>

          {/* Basic Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Full Name *</label>
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
              <label className="block font-bold text-slate-300 mb-1">Email Address *</label>
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
              <label className="block font-bold text-slate-300 mb-1">College / University *</label>
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
              <label className="block font-bold text-slate-300 mb-1">Education Level *</label>
              <input
                type="text"
                required
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Degree / Branch *</label>
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

            <div>
              <label className="block font-bold text-slate-300 mb-1">Present Academic Status *</label>
              <input
                type="text"
                required
                value={presentStatus}
                onChange={(e) => setPresentStatus(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1">Target Career Goal / Company *</label>
              <input
                type="text"
                required
                value={targetCompany}
                onChange={(e) => {
                  setTargetCompany(e.target.value);
                  setPrimaryGoal(e.target.value);
                }}
                className={`w-full p-3 rounded-2xl border text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>
          </div>

          {/* Goal & Bandwidth */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <h4 className="font-extrabold text-sm text-cyan-300 flex items-center space-x-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Bandwidth &amp; Learning Goals</span>
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Goal Prompt</label>
              <input
                type="text"
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs sm:text-sm text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Daily Study Bandwidth (Hours / Day)</label>
              <input
                type="number"
                min="1"
                max="16"
                value={studyHours}
                onChange={(e) => setStudyHours(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-xs sm:text-sm text-white ${
                  isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-300"
                }`}
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01]"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Update Profile</span>
            </button>
          </div>
        </form>

        {/* Right Col: Skills & Memory Agent Breakdown */}
        <div className={`p-6 rounded-3xl border space-y-5 ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-base text-white">Skills &amp; AI Memory Matrix</h3>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Known Skills */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-extrabold block">Known Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {knownSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Weak / Practice Skills */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-extrabold block">Skills to Practice / Improve</span>
              <div className="flex flex-wrap gap-1.5">
                {weakSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills to Learn */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-extrabold block">Skills to Learn From Scratch</span>
              <div className="flex flex-wrap gap-1.5">
                {skillsToLearn.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Interested Courses */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-indigo-300 font-extrabold block">Interested Courses &amp; Subjects</span>
              <div className="flex flex-wrap gap-1.5">
                {coursesInterested.map((c, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-200 font-semibold border border-indigo-500/30">
                    {c}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
