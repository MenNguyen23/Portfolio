"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Thin reading-progress bar at the top, a "Save as PDF" button and a "back to top" button.
 * The PDF button uses the browser's print dialog ("Save as PDF"); the print stylesheet
 * lays the portfolio out as exact A4 pages. The document title becomes the default file name.
 */
function savePdf() {
  // Show every scroll-reveal element first, in case the print dialog opens before "beforeprint" runs.
  document.querySelectorAll("[data-reveal], h2").forEach((el) => el.setAttribute("data-shown", ""));
  const prev = document.title;
  document.title = `${profile.name.replace(/\s+/g, "-")}-Portfolio`;
  const restore = () => {
    document.title = prev;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}

export default function ScrollUI() {
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
      <button type="button" className="pdf-btn" onClick={savePdf} aria-label="Save portfolio as PDF">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>PDF</span>
      </button>
      <button
        type="button"
        className={`to-top${showTop ? " show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
