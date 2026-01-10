"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    life: number;
}

export default function GenerativePlayground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Intersection observer to only animate when visible
        const observer = new IntersectionObserver(
            (entries) => {
                setIsInView(entries[0].isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(canvas);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Mouse events
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            // Spawn fewer particles
            if (Math.random() > 0.5) {
                particlesRef.current.push({
                    x: mouseRef.current.x,
                    y: mouseRef.current.y,
                    vx: (Math.random() - 0.5) * 3,
                    vy: (Math.random() - 0.5) * 3,
                    size: Math.random() * 10 + 3,
                    hue: Math.random() * 60 + 240,
                    life: 1,
                });
            }
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        // Optimized animation loop
        const animate = () => {
            // Clear with trail effect
            ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;

            // Update and draw particles (limit to 100)
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98;
                p.vy *= 0.98;
                p.life -= 0.015;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                // Simple glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.life * 0.6})`;
                ctx.fill();
            }

            // Limit particles
            if (particles.length > 100) {
                particles.splice(0, particles.length - 100);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isInView]);

    return (
        <section className="relative h-[70vh] bg-[#0a0a0a] overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/10 mb-4" style={{ letterSpacing: '-0.03em' }}>
                        Chaos into
                        <span className="bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 bg-clip-text text-transparent">
                            {" "}Order
                        </span>
                    </h2>
                    <p className="text-white/20 text-sm tracking-widest uppercase">
                        Move your cursor to create
                    </p>
                </motion.div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </section>
    );
}
