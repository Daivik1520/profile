"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export default function TiltCard({
    children,
    className = "",
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: "" });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 12 degrees)
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        // Calculate glare position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
        setGlareStyle({
            opacity: 0.15,
            background: `radial-gradient(ellipse at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`
        });
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
        setGlareStyle({ opacity: 0, background: "" });
    };

    return (
        <div
            ref={cardRef}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d",
            }}
        >
            {children}

            {/* Realistic glare overlay */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                style={{
                    opacity: glareStyle.opacity,
                    background: glareStyle.background,
                    transition: "opacity 0.3s ease-out",
                }}
            />

            {/* Subtle shadow that moves with tilt */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none -z-10"
                style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    transform: "translateZ(-50px)",
                }}
            />
        </div>
    );
}
