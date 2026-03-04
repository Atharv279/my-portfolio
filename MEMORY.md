# Project Memory: AI Engineer Portfolio
**Owner:** Atharv Patil | Junior Software Developer @ Nio Stars Technologies
**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons, Sanity CMS.

---

## Core Architecture & State Management
- **Spatial UI System:** Bento Grid with Framer Motion `layoutId` morphing into expanded modals.
- **Responsive Logic:** 1 column mobile, 3-4 columns desktop. Touch disables `whileHover`.
- **Data Layer:** Sanity CMS (headless) with graceful fallback to `lib/fallback-data.ts`. ISR revalidation every 1 hour.
- **Deployment:** Hosted on Vercel with CI/CD from `main`.

---

## Folder Structure (Phase 2 Complete)
```
app/components/bento-grid/  — HeroIdentity, HeroStatus, TechStackCard, MethodologyCard,
                              ProjectMarketingCard, ProjectNetworkCard, ProjectRAGifyCard,
                              ProjectTalentCard, HardwareOpsCard + BentoCard/BentoGrid/ExpandedSection
app/components/security/    — SecurityProvider.tsx (DO NOT MODIFY)
app/components/ui/          — GradientMesh.tsx, InfiniteTicker.tsx
app/components/canvas/      — Phase 3 placeholder (React Three Fiber)
app/components/generative-ui/ — Phase 4 placeholder (Vercel AI SDK)
sanity/schemas/             — 8 schema types
lib/types.ts                — All TypeScript interfaces (Profile has stats field)
lib/fallback-data.ts        — Static data for all 10 components
lib/icon-map.ts             — 40+ Lucide icons mapped
lib/sanity.ts               — Typed fetch wrappers with ensureClient()
```

---

## Cybersecurity & Hardening (Critical — DO NOT MODIFY)
- `SecurityProvider.tsx`: Blocks right-click, drag, F12, Ctrl+U, Ctrl+Shift+I. Console watermark.
- `middleware.ts`: CSP headers, rate limiting, security headers.

---

## Roadmap Status
- **Phase 1: CMS Integration** — COMPLETE (folder restructure, Sanity schemas, data-driven components, ISR)
- **Phase 2: Advanced Bento Grid** — COMPLETE (split hero, InfiniteTicker, RAGify + TalentScout cards, asymmetric layout)
- **Phase 3: WebGL / R3F** — PENDING (React Three Fiber canvas layer)
- **Phase 4: AI Digital Clone** — PENDING (Vercel AI SDK + local Ollama, Generative UI)
- **Phase 5: Case Studies** — PENDING (DAG visualizer, Firewall radar)

## Key Decisions
- Sanity Studio NOT embedded in app (CSP in middleware.ts can't be modified). Use hosted studio.
- LLM provider: Local Ollama (zero-cost philosophy).
- Card `id` props hardcoded in page.tsx (not from CMS) to keep Framer Motion layoutId stable.

## Constraints
- Do not remove security listeners.
- Maintain Tailwind v4 utilities; no inline styles.
- Preserve Framer Motion layoutId transitions.
- Keep standard aspect ratios (1.91:1) for metadata/thumbnails.
