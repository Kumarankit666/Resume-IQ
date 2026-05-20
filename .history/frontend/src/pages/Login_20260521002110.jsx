import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
} from "lucide-react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  /* ================= LOGIN ================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {

        alert("Invalid email or password");

      }

      else if (
        error.code === "auth/wrong-password"
      ) {

        alert("Password is incorrect");

      }

      else if (
        error.code === "auth/invalid-email"
      ) {

        alert("Invalid email format");

      }

      else {

        alert("Login failed");

      }

    }

  };

  /* ================= GOOGLE LOGIN ================= */

  const handleGoogleLogin = async () => {

    try {

      await signInWithPopup(
        auth,
        googleProvider
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Google login failed");

    }

  };

  /* ================= GITHUB LOGIN ================= */

  const handleGithubLogin = async () => {

    try {

      await signInWithPopup(
        auth,
        githubProvider
      );

      navigate("/dashboard");

    } catch (error) {

      alert("GitHub login failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-5 relative z-10">

      <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10">

        {/* Title */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-3">

            <span className="text-white">
              Welcome Back to
            </span>

            <span className="neon-text">
              {" "}ResumeIQ
            </span>

          </h1>

          <p className="text-slate-400">
            Login to continue your AI hiring journey
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="text-sm text-slate-300 mb-2 block">

              Email Address

            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-[#0c1020] border border-purple-500/20 focus:border-purple-400 rounded-xl py-3 pl-12 pr-12 text-white outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >

                {showPassword
                  ? <EyeOff className="w-5 h-5" />
                  : <Eye className="w-5 h-5" />
                }

              </button>

            </div>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full btn-neon-gradient rounded-xl py-3 text-white font-semibold text-lg"
          >
            Login
          </button>

        </form>

        {/* Divider */}

        <div className="my-6 flex items-center gap-3">

          <div className="flex-1 h-px bg-white/10"></div>

          <span className="text-slate-500 text-sm">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 h-px bg-white/10"></div>

        </div>

        {/* Social Login */}

        <div className="grid grid-cols-2 gap-4">

          {/* Google */}

          <button
            onClick={handleGoogleLogin}
            className="glass-card-bright rounded-xl py-3 flex items-center justify-center gap-3 text-white hover:scale-[1.03] transition-all"
          >

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />

            Google

          </button>

          {/* GitHub */}

          <button
            onClick={handleGithubLogin}
            className="glass-card-bright rounded-xl py-3 flex items-center justify-center gap-3 text-white hover:scale-[1.03] transition-all"
          >

            <Github className="w-5 h-5" />

            GitHub

          </button>

        </div>

        {/* Register */}

        <p className="text-center text-slate-400 mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;