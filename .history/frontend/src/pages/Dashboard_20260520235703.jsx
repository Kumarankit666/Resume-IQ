import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  FileSearch,
  Users,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Upload,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const trend = Array.from({ length: 12 }, (_, i) => ({
  m: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][i],

  resumes: Math.round(
    200 + Math.random() * 600 + i * 50
  ),

  matches: Math.round(
    80 + Math.random() * 250 + i * 30
  ),
}));

const skillData = [
  { skill: "React", count: 612 },
  { skill: "Python", count: 580 },
  { skill: "AWS", count: 422 },
  { skill: "SQL", count: 391 },
  { skill: "TS", count: 355 },
  { skill: "Docker", count: 240 },
];

const candidates = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend",
    score: 96,
    status: "Shortlisted",
  },

  {
    name: "Marco Diaz",
    role: "ML Engineer",
    score: 93,
    status: "Reviewing",
  },

  {
    name: "Priya Patel",
    role: "Full Stack",
    score: 91,
    status: "Interview",
  },

  {
    name: "Liam Park",
    role: "Design Eng",
    score: 88,
    status: "New",
  },

  {
    name: "Aiko Tanaka",
    role: "Data Eng",
    score: 86,
    status: "Reviewing",
  },
];

const Dashboard = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const savedProfile = JSON.parse(
      localStorage.getItem("resumeiq-profile")
    );

    if (savedProfile) {

      setProfile(savedProfile);

    }

  }, []);

  const kpis = [
    {
      icon: FileSearch,
      label: "Resumes Screened",
      value: "10,482",
      delta: "+12.4%",
    },

    {
      icon: Briefcase,
      label: "Open Roles Matched",
      value: "2,108",
      delta: "+8.1%",
    },

    {
      icon: TrendingUp,
      label: "Avg ATS Score",
      value: "87.4",
      delta: "+3.2",
    },

    {
      icon: Users,
      label: "Active Recruiters",
      value: "1,024",
      delta: "+5.7%",
    },
  ];

  return (

    <div
      className="relative min-h-screen"
      data-testid="dashboard-page"
    >

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20">

        {/* Welcome Section */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-10">

          <div className="flex items-center gap-4">

            <img
              src={
                profile?.image ||
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover"
            />

            <div>

              <h2 className="text-3xl font-bold text-white">

                Welcome,
                {" "}

                <span className="neon-text">

                  {profile?.name ||
                    user?.displayName ||
                    "User"}

                </span>

                👋

              </h2>

              <p className="text-slate-400 mt-1">

                Ready to analyze resumes today?

              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/profile")}
              className="btn-ghost-neon rounded-xl px-5 py-3 text-cyan-100 font-medium"
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="btn-neon-gradient rounded-xl px-5 py-3 text-white font-medium"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Header */}

        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">

          <div>

            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-cyan-300/80 mb-2">

              <Sparkles className="w-3 h-3" />

              Live workspace

            </span>

            <h1 className="text-3xl sm:text-4xl font-bold">

              <span className="text-white">
                Hiring
              </span>

              <span className="neon-text">
                {" "}Dashboard
              </span>

            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Real-time signal across your talent pipeline.
            </p>

          </div>

          <button
            onClick={() => navigate("/upload")}
            className="btn-neon-gradient rounded-full px-5 py-3 text-sm font-semibold text-white inline-flex items-center gap-2"
          >

            <Upload className="w-4 h-4" />

            Upload Resume

          </button>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {kpis.map((k, i) => {

            const Icon = k.icon;

            return (

              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card neon-border rounded-2xl p-5"
              >

                <div className="flex items-center justify-between mb-3">

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/25 flex items-center justify-center">

                    <Icon className="w-4 h-4 text-cyan-200" />

                  </div>

                  <span className="text-xs text-emerald-300 inline-flex items-center gap-0.5">

                    <ArrowUpRight className="w-3 h-3" />

                    {k.delta}

                  </span>

                </div>

                <p className="text-2xl font-bold text-white">
                  {k.value}
                </p>

                <p className="text-xs text-slate-400">
                  {k.label}
                </p>

              </motion.div>

            );
          })}

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

          {/* Area Chart */}

          <div className="lg:col-span-2 glass-card rounded-2xl p-5">

            <div className="flex items-center justify-between mb-3">

              <p className="text-sm font-semibold text-white">
                Pipeline Volume
              </p>

              <p className="text-xs text-slate-400">
                Last 12 months
              </p>

            </div>

            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart
                  data={trend}
                  margin={{
                    top: 8,
                    right: 8,
                    left: -20,
                    bottom: 0,
                  }}
                >

                  <defs>

                    <linearGradient
                      id="g1"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#00D4FF"
                        stopOpacity="0.55"
                      />

                      <stop
                        offset="100%"
                        stopColor="#00D4FF"
                        stopOpacity="0"
                      />

                    </linearGradient>

                    <linearGradient
                      id="g2"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.5"
                      />

                      <stop
                        offset="100%"
                        stopColor="#8B5CF6"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="m"
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0b1024",
                      border:
                        "1px solid rgba(0,212,255,0.3)",
                      borderRadius: 12,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="resumes"
                    stroke="#00D4FF"
                    strokeWidth={2}
                    fill="url(#g1)"
                  />

                  <Area
                    type="monotone"
                    dataKey="matches"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="url(#g2)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Bar Chart */}

          <div className="glass-card rounded-2xl p-5">

            <p className="text-sm font-semibold text-white mb-3">
              Top Skills
            </p>

            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart
                  data={skillData}
                  margin={{
                    top: 8,
                    right: 8,
                    left: -28,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="skill"
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0b1024",
                      border:
                        "1px solid rgba(139,92,246,0.3)",
                      borderRadius: 12,
                    }}
                  />

                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    fill="#8B5CF6"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;