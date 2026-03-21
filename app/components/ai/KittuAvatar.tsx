"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KittuAvatarProps {
  isChatOpen: boolean;
  onOpenChat: () => void;
  onQuickAction: (action: string) => void;
}

export function KittuAvatar({
  isChatOpen,
  onOpenChat,
  onQuickAction,
}: KittuAvatarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Appear 3 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show greeting bubble 1s after avatar appears
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setShowGreeting(true), 1000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Hide when chat is open
  if (isChatOpen || !isVisible || dismissed) return null;

  const handleRobotClick = () => {
    setShowActions((prev) => !prev);
  };

  const handleAction = (action: string) => {
    setShowGreeting(false);
    setShowActions(false);
    setDismissed(true);
    onQuickAction(action);
  };

  const handleDismiss = () => {
    setShowGreeting(false);
    setShowActions(false);
    setDismissed(true);
    onOpenChat();
  };

  return (
    <div className="fixed bottom-4 right-3 z-[39] sm:bottom-24 sm:right-6">
      <AnimatePresence>
        {/* Greeting bubble */}
        {showGreeting && !showActions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[min(240px,70vw)] sm:w-[260px] rounded-xl border border-white/[0.1] bg-black/85 p-3 backdrop-blur-xl"
          >
            <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-white/[0.1] bg-black/85" />
            <p className="text-[12px] leading-relaxed text-zinc-300">
              Hi! I&apos;m <span className="font-semibold text-violet-400">Kittu</span> 👋
              I can guide you through Atharv&apos;s AI systems.
            </p>
            <button
              onClick={handleRobotClick}
              className="mt-2 text-[11px] font-medium text-violet-400 transition-colors md:hover:text-violet-300"
            >
              Want a quick tour?
            </button>
          </motion.div>
        )}

        {/* Action buttons */}
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 right-0 w-[min(200px,65vw)] sm:w-[200px] rounded-xl border border-white/[0.1] bg-black/85 p-2 backdrop-blur-xl"
          >
            <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-white/[0.1] bg-black/85" />
            {[
              { label: "Show Projects", action: "Show projects" },
              { label: "Show AI Systems", action: "Show AI systems" },
              { label: "Show Skills", action: "What technologies does Atharv use?" },
              { label: "Full Tour", action: "tour" },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={() => handleAction(action)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-zinc-300 transition-colors md:hover:bg-white/[0.06] md:hover:text-zinc-100 active:bg-white/[0.06]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500/60" />
                {label}
              </button>
            ))}
            <div className="mt-1 border-t border-white/[0.06] pt-1">
              <button
                onClick={handleDismiss}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] text-zinc-500 transition-colors md:hover:bg-white/[0.06] md:hover:text-zinc-400 active:bg-white/[0.06]"
              >
                Just open chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kittu robot */}
      <motion.button
        onClick={handleRobotClick}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex h-12 w-12 items-center justify-center"
        aria-label="Kittu AI assistant"
      >
        {/* Ground shadow */}
        <motion.div
          animate={{ scaleX: [0.7, 0.5, 0.7], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-7 rounded-full bg-violet-500/30 blur-[2px]"
        />

        {/* Robot body — jumps up and down */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="40"
            height="44"
            viewBox="0 0 40 44"
            fill="none"
            className="drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]"
          >
            {/* Antenna */}
            <line x1="20" y1="4" x2="20" y2="10" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="3" r="2.5" fill="#c4b5fd">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Head */}
            <rect x="8" y="10" width="24" height="16" rx="5" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.2" />

            {/* Eyes */}
            <circle cx="14.5" cy="18" r="2.5" fill="#c4b5fd" />
            <circle cx="25.5" cy="18" r="2.5" fill="#c4b5fd" />
            {/* Pupils — shift slightly */}
            <circle cx="15" cy="17.8" r="1" fill="#4c1d95" />
            <circle cx="26" cy="17.8" r="1" fill="#4c1d95" />

            {/* Mouth — small friendly smile */}
            <path d="M15.5 22.5 Q20 25 24.5 22.5" stroke="#a78bfa" strokeWidth="1" fill="none" strokeLinecap="round" />

            {/* Neck */}
            <rect x="17" y="26" width="6" height="3" rx="1" fill="#2e1065" />

            {/* Body */}
            <rect x="10" y="29" width="20" height="10" rx="4" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1" />

            {/* Chest light */}
            <circle cx="20" cy="34" r="2" fill="#a78bfa" opacity="0.7">
              <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Left arm */}
            <rect x="4" y="30" width="5" height="8" rx="2.5" fill="#2e1065" stroke="#7c3aed" strokeWidth="0.8" />

            {/* Right arm — waving */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 36 30;-20 36 30;0 36 30"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <rect x="31" y="30" width="5" height="8" rx="2.5" fill="#2e1065" stroke="#7c3aed" strokeWidth="0.8" />
            </g>

            {/* Feet */}
            <rect x="12" y="39" width="6" height="3" rx="1.5" fill="#2e1065" />
            <rect x="22" y="39" width="6" height="3" rx="1.5" fill="#2e1065" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
