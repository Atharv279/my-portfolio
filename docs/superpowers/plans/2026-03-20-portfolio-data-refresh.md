# Portfolio Data Refresh & Layout Restructure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 4 weak projects with 4 stronger ones, update all data files to match, restructure the bento grid into 3 themed sections with staggered animations.

**Architecture:** Surgical data swap across `fallback-data.ts`, `portfolio-data.ts`, and `systemPrompt.ts`, plus 4 new project card components following the existing BentoCard pattern. The bento grid in `page.tsx` is restructured from one "Flagship Projects" section into three themed sections (Autonomous Intelligence, Applied AI, Systems Engineering). All downstream consumers (tools.ts, ToolRenderer, ChatWindow tour, SystemMap) are updated to reference the new 7-project slug set.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion

**Branch:** `portfolio-cms-phase1` (NOT main — main is live on Vercel)

**Spec:** `docs/superpowers/specs/2026-03-20-portfolio-data-refresh-design.md`

**New 7-project slug set (referenced throughout):**
1. `autonomous-marketing-engine`
2. `ai-research-agent`
3. `ragify-finance`
4. `ai-invoice-master`
5. `pneumonia-xray`
6. `network-intelligence-dashboard`
7. `google-meet-transcriber`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/fallback-data.ts` | Modify | Remove `fallbackTalentProject`, add 4 new fallback projects, update `fallbackTechStack` |
| `lib/portfolio-data.ts` | Modify | Replace project summaries, update skills/domains/experience |
| `lib/ai/systemPrompt.ts` | Modify | Replace knowledge chunks for dropped projects, add new ones |
| `lib/ai/tools.ts` | Modify | Update slug enums in 3 tool definitions |
| `app/components/ai/ToolRenderer.tsx` | Modify | Update `projectsBySlug` map and imports |
| `app/components/ai/ChatWindow.tsx` | Modify | Update `TOUR_STEPS` slugs and narrative |
| `app/components/generative-ui/SystemMap.tsx` | Modify | Expand from 4→7 nodes, rework layout angles |
| `app/components/bento-grid/ProjectTalentCard.tsx` | Delete | No longer needed |
| `app/components/bento-grid/ProjectResearchAgentCard.tsx` | Create | New card component |
| `app/components/bento-grid/ProjectInvoiceMasterCard.tsx` | Create | New card component |
| `app/components/bento-grid/ProjectPneumoniaCard.tsx` | Create | New card component |
| `app/components/bento-grid/ProjectMeetTranscriberCard.tsx` | Create | New card component |
| `app/components/bento-grid/index.ts` | Modify | Update exports |
| `app/page.tsx` | Modify | 3 themed sections, stagger animation, parameterized SectionLabel |

---

## Task 1: Update `lib/fallback-data.ts` — Remove TalentScout, Add 4 New Projects

**Files:**
- Modify: `lib/fallback-data.ts`

- [ ] **Step 1: Remove `fallbackTalentProject`**

Delete the entire `fallbackTalentProject` export (lines 534-591) from `lib/fallback-data.ts`.

- [ ] **Step 2: Add `fallbackResearchAgentProject`**

Add after `fallbackRAGifyProject`:

```typescript
export const fallbackResearchAgentProject: Project = {
  _id: "fallback-project-research-agent",
  _type: "project",
  title: "AI Research Agent",
  slug: "ai-research-agent",
  category: "Autonomous Systems",
  badge: "Daily CI/CD",
  description:
    "An autonomous agent that wakes up every day, scans GitHub for new AI repositories, analyzes their READMEs and tech stacks, and generates LLM-powered comparative research reports\u2014all via GitHub Actions with zero manual intervention.",
  tags: [
    { label: "Python", icon: "Cpu" },
    { label: "Ollama", icon: "Box" },
    { label: "GitHub API", icon: "Github" },
    { label: "CI/CD", icon: "Workflow" },
  ],
  glowColor: "rgba(168, 85, 247, 0.15)",
  sourceUrl: "https://github.com/Atharv279/ai-research-agent",
  expandedSections: [
    {
      icon: "Route",
      title: "Daily Pipeline",
      accentColor: "text-purple-400",
      pipelineSteps: [
        {
          step: "01",
          title: "Discover",
          description:
            "GitHub Actions triggers daily. Python collectors search the GitHub API for trending and newly created AI/ML repositories using curated keyword filters.",
          accentColor: "border-purple-500/40",
        },
        {
          step: "02",
          title: "Analyze",
          description:
            "Each discovered repo's README, tech stack, and structure are parsed. GitPython clones and inspects the repository for deeper context extraction.",
          accentColor: "border-purple-500/30",
        },
        {
          step: "03",
          title: "Summarize",
          description:
            "Ollama-powered local LLM generates structured summaries: what the project does, key innovations, tech stack breakdown, and comparative positioning against similar tools.",
          accentColor: "border-purple-500/20",
        },
        {
          step: "04",
          title: "Commit & Report",
          description:
            "Generated reports are auto-committed to the repository via GitPython. Each run produces a dated markdown report with day-over-day delta tracking.",
          accentColor: "border-purple-500/10",
        },
      ],
    },
    {
      icon: "Workflow",
      title: "Infrastructure",
      accentColor: "text-purple-400",
      infoCards: [
        {
          title: "GitHub Actions Automation",
          text: "Fully automated via GitHub Actions cron schedule. Zero manual triggers\u2014the agent runs, discovers, analyzes, and commits every 24 hours autonomously.",
        },
        {
          title: "Local LLM Inference",
          text: "All summarization and analysis runs through Ollama on local hardware. No cloud API costs, no token limits, no rate throttling.",
        },
        {
          title: "Automated Git Workflow",
          text: "GitPython handles cloning target repos for analysis and auto-committing generated reports. The repository itself serves as a living research database.",
        },
      ],
    },
  ],
};
```

- [ ] **Step 3: Add `fallbackInvoiceMasterProject`**

```typescript
export const fallbackInvoiceMasterProject: Project = {
  _id: "fallback-project-invoice-master",
  _type: "project",
  title: "AI Invoice Master",
  slug: "ai-invoice-master",
  category: "Document AI",
  badge: "Multi-Language OCR",
  description:
    "An intelligent invoice extraction system that reads invoices in any language, uses OCR and Gemini AI to identify and extract every data field, and outputs clean structured data\u2014replacing hours of manual data entry.",
  tags: [
    { label: "Python", icon: "Cpu" },
    { label: "Tesseract", icon: "ScanLine" },
    { label: "Gemini", icon: "BrainCircuit" },
    { label: "Streamlit", icon: "Layout" },
  ],
  glowColor: "rgba(245, 158, 11, 0.15)",
  sourceUrl: "https://github.com/Atharv279/AI_Invoice_Master",
  expandedSections: [
    {
      icon: "Layers",
      title: "Extraction Pipeline",
      accentColor: "text-amber-400",
      detailItems: [
        {
          label: "OCR Engine",
          text: "Tesseract OCR preprocesses invoice images with adaptive thresholding and deskewing. Handles scanned PDFs, photos, and multi-format documents across languages.",
        },
        {
          label: "AI Field Extraction",
          text: "Google Gemini AI analyzes the OCR output to intelligently identify invoice fields: vendor name, date, line items, totals, tax breakdowns, and payment terms\u2014even from non-standard layouts.",
        },
        {
          label: "Structured Output",
          text: "Extracted data is normalized into consistent JSON/CSV format. Handles currency conversions, date format standardization, and multi-language field mapping automatically.",
        },
      ],
    },
    {
      icon: "Globe",
      title: "Multi-Language Support",
      accentColor: "text-amber-400",
      infoCards: [
        {
          title: "Language Detection",
          text: "Automatic language detection from invoice content. Tesseract's multilingual models handle Latin, Devanagari, CJK, and Arabic scripts out of the box.",
        },
        {
          title: "Streamlit Interface",
          text: "Clean drag-and-drop UI built with Streamlit. Upload an invoice, see extracted fields in real-time, export to structured formats. No technical training required.",
        },
      ],
    },
  ],
};
```

- [ ] **Step 4: Add `fallbackPneumoniaProject`**

```typescript
export const fallbackPneumoniaProject: Project = {
  _id: "fallback-project-pneumonia",
  _type: "project",
  title: "Pneumonia X-Ray Classification",
  slug: "pneumonia-xray",
  category: "Healthcare AI",
  badge: "Deep Learning",
  description:
    "A convolutional neural network trained to detect pneumonia from chest X-ray images with high accuracy\u2014demonstrating that AI can assist radiologists in screening thousands of scans faster and more consistently.",
  tags: [
    { label: "Python", icon: "Cpu" },
    { label: "TensorFlow", icon: "BrainCircuit" },
    { label: "Keras", icon: "Layers" },
    { label: "CNN", icon: "Eye" },
  ],
  glowColor: "rgba(16, 185, 129, 0.15)",
  sourceUrl: "https://github.com/Atharv279/pneumonia-xray-classification",
  expandedSections: [
    {
      icon: "Layers",
      title: "Model Architecture",
      accentColor: "text-emerald-400",
      detailItems: [
        {
          label: "CNN Design",
          text: "Multi-layer convolutional neural network with batch normalization and dropout regularization. Trained on 5,800+ labeled chest X-ray images from the Kaggle Chest X-Ray dataset.",
        },
        {
          label: "Training Pipeline",
          text: "TensorFlow/Keras training pipeline with data augmentation (rotation, zoom, horizontal flip) to prevent overfitting on medical imagery. Early stopping and learning rate scheduling for optimal convergence.",
        },
        {
          label: "Performance",
          text: "Achieves strong classification accuracy on the held-out test set. Precision/recall metrics tuned to minimize false negatives\u2014critical in medical screening where missing a positive case has serious consequences.",
        },
      ],
    },
    {
      icon: "BarChart3",
      title: "Clinical Relevance",
      accentColor: "text-emerald-400",
      infoCards: [
        {
          title: "Screening Assistance",
          text: "Designed as a screening tool to assist radiologists, not replace them. Flags potential pneumonia cases for priority review, reducing time-to-diagnosis in high-volume settings.",
        },
        {
          title: "Dataset",
          text: "Trained on real pediatric chest X-rays: 5,800+ images split into Normal and Pneumonia classes. Images are 48x48 grayscale, preprocessed for consistent model input.",
        },
      ],
    },
  ],
};
```

- [ ] **Step 5: Add `fallbackMeetTranscriberProject`**

```typescript
export const fallbackMeetTranscriberProject: Project = {
  _id: "fallback-project-meet-transcriber",
  _type: "project",
  title: "Google Meet Transcriber",
  slug: "google-meet-transcriber",
  category: "Systems Programming",
  badge: "Built in Rust",
  description:
    "A lightweight Rust tool that captures and saves real-time transcript data from Google Meet sessions\u2014demonstrating systems-level programming skills with zero runtime dependencies and memory-safe concurrency.",
  tags: [
    { label: "Rust", icon: "Code" },
    { label: "Real-Time", icon: "Zap" },
    { label: "Transcription", icon: "FileText" },
  ],
  glowColor: "rgba(251, 146, 60, 0.15)",
  sourceUrl: "https://github.com/Atharv279/google-meet-transcriber",
  expandedSections: [
    {
      icon: "Layers",
      title: "Architecture",
      accentColor: "text-orange-400",
      detailItems: [
        {
          label: "Rust Core",
          text: "Built entirely in Rust for memory safety and zero-cost abstractions. No garbage collector overhead, no runtime dependencies\u2014compiles to a single binary.",
        },
        {
          label: "Real-Time Capture",
          text: "Hooks into Google Meet's transcript data stream and captures captions as they appear. Handles speaker identification and timestamp alignment in real-time.",
        },
        {
          label: "Output Format",
          text: "Saves transcripts in clean, timestamped format. Each entry includes speaker name, timestamp, and text content for easy post-processing and search.",
        },
      ],
    },
  ],
};
```

- [ ] **Step 6: Update `fallbackTechStack`**

In the `fallbackTechStack` object:

a) In `trending` array, replace `{ name: "C++", icon: "Code" }` with `{ name: "Rust", icon: "Code" }` and replace `{ name: "System Design", icon: "Layers" }` with `{ name: "TensorFlow", icon: "BrainCircuit" }`.

b) In `arsenal` "AI / ML & Local Inference" section `items` array, add `"TensorFlow"`, `"Keras"`, `"Tesseract OCR"`.

c) In `arsenal` "Languages" section `items` array, add `"Rust"`.

d) In `arsenal` "DevOps & Tools" section `items` array, add `"GitHub Actions"`.

- [ ] **Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to fallback-data.ts

- [ ] **Step 8: Commit**

```bash
git add lib/fallback-data.ts
git commit -m "feat: replace TalentScout with 4 new project fallback data

