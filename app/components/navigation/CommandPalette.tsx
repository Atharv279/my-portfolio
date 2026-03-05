"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderOpen,
  Radar,
  Award,
  Clock,
  Cpu,
  MessageSquare,
  Play,
  UserCheck,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  }, []);

  const commands: Command[] = [
    {
      id: "projects",
      label: "Show Projects",
      description: "Scroll to flagship projects",
      icon: <FolderOpen className="h-4 w-4" />,
      action: () => scrollToSection("projects"),
    },
    {
      id: "skills",
      label: "Show Skills",
      description: "Scroll to skill radar chart",
      icon: <Radar className="h-4 w-4" />,
      action: () => scrollToSection("skills"),
    },
    {
      id: "certifications",
      label: "Show Certifications",
      description: "Scroll to certifications",
      icon: <Award className="h-4 w-4" />,
      action: () => scrollToSection("certifications"),
    },
    {
      id: "ai-systems",
      label: "Show AI Systems",
      description: "Scroll to system architecture map",
      icon: <Cpu className="h-4 w-4" />,
      action: () => scrollToSection("hero-identity"),
    },
    {
      id: "timeline",
      label: "Show Timeline",
      description: "Scroll to career evolution",
      icon: <Clock className="h-4 w-4" />,
      action: () => scrollToSection("timeline"),
    },
    {
      id: "recruiter",
      label: "Open Recruiter Mode",
      description: "Toggle recruiter quick view",
      icon: <UserCheck className="h-4 w-4" />,
      action: () => {
        const btn = document.querySelector<HTMLButtonElement>(
          "[data-recruiter-toggle]"
        );
        btn?.click();
      },
    },
    {
      id: "chat",
      label: "Open Chat",
      description: "Open AI assistant chat",
      icon: <MessageSquare className="h-4 w-4" />,
      action: () => {
        const btn = document.querySelector<HTMLButtonElement>(
          "[data-chat-toggle]"
        );
        btn?.click();
      },
    },
    {
      id: "tour",
      label: "Start Guided Tour",
      description: "60-second AI systems walkthrough",
      icon: <Play className="h-4 w-4" />,
      action: () => {
        // Open chat first, then click tour button
        const chatBtn = document.querySelector<HTMLButtonElement>(
          "[data-chat-toggle]"
        );
        chatBtn?.click();
        setTimeout(() => {
          const tourBtn = document.querySelector<HTMLButtonElement>(
            "[data-tour-trigger]"
          );
          tourBtn?.click();
        }, 300);
      },
    },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const executeCommand = useCallback(
    (cmd: Command) => {
      setIsOpen(false);
      setQuery("");
      setSelectedIndex(0);
      // Delay action slightly to let the palette close
      requestAnimationFrame(() => cmd.action());
    },
    []
  );

  // Keyboard shortcut: CMD/CTRL + K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        executeCommand(filtered[selectedIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, executeCommand]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-[90vw] max-w-[480px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-950/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent font-mono text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
              />
              <kbd className="hidden rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline-block">
                ESC
              </kbd>
            </div>

            {/* Command list */}
            <div className="max-h-[320px] overflow-y-auto py-1">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-[13px] text-zinc-600">
                  No commands found
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === selectedIndex
                      ? "bg-violet-500/10 text-violet-300"
                      : "text-zinc-400 hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={
                      i === selectedIndex ? "text-violet-400" : "text-zinc-600"
                    }
                  >
                    {cmd.icon}
                  </span>
                  <div className="flex-1">
                    <span className="text-[13px] font-medium">{cmd.label}</span>
                    <span className="ml-2 text-[11px] text-zinc-600">
                      {cmd.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-2">
              <span className="text-[10px] text-zinc-600">
                <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-0.5 font-mono">
                  ↑↓
                </kbd>{" "}
                navigate
              </span>
              <span className="text-[10px] text-zinc-600">
                <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-0.5 font-mono">
                  ↵
                </kbd>{" "}
                select
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
