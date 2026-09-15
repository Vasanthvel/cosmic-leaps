export interface HeroData {
  badge: string;
  title: string;
  highlight: string;
  description: string;

  primaryButton: {
    label: string;
    href: string;
  };

  secondaryButton: {
    label: string;
    href: string;
  };
}

export const heroData: HeroData = {
  badge: "Premium Software Consulting",

  title: "Build Modern",

  highlight: "Digital Solutions",

  description:
    "Cosmic Leaps helps businesses build scalable Websites, AI Solutions and Custom Analytics Platforms designed around real business processes and long-term growth.",

  primaryButton: {
    label: "Schedule a Consultation",
    href: "#contact",
  },

  secondaryButton: {
    label: "Explore Services",
    href: "#services",
  },
};