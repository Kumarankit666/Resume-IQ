import React, { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="min-h-screen flex items-center justify-center px-5 relative z-10">

      <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10">

        {/* Title */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-3">
            <span className="text-white">Create </span>
            <span className="neon-text">Account</span>
          </h1>

          <p className="text-slate-400">
            Start your AI-powered hiring experience
          </p>

        </div>

        {/* Form */}

        <form className="space-y-5">

          {/* Name */}

          <div>

            <label className="text-sm text-slate-300 mb-2 block">
              Full Name
            </label>

            <div className="relative">

              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Enter full name"
                className="w-full bg-[#0c1020] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="text-sm text-slate-300 mb-2 block">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />

              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-[#0c1020] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-sm text-slate-300 mb-2 block">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full bg-[#0c1020] border border-purple-500/20 focus:border-purple-400 rounded-xl py-3 pl-12 pr-12 text-white outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >

                {showPassword
                  ? <EyeOff className="w-5 h-5" />
                  : <Eye className="w-5 h-5" />
                }

              </button>

            </div>

          </div>

          {/* Register Button */}

          <button
            type="submit"
            onClick={() => navigate("/dashboard")}
            className="w-full btn-neon-gradient rounded-xl py-3 text-white font-semibold text-lg"
          >
            Create Account
          </button>

        </form>

        {/* Login */}

        <p className="text-center text-slate-400 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;