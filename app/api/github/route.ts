import { NextResponse } from "next/server";

const GITHUB_USER = "Atharv279";
const CACHE_SECONDS = 3600;

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  pushed_at: string;
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
}

// Portfolio project repos to prioritize (in order)
const PRIORITY_REPOS = [
  "ai-research-agent",
  "AI_Invoice_Master",
  "pneumonia-xray-classification",
  "google-meet-transcriber",
  "RAGify-Finance",
  "CNN-Emotion-Detection",
];

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-app",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Fetch profile, all repos, and contribution data in parallel
    const [profileRes, reposRes, contributionData] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers,
        next: { revalidate: CACHE_SECONDS },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`,
        { headers, next: { revalidate: CACHE_SECONDS } }
      ),
      fetchContributions(token),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const profile: GitHubProfile = await profileRes.json();
    const allRepos: GitHubRepo[] = await reposRes.json();
    const ownRepos = allRepos.filter((r) => !r.fork);

    // Pick top repos: prioritize portfolio projects, then by most recently pushed
    const prioritized = PRIORITY_REPOS.map((name) =>
      ownRepos.find((r) => r.name.toLowerCase() === name.toLowerCase())
    ).filter(Boolean) as GitHubRepo[];

    const remaining = ownRepos
      .filter((r) => !PRIORITY_REPOS.some((p) => p.toLowerCase() === r.name.toLowerCase()))
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

    const topRepos = [...prioritized, ...remaining].slice(0, 6);

    // Compute language breakdown from ALL repos
    const langCount: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    }
    const total = Object.values(langCount).reduce((s, v) => s + v, 0) || 1;
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
      }));

    return NextResponse.json({
      profile: {
        login: profile.login,
        avatarUrl: profile.avatar_url,
        publicRepos: profile.public_repos,
        followers: profile.followers,
        bio: profile.bio,
      },
      repos: topRepos.map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        url: r.html_url,
      })),
      languages,
      contributions: contributionData,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}

async function fetchContributions(token: string | undefined) {
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user(login: "${GITHUB_USER}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map(
        (w: { contributionDays: { contributionCount: number; date: string }[] }) =>
          w.contributionDays.map((d) => ({
            count: d.contributionCount,
            date: d.date,
          }))
      ),
    };
  } catch {
    return null;
  }
}
