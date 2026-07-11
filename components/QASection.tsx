"use client";

import TextSplitAnimation from "./TextSplitAnimation";
import { motion } from "framer-motion";

interface QA {
  q: string;
  a: string;
}

// Generated starting answers — feel free to rewrite these in your own words.
const qas: QA[] = [
  {
    q: "What got you into AI in the first place?",
    a: "I got inspired by sci-fi movies and wanted to build something like JARVIS. Turns out it's harder than Tony Stark made it look, but that's what makes it fun.",
  },
  {
    q: "What does a perfect day off look like?",
    a: "Morning gym or a walk, then experimenting with some side project I've been putting off. Evening is for hanging out or binge-watching a show.",
  },
  {
    q: "Films or series?",
    a: "Series, actually. You get more time with the characters and the story can go deeper. Mr. Robot wouldn't hit the same as a 2-hour film.",
  },
  {
    q: "Is there a skill you've always had, without really trying?",
    a: "Learning things fast. Give me a weekend and a YouTube playlist and I'll have the basics of almost anything down.",
  },
  {
    q: "If you could teleport anywhere right now, where would you go?",
    a: "That's a secret!",
  },
  {
    q: "What keeps you up at night?",
    a: "Usually a project that's 90% done. That last 10% has a gravitational pull — I'll tell myself 'one more try' at midnight and suddenly it's 2am. Worth it every time.",
  },
  {
    q: "What are you into lately?",
    a: "Exploring new tools and frameworks — there's always something new to try. Also been getting into fitness, trying to balance screen time with real life.",
  },
];

export default function QASection() {
  return (
    <div className="section me-section">
      <div className="qa-grid">
        <div>
          {qas.map((item, index) => (
            <motion.div
              key={item.q}
              className="qa-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3), ease: [0.35, 0.35, 0, 1] }}
            >
              <div className="b1 qa-question">{item.q}</div>
              <p className="b2">{item.a}</p>
            </motion.div>
          ))}
        </div>

        <div className="qa-mark-wrap" aria-hidden>
          <TextSplitAnimation text="Q&A" className="qa-mark" tag="div" splitBy="letter" />
        </div>
      </div>
    </div>
  );
}
