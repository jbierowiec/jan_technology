import React from "react";

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition hover:shadow md:text-base";
  const styles =
    variant === "ghost"
      ? "bg-black/5 text-slate-900 hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
      : variant === "secondary"
      ? "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
      : "bg-indigo-600 text-white hover:bg-indigo-500";
  const props = { onClick, className: `${base} ${styles} ${className}` };
  return href ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <button {...props}>{children}</button>
  );
}
