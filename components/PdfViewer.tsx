"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  BiDownload,
  BiLinkExternal,
  BiZoomIn,
  BiZoomOut,
} from "react-icons/bi";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Vendored into public/ by scripts/copy-pdf-worker.mjs — see that file for why
// this isn't resolved through the bundler or a CDN.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.2;
// An A4 sheet stops gaining legibility past roughly this width, and rendering
// wider only costs canvas memory.
const BASE_WIDTH = 880;

type PdfViewerProps = {
  file: string;
  downloadName: string;
};

export default function PdfViewer({ file, downloadName }: PdfViewerProps) {
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [availableWidth, setAvailableWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [failed, setFailed] = useState(false);

  // Track the container width so pages re-render to fit on resize.
  useEffect(() => {
    const element = sizerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width > 0) setAvailableWidth(width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Keep the toolbar's page counter in sync with whichever sheet is in view.
  useEffect(() => {
    if (numPages < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const page = Number(
          (visible.target as HTMLElement).dataset.pageNumber ?? 1,
        );
        setCurrentPage(page);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    pageRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [numPages]);

  const onLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    pageRefs.current = new Array(total).fill(null);
  }, []);

  const zoom = (delta: number) =>
    setScale((current) =>
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number((current + delta).toFixed(2)))),
    );

  const pageLabel = !numPages
    ? "Loading…"
    : numPages === 1
      ? "1 page"
      : `Page ${currentPage} of ${numPages}`;

  const pageWidth = availableWidth
    ? Math.min(availableWidth, BASE_WIDTH) * scale
    : undefined;

  const options = useMemo(
    () => ({ standardFontDataUrl: "/pdfjs/standard_fonts/" }),
    [],
  );

  if (failed) {
    return (
      <div className="pdf-fallback">
        <p className="muted-text">This resume couldn&apos;t be rendered here.</p>
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="link-button pdf-btn-primary"
        >
          <BiLinkExternal size="18" /> Open the PDF
        </a>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <span className="pdf-page-count">{pageLabel}</span>

        <div className="pdf-toolbar-actions">
          <div className="pdf-zoom">
            <button
              type="button"
              onClick={() => zoom(-SCALE_STEP)}
              disabled={scale <= MIN_SCALE}
              aria-label="Zoom out"
              className="pdf-icon-btn"
            >
              <BiZoomOut size="18" />
            </button>
            <span className="pdf-zoom-level">{Math.round(scale * 100)}%</span>
            <button
              type="button"
              onClick={() => zoom(SCALE_STEP)}
              disabled={scale >= MAX_SCALE}
              aria-label="Zoom in"
              className="pdf-icon-btn"
            >
              <BiZoomIn size="18" />
            </button>
          </div>

          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button pdf-btn"
          >
            <BiLinkExternal size="18" />
            <span className="pdf-btn-label">Open</span>
          </a>
          <a
            href={file}
            download={downloadName}
            className="link-button pdf-btn pdf-btn-primary"
          >
            <BiDownload size="18" />
            <span className="pdf-btn-label">Download</span>
          </a>
        </div>
      </div>

      <div className="pdf-scroll" ref={sizerRef}>
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={() => setFailed(true)}
          onSourceError={() => setFailed(true)}
          options={options}
          loading={<div className="pdf-sheet-skeleton" aria-hidden />}
          error={<span />}
          className="pdf-document"
        >
          {Array.from({ length: numPages }, (_, index) => (
            <div
              key={index}
              className="pdf-sheet"
              data-page-number={index + 1}
              ref={(node) => {
                pageRefs.current[index] = node;
              }}
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                loading={<div className="pdf-sheet-skeleton" aria-hidden />}
                renderAnnotationLayer
                renderTextLayer
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
