"use client";

import { useEffect, useRef } from "react";

interface TextSplitAnimationProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "div" | "span" | "p";
  delay?: number;
  splitBy?: "letter" | "word";
}

export default function TextSplitAnimation({
  text,
  className = "",
  tag: Tag = "div",
  delay = 0,
  splitBy = "letter",
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
            const elements = container.querySelectorAll(".word-inner");
            elements.forEach((el, index) => {
              const htmlEl = el as HTMLElement;
              const stagger = splitBy === "letter" ? 40 : 80;
              setTimeout(() => {
                htmlEl.style.transition = `transform 0.8s cubic-bezier(0.35, 0.35, 0, 1)`;
                htmlEl.style.transform = "translateY(0)";
              }, delay + index * stagger);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [delay]);

  const parts = splitBy === "letter" ? text.split("") : text.split(" ");

  return (
    <Tag ref={containerRef as any} className={className}>
      {parts.map((part, i) => (
        <span key={i} className="word">
          <span className="word-inner">{splitBy === "letter" && part === " " ? "\u00A0" : part}</span>
          {splitBy === "word" && i < parts.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
