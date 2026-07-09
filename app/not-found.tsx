"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.35, 0.35, 0, 1] }}
      >
        <div className="not-found-code">
          <span className="not-found-4">4</span>
          <span className="not-found-0">0</span>
          <span className="not-found-4">4</span>
        </div>

        <motion.p
          className="not-found-message"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.35, 0.35, 0, 1] }}
        >
          This page doesn&apos;t exist — but the rest of my site does.
        </motion.p>

        <motion.div
          className="not-found-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.35, 0.35, 0, 1] }}
        >
          <Link
            href="/"
            className="button"
            style={{ background: "#FFD177", borderColor: "#FFD177" }}
          >
            <span className="h4" style={{ color: "#000" }}>
              Go Home
            </span>
          </Link>
          <Link
            href="/projects"
            className="button"
            style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }}
          >
            <span className="h4" style={{ color: "#FFD177" }}>
              View Projects
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="not-found-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Maybe you mistyped the URL, or maybe this page moved.
        </motion.div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="not-found-bg" aria-hidden>
        <motion.div
          className="not-found-circle not-found-circle-1"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="not-found-circle not-found-circle-2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </div>
  );
}
