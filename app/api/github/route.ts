import { NextResponse } from "next/server";

const GITHUB_USER = "Atharv279";
const CACHE_SECONDS = 3600;

// Featured repos to prioritize (order matters)
const FEATURED_REPOS = [
  "ai-research-agent",
  "RAGify-Finance",
  "daily-experiments",
  "automated-bots",
  "AI_Invoice_Master",
  "CNN-Emotion-Detection",
  "ml-experiments",
  "agent-improvement",
  "ai-agent-lab",
  "DocuMind-",
  "TalentGPT",
];

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
}

// Fetch real contribution data from GitHub's GraphQL API
async function fetchContributions(): Promise<number[][]> {
  const query = `query {
    user(login: "${GITHUB_USER}") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return [];

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

    // Return last 26 weeks (6 months)
    return weeks.slice(-26).map((week: { contributionDays: { contributionCount: number }[] }) =>
      week.contributionDays.map((day: { contributionCount: number }) => {
        const count = day.contributionCount;
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        return 3;
      })
    );
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-app",
    };

    const [profileRes, reposRes, contributions] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers, next: { revalidate: CACHE_SECONDS } }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: CACHE_SECONDS } }),
      fetchContributions(),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const profile: GitHubProfile = await profileRes.json();
    const allRepos: GitHubRepo[] = await reposRes.json();
    const nonForkRepos = allRepos.filter((r) => !r.fork);

    // Sort: featured repos first (in order), then by stars
    const repoMap = new Map(nonForkRepos.map((r) => [r.name, r]));
    const sortedRepos: GitHubRepo[] = [];
    for (const name of FEATURED_REPOS) {
      const repo = repoMap.get(name);
      if (repo) {
        sortedRepos.push(repo);
        repoMap.delete(name);
      }
    }
    // Add remaining by stars
    const remaining = [...repoMap.values()].sort((a, b) => b.stargazers_count - a.stargazers_count);
    sortedRepos.push(...remaining);

    // Compute language breakdown from ALL repos (not just top 6)
    const langCount: Record<string, number> = {};
    for (const repo of nonForkRepos) {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    }
    const total = Object.values(langCount).reduce((s, v) => s + v, 0) || 1;
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
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
      repos: sortedRepos.slice(0, 6).map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        url: r.html_url,
      })),
      languages,
      contributions,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
