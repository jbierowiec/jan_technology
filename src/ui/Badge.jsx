import React from "react";
export default function Badge({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs font-medium text-slate-800 backdrop-blur
                     dark:border-white/10 dark:bg-white/5 dark:text-white/90"
    >
      {children}
    </span>
  );
}
