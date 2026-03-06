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
          className={`flex origin-top-right scale-[0.85] items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur-xl transition-all sm:scale-100 ${
            isActive
              ? "border-violet-500/40 bg-violet-500/20 text-violet-300"
              : "border-white/[0.08] bg-black/60 text-zinc-500 hover:border-white/[0.15] hover:text-zinc-300"
          }`}
        >
          <Briefcase className="h-3 w-3" />
          <span className="hidden sm:inline">Recruiter</span>
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
