import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import { ArrowRight, Mail, Wrench } from "lucide-react";
import ThreeScene from "./ThreeScene.jsx";

const goTo = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-24 sm:pt-28 lg:pt-32 bg-white dark:bg-[#0b1120] transition-colors duration-500"
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 items-center gap-8 sm:gap-10 lg:gap-14 md:grid-cols-2">
          {/* Text column */}
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-3 font-extrabold leading-tight"
              style={{ fontSize: "clamp(2rem, 5.2vw, 3.75rem)" }}
            >
              Functional{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Engineer
              </span>{" "}
              & Builder
            </motion.h1>

            <p className="mb-6 max-w-prose text-sm sm:text-base lg:text-lg text-slate-700 dark:text-white/70">
              I design and ship working software—websites, apps, and robotics
              systems—prioritizing reliability and real-world utility.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Button onClick={() => goTo("projects")}>
                View Projects <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#skills" variant="secondary">
                <Wrench className="h-4 w-4" /> Skills
              </Button>
              <Button href="#contact" variant="ghost">
                <Mail className="h-4 w-4" /> Contact
              </Button>
            </div>
          </div>

          {/* 3D Scene column (stacks under text on mobile) */}
          <ThreeScene />
        </div>
      </div>
    </section>
  );
}
