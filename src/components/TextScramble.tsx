"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextScrambleProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    duration?: number;
    characterSet?: string;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

export default function TextScramble({
    text,
    className,
    style,
    duration = 2.5, // Total duration in seconds
    characterSet = DEFAULT_CHARS,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrameId: number;

        const update = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress >= 1) {
                setDisplayText(text);
                return;
            }

            let scrambled = "";

            for (let i = 0; i < text.length; i++) {
                // If the character is a space, keep it a space
                if (text[i] === " ") {
                    scrambled += " ";
                    continue;
                }

                // Determine if this character should be solved based on progress
                // characters solve from left to right over time

                if (progress > (i / text.length) * 0.8 + 0.2) {
                    scrambled += text[i];
                } else {
                    const randomChar = characterSet[Math.floor(Math.random() * characterSet.length)];
                    scrambled += randomChar;
                }
            }

            setDisplayText(scrambled);
            animationFrameId = requestAnimationFrame(update);
        };

        animationFrameId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, text, duration, characterSet]);

    return (
        <motion.span
            ref={ref}
            className={className}
            style={{ display: "inline-block", ...style }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    );
}
