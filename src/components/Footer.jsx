import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-[#0b1120] transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Left section */}
        <div className="text-slate-600 dark:text-white/60">
          <p>
            © {new Date().getFullYear()} Jan Bierowiec. All rights reserved.
          </p>
        </div>

        {/* Middle section - navigation links */}
        <div className="flex gap-6 text-slate-600 dark:text-white/60">
          <a
            href="#hero"
            className="hover:text-black dark:hover:text-white transition"
          >
            Home
          </a>
          <a
            href="#skills"
            className="hover:text-black dark:hover:text-white transition"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hover:text-black dark:hover:text-white transition"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-black dark:hover:text-white transition"
          >
            Contact
          </a>
        </div>

        {/* Right section - social icons */}
        <div className="flex gap-5 text-slate-600 dark:text-white/60">
          <a
            href="https://github.com/jbierowiec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://linkedin.com/in/jan-bierowiec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
