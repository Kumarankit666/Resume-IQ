import React, { useState } from "react";

import axios from "axios";

import {
  UploadCloud,
  CheckCircle,
  XCircle,
  Brain,
} from "lucide-react";

const Upload = () => {

  const [resume, setResume] =
    useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  /* ================= HANDLE UPLOAD ================= */

  const handleUpload = async (e) => {

    e.preventDefault();

    if (!resume) {

      alert("Please upload resume");

      return;

    }

    if (!jobDescription) {

      alert("Please enter job description");

      return;

    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "resume",
        resume
      );

      formData.append(
        "job_description",
        jobDescription
      );
      console.log("Sending Request...");
      const response = await axios.post(
        "https://resume-iq-amaz.onrender.com/analyze",
        formData,
          {
        timeout: 120000,
        headers: {
        "Content-Type":
        "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResult(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Resume analysis failed");

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen px-5 py-32 relative z-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold mb-4">

            <span className="text-white">
              AI Resume
            </span>

            <span className="neon-text">
              {" "}Analyzer
            </span>

          </h1>

          <p className="text-slate-400 text-lg">

            Upload your resume and compare it with AI-powered ATS analysis.

          </p>

        </div>

        {/* UPLOAD CARD */}

        <div className="glass-card rounded-3xl p-8">

          <form
            onSubmit={handleUpload}
            className="space-y-8"
          >

            {/* RESUME */}

            <div>

              <label className="block text-slate-300 mb-3 text-lg font-medium">

                Upload Resume (PDF)

              </label>

              <div className="border-2 border-dashed border-cyan-500/30 rounded-2xl p-10 text-center hover:border-cyan-400 transition-all">

                <UploadCloud className="w-14 h-14 text-cyan-400 mx-auto mb-4" />

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setResume(
                      e.target.files[0]
                    )
                  }
                  className="text-white"
                />

                <p className="text-slate-400 mt-3">

                  Upload your PDF resume

                </p>

              </div>

            </div>

            {/* JOB DESCRIPTION */}

            <div>

              <label className="block text-slate-300 mb-3 text-lg font-medium">

                Job Description

              </label>

              <textarea
                rows="8"
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                placeholder="Paste job description here..."
                className="w-full bg-[#0b1020] border border-cyan-500/20 rounded-2xl p-5 text-white outline-none focus:border-cyan-400"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full btn-neon-gradient rounded-2xl py-4 text-white text-lg font-semibold"
            >

              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}

            </button>

          </form>

        </div>

        {/* RESULT */}

        {result && (

          <div className="glass-card rounded-3xl p-8 mt-10">

            {/* ATS SCORE */}

            <div className="text-center mb-12">

              <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-5" />

              <h2 className="text-4xl font-bold text-white mb-4">

                ATS Match Score

              </h2>

              <div className="text-8xl font-bold neon-text">

                {result.ats_score || 0}%

              </div>

            </div>

            {/* MATCHED + MISSING */}

            <div className="grid md:grid-cols-2 gap-8">

              {/* MATCHED */}

              <div className="glass-card-bright rounded-2xl p-6">

                <div className="flex items-center gap-3 mb-5">

                  <CheckCircle className="text-green-400 w-7 h-7" />

                  <h3 className="text-2xl font-bold text-green-400">

                    Matched Skills

                  </h3>

                </div>

                <div className="flex flex-wrap gap-3">

                  {result.matched_skills?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full text-green-300"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

              {/* MISSING */}

              <div className="glass-card-bright rounded-2xl p-6">

                <div className="flex items-center gap-3 mb-5">

                  <XCircle className="text-red-400 w-7 h-7" />

                  <h3 className="text-2xl font-bold text-red-400">

                    Missing Skills

                  </h3>

                </div>

                <div className="flex flex-wrap gap-3">

                  {result.missing_skills?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-full text-red-300"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* FEEDBACK */}

            <div className="glass-card-bright rounded-2xl p-6 mt-10">

              <h3 className="text-2xl font-bold text-cyan-300 mb-5">

                AI Resume Feedback

              </h3>

              <div className="space-y-4">

                {result.feedback?.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-5 py-4 text-cyan-100"
                    >

                      ✅ {item}

                    </div>

                  )
                )}

              </div>

            </div>

            {/* STRENGTHS + WEAKNESSES */}

            <div className="grid md:grid-cols-2 gap-8 mt-10">

              {/* STRENGTHS */}

              <div className="glass-card-bright rounded-2xl p-6">

                <h3 className="text-2xl font-bold text-green-400 mb-5">

                  Resume Strengths

                </h3>

                <div className="space-y-4">

                  {result.strengths?.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-4 text-green-300"
                      >

                        ✅ {item}

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* WEAKNESSES */}

              <div className="glass-card-bright rounded-2xl p-6">

                <h3 className="text-2xl font-bold text-red-400 mb-5">

                  Resume Weaknesses

                </h3>

                <div className="space-y-4">

                  {result.weaknesses?.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-300"
                      >

                        ❌ {item}

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* RESUME SKILLS */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold text-cyan-300 mb-5">

                Resume Skills Detected

              </h3>

              <div className="flex flex-wrap gap-3">

                {result.resume_skills?.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-full text-cyan-200"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default Upload;