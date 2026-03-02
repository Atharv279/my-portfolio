import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// 1. Content Security Policy
// ---------------------------------------------------------------------------
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' for its style injection; unsafe-eval is NOT allowed
  "script-src 'self' https://vercel.live https://*.vercel-scripts.com 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vercel.live https://*.vercel-analytics.com https://*.vercel-scripts.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
];

const CSP_HEADER = CSP_DIRECTIVES.join("; ");

// ---------------------------------------------------------------------------
// 2. Rate limiting (in-memory token bucket per IP)
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, TokenBucket>();

// Periodic cleanup to prevent unbounded memory growth
const CLEANUP_INTERVAL_MS = 5 * 60_000;
let lastCleanup = Date.now();

function cleanupBuckets() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.lastRefill > RATE_LIMIT_WINDOW_MS * 2) {
      buckets.delete(key);
    }
  }
}

function isRateLimited(ip: string): boolean {
  cleanupBuckets();

  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket) {
    buckets.set(ip, { tokens: MAX_REQUESTS_PER_WINDOW - 1, lastRefill: now });
    return false;
  }

  // Refill tokens based on elapsed time
  const elapsed = now - bucket.lastRefill;
  const refill = Math.floor(
    (elapsed / RATE_LIMIT_WINDOW_MS) * MAX_REQUESTS_PER_WINDOW,
  );
  if (refill > 0) {
    bucket.tokens = Math.min(MAX_REQUESTS_PER_WINDOW, bucket.tokens + refill);
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) return true;

  bucket.tokens -= 1;
  return false;
}

// ---------------------------------------------------------------------------
// Middleware handler
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate-limit API routes only (e.g. /api/contact, future routes)
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        },
      );
    }
  }

  // Build response with security headers
  const response = NextResponse.next();
  const headers = response.headers;

  // CSP
  headers.set("Content-Security-Policy", CSP_HEADER);

  // Clickjacking prevention
  headers.set("X-Frame-Options", "DENY");

  // XSS legacy header (browsers that don't fully support CSP)
  headers.set("X-Content-Type-Options", "nosniff");

  // Prevent MIME-type sniffing
  headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy — don't leak full URLs
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy — disable unused browser features
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  return response;
}

// Run on all routes except static assets and Next.js internals
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
