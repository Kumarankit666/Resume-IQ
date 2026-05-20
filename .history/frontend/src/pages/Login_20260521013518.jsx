import React, { useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Mail,
  Lock,
  Chrome,
  Github,
} from "lucide-react";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      await signInWithEmailAndPassword(

        auth,

        email,

        password

      );

      const role =
        localStorage.getItem(
          "resumeiq-role"
        );

      // REDIRECT

      if (
        role === "recruiter"
      ) {

        navigate(
          "/recruiter-dashboard"
        );

      } else {

        navigate(
          "/dashboard"
        );

      }

    } catch (err) {

      if (
        err.message.includes(
          "user-not-found"
        )
      ) {

        setError(
          "Invalid username"
        );

      } else if (
        err.message.includes(
          "wrong-password"
        )
      ) {

        setError(
          "Password wrong"
        );

      } else if (
        err.message.includes(
          "invalid-credential"
        )
      ) {

        setError(
          "Invalid username & password"
        );

      } else {

        setError(
          "Login failed"
        );

      }

    } finally {

      setLoading(false);

    }

  };

  // ================= GOOGLE LOGIN =================

  const handleGoogleLogin =
    async () => {

      try {

        await signInWithPopup(

          auth,

          googleProvider

        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ================= GITHUB LOGIN =================

  const handleGithubLogin =
    async () => {

      try {

        await signInWithPopup(

          auth,

          githubProvider

        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center px-5 py-32 relative z-10">

      <div className="w-full max-w-xl glass-card rounded-3xl p-10">

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold mb-4">

            <span className="text-white">

              Welcome

            </span>

            <span className="neon-text">

              {" "}Back

            </span>

          </h1>

          <p className="text-slate-400 text-lg">

            Login to continue 🚀

          </p>

        </div>

        {/* ERROR */}

        {error && (

          <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl px-4 py-3 mb-6">

            {error}

          </div>

        )}

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-slate-300 mb-2">

              Email Address

            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Enter email"
                className="w-full bg-[#0b1020] border border-cyan-500/20 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-cyan-400"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-slate-300 mb-2">

              Password

            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter password"
                className="w-full bg-[#0b1020] border border-cyan-500/20 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-cyan-400"
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-neon-gradient rounded-2xl py-4 text-white text-lg font-semibold"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* SOCIAL LOGIN */}

        <div className="mt-8">

          <div className="flex items-center gap-4 mb-6">

            <div className="flex-1 h-[1px] bg-white/10" />

            <span className="text-slate-400 text-sm">

              OR CONTINUE WITH

            </span>

            <div className="flex-1 h-[1px] bg-white/10" />

          </div>

          <div className="grid grid-cols-2 gap-5">

            {/* GOOGLE */}

            <button
              onClick={
                handleGoogleLogin
              }
              className="glass-card rounded-2xl py-4 flex items-center justify-center gap-3 text-white hover:border-cyan-400 border border-white/10 transition-all"
            >

              <Chrome className="w-5 h-5 text-cyan-400" />

              Google

            </button>

            {/* GITHUB */}

            <button
              onClick={
                handleGithubLogin
              }
              className="glass-card rounded-2xl py-4 flex items-center justify-center gap-3 text-white hover:border-purple-400 border border-white/10 transition-all"
            >

              <Github className="w-5 h-5 text-purple-400" />

              GitHub

            </button>

          </div>

        </div>

        {/* REGISTER */}

        <div className="mt-8 text-center text-slate-400">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2 hover:underline"
          >

            Register

          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;