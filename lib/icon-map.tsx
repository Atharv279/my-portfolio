import {
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  User,
  GraduationCap,
  Building2,
  ExternalLink,
  Cpu,
  Zap,
  Box,
  Network,
  BrainCircuit,
  Container,
  Workflow,
  TrendingUp,
  Layers,
  Shield,
  Terminal,
  Eye,
  Brain,
  Play,
  RotateCcw,
  Compass,
  Bot,
  Route,
  Activity,
  Database,
  Server,
  Gpu,
  Award,
  Settings,
  ShieldCheck,
  Search,
  BarChart3,
  FlaskConical,
  Users,
  Globe,
  MessageSquare,
  Languages,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  User,
  GraduationCap,
  Building2,
  ExternalLink,
  Cpu,
  Zap,
  Box,
  Network,
  BrainCircuit,
  Container,
  Workflow,
  TrendingUp,
  Layers,
  Shield,
  Terminal,
  Eye,
  Brain,
  Play,
  RotateCcw,
  Compass,
  Bot,
  Route,
  Activity,
  Database,
  Server,
  Gpu,
  Award,
  Settings,
  ShieldCheck,
  Search,
  BarChart3,
  FlaskConical,
  Users,
  Globe,
  MessageSquare,
  Languages,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Box;
}

/**
 * Stable icon component that avoids the "component created during render" lint
 * error. Use this in JSX instead of calling `getIcon()` inline.
 */
export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Box;
  return <Icon className={className} />;
}

export default iconMap;
