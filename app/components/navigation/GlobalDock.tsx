"use client";

import React from "react";
import { Home, Github, Linkedin, Mail } from "lucide-react";
import { Dock, DockIcon } from "../magicui/dock";
import Link from "next/link";

export default function GlobalDock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <Dock
        className="border-hairline bg-surface/80 backdrop-blur-md"
        iconSize={40}
        iconMagnification={60}
        iconDistance={140}
      >
        <DockIcon>
          <Link href="/" aria-label="Home" className="flex h-full w-full items-center justify-center">
            <Home className="h-6 w-6 text-ink-secondary transition-colors hover:text-ink" />
          </Link>
        </DockIcon>
        <DockIcon>
          <a
            href="https://github.com/Atharv279"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-full w-full items-center justify-center"
          >
            <Github className="h-6 w-6 text-ink-secondary transition-colors hover:text-ink" />
          </a>
        </DockIcon>
        <DockIcon>
          <a
            href="https://www.linkedin.com/in/atharv-patil-bab53a284"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-full w-full items-center justify-center"
          >
            <Linkedin className="h-6 w-6 text-ink-secondary transition-colors hover:text-ink" />
          </a>
        </DockIcon>
        <DockIcon>
          <a
            href="mailto:atharvpatil279@gmail.com"
            aria-label="Email"
            className="flex h-full w-full items-center justify-center"
          >
            <Mail className="h-6 w-6 text-ink-secondary transition-colors hover:text-ink" />
          </a>
        </DockIcon>
      </Dock>
    </div>
  );
}
