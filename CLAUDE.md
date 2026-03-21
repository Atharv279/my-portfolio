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
The portfolio belongs to Atharv Patil — a Software Developer specialized in Python and AI Engineering. The tone should be highly technical, professional, and highlight enterprise-grade development.

Content distributed across the Bento Grid:
1. **Hero/Profile Card:** "Python Developer & AI Engineer". Current role: Junior Dev @ Nio Stars Technologies. B.Tech CS.
2. **Tech Stack Card:** Python, FastAPI, PyTorch, TensorFlow, Ollama, n8n, Rust, Docker.
3. **Project Cards (7):** Marketing Engine, AI Research Agent, RAGify Finance, AI Invoice Master, Pneumonia X-Ray, Network Dashboard, Google Meet Transcriber. Three themed sections: Autonomous Intelligence (violet), Applied AI (amber), Systems Engineering (cyan).
4. **Hardware/Ops Card:** Local AI on RTX 4060, Cisco Black Belt certs.
5. **Methodology Card:** "Perceive, Reason, Act, Refine."
6. **System Map:** Interactive SVG radial diagram — click nodes to scroll to project cards.
7. **Skill Radar:** SVG spider chart of 5 domains from `lib/portfolio-data.ts`.
8. **Engineering Timeline:** Scroll-animated career history from `portfolioExperience`.
9. **GitHub Panel:** Fetches from GitHub API with static fallback.
10. **Recruiter Mode:** Toggle overlay with key metrics, persisted in localStorage.
11. **AI Chat:** Floating widget with 6 generative UI tools, guided tour, suggestions.

## Engineering Rules for Claude
- Write clean, modular React components.
- Do not use inline styles; rely strictly on Tailwind utility classes.
- Ensure the CSS Grid is fully responsive (1 column mobile, 3-4 columns desktop).
- Always ask for confirmation before installing new npm packages.
- Use `DynamicIcon` from `lib/icon-map.tsx` for dynamic icon rendering (never create components during render).
- Use `useSyncExternalStore` for client-only state (not useState+useEffect).
- R3F components in `app/components/canvas/` use eslint-disable for purity rules — this is intentional.

## External Links & Deep Context
- **GitHub:** [https://github.com/Atharv279]
- **LinkedIn:** [www.linkedin.com/in/atharv-patil-bab53a284]

**Contextual Reading:**
Before generating portfolio content, read the files in `_context/` for professional summary, job titles, and timelines.
