import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daivik Reddy | 16-Year-Old AI Developer",
  description: "16-year-old AI enthusiast and developer from Jawahar Navodaya Vidyalaya Rangareddy, building innovative solutions like SAM Desktop Assistant, Virtual Mouse, and Face Recognition systems.",
  keywords: ["Daivik Reddy", "AI Developer", "JNV Rangareddy", "Python", "TensorFlow", "React", "Portfolio", "Young Developer"],
  authors: [{ name: "Daivik Reddy" }],
  openGraph: {
    title: "Daivik Reddy | 16-Year-Old AI Developer",
    description: "AI enthusiast and developer building innovative solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
