import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Sparkles,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";

const links = [

  {
    label: "Home",
    to: "/",
  },

  {
    label: "Features",
    to: "/#features",
  },

  {
    label: "How It Works",
    to: "/#how",
  },

  {
    label: "Pricing",
    to: "/#pricing",
  },

  {
    label: "About Us",
    to: "/#about",
  },

  {
    label: "Contact",
    to: "/#contact",
  },

];

const Navbar = () => {

  const [open, setOpen] =
    useState(false);

  const [profile, setProfile] =
    useState(null);

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const role =
    localStorage.getItem(
      "resumeiq-role"
    );

  useEffect(() => {

    const savedProfile =
      JSON.parse(

        localStorage.getItem(
          "resumeiq-profile"
        )

      );

    if (savedProfile) {

      setProfile(
        savedProfile
      );

    }

  }, []);

  const isActive = (to) => {

    if (to === "/") {

      return (
        location.pathname === "/" &&
        !location.hash
      );

    }

    return (
      location.hash ===
      to.split("#")[1]
    );

  };

  return (

    <motion.header

      initial={{
        y: -40,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}

      className="fixed top-0 inset-x-0 z-50"

    >

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">

        <div className="glass-card rounded-2xl px-5 sm:px-7 py-3 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >

            <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_18px_rgba(0,212,255,0.45)]">

              <Sparkles
                className="w-5 h-5 text-white"
                strokeWidth={2.2}
              />

            </span>

            <span className="text-lg font-bold tracking-tight">

              <span className="text-white">

                Resume

              </span>

              <span className="neon-text">

                IQ

              </span>

            </span>

          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden lg:flex items-center gap-1">

            {links.map((l) => {

              const active =
                isActive(l.to);

              return (

                <a
                  key={l.label}
                  href={l.to}
                  className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                >

                  {l.label}

                  {active && (

                    <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />

                  )}

                </a>

              );
            })}

          </nav>

          {/* RIGHT */}

          <div className="hidden lg:flex items-center gap-3">

            {user ? (

              <>

                {/* PROFILE */}

                <button
                  onClick={() =>
                    navigate(
                      "/profile"
                    )
                  }
                  className="flex items-center gap-3 glass-card px-4 py-2 rounded-full border border-cyan-500/20"
                >

                  <img
                    src={
                      profile?.image ||

                      user?.photoURL ||

                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }

                    alt="profile"

                    className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                  />

                  <span className="text-white font-medium">

                    {profile?.name ||

                      user?.displayName ||

                      "User"}

                  </span>

                </button>

                {/* DASHBOARD */}

                <button
                  onClick={() => {

                    if (
                      role ===
                      "recruiter"
                    ) {

                      navigate(
                        "/recruiter-dashboard"
                      );

                    } else {

                      navigate(
                        "/dashboard"
                      );

                    }

                  }}
                  className="btn-ghost-neon rounded-full px-5 py-2 text-sm font-semibold text-cyan-200 hover:text-white flex items-center gap-2"
                >

                  <LayoutDashboard className="w-4 h-4" />

                  Dashboard

                </button>

                {/* LOGOUT */}

                <button
                  onClick={logout}
                  className="btn-neon-gradient rounded-full px-5 py-2 text-sm font-semibold text-white flex items-center gap-2"
                >

                  <LogOut className="w-4 h-4" />

                  Logout

                </button>

              </>

            ) : (

              <>

                <button
                  onClick={() =>
                    navigate(
                      "/login"
                    )
                  }
                  className="btn-ghost-neon rounded-full px-5 py-2 text-sm font-semibold text-cyan-200"
                >

                  Login

                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/register"
                    )
                  }
                  className="btn-neon-gradient rounded-full px-5 py-2 text-sm font-semibold text-white"
                >

                  Get Started

                </button>

              </>

            )}

          </div>

          {/* MOBILE BUTTON */}

          <button
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-white/5"
            onClick={() =>
              setOpen(!open)
            }
          >

            {open ? (

              <X className="w-5 h-5" />

            ) : (

              <Menu className="w-5 h-5" />

            )}

          </button>

        </div>

        {/* MOBILE MENU */}

        {open && (

          <motion.div

            initial={{
              opacity: 0,
              y: -10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="lg:hidden mt-2 glass-card rounded-2xl p-4 flex flex-col gap-2"

          >

            {/* LINKS */}

            {links.map((l) => (

              <a
                key={l.label}
                href={l.to}
                onClick={() =>
                  setOpen(false)
                }
                className="px-4 py-3 text-sm text-slate-200 hover:bg-white/5 rounded-xl"
              >

                {l.label}

              </a>

            ))}

            {/* USER */}

            {user ? (

              <>

                <button

                  onClick={() => {

                    setOpen(false);

                    navigate("/profile");

                  }}

                  className="btn-ghost-neon rounded-xl px-5 py-3 text-sm font-semibold text-cyan-100 mt-2 flex items-center justify-center gap-2"

                >

                  <User className="w-4 h-4" />

                  Profile

                </button>

                <button

                  onClick={() => {

                    setOpen(false);

                    if (
                      role ===
                      "recruiter"
                    ) {

                      navigate(
                        "/recruiter-dashboard"
                      );

                    } else {

                      navigate(
                        "/dashboard"
                      );

                    }

                  }}

                  className="btn-ghost-neon rounded-xl px-5 py-3 text-sm font-semibold text-cyan-100 flex items-center justify-center gap-2"

                >

                  <LayoutDashboard className="w-4 h-4" />

                  Dashboard

                </button>

                <button

                  onClick={() => {

                    setOpen(false);

                    logout();

                  }}

                  className="btn-neon-gradient rounded-xl px-5 py-3 text-sm font-semibold text-white flex items-center justify-center gap-2"

                >

                  <LogOut className="w-4 h-4" />

                  Logout

                </button>

              </>

            ) : (

              <>

                <button

                  onClick={() => {

                    setOpen(false);

                    navigate("/login");

                  }}

                  className="btn-ghost-neon rounded-xl px-5 py-3 text-sm font-semibold text-cyan-100 mt-2"

                >

                  Login

                </button>

                <button

                  onClick={() => {

                    setOpen(false);

                    navigate("/register");

                  }}

                  className="btn-neon-gradient rounded-xl px-5 py-3 text-sm font-semibold text-white"

                >

                  Get Started

                </button>

              </>

            )}

          </motion.div>

        )}

      </div>

    </motion.header>

  );
};

export default Navbar;