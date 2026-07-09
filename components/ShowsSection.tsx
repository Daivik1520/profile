"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TextSplitAnimation from "./TextSplitAnimation";

interface Show {
  title: string;
  genre: string;
  type: string;
  review: string;
  link: string;
  color: string;
  image: string;
  imageFit: "cover" | "contain";
  favorite?: boolean;
}

const shows: Show[] = [
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    type: "Film",
    review:
      "A masterpiece that blends science with raw human emotion. The way Nolan visualized time dilation and a black hole left me speechless. It's not just a space movie — it's a story about love transcending dimensions.",
    link: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    color: "#1a1a2e",
    image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    imageFit: "cover",
    favorite: true,
  },
  {
    title: "Mr. Robot",
    genre: "Thriller",
    type: "TV Series",
    review:
      "The most accurate depiction of hacking ever put on screen. But beyond the tech, it's a deeply personal story about identity, society, and mental health. Elliot Alderson is unforgettable.",
    link: "https://www.youtube.com/watch?v=xIBiJ_SzJTA",
    color: "#0a0a0a",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Mr._Robot_Logo.svg",
    imageFit: "contain",
  },
  {
    title: "Black Mirror",
    genre: "Sci-Fi",
    type: "TV Series",
    review:
      "Every episode is a thought experiment about where technology could take us. Some episodes haunt you for days. It changed how I think about the things I build.",
    link: "https://www.youtube.com/watch?v=jDiYGjp5iFg",
    color: "#111111",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Black_Mirror_%28British_TV_series%29_logo.svg",
    imageFit: "contain",
  },
  {
    title: "Oppenheimer",
    genre: "Drama",
    type: "Film",
    review:
      "Nolan at his finest. The weight of creation and destruction told through stunning visuals and an incredible score. It made me think about the responsibility that comes with building powerful technology.",
    link: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    color: "#1c1c1c",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    imageFit: "cover",
  },
];

export default function ShowsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    const cells = container.querySelectorAll(".show-cell");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cells.forEach((cell, i) => {
              const el = cell as HTMLElement;
              setTimeout(() => {
                el.style.transition =
                  "opacity 0.8s cubic-bezier(0.35,0.35,0,1), transform 0.8s cubic-bezier(0.35,0.35,0,1)";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section me-section">
      <div className="section-title">
        <TextSplitAnimation text="I love shows" className="h2" tag="div" />
      </div>

      <div ref={gridRef} className="show-grid">
        {shows.map((show) => (
          <div key={show.title} className="show-cell" style={{ opacity: 0, transform: "translateY(30px)" }}>
            <div className="show-poster-wrap">
            <a
              href={show.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: "relative", display: "block" }}
            >
              <div
                className="poster"
                style={{
                  background: show.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {show.favorite && (
                  <div className="show-badge">
                    <svg width="18" height="19" viewBox="0 0 155 162" fill="#FFD177">
                      <path d="M77.0352 0L82.0412 65.5929L124.646 15.4696L90.1412 71.4779L154.071 55.9696L93.2352 81L154.071 106.03L90.1412 90.5221L124.646 146.53L82.0412 96.4071L77.0352 162L72.0291 96.4071L29.4245 146.53L63.9291 90.5221L-0.000419617 106.03L60.8352 81L-0.000419617 55.9696L63.9291 71.4779L29.4245 15.4696L72.0291 65.5929L77.0352 0Z" />
                    </svg>
                    <span className="c label" style={{ lineHeight: 1.2 }}>
                      Daivik&apos;s
                      <br />
                      favorite
                    </span>
                  </div>
                )}
                {show.imageFit === "contain" ? (
                  <div
                    style={{
                      width: "78%",
                      background: "#fff",
                      borderRadius: "8px",
                      padding: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={show.image}
                      alt={`${show.title} logo`}
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={show.image}
                    alt={`${show.title} poster`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>
            </a>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginTop: "0.75rem",
              }}
            >
              <div className="card-title-group">
                <div className="h4" style={{ fontWeight: 600 }}>
                  {show.title}
                </div>
                <div className="h4 amber">{show.genre}</div>
              </div>
              <div className="c label amber show-type-tag">{show.type}</div>
            </div>
            </div>

            <div className="show-review">
              <div className="show-review-inner">
                <p className="b2">{show.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "3rem" }}>
        <Link
          href="/list"
          className="button"
          style={{ background: "#000", borderColor: "#000", padding: "1.1rem 2.4rem" }}
        >
          <span className="h4" style={{ color: "#FFD177" }}>See full list</span>
        </Link>
      </div>
    </div>
  );
}
