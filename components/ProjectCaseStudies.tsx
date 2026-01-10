"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";
import ParticleBackground from "./ParticleBackground";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    tags: string[];
    year: string;
    challenges: string[];
    techStack: string[];
    features: string[];
    link?: string;
}

const projects: Project[] = [
    {
        id: "sam",
        title: "SAM - Desktop Assistant",
        description: "An intelligent AI-powered desktop assistant that understands natural language commands.",
        fullDescription: "SAM (Smart Assistant Module) is my flagship AI project – a fully-featured desktop assistant built from the ground up. It combines speech recognition, natural language understanding, and system automation to create a seamless voice-controlled experience.",
        tags: ["Python", "AI/ML", "NLP", "Voice Recognition"],
        year: "2024",
        challenges: [
            "Implementing real-time speech recognition with low latency",
            "Building a context-aware conversation system",
            "Integrating with Windows system APIs for automation",
        ],
        techStack: ["Python", "SpeechRecognition", "PyTorch", "Tkinter", "Win32API"],
        features: [
            "Voice-activated commands",
            "System control (volume, brightness, apps)",
            "Web searches and information retrieval",
            "Custom AI chat integration",
        ],
        link: "https://github.com/Daivik1520/SAM-v4",
    },
    {
        id: "face-recognition",
        title: "Face Recognition Attendance",
        description: "Automated attendance tracking system using computer vision and facial recognition.",
        fullDescription: "A production-ready facial recognition system designed for educational institutions. Uses state-of-the-art face detection (YOLO) combined with ArcFace/AdaFace embeddings for highly accurate identification even in challenging lighting conditions.",
        tags: ["OpenCV", "Deep Learning", "Python", "Database"],
        year: "2024",
        challenges: [
            "Achieving >99% accuracy across diverse lighting",
            "Real-time processing with multiple faces",
            "Building a teacher-friendly dashboard interface",
        ],
        techStack: ["Python", "OpenCV", "YOLO", "ArcFace", "Flask", "SQLite"],
        features: [
            "Real-time multi-face detection",
            "Automatic attendance logging",
            "Teacher dashboard with analytics",
            "Student enrollment system",
        ],
        link: "https://github.com/Daivik1520/facial_recognition",
    },
    {
        id: "virtual-mouse",
        title: "Virtual Mouse",
        description: "Gesture-controlled virtual mouse using hand tracking and computer vision.",
        fullDescription: "A touchless computer interaction system that tracks hand gestures via webcam to control the mouse cursor. Built using Google's MediaPipe for hand landmark detection with custom gesture recognition algorithms.",
        tags: ["MediaPipe", "Computer Vision", "Python", "OpenCV"],
        year: "2023",
        challenges: [
            "Reducing jitter in cursor movement",
            "Implementing reliable click gesture detection",
            "Optimizing for real-time performance",
        ],
        techStack: ["Python", "MediaPipe", "OpenCV", "PyAutoGUI", "NumPy"],
        features: [
            "Cursor control via index finger",
            "Click gestures (pinch to click)",
            "Scroll gestures",
            "Drag and drop support",
        ],
        link: "https://github.com/Daivik1520/virtual-mouse",
    },
    {
        id: "llm-council",
        title: "LLM Council",
        description: "A curated collection of innovative AI experiments and prototypes.",
        fullDescription: "A unique approach to AI responses – this system queries multiple Large Language Models simultaneously, has them peer-review each other's answers, and synthesizes the best response. Think of it as a 'council of AIs' debating to give you the most accurate answer.",
        tags: ["LLM", "AI", "Web App", "Research"],
        year: "2023",
        challenges: [
            "Managing multiple API calls efficiently",
            "Designing the peer-review algorithm",
            "Creating intuitive UI for complex output",
        ],
        techStack: ["TypeScript", "Next.js", "OpenAI API", "Anthropic API", "Tailwind"],
        features: [
            "Multi-LLM querying",
            "Peer review and synthesis",
            "Response comparison view",
            "Best answer selection",
        ],
        link: "https://github.com/Daivik1520/llm-council",
    },
];

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] rounded-3xl border border-white/10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 md:p-12 border-b border-white/5">
                    <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-white/40 bg-white/5 rounded-full mb-4">
                        {project.year}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                        {project.title}
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                        {project.fullDescription}
                    </p>
                </div>

                <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 text-sm text-white/70 bg-violet-500/10 border border-violet-500/20 rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-white/60">
                                    <span className="text-emerald-400 mt-1">▸</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">Technical Challenges</h3>
                        <div className="space-y-3">
                            {project.challenges.map((challenge, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                    <span className="text-white/70">{challenge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {project.link && (
                    <div className="p-8 md:p-12 pt-0">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
                        >
                            View on GitHub
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function ProjectCaseStudies() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <>
            <section className="relative z-20 min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
                {/* Particle Background */}
                <div className="absolute inset-0 z-0">
                    <ParticleBackground />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-7xl mx-auto mb-16"
                >
                    <span className="text-xs font-medium tracking-widest text-white/40 uppercase" style={{ letterSpacing: '0.2em' }}>
                        Case Studies
                    </span>
                    <h2 className="mt-4 font-bold text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
                        Deep Dive Into
                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"> Projects</span>
                    </h2>
                    <p className="mt-4 text-white/50 max-w-xl" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}>
                        Click on any project to explore the technical challenges, solutions, and learnings.
                    </p>
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard>
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="w-full text-left group"
                                >
                                    <div className="relative h-full p-8 rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.15]">
                                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="flex items-start justify-between mb-4">
                                            <span className="px-3 py-1 text-xs font-medium tracking-wide text-white/40 bg-white/5 rounded-full">
                                                {project.year}
                                            </span>
                                            <span className="text-xs text-violet-400/80 font-medium uppercase tracking-wider">
                                                View Case Study →
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                                            {project.title}
                                        </h3>
                                        <p className="text-white/50 mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="px-2 py-1 text-xs text-white/50 bg-white/5 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </button>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* View All Projects Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10 flex justify-center mt-16"
                >
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300"
                        style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}
                    >
                        View All Projects
                        <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
