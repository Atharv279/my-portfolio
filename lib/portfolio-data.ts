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

export interface PortfolioSkill {
  name: string;
  proficiency: number; // 0–1
  category: "ai-ml" | "networking" | "backend-ops" | "devtools" | "data";
  linkedProjects: string[]; // project slugs
}

export const portfolioSkills: PortfolioSkill[] = [
  // AI / ML
  { name: "Python", proficiency: 0.95, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine", "network-intelligence-dashboard", "ragify-finance", "ai-research-agent", "ai-invoice-master", "pneumonia-xray"] },
  { name: "PyTorch", proficiency: 0.80, category: "ai-ml", linkedProjects: ["ragify-finance"] },
  { name: "RAG Pipelines", proficiency: 0.90, category: "ai-ml", linkedProjects: ["ragify-finance", "autonomous-marketing-engine"] },
  { name: "Multi-Agent Systems", proficiency: 0.88, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "GGUF Quantization", proficiency: 0.85, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "Local LLM Optimization", proficiency: 0.92, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine", "ai-research-agent"] },
  { name: "Prompt Engineering", proficiency: 0.90, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine", "ai-invoice-master"] },
  { name: "FAISS / Vector Databases", proficiency: 0.85, category: "ai-ml", linkedProjects: ["ragify-finance"] },
  { name: "Ollama", proficiency: 0.92, category: "ai-ml", linkedProjects: ["autonomous-marketing-engine", "ai-research-agent"] },
  { name: "Gemini Pro", proficiency: 0.82, category: "ai-ml", linkedProjects: ["ragify-finance", "ai-invoice-master"] },
  { name: "Document Automation / Data Extraction", proficiency: 0.85, category: "ai-ml", linkedProjects: ["ai-invoice-master"] },

  // Networking
  { name: "SNMP", proficiency: 0.90, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "SSH Collectors", proficiency: 0.88, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Cisco Catalyst / Meraki", proficiency: 0.85, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Fortinet Firewalls", proficiency: 0.82, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Network Telemetry", proficiency: 0.88, category: "networking", linkedProjects: ["network-intelligence-dashboard"] },

  // Backend / Ops
  { name: "FastAPI", proficiency: 0.88, category: "backend-ops", linkedProjects: [] },
  { name: "Node.js", proficiency: 0.75, category: "backend-ops", linkedProjects: [] },
  { name: "SQLite (Time-series)", proficiency: 0.82, category: "backend-ops", linkedProjects: ["network-intelligence-dashboard"] },
  { name: "Docker", proficiency: 0.78, category: "backend-ops", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "n8n Orchestration", proficiency: 0.90, category: "backend-ops", linkedProjects: ["autonomous-marketing-engine"] },
  { name: "Node-RED", proficiency: 0.75, category: "backend-ops", linkedProjects: [] },
  { name: "Linux / Kali", proficiency: 0.80, category: "backend-ops", linkedProjects: [] },
  { name: "Git / CI/CD", proficiency: 0.82, category: "backend-ops", linkedProjects: [] },
  { name: "SQL / Alembic Migrations", proficiency: 0.78, category: "backend-ops", linkedProjects: [] },

  // DevTools
  { name: "TypeScript", proficiency: 0.75, category: "devtools", linkedProjects: [] },

  // Data
  { name: "Feature Engineering", proficiency: 0.78, category: "data", linkedProjects: [] },
  { name: "Model Evaluation (Precision/Recall/F1)", proficiency: 0.82, category: "data", linkedProjects: ["ragify-finance"] },

  // New skills
  { name: "Rust", proficiency: 0.70, category: "backend-ops", linkedProjects: ["google-meet-transcriber"] },
  { name: "TensorFlow", proficiency: 0.82, category: "ai-ml", linkedProjects: ["pneumonia-xray"] },
  { name: "Keras", proficiency: 0.80, category: "ai-ml", linkedProjects: ["pneumonia-xray"] },
  { name: "CNN / Computer Vision", proficiency: 0.78, category: "ai-ml", linkedProjects: ["pneumonia-xray"] },
  { name: "Tesseract OCR", proficiency: 0.75, category: "ai-ml", linkedProjects: ["ai-invoice-master"] },
  { name: "GitHub Actions", proficiency: 0.80, category: "backend-ops", linkedProjects: ["ai-research-agent"] },
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
    keySkills: ["Python", "PyTorch", "RAG Pipelines", "Multi-Agent Systems", "GGUF Quantization", "Local LLM Optimization", "Ollama", "FAISS / Vector Databases"],
    keyProjects: ["autonomous-marketing-engine", "ragify-finance", "ai-research-agent"],
  },
  {
    name: "Enterprise Networking",
    description:
      "Real-time network telemetry and monitoring using SNMP/SSH collectors across Cisco and Fortinet hardware. Cisco Black Belt certified.",
    keySkills: ["SNMP", "SSH Collectors", "Cisco Catalyst / Meraki", "Fortinet Firewalls", "Network Telemetry"],
    keyProjects: ["network-intelligence-dashboard"],
  },
  {
    name: "Intelligent Automation",
    description:
      "Building end-to-end automation pipelines using n8n, Node-RED, and agentic workflows. Specializing in zero-human-in-the-loop content and data pipelines.",
    keySkills: ["n8n Orchestration", "Node-RED", "Prompt Engineering", "Multi-Agent Systems", "Document Automation / Data Extraction"],
    keyProjects: ["autonomous-marketing-engine", "ai-research-agent"],
  },
  {
    name: "Backend & MLOps",
    description:
      "Production-grade API development with FastAPI, database management, containerized deployments. Bridging ML models and software engineering.",
    keySkills: ["FastAPI", "Docker", "SQLite (Time-series)", "SQL / Alembic Migrations", "Git / CI/CD", "Linux / Kali"],
    keyProjects: ["network-intelligence-dashboard"],
  },
  {
    name: "Computer Vision & Deep Learning",
    description:
      "Building CNNs for image classification and OCR-powered document extraction. Applying deep learning to healthcare diagnostics and enterprise document automation.",
    keySkills: ["TensorFlow", "Keras", "CNN / Computer Vision", "Tesseract OCR", "Gemini Pro"],
    keyProjects: ["pneumonia-xray", "ai-invoice-master"],
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
// Projects — all 7, with fallback-data entries
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
    keySkills: ["Python", "SNMP", "SSH Collectors", "Ollama", "n8n Orchestration", "Multi-Agent Systems", "Local LLM Optimization", "GitHub Actions"],
    keyProjects: ["autonomous-marketing-engine", "network-intelligence-dashboard", "ai-research-agent"],
  },
  {
    fallbackId: "fallback-exp-2",
    company: "EOXS",
    role: "AI Generalist",
    period: "May 2025 – Oct 2025",
    keySkills: ["Prompt Engineering", "Document Automation / Data Extraction", "Python", "Gemini Pro", "Tesseract OCR"],
    keyProjects: ["ai-invoice-master"],
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
    keySkills: ["Python", "Git / CI/CD"],
    keyProjects: [],
  },
];
