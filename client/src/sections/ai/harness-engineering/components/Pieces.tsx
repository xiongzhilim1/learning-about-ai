import { TENETS } from "@/sections/ai/harness-engineering/content/tenets";
import { Link } from "wouter";

export function LevelBadge({ level, transition }: { level: string; transition?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider border"
      style={{ background: "rgba(90,126,102,0.1)", borderColor: "rgba(90,126,102,0.3)", color: "#5A7E66" }}
    >
      <span className="font-semibold">{level}</span>
      {transition && transition !== level && (
        <span style={{ color: "rgba(90,126,102,0.6)" }}>{transition.replace(level, "").trim()}</span>
      )}
    </span>
  );
}

export function TenetChip({
  tenetId,
  asLink = true,
  size = "sm",
}: {
  tenetId: string;
  asLink?: boolean;
  size?: "sm" | "md";
}) {
  const tenet = TENETS.find((t) => t.id === tenetId);
  if (!tenet) return null;
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1";
  const inner = (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-mono tracking-wide border ${sizeClass}`}
      style={{
        borderColor: `${tenet.accentColor.replace(")", " / 0.4)")}`,
        backgroundColor: `${tenet.accentColor.replace(")", " / 0.1)")}`,
        color: tenet.accentColor,
      }}
    >
      <span className="opacity-60">T{tenet.number}</span>
      <span>{tenet.title.split(":")[0].split("(")[0].trim()}</span>
    </span>
  );
  if (!asLink) return inner;
  return (
    <Link href={`/tenets#${tenet.id}`} className="hover:opacity-80">
      {inner}
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border pb-6 mb-8">
      {eyebrow && (
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{eyebrow}</div>
      )}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground max-w-3xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          {description}
        </p>
      )}
    </div>
  );
}

export function CompletionDot({ complete }: { complete: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        complete ? "bg-emerald-500" : "bg-border"
      }`}
    />
  );
}
