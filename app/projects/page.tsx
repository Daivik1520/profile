import NavMenu from "@/components/NavMenu";
import EmailFab from "@/components/EmailFab";
import PageTransition from "@/components/PageTransition";

interface Project {
  name: string;
  description: string;
  tech: string;
  year: string;
  link: string;
  live?: string;
}

interface ProjectCategory {
  id: string;
  title: string;
  projects: Project[];
}

// Sourced from github.com/Daivik1520 — keep in sync when new repos ship.
const categories: ProjectCategory[] = [
  {
    id: "ai-assistants",
    title: "AI Assistants",
    projects: [
      {
        name: "MARK",
        description:
          "The latest evolution of my assistant series — headless, web-based, faster and smarter than SAM and DAV.",
        tech: "Python",
        year: "2026",
        link: "https://github.com/Daivik1520/MARK",
      },
      {
        name: "DAV-v1",
        description:
          "JARVIS-style local AI with deep system control, advanced automation, and high-level voice execution.",
        tech: "Python",
        year: "2026",
        link: "https://github.com/Daivik1520/DAV-v1",
      },
      {
        name: "LocalBot",
        description:
          "Privacy-first AI chatbot running entirely on local hardware with ultra-natural voice synthesis, delivered through Telegram.",
        tech: "Python",
        year: "2026",
        link: "https://github.com/Daivik1520/LocalBot",
      },
      {
        name: "SAM-v4",
        description:
          "Fourth-generation SAM desktop assistant with voice control, system automation, and AI chat.",
        tech: "Python",
        year: "2026",
        link: "https://github.com/Daivik1520/SAM-v4",
      },
      {
        name: "chatting-local",
        description: "Local-first AI chat app experiment.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/chatting-local",
      },
      {
        name: "SAM-v3",
        description: "Third iteration of SAM with improved features and stability.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/SAM-v3",
      },
      {
        name: "SAM-v2",
        description:
          "Voice-controlled Windows assistant with system controls, UI, and AI chat.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/SAM-v2",
      },
      {
        name: "SAM.CHAT",
        description: "Modern chat interface for the SAM assistant.",
        tech: "TypeScript",
        year: "2025",
        link: "https://github.com/Daivik1520/SAM.CHAT",
      },
      {
        name: "SAMchatbot",
        description:
          "Tkinter chatbot with a clean UI, offline factual Q&A, and Wikipedia fallback.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/SAMchatbot",
      },
      {
        name: "SAM",
        description: "The original SAM — where the assistant series began.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/SAM",
      },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    projects: [
      {
        name: "llm-council",
        description:
          "A council of multiple LLMs that peer-review each other's answers and synthesize the best possible response.",
        tech: "JavaScript",
        year: "2025",
        link: "https://github.com/Daivik1520/llm-council",
      },
      {
        name: "SAMgpt",
        description:
          "Customized, modular GPT implementation for educational and research purposes.",
        tech: "Jupyter",
        year: "2025",
        link: "https://github.com/Daivik1520/SAMgpt",
      },
      {
        name: "Heart-disease-recognition",
        description:
          "Heart disease prediction comparing 8 ML algorithms with 95% accuracy across 13 medical attributes.",
        tech: "Jupyter",
        year: "2025",
        link: "https://github.com/Daivik1520/Heart-disease-recognition",
      },
      {
        name: "stock_predictor",
        description: "ML-powered stock prediction with a live web dashboard.",
        tech: "JavaScript",
        year: "2026",
        link: "https://github.com/Daivik1520/stock_predictor",
        live: "https://stock-predictor-eight-alpha.vercel.app",
      },
      {
        name: "smartshop-AI",
        description:
          "AI shopping assistant that helps people find the cheapest and best items.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/smartshop-AI",
      },
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    projects: [
      {
        name: "facial_recognition",
        description:
          "Automated classroom attendance with real-time ArcFace/AdaFace + YOLO recognition and absentee flagging.",
        tech: "Python",
        year: "2026",
        link: "https://github.com/Daivik1520/facial_recognition",
      },
      {
        name: "virtual-mouse",
        description:
          "Control your cursor with hand gestures via webcam — OpenCV, MediaPipe, and PyAutoGUI.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/virtual-mouse",
      },
      {
        name: "gesture-driver",
        description:
          "AI-powered computer control that translates hand movements into navigation, gaming, and system commands.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/gesture-driver",
      },
      {
        name: "gesture-based-gaming",
        description: "Play games with hand gestures instead of a keyboard.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/gesture-based-gaming",
      },
      {
        name: "face-swapping",
        description: "Deep-learning face swapping in Python.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/face-swapping",
      },
      {
        name: "face-recognition",
        description: "Face recognition system built in Python.",
        tech: "Python",
        year: "2025",
        link: "https://github.com/Daivik1520/face-recognition",
      },
    ],
  },
  {
    id: "apps-tools",
    title: "Apps & Tools",
    projects: [
      {
        name: "DECK",
        description:
          "Turn any old device into a stream deck — a software replacement for the physical Stream Deck.",
        tech: "Python",
        year: "2026",
        link: "https://github.com/Daivik1520/DECK",
      },
      {
        name: "MirrorBar",
        description:
          "macOS menu-bar mirror to check your lighting and appearance before hopping into a video call.",
        tech: "Swift",
        year: "2026",
        link: "https://github.com/Daivik1520/MirrorBar",
      },
      {
        name: "Fitcore",
        description:
          "My first mobile app — a fitness tracker with step counting and built-in exercises.",
        tech: "JavaScript",
        year: "2026",
        link: "https://github.com/Daivik1520/Fitcore",
      },
      {
        name: "idea-spark",
        description: "App for capturing and organizing ideas the moment they strike.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/idea-spark",
      },
      {
        name: "runzone",
        description: "Running companion app experiment.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/runzone",
      },
      {
        name: "Search2Download",
        description:
          "Turns Google searches into direct downloads by programmatically executing queries and retrieving content.",
        tech: "HTML",
        year: "2026",
        link: "https://github.com/Daivik1520/Search2Download",
      },
      {
        name: "terminal_tunes",
        description: "Terminal-based music player.",
        tech: "JavaScript",
        year: "2026",
        link: "https://github.com/Daivik1520/teminal_tunes",
      },
    ],
  },
  {
    id: "web",
    title: "Web",
    projects: [
      {
        name: "MARK-MONITOR",
        description:
          "Real-time global intelligence dashboard — AI news aggregation, geopolitical monitoring, and infrastructure tracking.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/MARK-MONITOR",
        live: "https://mark-monitor.vercel.app",
      },
      {
        name: "city-roads",
        description:
          "High-performance WebGL visualization that renders every single road in a city.",
        tech: "JavaScript",
        year: "2026",
        link: "https://github.com/Daivik1520/city-roads",
      },
      {
        name: "dailyplanner-web",
        description:
          "Website for DailyPlanner — an app that keeps people focused on goals and away from social media.",
        tech: "CSS",
        year: "2026",
        link: "https://github.com/Daivik1520/dailyplanner-web",
      },
      {
        name: "MirrorBar_Web",
        description: "Marketing site for the MirrorBar app.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/MirrorBar_Web",
      },
      {
        name: "fitcore-scroll-showcase",
        description: "Scroll-driven showcase site for Fitcore.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/fitcore-scroll-showcase",
      },
      {
        name: "face_recog_website",
        description: "Website for the facial recognition project.",
        tech: "CSS",
        year: "2026",
        link: "https://github.com/Daivik1520/face_recog_website",
      },
      {
        name: "youtube-finder",
        description: "YouTube search application.",
        tech: "TypeScript",
        year: "2025",
        link: "https://github.com/Daivik1520/youtube-finder",
      },
      {
        name: "typing-speed",
        description: "Typing speed test game.",
        tech: "JavaScript",
        year: "2025",
        link: "https://github.com/Daivik1520/typing-speed-",
      },
      {
        name: "profile",
        description: "This website — my portfolio, built with Next.js.",
        tech: "TypeScript",
        year: "2026",
        link: "https://github.com/Daivik1520/profile",
        live: "https://daivikreddy.online",
      },
    ],
  },
];

const totalProjects = categories.reduce(
  (sum, cat) => sum + cat.projects.length,
  0
);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://daivikreddy.online/projects#collection",
  name: "Projects by Daivik Reddy",
  description:
    "Open-source projects by Daivik Reddy — AI assistants, machine learning, computer vision, apps, and web experiments.",
  url: "https://daivikreddy.online/projects",
  isPartOf: { "@id": "https://daivikreddy.online/#website" },
  author: { "@id": "https://daivikreddy.online/#person" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: totalProjects,
    itemListElement: categories.flatMap((cat) =>
      cat.projects.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: project.description,
        programmingLanguage: project.tech,
        codeRepository: project.link,
        author: { "@id": "https://daivikreddy.online/#person" },
      }))
    ),
  },
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="list-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <NavMenu />
        <main>
          <div className="list-grid">
            <aside className="list-side">
              <div>
                <h1 className="list-title list-title-long">Projects</h1>
                <p className="list-intro">
                  Everything I&apos;ve built so far — {totalProjects} projects
                  across AI assistants, machine learning, computer vision,
                  apps, and the web. All open source, all on GitHub.
                </p>
              </div>
              <nav className="list-cats">
                {categories.map((cat) => (
                  <a key={cat.id} href={`#${cat.id}`} className="list-cat-link">
                    {cat.title}
                  </a>
                ))}
                <a
                  href="https://github.com/Daivik1520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="list-cat-link"
                >
                  GitHub ↗
                </a>
              </nav>
            </aside>

            <div>
              {categories.map((cat) => (
                <section key={cat.id} id={cat.id} className="list-section">
                  <div className="list-section-rule" />
                  <h2 className="list-section-title">{cat.title}</h2>
                  {cat.projects.map((project) => (
                    <a
                      key={project.name}
                      href={project.live ?? project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="list-row project-row"
                    >
                      <span className="list-row-title">
                        {project.name}
                        <span className="list-row-desc">{project.description}</span>
                      </span>
                      <span className="list-row-meta">{project.tech}</span>
                      <span className="list-row-meta year">{project.year}</span>
                      <span className="list-row-link">
                        {project.live ? "Live" : "GitHub"} ↗
                      </span>
                    </a>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </main>
        <EmailFab />
      </div>
    </PageTransition>
  );
}
