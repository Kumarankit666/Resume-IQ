import React from "react";
import { motion } from "framer-motion";
import { Upload, PlayCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingResume from "./FloatingResume";
import AIBrain from "./AIBrain";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-36 pb-24 sm:pt-44 sm:pb-32" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1"><FloatingResume /></div>

          <div className="lg:col-span-6 order-1 lg:order-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-7 border border-cyan-400/20"
              data-testid="hero-pill"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-medium text-slate-300">AI-Powered Resume Intelligence</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-200 border border-cyan-400/30">v2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
              data-testid="hero-headline"
            >
              <span className="text-white">Smarter Hiring with</span><br />
              <span className="neon-text">AI-Powered Insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-7 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
              data-testid="hero-subheading"
            >
              ResumeIQ helps recruiters and hiring teams screen resumes, match
              the best talent, and save valuable time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                data-testid="hero-upload-btn"
                onClick={() => navigate("/upload")}
                className="btn-neon-gradient rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Resume
              </button>
              <button
                data-testid="hero-demo-btn"
                onClick={() => navigate("/dashboard")}
                className="btn-ghost-neon rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-cyan-100 inline-flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" /> Try Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500"
            >
              <span>Trusted by teams at</span>
              {['Stripe', 'Linear', 'Notion', 'Vercel', 'Figma'].map((b) => (
                <span key={b} className="text-slate-400 font-medium tracking-wide">{b}</span>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-3 order-3"><AIBrain /></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;