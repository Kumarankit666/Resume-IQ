import React, {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import axios from "axios";

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
  LineChart,
  Line,
} from "recharts";

const trend = Array.from(
  { length: 12 },
  (_, i) => ({

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
      200 +
      Math.random() * 600 +
      i * 50
    ),

    matches: Math.round(
      80 +
      Math.random() * 250 +
      i * 30
    ),

  })
);

const skillData = [

  {
    skill: "React",
    count: 612,
  },

  {
    skill: "Python",
    count: 580,
  },

  {
    skill: "AWS",
    count: 422,
  },

  {
    skill: "SQL",
    count: 391,
  },

  {
    skill: "TS",
    count: 355,
  },

  {
    skill: "Docker",
    count: 240,
  },

];

const Dashboard = () => {

  const navigate =
    useNavigate();

  const [profile, setProfile] =
    useState(null);

  const [history, setHistory] =
    useState([]);

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

    fetchHistory();

  }, []);

  // ================= FETCH HISTORY =================

  const fetchHistory = async () => {

    try {

      const response =
        await axios.get(

          "http://127.0.0.1:5000/history"

        );

      setHistory(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ================= KPIs =================

  const kpis = [

    {
      icon: FileSearch,
      label: "Resumes Screened",
      value: history.length,
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

      value:
        history.length > 0

          ? Math.round(

              history.reduce(
                (acc, item) =>

                  acc +
                  item.ats_score,

                0
              ) / history.length

            )

          : 0,

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

    <div className="relative min-h-screen">

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20">

        {/* HEADER */}

        <div className="mb-12">

          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-cyan-300/80 mb-2">

            <Sparkles className="w-3 h-3" />

            Live workspace

          </span>

          <h1 className="text-3xl sm:text-5xl font-bold">

            <span className="text-white">

              Hiring

            </span>

            <span className="neon-text">

              {" "}Dashboard

            </span>

          </h1>

          <p className="text-slate-400 text-lg mt-3">

            Real-time signal across your talent pipeline.

          </p>

        </div>

        {/* UPLOAD BUTTON */}

        <div className="flex justify-end mb-10">

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="btn-neon-gradient rounded-full px-6 py-4 text-sm font-semibold text-white inline-flex items-center gap-3"
          >

            <Upload className="w-5 h-5" />

            Upload Resume

          </button>

        </div>

        {/* KPI */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {kpis.map((k, i) => {

            const Icon = k.icon;

            return (

              <motion.div

                key={k.label}

                initial={{
                  opacity: 0,
                  y: 16,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: i * 0.06,
                }}

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

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

          {/* AREA */}

          <div className="lg:col-span-2 glass-card rounded-2xl p-5">

            <div className="flex items-center justify-between mb-3">

              <p className="text-sm font-semibold text-white">

                Pipeline Volume

              </p>

            </div>

            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={trend}>

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

                  </defs>

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.05)"
                  />

                  <XAxis dataKey="m" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="resumes"
                    stroke="#00D4FF"
                    fill="url(#g1)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* SKILLS */}

          <div className="glass-card rounded-2xl p-5">

            <p className="text-sm font-semibold text-white mb-3">

              Top Skills

            </p>

            <div className="h-64">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={skillData}>

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.05)"
                  />

                  <XAxis dataKey="skill" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#8B5CF6"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* HISTORY */}

        <div className="glass-card rounded-3xl p-8 mt-10">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-white">

                Resume History

              </h2>

              <p className="text-slate-400 mt-2">

                Track ATS performance over time

              </p>

            </div>

          </div>

          {/* GRAPH */}

          <div className="h-80 mb-10">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={history}>

                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="resume_name"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="ats_score"
                  stroke="#00D4FF"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10">

                  <th className="text-left py-4 text-slate-300">

                    Resume

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    ATS Score

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    Date

                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map(
                  (item, index) => (

                    <tr
                      key={index}
                      className="border-b border-white/5"
                    >

                      <td className="py-4 text-white">

                        {item.resume_name}

                      </td>

                      <td className="py-4">

                        <span className="neon-text font-bold text-xl">

                          {item.ats_score}%

                        </span>

                      </td>

                      <td className="py-4 text-slate-400">

                        {item.date}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  );
};

export default Dashboard;