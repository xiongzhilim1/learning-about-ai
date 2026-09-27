// PROTOTYPE: floating variant switcher for throwaway ?variant= routes (issue #10).
import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";

export function useVariant(keys: string[]) {
  const search = useSearch();
  const v = new URLSearchParams(search).get("variant") ?? keys[0];
  return keys.includes(v) ? v : keys[0];
}

export default function PrototypeSwitcher({
  variants,
  current,
}: {
  variants: { key: string; name: string }[];
  current: string;
}) {
  const [location, navigate] = useLocation();
  const i = variants.findIndex((v) => v.key === current);
  const go = (d: number) => {
    const next = variants[(i + d + variants.length) % variants.length];
    navigate(`${location}?variant=${next.key}`, { replace: true });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (import.meta.env.PROD) return null;

  const btn = "px-3 py-2 hover:bg-white/15";
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center rounded-full bg-black text-white text-xs shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-1 ring-white/30"
      style={{ fontFamily: "ui-monospace, monospace" }}
    >
      <button className={`${btn} rounded-l-full`} onClick={() => go(-1)}>←</button>
      <span className="px-2 whitespace-nowrap">
        {current} ({variants[i].name})
      </span>
      <button className={`${btn} rounded-r-full`} onClick={() => go(1)}>→</button>
    </div>
  );
}
