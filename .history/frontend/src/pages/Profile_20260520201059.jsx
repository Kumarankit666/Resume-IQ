import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { User, Upload } from "lucide-react";

const Profile = () => {

  const { user } = useAuth();

  const [name, setName] = useState(
    user?.displayName || ""
  );

  const [image, setImage] = useState(
    user?.photoURL || ""
  );

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);

    }

  };

  const handleSave = () => {

    alert("Profile Updated Successfully 🚀");

  };

  return (

    <div className="min-h-screen px-5 py-32 relative z-10">

      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-bold">

            <span className="text-white">
              My
            </span>

            <span className="neon-text">
              {" "}Profile
            </span>

          </h1>

          <p className="text-slate-400 mt-3">
            Manage your account information and profile settings.
          </p>

        </div>

        {/* Content */}

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start">

          {/* Left */}

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src={
                  image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="w-44 h-44 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_30px_rgba(0,212,255,0.25)]"
              />

              <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-pulse" />

            </div>

            {/* Upload */}

            <label className="mt-6 btn-ghost-neon rounded-xl px-5 py-3 text-cyan-100 cursor-pointer flex items-center gap-2 hover:scale-[1.03] transition-all">

              <Upload className="w-4 h-4" />

              Upload Image

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

            </label>

          </div>

          {/* Right */}

          <div className="space-y-6">

            {/* Full Name */}

            <div>

              <label className="block text-slate-300 mb-2 font-medium">

                Full Name

              </label>

              <div className="relative">

                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-[#0b1020] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="block text-slate-300 mb-2 font-medium">

                Email Address

              </label>

              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full bg-[#0b1020] border border-purple-500/20 rounded-xl py-3 px-4 text-slate-400 outline-none cursor-not-allowed"
              />

            </div>

            {/* Profile URL */}

            <div>

              <label className="block text-slate-300 mb-2 font-medium">

                Profile Image URL

              </label>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste image URL"
                className="w-full bg-[#0b1020] border border-purple-500/20 focus:border-purple-400 rounded-xl py-3 px-4 text-white outline-none"
              />

            </div>

            {/* Save */}

            <button
              onClick={handleSave}
              className="btn-neon-gradient rounded-xl px-7 py-3 text-white font-semibold text-lg hover:scale-[1.02] transition-all"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;