import React from "react";
import Section from "../ui/Section.jsx";
import Button from "../ui/Button.jsx";
import {
  Mail,
  Linkedin,
  Send,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function sendMailto({ name, email, message }) {
  const subject = encodeURIComponent(`Inquiry from ${name || "a visitor"}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  window.location.href = `mailto:jan@example.com?subject=${subject}&body=${body}`;
}

function Chip({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-slate-700
                     dark:border-white/10 dark:bg-white/5 dark:text-white/80"
    >
      {children}
    </span>
  );
}

export default function Contact() {
  return (
    <Section id="contact">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Contact</h2>
        <p className="mt-1 text-[12px] uppercase tracking-[0.22em] text-slate-500 dark:text-white/60">
          Let’s build something functional
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {/* Form card */}
        <form
          className="group relative rounded-[22px] border border-black/5 bg-white p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            sendMailto({
              name: form.name.value,
              email: form.email.value,
              message: form.message.value,
            });
          }}
        >
          <div className="grid gap-4">
            <label className="text-sm text-slate-700 dark:text-white/80">
              Name
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-black/10 bg-white/90 px-3 py-2 outline-none
                           placeholder-slate-400 focus:ring-2 focus:ring-indigo-400
                           dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
                placeholder="Your name"
              />
            </label>

            <label className="text-sm text-slate-700 dark:text-white/80">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-black/10 bg-white/90 px-3 py-2 outline-none
                           placeholder-slate-400 focus:ring-2 focus:ring-indigo-400
                           dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
                placeholder="you@example.com"
              />
            </label>

            <label className="text-sm text-slate-700 dark:text-white/80">
              Message
              <textarea
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-xl border border-black/10 bg-white/90 px-3 py-2 outline-none
                           placeholder-slate-400 focus:ring-2 focus:ring-indigo-400
                           dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
                placeholder="Tell me about your project…"
              />
            </label>

            <div className="flex items-center gap-3 pt-1">
              <Button>
                <Send className="h-4 w-4" /> Send Email
              </Button>
              <a
                href="https://www.linkedin.com/in/jan-bierowiec/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10
                           dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </form>

        {/* Info / services card */}
        <div className="group relative rounded-[22px] border border-black/5 bg-white p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <Sparkles className="h-5 w-5 text-indigo-400" /> Hire me for
          </h3>

          <div className="mb-6 grid gap-2 text-slate-700 dark:text-white/80">
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              Functional websites with clean UX and strong tooling
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              App development: React + native wrappers or PWA
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              Functional data-driven interfaces and visualization dashboards
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              Analytics and interactive charts for performance, progress, or
              spatial data
            </div>
          </div>

          <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
            Capabilities
          </h4>
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip>Three.js</Chip>
            <Chip>p5.js</Chip>
            <Chip>Stripe</Chip>
            <Chip>Auth</Chip>
            <Chip>Performant SPA</Chip>
          </div>

          <div
            className="rounded-2xl border border-black/10 bg-black/5 p-4 text-sm text-slate-700
                          dark:border-white/10 dark:bg-white/5 dark:text-white/80"
          >
            <p className="mb-1 flex items-center gap-2">
              <Clock className="h-4 w-4" /> Typical response:{" "}
              <span className="font-medium">within 24 hours</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Available
              for contract & freelance
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
