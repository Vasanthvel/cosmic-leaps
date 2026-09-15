import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface Technology {
  name: string;
  description: string;
}

export interface TechnologyCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  technologies: Technology[];
}

export interface TechnologyStackContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export const technologyStackContent: TechnologyStackContent = {
  badge: "Technology Stack",

  title: "Built Using",

  highlight: "Modern Technologies",

  description:
    "Cosmic Leaps builds scalable software using modern frameworks, cloud-ready architecture and industry-standard engineering practices to deliver secure, maintainable and future-proof solutions.",
};

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",

    title: "Frontend",

    icon: MonitorSmartphone,

    description:
      "Responsive, fast and accessible user interfaces for modern web applications.",

    technologies: [
      {
        name: "React",
        description: "Component-based frontend library.",
      },
      {
        name: "Next.js",
        description: "Production-ready React framework.",
      },
      {
        name: "TypeScript",
        description: "Type-safe JavaScript development.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling framework.",
      },
    ],
  },

  {
    id: "backend",

    title: "Backend",

    icon: Server,

    description:
      "Reliable APIs and scalable business logic powering enterprise applications.",

    technologies: [
      {
        name: "Python",
        description: "High-productivity backend development.",
      },
      {
        name: "FastAPI",
        description: "Modern high-performance API framework.",
      },
      {
        name: "SQLAlchemy",
        description: "Powerful ORM for database interaction.",
      },
      {
        name: "REST APIs",
        description: "Secure service integrations.",
      },
    ],
  },

  {
    id: "artificial-intelligence",

    title: "Artificial Intelligence",

    icon: BrainCircuit,

    description:
      "AI capabilities integrated into real business workflows and applications.",

    technologies: [
      {
        name: "Large Language Models",
        description: "Enterprise AI capabilities.",
      },
      {
        name: "AI Assistants",
        description: "Business productivity automation.",
      },
      {
        name: "Document AI",
        description: "Intelligent document processing.",
      },
      {
        name: "Semantic Search",
        description: "Knowledge retrieval systems.",
      },
    ],
  },

  {
    id: "data",

    title: "Data & Analytics",

    icon: Database,

    description:
      "Transform business data into valuable insights and executive reporting.",

    technologies: [
      {
        name: "SQLite",
        description: "Lightweight embedded database.",
      },
      {
        name: "PostgreSQL",
        description: "Enterprise relational database.",
      },
      {
        name: "Data Processing",
        description: "Excel, CSV and PDF workflows.",
      },
      {
        name: "Interactive Dashboards",
        description: "Business intelligence reporting.",
      },
    ],
  },

  {
    id: "engineering",

    title: "Engineering & DevOps",

    icon: Workflow,

    description:
      "Engineering best practices for quality, collaboration and maintainability.",

    technologies: [
      {
        name: "Git",
        description: "Version control.",
      },
      {
        name: "GitHub",
        description: "Source code collaboration.",
      },
      {
        name: "Code Reviews",
        description: "Quality assurance process.",
      },
      {
        name: "CI/CD Ready",
        description: "Deployment automation.",
      },
    ],
  },

  {
    id: "security",

    title: "Security & Deployment",

    icon: ShieldCheck,

    description:
      "Secure application architecture and production-ready deployment practices.",

    technologies: [
      {
        name: "Authentication",
        description: "Secure user access.",
      },
      {
        name: "Authorization",
        description: "Role-based permissions.",
      },
      {
        name: "HTTPS",
        description: "Encrypted communication.",
      },
      {
        name: "Cloud Deployment",
        description: "Scalable hosting environments.",
      },
    ],
  },
];

export const engineeringPrinciples = [
  {
    title: "Modern Architecture",
    icon: Code2,
  },
  {
    title: "Cloud Ready",
    icon: Cloud,
  },
  {
    title: "Version Controlled",
    icon: GitBranch,
  },
  {
    title: "Production Quality",
    icon: FileCode2,
  },
];