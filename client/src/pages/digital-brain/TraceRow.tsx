import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { traceSteps } from "./content";

export default function TraceRow() {
  return (
    <div
      className="grid gap-3 md:gap-2 items-stretch"
      style={{
        gridTemplateColumns: "1fr",
      }}
    >
      <div className="hidden md:grid" style={{ gridTemplateColumns: "3fr 1fr 3fr 1fr 3fr 1fr 3fr 1fr 3fr", gap: "0.5rem" }}>
        {traceSteps.map((step, i) => (
          <Fragment key={step.label}>
            <div
              className="p-4 rounded-md"
              style={{
                background: "#FDFBF7",
                border: "1px solid #E8E0D4",
                gridColumn: "span 1 / span 1",
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
                {step.label}
              </p>
              <h3
                className="text-sm font-bold mb-2"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "#2D2A26",
                  lineHeight: 1.25,
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-xs"
                style={{
                  color: "#5A5550",
                  fontFamily: "'Source Sans 3', sans-serif",
                  lineHeight: 1.55,
                }}
              >
                {step.body}
              </p>
            </div>
            {i < traceSteps.length - 1 && (
              <div className="flex items-center justify-center" aria-hidden>
                <ChevronRight className="w-4 h-4" style={{ color: "#7B9E87" }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="md:hidden space-y-3">
        {traceSteps.map((step) => (
          <div
            key={step.label}
            className="p-4 rounded-md"
            style={{
              background: "#FDFBF7",
              border: "1px solid #E8E0D4",
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
              {step.label}
            </p>
            <h3
              className="text-base font-bold mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "#2D2A26",
                lineHeight: 1.25,
              }}
            >
              {step.title}
            </h3>
            <p
              className="text-sm"
              style={{
                color: "#5A5550",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.6,
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
