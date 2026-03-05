# Session Startup Rules

- Always read `CLAUDE.md` and `MEMORY.md` first.
- Assume these files contain accurate architecture information.
- Do NOT explore the entire repository by default.
- Only open files directly related to the task being performed.
- Avoid running large repo exploration tools unless explicitly required.
- Prefer modifying known files rather than searching the whole codebase.
- If additional context is needed, open specific files instead of scanning directories.

---

# Project Brief: Bento-Style Developer Portfolio

## Architecture & Stack
- Framework: Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
- Animations: Framer Motion.
- Background: React Three Fiber (WebGL particle field).
- AI Chat: Groq API (`llama-3.3-70b-versatile`) via `groq-sdk`, streaming SSE.
- UI Components: Shadcn/UI & Lucide-React icons.
- CMS: Sanity (optional, falls back to `lib/fallback-data.ts`).
- Design System: Minimalist, dark-mode, glassmorphic bento-box grid. High contrast borders (`white/[0.12]`), subtle backgrounds (`white/[0.05]`).

## User Persona & Content Context
The portfolio belongs to **Atharv Patil** — a Junior Software Developer & Team Lead at Nio Stars Technologies (Pune). Specialized in Python, AI/ML Engineering, local LLM orchestration, RAG pipelines, and enterprise networking. Philosophy: "Zero Cloud Cost" — runs all AI on local RTX 4060 hardware via Ollama.

### Career Timeline
1. **Nio Stars Technologies** — Junior Software Developer & Team Lead (Jan 2026–Present, Pune)
2. **EOXS** — AI Generalist (May–Oct 2025, Santa Monica USA — remote). LLM-powered document automation, GenAI ERP modules.
3. **Rubixe** — AI & Data Science Consultant Intern (Sep 2024–Apr 2025, Bengaluru). POC solutions, ML pipelines.
4. **Sukamsys** — Intern (Aug 2023–Mar 2024, Nagpur).

### Education
- B.Tech Computer Science, Nagpur University (2021–2024)
- Diploma Computer Science, Cusrow Wadia Institute (2018–2021)

### Content distributed across the Bento Grid:
1. **Hero/Profile Card:** "Python Developer & AI Engineer". Current role + bio.
2. **Tech Stack Card:** Python, FastAPI, PyTorch, Ollama, n8n, Node-RED, Docker.
3. **Project Cards (4):** Marketing Engine, Network Dashboard, RAGify Finance, TalentScout AI.
4. **Hardware/Ops Card:** Local AI on RTX 4060, Cisco Black Belt certs.
5. **Methodology Card:** "Perceive, Reason, Act, Refine."
6. **System Map:** Interactive SVG radial diagram — click nodes to scroll to project cards.
7. **Skill Radar:** SVG spider chart of 5 domains from `lib/portfolio-data.ts`.
8. **Engineering Timeline:** Scroll-animated career history from `portfolioExperience`.
9. **GitHub Panel:** Fetches from GitHub API with static fallback.
10. **Recruiter Mode:** Toggle overlay with key metrics, persisted in localStorage.
11. **AI Chat (Kittu):** Conversational digital twin with 6 generative UI tools, guided tour, suggestion chips.
12. **Certification Card:** 5 certifications with amber gradient accent.
13. **Impact Dashboard:** 4 animated count-up metric cards.

### 6 Projects (for context files, see `_context/` directory):
1. **Autonomous Marketing Engine** — Multi-agent n8n pipeline, local LLMs, zero cloud cost.
2. **Network Intelligence Dashboard** — SNMP/SSH monitoring for Cisco & Fortinet.
3. **RAGify Finance** — RAG benchmarking (Cohere vs HuggingFace) on FinanceBench.
4. **TalentScout AI** — Multilingual recruitment assistant with sentiment analysis.
5. **AJAI (Kilo CODE)** — VSCodium AI coding extension replacing Copilot.
6. **AI Video Recommender** — FastAPI ML recommendation engine.

## Engineering Rules for Claude
- Write clean, modular React components.
- Do not use inline styles; rely strictly on Tailwind utility classes.
- Ensure the CSS Grid is fully responsive (1 column mobile, 3-4 columns desktop).
- Always ask for confirmation before installing new npm packages.
- Use `DynamicIcon` from `lib/icon-map.tsx` for dynamic icon rendering (never create components during render).
- Use `useSyncExternalStore` for client-only state (not useState+useEffect).
- R3F components in `app/components/canvas/` use eslint-disable for purity rules — this is intentional.
- All hover effects MUST use `md:hover:` prefix to prevent sticky hover on touch devices.
- Glow overlays use `md:group-hover:` — never bare `group-hover:`.
- Mobile-first: `max-sm:` classes for mobile fullscreen, safe area insets for iOS.
- After ANY code changes, always run: `npx tsc --noEmit`, `npx eslint . --max-warnings=0`, `npm run build`.

## External Links & Deep Context
- **GitHub:** [https://github.com/Atharv279]
- **LinkedIn:** [www.linkedin.com/in/atharv-patil-bab53a284]

**Contextual Reading:**
Before generating portfolio content, read the files in `_context/` for professional summary, job titles, and timelines.

## Environment Variables (`.env.local` — NEVER commit)
- `GROQ_API_KEY` — Groq cloud inference key (server-only, used in `/api/chat`)
- `GROQ_MODEL=llama-3.3-70b-versatile`
- Sanity CMS vars (optional, fallback data covers everything)
