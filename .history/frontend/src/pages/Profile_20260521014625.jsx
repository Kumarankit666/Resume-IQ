import React, {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

import {
  Camera,
  Save,
  User,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [name, setName] =
    useState("");

  const [image, setImage] =
    useState("");

  // ================= LOAD PROFILE =================

  useEffect(() => {

    const savedProfile =
      JSON.parse(

        localStorage.getItem(
          "resumeiq-profile"
        )

      );

    if (savedProfile) {

      setName(
        savedProfile.name
      );

      setImage(
        savedProfile.image
      );

    } else {

      setName(
        user?.displayName || ""
      );

      setImage(

        user?.photoURL ||

        "https://cdn-icons-png.flaticon.com/512/149/149071.png"

      );

    }

  }, [user]);

  // ================= IMAGE UPLOAD =================

  const handleImageUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    // IMAGE SIZE CHECK

    if (
      file.size >
      200000000
    ) {

      alert(
        "Image size should be less than 200MB"
      );

      return;

    }

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setImage(
        reader.result
      );

    };

    reader.readAsDataURL(
      file
    );

  };

  // ================= SAVE PROFILE =================

  const handleSave = async () => {

    try {

      const profileData = {

        name:
          name || "User",

        image:
          image ||

          "https://cdn-icons-png.flaticon.com/512/149/149071.png",

      };

      // SAVE PROFILE

      localStorage.setItem(

        "resumeiq-profile",

        JSON.stringify(
          profileData
        )

      );

      // SUCCESS ALERT

      alert(
        "Profile updated successfully 🚀"
      );

      // REDIRECT

      setTimeout(() => {

        navigate(
          "/dashboard"
        );

      }, 500);

    } catch (error) {

      console.log(error);

      alert(
        "Profile save failed"
      );

    }

  };

  return (

    <div className="relative min-h-screen">

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-20">

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
          }}

          className="glass-card rounded-3xl p-10"

        >

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold mb-4">

              <span className="text-white">

                My

              </span>

              <span className="neon-text">

                {" "}Profile

              </span>

            </h1>

            <p className="text-slate-400 text-lg">

              Manage your ResumeIQ profile settings.

            </p>

          </div>

          {/* PROFILE SECTION */}

          <div className="grid lg:grid-cols-[280px_1fr] gap-10">

            {/* LEFT */}

            <div className="flex flex-col items-center">

              <div className="relative">

                <img
                  src={
                    image ||

                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }

                  alt="profile"

                  className="w-56 h-56 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_35px_rgba(0,212,255,0.4)]"
                />

                {/* CAMERA */}

                <label className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(0,212,255,0.5)]">

                  <Camera className="w-6 h-6 text-white" />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    hidden
                  />

                </label>

              </div>

              <p className="text-slate-400 mt-5 text-center">

                Upload a new profile image

              </p>

            </div>

            {/* RIGHT */}

            <div className="space-y-8">

              {/* NAME */}

              <div>

                <label className="block text-slate-300 mb-3 text-lg">

                  Full Name

                </label>

                <div className="relative">

                  <User className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

                  <input
                    type="text"
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

                <label className="block text-slate-300 mb-3 text-lg">

                  Email Address

                </label>

                <input
                  type="email"
                  disabled
                  value={
                    user?.email || ""
                  }
                  className="w-full bg-[#0b1020] border border-white/10 rounded-2xl px-5 py-4 text-slate-400"
                />

              </div>

              {/* ACCOUNT TYPE */}

              <div>

                <label className="block text-slate-300 mb-3 text-lg">

                  Account Type

                </label>

                <div className="inline-flex items-center px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">

                  <span className="text-cyan-300 font-semibold capitalize">

                    {

                      localStorage.getItem(
                        "resumeiq-role"
                      ) || "individual"

                    }

                  </span>

                </div>

              </div>

              {/* SAVE BUTTON */}

              <button
                onClick={handleSave}
                className="btn-neon-gradient rounded-2xl px-8 py-4 text-white text-lg font-semibold inline-flex items-center gap-3 shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >

                <Save className="w-5 h-5" />

                Save Changes

              </button>

            </div>

          </div>

        </motion.div>

      </main>

    </div>

  );
};

export default Profile;