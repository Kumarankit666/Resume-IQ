import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const onFile = (f) => { if (!f) return; setFile(f); };

  const onSubmit = () => {
    if (!file) { inputRef.current?.click(); return; }
    setLoading(true);
    setTimeout(() => { navigate("/result"); }, 1500);
  };

  return (
    <div className="relative min-h-screen" data-testid="upload-page">
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            <span className="text-white">Upload your </span>
            <span className="neon-text">resume</span>
          </h1>
          <p className="mt-4 text-slate-400">
            We'll score it against modern ATS systems and surface what to fix.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card-bright neon-border rounded-3xl p-8"
        >
          <div
            data-testid="dropzone"
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files?.[0]); }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-12 text-center ${
              drag ? "border-cyan-400 bg-cyan-400/5" : "border-white/15 hover:border-cyan-400/50"
            }`}
          >
            <input
              ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt"
              className="hidden" onChange={(e) => onFile(e.target.files?.[0])}
              data-testid="file-input"
            />
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              <UploadCloud className="w-7 h-7 text-white" />
            </div>
            {file ? (
              <div className="flex items-center justify-center gap-2 text-slate-200">
                <FileText className="w-4 h-4 text-cyan-300" />
                <span data-testid="filename">{file.name}</span>
                <span className="text-xs text-slate-500">({Math.round(file.size / 1024)} KB)</span>
              </div>
            ) : (
              <>
                <p className="text-white font-semibold">Drop your resume here</p>
                <p className="text-sm text-slate-400 mt-1">PDF, DOCX or TXT — max 10MB</p>
              </>
            )}
          </div>

          <button
            data-testid="analyze-btn" onClick={onSubmit} disabled={loading}
            className="mt-6 w-full btn-neon-gradient rounded-full px-6 py-4 text-sm sm:text-base font-semibold text-white inline-flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing with AI…</>
            ) : (
              <>Analyze Resume <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default UploadPage;