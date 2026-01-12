"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 240;

// Generate frame paths
const getFramePath = (index: number): string => {
    const paddedIndex = index.toString().padStart(3, "0");
    const delay = index % 3 === 1 ? "0.034s" : "0.033s";
    return `/sequence/frame_${paddedIndex}_delay-${delay}.png`;
};

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const rafRef = useRef<number>(0);
    const lastFrameRef = useRef<number>(-1);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Optimized image loading
    useEffect(() => {
        let isMounted = true;
        const imageCache: HTMLImageElement[] = new Array(FRAME_COUNT).fill(null);

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                if (imageCache[index]) {
                    resolve();
                    return;
                }
                const img = new Image();
                img.onload = () => {
                    imageCache[index] = img;
                    resolve();
                };
                img.onerror = () => resolve();
                img.src = getFramePath(index);
            });
        };

        const loadImages = async () => {
            // Load first 20 frames immediately for fast start
            const initialPromises = [];
            for (let i = 0; i < 20; i++) {
                initialPromises.push(loadImage(i));
            }
            await Promise.all(initialPromises);

            if (!isMounted) return;
            setImages([...imageCache]);
            setIsLoaded(true);
            setLoadProgress(10);

            // Load rest in background with lower priority
            for (let i = 20; i < FRAME_COUNT; i += 5) {
                if (!isMounted) break;

                const batch = [];
                for (let j = i; j < Math.min(i + 5, FRAME_COUNT); j++) {
                    batch.push(loadImage(j));
                }
                await Promise.all(batch);

                if (isMounted) {
                    setImages([...imageCache]);
                    setLoadProgress(Math.round((i / FRAME_COUNT) * 100));
                }

                // Yield to main thread
                await new Promise(r => setTimeout(r, 16));
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, []);

    // Optimized draw with RAF
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", { alpha: false });
        const frameIdx = Math.round(index);
        const img = images[frameIdx];

        if (!canvas || !ctx || !img || frameIdx === lastFrameRef.current) return;
        lastFrameRef.current = frameIdx;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, drawX, drawY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvas.height;
            drawWidth = img.width * (canvas.height / img.height);
            drawX = (canvas.width - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }, [images]);

    // RAF-based frame updates
    useEffect(() => {
        if (!isLoaded) return;

        const updateFrame = () => {
            drawFrame(frameIndex.get());
            rafRef.current = requestAnimationFrame(updateFrame);
        };

        rafRef.current = requestAnimationFrame(updateFrame);
        return () => cancelAnimationFrame(rafRef.current);
    }, [frameIndex, isLoaded, drawFrame]);

    // Canvas resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // Simple viewport dimensions without DPR scaling
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Force redraw after resize
            lastFrameRef.current = -1;
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
            {/* Loading overlay */}
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 50,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#0a0a0a",
                    }}
                >
                    <div style={{
                        width: "200px",
                        height: "3px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "2px",
                        overflow: "hidden",
                    }}>
                        <motion.div
                            style={{
                                height: "100%",
                                background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                                borderRadius: "2px",
                                width: `${loadProgress}%`,
                            }}
                        />
                    </div>
                    <p style={{
                        marginTop: "16px",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.75rem",
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "0.1em",
                    }}>
                        LOADING
                    </p>
                </motion.div>
            )}

            {/* Sticky canvas container */}
            <div style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                width: "100%",
                overflow: "hidden",
            }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        background: "#0a0a0a",
                    }}
                />

                {/* Overlay text sections */}
                <Overlay scrollProgress={scrollYProgress} />
            </div>
        </div>
    );
}
