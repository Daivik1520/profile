"use client";

import { useEffect, useRef } from "react";
import TextSplitAnimation from "./TextSplitAnimation";
import LiveClock from "./LiveClock";

export default function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <h1 className="sr-only">Daivik Reddy — Developer & AI Enthusiast</h1>
          <div aria-hidden="true">
            <TextSplitAnimation text="DAIVIK" className="hero-name" tag="div" delay={400} />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: "1.25rem",
            }}
          >
            <div aria-hidden="true">
              <TextSplitAnimation text="REDDY" className="hero-name" tag="div" delay={600} />
            </div>

            <p
              className="b2"
              style={{
                maxWidth: "16rem",
                paddingTop: "1rem",
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              Exploring AI, tech, and everyday life with equal curiosity — always
              learning, always building something new.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <address className="h4" style={{ fontWeight: 600, fontStyle: "normal" }}>
            HYDERABAD, INDIA
          </address>
          <LiveClock />
        </div>
      </div>

      {/* Right: Portrait Image */}
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "50vh",
          position: "relative",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <img
          ref={imageRef}
          src="/dav-new-pic.jpg"
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
      </div>
    </header>
  );
}
