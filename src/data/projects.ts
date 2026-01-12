export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    category: "ai-assistant" | "ml-ai" | "computer-vision" | "gesture" | "web-app" | "dev-tool";
    stars?: number;
    github?: string;
    demo?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    // AI Assistants
    {
        id: "sam-chat",
        title: "SAM.CHAT",
        description: "Desktop AI assistant built with TypeScript featuring natural language processing and system integration.",
        longDescription: "SAM.CHAT is an advanced desktop AI assistant that understands voice commands, automates tasks, sends WhatsApp messages, and provides real-time assistance. Built with TypeScript for reliability and performance.",
        tags: ["TypeScript", "AI", "NLP", "Desktop App"],
        category: "ai-assistant",
        github: "https://github.com/Daivik1520/SAM.CHAT",
        featured: true,
    },
    {
        id: "sam-v4",
        title: "SAM v4",
        description: "Latest Python-based iteration of SAM assistant with enhanced AI capabilities.",
        longDescription: "The fourth generation of SAM brings improved natural language understanding, faster response times, and enhanced system integration capabilities.",
        tags: ["Python", "AI", "Voice Control"],
        category: "ai-assistant",
        stars: 1,
        github: "https://github.com/Daivik1520/SAM-v4",
    },
    {
        id: "sam-v3",
        title: "SAM v3",
        description: "Third version of SAM assistant with MIT license.",
        tags: ["Python", "AI", "Assistant"],
        category: "ai-assistant",
        stars: 2,
        github: "https://github.com/Daivik1520/SAM-v3",
    },
    {
        id: "sam-v2",
        title: "SAM v2",
        description: "Voice-controlled Windows assistant featuring system controls, UI, and AI chat.",
        longDescription: "SAM v2 introduced voice control capabilities, a graphical user interface, and the ability to control Windows system functions through natural language commands.",
        tags: ["Python", "Voice Control", "Windows", "UI"],
        category: "ai-assistant",
        stars: 2,
        github: "https://github.com/Daivik1520/SAM-v2",
    },
    {
        id: "sam",
        title: "SAM",
        description: "Original SAM assistant implementation - the foundation of the SAM series.",
        tags: ["Python", "AI", "Assistant"],
        category: "ai-assistant",
        stars: 2,
        github: "https://github.com/Daivik1520/SAM",
    },

    // ML & AI
    {
        id: "samgpt",
        title: "SAMgpt",
        description: "Customized GPT implementation for educational and research purposes.",
        longDescription: "A custom GPT implementation designed to help understand transformer architectures and serve as a foundation for AI research and education.",
        tags: ["Jupyter", "GPT", "ML", "Research"],
        category: "ml-ai",
        stars: 4,
        github: "https://github.com/Daivik1520/SAMgpt",
        featured: true,
    },
    {
        id: "llm-council",
        title: "LLM Council",
        description: "Web app that queries multiple LLMs to peer-review answers and synthesize optimal responses.",
        longDescription: "An innovative approach to AI responses - this web app queries multiple large language models simultaneously, allows them to peer-review each other's answers, and synthesizes the optimal response.",
        tags: ["Web App", "LLM", "AI", "Multi-model"],
        category: "ml-ai",
        stars: 1,
        github: "https://github.com/Daivik1520/llm-council",
    },
    {
        id: "samchatbot",
        title: "SAMchatbot",
        description: "Tkinter-based chatbot with offline factual Q&A and Wikipedia fallback.",
        tags: ["Python", "Tkinter", "Chatbot", "NLP"],
        category: "ml-ai",
        stars: 3,
        github: "https://github.com/Daivik1520/SAMchatbot",
    },
    {
        id: "heart-disease",
        title: "Heart Disease Recognition",
        description: "ML system achieving 95% accuracy comparing 8 algorithms for early risk assessment.",
        longDescription: "A comprehensive machine learning study comparing 8 different algorithms for heart disease prediction. Achieved 95% accuracy in early risk assessment, potentially saving lives through early detection.",
        tags: ["Python", "ML", "Healthcare", "Classification"],
        category: "ml-ai",
        stars: 2,
        github: "https://github.com/Daivik1520/Heart-disease-recognition",
    },

    // Computer Vision
    {
        id: "facial-recognition",
        title: "Facial Recognition Attendance",
        description: "AI-powered classroom attendance using ArcFace/AdaFace + YOLO detection.",
        longDescription: "An automated attendance system for classrooms using state-of-the-art facial recognition (ArcFace/AdaFace) combined with YOLO object detection for robust face detection even in challenging conditions.",
        tags: ["Python", "ArcFace", "YOLO", "TensorFlow"],
        category: "computer-vision",
        stars: 1,
        github: "https://github.com/Daivik1520/facial_recognition",
        featured: true,
    },
    {
        id: "face-recognition",
        title: "Face Recognition",
        description: "Face recognition implementation for identity verification.",
        tags: ["Python", "Computer Vision", "ML"],
        category: "computer-vision",
        stars: 3,
        github: "https://github.com/Daivik1520/face-recognition",
    },
    {
        id: "face-swapping",
        title: "Face Swapping",
        description: "Real-time face swap technology using deep learning.",
        tags: ["Python", "Deep Learning", "Computer Vision"],
        category: "computer-vision",
        stars: 3,
        github: "https://github.com/Daivik1520/face-swapping",
    },

    // Gesture Control
    {
        id: "virtual-mouse",
        title: "Virtual Mouse",
        description: "Hands-free cursor control using hand gestures with OpenCV and MediaPipe.",
        longDescription: "Control your computer without touching it! This project uses computer vision to track hand gestures and translate them into mouse movements and clicks. Built with OpenCV and MediaPipe for real-time performance.",
        tags: ["Python", "OpenCV", "MediaPipe", "Gesture"],
        category: "gesture",
        stars: 2,
        github: "https://github.com/Daivik1520/virtual-mouse",
        featured: true,
    },
    {
        id: "gesture-driver",
        title: "Gesture Driver",
        description: "Control your computer via hand gestures using computer vision and ML.",
        tags: ["Python", "Computer Vision", "ML", "Gesture"],
        category: "gesture",
        stars: 3,
        github: "https://github.com/Daivik1520/gesture-driver",
    },
    {
        id: "gesture-gaming",
        title: "Gesture Gaming",
        description: "Gaming control through gesture recognition - play games hands-free!",
        tags: ["Python", "Gaming", "Gesture", "CV"],
        category: "gesture",
        stars: 2,
        github: "https://github.com/Daivik1520/gesture-based-gaming",
    },

    // Web Applications
    {
        id: "city-roads",
        title: "City Roads",
        description: "WebGL-powered visualization rendering every road in any city.",
        longDescription: "A beautiful WebGL visualization tool that can render every single road in any city on the planet. Creates stunning art-like representations of urban infrastructure.",
        tags: ["JavaScript", "WebGL", "Visualization", "Maps"],
        category: "web-app",
        stars: 1,
        github: "https://github.com/Daivik1520/city-roads",
    },
    {
        id: "search2download",
        title: "Search2Download",
        description: "Convert Google searches into direct downloads via automated query execution.",
        tags: ["Automation", "Web", "Tool"],
        category: "web-app",
        github: "https://github.com/Daivik1520/Search2Download",
    },
    {
        id: "typing-speed",
        title: "Typing Speed Test",
        description: "Interactive typing speed test application with WPM tracking.",
        tags: ["JavaScript", "Web App", "Interactive"],
        category: "web-app",
        stars: 2,
        github: "https://github.com/Daivik1520/typing-speed-",
    },
    {
        id: "profile",
        title: "Profile Website",
        description: "Personal portfolio website showcasing projects and skills.",
        tags: ["Next.js", "React", "Framer Motion"],
        category: "web-app",
        stars: 1,
        github: "https://github.com/Daivik1520/profile",
        demo: "https://profile-sigma-seven-30.vercel.app",
    },

    // Dev Tools
    {
        id: "terminal-tunes",
        title: "Terminal Tunes",
        description: "Terminal-based music application for developers who love CLI.",
        tags: ["JavaScript", "Terminal", "Music", "CLI"],
        category: "dev-tool",
        stars: 1,
        github: "https://github.com/Daivik1520/terminal_tunes",
    },
    {
        id: "youtube-finder",
        title: "YouTube Finder",
        description: "TypeScript tool for discovering YouTube content programmatically.",
        tags: ["TypeScript", "YouTube API", "Tool"],
        category: "dev-tool",
        stars: 1,
        github: "https://github.com/Daivik1520/youtube-finder",
    },
];

