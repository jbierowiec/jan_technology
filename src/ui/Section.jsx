import React from "react";
export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`min-h-screen w-full py-20 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