Add AI Research Agent, AI Invoice Master, Pneumonia X-Ray Classification,
and Google Meet Transcriber. Update tech stack with Rust, TensorFlow, Keras.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Update `lib/portfolio-data.ts` — Skills, Domains, Projects, Experience

**Files:**
- Modify: `lib/portfolio-data.ts`

- [ ] **Step 1: Replace `portfolioProjects` array**

Replace the entire `portfolioProjects` array (lines 230-287) with:

```typescript
export const portfolioProjects: PortfolioProjectSummary[] = [
  {
    slug: "autonomous-marketing-engine",
    title: "Autonomous Marketing Engine",
    category: "Autonomous Intelligence",
    oneLiner: "Built an AI pipeline that researches, writes, and publishes LinkedIn posts — without any human involvement.",
    coreTech: ["n8n", "Ollama", "Python", "RTX 4060", "LinkedIn API"],
    hasFallbackData: true,
  },
  {
    slug: "ai-research-agent",
    title: "AI Research Agent",
    category: "Autonomous Intelligence",
    oneLiner: "An agent that wakes up daily, scans GitHub for new AI repos, and generates comparative research reports.",
    coreTech: ["Python", "Ollama", "GitHub API", "GitPython", "GitHub Actions"],
    hasFallbackData: true,
  },
  {
    slug: "ragify-finance",
    title: "RAGify-Finance",
    category: "Applied AI",
    oneLiner: "Proved which embedding model works best for financial Q&A — with math, not guesswork.",
    coreTech: ["Python", "FAISS", "Cohere", "HuggingFace", "LangChain"],
    hasFallbackData: true,
  },
  {
    slug: "ai-invoice-master",
    title: "AI Invoice Master",
    category: "Applied AI",
    oneLiner: "Reads invoices in any language, extracts every field, and structures the data automatically.",
    coreTech: ["Python", "Tesseract", "Gemini AI", "Streamlit"],
    hasFallbackData: true,
  },
  {
    slug: "pneumonia-xray",
    title: "Pneumonia X-Ray Classification",
    category: "Applied AI",
    oneLiner: "Trained a CNN to detect pneumonia from chest X-rays — healthcare AI at high accuracy.",
    coreTech: ["Python", "TensorFlow", "Keras", "CNN"],
    hasFallbackData: true,
  },
  {
    slug: "network-intelligence-dashboard",
    title: "Network Intelligence Dashboard",
    category: "Systems Engineering",
    oneLiner: "Replaced expensive monitoring tools with a custom system polling Cisco & Fortinet hardware in real-time.",
    coreTech: ["Python", "SNMP", "SSH", "SQLite", "Cisco", "Fortinet"],
    hasFallbackData: true,
  },
  {
    slug: "google-meet-transcriber",
    title: "Google Meet Transcriber",
    category: "Systems Engineering",
    oneLiner: "Built a Rust tool that captures live transcripts from Google Meet — zero runtime dependencies.",
    coreTech: ["Rust", "Real-Time Processing"],
    hasFallbackData: true,
  },
];
```

