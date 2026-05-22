import { useTitle } from "@/lib/useTitle";
import { PageHeader } from "@/sections/ai/harness-engineering/components/Pieces";
import {
  CLUSTER_META,
  Source,
  SourceCluster,
  sourcesByCluster,
} from "@/sections/ai/harness-engineering/content/sources";
import {
  Anchor,
  ArrowUpRight,
  BookOpen,
  Compass,
  FileText,
  GraduationCap,
  Hammer,
  Layers,
  Map as MapIcon,
  ShieldCheck,
  Sparkles,
  Telescope,
} from "lucide-react";
import { useMemo, useState } from "react";

const CLUSTER_ORDER: SourceCluster[] = [
  "foundations",
  "context-memory",
  "guardrails",
  "specs-workflows",
  "evals-observability",
  "benchmarks",
  "runtimes-implementations",
  "courses",
];

const CLUSTER_ICON: Record<SourceCluster, React.ReactNode> = {
  foundations: <Anchor className="w-4 h-4" />,
  "context-memory": <Layers className="w-4 h-4" />,
  guardrails: <ShieldCheck className="w-4 h-4" />,
  "specs-workflows": <FileText className="w-4 h-4" />,
  "evals-observability": <Telescope className="w-4 h-4" />,
  benchmarks: <Sparkles className="w-4 h-4" />,
  "runtimes-implementations": <Hammer className="w-4 h-4" />,
  courses: <GraduationCap className="w-4 h-4" />,
};

type FilterMode = "all" | "primary";

export default function Resources() {
  useTitle("Resources — Harness Engineering");
  const [mode, setMode] = useState<FilterMode>("all");

  const clusters = useMemo(() => {
    return CLUSTER_ORDER.map((cluster) => {
      const all = sourcesByCluster(cluster);
      const filtered = mode === "primary" ? all.filter((s) => s.primary) : all;
      return { cluster, all, filtered };
    });
  }, [mode]);

  const totalAll = clusters.reduce((sum, c) => sum + c.all.length, 0);
  const totalPrimary = clusters.reduce(
    (sum, c) => sum + c.all.filter((s) => s.primary).length,
    0,
  );
  const visible = clusters.reduce((sum, c) => sum + c.filtered.length, 0);

  return (
    <>
      <div className="container py-10">
        <PageHeader
          eyebrow="FIELD MAP"
          title="Resources"
          description="The harness-engineering literature, organized as a field map across seven clusters. Every cluster opens with our editorial framing; every entry carries a one-line annotation and our note on why it matters. Curated against walkinglabs/awesome-harness-engineering."
        />

        {/* Map legend / filter */}
        <div className="rounded-lg border border-border bg-card p-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapIcon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">
                {visible} of {totalAll} entries shown
              </div>
              <div
                className="text-xs text-muted-foreground mt-1"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {totalPrimary} marked <span className="text-primary">primary</span> — the
                must-read core if you only have a weekend.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("all")}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-colors ${
                mode === "all"
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({totalAll})
            </button>
            <button
              onClick={() => setMode("primary")}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-colors ${
                mode === "primary"
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Primary ({totalPrimary})
            </button>
          </div>
        </div>

        {/* Cluster nav */}
        <div className="rounded-lg border border-border bg-card p-4 mb-10">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            JUMP TO CLUSTER
          </div>
          <div className="flex flex-wrap gap-2">
            {CLUSTER_ORDER.map((cluster) => (
              <a
                key={cluster}
                href={`#${cluster}`}
                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 border border-border rounded-md hover:border-primary/40 hover:bg-muted/30 transition-colors"
              >
                <span className="text-primary">{CLUSTER_ICON[cluster]}</span>
                <span className="text-foreground/85">{CLUSTER_META[cluster].title}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {sourcesByCluster(cluster).length}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Cluster sections */}
        {clusters.map(({ cluster, all, filtered }) => {
          if (filtered.length === 0) return null;
          const meta = CLUSTER_META[cluster];
          const primaryCount = all.filter((s) => s.primary).length;
          return (
            <section key={cluster} id={cluster} className="mb-14 scroll-mt-24">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 text-primary flex items-center justify-center flex-shrink-0">
                  {CLUSTER_ICON[cluster]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h2
                      className="text-xl font-semibold tracking-tight"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {meta.title}
                    </h2>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-xs">
                      {filtered.length} of {all.length} · {primaryCount} primary
                    </div>
                  </div>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed max-w-3xl"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {meta.intro}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((s) => (
                  <ResourceCard key={s.id} source={s} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Attribution */}
        <div className="rounded-lg border border-border bg-card p-5 mt-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            ATTRIBUTION
          </div>
          <p
            className="text-sm text-foreground/80 leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Most of this catalog is curated from{" "}
            <a
              href="https://github.com/walkinglabs/awesome-harness-engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              walkinglabs/awesome-harness-engineering
            </a>
            . Where a source coined a phrase or framing, attribution is preserved verbatim
            throughout this course — "the ratchet" (Addy Osmani), "context anxiety"
            (Anthropic), "12 Factor Agents" (HumanLayer), the Planner / Generator /
            Evaluator pattern (Anthropic), the cybernetic feedforward / feedback framing
            (Martin Fowler / Birgitta Böckeler at Thoughtworks), and the operating maxim
            "a decent model with a great harness beats a great model with a bad harness"
            (Addy Osmani). Read the originals — most are short.
          </p>
        </div>
      </div>
    </>
  );
}

function ResourceCard({ source: s }: { source: Source }) {
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border border-border bg-card p-5 hover:border-primary/40 group block"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">{s.author}</span>
          {s.primary && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
              primary
            </span>
          )}
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
      <h3
        className="font-semibold leading-snug mb-2 group-hover:text-primary transition-colors"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {s.title}
      </h3>
      <p
        className="text-sm text-foreground/80 leading-relaxed mb-3"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {s.annotation}
      </p>
      <div
        className="text-xs text-foreground/70 leading-relaxed border-l-2 border-primary/30 pl-3 italic"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {s.whyItMatters}
      </div>
    </a>
  );
}
