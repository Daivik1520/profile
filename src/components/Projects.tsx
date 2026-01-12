"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { featuredProjects, categories, Project } from "@/data/projects";
import Card3D from "./Card3D";
import NeuralBackground from "./NeuralBackground";

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const categoryInfo = categories[project.category];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card3D
                glareColor="rgba(139, 92, 246, 0.2)"
                style={{ height: "100%" }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: "220px",
                        backgroundImage: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(79, 70, 229, 0.06) 100%)",
                        border: "1px solid rgba(139, 92, 246, 0.25)",
                        borderRadius: "16px",
                        padding: "24px",
                        cursor: "pointer",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(139, 92, 246, 0.1)",
                    }}
                >
                    {/* Category badge */}
                    <div style={{
                        display: "inline-flex",
                        alignSelf: "flex-start",
                        padding: "5px 12px",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: categoryInfo.color,
                        background: `${categoryInfo.color}25`,
                        borderRadius: "6px",
                        letterSpacing: "0.03em",
                        marginBottom: "14px",
                        border: `1px solid ${categoryInfo.color}30`,
                    }}>
                        {categoryInfo.name}
                    </div>

                    {/* Title */}
                    <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "10px",
                        lineHeight: 1.3,
                    }}>
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: "18px",
                    }}>
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                    }}>
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                style={{
                                    padding: "5px 12px",
                                    fontSize: "0.7rem",
                                    fontWeight: 500,
                                    borderRadius: "6px",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(255,255,255,0.6)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Card3D>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section style={{
            position: "relative",
            padding: "100px 0",
            background: "#0a0a0a",
            overflow: "hidden",
        }}>
            {/* Neural Network Background for this section */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <NeuralBackground
                    neuronCount={40}
                    connectionDistance={100}
                    mouseConnectionDistance={160}
                />
            </div>
            {/* Top gradient border */}
            <div style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
            }} />

            {/* Container */}
            <div style={{
                maxWidth: "1100px",
                margin: "0 auto",
                padding: "0 24px",
                position: "relative",
                zIndex: 1,
            }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: "center",
                        marginBottom: "56px",
                    }}
                >
                    <span style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "rgba(167, 139, 250, 0.9)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                    }}>
                        Featured Work
                    </span>
                    <h2 style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        color: "#ffffff",
                        marginBottom: "16px",
                        letterSpacing: "-0.02em",
                    }}>
                        Selected Projects
                    </h2>
                    <p style={{
                        fontSize: "1rem",
                        color: "rgba(255,255,255,0.4)",
                        maxWidth: "450px",
                        margin: "0 auto",
                    }}>
                        AI-powered applications and innovative solutions
                    </p>
                </motion.div>

                {/* Project Grid - 4 Featured */}
                <div
                    className="project-grid-home"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "24px",
                    }}
                >
                    {featuredProjects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "48px",
                    }}
                >
                    <Link href="/projects" style={{ textDecoration: "none" }}>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: "14px 28px",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                color: "#ffffff",
                                backgroundImage: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                border: "none",
                                borderRadius: "12px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 8px 32px rgba(124, 58, 237, 0.3)",
                            }}
                        >
                            View All 23 Projects
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Responsive styles */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    .project-grid-home {
                        grid-template-columns: 1fr !important;
                        gap: 16px !important;
                    }
                }
                @media (max-width: 480px) {
                    .project-grid-home {
                        gap: 12px !important;
                    }
                }
            `}</style>
        </section>
    );
}
