export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export const faqContent: FAQContent = {
  badge: "Frequently Asked Questions",

  title: "Common",

  highlight: "Questions",

  description:
    "Answers to some of the most common questions businesses ask before starting a software development project with Cosmic Leaps.",
};

export const faqItems: FAQItem[] = [
  {
    id: "custom-development",

    question:
      "Do you build completely custom software or use pre-built templates?",

    answer:
      "Every solution is custom developed around your business requirements. We design and build software that matches your workflows, users and long-term business objectives instead of forcing your business to adapt to generic products.",
  },

  {
    id: "analytics-platform",

    question:
      "Do you provide an off-the-shelf analytics platform?",

    answer:
      "No. Cosmic Leaps develops custom analytics applications tailored to each client's business processes, data sources and reporting requirements. Every analytics solution is built specifically for the organization using it.",
  },

  {
    id: "ai-services",

    question:
      "What types of AI solutions do you develop?",

    answer:
      "We build AI-powered business applications including AI assistants, chatbots, document processing solutions, semantic search systems, knowledge base applications and workflow automation powered by modern Large Language Models.",
  },

  {
    id: "existing-system",

    question:
      "Can you integrate with our existing software and business systems?",

    answer:
      "Yes. We design solutions that integrate with existing databases, APIs, internal systems and third-party platforms wherever appropriate to ensure a smooth transition and minimal disruption.",
  },

  {
    id: "project-duration",

    question:
      "How long does a typical project take?",

    answer:
      "Project timelines depend on business requirements, scope and complexity. After understanding your objectives, we provide a realistic project plan with milestones, estimated delivery timelines and regular progress updates.",
  },

  {
    id: "support",

    question:
      "Do you provide maintenance and support after delivery?",

    answer:
      "Yes. We provide ongoing maintenance, enhancements, feature development and technical support to help your software continue evolving as your business grows.",
  },

  {
    id: "security",

    question:
      "Is security considered during development?",

    answer:
      "Security is incorporated throughout the development lifecycle. We follow secure engineering practices, implement authentication and authorization where required and design systems with scalability and maintainability in mind.",
  },

  {
    id: "consultation",

    question:
      "How do we get started with Cosmic Leaps?",

    answer:
      "The process begins with an initial consultation to understand your business, objectives and technical requirements. From there we recommend the most suitable solution and prepare a structured development roadmap.",
  },
];