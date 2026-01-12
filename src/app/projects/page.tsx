"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, categories, Project, skills, skillCategories, getProjectsBySkill, Skill } from "@/data/projects";
import Card3D from "@/components/Card3D";
import NeuralBackground from "@/components/NeuralBackground";

// Project Modal Component
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const categoryInfo = categories[project.category];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "550px",
                    backgroundImage: "linear-gradient(135deg, rgba(20,20,25,1) 0%, rgba(12,12,16,1) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "28px",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                        border: "none",
                        color: "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div style={{
                    display: "inline-flex",
                    padding: "5px 10px",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: categoryInfo.color,
                    background: `${categoryInfo.color}20`,
                    borderRadius: "6px",
                    marginBottom: "14px",
                }}>
                    {categoryInfo.name}
                </div>

                <h2 style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: "10px",
                }}>
                    {project.title}
                </h2>

                {project.stars && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.8rem",
                        marginBottom: "16px",
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {project.stars} star{project.stars > 1 ? "s" : ""}
                    </div>
                )}

                <p style={{
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.65,
                    marginBottom: "20px",
                }}>
                    {project.longDescription || project.description}
                </p>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "24px",
                }}>
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            style={{
                                padding: "5px 12px",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                borderRadius: "6px",
                                background: "rgba(139, 92, 246, 0.12)",
                                color: "rgba(196, 181, 253, 0.85)",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                flex: 1,
                                padding: "12px",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "#ffffff",
                                backgroundImage: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                border: "none",
                                borderRadius: "10px",
                                textDecoration: "none",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                flex: 1,
                                padding: "12px",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "#ffffff",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "10px",
                                textDecoration: "none",
                                textAlign: "center",
                            }}
                        >
                            Live Demo
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Skill Modal - shows projects for a skill
function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
    const relatedProjects = getProjectsBySkill(skill);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (selectedProject) {
        return <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                overflowY: "auto",
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "700px",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    backgroundImage: "linear-gradient(135deg, rgba(20,20,25,1) 0%, rgba(12,12,16,1) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "28px",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                        border: "none",
                        color: "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Skill Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: `${skill.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: skill.color,
                    }}>
                        {skill.name.charAt(0)}
                    </div>
                    <div>
                        <h2 style={{
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            color: "#ffffff",
                        }}>
                            {skill.name}
                        </h2>
                        <p style={{
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.4)",
                        }}>
                            {skillCategories[skill.category].name}
                        </p>
                    </div>
                </div>

                <p style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "24px",
                }}>
                    {relatedProjects.length} project{relatedProjects.length !== 1 ? "s" : ""} using {skill.name}
                </p>

                {/* Related Projects */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "12px",
                }}>
                    {relatedProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedProject(project)}
                            style={{
                                padding: "16px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "12px",
                                cursor: "pointer",
                            }}
                        >
                            <h4 style={{
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                color: "#ffffff",
                                marginBottom: "6px",
                            }}>
                                {project.title}
                            </h4>
                            <p style={{
                                fontSize: "0.75rem",
                                color: "rgba(255,255,255,0.4)",
                                lineHeight: 1.4,
                            }}>
                                {project.description.slice(0, 60)}...
                            </p>
                        </motion.div>
                    ))}
                </div>

                {relatedProjects.length === 0 && (
                    <p style={{
                        textAlign: "center",
                        color: "rgba(255,255,255,0.3)",
                        padding: "32px",
                    }}>
                        No projects found for this skill yet.
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

// Project Card Component
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    const categoryInfo = categories[project.category];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card3D
                onClick={onClick}
                glareColor="rgba(139, 92, 246, 0.15)"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        padding: "18px",
                        cursor: "pointer",
                        minHeight: "140px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}>
                        <span style={{
                            padding: "3px 8px",
                            fontSize: "0.6rem",
                            fontWeight: 600,
                            color: categoryInfo.color,
                            background: `${categoryInfo.color}20`,
                            borderRadius: "4px",
                        }}>
                            {categoryInfo.name}
                        </span>
                        {project.stars && (
                            <span style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                                fontSize: "0.65rem",
                                color: "rgba(255,255,255,0.35)",
                            }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {project.stars}
                            </span>
                        )}
                    </div>

                    <h3 style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "6px",
                    }}>
                        {project.title}
                    </h3>

                    <p style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.45,
                        flex: 1,
                    }}>
                        {project.description.length > 80 ? project.description.slice(0, 80) + "..." : project.description}
                    </p>
                </div>
            </Card3D>
        </motion.div>
    );
}

