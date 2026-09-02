"use client";

import dynamic from "next/dynamic";

// pdf.js touches browser globals at import time, so it must stay out of the
// server render and the prerendered HTML.
const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <span className="pdf-page-count">Loading…</span>
      </div>
      <div className="pdf-scroll">
        <div className="pdf-sheet-skeleton" aria-hidden />
      </div>
    </div>
  ),
});

export default function ResumeViewer(props: {
  file: string;
  downloadName: string;
}) {
  return <PdfViewer {...props} />;
}
