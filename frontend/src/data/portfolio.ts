import {
  BarChart3,
  Bot,
  Building2,
  FileSpreadsheet,
  Globe,
  LayoutDashboard,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface ProjectTechnology {
  name: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  approach: string[];
  icon: LucideIcon;
  technologies: ProjectTechnology[];
  metrics: ProjectMetric[];
}

export interface PortfolioContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export const portfolioContent: PortfolioContent = {
  badge: "Portfolio",

  title: "Solutions That",

  highlight: "Deliver Business Value",

  description:
    "Every project is custom-built around business objectives. Below are representative solution categories that demonstrate the type of software Cosmic Leaps develops for its clients.",
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "corporate-platform",

    title: "Corporate Website Platform",

    category: "Website Development",

    description:
      "A premium corporate website designed to strengthen brand identity, improve lead generation and provide an exceptional user experience across all devices.",

    outcome:
      "Modern digital presence with improved customer engagement and easier content management.",

    approach: [
      "Discovery workshop to define brand goals, target audience and content structure.",
      "UI/UX design system built for consistency across every page and device.",
      "Development with Next.js and TypeScript for a fast, reliable, type-safe build.",
      "Performance and SEO optimization, then launch with an easy-to-manage content workflow.",
    ],

    icon: Globe,

    technologies: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],

    metrics: [
      {
        label: "Responsive",
        value: "100%",
      },
      {
        label: "Performance",
        value: "Optimized",
      },
      {
        label: "SEO",
        value: "Ready",
      },
    ],
  },

  {
    id: "ai-assistant",

    title: "Business AI Assistant",

    category: "AI Solutions",

    description:
      "An intelligent assistant capable of answering business questions, retrieving documents and automating repetitive workflows using Large Language Models.",

    outcome:
      "Reduced manual effort while providing employees with instant access to business knowledge.",

    approach: [
      "Business documents and knowledge sources ingested into a searchable index.",
      "Vector search built to retrieve the most relevant context for every question.",
      "Large Language Model integrated to generate accurate, grounded answers.",
      "Assistant deployed with FastAPI, ready for internal teams to use daily.",
    ],

    icon: Bot,

    technologies: [
      { name: "FastAPI" },
      { name: "LLM" },
      { name: "Vector Search" },
      { name: "Python" },
    ],

    metrics: [
      {
        label: "Automation",
        value: "AI",
      },
      {
        label: "Knowledge",
        value: "Centralized",
      },
      {
        label: "Support",
        value: "24×7",
      },
    ],
  },

  {
    id: "analytics-platform",

    title: "Executive Analytics Platform",

    category: "Custom Analytics",

    description:
      "A custom analytics application for processing business data, generating KPIs, dashboards and executive reports from multiple business sources.",

    outcome:
      "Real-time business visibility with faster and more informed decision making.",

    approach: [
      "Connected multiple business data sources into a single reporting layer.",
      "Defined key KPIs aligned with executive and operational goals.",
      "Built interactive dashboards with React for real-time visibility.",
      "Delivered executive reports summarizing insights and trends automatically.",
    ],

    icon: LayoutDashboard,

    technologies: [
      { name: "FastAPI" },
      { name: "SQLite" },
      { name: "React" },
      { name: "Charts" },
    ],

    metrics: [
      {
        label: "Dashboards",
        value: "Interactive",
      },
      {
        label: "Reports",
        value: "Executive",
      },
      {
        label: "Insights",
        value: "AI",
      },
    ],
  },

  {
    id: "document-processing",

    title: "Business Document Processing",

    category: "Business Automation",

    description:
      "Automated processing of Excel, CSV and PDF documents with validation, transformation and structured business reporting.",

    outcome:
      "Reduced manual processing time and improved operational accuracy.",

    approach: [
      "Automated ingestion pipeline built for Excel, CSV and PDF documents.",
      "Validation rules applied to catch errors before data enters the system.",
      "Data transformed with Python and Pandas into a consistent structured format.",
      "Structured reports generated automatically for downstream business use.",
    ],

    icon: FileSpreadsheet,

    technologies: [
      { name: "Python" },
      { name: "FastAPI" },
      { name: "Pandas" },
      { name: "SQLAlchemy" },
    ],

    metrics: [
      {
        label: "Files",
        value: "Automated",
      },
      {
        label: "Validation",
        value: "Built-in",
      },
      {
        label: "Accuracy",
        value: "High",
      },
    ],
  },

  {
    id: "business-dashboard",

    title: "Business Intelligence Dashboard",

    category: "Analytics",

    description:
      "Interactive dashboards combining operational metrics, KPIs and business intelligence into a single executive reporting interface.",

    outcome:
      "Improved operational monitoring and data-driven strategic planning.",

    approach: [
      "Aggregated operational metrics and KPIs from core business systems.",
      "Designed interactive visualizations tailored to each stakeholder team.",
      "Connected live data feeds via REST APIs for real-time reporting.",
      "Deployed a single executive interface for ongoing strategic planning.",
    ],

    icon: BarChart3,

    technologies: [
      { name: "React" },
      { name: "Charts" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
    ],

    metrics: [
      {
        label: "KPIs",
        value: "Live",
      },
      {
        label: "Reports",
        value: "Interactive",
      },
      {
        label: "Business",
        value: "Insights",
      },
    ],
  },

  {
    id: "enterprise-portal",

    title: "Enterprise Business Portal",

    category: "Business Applications",

    description:
      "A secure internal portal providing centralized workflows, document management and operational reporting for enterprise teams.",

    outcome:
      "Improved collaboration, standardized workflows and enhanced operational efficiency.",

    approach: [
      "Mapped existing team workflows to design a standardized, centralized process.",
      "Implemented secure authentication and role-based access for every user type.",
      "Built document management tools for centralized, organized collaboration.",
      "Delivered operational reporting to track efficiency across teams.",
    ],

    icon: Building2,

    technologies: [
      { name: "Next.js" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "Authentication" },
    ],

    metrics: [
      {
        label: "Security",
        value: "Enterprise",
      },
      {
        label: "Users",
        value: "Multi-role",
      },
      {
        label: "Scalability",
        value: "High",
      },
    ],
  },
];