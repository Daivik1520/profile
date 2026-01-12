"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ParallaxCursor() {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile/touch device
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Don't render on mobile
    if (isMobile || !isVisible) return null;

    // Multiple rings with different delays/speeds
    const rings = [
        { size: 8, delay: 0, opacity: 1, color: "#ffffff" },
        { size: 24, delay: 0.05, opacity: 0.6, color: "#8b5cf6" },
        { size: 48, delay: 0.1, opacity: 0.3, color: "#ec4899" },
        { size: 80, delay: 0.15, opacity: 0.15, color: "#8b5cf6" },
    ];

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden",
        }}>
            {rings.map((ring, i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: mousePos.x - ring.size / 2,
                        y: mousePos.y - ring.size / 2,
                    }}
                    transition={{
                        type: "spring",
                        damping: 20 - i * 2,
                        stiffness: 300 - i * 50,
                        mass: 0.5 + i * 0.2,
                    }}
                    style={{
                        position: "absolute",
                        width: ring.size,
                        height: ring.size,
                        borderRadius: "50%",
                        border: i === 0 ? "none" : `1px solid ${ring.color}`,
                        background: i === 0 ? ring.color : "transparent",
                        opacity: ring.opacity,
                        boxShadow: i === 0 ? `0 0 20px ${ring.color}40` : "none",
                    }}
                />
            ))}
        </div>
    );
}
