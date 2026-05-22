import { useTitle } from "@/lib/useTitle";
import { PageHeader } from "@/sections/ai/harness-engineering/components/Pieces";
import { TENETS, Tenet } from "@/sections/ai/harness-engineering/content/tenets";
import { CheckCircle2, AlertCircle, Quote, Lightbulb } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Tenets() {
  useTitle("Tenets — Harness Engineering");
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location]);

  return (
    <>
      <div className="container py-10">
        <PageHeader
          eyebrow="THE SEVEN TENETS"
          title="Canonical Principles of Harness Engineering"
          description="Each tenet is cross-validated across the major sources. For every one: the key question that exposes whether you're applying it, trigger phrases that signal it in conversation, best practices, and a side-by-side of naive vs. engineered harness."
        />

        {/* Quick index */}
        <div className="rounded-lg border border-border bg-card mb-10">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">index</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-4">7 tenets</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 p-3">
            {TENETS.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-card text-sm"
              >
                <span
                  className="w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-semibold"
                  style={{
                    backgroundColor: t.accentColor.replace(")", " / 0.15)"),
                    color: t.accentColor,
                    border: `1px solid ${t.accentColor.replace(")", " / 0.3)")}`,
                  }}
                >
                  T{t.number}
                </span>
                <span className="line-clamp-1">{t.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {TENETS.map((t) => (
            <TenetSection key={t.id} tenet={t} />
          ))}
        </div>
      </div>
    </>
  );
}

function TenetSection({ tenet: t }: { tenet: Tenet }) {
  const accentBg = t.accentColor.replace(")", " / 0.08)");
  const accentBorder = t.accentColor.replace(")", " / 0.3)");

  return (
    <section
      id={t.id}
      className="scroll-mt-20 rounded-xl border p-6 md:p-8"
      style={{
        borderColor: accentBorder,
        background: `linear-gradient(180deg, ${accentBg}, transparent 30%), var(--card)`,
      }}
    >
      <div className="flex flex-wrap items-start gap-5 mb-6">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center font-mono text-lg font-semibold flex-shrink-0"
          style={{
            backgroundColor: t.accentColor.replace(")", " / 0.15)"),
            color: t.accentColor,
            border: `1px solid ${accentBorder}`,
          }}
        >
          T{t.number}
        </div>
        <div className="flex-1 min-w-0">
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {t.title}
          </h2>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      <p
        className="text-foreground/90 leading-relaxed mb-6"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {t.longDefinition}
      </p>

      {/* Key Question */}
      <div
        className="rounded-lg border p-4 mb-6 flex gap-3 items-start"
        style={{ borderColor: accentBorder, backgroundColor: accentBg }}
      >
        <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: t.accentColor }} />
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">KEY QUESTION</div>
          <div className="text-lg font-medium leading-snug">{t.keyQuestion}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Best Practices */}
        <div className="rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: t.accentColor }} />
              BEST PRACTICES
            </span>
          </div>
          <ul className="px-4 py-3 space-y-2.5">
            {t.bestPractices.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm">
                <span className="font-mono text-xs mt-1" style={{ color: t.accentColor }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-foreground/85"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trigger Phrases */}
        <div className="rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5" style={{ color: t.accentColor }} />
              TRIGGER PHRASES
            </span>
          </div>
          <ul className="px-4 py-3 space-y-3">
            {t.triggerPhrases.map((p, i) => (
              <li key={i}>
                <div
                  className="text-sm italic text-foreground/85 leading-snug"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  "{p.phrase}"
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">— {p.source}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Naive vs Engineered */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-lg border border-destructive/30 bg-card">
          <div className="px-4 py-3 border-b border-border bg-destructive/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-destructive">
              <AlertCircle className="w-3.5 h-3.5" />
              NAIVE HARNESS
            </span>
          </div>
          <div className="px-4 py-3 space-y-3">
            <pre className="bg-background border border-border rounded-md p-3 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{t.naive.code}</code>
            </pre>
            <div className="text-sm text-foreground/85 leading-relaxed">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">PROBLEM</span>
              <p
                className="mt-1"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t.naive.problem}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card" style={{ borderColor: accentBorder }}>
          <div className="px-4 py-3 border-b border-border" style={{ backgroundColor: accentBg }}>
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5"
              style={{ color: t.accentColor }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              ENGINEERED HARNESS
            </span>
          </div>
          <div className="px-4 py-3 space-y-3">
            <pre className="bg-background border border-border rounded-md p-3 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{t.engineered.code}</code>
            </pre>
            <div className="text-sm text-foreground/85 leading-relaxed">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">BENEFIT</span>
              <p
                className="mt-1"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t.engineered.benefit}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-muted-foreground">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">VALIDATED BY</span>{" "}
        <span className="ml-2">{t.sources.join(" · ")}</span>
      </div>
    </section>
  );
}
