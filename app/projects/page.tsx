"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";
import TiltCard from "@/components/TiltCard";

interface Project {
    name: string;
    description: string;
    tech?: string;
    license?: string;
    link?: string;
}

interface Category {
    title: string;
    projects: Project[];
}

const categories: Category[] = [
    {
        title: "Recent Projects",
        projects: [
            {
                name: "Search2Download",
                description: "Turn Google searches into direct downloads by programmatically executing search queries and retrieving target content in seconds",
                link: "https://github.com/Daivik1520/Search2Download",
            },
            {
                name: "terminal_tunes",
                description: "Terminal-based music player application",
                tech: "JavaScript",
                link: "https://github.com/Daivik1520/teminal_tunes",
            },
            {
                name: "city-roads",
                description: "High-performance visualization tool rendering every road within selected cities using WebGL",
                link: "https://github.com/Daivik1520/city-roads",
            },
            {
                name: "SAM-v4",
                description: "Fourth iteration of the SAM desktop AI assistant",
                tech: "Python",
                license: "MIT",
                link: "https://github.com/Daivik1520/SAM-v4",
            },
            {
                name: "facial_recognition",
                description: "AI-powered facial recognition system for automated classroom attendance tracking with ArcFace/AdaFace + YOLO models",
                link: "https://github.com/Daivik1520/facial_recognition",
            },
        ],
    },
    {
        title: "AI & Machine Learning",
        projects: [
            {
                name: "llm-council",
                description: "Local web app querying multiple LLMs to peer-review each other's answers and synthesize the best response",
                link: "https://github.com/Daivik1520/llm-council",
            },
            {
                name: "SAMgpt",
                description: "Customized GPT implementation for educational and research purposes",
                tech: "Jupyter Notebook",
                license: "MIT",
                link: "https://github.com/Daivik1520/SAMgpt",
            },
            {
                name: "face-swapping",
                description: "Python-based face swapping project",
                tech: "Python",
                link: "https://github.com/Daivik1520/face-swapping",
            },
            {
                name: "face-recognition",
                description: "Face recognition system with MIT License",
                tech: "Python",
                license: "MIT",
                link: "https://github.com/Daivik1520/face-recognition",
            },
            {
                name: "Heart-disease-recognition",
                description: "Heart disease prediction system using 8 ML algorithms with 95% accuracy analyzing 13 medical attributes",
                link: "https://github.com/Daivik1520/Heart-disease-recognition",
            },
        ],
    },
    {
        title: "SAM Assistant Versions",
        projects: [
            {
                name: "SAM-v3",
                description: "Third version of SAM assistant",
                tech: "Python",
                license: "MIT",
                link: "https://github.com/Daivik1520/SAM-v3",
            },
            {
                name: "SAM-v2",
                description: "Voice-controlled Windows assistant with system controls, UI, and AI chat",
                tech: "Python",
                link: "https://github.com/Daivik1520/SAM-v2",
            },
            {
                name: "SAM.CHAT",
                description: "Chat interface for SAM",
                tech: "TypeScript",
                license: "MIT",
                link: "https://github.com/Daivik1520/SAM.CHAT",
            },
            {
                name: "SAMchatbot",
                description: "Simple Tkinter chatbot with offline Q&A and Wikipedia fallback",
                tech: "Python",
                link: "https://github.com/Daivik1520/SAMchatbot",
            },
            {
                name: "SAM",
                description: "Original SAM assistant project",
                tech: "Python",
                link: "https://github.com/Daivik1520/SAM",
            },
        ],
    },
    {
        title: "Computer Vision & Interaction",
        projects: [
            {
                name: "gesture-driver",
                description: "AI-powered computer control using hand gestures via webcam",
                tech: "Python",
                link: "https://github.com/Daivik1520/gesture-driver",
            },
            {
                name: "gesture-based-gaming",
                description: "Gaming control through hand gestures",
                tech: "Python",
                license: "MIT",
                link: "https://github.com/Daivik1520/gesture-based-gaming",
            },
            {
                name: "virtual-mouse",
                description: "Control computer cursor using hand gestures via webcam with OpenCV, MediaPipe, and PyAutoGUI",
                tech: "Python",
                link: "https://github.com/Daivik1520/virtual-mouse",
            },
        ],
    },
    {
        title: "Web Projects",
        projects: [
            {
                name: "profile",
                description: "3D profile website",
                tech: "JavaScript",
                link: "https://github.com/Daivik1520/profile",
            },
            {
                name: "youtube-finder",
                description: "YouTube search application",
                tech: "TypeScript",
                link: "https://github.com/Daivik1520/youtube-finder",
            },
            {
                name: "typing-speed",
                description: "Typing speed test application",
                tech: "JavaScript",
                license: "MIT",
                link: "https://github.com/Daivik1520/typing-speed-",
            },
            {
                name: "Daivik1520",
                description: "GitHub profile README",
                tech: "HTML",
                link: "https://github.com/Daivik1520/Daivik1520",
            },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] pt-8 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            {/* Particle Background */}
            <div className="fixed inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Back to Home */}
            <div className="relative z-10 max-w-7xl mx-auto mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                >
                    <svg
                        className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Home
                </Link>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-7xl mx-auto mb-20"
            >
                <span className="text-sm font-medium tracking-widest text-white/40 uppercase mb-4 block">
                    Portfolio
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                    All{" "}
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h1>
                <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
                    A comprehensive collection of my work spanning AI, machine learning,
                    computer vision, and web development.
                </p>
            </motion.div>

            {/* Categories */}
            {categories.map((category, categoryIndex) => (
                <motion.section
                    key={category.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="relative z-10 max-w-7xl mx-auto mb-20"
                >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {category.title}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {category.projects.map((project) => (
                            <motion.div
                                key={project.name}
                                variants={cardVariants}
                            >
                                <TiltCard className="h-full">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block h-full"
                                    >
                                        {/* Card with glassmorphism effect */}
                                        <div className="relative h-full p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_20px_80px_-20px_rgba(139,92,246,0.3)]">
                                            {/* Gradient Glow */}
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Tech Badge */}
                                            {project.tech && (
                                                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-white/40 bg-white/[0.05] rounded-full mb-6">
                                                    {project.tech}
                                                </span>
                                            )}

                                            {/* Title */}
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-white/90 transition-colors">
                                                {project.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-white/50 leading-relaxed mb-6 group-hover:text-white/60 transition-colors line-clamp-3">
                                                {project.description}
                                            </p>

                                            {/* License Badge */}
                                            {project.license && (
                                                <span className="inline-block px-3 py-1.5 text-xs font-medium text-emerald-400/80 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                                    {project.license} License
                                                </span>
                                            )}

                                            {/* Arrow Indicator */}
                                            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                                    <svg
                                                        className="w-5 h-5 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>
            ))}

            {/* GitHub CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-7xl mx-auto text-center mt-24"
            >
                <p className="text-white/40 mb-8 text-lg">Explore more on GitHub</p>
                <motion.a
                    href="https://github.com/Daivik1520"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-full text-white font-medium tracking-wide hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_20px_80px_-20px_rgba(139,92,246,0.3)] transition-all duration-500"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View GitHub Profile
                </motion.a>
            </motion.div>
        </main>
    );
}