// Skill Card Component
function SkillCard({ skill, onClick }: { skill: Skill; onClick: () => void }) {
    const projectCount = getProjectsBySkill(skill).length;

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            style={{
                padding: "14px 18px",
                background: `${skill.color}10`,
                border: `1px solid ${skill.color}30`,
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: `${skill.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: skill.color,
            }}>
                {skill.name.charAt(0)}
            </div>
            <div>
                <h4 style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#ffffff",
                }}>
                    {skill.name}
                </h4>
                <p style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.4)",
                }}>
                    {projectCount} project{projectCount !== 1 ? "s" : ""}
                </p>
            </div>
        </motion.div>
    );
}

// Main Page Component
export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [filter, setFilter] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects");

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <main style={{ background: "#0a0a0a", minHeight: "100vh", position: "relative" }}>
            {/* Neural Network Background */}
            <NeuralBackground
                neuronCount={70}
                connectionDistance={120}
                mouseConnectionDistance={180}
            />
            {/* Header */}
            <header style={{
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Home
                    </div>
                </Link>
                <a
                    href="https://github.com/Daivik1520"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 14px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "8px",
                        textDecoration: "none",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                </a>
            </header>

            <div style={{
                maxWidth: "1100px",
                margin: "0 auto",
                padding: "40px 20px",
            }}>
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: "32px" }}
                >
                    <h1 style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        color: "#ffffff",
                        marginBottom: "10px",
                        letterSpacing: "-0.02em",
                    }}>
                        Projects & Skills
                    </h1>
                    <p style={{
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.4)",
                    }}>
                        {projects.length} projects • {skills.length} skills
                    </p>
                </motion.div>

                {/* Tabs */}
                <div style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "28px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    paddingBottom: "12px",
                }}>
                    <button
                        onClick={() => setActiveTab("projects")}
                        style={{
                            padding: "10px 20px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: activeTab === "projects" ? "#ffffff" : "rgba(255,255,255,0.4)",
                            background: activeTab === "projects" ? "rgba(139, 92, 246, 0.15)" : "transparent",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        All Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("skills")}
                        style={{
                            padding: "10px 20px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: activeTab === "skills" ? "#ffffff" : "rgba(255,255,255,0.4)",
                            background: activeTab === "skills" ? "rgba(236, 72, 153, 0.15)" : "transparent",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Skills
                    </button>
                </div>

                {activeTab === "projects" && (
                    <>
                        {/* Filters */}
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                            marginBottom: "24px",
                        }}>
                            <button
                                onClick={() => setFilter("all")}
                                style={{
                                    padding: "7px 14px",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    color: filter === "all" ? "#ffffff" : "rgba(255,255,255,0.45)",
                                    background: filter === "all" ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${filter === "all" ? "rgba(139, 92, 246, 0.3)" : "rgba(255,255,255,0.05)"}`,
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                }}
                            >
                                All ({projects.length})
                            </button>
                            {Object.entries(categories).map(([key, cat]) => {
                                const count = projects.filter(p => p.category === key).length;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setFilter(key)}
                                        style={{
                                            padding: "7px 14px",
                                            fontSize: "0.75rem",
                                            fontWeight: 500,
                                            color: filter === key ? cat.color : "rgba(255,255,255,0.45)",
                                            background: filter === key ? `${cat.color}20` : "rgba(255,255,255,0.03)",
                                            border: `1px solid ${filter === key ? `${cat.color}35` : "rgba(255,255,255,0.05)"}`,
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {cat.name} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Projects Grid */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: "14px",
                        }}>
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "skills" && (
                    <>
                        {/* Skills by Category */}
                        {Object.entries(skillCategories).map(([catKey, catInfo]) => {
                            const categorySkills = skills.filter(s => s.category === catKey);
                            if (categorySkills.length === 0) return null;

                            return (
                                <div key={catKey} style={{ marginBottom: "32px" }}>
                                    <h3 style={{
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        color: catInfo.color,
                                        marginBottom: "14px",
                                    }}>
                                        {catInfo.name}
                                    </h3>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                        gap: "10px",
                                    }}>
                                        {categorySkills.map((skill) => (
                                            <SkillCard
                                                key={skill.id}
                                                skill={skill}
                                                onClick={() => setSelectedSkill(skill)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
                {selectedSkill && (
                    <SkillModal
                        skill={selectedSkill}
                        onClose={() => setSelectedSkill(null)}
                    />
                )}
            </AnimatePresence>

            <style jsx global>{`
                .project-card-item:hover {
                    border-color: rgba(139, 92, 246, 0.25) !important;
                    background-image: linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(79, 70, 229, 0.03) 100%) !important;
                }
                .project-card-item:hover h3 {
                    color: rgb(196, 181, 253) !important;
                }
            `}</style>
        </main>
    );
}
