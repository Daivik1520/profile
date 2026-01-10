"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import TiltCard from "./TiltCard";

interface Project {
    title: string;
    description: string;
    tags: string[];
    year: string;
    link?: string;
}

const projects: Project[] = [
    {
        title: "SAM - Desktop Assistant",
        description:
            "An intelligent AI-powered desktop assistant that understands natural language commands and automates daily tasks with voice interaction.",
        tags: ["Python", "AI/ML", "NLP", "Voice Recognition"],
        year: "2024",
    },
    {
        title: "Face Recognition Attendance",
        description:
            "Automated attendance tracking system using computer vision and facial recognition to streamline classroom management.",
        tags: ["OpenCV", "Deep Learning", "Python", "Database"],
        year: "2024",
    },
    {
        title: "Virtual Mouse",
        description:
            "Gesture-controlled virtual mouse using hand tracking and computer vision, enabling touchless computer interaction.",
        tags: ["MediaPipe", "Computer Vision", "Python", "OpenCV"],
        year: "2023",
    },
    {
        title: "AI Projects Collection",
        description:
            "A curated collection of innovative AI experiments and prototypes exploring the boundaries of machine learning applications.",
        tags: ["TensorFlow", "PyTorch", "Research", "ML"],
        year: "2023",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function Projects() {
    return (
        <motion.section
            className="relative z-20 min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-7xl mx-auto mb-16"
            >
                <span className="text-xs font-medium tracking-widest text-white/40 uppercase" style={{ letterSpacing: '0.2em' }}>
                    My Work
                </span>
                <h2 className="mt-4 font-bold text-white" style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    letterSpacing: '-0.03em',
                }}>
                    Featured
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {" "}
                        Projects
                    </span>
                </h2>
                <p className="mt-4 text-white/50 max-w-xl" style={{
                    fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                    lineHeight: 1.7,
                }}>
                    Exploring the intersection of AI, computer vision, and creative
                    development through innovative projects.
                </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.title}
                        variants={cardVariants}
                    >
                        <TiltCard className="h-full">
                            <article className="group relative h-full">
                                {/* Card */}
                                <div className="relative h-full p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_20px_80px_-20px_rgba(139,92,246,0.3)]">
                                    {/* Gradient Glow */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Year Badge */}
                                    <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-white/40 bg-white/[0.05] rounded-full mb-6" style={{ letterSpacing: '0.1em' }}>
                                        {project.year}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-bold text-white mb-4 group-hover:text-white/90 transition-colors" style={{
                                        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/50 mb-8 group-hover:text-white/60 transition-colors" style={{
                                        fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                                        lineHeight: 1.7,
                                    }}>
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 text-xs font-medium text-white/60 bg-white/[0.05] rounded-full border border-white/[0.08] group-hover:border-white/[0.15] transition-colors"
                                                style={{ letterSpacing: '0.05em' }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

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
                            </article>
                        </TiltCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative z-10 flex justify-center mt-16"
            >
                <motion.a
                    href="/projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300"
                    style={{
                        fontSize: '0.85rem',
                        letterSpacing: '0.08em',
                    }}
                >
                    View All Projects
                    <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </motion.a>
            </motion.div>
        </motion.section>
    );
}
