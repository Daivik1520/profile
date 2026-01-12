"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface OverlayProps {
    scrollProgress: MotionValue<number>;
}

// Quote sections that appear during scroll
const quotes = [
    {
        text: "Building the future",
        subtext: "with AI & Code",
        position: { start: 0.12, end: 0.38 },
        align: "left" as const,
    },
    {
        text: "Turning ideas",
        subtext: "into reality",
        position: { start: 0.42, end: 0.68 },
        align: "right" as const,
    },
    {
        text: "Let's create",
        subtext: "something amazing",
        position: { start: 0.72, end: 0.95 },
        align: "center" as const,
    },
];

function QuoteBlock({
    quote,
    scrollProgress,
}: {
    quote: typeof quotes[0];
    scrollProgress: MotionValue<number>;
}) {
    const { text, subtext, position, align } = quote;
    const mid = (position.start + position.end) / 2;

    const opacity = useTransform(
        scrollProgress,
        [position.start, position.start + 0.04, mid, position.end - 0.04, position.end],
        [0, 1, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [position.start, position.end],
        [60, -60]
    );

    const x = useTransform(
        scrollProgress,
        [position.start, position.end],
        align === "left" ? [30, -30] : align === "right" ? [-30, 30] : [0, 0]
    );

    const getAlignment = () => {
        switch (align) {
            case "left": return { left: "8%", textAlign: "left" as const };
            case "right": return { right: "8%", textAlign: "right" as const };
            default: return { left: "50%", textAlign: "center" as const };
        }
    };

    const alignStyle = getAlignment();

    return (
        <motion.div
            style={{
                position: "absolute",
                top: "50%",
                transform: align === "center" ? "translateX(-50%)" : undefined,
                ...alignStyle,
                opacity,
                y,
                x: align !== "center" ? x : undefined,
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
            }}>
                <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2rem, 7vw, 5rem)",
                    fontWeight: 400,
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                    marginBottom: "8px",
                    filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.35))",
                    whiteSpace: "nowrap",
                }}>
                    {text}
                </h2>
                <p style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)",
                    fontWeight: 500,
                    backgroundImage: "linear-gradient(90deg, #ec4899, #f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.06em",
                    filter: "drop-shadow(0 2px 15px rgba(236, 72, 153, 0.35))",
                    whiteSpace: "nowrap",
                }}>
                    {subtext}
                </p>
            </div>
        </motion.div>
    );
}

export default function Overlay({ scrollProgress }: OverlayProps) {
    // Hero text - only visible at the top
    const heroOpacity = useTransform(scrollProgress, [0, 0.12], [1, 0]);
    const heroY = useTransform(scrollProgress, [0, 0.12], [0, -60]);

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
        }}>
            {/* Hero Section - Positioned at bottom third */}
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "15%",
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: heroOpacity,
                    y: heroY,
                }}
            >
                {/* Main Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(4rem, 15vw, 12rem)",
                        fontWeight: 400,
                        color: "#ffffff",
                        textAlign: "center",
                        letterSpacing: "0.08em",
                        lineHeight: 0.9,
                        textShadow: "0 4px 60px rgba(0, 0, 0, 0.5), 0 0 120px rgba(236, 72, 153, 0.3)",
                        marginBottom: "16px",
                    }}
                >
                    DAIVIK REDDY
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{
                        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        fontSize: "clamp(0.75rem, 2vw, 1.1rem)",
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.6)",
                        textAlign: "center",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    AI Enthusiast & Creative Developer
                </motion.p>
            </motion.div>

            {/* Quote sections during scroll */}
            {quotes.map((quote, i) => (
                <QuoteBlock key={i} quote={quote} scrollProgress={scrollProgress} />
            ))}

            {/* Daivik Customs badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{
                    position: "absolute",
                    bottom: "24px",
                    right: "32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: useTransform(scrollProgress, [0, 0.08], [1, 0]),
                }}
            >
                <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "2px",
                    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                }} />
                <span style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.5)",
                    letterSpacing: "0.1em",
                }}>
                    Daivik Customs
                </span>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    opacity: useTransform(scrollProgress, [0, 0.06], [1, 0]),
                }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                        <rect x="1" y="1" width="14" height="22" rx="7" />
                        <motion.circle
                            cx="8"
                            cy="8"
                            r="2"
                            fill="rgba(255,255,255,0.6)"
                            animate={{ cy: [8, 14, 8] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </svg>
                </motion.div>
                <span style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.35)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                }}>
                    Scroll
                </span>
            </motion.div>
        </div>
    );
}
