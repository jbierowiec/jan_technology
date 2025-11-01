import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import Section from "../ui/Section.jsx";
import { Filter, Globe } from "lucide-react";

const PROJECTS = [
  {
    id: "physim",
    title: "Physim - Physics Learning Platform",
    tags: ["HTML5", "CSS3", "p5.js", "pyscript"],
    category: ["Web Development"],
    links: { live: "https://www.physim.org" },
    thumb: "/public/thumbs/Physim.png",
  },
  {
    id: "sudoku-game",
    title: "Sudoku Game",
    tags: ["HTML5", "CSS3", "JavaScript", "SQL"],
    category: ["Web Development", "Game Development"], 
    links: { live: "https://sudokubros.up.railway.app" },
    thumb: "/public/thumbs/SudokuGame.png",
  },
  {
    id: "pocketbookapps",
    title: "PocketBookApps - Mobile Pocket Books for Learning",
    tags: ["React", "Bootstrap"],
    category: ["Web Development"],
    links: { live: "https://www.pocketbookapps.com" },
    thumb: "/public/thumbs/PocketBookApps.png",
  },
  {
    id: "mycyberlab",
    title: "MyCyberLab - Cybersecurity Learning Platform",
    tags: ["Flask", "Bootstrap", "SQL"],
    category: ["Web Development"],
    links: { live: "https://mycyberlab.up.railway.app" },
    thumb: "/public/thumbs/MyCyberLab.png",
  },
  {
    id: "evryquiktool",
    title: "evryquiktool - Digital Utility Toolbox",
    tags: ["HTML5", "Flask", "Bootstrap"],
    category: ["Web Development"],
    links: { live: "https://evryquiktool.up.railway.app" },
    thumb: "/public/thumbs/evryquiktool.png",
  },
  {
    id: "thepdfwebsite",
    title: "ThePDFWebsite - PDF Browser Render Clone",
    tags: ["HTML5", "CSS3"],
    category: ["Web Development"],
    links: { live: "https://thepdfwebsite.com" },
    thumb: "/public/thumbs/ThePDFWebsite.png",
  },
  {
    id: "micro-saas-landing-page",
    title: "Micro SaaS Landing Page",
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    category: ["Web Design"],
    links: { live: "https://jbierowiec.github.io/micro_saas_landing_page/" },
    thumb: "/public/thumbs/micro_saas_landing_page.png",
  },
  {
    id: "technology-landing-page",
    title: "Technology Landing Page",
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    category: ["Web Design"],
    links: { live: "https://jbierowiec.github.io/technology_landing_page/" },
    thumb: "/public/thumbs/technology_landing_page.png",
  },
  {
    id: "construction-landing-page",
    title: "Construction Landing Page",
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    category: ["Web Design"],
    links: { live: "https://jbierowiec.github.io/construction_landing_page/" },
    thumb: "/public/thumbs/construction_landing_page.png",
  },
  {
    id: "mathematical-proofs",
    title: "Mathematical Proofs",
    tags: ["Swift", "XCode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/mathematical-proofs/id6463801334",
    },
    thumb: "/public/thumbs/math_proofs.png",
  },
  {
    id: "biology-definitions",
    title: "Biology Definitions",
    tags: ["Swift", "XCode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/biology-definitions/id6740299638",
    },
    thumb: "/public/thumbs/biology_definitions.png",
  },
  {
    id: "polonia-internationalis",
    title: "Polonia Internationalis",
    tags: ["Swift", "Xcode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/polonia-internationalis/id6478061951",
    },
    thumb: "/public/thumbs/polonia_internationalis.png",
  },
  {
    id: "e&m-simulation",
    title: "E&M Field Visualizer",
    tags: ["C++", "WASM", "HTML"],
    category: ["Simulations"],
    links: {
      live: "https://jbierowiec.github.io/assets/html/EMFieldVisualizer.html",
    },
    thumb: "/public/thumbs/E&M_Simulation.png",
  },
];

const CATEGORIES = [
  "All",
  "Web Development",
  "Web Design",
  "App Development",
  "Game Development",
  "Simulations",
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  // ✅ MULTI-CATEGORY FILTER
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) =>
      filter === "All" ? true : (p.category || []).includes(filter)
    ).filter((p) => {
      const haystack = [p.title, p.blurb || "", (p.tags || []).join(" ")]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  return (
    <Section id="projects">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header + Filters */}
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
          <p className="max-w-2xl text-slate-700 dark:text-white/70 text-sm sm:text-base">
            Filter by domain and search. Cards include a preview, tags, and
            links.
          </p>

          {/* Filters (wrap nicely on mobile) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  filter === c
                    ? "bg-indigo-600 text-white shadow-sm scale-105"
                    : "text-slate-700 hover:bg-slate-200 dark:text-white/80 dark:hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-slate-300 bg-white/70 py-2 pl-9 pr-3 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder-white/50"
            />
          </div>
        </div>

        {/* Cards grid: 1 → 2 → 3 columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-2xl overflow-hidden p-5 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-[#0b1120] dark:border-white/10"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {p.title}
              </h3>
              {p.blurb && (
                <p className="text-sm text-slate-600 dark:text-white/70 mb-3">
                  {p.blurb}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Live
                </a>
                {p.links.code && (
                  <a
                    href={p.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 dark:text-white/70 hover:underline"
                  >
                    Code
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
