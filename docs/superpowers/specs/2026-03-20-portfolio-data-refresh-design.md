# Portfolio Data Refresh & Layout Restructure

**Date:** 2026-03-20
**Branch:** `portfolio-cms-phase1`
**Goal:** Replace weak projects with stronger ones, update all data sources to be accurate, restructure bento grid into themed sections, add staggered animations.

---

## 1. Project Lineup Change

### Dropping (4)
- TalentScout AI (`talentscout-ai`) — has fallback card, remove fully
- AJAI / Kilo CODE (`ajai-kilo-code`) — no fallback card, remove from portfolio-data only
- AI Video Recommender (`ai-video-recommender`) — no fallback card, remove from portfolio-data only
- PO Comparator (`po-comparator-gemini`) — no fallback card, remove from portfolio-data. Update EOXS experience to reference general "document automation" instead.

### Keeping (3)
- Autonomous Marketing Engine (`autonomous-marketing-engine`)
- RAGify Finance (`ragify-finance`)
- Network Intelligence Dashboard (`network-intelligence-dashboard`)

### Adding (4)
| Slug | Title | Category | One-liner | Key Metrics |
|------|-------|----------|-----------|-------------|
| `ai-research-agent` | AI Research Agent | Autonomous Systems | An agent that wakes up daily, scans GitHub for new AI repos, and generates comparative research reports | Daily CI/CD, Ollama-powered, automated commits via GitHub Actions |
| `ai-invoice-master` | AI Invoice Master | Document AI | Reads invoices in any language, extracts every field, and structures the data automatically | Multi-language OCR, Gemini AI, Tesseract, Streamlit |
| `pneumonia-xray` | Pneumonia X-Ray Classification | Healthcare AI | Trained a CNN to detect pneumonia from chest X-rays | 5,800+ images, TensorFlow/Keras, CNN |
| `google-meet-transcriber` | Google Meet Transcriber | Systems Programming | Built a Rust tool that captures live transcripts from Google Meet | Rust, real-time capture |

**Final lineup (7 projects, all with visual cards):**
1. `autonomous-marketing-engine`
2. `ai-research-agent`
3. `ragify-finance`
4. `ai-invoice-master`
5. `pneumonia-xray`
6. `network-intelligence-dashboard`
7. `google-meet-transcriber`

---

## 2. Bento Grid Layout Restructure

Replace the single "Flagship Projects" section with three themed groups:

### Section: "Autonomous Intelligence"
- Accent dot: violet (`bg-violet-500/70`)
- Cards: Marketing Engine, AI Research Agent
- Story: "AI that runs itself"

### Section: "Applied AI"
- Accent dot: amber (`bg-amber-500/70`)
- Cards: RAGify Finance, AI Invoice Master, Pneumonia X-Ray
- Story: "Solving real problems with ML"

### Section: "Systems Engineering"
- Accent dot: cyan (`bg-cyan-500/70`)
- Cards: Network Intelligence Dashboard, Google Meet Transcriber
- Story: "Infrastructure & low-level engineering"

### SectionLabel Parameterization
Add optional `accentColor` prop to `SectionLabel` component in `page.tsx` (default: `bg-violet-500/70`). Each themed section passes its own color.

### Animation
- Wrap each section's cards in a `motion.div` container with Framer Motion `variants`:
  - Parent: `staggerChildren: 0.08`
  - Child: `initial: { opacity: 0, y: 20 }` → `animate: { opacity: 1, y: 0 }`
- Cards retain existing `section-enter` CSS class for scroll-triggered visibility

### Full page order:
Hero → Tech Stack → Ticker → System Map → **Autonomous Intelligence** → **Applied AI** → **Systems Engineering** → Open Source → Education → Career Evolution → Engineering & Infrastructure → Business Impact → Skill Radar

---

## 3. Data File Changes

### `lib/fallback-data.ts`
- Remove: `fallbackTalentProject`
- Add: `fallbackResearchAgentProject`, `fallbackInvoiceMasterProject`, `fallbackPneumoniaProject`, `fallbackMeetTranscriberProject`
- Each follows existing `Project` type with `expandedSections`
- Note: AJAI, Video Recommender, and PO Comparator never had fallback data — no removal needed
- Update `fallbackTechStack`:
  - Add "Rust" to Languages
  - Add "TensorFlow", "Keras" to AI/ML section
  - Add "Tesseract OCR" to AI/ML section
  - Add "GitHub Actions" to DevOps
  - Update trending: replace less-used items with Rust, TensorFlow

