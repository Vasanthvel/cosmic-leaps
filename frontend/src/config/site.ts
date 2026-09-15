export const siteConfig = {
  // ---------------------------------------------------------------------------
  // Company
  // ---------------------------------------------------------------------------

  companyName: "Cosmic Leaps",

  siteName: "Cosmic Leaps",

  title: "Cosmic Leaps | AI Solutions, Software Development & Business Analytics",

  description:
    "Cosmic Leaps builds modern websites, AI-powered business solutions and custom analytics platforms that help organizations automate workflows, improve decision making and accelerate digital transformation.",

  url: "https://www.cosmicleaps.com",

  baseUrl: "https://www.cosmicleaps.com",

  language: "en",

  locale: "en_US",

  author: "Cosmic Leaps",

  creator: "Cosmic Leaps",

  publisher: "Cosmic Leaps",

  applicationName: "Cosmic Leaps",

  category: "Technology",

  classification: "Software Development Company",

  themeColor: "#1E2D5B",

  backgroundColor: "#FFFFFF",

  logo: "/logo.png",

  favicon: "/favicon.png",

  appleTouchIcon: "/apple-touch-icon.png",

  manifest: "/manifest.webmanifest",

  robots: "/robots.txt",

  sitemap: "/sitemap.xml",

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------

  email: "hello@cosmicleaps.com",

  phone: "+91-9342676768",

  address: "India",

  // ---------------------------------------------------------------------------
  // Social
  // ---------------------------------------------------------------------------

  twitterHandle: "@cosmicleaps",

  linkedin: "https://www.linkedin.com/company/cosmic-leaps",

  github: "https://github.com/cosmicleaps",

  // ---------------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------------

  keywords: [
    "Cosmic Leaps",
    "AI Solutions",
    "Artificial Intelligence",
    "Business Analytics",
    "Analytics Platform",
    "Custom Software Development",
    "Website Development",
    "Web Application Development",
    "FastAPI",
    "Python Development",
    "Next.js Development",
    "React Development",
    "Business Intelligence",
    "Dashboard Development",
    "Data Analytics",
    "Machine Learning",
    "AI Automation",
    "Enterprise Software",
    "Digital Transformation",
    "Software Consulting",
  ],

  // ---------------------------------------------------------------------------
  // Open Graph
  // ---------------------------------------------------------------------------

  openGraph: {
    type: "website",

    image: "/logo.png",

    imageWidth: 1200,

    imageHeight: 630,

    imageAlt: "Cosmic Leaps",
  },

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  navigation: [
    {
      label: "Services",
      href: "#services",
    },

    {
      label: "Why Cosmic Leaps",
      href: "#why-cosmic-leaps",
    },

    {
      label: "Development Process",
      href: "#development-process",
    },

    {
      label: "Technology Stack",
      href: "#technology-stack",
    },

    {
      label: "Portfolio",
      href: "#portfolio",
    },

    {
      label: "FAQ",
      href: "#faq",
    },

    {
      label: "Contact",
      href: "#contact",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;