- [ ] **Step 2: Update `portfolioSkills` — remove dropped, add new**

Remove these skills (they were only linked to dropped projects):
- `Sentiment Analysis (VADER + TextBlob)` (line 54)
- `VSCodium Extension API` (line 103)

Update `linkedProjects` for skills that referenced dropped slugs:
- `Python`: remove `talentscout-ai`, `ai-video-recommender`; add `ai-research-agent`, `ai-invoice-master`, `pneumonia-xray`, `google-meet-transcriber`
- `Local LLM Orchestration`: remove `ajai-kilo-code`; add `ai-research-agent`
- `Ollama`: remove `ajai-kilo-code`; add `ai-research-agent`
- `NLTK / spaCy`: remove `talentscout-ai`
- `Prompt Engineering`: remove `talentscout-ai`, `po-comparator-gemini`; add `ai-invoice-master`
- `Gemini Pro`: remove `talentscout-ai`, `po-comparator-gemini`; add `ai-invoice-master`
- `Document Automation / Data Extraction`: remove `po-comparator-gemini`; add `ai-invoice-master`
- `TypeScript`: remove `ajai-kilo-code`
- `SQL`: remove `ai-video-recommender`
- `DBMS`: remove `ai-video-recommender`
- `FastAPI`: remove `ai-video-recommender`
- `Alembic / Migrations`: remove `ai-video-recommender`
- `Scikit-learn`: remove `ai-video-recommender`
- `Pandas`: remove `ai-video-recommender`
- `Feature Engineering`: remove `ai-video-recommender`
- `Streamlit`: remove `talentscout-ai`; add `ai-invoice-master`
- `Linux / Ubuntu`: remove `talentscout-ai`

