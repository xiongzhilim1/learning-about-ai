import { useState } from "react";

interface Block {
  eyebrow: string;
  body: string;
  caption?: string;
}

interface Props {
  blocks: Block[];
}

export default function ConsoleTabs({ blocks }: Props) {
  const [active, setActive] = useState(0);
  const block = blocks[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {blocks.map((b, i) => {
          const isActive = i === active;
          const label = b.eyebrow.split(" / ").pop() || b.eyebrow;
          return (
            <button
              key={b.eyebrow}
              onClick={() => setActive(i)}
              className="rounded-md transition-all duration-200"
              style={{
                background: isActive ? "#1F1D1A" : "transparent",
                color: isActive ? "#F5C4A1" : "#A89F94",
                border: `1px solid ${isActive ? "#C75B39" : "#4A453E"}`,
                padding: "0.4rem 0.85rem",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <figure className="mb-2">
        <p
          className="text-xs font-semibold mb-2"
          style={{
            color: "#F5C4A1",
            fontFamily: "'Fira Code', monospace",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {block.eyebrow}
        </p>
        <pre
          className="overflow-x-auto rounded-r-md"
          style={{
            background: "#1F1D1A",
            color: "#FAF7F2",
            borderLeft: "4px solid #C75B39",
            padding: "1.25rem 1.5rem",
            fontFamily: "'Fira Code', monospace",
            fontSize: "0.8125rem",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          <code style={{ fontFamily: "inherit", color: "inherit" }}>
            {block.body}
          </code>
        </pre>
        {block.caption && (
          <figcaption
            className="mt-3 text-sm"
            style={{
              color: "#A89F94",
              fontFamily: "'Source Sans 3', sans-serif",
              lineHeight: 1.65,
              fontStyle: "italic",
            }}
          >
            {block.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
