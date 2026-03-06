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
import { InfiniteTicker } from "./components/ui";
import { SystemMapLazy } from "./components/generative-ui/SystemMapLazy";
import EngineeringTimeline from "./components/timeline/EngineeringTimeline";
import SkillRadar from "./components/skills/SkillRadar";
import CertificationCard from "./components/bento-grid/CertificationCard";
import EducationCard from "./components/bento-grid/EducationCard";
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
  fallbackTalentProject,
  fallbackMethodology,
  fallbackHardwareOps,
} from "@/lib/fallback-data";

export const revalidate = 3600;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full flex items-center gap-3 pt-6 pb-1.5 md:pt-10 md:pb-2">
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500/70" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
          {children}
        </h2>
      </div>
      <div className="h-px flex-1 bg-white/[0.10]" />
    </div>
  );
}

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
  const talentProject = projects?.find((p) => p.slug === "talentscout-ai") ?? fallbackTalentProject;

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
        <div className="col-span-full section-enter rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <SystemMapLazy />
        </div>

        {/* ── Flagship Projects ── */}
        <SectionLabel>Flagship Projects</SectionLabel>
        <div id="projects" className="col-span-full" />
        <ProjectMarketingCard id="project-marketing" data={marketingProject} />
        <ProjectNetworkCard id="project-network" data={networkProject} />
        <ProjectRAGifyCard id="project-ragify" data={ragifyProject} />
        <ProjectTalentCard id="project-talent" data={talentProject} />

        {/* ── Open Source ── */}
        <SectionLabel>Open Source</SectionLabel>
        <div className="col-span-full section-enter rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <GitHubPanel />
        </div>

        {/* ── Education ── */}
        <SectionLabel>Education</SectionLabel>
        <EducationCard id="education" />

        {/* ── Career Evolution ── */}
        <SectionLabel>Career Evolution</SectionLabel>
        <div id="timeline" className="col-span-full section-enter rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <EngineeringTimeline />
        </div>

        {/* ── Engineering & Infrastructure ── */}
        <SectionLabel>Engineering &amp; Infrastructure</SectionLabel>
        <MethodologyCard id="methodology" data={methodology} />
        <HardwareOpsCard id="hardware-ops" data={hardwareOps} />
        <CertificationCard id="certifications" />

        {/* ── Business Impact ── */}
        <SectionLabel>Business Impact</SectionLabel>
        <div id="impact" className="col-span-full section-enter rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <ImpactDashboard />
        </div>

        {/* ── Skill Radar ── */}
        <SectionLabel>Skill Radar</SectionLabel>
        <div id="skills" className="col-span-full section-enter rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 md:p-6">
          <SkillRadar />
        </div>
      </BentoGrid>
    </main>
  );
}
