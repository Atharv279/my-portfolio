import type {
  Profile,
  Education,
  Experience,
  TechStackData,
  Project,
  MethodologyData,
  HardwareOpsData,
} from "./types";

// =============================================================================
// Radar preset data for CyberThreatRadar visualizer
// =============================================================================

export interface RadarAxis {
  label: string;
  value: number; // 0–1
}

export interface RadarPreset {
  axes: RadarAxis[];
  accentColor: string;
}

export const radarPresets: Record<string, RadarPreset> = {
  "network-security": {
    axes: [
      { label: "Network Telemetry", value: 0.92 },
      { label: "Threat Intel Feeds", value: 0.85 },
      { label: "Firewall Audit", value: 0.88 },
      { label: "Anomaly Detection", value: 0.70 },
      { label: "SNMP Coverage", value: 0.95 },
      { label: "Log Analysis", value: 0.65 },
    ],
    accentColor: "rgba(6, 182, 212, %OPACITY%)", // cyan
  },
  "full-stack": {
    axes: [
      { label: "AI/ML Pipelines", value: 0.90 },
      { label: "RAG Systems", value: 0.88 },
      { label: "Backend APIs", value: 0.85 },
      { label: "Networking", value: 0.92 },
      { label: "Local Inference", value: 0.95 },
      { label: "Automation", value: 0.82 },
    ],
    accentColor: "rgba(139, 92, 246, %OPACITY%)", // violet
  },
};

// =============================================================================
// Static fallback data extracted from hardcoded component content.
// Used when Sanity is unreachable or during local development without CMS.
// =============================================================================

