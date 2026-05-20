import React from "react";

import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Background from "./components/Background";

import Landing from "./pages/Landing";

import Upload from "./pages/Upload";

import Dashboard from "./pages/Dashboard";

import RecruiterDashboard from "./pages/RecruiterDashboard";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Profile from "./pages/Profile";

function App() {

  return (

    <div className="App">

      <Background />

      <BrowserRouter>

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Landing />}
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* INDIVIDUAL DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* RECRUITER DASHBOARD */}

          <Route
            path="/recruiter-dashboard"
            element={
              <RecruiterDashboard />
            }
          />

          {/* UPLOAD */}

          <Route
            path="/upload"
            element={<Upload />}
          />

        </Routes>

      </BrowserRouter>

    </div>

  );

}

export default App;