import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List",
  description:
    "Daivik Reddy's curated list of favorite films, TV series, and recommendations — from Interstellar and Oppenheimer to Mr. Robot and Demon Slayer.",
  openGraph: {
    title: "List | Daivik Reddy",
    description:
      "Daivik Reddy's curated list of favorite films, TV series, and recommendations.",
    url: "https://daivikreddy.online/list",
  },
  alternates: {
    canonical: "https://daivikreddy.online/list",
  },
};

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