export const categories = {
    "ai-assistant": { name: "AI Assistants", color: "#8b5cf6" },
    "ml-ai": { name: "Machine Learning", color: "#06b6d4" },
    "computer-vision": { name: "Computer Vision", color: "#10b981" },
    "gesture": { name: "Gesture Control", color: "#f59e0b" },
    "web-app": { name: "Web Apps", color: "#ec4899" },
    "dev-tool": { name: "Dev Tools", color: "#6366f1" },
};

export const featuredProjects = projects.filter(p => p.featured);

// Skills Data
export interface Skill {
    id: string;
    name: string;
    category: "language" | "framework" | "ml-ai" | "tool" | "database";
    icon?: string;
    color: string;
    relatedTags: string[];
}

export const skills: Skill[] = [
    // Languages
    { id: "python", name: "Python", category: "language", color: "#3776AB", relatedTags: ["Python"] },
    { id: "typescript", name: "TypeScript", category: "language", color: "#3178C6", relatedTags: ["TypeScript"] },
    { id: "javascript", name: "JavaScript", category: "language", color: "#F7DF1E", relatedTags: ["JavaScript"] },
    { id: "java", name: "Java", category: "language", color: "#ED8B00", relatedTags: ["Java"] },

    // ML/AI
    { id: "tensorflow", name: "TensorFlow", category: "ml-ai", color: "#FF6F00", relatedTags: ["TensorFlow", "ML", "Deep Learning"] },
    { id: "pytorch", name: "PyTorch", category: "ml-ai", color: "#EE4C2C", relatedTags: ["PyTorch", "ML"] },
    { id: "opencv", name: "OpenCV", category: "ml-ai", color: "#5C3EE8", relatedTags: ["OpenCV", "Computer Vision", "CV"] },
    { id: "mediapipe", name: "MediaPipe", category: "ml-ai", color: "#0097A7", relatedTags: ["MediaPipe", "Gesture"] },

    // Frameworks
    { id: "react", name: "React", category: "framework", color: "#61DAFB", relatedTags: ["React", "Next.js"] },
    { id: "nextjs", name: "Next.js", category: "framework", color: "#ffffff", relatedTags: ["Next.js"] },
    { id: "nodejs", name: "Node.js", category: "framework", color: "#339933", relatedTags: ["Node.js"] },
    { id: "flask", name: "Flask", category: "framework", color: "#ffffff", relatedTags: ["Flask"] },
    { id: "framer", name: "Framer Motion", category: "framework", color: "#FF0055", relatedTags: ["Framer Motion"] },

    // Tools
    { id: "git", name: "Git", category: "tool", color: "#F05032", relatedTags: ["Git"] },
    { id: "linux", name: "Linux", category: "tool", color: "#FCC624", relatedTags: ["Linux"] },
    { id: "webgl", name: "WebGL", category: "tool", color: "#990000", relatedTags: ["WebGL"] },

    // Databases
    { id: "mongodb", name: "MongoDB", category: "database", color: "#47A248", relatedTags: ["MongoDB", "MERN Stack"] },
    { id: "mysql", name: "MySQL", category: "database", color: "#4479A1", relatedTags: ["MySQL"] },
];

export const skillCategories = {
    "language": { name: "Languages", color: "#8b5cf6" },
    "ml-ai": { name: "AI & ML", color: "#ec4899" },
    "framework": { name: "Frameworks", color: "#06b6d4" },
    "tool": { name: "Tools", color: "#f59e0b" },
    "database": { name: "Databases", color: "#10b981" },
};

// Get projects related to a skill
export const getProjectsBySkill = (skill: Skill) => {
    return projects.filter(project =>
        project.tags.some(tag =>
            skill.relatedTags.some(rt =>
                tag.toLowerCase().includes(rt.toLowerCase()) || rt.toLowerCase().includes(tag.toLowerCase())
            )
        )
    );
};
