import { useState } from "react";
import { fractalLayers, fractalCaption } from "./content";

export default function FractalTopology() {
  const [active, setActive] = useState<string>("intersection");
  const activeLayer = fractalLayers.find((l) => l.id === active)!;

  return (
    <figure className="my-8">
      <div
        className="p-6 md:p-8 rounded-lg"
        style={{
          background: "#2D2A26",
          border: "1px solid #4A453E",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 flex flex-col gap-2">
            {fractalLayers.map((layer, i) => {
              const isActive = layer.id === active;
              const indent = i * 16;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActive(layer.id)}
                  onMouseEnter={() => setActive(layer.id)}
                  className="text-left rounded-md transition-all duration-200"
                  style={{
                    marginLeft: `${indent}px`,
                    background: isActive ? "#1F1D1A" : "transparent",
                    border: `1px solid ${isActive ? "#F5C4A1" : "#4A453E"}`,
                    borderLeft: `3px solid ${isActive ? "#F5C4A1" : "#7B9E87"}`,
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: isActive ? "#F5C4A1" : "#7B9E87",
                        fontFamily: "'Fira Code', monospace",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {layer.number}
                    </span>
                    <span
                      className="text-base font-bold"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        color: isActive ? "#FAF7F2" : "#D4CFC8",
                      }}
                    >
                      {layer.name}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-1"
                    style={{
                      color: "#A89F94",
                      fontFamily: "'Source Sans 3', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {layer.purpose}
                  </p>
                </button>
              );
            })}
          </div>

          <aside
            className="lg:col-span-2 p-5 rounded-md"
            style={{
              background: "#1F1D1A",
              border: "1px solid #4A453E",
            }}
          >
            <p
              className="text-xs font-semibold mb-1"
              style={{
                color: "#F5C4A1",
                fontFamily: "'Fira Code', monospace",
                letterSpacing: "0.15em",
              }}
            >
              {activeLayer.number}
            </p>
            <h4
              className="text-lg font-bold mb-3"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "#FAF7F2",
                lineHeight: 1.2,
              }}
            >
              {activeLayer.name}
            </h4>
            <p
              className="text-sm mb-4"
              style={{
                color: "#D4CFC8",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              {activeLayer.card}
            </p>
            <dl className="space-y-2 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              <div>
                <dt
                  style={{
                    color: "#7B9E87",
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Inherits from
                </dt>
                <dd style={{ color: "#D4CFC8", marginTop: "0.125rem" }}>
                  {activeLayer.inheritsFrom}
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    color: "#7B9E87",
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Writers
                </dt>
                <dd style={{ color: "#D4CFC8", marginTop: "0.125rem" }}>
                  {activeLayer.writers}
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    color: "#7B9E87",
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Readers
                </dt>
                <dd style={{ color: "#D4CFC8", marginTop: "0.125rem" }}>
                  {activeLayer.readers}
                </dd>
              </div>
            </dl>
          </aside>
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
        {fractalCaption}
      </figcaption>
    </figure>
  );
}
