"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
                variants={{
                    initialState: {
                        opacity: 0,
                        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                    },
                    animateState: {
                        opacity: 1,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    },
                    exitState: {
                        opacity: 0,
                        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                    },
                }}
                className="min-h-screen"
            >
                {children}
            </motion.div>

            {/* Transition overlay curtain */}
            <motion.div
                key={`overlay-${pathname}`}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originY: 0 }}
                className="fixed inset-0 z-[9990] bg-[#0a0a0a] pointer-events-none"
            />
        </AnimatePresence>
    );
}