### `lib/portfolio-data.ts`
- Remove all 4 dropped project slugs from `portfolioProjects`
- Add 4 new `PortfolioProjectSummary` entries (all with `hasFallbackData: true`)
- Update `portfolioSkills`:
  - Add: Rust (0.70), TensorFlow (0.82), Keras (0.80), CNN/Computer Vision (0.78), Tesseract OCR (0.75), GitHub Actions (0.80)
  - Update `linkedProjects` to reference new slugs
  - Remove skills only linked to dropped projects (VADER+TextBlob sentiment, VSCodium Extension API)
- Update `portfolioDomains`:
  - Replace "Developer Tools & Local AI" with "Computer Vision & Deep Learning"
  - Update `keyProjects` across all domains
- Update `portfolioExperience`:
  - Nio Stars: add `ai-research-agent` to keyProjects
  - EOXS: remove `po-comparator-gemini`, add `ai-invoice-master` if timeline fits, or just list general skills
  - Remove all references to dropped project slugs
- Update `portfolioCertifications`: keep as-is (matches resume)

### `lib/ai/systemPrompt.ts`
- Remove knowledge chunks for: TalentScout, AJAI, Video Recommender
- Add knowledge chunks for: AI Research Agent, Invoice Master, Pneumonia X-Ray, Meet Transcriber
- Update "all projects" chunk with new 7-project list
- Update introduction template to reference new project lineup
- Update skills chunk with new tech (Rust, TensorFlow, etc.)

### `lib/ai/tools.ts` *(CRITICAL — missed in v1)*
- Update `renderProjectCard` tool `enum` array: replace dropped slugs with new 7-project slug list
- Update `renderArchitectureDiagram` tool `enum` array: same new slugs
- Update `renderPipelineVisualizer` tool `enum` array: same new slugs

---

## 4. Component Changes

### New Components (4)
All in `app/components/bento-grid/`:
- `ProjectResearchAgentCard.tsx`
- `ProjectInvoiceMasterCard.tsx`
- `ProjectPneumoniaCard.tsx`
- `ProjectMeetTranscriberCard.tsx`

Each card:
- Uses `BentoCard` wrapper with `id`, `layoutId`
- Glassmorphic style (`bg-white/[0.05]`, `border-white/[0.12]`)
- Badge, tags, glow overlay with `md:group-hover:`
- Expanded sections with architecture/pipeline details
- Style: human one-liner + 2-3 key metrics

### Remove
- `ProjectTalentCard` component

### Update `app/components/bento-grid/index.ts`
- Export new card components, remove TalentCard export

### Update `app/page.tsx`
- Import new card components + new fallback data
- Remove `fallbackTalentProject` import
- Restructure project sections into 3 themed groups
- Parameterize `SectionLabel` with `accentColor` prop
- Wrap each project section in `motion.div` for stagger animation

### Update `app/components/ai/ToolRenderer.tsx` *(CRITICAL — missed in v1)*
- Update `projectsBySlug` map: remove `talentscout-ai` entry, add entries for all 4 new projects
- Update imports to reference new fallback data exports

### Update `app/components/ai/ChatWindow.tsx` *(CRITICAL — missed in v1)*
- Update guided tour steps: replace `talentscout-ai` slug references with new project slugs
- Update tour narrative text ("four flagship projects" → "seven projects across three categories")

### Update `app/components/generative-ui/SystemMap.tsx` *(CRITICAL — was incorrectly listed as "no change")*
- Update `PROJECTS` array from 4 to 7 nodes with new project data
- Rework radial layout: 7 angular positions instead of 4 (`ANGLES` array)
- Update `scrollTo` IDs to match new card DOM IDs
- Update mobile vertical list layout for 7 items

---

## 5. What Does NOT Change
- Hero, HeroStatus, InfiniteTicker
- SkillRadar, EngineeringTimeline
- CertificationCard, EducationCard, ImpactDashboard
- GitHubPanel, MethodologyCard, HardwareOpsCard
- ChatWidget core, Kittu avatar, ThinkingPanel
- All component architecture patterns
- CSS/Tailwind conventions, glassmorphic design system
- R3F particle background

---

## 6. Post-Implementation Updates
- Update `CLAUDE.md` project list to reflect new 7-project lineup
- Update `MEMORY.md` completed phases

---

## 7. Verification
After all changes:
```bash
npx tsc --noEmit
npx eslint . --max-warnings=0
npm run build
```
All must pass with zero errors.
