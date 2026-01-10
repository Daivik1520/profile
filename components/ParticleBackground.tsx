"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
                initParticles();
            }
        };

        const initParticles = () => {
            const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            }));
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const connectionDistance = 150;
            const mouseDistance = 200;

            // Draw gradient background overlay
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width / 2
            );
            gradient.addColorStop(0, "rgba(139, 92, 246, 0.03)");
            gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.02)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((p, i) => {
                // Move particle
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle with glow
                const particleGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
                particleGradient.addColorStop(0, `rgba(167, 139, 250, ${p.opacity})`);
                particleGradient.addColorStop(0.5, `rgba(139, 92, 246, ${p.opacity * 0.5})`);
                particleGradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = particleGradient;
                ctx.fill();

                // Core of particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();

                // Connect to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Connect to mouse with glow
                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const mouseDistanceCalc = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mouseDistanceCalc < mouseDistance && mouse.x > 0) {
                    const opacity = (1 - mouseDistanceCalc / mouseDistance) * 0.6;

                    // Connection line
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const lineGradient = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y);
                    lineGradient.addColorStop(0, `rgba(167, 139, 250, ${opacity})`);
                    lineGradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`);
                    ctx.strokeStyle = lineGradient;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            });

            // Draw mouse glow
            if (mouse.x > 0) {
                const mouseGlow = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 80
                );
                mouseGlow.addColorStop(0, "rgba(236, 72, 153, 0.15)");
                mouseGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.08)");
                mouseGlow.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
                ctx.fillStyle = mouseGlow;
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-auto"
        />
    );
}
