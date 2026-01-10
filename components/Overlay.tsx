"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TextScramble from "./TextScramble";

interface SectionProps {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    scrollRange: [number, number];
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ParallaxSection({
    children,
    align = "center",
    scrollRange,
    scrollYProgress,
}: SectionProps) {
    const opacity = useTransform(
        scrollYProgress,
        [
            scrollRange[0] - 0.08,
            scrollRange[0],
            scrollRange[1],
            scrollRange[1] + 0.08,
        ],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [scrollRange[0] - 0.1, scrollRange[1] + 0.1],
        ["30%", "-30%"]
    );

    const alignmentClasses = {
        left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
        center: "items-center text-center px-6",
        right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[align]}`}
        >
            {children}
        </motion.div>
    );
}

const subtitleVariants = {
    hidden: {
        opacity: 0,
        y: -60,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            damping: 15,
            stiffness: 80,
            delay: 0.6,
        },
    },
};

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Smooth mouse tracking with spring physics
    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize to -1 to 1
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            setMousePosition({ x, y });
            mouseX.set(x * 20);
            mouseY.set(y * 20);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-10 h-[500vh] pointer-events-none"
        >
            <div className="sticky top-0 h-screen w-full">
                {/* Section 1: Hero - 0% to 20% */}
                <ParallaxSection
                    scrollRange={[0, 0.18]}
                    scrollYProgress={scrollYProgress}
                    align="center"
                >
                    <motion.div
                        style={{ x: mouseX, y: mouseY }}
                        className="max-w-4xl pointer-events-auto"
                    >
                        <h1 className="font-bold text-white mb-5" style={{
                            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                            letterSpacing: '-0.04em',
                            lineHeight: 1,
                            fontWeight: 800
                        }}>
                            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent inline-block">
                                <TextScramble text="DAIVIK" delay={300} duration={1200} />
                            </span>
                            {" "}
                            <span className="bg-gradient-to-r from-white/90 via-white to-white/60 bg-clip-text text-transparent inline-block">
                                <TextScramble text="REDDY" delay={500} duration={1200} />
                            </span>
                        </h1>
                        <motion.p
                            variants={subtitleVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02 }}
                            className="cursor-default"
                            style={{
                                fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontWeight: 400,
                            }}
                        >
                            AI Enthusiast & Creative Developer
                        </motion.p>
                        <motion.div
                            className="mt-10 flex items-center justify-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 8, 0] }}
                            transition={{
                                opacity: { delay: 0.8 },
                                y: { duration: 2, repeat: Infinity, delay: 1 }
                            }}
                            style={{ color: 'rgba(255, 255, 255, 0.3)' }}
                        >
                            <span style={{
                                fontSize: '0.65rem',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                fontWeight: 500
                            }}>
                                Scroll to explore
                            </span>
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </ParallaxSection>

                {/* Section 2: Statement 1 - 30% to 45% */}
                <ParallaxSection
                    scrollRange={[0.28, 0.43]}
                    scrollYProgress={scrollYProgress}
                    align="left"
                >
                    <motion.div
                        className="max-w-2xl pointer-events-auto"
                        style={{
                            x: useSpring(mousePosition.x * 15, springConfig),
                            y: useSpring(mousePosition.y * 15, springConfig)
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            fontWeight: 700
                        }}>
                            <motion.span
                                className="inline-block cursor-default text-white"
                                whileHover={{ scale: 1.05, x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <TextScramble text="I build" delay={0} duration={800} />
                            </motion.span>
                            <br />
                            <motion.span
                                className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent inline-block cursor-default"
                                whileHover={{ scale: 1.05, x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <TextScramble text="intelligent systems" delay={200} duration={1000} />
                            </motion.span>
                        </h2>
                        <motion.p
                            className="mt-6 cursor-default"
                            whileHover={{ scale: 1.02 }}
                            style={{
                                fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                                lineHeight: 1.8,
                                color: 'rgba(255, 255, 255, 0.5)',
                                maxWidth: '26rem',
                                fontWeight: 300,
                            }}
                        >
                            From AI-powered desktop assistants to computer vision solutions,
                            crafting innovative technology that makes an impact.
                        </motion.p>
                    </motion.div>
                </ParallaxSection>

                {/* Section 3: Statement 2 - 55% to 70% */}
                <ParallaxSection
                    scrollRange={[0.53, 0.68]}
                    scrollYProgress={scrollYProgress}
                    align="right"
                >
                    <motion.div
                        className="max-w-2xl pointer-events-auto"
                        style={{
                            x: useSpring(mousePosition.x * 15, springConfig),
                            y: useSpring(mousePosition.y * 15, springConfig)
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            fontWeight: 700
                        }}>
                            <motion.span
                                className="inline-block cursor-default text-white"
                                whileHover={{ scale: 1.05, x: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <TextScramble text="Bridging" delay={0} duration={800} />
                            </motion.span>
                            <br />
                            <motion.span
                                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent inline-block cursor-default"
                                whileHover={{ scale: 1.05, x: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <TextScramble text="AI & real-world" delay={200} duration={1000} />
                            </motion.span>
                        </h2>
                        <motion.p
                            className="mt-6 cursor-default"
                            whileHover={{ scale: 1.02 }}
                            style={{
                                fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                                lineHeight: 1.8,
                                color: 'rgba(255, 255, 255, 0.5)',
                                maxWidth: '26rem',
                                fontWeight: 300,
                            }}
                        >
                            Creating seamless integrations between machine learning and
                            everyday applications.
                        </motion.p>
                    </motion.div>
                </ParallaxSection>

                {/* Section 4: CTA - 80% to 95% */}
                <ParallaxSection
                    scrollRange={[0.78, 0.93]}
                    scrollYProgress={scrollYProgress}
                    align="center"
                >
                    <motion.div
                        className="flex flex-col items-center gap-6 pointer-events-auto"
                        style={{ x: mouseX, y: mouseY }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2,
                            fontWeight: 600,
                            textAlign: 'center'
                        }}>
                            <motion.span
                                className="inline-block cursor-default text-white"
                                whileHover={{ scale: 1.05 }}
                            >
                                <TextScramble text="Let's build something" delay={0} duration={1000} />
                            </motion.span>
                            <br />
                            <motion.span
                                className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent inline-block cursor-default"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <TextScramble text="extraordinary" delay={300} duration={1200} scrambleOnHover />
                            </motion.span>
                        </h2>
                        <motion.a
                            href="/projects"
                            whileHover={{ scale: 1.08, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                fontSize: '0.8rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                            }}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors inline-block"
                        >
                            View My Projects
                        </motion.a>
                    </motion.div>
                </ParallaxSection>
            </div>
        </div>
    );
}
