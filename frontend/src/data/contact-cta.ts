import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
} from "lucide-react";

export interface ContactOption {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: typeof Mail;
}

export interface ContactCTA {
  badge: string;
  title: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  contactOptions: ContactOption[];
}

export const contactCTA: ContactCTA = {
  badge: "Let's Build Together",

  title: "Ready to Transform Your Business?",

  description:
    "Whether you need a modern website, an AI-powered solution, or a custom analytics platform, we're ready to discuss your requirements.",

  primaryButton: {
    label: "Schedule a Consultation",
    href: "mailto:analyticslab.consult@gmail.com",
  },

  secondaryButton: {
    label: "Call Us",
    href: "tel:+919342676768",
  },

  contactOptions: [
    {
      title: "Email",
      description: "Business Enquiries",
      value: "analyticslab.consult@gmail.com",
      href: "mailto:analyticslab.consult@gmail.com",
      icon: Mail,
    },
    {
      title: "Phone",
      description: "Monday – Friday · 9 AM – 6 PM",
      value: "+91 93426 76768",
      href: "tel:+919342676768",
      icon: Phone,
    },
    {
      title: "Location",
      description: "Serving Clients Worldwide",
      value: "India",
      href: "#",
      icon: MapPin,
    },
    {
      title: "Response Time",
      description: "Average Response",
      value: "< 24 Hours",
      href: "mailto:analyticslab.consult@gmail.com",
      icon: MessageSquare,
    },
  ],
};