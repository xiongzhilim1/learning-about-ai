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
        {line || " "}
      </div>
    );
  });
}

export default function AnnotatedSplit() {
  return (
    <div className="space-y-12">
      {section6Turns.map((turn) => (
        <div key={turn.patternEyebrow}>
          <p
            className="text-xs font-semibold mb-4"
            style={{
              color: "#7B9E87",
              fontFamily: "'Fira Code', monospace",
              letterSpacing: "0.15em",
            }}
          >
            {turn.patternEyebrow}
          </p>
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
      ))}
    </div>
  );
}
