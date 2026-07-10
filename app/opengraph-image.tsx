import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daivik Reddy — Developer & AI Enthusiast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: "linear-gradient(90deg, #FFD177 0%, #FFAA33 100%)",
          }}
        />

        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            right: "-100px",
            top: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,209,119,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#FFD177",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          DAIVIK REDDY
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(255,209,119,0.8)",
            marginBottom: "40px",
          }}
        >
          Developer & AI Enthusiast
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Building projects in AI, computer vision, and web development.
          Based in Hyderabad, India.
        </div>

        {/* Bottom bar with site URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#FFD177",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 900,
              color: "#000",
            }}
          >
            DR
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 400,
            }}
          >
            daivikreddy.online
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
