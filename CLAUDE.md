# Project Brief: Bento-Style Developer Portfolio

## Architecture & Stack
- Framework: Next.js (App Router), TypeScript, Tailwind CSS.
- Animations: Framer Motion.
- UI Components: Shadcn/UI & Lucide-React icons.
- Design System: Minimalist, dark-mode preferred, bento-box grid layout inspired by toukoum.fr. High visual hierarchy, smooth hover states, and app-like transitions.

## User Persona & Content Context
The portfolio belongs to a Software Developer specialized in Python and AI Engineering. The tone should be highly technical, professional, and highlight enterprise-grade development.

Content to be distributed across the Bento Grid:
1.  **Hero/Profile Card:** Title: "Python Developer & AI Engineer". Current role: Junior Dev @ Nio Stars Technologies. Mention B.Tech CS background.
2.  **Tech Stack Card:** Highlight Python, FastAPI, PyTorch, Ollama, n8n, Node-RED, and Docker.
3.  **Project Card 1 (Multi-Agent Systems):** "Autonomous Marketing Engine" - Built with n8n and local LLMs for research, scraping, and content generation.
4.  **Project Card 2 (Enterprise Networking):** "Network Intelligence Dashboard" - Real-time data acquisition from Cisco switches and Fortinet firewalls using SNMP/SSH collectors.
5.  **Hardware/Ops Card:** Note expertise in optimizing local AI workflows on consumer hardware (RTX 4060) to bypass cloud API costs. Mention Cisco Black Belt certifications.
6.  **Methodology Card:** Highlight the core engineering philosophy: "Perceive, Reason, Act, Refine."

## Engineering Rules for Claude
- Write clean, modular React components.
- Do not use inline styles; rely strictly on Tailwind utility classes.
- Ensure the CSS Grid is fully responsive (1 column on mobile, transitioning to 3 or 4 columns on large screens).
- Always ask for confirmation before installing new npm packages.

## External Links & Deep Context
- **GitHub:** [https://github.com/Atharv279]
- **LinkedIn:** [www.linkedin.com/in/atharv-patil-bab53a284]

**Contextual Reading:**
Before generating the portfolio content, read the files located in the `_context/` directory. Use the LinkedIn PDF to extract my professional summary, exact job titles, and timelines. Use the GitHub READMEs to accurately describe the technical depth of my projects.