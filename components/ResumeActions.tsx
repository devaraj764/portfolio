"use client";

import { useState } from "react";
import { BiCheck, BiCodeAlt, BiCopy, BiDownload } from "react-icons/bi";

export default function ResumeActions({ pdfHref }: { pdfHref: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied (insecure context or user policy) — no-op.
    }
  };

  return (
    <div className="resume-actions-bar">
      <div className="resume-actions-info">
        <BiCodeAlt size="20" style={{ color: "#3b82f6" }} />
        <span>
          Live Data Sync (Auto-updates with portfolio projects &amp; experience)
        </span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleCopyLink}
          className="link-button"
          style={{ fontSize: "0.85rem", padding: "8px 14px" }}
        >
          {copied ? <BiCheck size="18" /> : <BiCopy size="18" />}
          {copied ? "Link Copied!" : "Share Link"}
        </button>

        <a
          href={pdfHref}
          download="DevaRaju_Maddhu_Resume.pdf"
          className="link-button"
          style={{
            fontSize: "0.85rem",
            padding: "8px 16px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <BiDownload size="18" /> Download PDF
        </a>
      </div>
    </div>
  );
}
