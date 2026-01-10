"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HolographicFooter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new IntersectionObserver(
            (entries) => setIsInView(entries[0].isIntersecting),
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

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Simple wave lines
            for (let i = 0; i < 15; i++) {
                const y = (i / 15) * canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, y);

                for (let x = 0; x < canvas.width; x += 10) {
                    const wave = Math.sin(time * 0.02 + x * 0.01 + i * 0.3) * 3;
                    ctx.lineTo(x, y + wave);
                }

                const hue = i * 4 + 220;
                ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.1)`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            time++;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isInView]);

    return (
        <footer className="relative min-h-[50vh] bg-[#050505] overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                        style={{ letterSpacing: '-0.04em' }}
                    >
                        Let&apos;s Talk
                    </h2>
                    <p className="text-white/40 text-lg">
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <a
                        href="mailto:daivik@example.com"
                        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
                    >
                        Send an Email
                    </a>
                    <a
                        href="https://github.com/Daivik1520"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://twitter.com/daivik_reddy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                    >
                        Twitter
                    </a>
                </motion.div>

                <div className="text-center">
                    <p className="text-white/20 text-sm">Designed & Built by</p>
                    <p className="text-white/50 text-lg font-medium">Daivik Reddy</p>
                    <p className="text-white/20 text-sm mt-2">© {new Date().getFullYear()}</p>
                </div>
            </div>

            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
        </footer>
    );
}
