"use client";

import { useEffect, useRef, useCallback } from "react";

interface Neuron {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    pulsePhase: number;
}

interface NeuralBackgroundProps {
    neuronCount?: number;
    connectionDistance?: number;
    mouseConnectionDistance?: number;
    color?: string;
    mouseColor?: string;
}

export default function NeuralBackground({
    neuronCount = 80,
    connectionDistance = 150,
    mouseConnectionDistance = 200,
    color = "rgba(139, 92, 246, 0.4)",
    mouseColor = "rgba(236, 72, 153, 0.8)",
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const neuronsRef = useRef<Neuron[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number>(0);
    const isMobileRef = useRef(false);

    const initNeurons = useCallback((width: number, height: number) => {
        // Reduce particles on mobile for better performance
        const isMobile = window.innerWidth <= 768;
        isMobileRef.current = isMobile;
        const actualCount = isMobile ? Math.floor(neuronCount * 0.4) : neuronCount;

        const neurons: Neuron[] = [];
        for (let i = 0; i < actualCount; i++) {
            neurons.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12,
                radius: Math.random() * 2 + 1.5,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }
        neuronsRef.current = neurons;
    }, [neuronCount]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            if (neuronsRef.current.length === 0) {
                initNeurons(canvas.width, canvas.height);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const neurons = neuronsRef.current;
            const mouse = mouseRef.current;
            const time = Date.now() * 0.001;

            // Update and draw neurons
            neurons.forEach((neuron, i) => {
                // Update position
                neuron.x += neuron.vx;
                neuron.y += neuron.vy;

                // Bounce off edges
                if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
                if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;

                // Keep in bounds
                neuron.x = Math.max(0, Math.min(canvas.width, neuron.x));
                neuron.y = Math.max(0, Math.min(canvas.height, neuron.y));

                // Draw neuron connections to other neurons
                for (let j = i + 1; j < neurons.length; j++) {
                    const other = neurons[j];
                    const dx = other.x - neuron.x;
                    const dy = other.y - neuron.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(neuron.x, neuron.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = color.replace("0.4", (opacity * 0.3).toFixed(2));
                        ctx.lineWidth = opacity * 0.8;
                        ctx.stroke();
                    }
                }

                // Draw connection to mouse
                const mouseDx = mouse.x - neuron.x;
                const mouseDy = mouse.y - neuron.y;
                const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

                if (mouseDistance < mouseConnectionDistance) {
                    const opacity = 1 - mouseDistance / mouseConnectionDistance;

                    // Draw connection line
                    ctx.beginPath();
                    ctx.moveTo(neuron.x, neuron.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    const gradient = ctx.createLinearGradient(
                        neuron.x, neuron.y, mouse.x, mouse.y
                    );
                    gradient.addColorStop(0, mouseColor.replace("0.8", (opacity * 0.6).toFixed(2)));
                    gradient.addColorStop(1, "rgba(236, 72, 153, 0)");
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = opacity * 2;
                    ctx.stroke();

                    // Attract neuron slightly toward mouse
                    neuron.vx += mouseDx * 0.00005;
                    neuron.vy += mouseDy * 0.00005;
                }

                // Pulsing glow effect
                const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.3 + 0.7;
                const glowRadius = neuron.radius * 3 * pulse;

                // Draw neuron glow
                const glowGradient = ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, glowRadius
                );
                glowGradient.addColorStop(0, color.replace("0.4", "0.5"));
                glowGradient.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, glowRadius, 0, Math.PI * 2);
                ctx.fillStyle = glowGradient;
                ctx.fill();

                // Draw neuron core
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, neuron.radius * pulse, 0, Math.PI * 2);
                ctx.fillStyle = color.replace("0.4", "0.9");
                ctx.fill();
            });

            // Draw mouse glow
            if (mouse.x > 0 && mouse.y > 0) {
                const mouseGlow = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 60
                );
                mouseGlow.addColorStop(0, "rgba(236, 72, 153, 0.15)");
                mouseGlow.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
                ctx.fillStyle = mouseGlow;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initNeurons, connectionDistance, mouseConnectionDistance, color, mouseColor]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
