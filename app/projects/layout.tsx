import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Daivik Reddy's projects — AI assistants, facial recognition, gesture control, LLM tools, and web experiments. Built with Python, TypeScript, and more.",
  openGraph: {
    title: "Projects | Daivik Reddy",
    description:
      "Explore Daivik Reddy's projects — AI assistants, facial recognition, gesture control, LLM tools, and web experiments.",
    url: "https://daivikreddy.com/projects",
  },
  alternates: {
    canonical: "https://daivikreddy.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
