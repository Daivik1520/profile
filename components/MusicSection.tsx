"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import TextSplitAnimation from "./TextSplitAnimation";
import "swiper/css";

type Platform = "APPLE MUSIC" | "YOUTUBE";

interface Track {
  title: string;
  platform: Platform;
  link: string;
  art?: string; // CSS background layers for the circular artwork
  red?: boolean; // accent card variant
  variant?: "vinyl" | "orbit"; // special artwork variants
}

// TODO: swap these seeds for your real playlists/songs when ready.
const tracks: Track[] = [
  {
    title: "All time favorite",
    platform: "APPLE MUSIC",
    link: "https://music.apple.com/us/search?term=bollywood%20classics",
    variant: "vinyl",
  },
  {
    title: "Kesariya",
    platform: "APPLE MUSIC",
    link: "https://music.apple.com/us/search?term=kesariya",
    art: `radial-gradient(42% 42% at 62% 34%, rgba(255,220,130,0.95), transparent 70%),
      radial-gradient(48% 48% at 38% 52%, rgba(255,123,0,0.9), transparent 72%),
      radial-gradient(40% 40% at 60% 68%, rgba(200,60,30,0.85), transparent 70%),
      #120a05`,
  },
  {
    title: "Tum Hi Ho",
    platform: "YOUTUBE",
    link: "https://www.youtube.com/results?search_query=tum+hi+ho",
    art: `radial-gradient(55% 45% at 30% 30%, rgba(255,255,255,0.9), transparent 62%),
      radial-gradient(50% 60% at 72% 50%, rgba(125,180,230,0.9), transparent 65%),
      radial-gradient(70% 70% at 50% 82%, rgba(35,90,150,0.95), transparent 72%),
      linear-gradient(160deg, #8fc3e6, #2a6496 55%, #12314e)`,
  },
  {
    title: "Bollywood classics",
    platform: "APPLE MUSIC",
    link: "https://music.apple.com/us/search?term=bollywood%20retro",
    art: "radial-gradient(circle at 50% 45%, #ffd177 0%, #e2a83d 35%, #8a1f14 100%)",
    red: true,
  },
  {
    title: "Chaiyya Chaiyya",
    platform: "YOUTUBE",
    link: "https://www.youtube.com/results?search_query=chaiyya+chaiyya",
    art: "conic-gradient(from 210deg at 50% 55%, #ff9e2c, #ff5f3c, #b03052, #43244e, #ff9e2c)",
  },
  {
    title: "Work tunes",
    platform: "APPLE MUSIC",
    link: "https://music.apple.com/us/search?term=focus%20instrumental",
    variant: "orbit",
  },
  {
    title: "Channa Mereya",
    platform: "APPLE MUSIC",
    link: "https://music.apple.com/us/search?term=channa+mereya",
    art: `radial-gradient(45% 45% at 58% 36%, rgba(255,170,190,0.95), transparent 70%),
      radial-gradient(48% 48% at 40% 60%, rgba(216,27,96,0.9), transparent 72%),
      radial-gradient(42% 42% at 66% 70%, rgba(120,20,60,0.85), transparent 70%),
      #14040c`,
  },
  {
    title: "Kal Ho Naa Ho",
    platform: "YOUTUBE",
    link: "https://www.youtube.com/results?search_query=kal+ho+naa+ho+song",
    art: `radial-gradient(50% 45% at 35% 32%, rgba(220,245,255,0.9), transparent 62%),
      radial-gradient(55% 55% at 68% 55%, rgba(38,166,154,0.9), transparent 68%),
      radial-gradient(70% 70% at 50% 85%, rgba(6,46,43,0.95), transparent 75%),
      linear-gradient(150deg, #9fdcd4, #1f7a70 55%, #062e2b)`,
  },
  {
    title: "Ilahi",
    platform: "YOUTUBE",
    link: "https://www.youtube.com/results?search_query=ilahi+yeh+jawaani+hai+deewani",
    art: `radial-gradient(44% 44% at 60% 34%, rgba(255,224,130,0.95), transparent 70%),
      radial-gradient(50% 50% at 38% 56%, rgba(251,140,0,0.9), transparent 72%),
      radial-gradient(42% 42% at 64% 70%, rgba(120,50,0,0.9), transparent 70%),
      #0f0800`,
  },
];

