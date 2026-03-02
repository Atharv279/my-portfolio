import BentoGrid from "./components/BentoGrid";
import HeroCard from "./components/HeroCard";
import TechStackCard from "./components/TechStackCard";
import MethodologyCard from "./components/MethodologyCard";
import ProjectMarketingCard from "./components/ProjectMarketingCard";
import ProjectNetworkCard from "./components/ProjectNetworkCard";
import HardwareOpsCard from "./components/HardwareOpsCard";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen px-4 py-10 md:px-8 lg:px-16 lg:py-16">
      <BentoGrid>
        <HeroCard id="hero" />
        <TechStackCard id="tech-stack" />
        <MethodologyCard id="methodology" />
        <ProjectMarketingCard id="project-marketing" />
        <ProjectNetworkCard id="project-network" />
        <HardwareOpsCard id="hardware-ops" />
      </BentoGrid>
    </main>
  );
}