Add new skills:
```typescript
{ name: "Rust", proficiency: 0.70, category: "languages", linkedProjects: ["google-meet-transcriber"] },
{ name: "TensorFlow", proficiency: 0.82, category: "ai-ml", tier: 1, linkedProjects: ["pneumonia-xray"] },
{ name: "Keras", proficiency: 0.80, category: "ai-ml", linkedProjects: ["pneumonia-xray"] },
{ name: "CNN / Computer Vision", proficiency: 0.78, category: "ai-ml", linkedProjects: ["pneumonia-xray"] },
{ name: "Tesseract OCR", proficiency: 0.75, category: "ai-ml", linkedProjects: ["ai-invoice-master"] },
{ name: "GitHub Actions", proficiency: 0.80, category: "backend-ops", linkedProjects: ["ai-research-agent"] },
```

- [ ] **Step 3: Update `portfolioDomains`**

Replace `"Developer Tools & Local AI"` domain with:
```typescript
{
  name: "Computer Vision & Deep Learning",
  description:
    "Building CNNs for image classification and OCR-powered document extraction. Applying deep learning to healthcare diagnostics and enterprise document automation.",
  keySkills: ["TensorFlow", "Keras", "CNN / Computer Vision", "Tesseract OCR", "Gemini Pro"],
  keyProjects: ["pneumonia-xray", "ai-invoice-master"],
},
```

Update other domains' `keyProjects`:
- "AI/ML Engineering": replace `talentscout-ai` with `ai-research-agent`
- "Intelligent Automation": add `ai-research-agent`
- "Backend & MLOps": remove `ai-video-recommender`, keep `network-intelligence-dashboard`

- [ ] **Step 4: Update `portfolioExperience`**

- Nio Stars: add `"ai-research-agent"` to `keyProjects`, add `"GitHub Actions"` to `keySkills`
- EOXS: remove `"po-comparator-gemini"` from `keyProjects`, replace with `"ai-invoice-master"`, add `"Tesseract OCR"` to `keySkills`
- Remove all references to dropped slugs across all entries

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 6: Commit**

