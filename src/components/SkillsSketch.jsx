import React, { useRef, useState } from "react";
import Sketch from "react-p5";

export default function SkillsSketch() {
  // Refs for simulation state
  const gridRef = useRef([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const cellSizeRef = useRef(14);
  const playingRef = useRef(true);
  const wrapEdgesRef = useRef(true);
  const stepMsRef = useRef(120);
  const lastStepRef = useRef(0);
  const drawingRef = useRef(null);

  // Help / legend visibility
  const [showHelp, setShowHelp] = useState(false);

  const isDark = () => document.documentElement.classList.contains("dark");

  const allocGrid = (cols, rows, fill = false) => {
    const g = new Array(rows);
    for (let r = 0; r < rows; r++) g[r] = new Array(cols).fill(fill);
    return g;
  };

  const randomize = (p5) => {
    const g = gridRef.current;
    for (let r = 0; r < rowsRef.current; r++) {
      for (let c = 0; c < colsRef.current; c++) {
        g[r][c] = p5.random() < 0.2;
      }
    }
  };

  const clearGrid = () => {
    const g = gridRef.current;
    for (let r = 0; r < rowsRef.current; r++) g[r].fill(false);
  };

  // add this helper
  const snapCanvasToCells = (p5, w, h) => {
    const cell = cellSizeRef.current;
    const cols = Math.max(5, Math.floor(w / cell));
    const rows = Math.max(5, Math.floor(h / cell));
    // resize canvas to exact multiples of cell size
    p5.resizeCanvas(cols * cell, rows * cell);
    return { cols, rows };
  };

  const resizeGridToCanvas = (p5, parent) => {
    const desiredH = 220; // your chosen visual height
    const { cols, rows } = snapCanvasToCells(p5, parent.clientWidth, desiredH);

    if (cols !== colsRef.current || rows !== rowsRef.current) {
      const next = allocGrid(cols, rows, false);
      const old = gridRef.current;
      for (let r = 0; r < Math.min(rows, rowsRef.current || 0); r++) {
        for (let c = 0; c < Math.min(cols, colsRef.current || 0); c++) {
          next[r][c] = old?.[r]?.[c] ?? false;
        }
      }
      gridRef.current = next;
      colsRef.current = cols;
      rowsRef.current = rows;
    }
  };

  const setup = (p5, parent) => {
    // make initial canvas, then immediately snap to cell multiples
    p5.createCanvas(parent.clientWidth, 220).parent(parent);
    p5.noStroke();

    const { cols, rows } = snapCanvasToCells(p5, parent.clientWidth, 220);
    colsRef.current = cols;
    rowsRef.current = rows;

    gridRef.current = allocGrid(colsRef.current, rowsRef.current, false);
    randomize(p5);
    lastStepRef.current = 0;
  };

  const windowResized = (p5) => {
    const parent = p5.canvas.parentElement;
    if (parent) resizeGridToCanvas(p5, parent);
  };

  const step = (p5) => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const wrap = wrapEdgesRef.current;
    const g = gridRef.current;
    const next = allocGrid(cols, rows, false);

    const get = (r, c) => {
      if (wrap) {
        const rr = (r + rows) % rows;
        const cc = (c + cols) % cols;
        return g[rr][cc];
      }
      if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
      return g[r][c];
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let n = 0;
        n += get(r - 1, c - 1) ? 1 : 0;
        n += get(r - 1, c) ? 1 : 0;
        n += get(r - 1, c + 1) ? 1 : 0;
        n += get(r, c - 1) ? 1 : 0;
        n += get(r, c + 1) ? 1 : 0;
        n += get(r + 1, c - 1) ? 1 : 0;
        n += get(r + 1, c) ? 1 : 0;
        n += get(r + 1, c + 1) ? 1 : 0;

        const alive = g[r][c];
        next[r][c] = alive ? n === 2 || n === 3 : n === 3;
      }
    }
    gridRef.current = next;
  };

  const draw = (p5) => {
    const dark = isDark();
    const bg = dark ? p5.color(11, 17, 32) : p5.color(255, 255, 255);
    const gridCol = dark ? p5.color(255, 255, 255, 22) : p5.color(0, 0, 0, 28);
    const aliveCol = dark ? p5.color(99, 102, 241) : p5.color(79, 70, 229);

    p5.clear();
    p5.background(bg);

    // time-stepping
    if (playingRef.current) {
      const now = p5.millis();
      if (now - lastStepRef.current >= stepMsRef.current) {
        step(p5);
        lastStepRef.current = now;
      }
    }

    // draw cells
    const cell = cellSizeRef.current;
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const g = gridRef.current;

    p5.noStroke();
    p5.fill(aliveCol);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (g[r][c]) p5.rect(c * cell, r * cell, cell, cell);
      }
    }

    // grid lines
    p5.stroke(gridCol);
    p5.strokeWeight(1);

    // vertical lines
    for (let x = 0; x <= cols; x++) {
      const xPos = Math.round(x * cell) + 0.5; // snap to pixel centers
      p5.line(xPos, 0, xPos, rows * cell);
    }

    // horizontal lines
    for (let y = 0; y <= rows; y++) {
      const yPos = Math.round(y * cell) + 0.5;
      p5.line(0, yPos, cols * cell, yPos);
    }

    // ensure border closure
    p5.noFill();
    p5.rect(0.5, 0.5, cols * cell - 1, rows * cell - 1);
  };

  const toggleCellAtMouse = (p5) => {
    const cell = cellSizeRef.current;
    const c = Math.floor(p5.mouseX / cell);
    const r = Math.floor(p5.mouseY / cell);
    if (r < 0 || c < 0 || r >= rowsRef.current || c >= colsRef.current) return;
    const g = gridRef.current;

    if (drawingRef.current === null) {
      drawingRef.current = !g[r][c];
    }
    g[r][c] = drawingRef.current;
  };

  const mousePressed = (p5) => toggleCellAtMouse(p5);
  const mouseDragged = (p5) => toggleCellAtMouse(p5);
  const mouseReleased = () => (drawingRef.current = null);

  const keyPressed = (p5) => {
    if (p5.key === "p" || p5.key === "P") {
      playingRef.current = !playingRef.current;
    } else if (p5.key === "r" || p5.key === "R") {
      randomize(p5);
    } else if (p5.key === "c" || p5.key === "C") {
      clearGrid();
    } else if (p5.key === "+" || p5.key === "=") {
      stepMsRef.current = Math.max(20, stepMsRef.current - 20);
    } else if (p5.key === "-" || p5.key === "_") {
      stepMsRef.current = Math.min(1000, stepMsRef.current + 40);
    } else if (p5.key === "w" || p5.key === "W") {
      wrapEdgesRef.current = !wrapEdgesRef.current;
    }
  };

  return (
    <div className="relative rounded-3xl border border-black/10 bg-white p-2 dark:border-white/10 dark:bg-[#0b1120] transition-colors duration-500">
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
        keyPressed={keyPressed}
      />

      {/* Floating Help Panel */}
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-end">
        {/* Button and box — left-to-right layout */}
        <div className="flex items-end gap-2 transition-all duration-300">
          {/* Toggle button (bottom-right, on the left of box) */}
          <button
            onClick={() => setShowHelp((v) => !v)}
            className={`pointer-events-auto flex items-center justify-center 
                  h-9 w-9 rounded-xl border border-black/10 bg-white/80 backdrop-blur shadow-md
                  text-lg font-semibold text-slate-700 hover:bg-white 
                  dark:border-white/10 dark:bg-slate-900/70 dark:text-white/80 dark:hover:bg-slate-900 
                  transition-all duration-300
                  ${showHelp ? "translate-x-[4px]" : "translate-x-0"}`}
            aria-label={showHelp ? "Hide controls" : "Show controls"}
            title={showHelp ? "Hide controls" : "Show controls"}
          >
            ?
          </button>

          {/* Help panel (to the right of the question mark) */}
          {showHelp && (
            <div
              className="pointer-events-auto max-w-[520px] rounded-2xl border border-black/10 bg-white/95 p-3 text-xs 
                   shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/85 transition-all duration-300"
              role="region"
              aria-label="Game controls"
            >
              <div className="mb-1 text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Game of Life — Controls
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-700 dark:text-slate-200">
                <li>
                  <K>Click/Drag</K> draw / erase
                </li>
                <li>
                  <K>P</K> play / pause
                </li>
                <li>
                  <K>R</K> randomize
                </li>
                <li>
                  <K>C</K> clear
                </li>
                <li>
                  <K>+</K> / <K>-</K> change speed
                </li>
                <li>
                  <K>W</K> toggle wrap edges
                </li>
              </ul>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                {playingRef.current ? "Running" : "Paused"} • step{" "}
                {stepMsRef.current}ms
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Small inline "kbd" chip component */
function K({ children }) {
  return (
    <kbd
      className="rounded-md border px-1.5 py-[1px] text-[11px] leading-5
                    border-black/20 bg-white/70 text-slate-800
                    dark:border-white/20 dark:bg-slate-800/70 dark:text-slate-100"
    >
      {children}
    </kbd>
  );
}
