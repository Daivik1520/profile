"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
    interface Window {
        Hands: any;
        Camera: any;
    }
}

interface HandLandmark {
    x: number;
    y: number;
    z: number;
}

export default function VirtualMouse() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const handsRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const lastClickTime = useRef(0);
    const smoothPos = useRef({ x: 0, y: 0 });

    const calculateDistance = (p1: HandLandmark, p2: HandLandmark) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    const onResults = useCallback((results: any) => {
        if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
            return;
        }

        const landmarks = results.multiHandLandmarks[0];

        // Index finger tip (landmark 8)
        const indexTip = landmarks[8];
        // Thumb tip (landmark 4)
        const thumbTip = landmarks[4];

        // Convert to screen coordinates (mirror the x-axis)
        const targetX = (1 - indexTip.x) * window.innerWidth;
        const targetY = indexTip.y * window.innerHeight;

        // Smooth the cursor movement
        smoothPos.current.x += (targetX - smoothPos.current.x) * 0.3;
        smoothPos.current.y += (targetY - smoothPos.current.y) * 0.3;

        setCursorPos({
            x: smoothPos.current.x,
            y: smoothPos.current.y
        });

        // Check for pinch gesture (click)
        const pinchDistance = calculateDistance(indexTip, thumbTip);
        const isPinching = pinchDistance < 0.05;

        setIsClicking(isPinching);

        // Trigger click
        if (isPinching) {
            const now = Date.now();
            if (now - lastClickTime.current > 500) {
                lastClickTime.current = now;

                // Find element at cursor position and click it
                const element = document.elementFromPoint(
                    smoothPos.current.x,
                    smoothPos.current.y
                );

                if (element) {
                    // Dispatch click event
                    const clickEvent = new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        clientX: smoothPos.current.x,
                        clientY: smoothPos.current.y,
                    });
                    element.dispatchEvent(clickEvent);

                    // Also try clicking if it's a link or button
                    if (element instanceof HTMLElement) {
                        element.click();
                    }
                }
            }
        }
    }, []);

    const startCamera = useCallback(async () => {
        if (!videoRef.current) return;

        setIsLoading(true);

        try {
            // Load MediaPipe scripts dynamically
            await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js");
            await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");

            // Initialize Hands
            const hands = new window.Hands({
                locateFile: (file: string) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                },
            });

            hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 0,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.5,
            });

            hands.onResults(onResults);
            handsRef.current = hands;

            // Initialize Camera
            const camera = new window.Camera(videoRef.current, {
                onFrame: async () => {
                    if (videoRef.current && handsRef.current) {
                        await handsRef.current.send({ image: videoRef.current });
                    }
                },
                width: 640,
                height: 480,
            });

            await camera.start();
            cameraRef.current = camera;
            setIsLoading(false);

        } catch (error) {
            console.error("Error starting camera:", error);
            setIsLoading(false);
            setIsEnabled(false);
        }
    }, [onResults]);

    const stopCamera = useCallback(() => {
        if (cameraRef.current) {
            cameraRef.current.stop();
            cameraRef.current = null;
        }
        if (handsRef.current) {
            handsRef.current.close();
            handsRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isEnabled) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isEnabled, startCamera, stopCamera]);

    const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`fixed bottom-6 right-6 z-[8000] px-5 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-300 ${isEnabled
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="text-lg">🖐️</span>
                {isLoading ? "Starting..." : isEnabled ? "Gesture ON" : "Gesture Control"}
            </motion.button>

            {/* Camera Preview */}
            <AnimatePresence>
                {isEnabled && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-20 right-6 z-[8000]"
                    >
                        <div className="relative">
                            <video
                                ref={videoRef}
                                className={`rounded-2xl border-2 border-violet-500/50 shadow-lg shadow-violet-500/20 ${showPreview ? "w-48 h-36" : "w-0 h-0"
                                    }`}
                                autoPlay
                                playsInline
                                muted
                                style={{ transform: "scaleX(-1)" }}
                            />
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs hover:bg-white/20"
                            >
                                {showPreview ? "−" : "+"}
                            </button>
                            {!showPreview && (
                                <div className="w-12 h-12 bg-violet-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <span className="text-2xl">👁️</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Virtual Cursor */}
            <AnimatePresence>
                {isEnabled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed z-[9999] pointer-events-none"
                        style={{
                            left: cursorPos.x,
                            top: cursorPos.y,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {/* Main cursor */}
                        <motion.div
                            animate={{
                                scale: isClicking ? 0.8 : 1,
                                backgroundColor: isClicking ? "#8B5CF6" : "#ffffff",
                            }}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                            style={{
                                boxShadow: isClicking
                                    ? "0 0 30px rgba(139, 92, 246, 0.8)"
                                    : "0 0 20px rgba(255, 255, 255, 0.5)",
                            }}
                        />
                        {/* Click ripple */}
                        {isClicking && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 rounded-full bg-violet-500"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instructions overlay */}
            <AnimatePresence>
                {isEnabled && isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[7999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    >
                        <div className="text-center text-white">
                            <div className="w-16 h-16 border-4 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-lg font-medium">Initializing Camera...</p>
                            <p className="text-white/60 mt-2">Allow camera access when prompted</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden" />
        </>
    );
}