const ORBIT_RINGS = [
  { r: 44, color: "#f6c453", dot: 210 },
  { r: 38, color: "#5b8def", dot: 40 },
  { r: 32, color: "#e2574c", dot: 300 },
  { r: 26, color: "#5b8def", dot: 120 },
  { r: 20, color: "#6cbf6c", dot: 250 },
  { r: 14, color: "#e2574c", dot: 80 },
  { r: 8, color: "#f6c453", dot: 160 },
];

function OrbitArt() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
      {ORBIT_RINGS.map(({ r, color, dot }) => {
        const rad = (dot * Math.PI) / 180;
        const cx = 50 + r * Math.cos(rad);
        const cy = 50 + r * Math.sin(rad);
        return (
          <g key={r}>
            <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="0.6" />
            <circle cx={cx} cy={cy} r="1.6" fill={color} />
          </g>
        );
      })}
      <circle cx="50" cy="50" r="2.2" fill="#f6c453" />
    </svg>
  );
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "YOUTUBE") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.27 3.6Z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.4594 5.06661C13.8372 5.77772 12.8594 6.39995 11.8816 6.31106C11.7038 5.24439 12.2372 4.17772 12.7705 3.5555C13.3927 2.7555 14.4594 2.22217 15.3483 2.22217C15.4372 3.19995 15.0816 4.26661 14.4594 5.06661ZM15.3483 6.48883C15.8816 6.48883 17.4816 6.66661 18.5483 8.26661C18.4594 8.3555 16.6816 9.42217 16.6816 11.6444C16.6816 14.3111 18.9927 15.1999 18.9927 15.1999C18.9927 15.2888 18.6372 16.4444 17.8372 17.6888C17.126 18.7555 16.326 19.8222 15.1705 19.8222C14.0149 19.8222 13.6594 19.1111 12.326 19.1111C10.9927 19.1111 10.5483 19.8222 9.4816 19.8222C8.32605 19.8222 7.43716 18.6666 6.72605 17.5999C5.21494 15.3777 4.05938 11.3777 5.65938 8.71106C6.37049 7.37772 7.79271 6.48883 9.21494 6.48883C10.3705 6.48883 11.4372 7.28883 12.0594 7.28883C12.6816 7.28883 13.926 6.39995 15.3483 6.48883Z" />
    </svg>
  );
}

export default function MusicSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="me-section" style={{ overflow: "hidden" }}>
      <div className="section section-title">
        <TextSplitAnimation text="I live for music" className="h2" tag="div" />
      </div>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        slidesPerView="auto"
        spaceBetween={24}
        loop
        className="music-swiper"
      >
        {tracks.map((track) => (
          <SwiperSlide key={track.title} className="music-slide">
            <a
              href={track.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`music-card ${track.red ? "red" : ""}`}
            >
              <div
                className={`music-art ${track.variant === "vinyl" ? "vinyl" : ""}`}
                style={track.art ? { background: track.art } : undefined}
              >
                {track.variant === "vinyl" && <div className="music-vinyl-label" />}
                {track.variant === "orbit" && <OrbitArt />}
              </div>
              <div className="music-card-label">
                <div>
                  <div className="music-card-title">{track.title}</div>
                  <div className="music-card-platform">{track.platform}</div>
                </div>
                <div className="music-card-icon">
                  <PlatformIcon platform={track.platform} />
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="section" style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
        <button
          className="swiper-nav-btn"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8">
            <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className="swiper-nav-btn"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