```bash
git add lib/portfolio-data.ts
git commit -m "feat: update skills, domains, and project summaries for new lineup

Replace dropped projects with AI Research Agent, Invoice Master, Pneumonia
X-Ray, Meet Transcriber. Add Rust, TensorFlow, Keras, CNN skills.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Create 4 New Project Card Components

**Files:**
- Create: `app/components/bento-grid/ProjectResearchAgentCard.tsx`
- Create: `app/components/bento-grid/ProjectInvoiceMasterCard.tsx`
- Create: `app/components/bento-grid/ProjectPneumoniaCard.tsx`
- Create: `app/components/bento-grid/ProjectMeetTranscriberCard.tsx`
- Delete: `app/components/bento-grid/ProjectTalentCard.tsx`
- Modify: `app/components/bento-grid/index.ts`

Each card follows the exact pattern from `ProjectTalentCard.tsx` (lines 1-122). The ONLY differences per card are:
- Import: which fallback data to use
- Default id prop
- index number (for BentoCard stagger)
- Accent color class (category, badge, CTA hover, decorative blob)

- [ ] **Step 1: Create `ProjectResearchAgentCard.tsx`**

Copy the `ProjectTalentCard.tsx` pattern. Changes:
- Import: `fallbackResearchAgentProject` from `@/lib/fallback-data`
- Props interface: `ProjectResearchAgentCardProps`
- Function name: `ProjectResearchAgentCard`
- Default id: `"project-research-agent"`
- index: `4`
- Accent color: purple (`text-purple-400`, `border-purple-500/20`, `bg-purple-500/10`, `text-purple-300`, `md:hover:border-purple-500/40`, `md:hover:bg-purple-500/10`, `md:hover:text-purple-300`, `bg-purple-500/[0.06]`)

- [ ] **Step 2: Create `ProjectInvoiceMasterCard.tsx`**

Same pattern. Changes:
- Import: `fallbackInvoiceMasterProject`
- Function name: `ProjectInvoiceMasterCard`
- Default id: `"project-invoice-master"`
- index: `5`
- Accent color: amber (same as RAGify — `text-amber-400`, `border-amber-500/20`, etc.)

- [ ] **Step 3: Create `ProjectPneumoniaCard.tsx`**

Same pattern. Changes:
- Import: `fallbackPneumoniaProject`
- Function name: `ProjectPneumoniaCard`
- Default id: `"project-pneumonia"`
- index: `6`
- Accent color: emerald (`text-emerald-400`, `border-emerald-500/20`, `bg-emerald-500/10`, `text-emerald-300`, `md:hover:border-emerald-500/40`, `md:hover:bg-emerald-500/10`, `md:hover:text-emerald-300`, `bg-emerald-500/[0.06]`)

- [ ] **Step 4: Create `ProjectMeetTranscriberCard.tsx`**

Same pattern. Changes:
- Import: `fallbackMeetTranscriberProject`
- Function name: `ProjectMeetTranscriberCard`
- Default id: `"project-meet-transcriber"`
- index: `7`
- Accent color: orange (`text-orange-400`, `border-orange-500/20`, `bg-orange-500/10`, `text-orange-300`, `md:hover:border-orange-500/40`, `md:hover:bg-orange-500/10`, `md:hover:text-orange-300`, `bg-orange-500/[0.06]`)

- [ ] **Step 5: Delete `ProjectTalentCard.tsx`**

```bash
rm app/components/bento-grid/ProjectTalentCard.tsx
```

- [ ] **Step 6: Update `app/components/bento-grid/index.ts`**

Replace line 12 (`ProjectTalentCard`) with:
```typescript
export { default as ProjectResearchAgentCard } from "./ProjectResearchAgentCard";
export { default as ProjectInvoiceMasterCard } from "./ProjectInvoiceMasterCard";
export { default as ProjectPneumoniaCard } from "./ProjectPneumoniaCard";
export { default as ProjectMeetTranscriberCard } from "./ProjectMeetTranscriberCard";
```

- [ ] **Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 8: Commit**

```bash
git add app/components/bento-grid/
git commit -m "feat: add 4 new project cards, remove TalentScout card

New: ResearchAgent (purple), InvoiceMaster (amber), Pneumonia (emerald),
MeetTranscriber (orange). Each follows existing BentoCard pattern.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Restructure `app/page.tsx` — 3 Themed Sections + Stagger Animation

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update imports**

Replace:
```typescript
import {
  BentoGrid,
  HeroIdentity,
  HeroStatus,
  TechStackCard,
  MethodologyCard,
  ProjectMarketingCard,
  ProjectNetworkCard,
  ProjectRAGifyCard,
  ProjectTalentCard,
  HardwareOpsCard,
} from "./components/bento-grid";
```

With:
```typescript
import {
  BentoGrid,
  HeroIdentity,
  HeroStatus,
  TechStackCard,
  MethodologyCard,
  ProjectMarketingCard,
  ProjectNetworkCard,
  ProjectRAGifyCard,
  ProjectResearchAgentCard,
  ProjectInvoiceMasterCard,
  ProjectPneumoniaCard,
  ProjectMeetTranscriberCard,
  HardwareOpsCard,
} from "./components/bento-grid";
```

Replace fallback imports:
```typescript
import {
  fallbackProfile,
  fallbackEducation,
  fallbackExperiences,
  fallbackTechStack,
  fallbackMarketingProject,
  fallbackNetworkProject,
  fallbackRAGifyProject,
  fallbackResearchAgentProject,
  fallbackInvoiceMasterProject,
  fallbackPneumoniaProject,
  fallbackMeetTranscriberProject,
  fallbackMethodology,
  fallbackHardwareOps,
} from "@/lib/fallback-data";
```

