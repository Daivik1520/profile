"use client";

import { useEffect, useRef } from "react";

export default function DividerLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.transition = "width 1.2s cubic-bezier(0.35, 0.35, 0, 1)";
            line.style.width = "100%";
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section">
      <div className="divider">
        <div ref={lineRef} className="divider-line" />
      </div>
    </div>
  );
}
