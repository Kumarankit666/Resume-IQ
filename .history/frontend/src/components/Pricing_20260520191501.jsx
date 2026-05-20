import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  { name: "Starter", price: "$0", period: "/forever",
    features: ["50 resumes/month", "Basic ATS scoring", "Email support"],
    cta: "Start Free", highlight: false },
  { name: "Pro", price: "$49", period: "/month",
    features: ["5,000 resumes/month", "Advanced matching", "Skill gap analysis", "Priority support"],
    cta: "Upgrade to Pro", highlight: true },
  { name: "Enterprise", price: "Custom", period: "",
    features: ["Unlimited resumes", "Custom AI models", "SSO & SOC2", "Dedicated CSM"],
    cta: "Contact Sales", highlight: false },
];

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="relative py-24" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-3">Pricing</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Simple, <span className="neon-text">scalable plans</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }} data-testid={`pricing-card-${i}`}
              className={`relative rounded-2xl p-7 ${
                p.highlight ? "glass-card-bright neon-glow-purple border border-purple-400/30"
                            : "glass-card neon-border"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold shadow-[0_0_18px_rgba(139,92,246,0.6)]">
                  <Sparkles className="inline w-3 h-3 mr-1 -mt-0.5" /> Most popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{p.price}</span>
                <span className="text-sm text-slate-400">{p.period}</span>
              </div>
              <ul className="space-y-3 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button
                data-testid={`pricing-cta-${i}`}
                onClick={() => navigate("/upload")}
                className={`w-full rounded-full px-5 py-3 text-sm font-semibold ${
                  p.highlight ? "btn-neon-gradient text-white" : "btn-ghost-neon text-cyan-100"
                }`}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;