import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ScoreRing = ({ score }) => {
  const radius = 70;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 160 160" className="w-44 h-44 -rotate-90">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={radius} stroke="rgba(255,255,255,0.07)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="80" cy="80" r={radius} stroke="url(#ring)" strokeWidth="10"
          fill="none" strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 14px rgba(0, 212, 255, 0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold neon-text">{score}</span>
        <span className="text-xs text-slate-400">ATS Score</span>
      </div>
    </div>
  );
};

const Result = () => {
  const navigate = useNavigate();
  const skills = ["React", "TypeScript", "Python", "AWS", "GraphQL", "PostgreSQL", "Docker"];
  const matches = [
    { role: "Senior Frontend Engineer", match: 96 },
    { role: "Full Stack Engineer", match: 92 },
    { role: "Tech Lead — Web", match: 87 },
  ];
  const insights = [
    { type: "good", text: "Strong frontend portfolio with measurable impact." },
    { type: "good", text: "Excellent keyword coverage for senior IC roles." },
    { type: "warn", text: "Consider adding metrics to your last role's bullet points." },
    { type: "warn", text: "Skills section missing 'CI/CD' — common in target JDs." },
  ];

  return (
    <div className="relative min-h-screen" data-testid="result-page">
      <Navbar />
      <main className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="text-white">Resume </span>
              <span className="neon-text">Analysis</span>
            </h1>
            <p className="mt-2 text-slate-400 text-sm">AI-generated report · Updated just now</p>
          </div>
          <button
            data-testid="goto-dashboard-btn" onClick={() => navigate("/dashboard")}
            className="btn-ghost-neon rounded-full px-5 py-2.5 text-sm text-cyan-100 inline-flex items-center gap-2"
          >
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-4 glass-card-bright neon-border rounded-3xl p-7 flex flex-col items-center justify-center"
          >
            <ScoreRing score={92} />
            <div className="mt-5 text-center">
              <p className="text-emerald-300 text-sm font-medium flex items-center gap-1.5 justify-center">
                <TrendingUp className="w-4 h-4" /> Top 8% of candidates
              </p>
              <p className="text-xs text-slate-400 mt-1">Compared with last 30 days</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-8 glass-card rounded-3xl p-7"
          >
            <h3 className="text-lg font-semibold text-white mb-5">Top Role Matches</h3>
            <div className="space-y-4">
              {matches.map((m) => (
                <div key={m.role}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-slate-200">{m.role}</span>
                    <span className="text-cyan-300 font-semibold">{m.match}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${m.match}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(0,212,255,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-6 glass-card rounded-3xl p-7"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Extracted Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-cyan-400/20 text-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="lg:col-span-6 glass-card rounded-3xl p-7"
          >
            <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
            <ul className="space-y-3">
              {insights.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  {it.type === "good"
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                    : <AlertTriangle className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />}
                  <span className="text-slate-300">{it.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Result;