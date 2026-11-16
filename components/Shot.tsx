"use client";

import { useEffect, useRef, useState } from "react";
import type { ShotData } from "@/data/portfolio";

/**
 * Screenshot slot. Tries the .png path, then the same name as .jpg.
 * If both fail, the figure becomes `.empty`: a dashed placeholder in draft mode,
 * hidden in final mode (see globals.css).
 */
export default function Shot({ src, code: label, hint }: ShotData) {
  const [current, setCurrent] = useState(src);
  const [empty, setEmpty] = useState(false);
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

  const lines = hint.split("\n");

  return (
    <figure className={`shot${empty ? " empty" : ""}`}>
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
  );
}