- [ ] **Step 2: Parameterize `SectionLabel`**

Add `accentColor` prop:
```typescript
function SectionLabel({ children, accentColor = "bg-violet-500/70" }: { children: React.ReactNode; accentColor?: string }) {
  return (
    <div className="col-span-full flex items-center gap-3 pt-6 pb-1.5 md:pt-10 md:pb-2">
      <div className="flex items-center gap-2">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${accentColor}`} />
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
          {children}
        </h2>
      </div>
      <div className="h-px flex-1 bg-white/[0.10]" />
    </div>
  );
}
```

- [ ] **Step 3: Update project data resolution**

Remove `talentProject` resolution. Add new project resolutions:
```typescript
const researchAgentProject = projects?.find((p) => p.slug === "ai-research-agent") ?? fallbackResearchAgentProject;
const invoiceMasterProject = projects?.find((p) => p.slug === "ai-invoice-master") ?? fallbackInvoiceMasterProject;
const pneumoniaProject = projects?.find((p) => p.slug === "pneumonia-xray") ?? fallbackPneumoniaProject;
const meetTranscriberProject = projects?.find((p) => p.slug === "google-meet-transcriber") ?? fallbackMeetTranscriberProject;
```

- [ ] **Step 4: Replace "Flagship Projects" section with 3 themed sections**

Replace lines 107-113 (the old Flagship Projects section) with:

```tsx
{/* ── Autonomous Intelligence ── */}
<SectionLabel accentColor="bg-violet-500/70">Autonomous Intelligence</SectionLabel>
<div id="projects" className="col-span-full" />
<ProjectMarketingCard id="project-marketing" data={marketingProject} />
<ProjectResearchAgentCard id="project-research-agent" data={researchAgentProject} />

{/* ── Applied AI ── */}
<SectionLabel accentColor="bg-amber-500/70">Applied AI</SectionLabel>
<ProjectRAGifyCard id="project-ragify" data={ragifyProject} />
<ProjectInvoiceMasterCard id="project-invoice-master" data={invoiceMasterProject} />
<ProjectPneumoniaCard id="project-pneumonia" data={pneumoniaProject} />

{/* ── Systems Engineering ── */}
<SectionLabel accentColor="bg-cyan-500/70">Systems Engineering</SectionLabel>
<ProjectNetworkCard id="project-network" data={networkProject} />
<ProjectMeetTranscriberCard id="project-meet-transcriber" data={meetTranscriberProject} />
```

- [ ] **Step 5: Verify TypeScript compiles and build passes**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: restructure bento grid into 3 themed project sections

Autonomous Intelligence (violet), Applied AI (amber), Systems Engineering
(cyan). Parameterized SectionLabel with accentColor prop.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Update `lib/ai/tools.ts` — Slug Enums

**Files:**
- Modify: `lib/ai/tools.ts`

- [ ] **Step 1: Update all 3 slug enums**

Replace the enum arrays at lines 28-33, 72-77, and 96-101 with the new 7-project slug set:
```typescript
enum: [
  "autonomous-marketing-engine",
  "ai-research-agent",
  "ragify-finance",
  "ai-invoice-master",
  "pneumonia-xray",
  "network-intelligence-dashboard",
  "google-meet-transcriber",
],
```

Apply to all three tools: `renderProjectCard`, `renderArchitectureDiagram`, `renderPipelineVisualizer`.

- [ ] **Step 2: Commit**

```bash
git add lib/ai/tools.ts
git commit -m "feat: update tool slug enums to new 7-project lineup

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Update `app/components/ai/ToolRenderer.tsx` — Project Map

**Files:**
- Modify: `app/components/ai/ToolRenderer.tsx`

- [ ] **Step 1: Update imports and `projectsBySlug` map**

Replace imports (lines 14-19):
```typescript
import {
  fallbackMarketingProject,
  fallbackNetworkProject,
  fallbackRAGifyProject,
  fallbackResearchAgentProject,
  fallbackInvoiceMasterProject,
  fallbackPneumoniaProject,
  fallbackMeetTranscriberProject,
} from "@/lib/fallback-data";
```

Replace `projectsBySlug` (lines 21-26):
```typescript
const projectsBySlug: Record<string, Project> = {
  "autonomous-marketing-engine": fallbackMarketingProject,
  "ai-research-agent": fallbackResearchAgentProject,
  "ragify-finance": fallbackRAGifyProject,
  "ai-invoice-master": fallbackInvoiceMasterProject,
  "pneumonia-xray": fallbackPneumoniaProject,
  "network-intelligence-dashboard": fallbackNetworkProject,
  "google-meet-transcriber": fallbackMeetTranscriberProject,
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add app/components/ai/ToolRenderer.tsx
git commit -m "feat: update ToolRenderer project map for new 7-project lineup

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 7: Update `app/components/ai/ChatWindow.tsx` — Tour Steps

**Files:**
- Modify: `app/components/ai/ChatWindow.tsx`

- [ ] **Step 1: Update TOUR_STEPS**

Replace the last tour step (lines 164-185) — the one that shows project cards:
```typescript
{
  content:
    "These capabilities come together across seven projects spanning autonomous systems, applied AI, and systems engineering. Here are a few highlights \u2014 feel free to ask about any of them!",
  toolCalls: [
    {
      name: "renderProjectCard",
      arguments: { slug: "autonomous-marketing-engine" },
    },
    {
      name: "renderProjectCard",
      arguments: { slug: "ai-research-agent" },
    },
    {
      name: "renderProjectCard",
      arguments: { slug: "ragify-finance" },
    },
    {
      name: "renderProjectCard",
      arguments: { slug: "pneumonia-xray" },
    },
  ],
},
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ai/ChatWindow.tsx
git commit -m "feat: update guided tour with new project slugs

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 8: Update `app/components/generative-ui/SystemMap.tsx` — 7 Nodes

