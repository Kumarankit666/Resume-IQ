import React from "react";
import { motion } from "framer-motion";
import { ScanSearch, Target, Gauge, Zap } from "lucide-react";

const features = [
  { icon: ScanSearch, title: "AI Resume Screening",
    desc: "Parse, score, and rank thousands of resumes in seconds with context-aware language models.",
    color: "from-cyan-400 to-blue-500", accent: "rgba(0, 212, 255, 0.5)" },
  { icon: Target, title: "Smart Matching",
    desc: "Pair every candidate to the right role by skills, seniority, and culture fit — automatically.",
    color: "from-purple-400 to-fuchsia-500", accent: "rgba(139, 92, 246, 0.55)" },
  { icon: Gauge, title: "ATS Score & Insights",
    desc: "Get a transparent ATS compatibility score with actionable insights to improve every CV.",
    color: "from-sky-400 to-indigo-500", accent: "rgba(99, 102, 241, 0.55)" },
  { icon: Zap, title: "Save Time & Effort",
    desc: "Cut manual screening by 90% and focus your team's energy on the candidates that matter.",
    color: "from-amber-300 to-pink-500", accent: "rgba(236, 72, 153, 0.5)" },
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why Choose <span className="neon-text">ResumeIQ?</span>
          </h2>
          <p className="mt-5 text-base text-slate-400 leading-relaxed">
            A complete AI hiring layer that augments your recruiters — built for speed,
            transparency and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                data-testid={`feature-card-${i}`}
                className="group relative rounded-2xl p-6 glass-card neon-border overflow-hidden"
              >
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: `radial-gradient(60% 70% at 50% 0%, ${f.accent} 0%, transparent 60%)` }} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-[0_0_22px_rgba(0,212,255,0.25)] group-hover:shadow-[0_0_32px_rgba(139,92,246,0.4)] transition-shadow`}>
                    <Icon className="w-5.5 h-5.5 text-white" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;