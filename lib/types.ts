// =============================================================================
// CMS Content Types — shared between Sanity schemas, fetch layer, and components
// =============================================================================

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email";
  url: string;
  label: string;
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface Profile {
  _id: string;
  _type: "profile";
  name: string;
  tagline: string;
  bio: string;
  location: string;
  status: string;
  currentRole: string;
  socialLinks: SocialLink[];
  professionalSummary: string[];
  stats?: ProfileStat[];
}

export interface Education {
  _id: string;
  _type: "education";
  degree: string;
  institution: string;
  period: string;
  description: string;
  sortOrder: number;
}

export interface Experience {
  _id: string;
  _type: "experience";
  company: string;
  role: string;
  period: string;
  description: string;
  details?: string;
  sortOrder: number;
}

export interface Skill {
  _id: string;
  _type: "skill";
  name: string;
  icon: string;
  category: "trending" | "ai-ml" | "networking" | "backend-ops";
}

export interface ArsenalCategory {
  title: string;
  subtitle: string;
  icon: string;
  accentBorder: string;
  items: string[];
  footnote?: string;
}

export interface TechStackData {
  _id: string;
  _type: "techStack";
  trending: { name: string; icon: string }[];
  arsenal: ArsenalCategory[];
  glowColor: string;
}

export interface ProjectTag {
  label: string;
  icon: string;
}

export interface PipelineStepData {
  step: string;
  title: string;
  description: string;
  accentColor: string;
}

export interface DetailItemData {
  label: string;
  text: string;
}

export interface InfoCardData {
  title: string;
  text: string;
}

export interface ExpandedSectionData {
  icon: string;
  title: string;
  accentColor: string;
  introText?: string;
  pipelineSteps?: PipelineStepData[];
  detailItems?: DetailItemData[];
  infoCards?: InfoCardData[];
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: string;
  category: string;
  badge?: string;
  description: string;
  tags: ProjectTag[];
  glowColor: string;
  sourceUrl?: string;
  expandedSections: ExpandedSectionData[];
  // Phase 3: WebGL fields
  cameraPosition?: [number, number, number];
  ambientLightIntensity?: number;
}

export interface MethodologyPhase {
  label: string;
  icon: string;
  brief: string;
  detail: string;
}

export interface MethodologyData {
  _id: string;
  _type: "methodology";
  phases: MethodologyPhase[];
  whyItWorks: InfoCardData[];
  glowColor: string;
}

export interface HardwareCapability {
  label: string;
  icon: string;
}

export interface HardwareOpsData {
  _id: string;
  _type: "hardwareOps";
  headerIcon: string;
  headerLabel: string;
  capabilities: HardwareCapability[];
  certificationLabel: string;
  glowColor: string;
  expandedSections: ExpandedSectionData[];
}
