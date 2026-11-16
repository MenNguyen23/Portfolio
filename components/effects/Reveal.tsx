"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver. Elements with `data-reveal` (and every <h2>) get `data-shown`
 * the first time they scroll into view; globals.css does the actual animation.
 *
 * A data attribute (not a class) is used on purpose: React never manages it, so
 * re-renders or HMR won't strip it. The hidden "before" state only applies when
 * <html data-rv> is set by the inline head script, so nothing is hidden without JS
 * or when the user prefers reduced motion.
 */
const SELECTOR = "[data-reveal], h2";

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-rv")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const pending = new Set<Element>();
    const observe = (el: Element) => {
      if (el.hasAttribute("data-shown")) return;
      pending.add(el);
      io.observe(el);
    };
    const watch = (scope: ParentNode) => scope.querySelectorAll(SELECTOR).forEach(observe);
    watch(document);

    // Fast scrolls/jumps can skip an element entirely, so IntersectionObserver never fires for it.
    // Sweep on scroll: anything whose top is already above the fold line gets shown.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      const fold = window.innerHeight * 0.94;
      pending.forEach((el) => {
        if (el.hasAttribute("data-shown")) return void pending.delete(el);
        if (el.getBoundingClientRect().top < fold) {
          el.setAttribute("data-shown", "");
          io.unobserve(el);
          pending.delete(el);
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Pick up nodes that appear later (e.g. after a hot reload).
    const mo = new MutationObserver((muts) => {
      for (const m of muts)
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches(SELECTOR)) observe(n);
            watch(n);
          }
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Printing must show everything, even sections never scrolled to.
    const showAll = () => document.querySelectorAll(SELECTOR).forEach((el) => el.setAttribute("data-shown", ""));
    window.addEventListener("beforeprint", showAll);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeprint", showAll);
    };
  }, []);

  return null;
}
