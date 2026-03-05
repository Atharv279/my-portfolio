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

  const handleOrbClick = () => {
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
            className="absolute bottom-14 right-0 w-[min(200px,70vw)] rounded-xl border border-white/[0.1] bg-black/85 p-3 backdrop-blur-xl sm:w-[260px]"
          >
            <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-white/[0.1] bg-black/85" />
            <p className="text-[11px] leading-relaxed text-zinc-300 sm:text-[12px]">
              Hi, I&apos;m <span className="font-semibold text-violet-400">Kittu</span>.
              I can guide you through Atharv&apos;s AI systems.
            </p>
            <button
              onClick={handleOrbClick}
              className="mt-2 text-[11px] font-medium text-violet-400 transition-colors hover:text-violet-300"
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
            className="absolute bottom-14 right-0 w-[min(200px,70vw)] rounded-xl border border-white/[0.1] bg-black/85 p-2 backdrop-blur-xl sm:w-[200px]"
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
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500/60" />
                {label}
              </button>
            ))}
            <div className="mt-1 border-t border-white/[0.06] pt-1">
              <button
                onClick={handleDismiss}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-400"
              >
                Just open chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kittu orb */}
      <motion.button
        onClick={handleOrbClick}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex h-10 w-10 items-center justify-center"
        aria-label="Kittu AI assistant"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-violet-500/20"
        />
        {/* Mid glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-1 rounded-full bg-violet-500/15"
        />
        {/* Core orb SVG */}
        <motion.div
          animate={{ y: [0, -3, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          >
            <defs>
              <radialGradient id="kittu-orb" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4c1d95" />
              </radialGradient>
              <radialGradient id="kittu-shine" cx="35%" cy="30%" r="40%">
                <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="14" cy="14" r="12" fill="url(#kittu-orb)" />
            <circle cx="14" cy="14" r="12" fill="url(#kittu-shine)" />
            {/* Inner light ring */}
            <circle
              cx="14"
              cy="14"
              r="10"
              fill="none"
              stroke="white"
              strokeOpacity="0.15"
              strokeWidth="0.5"
            />
            {/* Eye dots */}
            <circle cx="11" cy="13" r="1.2" fill="white" opacity="0.9" />
            <circle cx="17" cy="13" r="1.2" fill="white" opacity="0.9" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
