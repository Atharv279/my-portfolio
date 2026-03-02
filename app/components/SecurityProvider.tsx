"use client";

import { useEffect, type ReactNode } from "react";

const OWNER = "Atharv Patil";
const WATERMARK = `\n© ${new Date().getFullYear()} ${OWNER} — All rights reserved.\nThis portfolio and its source code are the intellectual property of ${OWNER}.\nhttps://github.com/Atharv279\n`;

export default function SecurityProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // --- Right-click lock ---
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // --- Image drag lock ---
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // --- Keyboard shortcut interception ---
    const onKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
        e.preventDefault();
        return;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return;
      }
    };

    // --- DevTools deterrent (console clear + watermark) ---
    const devtoolsInterval = setInterval(() => {
      console.clear();
      console.log(
        `%c⚠ ${OWNER}'s Portfolio`,
        "color: #34d399; font-size: 16px; font-weight: bold; font-family: monospace;",
      );
      console.log(
        "%cYou're welcome to look around, but this code is authored and timestamped on GitHub.",
        "color: #a1a1aa; font-size: 12px; font-family: monospace;",
      );
      console.log(
        `%c${WATERMARK}`,
        "color: #52525b; font-size: 10px; font-family: monospace;",
      );
    }, 2000);

    // --- DOM watermark (hidden comment node) ---
    const watermarkComment = document.createComment(
      ` Property of ${OWNER} | github.com/Atharv279 | Unauthorized reproduction prohibited `,
    );
    document.documentElement.prepend(watermarkComment);

    // Bind listeners
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
      clearInterval(devtoolsInterval);
      watermarkComment.remove();
    };
  }, []);

  return <>{children}</>;
}
