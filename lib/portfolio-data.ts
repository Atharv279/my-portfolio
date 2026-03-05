// =============================================================================
// Portfolio Intelligence Layer — Phase 6
//
// Structured knowledge index extracted from resume, context docs, and
// fallback-data. Consumed by the AI system prompt to give the assistant
// deep, cross-referenced understanding of Atharv's capabilities.
//
// Design: References (not duplicates) fallback-data.ts entities via slugs/ids.
// =============================================================================

// ---------------------------------------------------------------------------
// Skills — flat index with proficiency, category, and project links
// ---------------------------------------------------------------------------

export type SkillCategory =
  | "ai-ml"
  | "languages"
  | "cs-fundamentals"
  | "networking"
  | "backend-ops"
  | "automation"
  | "devtools"
  | "data";

export interface PortfolioSkill {
  name: string;
  proficiency: number; // 0–1
  category: SkillCategory;
  linkedProjects: string[]; // project slugs
  tier?: 1 | 2; // 1 = featured/top, 2 = exhaustive detail (default 2)
}

export const portfolioSkills: PortfolioSkill[] = [
  // ── AI / ML & Local Inference ──
  { name: "Python", proficiency: 0.95, category: "ai-ml", tier: 1, linkedProjects: ["autonomous-marketing-engine", "network-intelligence-dashboard", "ragify-finance", "talentscout-ai", "ai-video-recommender"] },
  { name: "Local LLM Orchestration", proficiency: 0.92, category: "ai-ml", tier: 1, linkedProjects: ["autonomous-marketing-engine", "ajai-kilo-code"] },
  { name: "LangChain", proficiency: 0.85, category: "ai-ml", tier: 1, linkedProjects: ["ragify-finance", "autonomous-marketing-engine"] },
  { name: "LangGraph", proficiency: 0.80, category: "ai-ml", tier: 1, linkedProjects: ["autonomous-marketing-engine"] },
  { name: "PyTorch", proficiency: 0.80, category: "ai-ml", tier: 1, linkedProjects: ["ragify-finance"] },
  { name: "RAG Pipelines", proficiency: 0.90, category: "ai-ml", tier: 1, linkedProjects: ["ragify-finance", "autonomous-marketing-engine"] },
  { name: "Multi-Agent Systems", proficiency: 0.88, category: "ai-ml", tier: 1, linkedProjects: ["autonomous-marketing-engine"] },
  { name: "LlamaIndex", proficiency: 0.78, category: "ai-ml", linkedProjects: ["ragify-finance"] },
  { name: "Hugging Face Transformers", proficiency: 0.82, category: "ai-ml", linkedProjects: ["ragify-finance"] },
  { name: "Ollama", proficiency: 0.92, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine", "ajai-kilo-code"] },
  { name: "GGUF / Quantization", proficiency: 0.85, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "FAISS", proficiency: 0.85, category: "ai-ml", linkedProjects: ["ragify-finance"] },
  { name: "pgvector", proficiency: 0.72, category: "ai-ml", linkedProjects: [] },
  { name: "LanceDB", proficiency: 0.68, category: "ai-ml", linkedProjects: [] },
  { name: "Scikit-learn", proficiency: 0.82, category: "ai-ml", linkedProjects: ["ragify-finance", "ai-video-recommender"] },
  { name: "Pandas", proficiency: 0.88, category: "ai-ml", linkedProjects: ["ragify-finance", "ai-video-recommender"] },
  { name: "NLTK / spaCy", proficiency: 0.78, category: "ai-ml", linkedProjects: ["talentscout-ai", "ragify-finance"] },
  { name: "Prompt Engineering", proficiency: 0.90, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine", "talentscout-ai", "po-comparator-gemini"] },
  { name: "Gemini Pro", proficiency: 0.82, category: "ai-ml", linkedProjects: ["ragify-finance", "talentscout-ai", "po-comparator-gemini"] },
  { name: "Sentiment Analysis (VADER + TextBlob)", proficiency: 0.80, category: "ai-ml", linkedProjects: ["talentscout-ai"] },
  { name: "Document Automation / Data Extraction", proficiency: 0.85, category: "ai-ml", linkedProjects: ["po-comparator-gemini"] },

  // ── Languages ──
  { name: "C", proficiency: 0.72, category: "languages", linkedProjects: [] },
  { name: "C++", proficiency: 0.75, category: "languages", tier: 1, linkedProjects: [] },
  { name: "Java", proficiency: 0.70, category: "languages", linkedProjects: [] },
  { name: "TypeScript", proficiency: 0.78, category: "languages", linkedProjects: ["ajai-kilo-code"] },
  { name: "JavaScript", proficiency: 0.80, category: "languages", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Bash / Shell", proficiency: 0.75, category: "languages", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "SQL", proficiency: 0.82, category: "languages", linkedProjects: ["ai-video-recommender", "network-intelligence-dashboard"] },

  // ── Core CS & Architecture ──
  { name: "DSA", proficiency: 0.80, category: "cs-fundamentals", tier: 1, linkedProjects: [] },
  { name: "OOP", proficiency: 0.85, category: "cs-fundamentals", linkedProjects: [] },
  { name: "System Design", proficiency: 0.82, category: "cs-fundamentals", tier: 1, linkedProjects: ["autonomous-marketing-engine", "network-intelligence-dashboard"] },
  { name: "Operating Systems", proficiency: 0.75, category: "cs-fundamentals", linkedProjects: [] },
  { name: "DBMS", proficiency: 0.78, category: "cs-fundamentals", linkedProjects: ["ai-video-recommender"] },
  { name: "Computer Networks", proficiency: 0.85, category: "cs-fundamentals", linkedProjects: ["network-intelligence-dashboard"] },

  // ── Networking ──
  { name: "SNMP", proficiency: 0.90, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "SSH", proficiency: 0.88, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Cisco Catalyst / Meraki", proficiency: 0.85, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Fortinet Firewalls", proficiency: 0.82, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Network Telemetry", proficiency: 0.88, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "TCP/IP / DNS / HTTP", proficiency: 0.82, category: "networking", linkedProjects: [] },
  { name: "Wireshark / Packet Analysis", proficiency: 0.72, category: "networking", linkedProjects: [] },

  // ── Backend / Ops ──
  { name: "FastAPI", proficiency: 0.88, category: "backend-ops", tier: 1, linkedProjects: ["ai-video-recommender"] },
  { name: "Node.js", proficiency: 0.75, category: "backend-ops", linkedProjects: [] },
  { name: "PostgreSQL", proficiency: 0.78, category: "backend-ops", linkedProjects: [] },
  { name: "SQLite (Time-series)", proficiency: 0.82, category: "backend-ops", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Docker", proficiency: 0.78, category: "backend-ops", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "n8n Orchestration", proficiency: 0.90, category: "backend-ops", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "Node-RED", proficiency: 0.75, category: "backend-ops", linkedProjects: [] },
  { name: "Linux / Ubuntu", proficiency: 0.82, category: "backend-ops", linkedProjects: ["talentscout-ai"] },
  { name: "Git", proficiency: 0.85, category: "backend-ops", linkedProjects: [] },
  { name: "Alembic / Migrations", proficiency: 0.78, category: "backend-ops", linkedProjects: ["ai-video-recommender"] },
  { name: "Nginx", proficiency: 0.72, category: "backend-ops", linkedProjects: ["talentscout-ai"] },
  { name: "REST API Design", proficiency: 0.85, category: "backend-ops", linkedProjects: ["ai-video-recommender", "network-intelligence-dashboard"] },

  // ── Automation ──
  { name: "PyAutoGUI", proficiency: 0.72, category: "automation", linkedProjects: [] },
  { name: "Selenium", proficiency: 0.78, category: "automation", linkedProjects: [] },
  { name: "Playwright", proficiency: 0.70, category: "automation", linkedProjects: [] },

  // ── DevTools & Frontend ──
  { name: "VSCodium Extension API", proficiency: 0.70, category: "devtools", linkedProjects: ["ajai-kilo-code"] },
  { name: "Next.js / React", proficiency: 0.75, category: "devtools", linkedProjects: [] },
  { name: "Tailwind CSS", proficiency: 0.78, category: "devtools", linkedProjects: [] },
  { name: "Streamlit", proficiency: 0.80, category: "devtools", linkedProjects: ["talentscout-ai"] },

  // ── Data ──
  { name: "Feature Engineering", proficiency: 0.78, category: "data", linkedProjects: ["ai-video-recommender"] },
  { name: "Model Evaluation (Precision/Recall/F1)", proficiency: 0.82, category: "data", linkedProjects: ["ragify-finance"] },
  { name: "NumPy", proficiency: 0.85, category: "data", linkedProjects: ["ragify-finance"] },
  { name: "Matplotlib / Seaborn", proficiency: 0.75, category: "data", linkedProjects: ["ragify-finance"] },
];

// ---------------------------------------------------------------------------
// Domains — expertise areas mapped to skills and projects
// ---------------------------------------------------------------------------

export interface PortfolioDomain {
  name: string;
  description: string;
  keySkills: string[];
  keyProjects: string[]; // slugs
}

export const portfolioDomains: PortfolioDomain[] = [
  {
    name: "AI/ML Engineering",
    description:
      "Designing autonomous agents, RAG systems, and local LLM inference pipelines. Focused on production-grade ML that runs on consumer hardware without cloud API costs.",
    keySkills: ["Python", "PyTorch", "RAG Pipelines", "Multi-Agent Systems", "GGUF / Quantization", "Local LLM Orchestration", "Ollama", "FAISS"],
    keyProjects: ["autonomous-marketing-engine", "ragify-finance", "talentscout-ai"],
  },
  {
    name: "Enterprise Networking",
    description:
      "Real-time network telemetry and monitoring using SNMP/SSH collectors across Cisco and Fortinet hardware. Cisco Black Belt certified.",
    keySkills: ["SNMP", "SSH", "Cisco Catalyst / Meraki", "Fortinet Firewalls", "Network Telemetry", "TCP/IP / DNS / HTTP"],
    keyProjects: ["network-intelligence-dashboard"],
  },
  {
    name: "Intelligent Automation",
    description:
      "Building end-to-end automation pipelines using n8n, Node-RED, and agentic workflows. Specializing in zero-human-in-the-loop content and data pipelines.",
    keySkills: ["n8n Orchestration", "Node-RED", "Prompt Engineering", "Multi-Agent Systems", "Selenium", "PyAutoGUI"],
    keyProjects: ["autonomous-marketing-engine"],
  },
  {
    name: "Backend & MLOps",
    description:
      "Production-grade API development with FastAPI, database management, containerized deployments. Bridging ML models and software engineering.",
    keySkills: ["FastAPI", "Docker", "SQLite (Time-series)", "Alembic / Migrations", "Git", "Linux / Ubuntu", "PostgreSQL"],
    keyProjects: ["network-intelligence-dashboard", "ai-video-recommender"],
  },
  {
    name: "Developer Tools & Local AI",
    description:
      "Building IDE extensions and developer tooling powered by local LLMs. Replacing cloud-dependent AI assistants with sovereign, privacy-first alternatives.",
    keySkills: ["TypeScript", "VSCodium Extension API", "Local LLM Orchestration", "Ollama"],
    keyProjects: ["ajai-kilo-code"],
  },
  {
    name: "CS Fundamentals",
    description:
      "Strong foundation in core computer science — data structures, algorithms, system design, and OS internals. B.Tech CS with hands-on application across all projects.",
    keySkills: ["DSA", "OOP", "System Design", "Operating Systems", "DBMS", "Computer Networks"],
    keyProjects: ["network-intelligence-dashboard", "ai-video-recommender"],
  },
];

// ---------------------------------------------------------------------------
// Certifications — extracted from LinkedIn resume PDF
// ---------------------------------------------------------------------------

export interface PortfolioCertification {
  title: string;
  issuer?: string;
  relevance: string;
}

export const portfolioCertifications: PortfolioCertification[] = [
  {
    title: "Cisco Black Belt",
    issuer: "Cisco",
    relevance: "Validates deep expertise in enterprise switching, VLAN segmentation, ACLs, and HA deployments across Catalyst and Nexus platforms.",
  },
  {
    title: "AI Expert",
    relevance: "Broad AI/ML competency certification covering model development, evaluation, and deployment patterns.",
  },
  {
    title: "Certified Data Scientist",
    relevance: "Validates data preprocessing, feature engineering, statistical modeling, and ML pipeline design skills.",
  },
  {
    title: "Building Gen AI App: 12+ Hands-on Projects with Gemini Pro",
    issuer: "Google / Coursera",
    relevance: "Hands-on generative AI development using Google Gemini Pro across 12+ production-style projects.",
  },
  {
    title: "AI Workplace Proficiency Certification",
    relevance: "Enterprise AI integration and workflow automation proficiency for modern business operations.",
  },
  {
    title: "EOXS Experience Certificate",
    issuer: "EOXS",
    relevance: "Validated hands-on AI generalist work including Gemini-powered PO comparator development and document automation pipelines.",
  },
  {
    title: "Rubix Certification",
    issuer: "Rubixe",
    relevance: "Certified AI & Data Science consulting proficiency covering RAG benchmarking, model evaluation, and production ML pipelines.",
  },
];

// ---------------------------------------------------------------------------
// Projects — all 6, including the 2 not in fallback-data
// ---------------------------------------------------------------------------

export interface PortfolioProjectSummary {
  slug: string;
  title: string;
  category: string;
  oneLiner: string;
  coreTech: string[];
  /** Whether this project has a full Project object in fallback-data */
  hasFallbackData: boolean;
}

export const portfolioProjects: PortfolioProjectSummary[] = [
  {
    slug: "autonomous-marketing-engine",
    title: "Autonomous Marketing Engine",
    category: "Multi-Agent Systems",
    oneLiner: "Fully autonomous n8n pipeline that researches, evaluates, generates, and publishes LinkedIn posts using local LLMs on RTX 4060.",
    coreTech: ["n8n", "Ollama", "Python", "RTX 4060", "LinkedIn API"],
    hasFallbackData: true,
  },
  {
    slug: "network-intelligence-dashboard",
    title: "Network Intelligence Dashboard",
    category: "Enterprise Networking",
    oneLiner: "Real-time monitoring platform polling Cisco switches and Fortinet firewalls via custom SNMP/SSH collectors into SQLite time-series.",
    coreTech: ["Python", "SNMP", "SSH", "SQLite", "Cisco", "Fortinet"],
    hasFallbackData: true,
  },
  {
    slug: "ragify-finance",
    title: "RAGify-Finance",
    category: "AI Benchmarking",
    oneLiner: "RAG benchmarking suite comparing Cohere vs HuggingFace embeddings against FinanceBench for auditable financial Q&A accuracy.",
    coreTech: ["Python", "FAISS", "Cohere", "HuggingFace", "Gemini"],
    hasFallbackData: true,
  },
  {
    slug: "talentscout-ai",
    title: "TalentScout AI",
    category: "AI Applications",
    oneLiner: "Multilingual recruitment assistant generating context-aware interview questions with dual-engine sentiment analysis across 6 languages.",
    coreTech: ["Python", "Gemini Pro", "VADER", "TextBlob", "GCP"],
    hasFallbackData: true,
  },
  {
    slug: "ajai-kilo-code",
    title: "AJAI / Kilo CODE",
    category: "Developer Tools",
    oneLiner: "Lightweight VSCodium AI coding assistant replacing GitHub Copilot with local LLM inference — zero telemetry, zero token limits.",
    coreTech: ["TypeScript", "VSCodium Extension API", "Ollama", "Local LLM"],
    hasFallbackData: false,
  },
  {
    slug: "po-comparator-gemini",
    title: "PO Comparator with Gemini AI",
    category: "Intelligent Automation",
    oneLiner: "Automated purchase order comparison tool leveraging Gemini AI for document parsing, field extraction, and discrepancy detection across vendor invoices.",
    coreTech: ["Python", "Gemini Pro", "Document Automation", "Data Extraction"],
    hasFallbackData: false,
  },
  {
    slug: "ai-video-recommender",
    title: "AI Video Recommendation System",
    category: "Backend & MLOps",
    oneLiner: "High-performance recommendation engine served via FastAPI with decoupled ML training pipelines and SQL/Alembic data management.",
    coreTech: ["Python", "FastAPI", "ML Pipelines", "SQL", "Alembic"],
    hasFallbackData: false,
  },
];

// ---------------------------------------------------------------------------
// Experience — enriched with skill tags (references fallback IDs)
// ---------------------------------------------------------------------------

export interface PortfolioExperienceEntry {
  fallbackId: string;
  company: string;
  role: string;
  period: string;
  keySkills: string[];
  keyProjects: string[]; // slugs built during this role
}

export const portfolioExperience: PortfolioExperienceEntry[] = [
  {
    fallbackId: "fallback-exp-1",
    company: "Nio Stars Technologies LLP",
    role: "Junior Software Developer",
    period: "Jan 2026 – Present",
    keySkills: ["Python", "SNMP", "SSH", "Ollama", "n8n Orchestration", "Multi-Agent Systems", "Local LLM Orchestration"],
    keyProjects: ["autonomous-marketing-engine", "network-intelligence-dashboard"],
  },
  {
    fallbackId: "fallback-exp-2",
    company: "EOXS",
    role: "AI Generalist",
    period: "May 2025 – Oct 2025",
    keySkills: ["Prompt Engineering", "Document Automation / Data Extraction", "Python", "Gemini Pro"],
    keyProjects: ["po-comparator-gemini"],
  },
  {
    fallbackId: "fallback-exp-3",
    company: "Rubixe",
    role: "AI & Data Science Consultant Intern",
    period: "Sep 2024 – Apr 2025",
    keySkills: ["Python", "PyTorch", "Feature Engineering", "Model Evaluation (Precision/Recall/F1)"],
    keyProjects: ["ragify-finance"],
  },
  {
    fallbackId: "fallback-exp-4",
    company: "sukamsys",
    role: "Intern",
    period: "Aug 2023 – Mar 2024",
    keySkills: ["Python", "Git"],
    keyProjects: [],
  },
];
