"use client";

export default function FooterMinimal() {
  const socials = [
    { name: "GitHub", href: "https://github.com/Daivik1520" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/daivik-reddy-60a876311/" },
    { name: "Instagram", href: "https://instagram.com/daivik.exe" },
    { name: "Contact", href: "mailto:daivik1520@gmail.com" },
  ];

  return (
    <footer className="footer-wrap">
      <div
        className="section"
        style={{
          paddingTop: "4rem",
          paddingBottom: "2rem",
          borderTop: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== "Contact" ? "_blank" : undefined}
                rel={social.name !== "Contact" ? "noopener noreferrer" : undefined}
                className="h4 link"
                style={{ textDecoration: "none" }}
              >
                {social.name}
              </a>
            ))}
          </div>
          <div className="c amber">© {new Date().getFullYear()} Daivik Reddy.</div>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden>
        DAIVIKREDDY
      </div>
    </footer>
  );
}
