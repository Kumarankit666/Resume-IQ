import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

const Profile = () => {

  const { user } = useAuth();

  const [name, setName] = useState(
    user?.displayName || ""
  );

  const [image, setImage] = useState(
    user?.photoURL || ""
  );

  return (

    <div className="min-h-screen px-5 py-32 relative z-10">

      <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-8">

          <span className="text-white">
            My
          </span>

          <span className="neon-text">
            {" "}Profile
          </span>

        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-center">

          <img
            src={
              image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-40 h-40 rounded-full border-4 border-cyan-400 object-cover"
          />

          <div className="flex-1 space-y-5 w-full">

            <div>

              <label className="block text-slate-300 mb-2">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0b1020] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none"
              />

            </div>

            <div>

              <label className="block text-slate-300 mb-2">
                Profile Image URL
              </label>

              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-[#0b1020] border border-purple-500/20 rounded-xl px-4 py-3 text-white outline-none"
              />

            </div>

            <button className="btn-neon-gradient rounded-xl px-6 py-3 text-white font-semibold">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;