import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Briefcase, GraduationCap } from "lucide-react";

const FloatingResume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      className="relative w-full max-w-[320px] mx-auto"
      data-testid="floating-resume"
    >
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[420px] h-[420px] rounded-full border border-cyan-400/15 animate-spin-slow" />
        <div className="absolute w-[340px] h-[340px] rounded-full border border-cyan-400/20 animate-spin-reverse" />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-purple-400/15 animate-spin-slow" />
        <span className="absolute w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00D4FF] animate-spin-slow"
              style={{ transform: 'translateY(-210px)' }} />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_10px_#8B5CF6] animate-spin-reverse"
              style={{ transform: 'translateY(-170px)' }} />
      </div>

      {/* Resume card */}
      <div className="animate-float-slow">
        <div className="relative glass-card-bright neon-glow-cyan rounded-2xl p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/30 to-purple-500/30 flex items-center justify-center">
                <FileText className="w-4 h-4 text-cyan-200" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Candidate</p>
                <p className="text-sm font-semibold text-white">Sarah Chen</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/25">
              Verified
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400/60 to-cyan-400/10 w-[88%]" />
            <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-400/50 to-purple-400/10 w-[72%]" />
            <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400/40 to-transparent w-[60%]" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded-lg p-2 bg-white/[0.03] border border-white/5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-300 mb-1" />
              <p className="text-[10px] text-slate-400">Experience</p>
              <p className="text-xs font-semibold text-white">6 yrs</p>
            </div>
            <div className="rounded-lg p-2 bg-white/[0.03] border border-white/5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-300 mb-1" />
              <p className="text-[10px] text-slate-400">Education</p>
              <p className="text-xs font-semibold text-white">MS, CS</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {['React', 'Python', 'ML', 'AWS'].map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ATS badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
        className="absolute -top-6 -right-6 z-10"
        data-testid="ats-badge"
      >
        <div className="relative w-24 h-24 animate-float-mid">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 blur-2xl opacity-50" />
          <div className="relative w-24 h-24 rounded-full glass-card-bright neon-glow-purple border border-cyan-400/40 flex flex-col items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-cyan-300 mb-0.5" />
            <p className="text-[10px] uppercase tracking-widest text-slate-300">ATS</p>
            <p className="text-xl font-bold neon-text leading-none">95%</p>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-300/80 border-r-purple-400/60 animate-spin-slow" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingResume;