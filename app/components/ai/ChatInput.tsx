"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask me anything..."
        disabled={disabled}
        className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-base sm:text-sm text-ink-secondary placeholder-zinc-600 outline-none transition-colors focus:border-white/[0.12] disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-ink-muted transition-colors md:hover:bg-white/[0.1] md:hover:text-ink-secondary disabled:opacity-30"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
