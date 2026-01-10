"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
    { text: "INITIALIZING SYSTEM...", delay: 0 },
    { text: "LOADING CORE MODULES...", delay: 400 },
    { text: "ESTABLISHING NEURAL LINKS...", delay: 800 },
    { text: "COMPILING ASSETS...", delay: 1200 },
    { text: "SYSTEM READY.", delay: 1600 },
    { text: "WELCOME!", delay: 2000 },
];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        // Only show preloader on first visit (not on navigation)
        const hasLoaded = sessionStorage.getItem("hasLoaded");
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        setShouldShow(true);
        sessionStorage.setItem("hasLoaded", "true");

        // Sequentially display boot messages
        bootSequence.forEach((item) => {
            setTimeout(() => {
                setDisplayedLines((prev) => [...prev, item.text]);
            }, item.delay);
        });

        // Hide preloader after sequence
        const hideTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => clearTimeout(hideTimer);
    }, []);

    if (!shouldShow) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
                >
                    <div className="w-full max-w-lg px-8">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-4 text-xs text-white/30 font-mono">
                                system.init
                            </span>
                        </div>

                        {/* Boot Sequence Lines */}
                        <div className="font-mono text-sm space-y-2">
                            {displayedLines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-emerald-400">▸</span>
                                    <span
                                        className={
                                            index === displayedLines.length - 1 &&
                                                line === "WELCOME, USER."
                                                ? "text-white"
                                                : "text-white/60"
                                        }
                                    >
                                        {line}
                                    </span>
                                    {index === displayedLines.length - 1 && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                            className="w-2 h-4 bg-emerald-400 ml-1"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