export const fallbackProfile: Profile = {
  _id: "fallback-profile",
  _type: "profile",
  name: "Atharv Patil",
  tagline: "Python Developer & AI Engineer",
  bio: "B.Tech CS graduate bridging complex ML models and production-grade software. Specializing in autonomous agents, RAG systems, and enterprise AI workflows.",
  location: "Pune, India",
  status: "Available for opportunities",
  currentRole: "Junior Software Developer @ Nio Stars Technologies",
  socialLinks: [
    { platform: "github", url: "https://github.com/Atharv279", label: "GitHub" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/atharv-patil-bab53a284", label: "LinkedIn" },
  ],
  stats: [
    { value: "3+", label: "Roles" },
    { value: "83%", label: "Accuracy" },
    { value: "$0", label: "Cloud Cost" },
  ],
  professionalSummary: [
    "As a Junior Software Developer and Team Lead at Nio Stars Technologies, I specialize in bridging the gap between complex machine learning models and production-grade software. My focus is centered on AI/ML Engineering and Intelligent Automation\u2014specifically designing autonomous agents, RAG-based systems, and enterprise AI workflows that solve real-world business challenges.",
    "I have led teams to develop high-impact AI tools, including custom RAG-based financial bots and automated document comparators that achieved an 83% accuracy rate. By combining a deep technical understanding of MLOps and Python with a leadership-driven approach, I ensure that every solution is not only innovative but also scalable and impactful for the modern enterprise.",
  ],
};

export const fallbackEducation: Education[] = [
  {
    _id: "fallback-edu-1",
    _type: "education",
    degree: "Bachelor of Technology \u2014 Computer Science",
    institution: "Nagpur University",
    period: "2021 \u2013 2024",
    description:
      "Core coursework in data structures, algorithms, operating systems, and machine learning. Final-year projects focused on applied AI and network systems engineering.",
    sortOrder: 0,
  },
  {
    _id: "fallback-edu-2",
    _type: "education",
    degree: "Diploma \u2014 Computer Science",
    institution: "Cusrow Wadia Institute of Technology",
    period: "2018 \u2013 2021",
    description:
      "Foundation in programming, networking fundamentals, and systems administration that established early hands-on engineering skills.",
    sortOrder: 1,
  },
];

export const fallbackExperiences: Experience[] = [
  {
    _id: "fallback-exp-1",
    _type: "experience",
    company: "Nio Stars Technologies LLP",
    role: "Junior Software Developer",
    period: "Jan 2026 \u2013 Present",
    description:
      "Currently building real-time data acquisition systems and AI-driven automation pipelines. Leading development of intelligent internal tools that combine SNMP/SSH network telemetry with local LLM inference for autonomous monitoring and content generation workflows.",
    sortOrder: 0,
  },
  {
    _id: "fallback-exp-2",
    _type: "experience",
    company: "EOXS",
    role: "AI Generalist",
    period: "May 2025 \u2013 Oct 2025",
    description:
      "Developed LLM-powered internal tools for document automation and discrepancy detection. Designed prompt engineering pipelines for GenAI-driven ERP modules. Prototyped workflows for PDF parsing, email automation, and structured data extraction across enterprise operations.",
    sortOrder: 1,
  },
  {
    _id: "fallback-exp-3",
    _type: "experience",
    company: "Rubixe",
    role: "AI & Data Science Consultant Intern",
    period: "Sep 2024 \u2013 Apr 2025",
    description:
      "Developed Proof-of-Concept solutions integrating ML models and data pipelines. Applied data preprocessing, feature engineering, and model evaluation techniques to real-world business datasets for client consulting engagements.",
    sortOrder: 2,
  },
  {
    _id: "fallback-exp-4",
    _type: "experience",
    company: "sukamsys",
    role: "Intern",
    period: "Aug 2023 \u2013 Mar 2024",
    description:
      "Early career internship focused on systems engineering fundamentals. Gained hands-on experience with enterprise software workflows, contributing to internal tooling and infrastructure support during final-year studies.",
    sortOrder: 3,
  },
];

export const fallbackTechStack: TechStackData = {
  _id: "fallback-techstack",
  _type: "techStack",
  glowColor: "rgba(250, 204, 21, 0.12)",
  trending: [
    { name: "Python", icon: "Cpu" },
    { name: "FastAPI", icon: "Zap" },
    { name: "PyTorch", icon: "BrainCircuit" },
    { name: "Ollama", icon: "Box" },
    { name: "n8n", icon: "Workflow" },
    { name: "Node-RED", icon: "Network" },
    { name: "Docker", icon: "Container" },
  ],
  arsenal: [
    {
      title: "AI / ML",
      subtitle: "Models, pipelines & inference",
      icon: "BrainCircuit",
      accentBorder: "border-amber-500/25",
      items: ["RAG Pipelines", "Multi-Agent Systems", "GGUF Quantization", "Local LLM Optimization"],
    },
    {
      title: "Networking",
      subtitle: "Enterprise telemetry & security",
      icon: "Shield",
      accentBorder: "border-cyan-500/25",
      items: ["SNMP", "SSH Collectors", "Cisco Catalyst / Meraki", "Fortinet Firewalls"],
      footnote: "Cisco Black Belt Certified",
    },
    {
      title: "Backend / Ops",
      subtitle: "Infrastructure & tooling",
      icon: "Terminal",
      accentBorder: "border-violet-500/25",
      items: ["Python", "Node.js", "SQLite (Time-series)", "Linux / Kali", "Git", "CI/CD"],
    },
  ],
};

export const fallbackMarketingProject: Project = {
  _id: "fallback-project-marketing",
  _type: "project",
  title: "Autonomous Marketing Engine",
  slug: "autonomous-marketing-engine",
  category: "Multi-Agent Systems",
  badge: "Zero API Cost",
  description:
    "A fully autonomous pipeline that researches cybersecurity feeds, evaluates relevance, and publishes enterprise-grade LinkedIn posts\u2014powered entirely by local LLM inference on an RTX\u00a04060 via Ollama, orchestrated through n8n multi-agent workflows.",
  tags: [
    { label: "n8n", icon: "Workflow" },
    { label: "Ollama", icon: "Box" },
    { label: "Python", icon: "Cpu" },
    { label: "Agentic AI", icon: "Bot" },
  ],
  glowColor: "rgba(139, 92, 246, 0.15)",
  sourceUrl: "https://github.com/Atharv279",
  expandedSections: [
    {
      icon: "Route",
      title: "Agentic Workflow",
      accentColor: "text-violet-400",
      introText:
        "The engine operates as a multi-agent DAG orchestrated through n8n, where each node is a specialized autonomous agent with a single responsibility. All LLM inference runs locally via Ollama, entirely eliminating cloud API token costs.",
      pipelineSteps: [
        {
          step: "Agent 01",
          title: "Research Agent",
          description:
            "Scrapes live cybersecurity threat intelligence feeds using custom Python collectors. Aggregates raw articles, CVE disclosures, and vendor advisories into a structured JSON payload.",
          accentColor: "border-violet-500/40",
        },
        {
          step: "Agent 02",
          title: "Evaluation Agent",
          description:
            "Receives the research payload and runs it through a local LLM (Ollama) to score relevance, novelty, and enterprise impact. Articles below the confidence threshold are discarded, preventing low-quality content from entering the pipeline.",
          accentColor: "border-violet-500/30",
        },
        {
          step: "Agent 03",
          title: "Generation Agent",
          description:
            "Takes the highest-scored intel and generates a polished LinkedIn post. The prompt pipeline enforces enterprise tone, includes relevant hashtags, and structures the copy for maximum engagement. Output is formatted for the LinkedIn Publishing API.",
          accentColor: "border-violet-500/20",
        },
        {
          step: "Agent 04",
          title: "Refinement Loop",
          description:
            "A self-critique pass re-evaluates the generated post against engagement heuristics. If the score falls below threshold, the content loops back to the Generation Agent for revision before final publish.",
          accentColor: "border-violet-500/10",
        },
      ],
    },
    {
      icon: "Workflow",
      title: "Infrastructure",
      accentColor: "text-violet-400",
      infoCards: [
        {
          title: "n8n Orchestration",
          text: "Self-hosted n8n instance manages the entire DAG. Webhook triggers initiate the pipeline on a cron schedule. Error-handling nodes automatically retry failed steps with exponential backoff.",
        },
        {
          title: "Local LLM (Ollama + RTX 4060)",
          text: "All inference runs on a consumer RTX 4060 (8 GB VRAM). Model quantization (GGUF Q4_K_M) keeps memory usage under 6 GB, leaving headroom for concurrent evaluation and generation tasks.",
        },
        {
          title: "LinkedIn API Integration",
          text: "Direct OAuth2 integration with the LinkedIn Publishing API. Posts are auto-formatted with rich-text markup and scheduled for optimal engagement windows based on historical analytics.",
        },
      ],
    },
  ],
};

export const fallbackNetworkProject: Project = {
  _id: "fallback-project-network",
  _type: "project",
  title: "Network Intelligence Dashboard",
  slug: "network-intelligence-dashboard",
  category: "Enterprise Networking",
  badge: "Real-Time Telemetry",
  description:
    "Enterprise-grade monitoring platform polling Cisco switches and Fortinet firewalls via custom SNMP/SSH collectors. Aggregates high-frequency time-series data into a unified dashboard, architected to feed local LLMs for autonomous anomaly detection.",
  tags: [
    { label: "SNMP/SSH", icon: "Shield" },
    { label: "Python", icon: "Activity" },
    { label: "Cisco", icon: "Network" },
    { label: "SQLite", icon: "Database" },
  ],
  glowColor: "rgba(6, 182, 212, 0.15)",
  sourceUrl: "https://github.com/Atharv279",
  expandedSections: [
    {
      icon: "Layers",
      title: "Architecture",
      accentColor: "text-cyan-400",
      detailItems: [
        {
          label: "Collector Layer",
          text: "Modular collectors/ directory with dedicated SNMP and SSH adapter modules. Each collector implements a standardized polling interface, querying Cisco IOS-XE switches and Fortinet FortiGate firewalls on configurable intervals. Rate-limiting logic prevents device overload during high-frequency polling cycles.",
        },
        {
          label: "Data Ingestion Pipeline",
          text: "Raw telemetry flows into a Python backend (app.py) that normalizes SNMP MIB responses and SSH command outputs into structured ORM models (models.py). A custom SQLite schema optimized for time-series ingestion handles high-write throughput, storing interface counters, CPU/memory utilization, and security event logs.",
        },
        {
          label: "Aggregation & Visualization",
          text: "The backend exposes REST endpoints consumed by a JavaScript frontend. Real-time charts render throughput, latency, and error-rate metrics. Threshold-based alerting flags anomalies before they cascade into outages.",
        },
        {
          label: "AIOps Integration Path",
          text: "The ORM-structured telemetry data is designed to pipe directly into local LLMs served via Ollama on consumer RTX GPUs. This enables autonomous anomaly detection without sending sensitive network data to external cloud APIs.",
        },
      ],
    },
    {
      icon: "Network",
      title: "Data Flow",
      accentColor: "text-cyan-400",
      pipelineSteps: [
        {
          step: "01",
          title: "Poll",
          description:
            "SNMP GET/WALK and SSH exec commands issued to Cisco and Fortinet hardware on 30-second intervals.",
          accentColor: "border-cyan-500/40",
        },
        {
          step: "02",
          title: "Normalize",
          description: "Raw MIB OIDs and CLI output parsed into typed Python dataclasses via the ORM layer.",
          accentColor: "border-cyan-500/30",
        },
        {
          step: "03",
          title: "Store",
          description: "Time-series records written to SQLite with indexed timestamps for sub-millisecond range queries.",
          accentColor: "border-cyan-500/20",
        },
        {
          step: "04",
          title: "Visualize & Alert",
          description:
            "Frontend renders live dashboards. Threshold breaches trigger alerts; data exports feed the local anomaly detection pipeline.",
          accentColor: "border-cyan-500/10",
        },
      ],
    },
  ],
};

export const fallbackMethodology: MethodologyData = {
  _id: "fallback-methodology",
  _type: "methodology",
  glowColor: "rgba(251, 146, 60, 0.15)",
  phases: [
    {
      label: "Perceive",
      icon: "Eye",
      brief: "Observe & ingest",
      detail:
        "Map the full system landscape before writing a single line. Ingest requirements, audit existing codebases, profile infrastructure, and identify data sources. For the Network Dashboard this meant cataloguing every SNMP MIB and SSH command tree across Cisco and Fortinet devices.",
    },
    {
      label: "Reason",
      icon: "Brain",
      brief: "Analyze & evaluate",
      detail:
        "Evaluate trade-offs against constraints. Choose architectures by measuring latency, cost, and maintainability. For the Marketing Engine this meant benchmarking quantized LLM models on the RTX 4060 to find the optimal accuracy-to-VRAM ratio before committing to a pipeline design.",
    },
    {
      label: "Act",
      icon: "Play",
      brief: "Build & deploy",
      detail:
        "Execute with modular, testable components. Every system ships with clean separation of concerns: collectors are decoupled from storage, inference is decoupled from orchestration. CI pipelines validate each module independently before integration.",
    },
    {
      label: "Refine",
      icon: "RotateCcw",
      brief: "Measure & iterate",
      detail:
        "Post-deployment, instrument everything. Monitor inference latency, track content engagement scores, and alert on anomaly thresholds. Feed metrics back into the Perceive phase to close the loop, ensuring each iteration produces measurably better outputs.",
    },
  ],
  whyItWorks: [
    {
      title: "Enterprise Reliability",
      text: "The loop eliminates assumptions. Every architectural decision is backed by data gathered in Perceive and validated in Refine. Production systems built this way consistently achieve higher uptime because failure modes are mapped before deployment, not discovered after.",
    },
    {
      title: "Codebase Maintainability",
      text: "Act mandates modular separation. Collectors, models, services, and orchestration layers live in isolated directories with clean interfaces. This means any component can be swapped, scaled, or refactored without touching the rest of the system.",
    },
    {
      title: "Continuous Improvement",
      text: "Refine closes the loop by feeding production metrics back into the next Perceive cycle. This is not theoretical \u2014 the Marketing Engine\u2019s engagement scores improved 40% over three iterations of this exact loop.",
    },
  ],
};

export const fallbackHardwareOps: HardwareOpsData = {
  _id: "fallback-hardware-ops",
  _type: "hardwareOps",
  headerIcon: "Server",
  headerLabel: "Hardware & Infrastructure",
  glowColor: "rgba(244, 63, 94, 0.15)",
  capabilities: [
    { label: "RTX 4060 Local Inference", icon: "Gpu" },
    { label: "Zero Cloud API Costs", icon: "Zap" },
    { label: "Enterprise Deployments", icon: "Server" },
  ],
  certificationLabel: "Cisco Black Belt Certified",
  expandedSections: [
    {
      icon: "Settings",
      title: "RTX 4060 Optimizations",
      accentColor: "text-rose-400",
      detailItems: [
        {
          label: "VRAM Management",
          text: "All models quantized to GGUF Q4_K_M format, reducing the memory footprint to under 6 GB on the 8 GB RTX 4060. This leaves headroom for concurrent inference tasks and prevents OOM crashes during batch processing.",
        },
        {
          label: "Batch Scheduling",
          text: "Custom Python orchestration layer queues inference requests and processes them sequentially, preventing GPU context-switching overhead. Priority queuing ensures time-sensitive tasks (like anomaly detection) preempt batch content generation.",
        },
        {
          label: "Ollama Configuration",
          text: "Ollama runtime configured with num_gpu=1, num_thread=8, and context window tuned to 4096 tokens for the optimal throughput-to-quality ratio. GPU layer offloading set to maximum for fully GPU-accelerated inference.",
        },
        {
          label: "Cost Impact",
          text: "This local-first architecture eliminates cloud API spend entirely. At equivalent throughput, the setup replaces approximately $200-400/month in OpenAI API costs with a one-time hardware investment.",
        },
      ],
    },
    {
      icon: "ShieldCheck",
      title: "Cisco Black Belt Certification",
      accentColor: "text-rose-400",
      detailItems: [
        {
          label: "Certification Scope",
          text: "Cisco Black Belt certifications validate deep expertise in enterprise networking architecture, covering advanced switch configuration, VLAN segmentation, access control lists, and high-availability deployments across Catalyst and Nexus platforms.",
        },
        {
          label: "Deployment Experience",
          text: "Hands-on deployment of Cisco switching infrastructure in enterprise environments, including spanning-tree optimization, port-channel aggregation, and integration with Fortinet FortiGate firewalls for unified threat management.",
        },
        {
          label: "Applied to Projects",
          text: "This certification directly informed the Network Intelligence Dashboard design. Understanding the hardware at the protocol level (SNMP MIB structures, SSH command trees) enabled the building of purpose-built collectors that poll without overloading production switches.",
        },
      ],
    },
  ],
};

export const fallbackRAGifyProject: Project = {
  _id: "fallback-project-ragify",
  _type: "project",
  title: "RAGify-Finance",
  slug: "ragify-finance",
  category: "AI Benchmarking",
  badge: "Evaluation-Driven",
  description:
    "Enterprise-grade RAG system and benchmarking suite for financial document analysis. Compares commercial vs open-source embedding models against FinanceBench to mathematically prove optimal retrieval accuracy in regulated financial Q&A.",
  tags: [
    { label: "Python", icon: "Cpu" },
    { label: "RAG", icon: "Search" },
    { label: "FAISS", icon: "Database" },
    { label: "Hugging Face", icon: "BrainCircuit" },
  ],
  glowColor: "rgba(245, 158, 11, 0.15)",
  sourceUrl: "https://github.com/Atharv279",
  expandedSections: [
    {
      icon: "Layers",
      title: "Architecture",
      accentColor: "text-amber-400",
      detailItems: [
        {
          label: "Vector Retrieval",
          text: "FAISS (Facebook AI Similarity Search) optimized for fast, high-volume similarity queries across financial document embeddings. Supports both Cohere and Hugging Face all-MiniLM-L6-v2 embedding models for head-to-head comparison.",
        },
        {
          label: "Dual Embedding Comparison",
          text: "Side-by-side evaluation of commercial (Cohere) vs open-source (Hugging Face) embeddings. Each model processes identical FinanceBench queries to isolate performance differences in precision, recall, and semantic accuracy.",
        },
        {
          label: "Inference & Generation",
          text: "Google Gemini handles the generation layer, producing answers grounded in the retrieved financial context. The decoupled architecture allows swapping the LLM without touching the retrieval pipeline.",
        },
      ],
    },
    {
      icon: "BarChart3",
      title: "Evaluation Pipeline",
      accentColor: "text-amber-400",
      detailItems: [
        {
          label: "Metrics Suite",
          text: "Rigorous evaluation using Precision, Recall, F1-score, and Cosine Similarity against ground-truth FinanceBench answers. Each metric is computed per-query and aggregated to produce statistically significant model comparisons.",
        },
        {
          label: "Hallucination Prevention",
          text: "Addresses the critical issue of LLM hallucination in regulated financial contexts. The benchmark pipeline mathematically proves which embedding model extracts financial insights most reliably, reducing risk in production deployments.",
        },
        {
          label: "Enterprise Alignment",
          text: "Implements Evaluation-Driven Development (EDD)\u2014a 2026 enterprise trend. Moves beyond basic RAG prototypes to provide measurable, auditable accuracy guarantees required by financial compliance teams.",
        },
      ],
    },
  ],
};

export const fallbackTalentProject: Project = {
  _id: "fallback-project-talent",
  _type: "project",
  title: "TalentScout AI",
  slug: "talentscout-ai",
  category: "AI Applications",
  badge: "Multilingual NLP",
  description:
    "Intelligent multilingual recruitment assistant that automates technical interviews by generating context-aware questions tailored to each candidate\u2019s tech stack while performing real-time dual-engine sentiment analysis across 6 languages.",
  tags: [
    { label: "Python", icon: "Cpu" },
    { label: "Gemini", icon: "BrainCircuit" },
    { label: "NLP", icon: "MessageSquare" },
    { label: "GCP", icon: "Globe" },
  ],
  glowColor: "rgba(56, 189, 248, 0.15)",
  sourceUrl: "https://github.com/Atharv279",
  expandedSections: [
    {
      icon: "Route",
      title: "NLP Pipeline",
      accentColor: "text-sky-400",
      detailItems: [
        {
          label: "Context-Aware Question Generation",
          text: "Google Gemini Pro dynamically generates structured technical questions mapped directly to a candidate\u2019s specific technology stack. Eliminates generic, static interview formats with prompt pipelines that adapt in real-time.",
        },
        {
          label: "Dual-Engine Sentiment Analysis",
          text: "Combines VADER (NLTK) and TextBlob for parallel sentiment tracking. VADER handles social-media-style language while TextBlob provides polarity/subjectivity scores, giving recruiters actionable biometric feedback on candidate confidence.",
        },
        {
          label: "Multilingual Support",
          text: "Real-time translation across 6 languages via googletrans with intelligent caching. Stateful handling preserves conversation context across language switches, ensuring consistent technical assessment regardless of the candidate\u2019s native language.",
        },
      ],
    },
    {
      icon: "Globe",
      title: "Deployment & Infrastructure",
      accentColor: "text-sky-400",
      detailItems: [
        {
          label: "GCP Compute Engine",
          text: "Production deployment on Google Cloud Platform using Ubuntu, Nginx reverse proxy, and systemd service management for high availability. Auto-restart on failure ensures 99.9% uptime for continuous recruitment operations.",
        },
        {
          label: "Streamlit UI",
          text: "Clean, recruiter-friendly interface built with Streamlit. Real-time sentiment gauges, question history panels, and exportable candidate profiles make the tool immediately usable without technical training.",
        },
        {
          label: "Enterprise Integration",
          text: "Designed for drop-in integration with existing ATS (Applicant Tracking Systems). Structured JSON output from each session feeds directly into HR analytics pipelines for long-term hiring pattern analysis.",
        },
      ],
    },
  ],
};
