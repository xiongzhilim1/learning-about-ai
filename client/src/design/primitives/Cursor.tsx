/**
 * Cursor — additive custom cursor. The system cursor stays visible;
 * this is a hint layer, not a replacement (spec Part 4).
 *
 * States:
 *   idle — 12px cream circle at 40% opacity
 *   link — 32px, terracotta tint (over a, button, [role=button])
 *   node — 48px, terracotta stroke only, mono label (over [data-cursor="node"],
 *          label from data-cursor-label; canvas raycast hooks in at step 5+)
 *   text — hidden over prose
 *
 * Position follows the pointer with a 120ms lerp (ease-instrument).
 * prefers-reduced-motion: lerp off, tracks 1:1.
 * Coarse pointers (touch): renders nothing.
 * All motion values reference motion.ts tokens; colors reference theme vars.
 */

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { dur, ease } from "@/design/motion";

export type CursorState = "idle" | "link" | "node" | "text";

const SIZE: Record<CursorState, number> = {
  idle: 12,
  link: 32,
  node: 48,
  text: 12,
};

function stateFor(target: Element | null): { state: CursorState; label: string } {
  if (!target) return { state: "idle", label: "" };
  const node = target.closest("[data-cursor='node']");
  if (node)
    return { state: "node", label: node.getAttribute("data-cursor-label") ?? "" };
  if (target.closest("a, button, [role='button']"))
    return { state: "link", label: "" };
  if (target.closest("p, li, blockquote, h1, h2, h3, h4, h5, h6, pre, code"))
    return { state: "text", label: "" };
  return { state: "idle", label: "" };
}

export default function Cursor() {
  const reduced = useReducedMotion();
  const [coarse, setCoarse] = useState(true); // assume touch until proven otherwise
  const [state, setState] = useState<CursorState>("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (coarse) return;

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      if (reducedRef.current) {
        x.set(e.clientX);
        y.set(e.clientY);
      } else {
        animate(x, e.clientX, { duration: dur.tick, ease: ease.instrument });
        animate(y, e.clientY, { duration: dur.tick, ease: ease.instrument });
      }
      const next = stateFor(e.target instanceof Element ? e.target : null);
      setState(next.state);
      setLabel(next.label);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [coarse, x, y]);

  if (coarse) return null;

  const size = SIZE[state];
  const hidden = !visible || state === "text";

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x,
        y,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : state === "link" ? 0.4 : state === "node" ? 1 : 0.4,
        }}
        transition={{ duration: dur.micro, ease: ease.instrument }}
        style={{
          borderRadius: "9999px",
          transform: "translate(-50%, -50%)",
          background:
            state === "node"
              ? "transparent"
              : state === "link"
                ? "var(--color-terracotta)"
                : "var(--color-cream)",
          border: state === "node" ? "1.5px solid var(--color-terracotta)" : "none",
        }}
      />
      {state === "node" && label && (
        <span
          className="font-mono text-xs"
          style={{
            position: "absolute",
            top: SIZE.node / 2 + 6,
            left: 0,
            transform: "translateX(-50%)",
            color: "var(--color-terracotta)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
