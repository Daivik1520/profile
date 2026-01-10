
<div align="center">
  <img src="./public/assets/banner.png" alt="Daivik Reddy Portfolio Banner" width="100%" />

  # Daivik Reddy
  ### Creative Developer | AI Enthusiast | Frontend Specialist

  <p>
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    </a>
    <a href="https://framer.com/motion">
      <img src="https://img.shields.io/badge/Framer_Motion-10-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
    </a>
    <a href="https://developers.google.com/mediapipe">
      <img src="https://img.shields.io/badge/MediaPipe-AI-orange?style=for-the-badge" alt="MediaPipe" />
    </a>
  </p>

  <p>
    A cutting-edge, interactive portfolio website showcasing creative development projects and AI integration.  
    Built with modern web technologies and featuring immersive 3D animations, glassmorphism UI, and real-time gesture control.
  </p>
</div>

---

## 🌟 Key Features

- **🎨 Immersive & Interactive UI** - Built with a "dark mode first" philosophy, utilizing neon accents, deep blacks, and frosted glass effects (Glassmorphism).
- **🕹️ AI Virtual Mouse Control** - Control the entire website using hand gestures via your webcam! No mouse required.
- **⚡ High Performance** - Optimized with Next.js App Router and Turbopack for lightning-fast loads.
- **📱 Fully Responsive** - Seamless experience across all devices, from ultra-wide monitors to mobile phones.
- **🌀 Canvas Animations** - Custom particle systems (`ScrollyCanvas`) and interactive backgrounds.

---

## 🖐️ Virtual Mouse Integration

One of the standout features of this portfolio is the **AI-powered Gesture Control**, ported directly from my Python research project. It runs completely client-side in the browser using **MediaPipe**.

### How to Use:
1. Click the **"🖐️ Gesture Control"** button in the bottom-right corner.
2. Allow camera access.
3. Use the following gestures:

| Gesture | Action | Description |
| :--- | :--- | :--- |
| **Index Finger UP** | **Move Cursor** | Point your index finger to move the virtual cursor. |
| **Index + Thumb Pinch** 👌 | **Left Click** | Pinch your index and thumb together to click. |
| **Index + Ring Pinch** 🤘 | **Right Click** | Pinch your index and ring finger for context menu. |
| **Index + Middle Pinch** ✌️ | **Scroll Mode** | Join Index & Middle fingers to activate. <br>• **Tilt UP**: Scroll Up <br>• **Tilt DOWN**: Scroll Down <br>• **Cruise Control**: Release to keep scrolling automatically! |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI/ML:** [MediaPipe Hands](https://developers.google.com/mediapipe) (for Gesture Control)
- **Deployment:** [Netlify](https://www.netlify.com/) / Vercel

---

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Daivik1520/profile.git
   cd profile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Main Landing Page
│   ├── layout.tsx        # Global Layout
│   └── globals.css       # Global Styles & Tailwind Config
├── components/           # React Components
│   ├── VirtualMouse.tsx  # Core Gesture Control Logic
│   ├── ScrollyCanvas.tsx # Background Animations
│   ├── ProjectCard.tsx   # 3D Tilt Cards
│   └── ...
├── public/               # Static Assets
└── ...
```

---

## 📬 Contact

**Daivik Reddy**  
Creative Developer | AI Enthusiast

[LinkedIn](https://linkedin.com/in/daivikreddy) • [GitHub](https://github.com/Daivik1520) • [Email](mailto:daivik@example.com)

---

<div align="center">
  <i>Made with ❤️ and AI using Next.js</i>
</div>
