import { ArrowRight } from "lucide-react";
import { transitions, transitionsCaption } from "./content";

export default function TransitionsDiagram() {
  return (
    <figure className="my-8">
      <div
        className="p-6 md:p-8 rounded-lg"
        style={{
          background: "#2D2A26",
          border: "1px solid #4A453E",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 lg:gap-2 items-stretch">
          {transitions.map((stage, i) => {
            const accent = stage.id === "hybrid" || stage.id === "multibrain"
              ? "#F5C4A1"
              : "#7B9E87";
            return (
              <div
                key={stage.id}
                className="lg:contents"
              >
                <div
                  className="lg:col-span-2 p-4 rounded-md"
                  style={{
                    background: "#1F1D1A",
                    border: `1px solid ${accent}40`,
                    borderLeft: `3px solid ${accent}`,
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{
                      color: accent,
                      fontFamily: "'Fira Code', monospace",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {stage.number}
                  </p>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      color: "#FAF7F2",
                      lineHeight: 1.2,
                    }}
                  >
                    {stage.name}
                  </h3>
                  <p
                    className="text-xs mb-3 italic"
                    style={{
                      color: "#A89F94",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {stage.attribution}
                  </p>
                  <p
                    className="text-xs mb-3"
                    style={{
                      color: "#D4CFC8",
                      fontFamily: "'Source Sans 3', sans-serif",
                      lineHeight: 1.55,
                    }}
                  >
                    {stage.oneLiner}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p
                        className="text-[10px] mb-0.5"
                        style={{
                          color: "#7B9E87",
                          fontFamily: "'Fira Code', monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Strength
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: "#D4CFC8",
                          fontFamily: "'Source Sans 3', sans-serif",
                          lineHeight: 1.5,
                        }}
                      >
                        {stage.strength}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-[10px] mb-0.5"
                        style={{
                          color: "#C75B39",
                          fontFamily: "'Fira Code', monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Weakness
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: "#D4CFC8",
                          fontFamily: "'Source Sans 3', sans-serif",
                          lineHeight: 1.5,
                        }}
                      >
                        {stage.weakness}
                      </p>
                    </div>
                  </div>
                </div>
                {i < transitions.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center">
                    <ArrowRight
                      className="w-5 h-5"
                      style={{ color: "#7B9E87", opacity: 0.7 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
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
        {transitionsCaption}
      </figcaption>
    </figure>
  );
}
