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

      for (let i = 0; i < resumes.length; i++) {

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

            formData

          );

        allResults.push({

          candidate_name:
            resumes[i].name.replace(
              ".pdf",
              ""
            ),

          email:
            "Not detected",

          contact:
            "Not detected",

          ats_score:
            response.data.ats_score,

          matched_skills:
            response.data.matched_skills.join(
              ", "
            ),

          missing_skills:
            response.data.missing_skills.join(
              ", "
            ),

          jd_used:
            jobDescription,

          date:
            new Date().toLocaleDateString(),

        });

      }

      // SORT HIGH SCORE FIRST

      allResults.sort(

        (a, b) =>

          b.ats_score -
          a.ats_score

      );

      setResults(allResults);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert(
        "Analysis failed"
      );

      setLoading(false);

    }

  };

  // ================= EXPORT EXCEL =================

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        results
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

  // ================= DATE FILTER =================

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

        {/* UPLOAD */}

        <div className="glass-card rounded-3xl p-8 mb-10">

          {/* MULTIPLE FILES */}

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

        {/* FILTERS */}

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

                    Candidate

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    ATS Score

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    Date

                  </th>

                  <th className="text-left py-4 text-slate-300">

                    Matched Skills

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

                      <td className="py-4">

                        <span className="neon-text text-xl font-bold">

                          {
                            item.ats_score
                          }%

                        </span>

                      </td>

                      <td className="py-4 text-slate-400">

                        {item.date}

                      </td>

                      <td className="py-4 text-slate-300">

                        {
                          item.matched_skills
                        }

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