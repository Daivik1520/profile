"use client";

import { useState } from "react";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";
import EmailFab from "@/components/EmailFab";
import FooterMinimal from "@/components/FooterMinimal";
import TextSplitAnimation from "@/components/TextSplitAnimation";
import PageTransition from "@/components/PageTransition";

interface Project {
  name: string;
  description: string;
  tech?: string;
  license?: string;
  link: string;
  icon: string;
}

interface Category {
  title: string;
  projects: Project[];
}

const featuredProjects: Project[] = [
  {
    name: "SAM-v4",
    description:
      "Fourth iteration of the SAM desktop AI assistant with voice control, system automation, and AI chat integration.",
    tech: "Python",
    license: "MIT",
    link: "https://github.com/Daivik1520/SAM-v4",
    icon: "🤖",
  },
  {
    name: "facial_recognition",
    description:
      "AI-powered facial recognition system for automated classroom attendance tracking with ArcFace/AdaFace + YOLO models.",
    tech: "Python",
    link: "https://github.com/Daivik1520/facial_recognition",
    icon: "👁️",
  },
  {
    name: "llm-council",
    description:
      "Local web app querying multiple LLMs to peer-review each other's answers and synthesize the best response.",
    tech: "TypeScript",
    link: "https://github.com/Daivik1520/llm-council",
    icon: "🧠",
  },
  {
    name: "virtual-mouse",
    description:
      "Control the computer cursor using hand gestures via webcam with OpenCV, MediaPipe, and PyAutoGUI.",
    tech: "Python",
    link: "https://github.com/Daivik1520/virtual-mouse",
    icon: "🖐️",
  },
];

const categories: Category[] = [
  {
    title: "AI & Machine Learning",
    projects: [
      {
        name: "SAMgpt",
        description: "Customized GPT implementation for educational and research purposes",
        tech: "Jupyter Notebook",
        license: "MIT",
        link: "https://github.com/Daivik1520/SAMgpt",
        icon: "📓",
      },
      {
        name: "face-swapping",
        description: "Python-based face swapping project using deep learning",
        tech: "Python",
        link: "https://github.com/Daivik1520/face-swapping",
        icon: "🎭",
      },
      {
        name: "Heart-disease-recognition",
        description: "Heart disease prediction using 8 ML algorithms with 95% accuracy",
        tech: "Python",
        link: "https://github.com/Daivik1520/Heart-disease-recognition",
        icon: "❤️",
      },
      {
        name: "face-recognition",
        description: "Face recognition system with MIT License",
        tech: "Python",
        license: "MIT",
        link: "https://github.com/Daivik1520/face-recognition",
        icon: "🧑‍💻",
      },
    ],
  },
  {
    title: "SAM Assistant Versions",
    projects: [
      {
        name: "SAM-v3",
        description: "Third version of SAM assistant with improved features",
        tech: "Python",
        license: "MIT",
        link: "https://github.com/Daivik1520/SAM-v3",
        icon: "🤖",
      },
      {
        name: "SAM-v2",
        description: "Voice-controlled Windows assistant with system controls and AI chat",
        tech: "Python",
        link: "https://github.com/Daivik1520/SAM-v2",
        icon: "🎙️",
      },
      {
        name: "SAM.CHAT",
        description: "Modern chat interface for SAM assistant",
        tech: "TypeScript",
        license: "MIT",
        link: "https://github.com/Daivik1520/SAM.CHAT",
        icon: "💬",
      },
      {
        name: "SAMchatbot",
        description: "Simple chatbot with offline Q&A and Wikipedia fallback",
        tech: "Python",
        link: "https://github.com/Daivik1520/SAMchatbot",
        icon: "🗨️",
      },
    ],
  },
  {
    title: "Computer Vision",
    projects: [
      {
        name: "gesture-driver",
        description: "AI-powered computer control using hand gestures via webcam",
        tech: "Python",
        link: "https://github.com/Daivik1520/gesture-driver",
        icon: "✋",
      },
      {
        name: "gesture-based-gaming",
        description: "Gaming control through hand gestures",
        tech: "Python",
        license: "MIT",
        link: "https://github.com/Daivik1520/gesture-based-gaming",
        icon: "🎮",
      },
    ],
  },
  {
    title: "Web Projects",
    projects: [
      {
        name: "Search2Download",
        description: "Turn Google searches into direct downloads programmatically",
        tech: "JavaScript",
        link: "https://github.com/Daivik1520/Search2Download",
        icon: "⬇️",
      },
      {
        name: "terminal_tunes",
        description: "Terminal-based music player application",
        tech: "JavaScript",
        link: "https://github.com/Daivik1520/teminal_tunes",
        icon: "🎵",
      },
      {
        name: "city-roads",
        description: "High-performance visualization rendering every road in cities using WebGL",
        tech: "JavaScript",
        link: "https://github.com/Daivik1520/city-roads",
        icon: "🗺️",
      },
      {
        name: "youtube-finder",
        description: "YouTube search application",
        tech: "TypeScript",
        link: "https://github.com/Daivik1520/youtube-finder",
        icon: "🔍",
      },
    ],
  },
];

