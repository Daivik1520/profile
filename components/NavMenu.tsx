"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";

const links = [
  { label: "Contact", href: "mailto:daivik1520@gmail.com" },
  { label: "GitHub", href: "https://github.com/Daivik1520" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daivik-reddy-60a876311/" },
  { label: "Instagram", href: "https://instagram.com/daivik.exe" },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={`nav-float ${open ? "open" : ""}`}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="nav-pill">
        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Contact" ? "_blank" : undefined}
              rel={link.label !== "Contact" ? "noopener noreferrer" : undefined}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="nav-toggle"
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <Logo />
        </button>
      </div>
    </div>
  );
}
