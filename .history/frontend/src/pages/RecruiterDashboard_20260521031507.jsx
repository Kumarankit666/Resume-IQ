import React, {
  useState,
} from "react";

import Navbar from "../components/Navbar";

import axios from "axios";

import * as XLSX from "xlsx";

import {
  UploadCloud,
  FileSpreadsheet,
  Search,
} from "lucide-react";

const RecruiterDashboard = () => {

  const [resumes, setResumes] =
    useState([]);

  const [jobDescription, setJobDescription] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  // ================= ANALYZE =================

  const handleAnalyze = async () => {

    if (
      resumes.length === 0
    ) {

      alert(
        "Upload resumes first"
      );

      return;

    }

    if (!jobDescription) {

      alert(
        "Enter job description"
      );

      return;

    }

    try {

      setLoading(true);

      let allResults = [];

      for (
        let i = 0;
        i < resumes.length;
        i++
      ) {

        try {

          const formData =
            new FormData();

          formData.append(
            "resume",
            resumes[i]
          );

          formData.append(
            "job_description",
            jobDescription
          );

          const response =
            await axios.post(

              "http://127.0.0.1:5000/analyze",

              formData,

              {

                timeout: 120000,

              }

            );

          allResults.push({

            candidate_name:
              response.data
                .candidate_name ||

              "Not Found",

            email:
              response.data
                .email ||

              "Not Found",

            phone:
              response.data
                .phone ||

              "Not Found",

            ats_score:
              response.data
                .ats_score || 0,

            matched_skills:
              response.data
                .matched_skills
                ?.join(", ") ||

              "None",

            missing_skills:
              response.data
                .missing_skills
                ?.join(", ") ||

              "None",

            jd_used:
              jobDescription,

            date:
              new Date().toISOString(),

          });

        } catch (error) {

          console.log(
            "Failed:",
            resumes[i].name
          );

          // DON'T STOP PROCESS

          allResults.push({

            candidate_name:
              resumes[i].name,

            email:
              "Failed",

            phone:
              "Failed",

            ats_score: 0,

            matched_skills:
              "Failed",

            missing_skills:
              "Failed",

            jd_used:
              jobDescription,

            date:
              new Date().toISOString(),

          });

        }

      }

      // ================= SORT HIGH ATS =================

      allResults.sort(

        (a, b) =>

          b.ats_score -
          a.ats_score

      );

      setResults(
        allResults
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert(
        "Analysis failed"
      );

      setLoading(false);

    }

  };

  // ================= FILTER =================

  const filteredResults =
    results.filter((item) => {

      if (
        !fromDate ||
        !toDate
      ) {

        return true;

      }

      const itemDate =
        new Date(item.date);

      return (

        itemDate >=
          new Date(fromDate) &&

        itemDate <=
          new Date(toDate)

      );

    });

  // ================= EXPORT =================

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(

        filteredResults

      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      "ATS Results"

    );

    XLSX.writeFile(

      workbook,

      "ResumeIQ_ATS_Report.xlsx"

    );

  };

  return (

    <div className="relative min-h-screen">

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20">

        {/* HEADER */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">

            <span className="text-white">

              Recruiter

            </span>

            <span className="neon-text">

              {" "}Dashboard

            </span>

          </h1>

          <p className="text-slate-400 text-lg">

            Analyze unlimited resumes with AI-powered ATS ranking.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          {/* TOTAL */}

          <div className="glass-card rounded-3xl p-6">

            <p className="text-slate-400 mb-2">

              Total CV Scanned

            </p>

            <h2 className="text-5xl font-bold neon-text">

              {results.length}

            </h2>

          </div>

          {/* HIGHEST */}

          <div className="glass-card rounded-3xl p-6">

            <p className="text-slate-400 mb-2">

              Highest ATS

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {

                results.length > 0

                ? Math.max(

                    ...results.map(

                      (r) =>
                        r.ats_score
                    )

                  )

                : 0

              }%

            </h2>

          </div>

          {/* AVG */}

          <div className="glass-card rounded-3xl p-6">

            <p className="text-slate-400 mb-2">

              Average ATS

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              {

                results.length > 0

                ? Math.round(

                    results.reduce(

                      (
                        acc,
                        curr
                      ) =>

                        acc +
                        curr.ats_score,

                      0

                    ) /

                    results.length

                  )

                : 0

              }%

            </h2>

          </div>

        </div>

        {/* UPLOAD */}

        <div className="glass-card rounded-3xl p-8 mb-10">

          {/* FILE */}

          <div className="mb-8">

            <label className="block text-slate-300 mb-4 text-lg">

              Upload Multiple Resumes

            </label>

            <div className="border-2 border-dashed border-cyan-500/30 rounded-3xl p-10 text-center">

              <UploadCloud className="w-16 h-16 text-cyan-400 mx-auto mb-5" />

              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) =>

                  setResumes(
                    Array.from(
                      e.target.files
                    )
                  )

                }
                className="text-white"
              />

              <p className="text-slate-400 mt-4">

                Upload unlimited resumes

              </p>

            </div>

          </div>

          {/* JD */}

          <div className="mb-8">

            <label className="block text-slate-300 mb-4 text-lg">

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
            onClick={
              handleAnalyze
            }
            className="btn-neon-gradient rounded-2xl px-8 py-4 text-white font-semibold text-lg"
          >

            {loading
              ? "Analyzing..."
              : "Analyze Resumes"}

          </button>

        </div>

        {/* FILTER */}

        <div className="glass-card rounded-3xl p-6 mb-10">

          <div className="flex flex-wrap gap-5 items-end">

            <div>

              <label className="block text-slate-300 mb-2">

                From Date

              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                }
                className="bg-[#0b1020] border border-cyan-500/20 rounded-xl px-4 py-3 text-white"
              />

            </div>

            <div>

              <label className="block text-slate-300 mb-2">

                To Date

              </label>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
                className="bg-[#0b1020] border border-cyan-500/20 rounded-xl px-4 py-3 text-white"
              />

            </div>

            <button
              onClick={
                exportExcel
              }
              className="btn-neon-gradient rounded-xl px-6 py-3 text-white font-semibold flex items-center gap-3"
            >

              <FileSpreadsheet className="w-5 h-5" />

              Export Excel

            </button>

          </div>

        </div>

        {/* RESULTS */}

        <div className="glass-card rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-8">

            <Search className="text-cyan-400 w-7 h-7" />

            <h2 className="text-3xl font-bold text-white">

              ATS Results

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10">

                  <th className="text-left py-4 text-slate-300">

                    Rank

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    Name

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    Email

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    Phone

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    ATS

                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredResults.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-b border-white/5"
                    >

                      <td className="py-4 text-cyan-300 font-bold">

                        #{index + 1}

                      </td>

                      <td className="py-4 text-white">

                        {
                          item.candidate_name
                        }

                      </td>

                      <td className="py-4 text-slate-300">

                        {item.email}

                      </td>

                      <td className="py-4 text-slate-300">

                        {item.phone}

                      </td>

                      <td className="py-4">

                        <span className="neon-text text-xl font-bold">

                          {
                            item.ats_score
                          }%

                        </span>

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

export default RecruiterDashboard;