**Files:**
- Modify: `app/components/generative-ui/SystemMap.tsx`

- [ ] **Step 1: Replace `PROJECTS` array (lines 17-46)**

```typescript
const PROJECTS: SystemNode[] = [
  {
    id: "marketing",
    label: "Marketing Engine",
    subtitle: "Multi-Agent AI",
    accent: "#8b5cf6",
    scrollTo: "project-marketing",
  },
  {
    id: "research-agent",
    label: "AI Research Agent",
    subtitle: "Daily CI/CD",
    accent: "#a855f7",
    scrollTo: "project-research-agent",
  },
  {
    id: "ragify",
    label: "RAGify Finance",
    subtitle: "RAG Benchmarking",
    accent: "#f59e0b",
    scrollTo: "project-ragify",
  },
  {
    id: "invoice",
    label: "Invoice Master",
    subtitle: "Document AI",
    accent: "#f59e0b",
    scrollTo: "project-invoice-master",
  },
  {
    id: "pneumonia",
    label: "Pneumonia X-Ray",
    subtitle: "Healthcare CNN",
    accent: "#10b981",
    scrollTo: "project-pneumonia",
  },
  {
    id: "network",
    label: "Network Dashboard",
    subtitle: "Enterprise Telemetry",
    accent: "#06b6d4",
    scrollTo: "project-network",
  },
  {
    id: "transcriber",
    label: "Meet Transcriber",
    subtitle: "Built in Rust",
    accent: "#fb923c",
    scrollTo: "project-meet-transcriber",
  },
];
```

- [ ] **Step 2: Update layout constants for 7 nodes**

Replace the ANGLES constant (line 63) and adjust layout:
```typescript
const RADIUS = 260;

// 7 nodes evenly distributed around the hub, starting from top
const ANGLES = [-90, -38.6, 12.9, 64.3, 115.7, 167.1, 218.6];
```

Also reduce NODE_W slightly to prevent overlap with 7 nodes:
```typescript
const NODE_W = 145;
const NODE_H = 52;
```

- [ ] **Step 3: Verify TypeScript compiles and build passes**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 4: Commit**

