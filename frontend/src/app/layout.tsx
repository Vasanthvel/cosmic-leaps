import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Footer, Navbar } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { AnalyticsChat } from "@/components/chat/analytics-chat";
import { CosmicScene } from "@/components/cosmic/cosmic-scene";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),

  applicationName: siteConfig.applicationName,

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.companyName}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  authors: [
    {
      name: siteConfig.author,
    },
  ],

  creator: siteConfig.creator,

  publisher: siteConfig.publisher,

  category: siteConfig.category,

  classification: siteConfig.classification,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: siteConfig.locale,

    url: siteConfig.baseUrl,

    siteName: siteConfig.siteName,

    title: siteConfig.title,

    description: siteConfig.description,

    images: [
      {
        url: siteConfig.openGraph.image,

        width: siteConfig.openGraph.imageWidth,

        height: siteConfig.openGraph.imageHeight,

        alt: siteConfig.openGraph.imageAlt,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.title,

    description: siteConfig.description,

    creator: siteConfig.twitterHandle,

    images: [siteConfig.openGraph.image],
  },

  icons: {
    icon: siteConfig.favicon,

    apple: siteConfig.appleTouchIcon,

    shortcut: siteConfig.favicon,
  },

  manifest: siteConfig.manifest,
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,

  colorScheme: "light",

  width: "device-width",

  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.language}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen text-[var(--text-primary)] antialiased">
        <CosmicScene />

        <div className="site-shell">
          <Navbar />

          {children}

          <Footer />
        </div>

        <AnalyticsChat />
      </body>
    </html>
  );
}