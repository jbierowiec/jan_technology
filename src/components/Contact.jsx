import React, { useState, useEffect } from "react";
import Section from "../ui/Section.jsx";
import Button from "../ui/Button.jsx";
import { Linkedin, Send, Clock, CheckCircle2, Sparkles } from "lucide-react";

// === Add your Apps Script Web App URL in .env as VITE_SHEETS_ENDPOINT ===
const SHEETS_ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT;

// fire-and-forget save to Google Sheets (Apps Script)
async function saveToSheet({ name, email, message }) {
  try {
    const res = await fetch(SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids strict CORS preflight
      body: JSON.stringify({
        name,
        email,
        message,
        source: "contact_form",
      }),
    });
    if (!res.ok) throw new Error("Network error");
    return true;
  } catch (err) {
    console.error("Save failed:", err);
    return false;
  }
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
  const [status, setStatus] = useState({ loading: false, ok: null }); // ok: true | false | null

  // Auto-clear success/fail message after 2 seconds
  useEffect(() => {
    if (status.ok !== null) {
      const timer = setTimeout(
        () => setStatus((s) => ({ ...s, ok: null })),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [status.ok]);

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
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const payload = {
              name: form.name.value,
              email: form.email.value,
              message: form.message.value,
            };

            setStatus({ loading: true, ok: null });
            const ok = await saveToSheet(payload);
            setStatus({ loading: false, ok });

            if (ok) form.reset();
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
              <Button disabled={status.loading}>
                <Send className="h-4 w-4" />{" "}
                {status.loading ? "Sending..." : "Send Email"}
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

            {/* Auto-disappearing alert */}
            {status.ok === true && (
              <p className="text-sm text-emerald-500">
                Message saved — I’ll get back to you soon!
              </p>
            )}
            {status.ok === false && (
              <p className="text-sm text-rose-500">
                Something went wrong saving your message. Please try again.
              </p>
            )}
          </div>
        </form>

        {/* Info / services card (unchanged) */}
        <div className="group relative rounded-[22px] border border-black/5 bg-white p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <Sparkles className="h-5 w-5 text-indigo-400" /> Hire me for
          </h3>

          <div className="mb-6 grid gap-2 text-slate-700 dark:text-white/80">
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              Scalable SaaS platforms with robust backends and maintainable APIs
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              App development — React, native wrappers, and PWAs focused on
              performance
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              Data visualization and analytics dashboards — turning complex data
              into insight
            </div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              Functional-first design — reliable systems where usability
              supports utility
            </div>
          </div>

          <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
            Capabilities
          </h4>
          <div className="mb-6 flex flex-wrap gap-2">
            <Chip>React</Chip>
            <Chip>Flask</Chip>
            <Chip>Stripe</Chip>
            <Chip>Auth</Chip>
            <Chip>PostgreSQL</Chip>
            <Chip>p5.js</Chip>
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
