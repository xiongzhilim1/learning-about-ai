/**
 * PageShell — the scroll pipeline for immersive pages (spec Part 2,
 * rendering topology). Mounts Lenis for velocity-normalized smooth
 * scroll, exposes whole-page scroll progress via context (the future
 * CanvasDirector reads it), and hosts the Cursor.
 *
 * prefers-reduced-motion: Lenis is never instantiated — native scroll
 * only. This is a first-class path, not a fallback.
 *
 * No scroll-jacking: Lenis with lerp 0.1 + smoothWheel respects scroll
 * velocity; sections do not snap. Lenis is destroyed on unmount so
 * other routes keep untouched native scroll.
 */

import { createContext, useContext, useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import { lenisLerp } from "@/design/motion";
import Cursor from "@/design/primitives/Cursor";

interface PageScroll {
  /** 0 → 1 progress through the whole page. Scrubber, not trigger (P3). */
  progress: MotionValue<number>;
}

const PageScrollContext = createContext<PageScroll | null>(null);

/** Read the page scroll progress. Throws outside a PageShell. */
export function usePageScroll(): PageScroll {
  const ctx = useContext(PageScrollContext);
  if (!ctx) throw new Error("usePageScroll must be used inside <PageShell>");
  return ctx;
}

export default function PageShell({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (reduced) return; // native scroll; no smooth interpolation
    const lenis = new Lenis({ lerp: lenisLerp, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <PageScrollContext.Provider value={{ progress: scrollYProgress }}>
      <Cursor />
      {children}
    </PageScrollContext.Provider>
  );
}
