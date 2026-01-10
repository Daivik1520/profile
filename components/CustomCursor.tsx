"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);
    const trailsRef = useRef<HTMLDivElement[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const positionRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Check if mobile/touch device
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();

        if (isMobile) return;

        const cursor = cursorRef.current;
        const cursorOuter = cursorOuterRef.current;
        if (!cursor || !cursorOuter) return;

        // Immediate cursor position update (no lag)
        const handleMouseMove = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY };

            // Main cursor follows immediately
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };

        // Smooth outer ring animation
        let animationId: number;
        const animateOuter = () => {
            const dx = targetRef.current.x - positionRef.current.x;
            const dy = targetRef.current.y - positionRef.current.y;

            // Smooth interpolation (0.15 = responsiveness)
            positionRef.current.x += dx * 0.15;
            positionRef.current.y += dy * 0.15;

            cursorOuter.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;

            animationId = requestAnimationFrame(animateOuter);
        };
        animateOuter();

        // Hover detection
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.matches('a, button, [role="button"], input, textarea, article, .cursor-pointer') ||
                target.closest('a, button, [role="button"], article');
            setIsHovering(!!isInteractive);
        };

        // Click effects
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(animationId);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
                a, button, [role="button"], input, textarea {
                    cursor: none !important;
                }
            `}</style>

            {/* Main cursor dot - follows immediately */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: isClicking ? "8px" : isHovering ? "6px" : "10px",
                    height: isClicking ? "8px" : isHovering ? "6px" : "10px",
                    marginLeft: isClicking ? "-4px" : isHovering ? "-3px" : "-5px",
                    marginTop: isClicking ? "-4px" : isHovering ? "-3px" : "-5px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    transition: "width 0.2s, height 0.2s, margin 0.2s",
                    willChange: "transform",
                }}
            />

            {/* Outer ring - follows with slight delay */}
            <div
                ref={cursorOuterRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: isHovering ? "60px" : isClicking ? "30px" : "40px",
                    height: isHovering ? "60px" : isClicking ? "30px" : "40px",
                    marginLeft: isHovering ? "-30px" : isClicking ? "-15px" : "-20px",
                    marginTop: isHovering ? "-30px" : isClicking ? "-15px" : "-20px",
                    borderRadius: "50%",
                    border: isHovering ? "1.5px solid rgba(167, 139, 250, 0.8)" : "1px solid rgba(255, 255, 255, 0.3)",
                    backgroundColor: isHovering ? "rgba(139, 92, 246, 0.1)" : "transparent",
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1), border 0.2s, background-color 0.2s",
                    willChange: "transform",
                    backdropFilter: isHovering ? "blur(4px)" : "none",
                }}
            />

            {/* Glow effect on hover */}
            {isHovering && (
                <div
                    className="fixed top-0 left-0 pointer-events-none z-[9997]"
                    style={{
                        width: "80px",
                        height: "80px",
                        marginLeft: "-40px",
                        marginTop: "-40px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                        transform: `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`,
                        animation: "pulse 2s ease-in-out infinite",
                    }}
                />
            )}

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
            `}</style>
        </>
    );
}
