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
    <main className="relative z-10 min-h-screen px-4 py-10 md:px-8 lg:px-16 lg:py-16">
      <BentoGrid>
        {/* Row 1: Split hero + tech stack */}
        <HeroIdentity id="hero-identity" profile={profile} education={education} experiences={experiences} />
        <HeroStatus id="hero-status" profile={profile} />
        <TechStackCard id="tech-stack" data={techStack} />

        {/* Full-width ticker divider */}
        <InfiniteTicker />

        {/* Row 3: Projects + methodology + hardware */}
        <ProjectMarketingCard id="project-marketing" data={marketingProject} />
        <MethodologyCard id="methodology" data={methodology} />
        <HardwareOpsCard id="hardware-ops" data={hardwareOps} />

        {/* Row 4: More projects */}
        <ProjectRAGifyCard id="project-ragify" data={ragifyProject} />
        <ProjectNetworkCard id="project-network" data={networkProject} />

        {/* Row 5: Final project */}
        <ProjectTalentCard id="project-talent" data={talentProject} />
      </BentoGrid>
    </main>
  );
}
