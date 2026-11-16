"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ShotData } from "@/data/portfolio";

/**
 * Screenshot slot. Tries the .png path, then the same name as .jpg.
 * If both fail, the figure becomes `.empty`: a dashed placeholder in draft mode,
 * hidden in final mode (see globals.css). A loaded image opens in a lightbox on click.
 */
export default function Shot({ src, code: label, hint }: ShotData) {
  const [current, setCurrent] = useState(src);
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = () => {
    if (current.endsWith(".png")) setCurrent(current.replace(/\.png$/, ".jpg"));
    else setEmpty(true);
  };

  // The image may fail before React hydrates and attaches onError — catch that case.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Lightbox: Esc closes, page scroll is locked while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const lines = hint.split("\n");

  return (
    <>
      <figure
        className={`shot${empty ? "" : " zoomable"}${empty ? " empty" : ""}`}
        onClick={empty ? undefined : () => setOpen(true)}
        role={empty ? undefined : "button"}
        tabIndex={empty ? undefined : 0}
        aria-label={empty ? undefined : `Open ${label} full size`}
        onKeyDown={empty ? undefined : (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(true))}
      >
        {!empty && (
          // Plain <img> on purpose: it fills the frame with object-fit and needs the .png -> .jpg fallback.
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={imgRef} src={current} alt={label} onError={handleError} />
        )}
        <div className="k">{label}</div>
        <div className="d">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </div>
      </figure>

      {open &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpen(false)}>
            <button type="button" className="lb-close" aria-label="Close" onClick={() => setOpen(false)}>
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current} alt={label} onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body,
        )}
    </>
  );
}
