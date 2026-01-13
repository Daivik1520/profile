"use client";

import { useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import ParallaxCursor from "@/components/ParallaxCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
      <main style={{
        background: "#0a0a0a",
        position: "relative",
        opacity: isLoading ? 0 : 1,
        transition: "opacity 0.5s ease-in",
      }}>
        {/* Parallax Cursor Effect */}
        <ParallaxCursor />
        <ChatAssistant />

        {/* Scrollytelling Hero Section */}
        <ScrollyCanvas />

        {/* Projects Section */}
        <Projects />

        {/* Footer */}
        <footer style={{
          padding: "80px 32px",
          background: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}>
            {/* Logo / Name */}
            <div style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}>
              Daivik<span style={{ color: "rgba(139, 92, 246, 1)" }}>.</span>
            </div>

            {/* Social Links */}
            <div style={{
              display: "flex",
              gap: "16px",
            }}>
              {/* GitHub */}
              <a
                href="https://github.com/Daivik1520"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn github-btn"
              >
                <span className="svgContainer">
                  <svg viewBox="0 0 24 24" height="24" width="24" fill="white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                <span className="BG"></span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/daivik-reddy-60a876311/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin-btn"
              >
                <span className="svgContainer">
                  <svg viewBox="0 0 24 24" height="24" width="24" fill="white">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </span>
                <span className="BG"></span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/daivik_warrior/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
              >
                <span className="svgContainer">
                  <svg viewBox="0 0 448 512" height="24" width="24" fill="white">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
                <span className="BG"></span>
              </a>

              {/* Email */}
              <a
                href="mailto:daivik.reddy@gmail.com"
                className="social-btn email-btn"
              >
                <span className="svgContainer">
                  <svg viewBox="0 0 24 24" height="24" width="24" fill="none" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="BG"></span>
              </a>
            </div>

            {/* School Info */}
            <p style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
              marginTop: "16px",
            }}>
              Student at <span style={{ color: "rgba(139, 92, 246, 0.9)" }}>Jawahar Navodaya Vidyalaya Rangareddy</span>
            </p>

            {/* Copyright */}
            <p style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.3)",
              marginTop: "8px",
            }}>
              © {new Date().getFullYear()} Daivik Reddy. Built with passion.
            </p>
          </div>

          <style jsx global>{`
          .social-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: rgba(255,255,255,0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition-duration: 0.3s;
            text-decoration: none;
          }

          .svgContainer {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            position: relative;
          }

          .BG {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            border-radius: 50%;
            z-index: 1;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: scale(0);
          }

          /* Instagram */
          .instagram-btn .BG {
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          }
          .instagram-btn:hover .BG {
            transform: scale(1);
          }
          .instagram-btn:hover {
            box-shadow: 0 0 20px rgba(225, 48, 108, 0.5);
          }

          /* LinkedIn */
          .linkedin-btn .BG {
            background: #0077b5;
          }
          .linkedin-btn:hover .BG {
            transform: scale(1);
          }
          .linkedin-btn:hover {
            box-shadow: 0 0 20px rgba(0, 119, 181, 0.5);
          }

          /* GitHub */
          .github-btn .BG {
            background: linear-gradient(135deg, #333 0%, #24292e 100%);
          }
          .github-btn:hover .BG {
            transform: scale(1);
          }
          .github-btn:hover {
            box-shadow: 0 0 20px rgba(36, 41, 46, 0.6);
          }

          /* Email */
          .email-btn .BG {
            background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
          }
          .email-btn:hover .BG {
            transform: scale(1);
          }
          .email-btn:hover {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          }

          .social-btn:active {
            transform: scale(0.9);
          }
        `}</style>
        </footer>
      </main>
    </>
  );
}
