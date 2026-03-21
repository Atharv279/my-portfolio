import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { WebGLBackground } from "./components/canvas";
import { SecurityProvider } from "./components/security";
import { ChatWidget } from "./components/ai";
import RecruiterToggle from "./components/recruiter/RecruiterToggle";
import CommandPalette from "./components/navigation/CommandPalette";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atharv Patil — Python Developer & AI Engineer",
  description:
    "Portfolio of Atharv Patil. Python Developer & AI Engineer specializing in autonomous agents, RAG systems, and enterprise networking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SecurityProvider>
          <WebGLBackground />
          {children}
          <RecruiterToggle />
          <ChatWidget />
          <CommandPalette />
        </SecurityProvider>
      </body>
    </html>
  );
}
