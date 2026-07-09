"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function BioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const rawText = "I'm from Hyderabad, and I like figuring things out — whether that's a new AI tool, a recipe, or a weird bug that made no sense at 2am. I'm curious about how things work, I ask a lot of questions, and I try to actually finish what I start.";
  const words = rawText.split(" ");

  return (
    <div className="section me-section">
      <div ref={sectionRef}>
        <p className="intro-text" style={{ maxWidth: "56rem" }}>
          {words.map((word, i) => {
            const isHyderabad = word.includes("Hyderabad");
            return (
              <span key={i}>
                <span
                  style={{
                    display: "inline-flex",
                    overflow: "hidden",
                    verticalAlign: "bottom",
                  }}
                >
                  <motion.span
                    initial={{ y: "120%", opacity: 0 }}
                    animate={
                      isInView ? { y: 0, opacity: 1 } : { y: "120%", opacity: 0 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: i * 0.02,
                      ease: [0.35, 0.35, 0, 1],
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {isHyderabad ? (
                      <a
                        href="https://en.wikipedia.org/wiki/Hyderabad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        Hyderabad,
                      </a>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: words.length * 0.02 + 0.2,
            ease: [0.35, 0.35, 0, 1],
          }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginTop: "2rem",
            alignItems: "center",
          }}
        >
          <Link
            href="/projects"
            className="button"
            style={{ background: "#000", borderColor: "#000" }}
          >
            <span className="h4" style={{ color: "#FFD177" }}>
              Projects
            </span>
          </Link>
          <a
            href="https://github.com/Daivik1520"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{
              background: "rgba(0,0,0,0.08)",
              borderColor: "rgba(0,0,0,0.15)",
            }}
          >
            <span className="h4" style={{ color: "#000" }}>GitHub</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
