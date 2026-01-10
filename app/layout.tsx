import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Daivik Reddy | AI Enthusiast & Creative Developer",
  description: "Explore innovative AI projects including SAM desktop assistant, face recognition attendance, and virtual mouse. Created by Daivik Reddy.",
  keywords: ["Daivik Reddy", "AI", "machine learning", "computer vision", "SAM", "portfolio", "developer"],
  authors: [{ name: "Daivik Reddy" }],
  openGraph: {
    title: "Daivik Reddy | AI Enthusiast & Creative Developer",
    description: "Explore innovative AI projects including SAM desktop assistant, face recognition attendance, and virtual mouse.",
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
      <body
        className="antialiased"
        style={{
          fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
