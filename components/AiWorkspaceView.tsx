"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  BrainCircuit,
  Cpu,
  Target,
  Zap,
  Code,
  HelpCircle,
  Copy,
  Check
} from "lucide-react";
import { StudentProfile, AgentThinkingStep } from "@/lib/student-types";

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface AiWorkspaceViewProps {
  profile: StudentProfile;
  isDarkMode: boolean;
  onPlanGenerated: (data: any) => void;
}

export function AiWorkspaceView({
  profile,
  isDarkMode,
  onPlanGenerated
}: AiWorkspaceViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `Hello ${profile.name}! I am **CampusPilot AI** — your Autonomous Student Operating System.\n\nI can build custom roadmaps, explain complex concepts (algorithms, DBMS, System Design), generate practice questions, or replan your daily schedule automatically.\n\nWhat would you like to achieve today?`
    }
  ]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isExecutingWorkflow, setIsExecutingWorkflow] = useState(false);
  const [workflowStepIndex, setWorkflowStepIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending, isExecutingWorkflow]);

  const workflowSteps = [
    { title: "Understanding Goal...", agent: "Goal Understanding Agent" },
    { title: "Planning Strategy & Milestones...", agent: "Planner Agent" },
    { title: "Finding Curated Learning Resources...", agent: "Resource Agent" },
    { title: "Generating Time-Blocked Schedule...", agent: "Scheduler Agent" },
    { title: "Saving Context to Persistent Memory...", agent: "Memory Agent" },
    { title: "Analyzing Progress & Velocity...", agent: "Progress Agent" },
    { title: "Final Plan Ready ✓", agent: "Reflection Agent" }
  ];

  const quickPrompts = [
    "I want to crack Google SDE in 6 months",
    "Explain Dijkstra's shortest path algorithm with Python code",
    "I have fever today and can't study, replan my week",
    "Give me top 5 DBMS interview questions on B-Trees",
    "Build a 2-week revision plan for Operating Systems midterms"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isSending) return;

    const newHistory: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(newHistory);
    setInput("");
    setIsSending(true);

    const isGoalRequest = text.toLowerCase().includes("crack") || text.toLowerCase().includes("goal") || text.toLowerCase().includes("roadmap") || text.toLowerCase().includes("plan");

    if (isGoalRequest) {
      setIsExecutingWorkflow(true);
      for (let i = 0; i < workflowSteps.length; i++) {
        setWorkflowStepIndex(i);
        await new Promise(r => setTimeout(r, 500));
      }
      setIsExecutingWorkflow(false);
    }

    try {
      if (isGoalRequest) {
        // Call agent pipeline endpoint
        const res = await fetch("/api/student/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goalPrompt: text, profile })
        });
        const data = await res.json();
        if (res.ok) {
          onPlanGenerated(data);
          setMessages([
            ...newHistory,
            {
              role: 'model',
              text: `✨ **Autonomous Multi-Agent Plan Generated!**\n\n${data.agentSummary}\n\nI have updated your **Roadmap**, **Daily Timetable**, and **Resource Library**. You can navigate through them using the left sidebar buttons.`
            }
          ]);
        } else {
          setMessages([
            ...newHistory,
            { role: 'model', text: "Issue generating plan: " + (data.error || "Server error") }
          ]);
        }
      } else {
        // Call general chat endpoint
        const res = await fetch("/api/student/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newHistory.map(m => ({ role: m.role, text: m.text })),
            profile
          })
        });
        const data = await res.json();
        if (res.ok) {
          setMessages([...newHistory, { role: 'model', text: data.reply }]);
        } else {
          setMessages([
            ...newHistory,
            { role: 'model', text: "Error connecting to AI server." }
          ]);
        }
      }
    } catch (err: any) {
      console.error(err);
      setMessages([
        ...newHistory,
        { role: 'model', text: "Network error connecting to CampusPilot AI server." }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'model',
        text: `Conversation reset. How can I assist your learning journey today, ${profile.name}?`
      }
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <span>CampusPilot AI Agent Workspace</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous multi-agent execution pipeline & student intelligence engine
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Visual Agent Workflow Bar if executing */}
      {isExecutingWorkflow && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 border border-cyan-500/40 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
            <span className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Multi-Agent Collaborative Workflow Running...</span>
            </span>
            <span>Step {workflowStepIndex + 1} of 7</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {workflowSteps.map((st, idx) => {
              const isDone = idx < workflowStepIndex;
              const isCurrent = idx === workflowStepIndex;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-xl text-[10px] font-bold border flex flex-col justify-between ${
                    isDone
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : isCurrent
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 animate-pulse"
                      : "bg-slate-900 border-slate-800 text-slate-600"
                  }`}
                >
                  <span className="block truncate">{st.agent}</span>
                  <span className="text-[9px] font-normal truncate mt-1">{st.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className={`p-6 rounded-3xl border min-h-[400px] max-h-[550px] overflow-y-auto space-y-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                m.role === 'user'
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white'
                  : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md font-sans'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {isSending && !isExecutingWorkflow && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 animate-pulse p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>CampusPilot AI is computing optimal response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Prompts Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 whitespace-nowrap transition-all flex-shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className={`p-4 rounded-3xl border ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type any goal, study query, or code request..."
            className={`flex-1 p-3.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
              isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-300"
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm flex items-center space-x-1.5 disabled:opacity-40 shadow-lg transition-all"
          >
            <span>Execute</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
