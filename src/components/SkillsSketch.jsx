import React, { useMemo, useRef } from "react";
import Sketch from "react-p5";

const goTo = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function SkillsSketch() {
  // Nodes → keep your labels/icons/targets so clicks still navigate
  const nodes = useMemo(
    () => [
      { label: "Web Design", id: "projects", icon: "🎨" },
      { label: "Web Dev", id: "projects", icon: "🧩" },
      { label: "App Dev", id: "projects", icon: "📱" },
      { label: "Robotics", id: "skills", icon: "🤖" },
      { label: "Contact", id: "contact", icon: "✉️" },
    ],
    []
  );

  // Physics state
  const ptsRef = useRef([]); // {x,y,vx,vy,r,m}
  const hoveredRef = useRef(-1);
  const draggingRef = useRef({ i: -1, dx: 0, dy: 0, moved: false });

  // Helpers
  const isDark = () => document.documentElement.classList.contains("dark");

  const setup = (p5, parent) => {
    const c = p5.createCanvas(parent.clientWidth, 220);
    c.parent(parent);
    p5.noStroke();

    // initial layout: spaced horizontally with slight jitter
    ptsRef.current = nodes.map((_, i) => ({
      x: (i + 1) * (p5.width / (nodes.length + 1)) + p5.random(-6, 6),
      y: p5.height / 2 + (i % 2 === 0 ? -28 : 28) + p5.random(-6, 6),
      vx: p5.random(-0.2, 0.2),
      vy: p5.random(-0.2, 0.2),
      r: 32,
      m: 1,
    }));
  };

  const windowResized = (p5) => {
    const parent = p5._userNode?.parentElement || p5.canvas.parentElement;
    if (!parent) return;
    p5.resizeCanvas(parent.clientWidth, 220);
  };

  const draw = (p5) => {
    p5.clear();
    p5.background(0, 0);
    hoveredRef.current = -1;

    // colors that respond to site theme
    const dark = isDark();
    const ringCol = dark ? p5.color(255, 255, 255, 28) : p5.color(0, 0, 0, 22);
    const nodeBG = dark ? p5.color(11, 17, 32) : p5.color(255, 255, 255);
    const textCol = dark ? p5.color(240) : p5.color(30);
    const linkCol = dark
      ? p5.color(255, 255, 255, 160)
      : p5.color(80, 90, 120, 160);
    const lineCol = dark
      ? p5.color(255, 255, 255, 30)
      : p5.color(60, 70, 120, 60);
    const glowCol = p5.color(99, 102, 241, 90); // indigo-ish

    // ---- Physics parameters (tuned for snappy, stable motion) ----
    const kSpringEdge = 0.04; // neighbor spring stiffness
    const restEdge = 180; // neighbor rest length
    const kSpringCtr = 0.02; // spring to center
    const restCtr = 120; // center rest radius
    const kRep = 11000; // Coulomb-like repulsion
    const damping = 0.9; // velocity damping per frame
    const dt = 1; // integration step (frame-based)

    const cx = p5.width / 2;
    const cy = p5.height / 2;

    // Accumulate forces
    const F = ptsRef.current.map(() => ({ x: 0, y: 0 }));

    // Center springs (each node to a circle around center)
    for (let i = 0; i < ptsRef.current.length; i++) {
      const p = ptsRef.current[i];
      const dx = p.x - cx;
      const dy = p.y - cy;
      const d = Math.max(0.0001, Math.hypot(dx, dy));
      const dirx = dx / d,
        diry = dy / d;
      const fmag = -kSpringCtr * (d - restCtr);
      F[i].x += fmag * dirx;
      F[i].y += fmag * diry;
    }

    // Edge springs (connect each node to its two neighbors in ring)
    for (let i = 0; i < ptsRef.current.length; i++) {
      const j = (i + 1) % ptsRef.current.length;
      const a = ptsRef.current[i],
        b = ptsRef.current[j];
      const dx = b.x - a.x,
        dy = b.y - a.y;
      const d = Math.max(0.0001, Math.hypot(dx, dy));
      const dirx = dx / d,
        diry = dy / d;
      const fmag = kSpringEdge * (d - restEdge);
      // a -> b
      F[i].x += fmag * dirx;
      F[i].y += fmag * diry;
      F[j].x += -fmag * dirx;
      F[j].y += -fmag * diry;
    }

    // Repulsion between all pairs
    for (let i = 0; i < ptsRef.current.length; i++) {
      for (let j = i + 1; j < ptsRef.current.length; j++) {
        const a = ptsRef.current[i],
          b = ptsRef.current[j];
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const d2 = Math.max(36, dx * dx + dy * dy); // clamp to avoid blow-ups
        const d = Math.sqrt(d2);
        const dirx = dx / d,
          diry = dy / d;
        const fmag = kRep / d2; // 1/r^2
        // push apart
        F[i].x -= fmag * dirx;
        F[i].y -= fmag * diry;
        F[j].x += fmag * dirx;
        F[j].y += fmag * diry;
      }
    }

    // Mouse drag → override position (acts like grabbing with a “constraint”)
    const drag = draggingRef.current;
    if (drag.i >= 0) {
      const p = ptsRef.current[drag.i];
      p.x = p5.mouseX + drag.dx;
      p.y = p5.mouseY + drag.dy;
      p.vx = 0;
      p.vy = 0;
      // zero out forces on dragged body (so it stays under the cursor)
      F[drag.i].x = 0;
      F[drag.i].y = 0;
    }

    // Integrate motion + wall bounce
    for (let i = 0; i < ptsRef.current.length; i++) {
      const p = ptsRef.current[i];
      // a = F/m
      const ax = F[i].x / p.m;
      const ay = F[i].y / p.m;
      p.vx = (p.vx + ax * dt) * damping;
      p.vy = (p.vy + ay * dt) * damping;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // keep inside canvas
      if (p.x < p.r) {
        p.x = p.r;
        p.vx *= -0.7;
      }
      if (p.x > p5.width - p.r) {
        p.x = p5.width - p.r;
        p.vx *= -0.7;
      }
      if (p.y < p.r) {
        p.y = p.r;
        p.vy *= -0.7;
      }
      if (p.y > p5.height - p.r) {
        p.y = p5.height - p.r;
        p.vy *= -0.7;
      }
    }

    // Connection lines (show springs to neighbors)
    p5.push();
    p5.stroke(lineCol);
    p5.strokeWeight(1);
    for (let i = 0; i < ptsRef.current.length; i++) {
      const j = (i + 1) % ptsRef.current.length;
      const a = ptsRef.current[i],
        b = ptsRef.current[j];
      p5.line(a.x, a.y, b.x, b.y);
    }
    p5.pop();

    // Draw nodes
    ptsRef.current.forEach((p, i) => {
      const hovering = p5.dist(p5.mouseX, p5.mouseY, p.x, p.y) < p.r + 6;
      if (hovering) hoveredRef.current = i;

      // outer glow ring
      p5.noStroke();
      p5.fill(glowCol);
      p5.circle(p.x, p.y, (hovering ? p.r + 20 : p.r + 14) * 2);

      // node body
      p5.fill(nodeBG);
      p5.circle(p.x, p.y, p.r * 2);

      // subtle ring
      p5.noFill();
      p5.stroke(ringCol);
      p5.strokeWeight(2);
      p5.circle(p.x, p.y, p.r * 2 + 2);

      // icon + label
      p5.noStroke();
      p5.fill(textCol);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(14);
      p5.text(nodes[i].icon, p.x, p.y - 2);
      p5.fill(linkCol);
      p5.textSize(12);
      p5.text(nodes[i].label, p.x, p.y + 18);
    });

    // corner hint
    p5.noStroke();
    p5.fill(linkCol);
    p5.textAlign(p5.RIGHT, p5.BOTTOM);
    p5.textSize(11);
    p5.text("Drag nodes • Click to jump", p5.width - 8, p5.height - 6);
  };

  const mousePressed = (p5) => {
    // start drag if near a node
    for (let i = 0; i < ptsRef.current.length; i++) {
      const p = ptsRef.current[i];
      if (p5.dist(p5.mouseX, p5.mouseY, p.x, p.y) < p.r + 10) {
        draggingRef.current = {
          i,
          dx: p.x - p5.mouseX,
          dy: p.y - p5.mouseY,
          moved: false,
        };
        return;
      }
    }
  };

  const mouseDragged = (p5) => {
    if (draggingRef.current.i >= 0) draggingRef.current.moved = true;
  };

  const mouseReleased = () => {
    const drag = draggingRef.current;
    if (drag.i >= 0 && !drag.moved) {
      // treat as click if it didn't move → navigate
      const node = nodes[drag.i];
      goTo(node.id);
    }
    draggingRef.current = { i: -1, dx: 0, dy: 0, moved: false };
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-2 dark:border-white/10 dark:bg-[#0b1120] transition-colors duration-500">
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
    </div>
  );
}
