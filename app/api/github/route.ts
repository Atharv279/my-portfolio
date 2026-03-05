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
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-app",
    };

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers, next: { revalidate: CACHE_SECONDS } }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`, { headers, next: { revalidate: CACHE_SECONDS } }),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const profile: GitHubProfile = await profileRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    // Compute language breakdown from repos
    const langCount: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language && !repo.fork) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    }
    const total = Object.values(langCount).reduce((s, v) => s + v, 0) || 1;
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
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
      repos: repos
        .filter((r) => !r.fork)
        .slice(0, 6)
        .map((r) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          url: r.html_url,
        })),
      languages,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
