import React from "react";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-20 pb-10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glass-card rounded-3xl p-10 sm:p-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_18px_rgba(0,212,255,0.45)]">
                  <Sparkles className="w-5 h-5 text-white" />
                </span>
                <span className="text-lg font-bold">
                  <span className="text-white">Resume</span>
                  <span className="neon-text">IQ</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                AI-powered hiring intelligence that helps modern teams find the right people faster.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[Twitter, Github, Linkedin].map((Ic, i) => (
                  <a key={i} href="#"
                     className="w-9 h-9 rounded-full glass-card border border-cyan-400/15 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition">
                    <Ic className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div id="about" className="md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Product</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how" className="hover:text-white">How it works</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Changelog</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Stay in the loop</p>
              <div className="flex gap-2">
                <input
                  data-testid="footer-email" type="email" placeholder="you@company.com"
                  className="flex-1 px-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60"
                />
                <button data-testid="footer-subscribe-btn"
                        className="btn-neon-gradient rounded-full px-5 text-sm font-semibold text-white">
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">Get product updates. No spam, ever.</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} ResumeIQ — All rights reserved.</span>
            <span>Built with neurons & neon ✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;