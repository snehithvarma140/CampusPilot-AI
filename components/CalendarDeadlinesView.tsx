"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  AlertTriangle,
  GraduationCap,
  Trophy,
  Briefcase,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Sparkles
} from "lucide-react";
import { CalendarEvent } from "@/lib/student-types";

interface CalendarDeadlinesViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  isDarkMode: boolean;
}

interface DayLog {
  dateStr: string;
  dayNumber: number;
  tasksDone: string[];
  hoursLogged: number;
  platformsUsed: string[];
  aiNote: string;
}

export function CalendarDeadlinesView({
  events,
  onAddEvent,
  isDarkMode
}: CalendarDeadlinesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayLog, setSelectedDayLog] = useState<DayLog | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<'Exam' | 'Assignment' | 'Hackathon' | 'Interview' | 'Milestone'>('Exam');
  const [date, setDate] = useState("2026-07-25");
  const [subject, setSubject] = useState("Computer Science");

  // July 2026 Monthly Calendar Setup
  const monthName = "July 2026";
  const daysInMonth = 31;
  const startDayOffset = 3; // July 1 2026 is Wednesday (3)

  // Simulated day log mapping for clickable calendar days
  const getLogForDay = (dayNum: number): DayLog => {
    const formattedDate = `July ${dayNum}, 2026`;
    if (dayNum <= 25) {
      return {
        dateStr: formattedDate,
        dayNumber: dayNum,
        tasksDone: [
          `Solved 2 LeetCode Graphs problems (#743 & #1584)`,
          `Read GeeksforGeeks B-Tree Indexing & WAL Architecture`,
          `Active recall flashcards on Operating Systems Deadlocks`
        ],
        hoursLogged: (dayNum % 3) + 3.5,
        platformsUsed: ["LeetCode", "GeeksforGeeks", "Codeforces"],
        aiNote: "Scheduler Agent verified 100% of morning time blocks completed with 92% retention index."
      };
    } else {
      return {
        dateStr: formattedDate,
        dayNumber: dayNum,
        tasksDone: [
          `Scheduled: System Design Rate Limiter (Token Bucket)`,
          `Scheduled: CodeChef Div 2 Contest Preparation`,
          `Scheduled: Review OS Synchronization Primitives`
        ],
        hoursLogged: 4.0,
        platformsUsed: ["LeetCode", "Unstop", "CodeChef"],
        aiNote: "Upcoming AI scheduled study mission. Notifications will trigger at 9:00 AM."
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddEvent({
      id: Math.random().toString(36).substring(2, 9),
      title,
      type,
      date,
      time: "10:00 AM",
      subject,
      priority: "High"
    });
    setTitle("");
    setIsModalOpen(false);
  };

  const getEventBadge = (evtType: string) => {
    switch (evtType) {
      case 'Exam': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Assignment': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Hackathon': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Interview': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 font-black shadow-lg">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Calendar & Academic Deadlines</h2>
            <p className="text-xs text-slate-400">
              Interactive monthly calendar &bull; Click any date to view study logs, tasks & deadlines
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Deadline Event</span>
        </button>
      </div>

      {/* Interactive Monthly Calendar Grid */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-black text-white">{monthName}</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-[10px]">
              Current Academic Term
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /><span>Done</span></span>
            <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-rose-400" /><span>Exam</span></span>
            <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-amber-400" /><span>Deadline</span></span>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 py-1 border-b border-slate-800/60">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Day Cells Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Offset empty slots */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-16 rounded-2xl bg-slate-950/40 opacity-30" />
          ))}

          {/* Actual Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === 25;
            const hasExam = dayNum === 15 || dayNum === 28;
            const hasAssignment = dayNum === 18 || dayNum === 30;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDayLog(getLogForDay(dayNum))}
                className={`h-16 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all hover:scale-105 ${
                  isToday
                    ? "bg-gradient-to-tr from-cyan-950 to-blue-900 border-cyan-400 text-white ring-2 ring-cyan-400/50 shadow-lg"
                    : "bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/60"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-extrabold ${isToday ? "text-cyan-300" : "text-slate-300"}`}>
                    {dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950">
                      Today
                    </span>
                  )}
                </div>

                {/* Status dots */}
                <div className="flex items-center space-x-1 pt-1">
                  {dayNum <= 25 && <div className="w-2 h-2 rounded-full bg-emerald-400" title="Completed Tasks" />}
                  {hasExam && <div className="w-2 h-2 rounded-full bg-rose-400" title="University Exam" />}
                  {hasAssignment && <div className="w-2 h-2 rounded-full bg-amber-400" title="Assignment Due" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-base text-white px-1">Upcoming Academic Deadlines & Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`p-5 rounded-3xl border space-y-3 ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getEventBadge(evt.type)}`}>
                  {evt.type}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{evt.date}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-base text-white">{evt.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{evt.subject} &bull; {evt.time}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Priority: {evt.priority}</span>
                </span>
                <span className="text-emerald-400 font-bold">Scheduled in OS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day Activity Log Pop-up Modal */}
      {selectedDayLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Day Activity Summary</h3>
                  <p className="text-xs text-slate-400">{selectedDayLog.dateStr}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDayLog(null)} className="p-1 rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Study Time Logged */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Study Bandwidth</span>
                <span className="font-extrabold text-cyan-300 text-sm">{selectedDayLog.hoursLogged} Hours Logged</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Platforms Practiced</span>
                <span className="font-bold text-white text-xs">{selectedDayLog.platformsUsed.join(", ")}</span>
              </div>
            </div>

            {/* Tasks Accomplished */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Missions & Tasks Executed on This Day:</span>
              </h4>
              <ul className="space-y-2 text-xs">
                {selectedDayLog.tasksDone.map((task, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Note */}
            <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1">
              <span className="font-extrabold text-cyan-300 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Autonomous AI Memory Log:</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">{selectedDayLog.aiNote}</p>
            </div>

            <button
              onClick={() => setSelectedDayLog(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Summary
            </button>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base">Add New Deadline</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. DBMS Midterm Exam"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Interview">Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Target Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all"
              >
                Save Deadline
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

