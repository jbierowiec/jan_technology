import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";

const ThemeCtx = createContext({ theme: "dark", setTheme: () => {} });
export const useTheme = () => useContext(ThemeCtx);

// Light between 06:00 and 18:00 local time, dark otherwise
function computeThemeByClock(d = new Date()) {
  const h = d.getHours();             // device-local hour (respects user’s timezone)
  return h >= 6 && h < 18 ? "light" : "dark";
}

// Milliseconds until the next flip (next 06:00 or 18:00)
function msUntilNextBoundary(now = new Date()) {
  const next = new Date(now);
  next.setSeconds(0, 0);

  const h = now.getHours();
  if (h < 6) {
    next.setHours(6, 0, 0, 0);
  } else if (h < 18) {
    next.setHours(18, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(6, 0, 0, 0);
  }
  return next - now;
}

export default function ThemeProvider({ children }) {
  // Initialize from the current clock
  const [theme, setTheme] = useState(() => computeThemeByClock());

  // Apply theme to <html> and color-scheme
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.style.colorScheme = theme;
  }, [theme]);

  // Auto-flip at the next boundary (06:00 or 18:00)
  useEffect(() => {
    const id = setTimeout(() => {
      setTheme(computeThemeByClock());
    }, msUntilNextBoundary());
    return () => clearTimeout(id);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