```bash
git add app/components/generative-ui/SystemMap.tsx
git commit -m "feat: expand SystemMap from 4 to 7 project nodes

Radial layout now distributes 7 nodes evenly. Updated scroll targets
for all new project card IDs.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 9: Update `lib/ai/systemPrompt.ts` — Knowledge Base

**Files:**
- Modify: `lib/ai/systemPrompt.ts`

- [ ] **Step 1: Remove dropped project chunks**

Delete the knowledge chunks for:
- TalentScout AI (the chunk matching `/talent|recruit|interview|...`)
- AJAI / Kilo CODE (the chunk matching `/ajai|kilo|copilot|...`)
- AI Video Recommender (the chunk matching `/video|recommend|fastapi|...`)

- [ ] **Step 2: Add new project chunks**

Add these new knowledge chunks to KNOWLEDGE_BASE:

```typescript
{
  keywords: /research.?agent|daily|ci.?cd|github.?action|automated.?commit|discover|scan.?github/i,
  content: `PROJECT — AI RESEARCH AGENT (slug: "ai-research-agent"):
- Autonomous agent running on daily GitHub Actions cron. Discovers new AI/ML repos, clones and analyzes them, generates LLM-powered comparative research reports.
- Zero manual intervention. Reports auto-committed. The repo itself becomes a living research database.
- Tech: Python, Ollama, GitHub API, GitPython, GitHub Actions. Category: Autonomous Systems.`,
},
{
  keywords: /invoice|ocr|tesseract|extract|document|scan|receipt|field/i,
  content: `PROJECT — AI INVOICE MASTER (slug: "ai-invoice-master"):
- Multi-language invoice extraction: OCR (Tesseract) + Gemini AI for intelligent field identification.
- Handles scanned PDFs, photos, non-standard layouts across languages. Outputs clean structured JSON/CSV.
- Streamlit UI for drag-and-drop processing. Practical enterprise document automation.
- Tech: Python, Tesseract OCR, Gemini AI, Streamlit. Category: Document AI.`,
},
{
  keywords: /pneumonia|xray|x.?ray|chest|cnn|medical|healthcare|classif|radiol/i,
  content: `PROJECT — PNEUMONIA X-RAY CLASSIFICATION (slug: "pneumonia-xray"):
- CNN trained on 5,800+ chest X-ray images to detect pneumonia. TensorFlow/Keras with data augmentation.
- Precision/recall tuned to minimize false negatives — critical for medical screening.
- Demonstrates applied deep learning in healthcare diagnostics.
- Tech: Python, TensorFlow, Keras, CNN. Category: Healthcare AI.`,
},
{
  keywords: /rust|meet|transcrib|transcript|caption|google.?meet/i,
  content: `PROJECT — GOOGLE MEET TRANSCRIBER (slug: "google-meet-transcriber"):
- Lightweight Rust tool capturing real-time Google Meet transcripts. Zero runtime dependencies, single binary.
- Shows systems programming skills beyond Python ecosystem.
- Tech: Rust. Category: Systems Programming.`,
},
```

- [ ] **Step 3: Update the "all projects" chunk**

Replace the chunk matching `/project|portfolio|work|built|showcase|all/` content with:

```typescript
content: `ALL 7 PROJECTS:
1. Autonomous Marketing Engine (slug: "autonomous-marketing-engine") — Multi-agent content pipeline, zero cloud cost [Python, n8n, Ollama]
2. AI Research Agent (slug: "ai-research-agent") — Daily automated GitHub research via CI/CD [Python, Ollama, GitHub Actions]
3. RAGify Finance (slug: "ragify-finance") — RAG benchmarking: Cohere vs HuggingFace on FinanceBench [Python, FAISS, LangChain]
4. AI Invoice Master (slug: "ai-invoice-master") — Multi-language OCR invoice extraction [Python, Tesseract, Gemini]
5. Pneumonia X-Ray Classification (slug: "pneumonia-xray") — CNN chest X-ray screening [Python, TensorFlow, Keras]
6. Network Intelligence Dashboard (slug: "network-intelligence-dashboard") — SNMP/SSH monitoring for Cisco & Fortinet [Python, SQLite, FastAPI]
7. Google Meet Transcriber (slug: "google-meet-transcriber") — Real-time transcript capture [Rust]
PROJECT CATEGORIES: Autonomous Intelligence (1-2), Applied AI (3-5), Systems Engineering (6-7).
ALL projects have visual cards. When listing all: narrative overview + multiple renderProjectCard calls.`,
```

- [ ] **Step 4: Update the skills chunk**

Update the SKILLS knowledge chunk to include Rust, TensorFlow, Keras, CNN in the appropriate categories. Add `"Computer Vision: TensorFlow, Keras, CNN, Tesseract OCR"` to CATEGORIES.

- [ ] **Step 5: Update the introduction template**

Update the "INTRODUCTION TEMPLATE" chunk to reference the new project lineup:
```
I'm Atharv Patil — a Python Developer & AI Engineer currently leading a team at Nio Stars Technologies in Pune. I specialize in autonomous AI systems and production-grade ML on local hardware. My work spans from the Autonomous Marketing Engine (a fully autonomous multi-agent content pipeline) and an AI Research Agent that discovers new repos daily, to healthcare AI (pneumonia detection from X-rays) and systems programming in Rust. I even built a RAG benchmarking suite to prove which embedding models actually work for financial Q&A. I live by "Perceive, Reason, Act, Refine" — both in code and life.
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 7: Commit**

```bash
git add lib/ai/systemPrompt.ts
git commit -m "feat: update Kittu knowledge base for new 7-project lineup

Replace TalentScout/AJAI/VideoRecommender chunks with Research Agent,
Invoice Master, Pneumonia X-Ray, Meet Transcriber. Update skills and intro.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 10: Final Verification & Build

**Files:** All modified files

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 2: Run ESLint**

Run: `npx eslint . --max-warnings=0`
Expected: 0 warnings, 0 errors

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Test locally**

Run: `npm run dev`
Manually verify:
- All 7 project cards render in 3 themed sections
- SystemMap shows 7 nodes, each scrolls to correct card
- AI chat tour works with new project slugs
- Tech stack shows Rust, TensorFlow, Keras
- Section labels have colored accent dots

- [ ] **Step 5: Final commit if any lint/type fixes were needed**

```bash
git add -A
git commit -m "fix: lint and type fixes from final verification

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Fallback data: remove Talent, add 4 new + update tech stack | `lib/fallback-data.ts` |
| 2 | Portfolio data: skills, domains, projects, experience | `lib/portfolio-data.ts` |
| 3 | New card components + delete TalentCard + update exports | `app/components/bento-grid/*` |
| 4 | Page layout: 3 themed sections + parameterized labels | `app/page.tsx` |
| 5 | Tool slug enums | `lib/ai/tools.ts` |
| 6 | ToolRenderer project map | `app/components/ai/ToolRenderer.tsx` |
| 7 | Chat tour steps | `app/components/ai/ChatWindow.tsx` |
| 8 | SystemMap: 4→7 nodes | `app/components/generative-ui/SystemMap.tsx` |
| 9 | Kittu knowledge base | `lib/ai/systemPrompt.ts` |
| 10 | Final verification & build | All |
