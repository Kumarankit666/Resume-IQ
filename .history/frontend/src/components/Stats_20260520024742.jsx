import React from "react";
import { motion } from "framer-motion";
import { FileSearch, Briefcase, Crosshair, Users } from "lucide-react";

const stats = [
  { icon: FileSearch, value: "10K+", label: "Resumes Screened" },
  { icon: Briefcase, value: "2K+", label: "Jobs Matched" },
  { icon: Crosshair, value: "95%", label: "Accuracy" },
  { icon: Users, value: "1K+", label: "Happy Recruiters" },
];

const Stats = () => {
  return (
    <section className="relative py-14" data-testid="stats-section">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl glass-card-bright neon-border overflow-hidden"
        >
          <div className="absolute inset-x-10 -top-1 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          <div className="absolute inset-x-10 -bottom-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  data-testid={`stat-${i}`}
                  className="px-6 py-7 sm:px-8 sm:py-9 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/15 to-purple-500/15 border border-cyan-400/25 flex items-center justify-center shadow-[0_0_14px_rgba(0,212,255,0.18)]">
                    <Icon className="w-5 h-5 text-cyan-200" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{s.value}</p>
                    <p className="text-xs sm:text-sm text-slate-400">{s.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;