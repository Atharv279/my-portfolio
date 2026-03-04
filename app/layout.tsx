import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GradientMesh } from "./components/ui";
import { SecurityProvider } from "./components/security";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
          <GradientMesh />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
