import type { Metadata, Viewport } from "next";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import JsonLd from "@/components/JsonLd";

const siteUrl = "https://daivikreddy.online";

export const viewport: Viewport = {
  themeColor: "#FFD177",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daivik Reddy — Developer & AI Enthusiast",
    template: "%s | Daivik Reddy",
  },
  description:
    "Daivik Reddy — creative developer and AI enthusiast from Hyderabad, India. Building projects in AI, computer vision, and web development.",
  keywords: [
    "Daivik Reddy",
    "portfolio",
    "developer",
    "AI",
    "artificial intelligence",
    "machine learning",
    "computer vision",
    "web developer",
    "full stack developer",
    "frontend developer",
    "Hyderabad",
    "India",
    "Next.js",
    "React",
    "Python",
    "TypeScript",
    "personal website",
  ],
  authors: [{ name: "Daivik Reddy", url: siteUrl }],
  creator: "Daivik Reddy",
  publisher: "Daivik Reddy",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Daivik Reddy — Developer & AI Enthusiast",
    description:
      "Creative developer and AI enthusiast from Hyderabad, India. Explore my projects, favorite shows, music, and more.",
    url: siteUrl,
    siteName: "Daivik Reddy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/dav-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Daivik Reddy — Developer & AI Enthusiast",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daivik Reddy — Developer & AI Enthusiast",
    description:
      "Creative developer and AI enthusiast from Hyderabad, India. Building projects in AI, computer vision, and web development.",
    images: [
      {
        url: "/dav-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Daivik Reddy — Developer & AI Enthusiast",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
