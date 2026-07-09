"use client";

import { useState, useCallback } from "react";

export default function EmailFab() {
  const [copied, setCopied] = useState(false);
  const email = "daivik1520@gmail.com";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <>
      <div className={`email-fab-tooltip h4 ${copied ? "show" : ""}`}>
        Email copied
      </div>
      <button
        onClick={handleCopy}
        className="email-fab"
        aria-label="Copy email address"
      >
        <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 3C1.44772 3 1 3.44772 1 4V12C1 12.5523 1.44772 13 2 13H14C14.5523 13 15 12.5523 15 12V4C15 3.44772 14.5523 3 14 3H2ZM8.14981 8.95002L14 4.56238V6.43738L9.0498 10.15C8.42758 10.6167 7.57203 10.6167 6.9498 10.15L2 6.43767V4.56267L7.8498 8.95002C7.93869 9.01669 8.06092 9.01669 8.14981 8.95002Z"
          />
        </svg>
      </button>
    </>
  );
}
