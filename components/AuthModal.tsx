"use client";

import React, { useState } from "react";
import { 
  X, 
  ArrowRight, 
  UserCheck, 
  Brain, 
  Plus, 
  Sparkles,
  BookOpen,
  Code,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { StudentProfile } from "@/lib/student-types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profileData?: Partial<StudentProfile>) => void;
  isDarkMode: boolean;
  initialMode?: "login" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  isDarkMode,
  initialMode = "login"
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup" | "profile_setup">(initialMode);
  
  // Auth credentials (default empty as requested)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  // Profile setup details (default empty as requested)
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [degreeBranch, setDegreeBranch] = useState("");
  const [presentStatus, setPresentStatus] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [targetCompany, setTargetCompany] = useState("");

  // Courses / Topics Interested (default empty)
  const [coursesInterested, setCoursesInterested] = useState<string[]>([]);
  const [newCourseInput, setNewCourseInput] = useState("");

  // Skills Breakdown (default empty)
  const [knownSkills, setKnownSkills] = useState<string[]>([]);
  const [newKnownSkillInput, setNewKnownSkillInput] = useState("");

  const [skillsToImprove, setSkillsToImprove] = useState<string[]>([]);
  const [newImproveSkillInput, setNewImproveSkillInput] = useState("");

  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [newLearnSkillInput, setNewLearnSkillInput] = useState("");

  if (!isOpen) return null;

  // Strict Email Validation (must contain '@' and end with a valid domain TLD like .in, .email, .com, .edu, etc.)
  const validateEmailFormat = (emailStr: string): boolean => {
    const trimmed = emailStr.trim();
    if (!trimmed.includes("@")) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|gmail|email|edu|org|net|co|io|[a-zA-Z]{2,})$/i;
    return emailRegex.test(trimmed);
  };

  // Quick auto-fill helper for demo/testing
  const handleAutoFillSample = () => {
    setFullName("Snehith Varma");
    if (!email) setEmail("snehithvarma140@gmail.com");
    setCollege("Stanford University / IIT");
    setEducationLevel("Undergraduate (B.Tech / B.E / B.Sc / BCA)");
    setDegreeBranch("Computer Science & Engineering");
    setPresentStatus("3rd Year B.Tech Student (Placement Prep)");
    setTargetCompany("Crack Google SDE in 6 Months");
    setCoursesInterested(["Data Structures & Algorithms", "System Design", "Web Development"]);
    setKnownSkills(["Python", "C++", "SQL", "Git"]);
    setSkillsToImprove(["Data Structures", "Dynamic Programming", "Graph Algorithms"]);
    setSkillsToLearn(["System Design", "Docker & Kubernetes", "Next.js"]);
    setEmailError("");
  };

  // Handlers for adding/removing tags
  const handleAddCourse = () => {
    if (newCourseInput.trim() && !coursesInterested.includes(newCourseInput.trim())) {
      setCoursesInterested([...coursesInterested, newCourseInput.trim()]);
      setNewCourseInput("");
      setEmailError("");
    }
  };

  const handleAddKnownSkill = () => {
    if (newKnownSkillInput.trim() && !knownSkills.includes(newKnownSkillInput.trim())) {
      setKnownSkills([...knownSkills, newKnownSkillInput.trim()]);
      setNewKnownSkillInput("");
      setEmailError("");
    }
  };

  const handleAddImproveSkill = () => {
    if (newImproveSkillInput.trim() && !skillsToImprove.includes(newImproveSkillInput.trim())) {
      setSkillsToImprove([...skillsToImprove, newImproveSkillInput.trim()]);
      setNewImproveSkillInput("");
      setEmailError("");
    }
  };

  const handleAddLearnSkill = () => {
    if (newLearnSkillInput.trim() && !skillsToLearn.includes(newLearnSkillInput.trim())) {
      setSkillsToLearn([...skillsToLearn, newLearnSkillInput.trim()]);
      setNewLearnSkillInput("");
      setEmailError("");
    }
  };

  // LOG IN FORM SUBMIT:
  // Requires email and password to be filled + valid email format!
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email address to log in.");
      return;
    }

    if (!password.trim()) {
      setEmailError("Please enter your password.");
      return;
    }

    if (!validateEmailFormat(email)) {
      setEmailError("Invalid email format! Email must contain '@' and end with a domain like .com, .in, .gmail, .email, or .edu");
      return;
    }

    onLoginSuccess({
      name: fullName.trim() || "Snehith Varma",
      email: email.trim(),
      targetCompany: targetCompany || "Google SDE",
      primaryGoal: targetCompany || "Crack Google SDE in 6 Months"
    });
    onClose();
  };

  // SIGN UP FORM SUBMIT:
  // Requires email and password to be filled + valid email format -> moves to Student Profile Details!
  const handleSignUpNext = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email address to sign up.");
      return;
    }

    if (!password.trim()) {
      setEmailError("Please create a password.");
      return;
    }

    if (!validateEmailFormat(email)) {
      setEmailError("Invalid email format! Email must contain '@' and end with a domain like .com, .in, .gmail, .email, or .edu");
      return;
    }

    setMode("profile_setup");
  };

  // PROFILE SETUP SUBMIT:
  // Requires ALL SECTIONS & FIELDS to be completely filled!
  const handleProfileComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!fullName.trim()) {
      setEmailError("Full Name is required! Please enter your full name.");
      return;
    }

    if (!email.trim() || !validateEmailFormat(email)) {
      setEmailError("Valid email address is required! Must contain '@' and end with a domain like .com, .in, .email, or .edu.");
      return;
    }

    if (!college.trim()) {
      setEmailError("College / University is required! Please fill in your university.");
      return;
    }

    if (!educationLevel.trim()) {
      setEmailError("Education level is required! Please select your education level.");
      return;
    }

    if (!degreeBranch.trim()) {
      setEmailError("Degree / Branch is required! Please enter your branch.");
      return;
    }

    if (!presentStatus.trim()) {
      setEmailError("Present status is required! Please select your academic status.");
      return;
    }

    if (!targetCompany.trim()) {
      setEmailError("Target career goal / company is required! Please fill this field.");
      return;
    }

    if (coursesInterested.length === 0) {
      setEmailError("Interested Courses section is empty! Please add at least 1 course or subject.");
      return;
    }

    if (knownSkills.length === 0) {
      setEmailError("Known Skills section is empty! Please add at least 1 skill you already know.");
      return;
    }

    if (skillsToImprove.length === 0) {
      setEmailError("Skills to Improve section is empty! Please add at least 1 skill you want to practice.");
      return;
    }

    if (skillsToLearn.length === 0) {
      setEmailError("Skills to Learn section is empty! Please add at least 1 skill you want to learn.");
      return;
    }

    onLoginSuccess({
      name: fullName.trim(),
      email: email.trim(),
      college: college.trim(),
      branch: degreeBranch.trim(),
      semester: presentStatus.trim(),
      presentStatus: presentStatus.trim(),
      educationLevel: educationLevel.trim(),
      targetCompany: targetCompany.trim(),
      primaryGoal: targetCompany.trim(),
      preferredLanguage: preferredLanguage.trim() || "English",
      knownSkills: knownSkills,
      weakSkills: skillsToImprove,
      skillsToImprove: skillsToImprove,
      skillsToLearn: skillsToLearn,
      coursesInterested: coursesInterested,
      strongSkills: knownSkills
    });
    onClose();
  };

  const handleDemoLogin = () => {
    setEmail("snehithvarma140@gmail.com");
    setPassword("password123");
    setFullName("Snehith Varma");
    onLoginSuccess({
      name: "Snehith Varma",
      email: "snehithvarma140@gmail.com",
      college: "Stanford University",
      branch: "Computer Science & Engineering",
      semester: "6th Semester",
      presentStatus: "3rd Year B.Tech Student (Placement Prep)",
      educationLevel: "Undergraduate (B.Tech / B.E / B.Sc / BCA)",
      targetCompany: "Google SDE in 6 Months",
      primaryGoal: "Crack Google SDE in 6 Months",
      preferredLanguage: "English",
      knownSkills: ["Python", "C++", "SQL", "Git"],
      weakSkills: ["Dynamic Programming", "Graph Algorithms", "System Design"],
      skillsToImprove: ["Data Structures", "Dynamic Programming", "Graph Algorithms"],
      skillsToLearn: ["System Design", "Microservices", "Next.js", "Redis"],
      coursesInterested: ["Data Structures & Algorithms", "System Design", "Cloud Architecture"],
      strongSkills: ["Python", "C++", "SQL"]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`w-full ${
        mode === "profile_setup" ? "max-w-3xl" : "max-w-md"
      } rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-6 transition-all ${
        isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
      }`}>
        
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-indigo-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">CampusPilot AI</h3>
              <p className="text-[11px] text-cyan-300">Autonomous Student Operating System (StudentOS)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODE 1: LOG IN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-900 border border-indigo-500/30 text-indigo-300 flex items-center justify-center mx-auto shadow-inner">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="font-black text-2xl text-white tracking-tight">
                Log In to StudentOS
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Enter your registered email and password to access your personalized student dashboard.
              </p>
            </div>

            {emailError && (
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{emailError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="e.g. snehithvarma140@gmail.com or user@domain.in"
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    Password *
                  </label>
                  <button type="button" className="text-[11px] text-cyan-400 hover:underline font-semibold">
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setEmailError(""); }}
                  placeholder="••••••••"
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs gap-2 pt-1">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-amber-400 font-extrabold flex items-center space-x-1 hover:underline"
              >
                <span>⚡ Instant Demo Log In</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode("signup"); setEmailError(""); }}
                className="text-slate-400 hover:text-cyan-300 font-semibold"
              >
                Don&apos;t have an account? <strong className="text-cyan-400 underline">Sign up</strong>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01]"
            >
              <span>Log In Directly to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* MODE 2: SIGN UP FORM */}
        {mode === "signup" && (
          <form onSubmit={handleSignUpNext} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-900 border border-indigo-500/30 text-indigo-300 flex items-center justify-center mx-auto shadow-inner">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="font-black text-2xl text-white tracking-tight">
                Create Student Account
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Step 1: Enter your email and password to begin creating your account.
              </p>
            </div>

            {emailError && (
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{emailError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Valid Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="e.g. snehithvarma140@gmail.com or user@domain.in"
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setEmailError(""); }}
                  placeholder="••••••••"
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs gap-2 pt-1">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-amber-400 font-extrabold flex items-center space-x-1 hover:underline"
              >
                <span>⚡ Instant Demo Log In</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode("login"); setEmailError(""); }}
                className="text-slate-400 hover:text-cyan-300 font-semibold"
              >
                Already registered? <strong className="text-cyan-400 underline">Log in</strong>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01]"
            >
              <span>Continue to Student Details →</span>
            </button>
          </form>
        )}

        {/* MODE 3: PROFILE SETUP (STUDENT DETAILS & LEARNING GOALS AFTER SIGN UP) */}
        {mode === "profile_setup" && (
          <form onSubmit={handleProfileComplete} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-white">Student Details &amp; Learning Goals</h4>
                  <p className="text-xs text-slate-400">All sections must be filled so AI agents can generate your roadmap &amp; tasks</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAutoFillSample}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 hover:bg-amber-500/30 transition-all self-start sm:self-auto"
              >
                ⚡ Fill Sample Student Data
              </button>
            </div>

            {emailError && (
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-start space-x-2.5 animate-bounce">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{emailError}</span>
              </div>
            )}

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setEmailError(""); }}
                  placeholder="e.g. Snehith Varma"
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Valid Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="e.g. snehithvarma140@gmail.com or user@domain.in"
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">College / University *</label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => { setCollege(e.target.value); setEmailError(""); }}
                  placeholder="e.g. Stanford University / IIT"
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Education Level *</label>
                <select
                  value={educationLevel}
                  onChange={(e) => { setEducationLevel(e.target.value); setEmailError(""); }}
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">-- Select Education Level * --</option>
                  <option value="Undergraduate (B.Tech / B.E / B.Sc / BCA)">Undergraduate (B.Tech / B.E / B.Sc / BCA)</option>
                  <option value="Postgraduate (M.Tech / M.S / MCA / MBA)">Postgraduate (M.Tech / M.S / MCA / MBA)</option>
                  <option value="High School / Diploma">High School / Diploma</option>
                  <option value="Self-Taught Developer">Self-Taught Developer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Degree / Branch *</label>
                <input
                  type="text"
                  required
                  value={degreeBranch}
                  onChange={(e) => { setDegreeBranch(e.target.value); setEmailError(""); }}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">What are you presently doing? *</label>
                <select
                  value={presentStatus}
                  onChange={(e) => { setPresentStatus(e.target.value); setEmailError(""); }}
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">-- Select Present Academic Status * --</option>
                  <option value="1st Year Student (Building Fundamentals)">1st Year Student (Building Fundamentals)</option>
                  <option value="2nd Year Student (Core Subjects & DSA)">2nd Year Student (Core Subjects & DSA)</option>
                  <option value="3rd Year B.Tech Student (Placement Prep)">3rd Year B.Tech Student (Placement Prep)</option>
                  <option value="4th Year / Final Year (Internship & Projects)">4th Year / Final Year (Internship & Projects)</option>
                  <option value="Preparing for GATE 2026 / Higher Studies">Preparing for GATE 2026 / Higher Studies</option>
                  <option value="Graduated & Job Hunting">Graduated &amp; Job Hunting</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-300 mb-1">Target Career Goal / Company *</label>
                <input
                  type="text"
                  required
                  value={targetCompany}
                  onChange={(e) => { setTargetCompany(e.target.value); setEmailError(""); }}
                  placeholder="e.g. Crack Google SDE in 6 Months, Amazon AWS Engineer"
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

            </div>

            {/* Courses / Topics Interested In */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-800/80">
              <label className="block font-extrabold text-cyan-300 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Interested Courses &amp; Subjects *</span>
              </label>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCourseInput}
                  onChange={(e) => setNewCourseInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCourse(); } }}
                  placeholder="e.g. System Design, Operating Systems, Web Dev, AI/ML"
                  className="flex-1 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center space-x-1 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Course</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {coursesInterested.length === 0 && (
                  <span className="text-rose-400 text-[11px] italic">No courses added yet. Type a course name and click Add!</span>
                )}
                {coursesInterested.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 font-bold text-xs flex items-center space-x-2"
                  >
                    <span>{course}</span>
                    <button
                      type="button"
                      onClick={() => setCoursesInterested(coursesInterested.filter(c => c !== course))}
                      className="text-indigo-400 hover:text-white font-black ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Skills Categorization */}
            <div className="space-y-4 text-xs pt-2 border-t border-slate-800/80">
              <h5 className="font-extrabold text-white text-sm flex items-center space-x-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <span>Skills Assessment &amp; Growth Matrix *</span>
              </h5>

              {/* 1. Known Skills */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="block font-bold text-emerald-400">1. Skills You Already Know *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newKnownSkillInput}
                    onChange={(e) => setNewKnownSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddKnownSkill(); } }}
                    placeholder="e.g. Python, C++, HTML, SQL"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddKnownSkill}
                    className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {knownSkills.length === 0 && (
                    <span className="text-amber-400/80 text-[11px] italic">Add at least 1 known skill</span>
                  )}
                  {knownSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center space-x-1.5">
                      <span>{s}</span>
                      <button type="button" onClick={() => setKnownSkills(knownSkills.filter(x => x !== s))} className="hover:text-white ml-1 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Skills to Improve */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="block font-bold text-amber-400">2. Skills You Want to Improve &amp; Practice *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newImproveSkillInput}
                    onChange={(e) => setNewImproveSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddImproveSkill(); } }}
                    placeholder="e.g. Data Structures, Dynamic Programming, Graphs"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImproveSkill}
                    className="px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skillsToImprove.length === 0 && (
                    <span className="text-amber-400/80 text-[11px] italic">Add at least 1 skill to improve</span>
                  )}
                  {skillsToImprove.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/30 text-amber-300 font-semibold flex items-center space-x-1.5">
                      <span>{s}</span>
                      <button type="button" onClick={() => setSkillsToImprove(skillsToImprove.filter(x => x !== s))} className="hover:text-white ml-1 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Skills to Learn */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <label className="block font-bold text-cyan-400">3. Skills You Want to Learn From Scratch *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newLearnSkillInput}
                    onChange={(e) => setNewLearnSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddLearnSkill(); } }}
                    placeholder="e.g. System Design, Docker, Microservices, React"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddLearnSkill}
                    className="px-3 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skillsToLearn.length === 0 && (
                    <span className="text-cyan-400/80 text-[11px] italic">Add at least 1 skill to learn</span>
                  )}
                  {skillsToLearn.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center space-x-1.5">
                      <span>{s}</span>
                      <button type="button" onClick={() => setSkillsToLearn(skillsToLearn.filter(x => x !== s))} className="hover:text-white ml-1 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Complete Setup & Launch Website Dashboard Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base shadow-2xl shadow-blue-500/35 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01]"
            >
              <span>Save Details &amp; Generate StudentOS Dashboard →</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
