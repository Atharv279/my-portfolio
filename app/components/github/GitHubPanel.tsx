"use client";

import { useState, useEffect } from "react";
import { Github, Star, ExternalLink } from "lucide-react";
import ContributionHeatmap from "./ContributionHeatmap";

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
}

interface Language {
  name: string;
  percentage: number;
}

interface GitHubData {
  profile: {
    login: string;
    avatarUrl: string;
    publicRepos: number;
    followers: number;
    bio: string | null;
  };
  repos: Repo[];
  languages: Language[];
  contributions?: number[][];
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89E051",
  Rust: "#DEA584",
};

// Fallback data if API fails
const fallbackData: GitHubData = {
  profile: {
    login: "Atharv279",
    avatarUrl: "",
    publicRepos: 23,
    followers: 1,
    bio: "Python Developer & AI Engineer",
  },
  repos: [
    { name: "ai-research-agent", description: "Automated AI research agent — searches GitHub daily for new AI repos", language: "Python", stars: 0, url: "https://github.com/Atharv279/ai-research-agent" },
    { name: "RAGify-Finance", description: "Benchmarks Cohere vs HuggingFace for financial document Q&A", language: "Python", stars: 1, url: "https://github.com/Atharv279/RAGify-Finance" },
    { name: "daily-experiments", description: "Automated NIST NVD security scanner with threat dashboards", language: "Python", stars: 0, url: "https://github.com/Atharv279/daily-experiments" },
    { name: "automated-bots", description: "Algorithmic market signal generator with technical analysis", language: "Python", stars: 0, url: "https://github.com/Atharv279/automated-bots" },
    { name: "AI_Invoice_Master", description: "Multi-language invoice extractor with OCR + Gemini AI", language: "Python", stars: 1, url: "https://github.com/Atharv279/AI_Invoice_Master" },
    { name: "CNN-Emotion-Detection", description: "Facial emotion detection from FER-2013 using CNN", language: "Python", stars: 0, url: "https://github.com/Atharv279/CNN-Emotion-Detection" },
  ],
  languages: [
    { name: "Python", percentage: 60 },
    { name: "TypeScript", percentage: 15 },
    { name: "JavaScript", percentage: 10 },
    { name: "Jupyter Notebook", percentage: 10 },
    { name: "Rust", percentage: 5 },
  ],
};

export default function GitHubPanel() {
  const [data, setData] = useState<GitHubData>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        // Keep fallback data
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Github className="h-4 w-4 text-zinc-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          Open Source
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left: Repos */}
        <div className="min-w-0">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Top Repositories
          </span>
          <div className="flex flex-col gap-2">
            {(loading ? fallbackData.repos : data.repos).map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 transition-all duration-200 active:bg-white/[0.05] md:hover:border-white/[0.14] md:hover:bg-white/[0.05] md:hover:shadow-md md:hover:shadow-black/15"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-medium text-zinc-200 group-hover:text-violet-300">
                      {repo.name}
                    </span>
                    <ExternalLink className="h-2.5 w-2.5 shrink-0 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  {repo.description && (
                    <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-3">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#71717a" }}
                        />
                        <span className="text-[10px] text-zinc-500">{repo.language}</span>
                      </div>
                    )}
                    {repo.stars > 0 && (
                      <div className="flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5 text-zinc-500" />
                        <span className="text-[10px] text-zinc-500">{repo.stars}</span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Languages + Heatmap */}
        <div className="flex flex-col gap-4">
          {/* Language bar */}
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Languages
            </span>
            <div className="mb-2 flex h-2 overflow-hidden rounded-full">
              {data.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="h-full"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: LANG_COLORS[lang.name] ?? "#71717a",
                  }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[lang.name] ?? "#71717a" }}
                  />
                  <span className="text-[10px] text-zinc-400">
                    {lang.name} {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution heatmap */}
          <div className="overflow-x-auto scrollbar-hide">
            <ContributionHeatmap contributions={data.contributions} />
          </div>
        </div>
      </div>

      {/* Profile summary */}
      <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-3">
        <span className="text-[11px] text-zinc-500">
          {data.profile.publicRepos} public repos
        </span>
        <span className="text-zinc-700">·</span>
        <a
          href={`https://github.com/${data.profile.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}
