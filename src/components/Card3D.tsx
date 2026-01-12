"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

interface Card3DProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    glareColor?: string;
    onClick?: () => void;
}

export default function Card3D({
    children,
    className,
    style,
    glareColor = "rgba(255,255,255,0.15)",
    onClick
}: Card3DProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position relative to card center (-0.5 to 0.5)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for tilt
    const springConfig = { damping: 20, stiffness: 300 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    // Glare position
    const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
    const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -0.5 to 0.5
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            style={{
                perspective: "1000px",
                ...style
            }}
        >
            <motion.div
                ref={cardRef}
                className={className}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Glare effect */}
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor}, transparent 50%)`,
                        zIndex: 2,
                    }}
                />

                {/* Content */}
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    transform: "translateZ(20px)",
                }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
