import React from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3, UserCheck } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Resumes", desc: "Drop a single CV or thousands at once. PDF, DOCX, TXT supported." },
  { icon: Cpu, title: "AI Parses & Scores", desc: "Our model extracts skills, experience and ATS-readiness in seconds." },
  { icon: BarChart3, title: "Visualize Insights", desc: "See ranked candidates, role fit, and gap analysis on a single canvas." },
  { icon: UserCheck, title: "Shortlist & Hire", desc: "Sync top picks to your ATS and move from sourced to signed faster." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="relative py-24" data-testid="how-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-purple-300/80 mb-3">Workflow</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How It <span className="neon-text">Works</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-10 right-10 top-[60px] h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-purple-500/0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="relative rounded-2xl p-6 glass-card neon-border"
                >
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-5 shadow-[0_0_28px_rgba(0,212,255,0.35)]">
                    <Icon className="w-6 h-6 text-white" />
                    <span className="absolute -top-2 -right-2 text-[10px] font-bold w-6 h-6 rounded-full bg-black/80 border border-cyan-400/40 text-cyan-200 flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;