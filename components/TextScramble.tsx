"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TextScrambleProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    scrambleOnHover?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export default function TextScramble({
    text,
    className = "",
    delay = 0,
    duration = 1500,
    scrambleOnHover = false,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [hasStarted, setHasStarted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const performScramble = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        const originalText = text;
        const length = originalText.length;
        const totalFrames = Math.floor(duration / 30);
        let frame = 0;

        // Start with scrambled text immediately
        setDisplayText(
            originalText
                .split("")
                .map((char) => (char === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
                .join("")
        );

        intervalRef.current = setInterval(() => {
            const progress = frame / totalFrames;

            const newText = originalText
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";

                    // Characters reveal progressively from left to right
                    const charProgress = index / length;
                    if (progress > charProgress + 0.2) {
                        return originalText[index];
                    }

                    // Show random character
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            setDisplayText(newText);
            frame++;

            if (frame >= totalFrames) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setDisplayText(originalText);
            }
        }, 30);
    }, [text, duration]);

    const scramble = useCallback(() => {
        if (hasStarted) return;
        setHasStarted(true);
        performScramble();
    }, [hasStarted, performScramble]);

    const handleMouseEnter = () => {
        if (scrambleOnHover && !isHovering) {
            setIsHovering(true);
            performScramble();
            // Reset hovering state after animation ensures it can trigger again later
            setTimeout(() => setIsHovering(false), duration);
        }
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || hasStarted) return;

        // Check if element is already visible (for hero section on load)
        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                // Add delay for hero to account for preloader (3s preloader + custom delay)
                const preloaderDelay = sessionStorage.getItem("hasLoaded") ? 0 : 2800;
                setTimeout(() => {
                    scramble();
                }, preloaderDelay + delay);
                return true;
            }
            return false;
        };

        // Try immediately
        if (checkVisibility()) return;

        // Otherwise use intersection observer for scroll-triggered elements
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasStarted) {
                        setTimeout(() => {
                            scramble();
                        }, delay);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [delay, scramble, hasStarted]);

    return (
        <span
            ref={elementRef}
            className={`inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {displayText}
        </span>
    );
}
