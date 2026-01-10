"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// Generate frame names for 240 frames with alternating delay pattern
// Pattern: 0.033s, 0.034s, 0.033s, 0.033s, 0.034s... (every 3rd frame starting at index 1 is 0.034s)
const generateFrameNames = (): string[] => {
  const frames: string[] = [];
  for (let i = 0; i < 240; i++) {
    const paddedIndex = i.toString().padStart(3, "0");
    // Pattern: index % 3 === 1 gets 0.034s, others get 0.033s
    const delay = i % 3 === 1 ? "0.034s" : "0.033s";
    frames.push(`frame_${paddedIndex}_delay-${delay}.png`);
  }
  return frames;
};

const FRAME_NAMES = generateFrameNames();
const TOTAL_FRAMES = FRAME_NAMES.length;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, dpr: 1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload all images with progress tracking
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
      let loadedCount = 0;

      const loadImage = (index: number): Promise<void> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loadedImages[index] = img;
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load: ${FRAME_NAMES[index]}`);
            reject();
          };
          img.src = `/sequence/${FRAME_NAMES[index]}`;
        });
      };

      try {
        // Load images in batches for better performance
        const batchSize = 20;
        for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
          const batch = [];
          for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
            batch.push(loadImage(j));
          }
          await Promise.all(batch);
        }

        setImages(loadedImages);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  // Handle canvas resizing with device pixel ratio for sharp rendering
  useEffect(() => {
    const updateDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: dpr,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Draw frame on canvas with object-fit: cover logic and HiDPI support
  useEffect(() => {
    if (!isLoaded || images.length === 0 || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { width, height, dpr } = dimensions;

    // Set actual canvas size for HiDPI displays (multiply by device pixel ratio)
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Scale all drawing operations by dpr
    ctx.scale(dpr, dpr);

    const render = () => {
      const frameIndex = Math.min(
        Math.max(0, Math.floor(currentFrame.get())),
        TOTAL_FRAMES - 1
      );
      const img = images[frameIndex];

      if (!img) return;

      // Reset transform and apply DPR scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear canvas (use CSS dimensions, not canvas dimensions)
      ctx.clearRect(0, 0, width, height);

      // Enable high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Calculate object-fit: cover dimensions
      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth: number;
      let drawHeight: number;
      let drawX: number;
      let drawY: number;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas - fit height, crop width
        drawHeight = height;
        drawWidth = drawHeight * imgAspect;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Image is taller than canvas - fit width, crop height
        drawWidth = width;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    // Subscribe to frame changes
    const unsubscribe = currentFrame.on("change", render);

    // Initial render
    render();

    return () => unsubscribe();
  }, [isLoaded, images, currentFrame, dimensions]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
          className="absolute inset-0"
        />

        {/* Loading indicator with progress */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Progress ring */}
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${loadProgress * 2.26} 226`}
                    className="transition-all duration-200"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  {loadProgress}%
                </span>
              </div>
              <span className="text-white/40 text-xs font-light tracking-[0.3em] uppercase">
                Loading Experience
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
