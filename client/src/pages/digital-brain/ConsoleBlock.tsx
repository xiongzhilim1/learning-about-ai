interface Props {
  eyebrow: string;
  body: string;
  caption?: string;
}

export default function ConsoleBlock({ eyebrow, body, caption }: Props) {
  return (
    <figure className="my-8">
      <p
        className="text-xs font-semibold mb-2"
        style={{
          color: "#C75B39",
          fontFamily: "'Fira Code', monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </p>
      <pre
        className="overflow-x-auto rounded-r-md"
        style={{
          background: "#2D2A26",
          color: "#FAF7F2",
          borderLeft: "4px solid #C75B39",
          padding: "1.25rem 1.5rem",
          fontFamily: "'Fira Code', monospace",
          fontSize: "0.8125rem",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        <code style={{ fontFamily: "inherit", color: "inherit" }}>{body}</code>
      </pre>
      {caption && (
        <figcaption
          className="mt-3 text-sm"
          style={{
            color: "#5A5550",
            fontFamily: "'Source Sans 3', sans-serif",
            lineHeight: 1.65,
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
