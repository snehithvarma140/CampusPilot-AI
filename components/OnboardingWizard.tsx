"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  Bot,
  Target,
  Clock,
  Brain,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  BookOpen,
  Plus
} from "lucide-react";
import { StudentProfile } from "@/lib/student-types";

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: StudentProfile, goalPrompt: string) => void;
  isDarkMode: boolean;
}

export function OnboardingWizard({
  isOpen,
  onClose,
  onComplete,
  isDarkMode
}: OnboardingWizardProps) {
  const [step, setStep] = useState(1);

  // Step 1: Interested skills or courses & Target Goal
  const [interestedSkills, setInterestedSkills] = useState<string[]>([
    "Data Structures & Algorithms",
    "Full Stack Web Development",
    "System Design",
    "Machine Learning"
  ]);
  const [newInterestedSkill, setNewInterestedSkill] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("Crack Google SDE in 6 months");
  const [targetCompany, setTargetCompany] = useState("Google");

  // Step 2: Education & What they are currently doing
  const [educationLevel, setEducationLevel] = useState("Undergraduate (B.Tech / B.E)");
  const [college, setCollege] = useState("Stanford University / IIT");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [currentActivity, setCurrentActivity] = useState("3rd Year CS Student & Intern");
  const [semester, setSemester] = useState("6th Semester");
  const [studyHours, setStudyHours] = useState<number>(4);

  // Step 3: Known Skills, Skills to Improve, Skills to Learn
  const [knownSkills, setKnownSkills] = useState<string[]>(["Python", "Data Structures", "SQL"]);
  const [skillsToImprove, setSkillsToImprove] = useState<string[]>(["Graph Algorithms", "Dynamic Programming"]);
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>(["System Design", "Distributed Systems", "Docker & K8s"]);

  const [inputKnown, setInputKnown] = useState("");
  const [inputImprove, setInputImprove] = useState("");
  const [inputLearn, setInputLearn] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [agentStepIndex, setAgentStepIndex] = useState(0);

  if (!isOpen) return null;

  const agentSteps = [
    "Analyzing Interested Courses & Career Target...",
    "Planner Agent: Aligning Academic Status & Study Bandwidth...",
    "Resource Agent: Mapping Known Skills vs Skills to Learn...",
    "Scheduler Agent: Generating Time-Blocked Daily Missions...",
    "Memory Agent: Saving Profile to Autonomous Memory Engine...",
    "Personalized Plan Ready! Welcome to CampusPilot AI ✓"
  ];

  const handleFinish = async () => {
    setIsProcessing(true);

    for (let i = 0; i < agentSteps.length; i++) {
      setAgentStepIndex(i);
      await new Promise(r => setTimeout(r, 600));
    }

    const newProfile: StudentProfile = {
      name: "Snehith",
      college,
      branch,
      semester,
      cgpa: "3.8 / 4.0",
      targetCompany,
      primaryGoal,
      studyHoursPerDay: studyHours,
      weakSkills: skillsToImprove,
      strongSkills: knownSkills,
      interests: [...interestedSkills, ...skillsToLearn],
      preferredLearningStyle: "Practice-based",
      preferredLanguage: "English",
      targetDate: "December 2026",
      streakDays: 7,
      xpPoints: 1250,
      level: 4
    };

    setIsProcessing(false);
    onComplete(newProfile, primaryGoal);
    onClose();
  };

  const addTag = (val: string, list: string[], setList: (s: string[]) => void, setInput: (s: string) => void) => {
    if (val.trim() && !list.includes(val.trim())) {
      setList([...list, val.trim()]);
      setInput("");
    }
  };

  const removeTag = (val: string, list: string[], setList: (s: string[]) => void) => {
    setList(list.filter(item => item !== val));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
        isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Student Profile & Goal Information Setup</h3>
              <p className="text-xs text-slate-400">Step {step} of 3 &bull; Personalize Your StudentOS</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {!isProcessing && (
          <div className="w-full bg-slate-800 h-1.5 flex">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* AI Execution Overlay during Finalize */}
          {isProcessing ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center animate-pulse">
                <Bot className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
              <div className="space-y-2">
                <h4 className="font-extrabold text-lg text-white">
                  Collaborative AI Agents Crafting Your Personalized OS
                </h4>
                <p className="text-sm font-semibold text-cyan-300 animate-fade-in">
                  {agentSteps[agentStepIndex]}
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-2 text-left bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                {agentSteps.map((st, idx) => (
                  <div key={idx} className={`flex items-center space-x-2 ${
                    idx < agentStepIndex ? "text-emerald-400" : idx === agentStepIndex ? "text-cyan-300 font-bold" : "text-slate-600"
                  }`}>
                    {idx < agentStepIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : idx === agentStepIndex ? (
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                    )}
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Skills or Courses Interested In */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-lg text-white flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      <span>1. What skills or courses are you interested in?</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Select or type the subjects, technologies, or career tracks you wish to master.
                    </p>
                  </div>

                  {/* Tag list */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Interested Skills / Courses</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interestedSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center space-x-1.5"
                        >
                          <span>{sk}</span>
                          <button onClick={() => removeTag(sk, interestedSkills, setInterestedSkills)} className="hover:text-rose-400 font-black ml-1">×</button>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newInterestedSkill}
                        onChange={(e) => setNewInterestedSkill(e.target.value)}
                        placeholder="e.g. Competitive Programming, Cloud Computing..."
                        className="flex-1 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(newInterestedSkill, interestedSkills, setInterestedSkills, setNewInterestedSkill);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => addTag(newInterestedSkill, interestedSkills, setInterestedSkills, setNewInterestedSkill)}
                        className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Career / Academic Goal</label>
                      <input
                        type="text"
                        value={primaryGoal}
                        onChange={(e) => setPrimaryGoal(e.target.value)}
                        placeholder="e.g. Crack Google SDE in 6 months"
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Target Company / Path</label>
                      <input
                        type="text"
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        placeholder="e.g. Google, Microsoft, GATE 2026"
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Education & What they are currently doing */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-lg text-white flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                      <span>2. What is your education level & what are you currently doing?</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      This information allows CampusPilot AI to schedule study blocks around your ongoing routine.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Education Level</label>
                      <select
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      >
                        <option value="Undergraduate (B.Tech / B.E / B.Sc)">Undergraduate (B.Tech / B.E / B.Sc)</option>
                        <option value="Postgraduate (M.Tech / M.S / MCA)">Postgraduate (M.Tech / M.S / MCA)</option>
                        <option value="High School / Diploma">High School / Diploma</option>
                        <option value="Self-Taught Developer">Self-Taught Developer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">College / University</label>
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. IIT / NIT / BITS / Stanford"
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Degree / Branch</label>
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="e.g. Computer Science & Engineering"
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">What are you doing at present?</label>
                      <input
                        type="text"
                        value={currentActivity}
                        onChange={(e) => setCurrentActivity(e.target.value)}
                        placeholder="e.g. 3rd Year Student, Pre-placement prep, Interning..."
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">
                      Available Daily Study Bandwidth: <span className="text-cyan-400 font-extrabold">{studyHours} Hours/Day</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Known Skills, Skills to Improve, Skills to Learn */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-lg text-white flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span>3. What skills do you know, want to improve, and want to learn?</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      The Resource & Goal Agents will tailor practice links according to your exact proficiency breakdown.
                    </p>
                  </div>

                  {/* Known Skills */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-emerald-400">Skills You Already Know (Strong)</label>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {knownSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center space-x-1 border border-emerald-500/30">
                          <span>{s}</span>
                          <button onClick={() => removeTag(s, knownSkills, setKnownSkills)} className="hover:text-rose-400 font-black">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inputKnown}
                        onChange={(e) => setInputKnown(e.target.value)}
                        placeholder="Add known skill (e.g. Python, SQL)..."
                        className="flex-1 p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(inputKnown, knownSkills, setKnownSkills, setInputKnown);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => addTag(inputKnown, knownSkills, setKnownSkills, setInputKnown)}
                        className="px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Skills to Improve */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-amber-400">Skills You Want to Improve (Needs Practice)</label>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {skillsToImprove.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center space-x-1 border border-amber-500/30">
                          <span>{s}</span>
                          <button onClick={() => removeTag(s, skillsToImprove, setSkillsToImprove)} className="hover:text-rose-400 font-black">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inputImprove}
                        onChange={(e) => setInputImprove(e.target.value)}
                        placeholder="Add skill to improve (e.g. Dynamic Programming, Graphs)..."
                        className="flex-1 p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(inputImprove, skillsToImprove, setSkillsToImprove, setInputImprove);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => addTag(inputImprove, skillsToImprove, setSkillsToImprove, setInputImprove)}
                        className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Skills to Learn */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-cyan-400">Skills You Want to Learn (New Goals)</label>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {skillsToLearn.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center space-x-1 border border-cyan-500/30">
                          <span>{s}</span>
                          <button onClick={() => removeTag(s, skillsToLearn, setSkillsToLearn)} className="hover:text-rose-400 font-black">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inputLearn}
                        onChange={(e) => setInputLearn(e.target.value)}
                        placeholder="Add skill to learn (e.g. System Design, Kubernetes)..."
                        className="flex-1 p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(inputLearn, skillsToLearn, setSkillsToLearn, setInputLearn);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => addTag(inputLearn, skillsToLearn, setSkillsToLearn, setInputLearn)}
                        className="px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer Navigation */}
        {!isProcessing && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs flex items-center space-x-1 shadow-md hover:from-blue-500 hover:to-cyan-400"
              >
                <span>Next Section</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center space-x-1 shadow-lg hover:from-emerald-400 hover:to-teal-300"
              >
                <Sparkles className="w-4 h-4" />
                <span>Complete Profile & Generate Autonomous Plans</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
