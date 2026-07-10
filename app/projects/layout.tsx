import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All 37 open-source projects by Daivik Reddy — AI assistants (MARK, DAV, SAM), machine learning, facial recognition, gesture control, apps, and web experiments. Built with Python, TypeScript, Swift, and more.",
  keywords: [
    "Daivik Reddy projects",
    "AI assistant",
    "MARK AI",
    "SAM assistant",
    "machine learning projects",
    "computer vision",
    "facial recognition",
    "gesture control",
    "LLM council",
    "Python projects",
    "TypeScript",
    "open source",
  ],
  openGraph: {
    title: "Projects | Daivik Reddy",
    description:
      "All 37 open-source projects by Daivik Reddy — AI assistants, machine learning, computer vision, apps, and web experiments.",
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
