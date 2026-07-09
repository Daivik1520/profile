"use client";

import { useEffect, useRef } from "react";
import TextSplitAnimation from "./TextSplitAnimation";

interface Game {
  title: string;
  link: string;
  image: string;
}

const games: Game[] = [
  {
    title: "Minecraft",
    link: "https://www.minecraft.net",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Caves_%26_Cliffs_II_-_Alex_%26_Steve_I.png",
  },
  {
    title: "Grand Theft Auto V",
    link: "https://www.rockstargames.com/gta-v",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
  },
  {
    title: "Forza Horizon 5",
    link: "https://forza.net",
    image: "https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg",
  },
  {
    title: "Microsoft Flight Simulator",
    link: "https://www.flightsimulator.com",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/84/Microsoft_Flight_Simulator_2020_cover_art.png",
  },
];

export default function GamesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".game-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              const el = card as HTMLElement;
              setTimeout(() => {
                el.style.transition =
                  "opacity 0.6s cubic-bezier(0.35,0.35,0,1), transform 0.6s cubic-bezier(0.35,0.35,0,1)";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section me-section">
      <div className="section-title">
        <TextSplitAnimation text="Gaming is my jam" className="h2" tag="div" />
      </div>

      <div ref={gridRef} className="games-grid">
        {/* TODO: replace the tag line with your real gamertag / friend code */}
        <div className="game-card gamer-card" style={{ opacity: 0, transform: "translateY(20px)" }}>
          <div className="gamer-avatar">🎮</div>
          <div>
            <div className="c label" style={{ color: "#FFD177" }}>
              Daivik
            </div>
            <div className="c label" style={{ color: "rgba(255,233,190,0.75)", marginTop: "0.3rem" }}>
              PC · Xbox
            </div>
          </div>
        </div>

        {games.map((game) => (
          <a
            key={game.title}
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="game-card"
            style={{ opacity: 0, transform: "translateY(20px)" }}
            aria-label={game.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.image} alt={`${game.title} cover`} className="game-cover" />
          </a>
        ))}
      </div>
    </div>
  );
}
