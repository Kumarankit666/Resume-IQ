import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="relative min-h-screen" data-testid="landing-page">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
};

export default Landing;