import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Briefcase,
  UserCircle,
} from "lucide-react";

const Register = () => {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("individual");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= REGISTER =================

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(

          auth,

          email,

          password

        );

      // ================= UPDATE USER PROFILE =================

      await updateProfile(

        userCredential.user,

        {

          displayName: name,

        }

      );

      // ================= SAVE USER ROLE =================

      const usersData = JSON.parse(

        localStorage.getItem(
          "resumeiq-users"
        ) || "{}"

      );

      usersData[email] = {

        role,

      };

      localStorage.setItem(

        "resumeiq-users",

        JSON.stringify(
          usersData
        )

      );

      // ================= SAVE CURRENT ROLE =================

      localStorage.setItem(

        "resumeiq-role",

        role

      );

      // ================= SAVE USER TYPE =================

      localStorage.setItem(

        "userType",

        role

      );

      // ================= SAVE PROFILE =================

      localStorage.setItem(

        "resumeiq-profile",

        JSON.stringify({

          name,

          image:
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",

        })

      );

      // ================= REDIRECT =================

      navigate("/login");

    } catch (err) {

      if (
        err.message.includes(
          "email-already"
        )
      ) {

        setError(
          "Email already exists"
        );

      } else if (
        err.message.includes(
          "weak-password"
        )
      ) {

        setError(
          "Password should be at least 6 characters"
        );

      } else {

        setError(
          "Registration failed"
        );

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-5 py-32 relative z-10">

      <div className="w-full max-w-xl glass-card rounded-3xl p-10">

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold mb-4">

            <span className="text-white">

              Create

            </span>

            <span className="neon-text">

              {" "}Account

            </span>

          </h1>

          <p className="text-slate-400 text-lg">

            Join ResumeIQ today 🚀

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
          onSubmit={handleRegister}
          className="space-y-6"
        >

          {/* NAME */}

          <div>

            <label className="block text-slate-300 mb-2">

              Full Name

            </label>

            <div className="relative">

              <User className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

              <input
                type="text"
                required
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter full name"
                className="w-full bg-[#0b1020] border border-cyan-500/20 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-cyan-400"
              />

            </div>

          </div>

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

          {/* ROLE */}

          <div>

            <label className="block text-slate-300 mb-4">

              Select Account Type

            </label>

            <div className="grid md:grid-cols-2 gap-5">

              {/* INDIVIDUAL */}

              <div
                onClick={() =>
                  setRole(
                    "individual"
                  )
                }
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  role === "individual"
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-white/10"
                }`}
              >

                <UserCircle className="w-10 h-10 text-cyan-400 mb-4" />

                <h3 className="text-xl font-bold text-white mb-2">

                  Individual

                </h3>

                <p className="text-slate-400 text-sm">

                  Analyze your own resume and improve ATS score.

                </p>

              </div>

              {/* RECRUITER */}

              <div
                onClick={() =>
                  setRole(
                    "recruiter"
                  )
                }
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  role === "recruiter"
                    ? "border-purple-400 bg-purple-500/10"
                    : "border-white/10"
                }`}
              >

                <Briefcase className="w-10 h-10 text-purple-400 mb-4" />

                <h3 className="text-xl font-bold text-white mb-2">

                  Recruiter

                </h3>

                <p className="text-slate-400 text-sm">

                  Upload and analyze multiple resumes with recruiter dashboard.

                </p>

              </div>

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-neon-gradient rounded-2xl py-4 text-white text-lg font-semibold"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        {/* LOGIN */}

        <div className="mt-8 text-center text-slate-400">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:underline"
          >

            Login

          </Link>

        </div>

      </div>

    </div>

  );
};

export default Register;