import { useState } from "react";
import { section6Turns } from "./content";

function renderExchange(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const isLabel = line === "USER" || line === "CLAUDE";
    return (
      <div
        key={i}
        style={{
          color: isLabel ? "#F5C4A1" : "#FAF7F2",
          fontWeight: isLabel ? 600 : 400,
          letterSpacing: isLabel ? "0.1em" : "normal",
        }}
      >
        {line || " "}
      </div>
    );
  });
}

export default function TurnSelector() {
  const [active, setActive] = useState(0);
  const turn = section6Turns[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {section6Turns.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.patternEyebrow}
              onClick={() => setActive(i)}
              className="rounded-md transition-all duration-200"
              style={{
                background: isActive ? "#2D2A26" : "#FDFBF7",
                color: isActive ? "#F5C4A1" : "#4A453E",
                border: `1px solid ${isActive ? "#2D2A26" : "#E8E0D4"}`,
                padding: "0.45rem 0.85rem",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              <span style={{ opacity: 0.7, marginRight: "0.5rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {t.patternEyebrow}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <p
          className="text-base md:text-lg"
          style={{
            color: "#3A3530",
            fontFamily: "'Source Sans 3', sans-serif",
            lineHeight: 1.75,
          }}
        >
          {turn.annotation}
        </p>
        <pre
          className="overflow-x-auto rounded-r-md"
          style={{
            background: "#2D2A26",
            borderLeft: "4px solid #C75B39",
            padding: "1rem 1.25rem",
            fontFamily: "'Fira Code', monospace",
            fontSize: "0.8125rem",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          <code style={{ fontFamily: "inherit" }}>
            {renderExchange(turn.exchange)}
          </code>
        </pre>
      </div>
    </div>
  );
}
