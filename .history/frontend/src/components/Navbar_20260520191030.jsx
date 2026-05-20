import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "How It Works", to: "/#how" },
  { label: "Pricing", to: "/#pricing" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/" && !location.hash;
    return location.hash === to.split("#")[1] ? true : false;
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
        <div className="glass-card rounded-2xl px-5 sm:px-7 py-3 flex items-center justify-between">
          <Link to="/" data-testid="logo-link" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_18px_rgba(0,212,255,0.45)]">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.2} />
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/40 to-purple-500/40 blur-md group-hover:blur-lg transition-all" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Resume</span>
              <span className="neon-text">IQ</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(l.to);
              return (
                <a
                  key={l.label}
                  href={l.to}
                  data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {l.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              data-testid="nav-get-started-btn"
              onClick={() => navigate("/upload")}
              className="btn-ghost-neon rounded-full px-5 py-2 text-sm font-semibold text-cyan-200 hover:text-white"
            >
              Get Started
            </button>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-2 glass-card rounded-2xl p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg"
              >
                {l.label}
              </a>
            ))}
            <button
              data-testid="mobile-get-started-btn"
              onClick={() => { setOpen(false); navigate("/upload"); }}
              className="btn-neon-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white mt-2"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;