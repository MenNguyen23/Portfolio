"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a value like "10+" and, when it scrolls into view, counts the number up from 0.
 * The server renders the final value, so there is nothing to mismatch on hydration.
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = /^(\d+)(.*)$/.exec(value);
    if (!el || !m || !document.documentElement.hasAttribute("data-rv")) return;

    const target = Number(m[1]);
    const suffix = m[2];
    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = "0" + suffix;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    // Printing or saving as PDF mid-count would capture a partial number: jump to the final value.
    const finish = () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
    window.addEventListener("beforeprint", finish);

    return () => {
      window.removeEventListener("beforeprint", finish);
      finish();
    };
  }, [value, duration]);

  // The animated digits are hidden from screen readers; they read the final value instead.
  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
