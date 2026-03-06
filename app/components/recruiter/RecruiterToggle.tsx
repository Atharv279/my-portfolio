"use client";

import { useSyncExternalStore, useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import RecruiterOverlay from "./RecruiterOverlay";

const STORAGE_KEY = "portfolio-recruiter-mode";
const DISMISSED_KEY = "portfolio-recruiter-hint-dismissed";

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
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED_KEY) === "true") return;
    } catch {
      return;
    }

    const timer = setTimeout(() => setShowHint(true), 2000);
    const autoHide = setTimeout(() => setShowHint(false), 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoHide);
    };
  }, []);

  const toggle = useCallback(() => {
    setStored(!getSnapshot());
    setShowHint(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // localStorage unavailable
    }
  }, []);

  return (
    <>
      {/* Toggle button */}
      <div className="fixed top-2 right-2 z-[39] sm:top-6 sm:right-6">
        <button
          data-recruiter-toggle
          onClick={toggle}
          className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold backdrop-blur-xl transition-all ${
            isActive
              ? "border-violet-500/40 bg-violet-500/20 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
              : "border-emerald-500/30 bg-black/70 text-zinc-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40 md:hover:border-emerald-500/50 md:hover:text-white"
          }`}
        >
          <Briefcase className="h-5 w-5" />
          <span>Recruiter</span>
        </button>

        {/* Notification hint bubble */}
        <AnimatePresence>
          {showHint && !isActive && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full right-0 mt-2 w-[200px] sm:w-[220px]"
            >
              <div className="animate-pulse rounded-xl border border-violet-500/20 bg-black/80 px-3 py-2.5 text-[11px] leading-relaxed text-zinc-300 shadow-lg shadow-violet-500/5 backdrop-blur-xl">
                <span className="font-medium text-violet-300">Are you a recruiter?</span>{" "}
                Click here for a quick review.
                {/* Arrow pointing up */}
                <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-t border-l border-violet-500/20 bg-black/80" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isActive && <RecruiterOverlay onClose={toggle} />}
      </AnimatePresence>
    </>
  );
}
