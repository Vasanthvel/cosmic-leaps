import {
  ClipboardList,
  Search,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface DevelopmentProcessContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export const developmentProcessContent: DevelopmentProcessContent = {
  badge: "Development Process",

  title: "A Structured",

  highlight: "Development Workflow",

  description:
    "Every project follows a well-defined engineering process to ensure quality, transparency and successful delivery from initial consultation to production deployment.",
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",

    step: "01",

    title: "Discovery & Planning",

    description:
      "Understand business objectives, gather requirements, identify challenges and define the overall project scope.",

    icon: Search,
  },

  {
    id: "analysis",

    step: "02",

    title: "Solution Design",

    description:
      "Design the system architecture, user experience, workflows and technical implementation strategy.",

    icon: ClipboardList,
  },

  {
    id: "development",

    step: "03",

    title: "Development",

    description:
      "Build scalable, secure and maintainable software using modern technologies and engineering best practices.",

    icon: Code2,
  },

  {
    id: "testing",

    step: "04",

    title: "Testing & Quality Assurance",

    description:
      "Perform functional testing, validation and quality assurance before deployment.",

    icon: TestTube2,
  },

  {
    id: "deployment",

    step: "05",

    title: "Deployment",

    description:
      "Deploy the application securely with proper configuration, monitoring and production readiness.",

    icon: Rocket,
  },

  {
    id: "support",

    step: "06",

    title: "Continuous Improvement",

    description:
      "Provide ongoing enhancements, maintenance and feature development as business needs evolve.",

    icon: PenTool,
  },
];