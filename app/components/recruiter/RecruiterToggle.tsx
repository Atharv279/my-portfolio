"use client";

import { useSyncExternalStore, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Briefcase } from "lucide-react";
import RecruiterOverlay from "./RecruiterOverlay";

const STORAGE_KEY = "portfolio-recruiter-mode";

// Custom store for localStorage-backed boolean
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

function setStored(value: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // localStorage unavailable
  }
  listeners.forEach((cb) => cb());
}

export default function RecruiterToggle() {
  const isActive = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    setStored(!getSnapshot());
  }, []);

  return (
    <>
      {/* Toggle button */}
      <button
        data-recruiter-toggle
        onClick={toggle}
        className={`fixed top-2 right-2 z-[40] flex origin-top-right scale-[0.85] items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur-xl transition-all sm:top-6 sm:right-6 sm:scale-100 ${
          isActive
            ? "border-violet-500/40 bg-violet-500/20 text-violet-300"
            : "border-white/[0.08] bg-black/60 text-zinc-500 hover:border-white/[0.15] hover:text-zinc-300"
        }`}
      >
        <Briefcase className="h-3 w-3" />
        <span className="hidden sm:inline">Recruiter</span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isActive && <RecruiterOverlay onClose={toggle} />}
      </AnimatePresence>
    </>
  );
}
