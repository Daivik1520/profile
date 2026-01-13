"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation after 7.5 seconds (leaving 0.5s for exit animation)
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, 7500);

        // Complete loading after 8 seconds
        const completeTimer = setTimeout(() => {
            onLoadingComplete();
        }, 8000);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onLoadingComplete]);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                opacity: isExiting ? 0 : 1,
                transition: "opacity 0.5s ease-out",
            }}
        >
            {/* SVG Loader */}
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle
                    className="pl__ring pl__ring--a"
                    cx="120"
                    cy="120"
                    r="105"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="20"
                    strokeDasharray="0 660"
                    strokeDashoffset="-330"
                    strokeLinecap="round"
                />
                <circle
                    className="pl__ring pl__ring--b"
                    cx="120"
                    cy="120"
                    r="35"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="20"
                    strokeDasharray="0 220"
                    strokeDashoffset="-110"
                    strokeLinecap="round"
                />
                <circle
                    className="pl__ring pl__ring--c"
                    cx="85"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="20"
                    strokeDasharray="0 440"
                    strokeLinecap="round"
                />
                <circle
                    className="pl__ring pl__ring--d"
                    cx="155"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#ddd6fe"
                    strokeWidth="20"
                    strokeDasharray="0 440"
                    strokeLinecap="round"
                />
            </svg>

            {/* Name/Brand */}
            <div
                style={{
                    marginTop: "48px",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    opacity: 0,
                    animation: "fadeInUp 1s ease 0.5s forwards",
                }}
            >
                Daivik<span style={{ color: "#8b5cf6" }}>.</span>
            </div>

            {/* Loading text */}
            <div
                style={{
                    marginTop: "16px",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0,
                    animation: "fadeInUp 1s ease 0.8s forwards",
                }}
            >
                Loading Experience
            </div>

            {/* Progress bar */}
            <div
                style={{
                    marginTop: "32px",
                    width: "200px",
                    height: "2px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "1px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                        borderRadius: "1px",
                        animation: "loadProgress 7.5s ease-out forwards",
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loadProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .pl {
          width: 240px;
          height: 240px;
        }

        .pl__ring {
          animation: ringA 2s linear infinite;
        }

        .pl__ring--a {
          stroke: #8b5cf6;
          animation-name: ringA;
        }

        .pl__ring--b {
          stroke: #a78bfa;
          animation-name: ringB;
        }

        .pl__ring--c {
          stroke: #c4b5fd;
          animation-name: ringC;
        }

        .pl__ring--d {
          stroke: #ddd6fe;
          animation-name: ringD;
        }

        @keyframes ringA {
          0%, 4% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -330;
          }
          12% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -335;
          }
          32% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -595;
          }
          40%, 54% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -660;
          }
          62% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -665;
          }
          82% {
            stroke-dasharray: 60 600;
            stroke-width: 30;
            stroke-dashoffset: -925;
          }
          90%, 100% {
            stroke-dasharray: 0 660;
            stroke-width: 20;
            stroke-dashoffset: -990;
          }
        }

        @keyframes ringB {
          0%, 12% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -110;
          }
          20% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -115;
          }
          40% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -195;
          }
          48%, 62% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }
          70% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }
          90% {
            stroke-dasharray: 20 200;
            stroke-width: 30;
            stroke-dashoffset: -305;
          }
          98%, 100% {
            stroke-dasharray: 0 220;
            stroke-width: 20;
            stroke-dashoffset: -330;
          }
        }

        @keyframes ringC {
          0% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: 0;
          }
          8% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -5;
          }
          28% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -175;
          }
          36%, 58% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }
          66% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }
          86% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -395;
          }
          94%, 100% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -440;
          }
        }

        @keyframes ringD {
          0%, 8% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: 0;
          }
          16% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -5;
          }
          36% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -175;
          }
          44%, 50% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -220;
          }
          58% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -225;
          }
          78% {
            stroke-dasharray: 40 400;
            stroke-width: 30;
            stroke-dashoffset: -395;
          }
          86%, 100% {
            stroke-dasharray: 0 440;
            stroke-width: 20;
            stroke-dashoffset: -440;
          }
        }
      `}</style>
        </div>
    );
}
