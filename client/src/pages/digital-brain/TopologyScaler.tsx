import { useState } from "react";
import { topologyConfigs, type TopologyBox } from "./content";

const toneColor: Record<TopologyBox["tone"], string> = {
  ink: "#FAF7F2",
  sage: "#7B9E87",
  peach: "#F5C4A1",
  terracotta: "#C75B39",
};

export default function TopologyScaler() {
  const [active, setActive] = useState<string>("mid");
  const cfg = topologyConfigs.find((c) => c.id === active)!;

  return (
    <figure className="my-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {topologyConfigs.map((c) => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="rounded-md transition-all duration-200"
              style={{
                background: isActive ? "#2D2A26" : "#FDFBF7",
                color: isActive ? "#F5C4A1" : "#4A453E",
                border: `1px solid ${isActive ? "#2D2A26" : "#E8E0D4"}`,
                padding: "0.5rem 1rem",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.8125rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
              }}
            >
              {c.tab}
            </button>
          );
        })}
      </div>

      <div
        className="p-6 md:p-8 rounded-lg"
        style={{
          background: "#2D2A26",
          border: "1px solid #4A453E",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <p
              className="text-xs font-semibold mb-2"
              style={{
                color: "#F5C4A1",
                fontFamily: "'Fira Code', monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {cfg.size}
            </p>
            <p
              className="text-xs mb-4 italic"
              style={{
                color: "#A89F94",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {cfg.threshold}
            </p>
            <h4
              className="text-xl md:text-2xl font-bold mb-4"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "#FAF7F2",
                lineHeight: 1.25,
              }}
            >
              {cfg.spine}
            </h4>
            <p
              className="text-sm"
              style={{
                color: "#D4CFC8",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              {cfg.body}
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2">
            {cfg.boxes.map((box, i) => {
              const color = toneColor[box.tone];
              const indent = (box.indent || 0) * 20;
              return (
                <div
                  key={`${cfg.id}-${i}`}
                  className="rounded-md"
                  style={{
                    marginLeft: `${indent}px`,
                    background: "#1F1D1A",
                    border: `1px solid ${color}40`,
                    borderLeft: `3px solid ${color}`,
                    padding: "0.75rem 1rem",
                  }}
                >
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: "#FAF7F2",
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {box.label}
                  </p>
                  {box.sublabel && (
                    <p
                      className="text-xs mt-0.5"
                      style={{
                        color: "#A89F94",
                        fontFamily: "'Source Sans 3', sans-serif",
                        lineHeight: 1.5,
                      }}
                    >
                      {box.sublabel}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <figcaption
        className="mt-4 text-sm"
        style={{
          color: "#5A5550",
          fontFamily: "'Fira Code', monospace",
          lineHeight: 1.65,
        }}
      >
        {cfg.caption}
      </figcaption>
    </figure>
  );
}
