import React, { useEffect } from "react";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import Section from "./ui/Section.jsx";
import Skills from "./components/Skills.jsx";
import Hero from "./components/Hero.jsx";
import SkillsSketch from "./components/SkillsSketch.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <ThemeProvider>
      <div
        className="
    min-h-screen w-screen overflow-x-hidden transition-colors duration-500
    bg-white text-slate-900
    dark:bg-[#0b1120] dark:text-slate-100
  "
      >
        <Navbar />

        {/* Hero + p5 nodes */}
        <Section id="hero" className="relative">
          <Hero />
          <div className="mt-10">
            <SkillsSketch />
          </div>
        </Section>

        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
