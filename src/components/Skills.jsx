import React from "react";
import { motion } from "framer-motion";
import Section from "../ui/Section.jsx";

/** ------------------ small UI bits ------------------ */
function SkillPanel({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="
        group relative rounded-[22px]
        border border-black/5 bg-white
        shadow-lg backdrop-blur-xl
        dark:border-white/10 dark:bg-[#0b1120]
        hover:shadow-xl hover:-translate-y-0.5
        transition duration-300 will-change-transform
      "
    >
      {/* soft inner gradient that brightens on hover */}
      <div
        className="
          absolute inset-0 rounded-[22px] pointer-events-none
          bg-gradient-to-br from-white/60 to-white/30
          dark:from-white/10 dark:to-white/[0.04]
          opacity-80 group-hover:opacity-100 transition
        "
      />
      {/* subtle glow ring on hover */}
      <div
        className="
          absolute inset-0 rounded-[22px] pointer-events-none
          ring-0 ring-indigo-400/0 group-hover:ring-8 group-hover:ring-indigo-400/10
          transition
        "
      />
      <div className="relative p-5 flex flex-col text-center">
        <h3 className="mb-3 text-[13px] font-semibold tracking-wide text-slate-800 dark:text-white/90">
          {title}
        </h3>
        {children}
      </div>
    </motion.div>
  );
}

function Logo({ src, alt }) {
  return (
    <div
      className="
        grid place-items-center h-20 w-20 rounded-xl
        border border-black/5 bg-white
        dark:border-white/10 dark:bg-[#0b1120]
        shadow-sm transition
        hover:shadow-md hover:-translate-y-0.5

        group/icon
      "
      title={alt}
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        className="
    h-14 w-14 object-contain
    opacity-90 saturate-100
    transition duration-300
    hover:opacity-100 hover:scale-110
  "
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** ------------------ main section ------------------ */
export default function Skills() {
  return (
    <Section id="skills">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Skills</h2>
        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-white/60">
          Technical
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {/* Web Development */}
        <SkillPanel title="Web Development" delay={0.02}>
          <div className="grid grid-cols-4 gap-3 justify-items-center items-center">
            <Logo
              alt="HTML5"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
            />
            <Logo
              alt="CSS3"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            />
            <Logo
              alt="JavaScript"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            />
            <Logo
              alt="TypeScript"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
            />
            <Logo
              alt="Bootstrap"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
            />
            <Logo
              alt="React"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            />
            <Logo
              alt="Vite"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
            />
            <Logo
              alt="Next.js"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
            />
            <Logo
              alt="Three.js"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"
            />
            <Logo
              alt="p5.js"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/p5js/p5js-original.svg"
            />
            <Logo
              alt="SQL"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
            />
            <Logo
              alt="PostgreSQL"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
            />
            <Logo
              alt="Flask"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg"
            />
            <Logo
              alt="Django"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg"
            />
            <Logo
              alt="pyscript"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pyscript/pyscript-original-wordmark.svg"
            />
            <Logo
              alt="AWS"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
            />
          </div>
        </SkillPanel>

        {/* Programming & Tools */}
        <SkillPanel title="Programming & Tools" delay={0.06}>
          <div className="grid grid-cols-4 gap-3 justify-items-center items-center">
            <Logo
              alt="Python"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
            />
            <Logo
              alt="C++"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
            />
            <Logo
              alt="LaTeX"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg"
            />
            <Logo
              alt="Node.js"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            />
            <Logo
              alt="NPM"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg"
            />
            <Logo
              alt="Jupyter"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg"
            />
            <Logo
              alt="OpenCV"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
            />
            <Logo
              alt="Tensorflow"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
            />
            <Logo
              alt="Matplotlib"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg"
            />
            <Logo
              alt="Anaconda"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg"
            />
            <Logo
              alt="OpenGL"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg"
            />
            <Logo
              alt="Docker"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
            />
            <Logo
              alt="Git"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
            />
            <Logo
              alt="GitHub"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            />
            <Logo
              alt="VS Code"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
            />
            <Logo
              alt="DataGrip"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/datagrip/datagrip-original.svg"
            />
          </div>
        </SkillPanel>

        {/* App Development */}
        <SkillPanel title="App Development" delay={0.1}>
          <div className="grid grid-cols-4 gap-3 justify-items-center items-center">
            <Logo
              alt="Swift"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"
            />
            <Logo
              alt="Flutter"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
            />
            <Logo
              alt="Xcode"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg"
            />
            <Logo
              alt="Android Studio"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg"
            />
          </div>
        </SkillPanel>

        {/* Graphic Design */}
        <SkillPanel title="Graphic Design" delay={0.14}>
          <div className="grid grid-cols-4 gap-3 justify-items-center items-center">
            <Logo
              alt="Figma"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
            />
            <Logo
              alt="Illustrator"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg"
            />
            <Logo
              alt="Photoshop"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"
            />
            <Logo
              alt="Canva"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"
            />
          </div>
        </SkillPanel>
      </div>
    </Section>
  );
}
