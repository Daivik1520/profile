import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Daivik Reddy's projects — AI assistants, facial recognition, gesture control, LLM tools, and web experiments. Built with Python, TypeScript, and more.",
  keywords: [
    "Daivik Reddy projects",
    "AI projects",
    "computer vision",
    "gesture control",
    "Python projects",
    "TypeScript",
    "web experiments",
    "open source",
  ],
  openGraph: {
    title: "Projects | Daivik Reddy",
    description:
      "Explore Daivik Reddy's projects — AI assistants, facial recognition, gesture control, LLM tools, and web experiments.",
    url: "https://daivikreddy.online/projects",
    type: "website",
  },
  alternates: {
    canonical: "https://daivikreddy.online/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
