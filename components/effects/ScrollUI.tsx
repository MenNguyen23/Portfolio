"use client";

import { useEffect, useRef, useState } from "react";

/** The page's real title, captured on the first PDF export so repeated clicks can't overwrite it. */
let originalTitle: string | null = null;
let restoreTitle: (() => void) | null = null;

/**
 * "Save as PDF" opens the browser's print dialog; the print stylesheet lays the portfolio
 * out as exact A4 pages, and Reveal's `beforeprint` handler shows every animated element.
 * The document title is the browser's default file name, so it is swapped while printing.
 */
function savePdf(fileName: string) {
  originalTitle ??= document.title;
  if (restoreTitle) window.removeEventListener("afterprint", restoreTitle);
  restoreTitle = () => {
    document.title = originalTitle!;
    window.removeEventListener("afterprint", restoreTitle!);
    restoreTitle = null;
  };
  window.addEventListener("afterprint", restoreTitle);
  document.title = fileName;
  window.print();
}

/** Thin reading-progress bar at the top, a "Save as PDF" button and a "back to top" button. */
export default function ScrollUI({ pdfFileName }: { pdfFileName: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <div ref={bar} className="progress-bar" />
      </div>
      <button type="button" className="pdf-btn" onClick={() => savePdf(pdfFileName)} aria-label="Save portfolio as PDF">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>PDF</span>
      </button>
      {/* inert while hidden, so keyboard users don't land on an invisible button */}
      <button
        type="button"
        className={`to-top${showTop ? " show" : ""}`}
        aria-label="Back to top"
        inert={!showTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
