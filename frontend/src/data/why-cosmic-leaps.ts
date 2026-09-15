import {
  BrainCircuit,
  Building2,
  Clock3,
  Code2,
  Database,
  LayoutDashboard,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface ValuePoint {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyCosmicLeapsData {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export const whyCosmicLeapsData: WhyCosmicLeapsData = {
  badge: "Why Choose Cosmic Leaps",

  title: "Technology Built",

  highlight: "Around Your Business",

  description:
    "Every solution we build is engineered specifically for your business objectives. We combine modern software engineering, Artificial Intelligence and data-driven decision making to deliver scalable digital products that create measurable business value.",
};

export const valuePoints: ValuePoint[] = [
  {
    id: "custom-solutions",

    title: "Custom Software Development",

    description:
      "Every application is designed and developed around your unique business processes instead of adapting your business to generic software.",

    icon: Building2,
  },

  {
    id: "modern-technologies",

    title: "Modern Technology Stack",

    description:
      "We build scalable applications using modern frameworks, cloud-ready architecture and industry best practices for long-term maintainability.",

    icon: Code2,
  },

  {
    id: "ai-first",

    title: "AI-Powered Solutions",

    description:
      "Artificial Intelligence is integrated where it creates measurable value, from intelligent assistants to business workflow automation.",

    icon: BrainCircuit,
  },

  {
    id: "analytics",

    title: "Business Analytics",

    description:
      "We transform business data into interactive dashboards, executive reports and actionable insights that support informed decision making.",

    icon: LayoutDashboard,
  },

  {
    id: "data-processing",

    title: "Data Engineering",

    description:
      "Secure processing of Excel, CSV, PDF and structured business data with validation, transformation and KPI generation.",

    icon: Database,
  },

  {
    id: "long-term",

    title: "Built for Long-Term Growth",

    description:
      "Our software is designed for scalability, maintainability and future enhancements as your business evolves.",

    icon: Clock3,
  },
];

export interface TrustIndicator {
  value: string;
  label: string;
}

export const trustIndicators: TrustIndicator[] = [
  {
    value: "3",
    label: "Specialized Services",
  },

  {
    value: "100%",
    label: "Custom Development",
  },

  {
    value: "AI",
    label: "Business Focused",
  },

  {
    value: "∞",
    label: "Scalable Architecture",
  },
];