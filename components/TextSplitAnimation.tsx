"use client";

import { useEffect, useRef } from "react";

interface TextSplitAnimationProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "div" | "span";
  delay?: number;
}

export default function TextSplitAnimation({
  text,
  className = "",
  tag: Tag = "div",
  delay = 0,
}: TextSplitAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const words = container.querySelectorAll(".word-inner");
            words.forEach((word, index) => {
              const el = word as HTMLElement;
              setTimeout(() => {
                el.style.transition = `transform 0.8s cubic-bezier(0.35, 0.35, 0, 1)`;
                el.style.transform = "translateY(0)";
              }, delay + index * 80);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [delay]);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word">
          <span className="word-inner">{word}</span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
