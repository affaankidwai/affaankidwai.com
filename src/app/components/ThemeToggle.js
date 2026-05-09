"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const storageKey = "affaan-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(storageKey);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} suppressHydrationWarning>
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