export default function ProjectsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (title: string) =>
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <PageTransition>
      <NavMenu />
      <main>
        <div className="section me-section" style={{ paddingTop: "6rem" }}>
          <Link href="/" className="h4 link" style={{ display: "inline-block", marginBottom: "2.5rem" }}>
            ← Home
          </Link>

          <TextSplitAnimation text="Projects" className="hero-name" tag="div" />
          <p className="intro-text" style={{ maxWidth: "44rem", marginTop: "1.5rem" }}>
            A running list of things I&apos;ve built — mostly AI, computer vision,
            and web experiments.
          </p>
        </div>

        <div className="section me-section" style={{ paddingTop: 0 }}>
          <div className="section-title">
            <TextSplitAnimation text="Featured" className="h2" tag="div" />
          </div>
          <div className="career-grid cols-2">
            {featuredProjects.map((project) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="career-card"
              >
                <div className="career-mark">{project.icon}</div>
                <div>
                  <div className="h4" style={{ marginBottom: "0.5rem" }}>
                    {project.name}
                  </div>
                  <p className="b2" style={{ marginBottom: "0.75rem" }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {project.tech && <span className="c label amber show-type-tag">{project.tech}</span>}
                    {project.license && (
                      <span className="c label amber show-type-tag">{project.license}</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {categories.map((category) => {
          const isExpanded = expanded[category.title];
          const visible = isExpanded ? category.projects : category.projects.slice(0, 3);
          const hasMore = category.projects.length > 3;

          return (
            <div key={category.title}>
              <DividerLineSimple />
              <div className="section me-section">
                <div className="section-title">
                  <TextSplitAnimation text={category.title} className="h2" tag="div" />
                </div>

                <div>
                  {visible.map((project) => (
                    <a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card"
                    >
                      <div className="card-icon">
                        <span style={{ fontSize: "1.5rem" }}>{project.icon}</span>
                      </div>
                      <div className="card-text">
                        <div className="card-title-group">
                          <div className="h4">{project.name}</div>
                          <div className="h4" style={{ fontWeight: 400, opacity: 0.6 }}>
                            {project.description}
                          </div>
                        </div>
                        <div className="c amber">{project.tech}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {hasMore && (
                  <button
                    onClick={() => toggle(category.title)}
                    className="button"
                    style={{
                      marginTop: "1.5rem",
                      background: "rgba(0,0,0,0.08)",
                      borderColor: "rgba(0,0,0,0.15)",
                    }}
                  >
                    <span className="h4" style={{ color: "#000" }}>
                      {isExpanded ? "Show less" : `View ${category.projects.length - 3} more`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <DividerLineSimple />
        <div className="section me-section" style={{ textAlign: "center" }}>
          <p className="b2" style={{ marginBottom: "1.5rem" }}>
            Explore more on GitHub
          </p>
          <a
            href="https://github.com/Daivik1520"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{ background: "#000", borderColor: "#000" }}
          >
            <span className="h4" style={{ color: "#FFD177" }}>View GitHub Profile</span>
          </a>
        </div>

        <FooterMinimal />
      </main>
      <EmailFab />
    </PageTransition>
  );
}

function DividerLineSimple() {
  return (
    <div className="section">
      <div className="divider">
        <div className="divider-line" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
