import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Background from "./components/Background";
import Landing from "./pages/Landing";
import UploadPage from "./pages/Upload";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Background />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;