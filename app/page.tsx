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
  AjaiCard,
  SovereignPipelineCard,
  NioStarsDashboardCard,
} from "./components/bento-grid";
import { InfiniteTicker, SectionLabel, SectionReveal } from "./components/ui";
import { SystemMapLazy } from "./components/generative-ui/SystemMapLazy";
import EngineeringTimeline from "./components/timeline/EngineeringTimeline";
import SkillRadar from "./components/skills/SkillRadar";
import CertificationCard from "./components/bento-grid/CertificationCard";
import ImpactDashboard from "./components/metrics/ImpactDashboard";
import GitHubPanel from "./components/github/GitHubPanel";
import {
  getProfile,
  getEducation,
  getExperiences,
  getTechStack,
  getProjects,
  getMethodology,
  getHardwareOps,
} from "@/lib/sanity";
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

export const revalidate = 3600;

export default async function Home() {
  const [
    profileResult,
    educationResult,
    experiencesResult,
    techStackResult,
    projectsResult,
    methodologyResult,
    hardwareOpsResult,
  ] = await Promise.allSettled([
    getProfile(),
    getEducation(),
    getExperiences(),
    getTechStack(),
    getProjects(),
    getMethodology(),
    getHardwareOps(),
  ]);

  const profile = profileResult.status === "fulfilled" && profileResult.value ? profileResult.value : fallbackProfile;
  const education = educationResult.status === "fulfilled" && educationResult.value?.length ? educationResult.value : fallbackEducation;
  const experiences = experiencesResult.status === "fulfilled" && experiencesResult.value?.length ? experiencesResult.value : fallbackExperiences;
  const techStack = techStackResult.status === "fulfilled" && techStackResult.value ? techStackResult.value : fallbackTechStack;
  const methodology = methodologyResult.status === "fulfilled" && methodologyResult.value ? methodologyResult.value : fallbackMethodology;
  const hardwareOps = hardwareOpsResult.status === "fulfilled" && hardwareOpsResult.value ? hardwareOpsResult.value : fallbackHardwareOps;

  const projects = projectsResult.status === "fulfilled" && projectsResult.value?.length ? projectsResult.value : null;
  const marketingProject = projects?.find((p) => p.slug === "autonomous-marketing-engine") ?? fallbackMarketingProject;
  const networkProject = projects?.find((p) => p.slug === "network-intelligence-dashboard") ?? fallbackNetworkProject;
  const ragifyProject = projects?.find((p) => p.slug === "ragify-finance") ?? fallbackRAGifyProject;
  const researchAgentProject = projects?.find((p) => p.slug === "ai-research-agent") ?? fallbackResearchAgentProject;
  const invoiceMasterProject = projects?.find((p) => p.slug === "ai-invoice-master") ?? fallbackInvoiceMasterProject;
  const pneumoniaProject = projects?.find((p) => p.slug === "pneumonia-xray") ?? fallbackPneumoniaProject;
  const meetTranscriberProject = projects?.find((p) => p.slug === "google-meet-transcriber") ?? fallbackMeetTranscriberProject;

  return (
    <main className="relative z-10 min-h-screen px-3 py-6 sm:px-4 md:px-8 md:py-10 lg:px-16 lg:py-16">
      <BentoGrid>
        {/* ── Hero ── */}
        <HeroIdentity id="hero-identity" profile={profile} education={education} experiences={experiences} />
        <HeroStatus id="hero-status" profile={profile} />
        <TechStackCard id="tech-stack" data={techStack} />

        <InfiniteTicker />

        {/* ── AI Systems Architecture ── */}
        <SectionLabel>AI Systems Architecture</SectionLabel>
        <SectionReveal className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <SystemMapLazy />
        </SectionReveal>

        {/* ── Sovereign Stack (live local-inference projects) ── */}
        <SectionLabel accentColor="bg-emerald-500/70">Sovereign Stack</SectionLabel>
        <AjaiCard id="project-ajai" />
        <SovereignPipelineCard id="project-sovereign-pipeline" />

        {/* ── Enterprise Infrastructure ── */}
        <SectionLabel accentColor="bg-blue-500/70">Enterprise Infrastructure</SectionLabel>
        <NioStarsDashboardCard id="project-niostars-dashboard" />

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

        {/* ── Open Source ── */}
        <SectionLabel>Open Source</SectionLabel>
        <SectionReveal className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <GitHubPanel />
        </SectionReveal>

        {/* ── Career Evolution ── */}
        <SectionLabel>Career Evolution</SectionLabel>
        <SectionReveal id="timeline" className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <EngineeringTimeline />
        </SectionReveal>

        {/* ── Engineering & Infrastructure ── */}
        <SectionLabel>Engineering &amp; Infrastructure</SectionLabel>
        <MethodologyCard id="methodology" data={methodology} />
        <HardwareOpsCard id="hardware-ops" data={hardwareOps} />
        <CertificationCard id="certifications" />

        {/* ── Business Impact ── */}
        <SectionLabel>Business Impact</SectionLabel>
        <SectionReveal id="impact" className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <ImpactDashboard />
        </SectionReveal>

        {/* ── Skill Radar ── */}
        <SectionLabel>Skill Radar</SectionLabel>
        <SectionReveal id="skills" className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <SkillRadar />
        </SectionReveal>
      </BentoGrid>
    </main>
  );
}
