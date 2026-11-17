"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ShotData } from "@/data/portfolio";

/**
 * Screenshot slot. Tries the .png path, then the same name as .jpg.
 * If both fail, the figure becomes `.empty`: a dashed placeholder in draft mode,
 * hidden in final mode (see globals.css). A loaded image opens in a lightbox on click.
 */
export default function Shot({ src, code: label, hint, alt }: ShotData) {
  const [current, setCurrent] = useState(src);
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const figRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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

  // Lightbox as a proper modal: focus moves to the close button, Tab stays inside,
  // the page behind is inert, Esc closes, and focus returns to the thumbnail afterwards.
  useEffect(() => {
    if (!open) return;
    const fig = figRef.current;
    const behind = [...document.body.children].filter((el) => !el.classList.contains("lightbox"));
    behind.forEach((el) => el.setAttribute("inert", ""));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "Tab") {
        e.preventDefault(); // the close button is the only control in the dialog
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = prevOverflow;
      fig?.focus();
    };
  }, [open]);

  const lines = hint.split("\n");

  return (
    <>
      <figure
        ref={figRef}
        className={`shot${empty ? "" : " zoomable"}${empty ? " empty" : ""}`}
        onClick={empty ? undefined : () => setOpen(true)}
        role={empty ? undefined : "button"}
        tabIndex={empty ? undefined : 0}
        aria-label={empty ? undefined : `${alt} (${label}), open full size`}
        onKeyDown={empty ? undefined : (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(true))}
      >
        {!empty && (
          // Plain <img> on purpose: it fills the frame with object-fit and needs the .png -> .jpg fallback.
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={imgRef} src={current} alt={alt} onError={handleError} />
        )}
        <div className="k" aria-hidden="true">
          {label}
        </div>
        <div className="d" aria-hidden="true">
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
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
            <button ref={closeRef} type="button" className="lb-close" aria-label="Close" onClick={() => setOpen(false)}>
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current} alt={alt} onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body,
        )}
    </>
  );
}
