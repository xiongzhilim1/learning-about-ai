import { useState } from "react";
import { brainNodes } from "./content";

export default function WireDiagram() {
  const [active, setActive] = useState<string>("second");
  const activeNode = brainNodes.find((n) => n.id === active)!;

  const second = brainNodes.find((n) => n.id === "second")!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-3">
        <svg
          viewBox="0 4 100 96"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
          style={{ maxHeight: "440px" }}
          role="img"
          aria-label="Five-brain architecture diagram"
        >
          {brainNodes
            .filter((n) => n.id !== "second")
            .map((n) => {
              const isHot = active === n.id || active === "second";
              return (
                <line
                  key={`line-${n.id}`}
                  x1={second.x}
                  y1={second.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="#7B9E87"
                  strokeWidth={0.4}
                  strokeOpacity={isHot ? 0.9 : 0.3}
                  style={{ transition: "stroke-opacity 200ms" }}
                />
              );
            })}

          {brainNodes.map((n) => {
            const isActive = n.id === active;
            return (
              <g
                key={n.id}
                style={{ cursor: "pointer" }}
                onClick={() => setActive(n.id)}
                onMouseEnter={() => setActive(n.id)}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={7.5}
                  fill={isActive ? "#C75B39" : "#F0EBE3"}
                  stroke="#C75B39"
                  strokeWidth={0.7}
                  style={{ transition: "fill 200ms" }}
                />
                <text
                  x={n.x}
                  y={n.y + 14}
                  textAnchor="middle"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "3.2px",
                    fill: "#2D2A26",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <aside
        className="lg:col-span-2 p-6 rounded-lg"
        style={{
          background: "#FDFBF7",
          border: "1px solid #E8E0D4",
          minHeight: "200px",
        }}
      >
        <p
          className="text-xs font-semibold mb-2"
          style={{
            color: "#C75B39",
            fontFamily: "'Fira Code', monospace",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {activeNode.label}_BRAIN
        </p>
        <p
          className="text-sm mb-3"
          style={{
            color: "#7B9E87",
            fontFamily: "'Source Sans 3', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          {activeNode.role}
        </p>
        <p
          className="text-base"
          style={{
            color: "#3A3530",
            fontFamily: "'Source Sans 3', sans-serif",
            lineHeight: 1.7,
          }}
        >
          {activeNode.card}
        </p>
      </aside>
    </div>
  );
}
