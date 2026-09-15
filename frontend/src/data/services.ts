import {
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  Database,
  FileSpreadsheet,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface ServiceFeature {
  title: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  features: ServiceFeature[];
}

export const services: Service[] = [
  {
    id: "web-development",

    title: "Website & Web Application Development",

    shortDescription:
      "Modern, scalable and secure web applications tailored to your business.",

    description:
      "We design and build custom websites, business portals, SaaS products and internal applications that are fast, responsive and engineered for long-term growth.",

    icon: Globe,

    features: [
      {
        title: "Corporate Websites",
      },
      {
        title: "Business Websites",
      },
      {
        title: "Landing Pages",
      },
      {
        title: "Customer Portals",
      },
      {
        title: "Admin Panels",
      },
      {
        title: "SaaS Applications",
      },
      {
        title: "Progressive Web Apps",
      },
      {
        title: "Internal Business Applications",
      },
    ],
  },

  {
    id: "ai-solutions",

    title: "AI Solutions",

    shortDescription:
      "Practical Artificial Intelligence solutions that automate business processes.",

    description:
      "We integrate modern AI capabilities into business workflows using Large Language Models, intelligent automation and enterprise-grade AI systems.",

    icon: Bot,

    features: [
      {
        title: "AI Chatbots",
      },
      {
        title: "AI Assistants",
      },
      {
        title: "Document AI",
      },
      {
        title: "Knowledge Base AI",
      },
      {
        title: "Semantic Search",
      },
      {
        title: "LLM Integration",
      },
      {
        title: "Workflow Automation",
      },
      {
        title: "Custom AI Applications",
      },
    ],
  },

  {
    id: "analytics-platforms",

    title: "Custom Analytics Platforms",

    shortDescription:
      "Tailor-made analytics applications built around your business data.",

    description:
      "Every analytics platform is custom-developed to match your business processes, data sources and reporting requirements. We do not provide a generic analytics product.",

    icon: BarChart3,

    features: [
      {
        title: "Secure File Upload",
      },
      {
        title: "Excel Processing",
      },
      {
        title: "CSV Processing",
      },
      {
        title: "PDF Processing",
      },
      {
        title: "Data Cleaning",
      },
      {
        title: "Business KPIs",
      },
      {
        title: "Interactive Dashboards",
      },
      {
        title: "Executive Reports",
      },
    ],
  },
];

export const serviceHighlights = [
  {
    title: "Business Focused",
    icon: Building2,
  },
  {
    title: "AI Powered",
    icon: BrainCircuit,
  },
  {
    title: "Data Driven",
    icon: Database,
  },
  {
    title: "Interactive Dashboards",
    icon: LayoutDashboard,
  },
  {
    title: "Business Intelligence",
    icon: Sparkles,
  },
  {
    title: "Excel & CSV Processing",
    icon: FileSpreadsheet,
  },
  {
    title: "Semantic Search",
    icon: Search,
  },
  {
    title: "Workflow Integration",
    icon: Settings,
  },
  {
    title: "Business Assistants",
    icon: MessageSquare,
  },
];