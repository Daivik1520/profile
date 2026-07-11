"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextSplitAnimation from "./TextSplitAnimation";
import LiveClock from "./LiveClock";

export default function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // As user scrolls down 1000px, frame moves up 250px (increased parallax speed)
  const yParallax = useTransform(scrollY, [0, 1000], [0, -250]);

  useEffect(() => {
    if (imageRef.current) {
      setTimeout(() => {
        imageRef.current!.style.transition = "opacity 1.5s cubic-bezier(0.35, 0.35, 0, 1)";
        imageRef.current!.style.opacity = "1";
      }, 300);
    }

    if (leftRef.current) {
      setTimeout(() => {
        leftRef.current!.style.transition = "transform 1s cubic-bezier(0.35, 0.35, 0, 1)";
        leftRef.current!.style.transform = "translateY(0)";
      }, 100);
    }
  }, []);

  return (
    <header
      className="hero-grid"
      role="banner"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Left: Yellow Block */}
      <div
        ref={leftRef}
        style={{
          backgroundColor: "#FFD177",
          padding: "var(--page-margin)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: "translateY(60px)",
          position: "relative",
          zIndex: 2,
          minHeight: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, position: "relative" }}>
          <h1 className="sr-only">Daivik Reddy — Developer & AI Enthusiast</h1>
          
          {/* Stacked Names */}
          <div aria-hidden="true" style={{ lineHeight: 0.85, marginBottom: "-0.1em" }}>
            <TextSplitAnimation text="DAIVIK" className="hero-name" tag="div" delay={400} />
          </div>
          <div aria-hidden="true" style={{ lineHeight: 0.85 }}>
            <TextSplitAnimation text="REDDY" className="hero-name" tag="div" delay={600} />
          </div>

          {/* Paragraph to the side */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "-2rem",
              maxWidth: "10rem",
            }}
          >
            <TextSplitAnimation
              text="Exploring AI, tech, and everyday life with equal curiosity — always learning, always building something new."
              tag="p"
              className="b2"
              splitBy="word"
              delay={800}
              // @ts-ignore
              style={{
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <address className="h4" style={{ fontStyle: "normal", fontWeight: 900, color: "#000" }}>
            HYDERABAD, INDIA
          </address>
          <div className="h4" style={{ textTransform: "uppercase", fontWeight: 900, color: "#000" }}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="h4" style={{ fontWeight: 900, color: "#000" }}>
            <LiveClock />
          </div>
        </div>
      </div>

      {/* Right: Portrait Image */}
      <motion.div
        style={{
          y: yParallax,
          width: "100%",
          height: "100%",
          minHeight: "50vh",
          position: "relative",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <img
          ref={imageRef as any}
          src="/dav-hero.jpg"
          alt="Daivik Reddy — creative developer and AI enthusiast from Hyderabad, India"
          width={600}
          height={800}
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 25%",
            opacity: 0,
          }}
        />
      </motion.div>
    </header>
  );
}
