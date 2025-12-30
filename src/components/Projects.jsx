import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import Section from "../ui/Section.jsx";
import { Filter, Globe } from "lucide-react";

const thumb = (name) => `${import.meta.env.BASE_URL}thumbs/${name}`;

const PROJECTS = [
  {
    id: "general-web-scraper",
    title: "General Web Scraper",
    tags: ["React", "CSS3", "Flask", "SQLite"],
    category: ["Web Development", "Automation"],
    links: { live: "https://general-web-scraper.up.railway.app" },
    thumb: thumb("general_web_scraper.png"),
  },
  {
    id: "interpolonia",
    title: "InterPolonia",
    tags: ["React", "CSS3", "Python"],
    category: ["Web Development"],
    links: { live: "https://interpolonia.org" },
    thumb: thumb("inter_polonia.png"),
  },
  {
    id: "polonia-cycling-club",
    title: "Polonia Cycling Club",
    tags: ["Typescript", "React", "CSS3", "SQLite"],
    category: ["Web Development"],
    links: { live: "https://poloniacyclingclub.up.railway.app" },
    thumb: thumb("polonia_cycling_club.png"),
  },
  {
    id: "probonopolonia",
    title: "Pro Bono Polonia",
    tags: ["React", "CSS3"],
    category: ["Web Development"],
    links: { live: "https://probonopolonia.com" },
    thumb: thumb("pro_bono_polonia.png"),
  },
  {
    id: "jans-math-blog",
    title: "Jan's Math Blog",
    tags: ["HTML5", "CSS3", "Nunjucks"],
    category: ["Web Development"],
    links: { live: "https://jans-math-blog.netlify.app" },
    thumb: thumb("jans_math_blog.png"),
  },
  {
    id: "mathematical-notation-app",
    title: "Mathematical Notation App",
    tags: ["React", "CSS3"],
    category: ["Web Development"],
    links: { live: "https://mathematical-notation.netlify.app" },
    thumb: thumb("mathematical_notation_app.png"),
  },
  {
    id: "evryquiktool",
    title: "evryquiktool",
    tags: ["HTML5", "Flask", "Bootstrap"],
    category: ["Web Development", "Automation"],
    links: { live: "https://evryquiktool.up.railway.app" },
    thumb: thumb("evryquiktool.png"),
  },
  {
    id: "e&m-simulation",
    title: "E&M Field Visualizer",
    tags: ["C++", "WASM", "HTML5"],
    category: ["Simulation"],
    links: {
      live: "https://jbierowiec.github.io/assets/html/EMFieldVisualizer.html",
    },
    thumb: thumb("e&m_simulation.png"),
  },
  /*
  {
    id: "mycyberlab",
    title: "MyCyberLab",
    tags: ["Flask", "Bootstrap", "SQL"],
    category: ["Web Development"],
    links: { live: "https://mycyberlab.up.railway.app" },
    thumb: thumb("MyCyberLab.png"),
  },
  */
  {
    id: "worksheet-ai",
    title: "Worksheet AI",
    tags: ["React", "CSS3", "Flask"],
    category: ["Web Development"],
    links: { live: "https://worksheet-ai.up.railway.app" },
    thumb: thumb("worksheet_ai.png"),
  },
  {
    id: "pocketbookapps",
    title: "PocketBookApps",
    tags: ["React", "Bootstrap"],
    category: ["Web Development"],
    links: { live: "https://www.pocketbookapps.com" },
    thumb: thumb("pocket_book_apps.png"),
  },
  /*
  {
    id: "biology-definitions",
    title: "Biology Definitions",
    tags: ["Swift", "XCode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/biology-definitions/id6740299638",
    },
    thumb: thumb("biology_definitions.png"),
  },
  */
  {
    id: "sudoku-game",
    title: "Sudoku Game",
    tags: ["HTML5", "CSS3", "JavaScript", "SQL"],
    category: ["Web Development", "Game Development"],
    links: { live: "https://sudokubros.up.railway.app" },
    thumb: thumb("sudoku_game.png"),
  },
  /*
  {
    id: "interpolonia",
    title: "Polonia Internationalis",
    tags: ["Swift", "Xcode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/polonia-internationalis/id6478061951",
    },
    thumb: thumb("inter_polonia.png"),
  },
  */
  /*
  {
    id: "mathematical-proofs",
    title: "Mathematical Proofs",
    tags: ["Swift", "XCode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/mathematical-proofs/id6463801334",
    },
    thumb: thumb("math_proofs.png"),
  },
  */
  {
    id: "physim",
    title: "Physim",
    tags: ["HTML5", "CSS3", "p5.js", "pyscript"],
    category: ["Web Development"],
    links: { live: "https://www.physim.org" },
    thumb: thumb("physim.png"),
  },

  // Future projects to add
  /*
  {
    id: "jz-tech",
    title: "JZ Tech",
    tags: ["React", "CSS3", "PsotgresQL"],
    category: ["Web Development"],
    links: { live: "https://www.jztech.biz" },
    thumb: thumb("jz_tech.png"),
  },
  */
  /*
    {
    id: "physics-concepts",
    title: "Physics Concepts",
    tags: ["Swift", "XCode"],
    category: ["App Development"],
    links: {
      live: "https://apps.apple.com/us/app/biology-definitions/id6740299638",
    },
    thumb: thumb("physics_concepts.png"),
  },
  */
];

const CATEGORIES = [
  "All",
  "Web Development",
  "App Development",
  "Game Development",
  "Automation",
  "Simulation",
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  // MULTI-CATEGORY FILTER
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
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Projects</h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-white/60">
              Past & Present
            </p>
          </div>

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
