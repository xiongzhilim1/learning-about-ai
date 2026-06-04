interface Props {
  number: string;
  label: string;
  tone?: "ink" | "cream";
}

export default function SectionEyebrow({ number, label, tone = "ink" }: Props) {
  const color = tone === "cream" ? "#A89F94" : "#C75B39";
  return (
    <p
      className="text-xs font-semibold mb-4"
      style={{
        color,
        fontFamily: "'Source Sans 3', sans-serif",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      § {number} <span style={{ opacity: 0.55 }}>—</span> {label}
    </p>
  );
}
