import { useTitle } from "@/lib/useTitle";
import { CompletionDot, LevelBadge, PageHeader, TenetChip } from "@/sections/ai/harness-engineering/components/Pieces";
import { MODULES } from "@/sections/ai/harness-engineering/content/modules";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Modules() {
  useTitle("Modules — Harness Engineering");

  return (
    <>
      <div className="container py-10">
        <PageHeader
          eyebrow={`${MODULES.length} MODULES · L0 → L5`}
          title="The Module Progression"
          description="Each module builds on the previous, walking from awareness of the harness as a concept to designing production-ready systems with multi-agent topologies."
        />

        <div className="space-y-3">
          {MODULES.map((m) => {
            const done = false;
            return (
              <div
                key={m.slug}
                className={`rounded-lg border border-border bg-card p-5 transition-colors ${
                  done ? "border-emerald-600/40" : "hover:border-primary/40"
                }`}
              >
                <div className="grid lg:grid-cols-12 gap-5 items-start">
                  <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-3 lg:gap-2">
                    <div className="font-mono text-2xl font-semibold text-muted-foreground">
                      {String(m.number).padStart(2, "0")}
                    </div>
                    <CompletionDot complete={done} />
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <LevelBadge level={m.level} transition={m.levelTransition} />
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="font-mono">{m.estimatedReadingMinutes} min read</span>
                      </span>
                    </div>
                    <h2
                      className="text-xl font-semibold tracking-tight mb-1.5"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {m.title}
                    </h2>
                    <p
                      className="text-muted-foreground leading-relaxed text-sm"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {m.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {m.tenetIds.map((id) => (
                        <TenetChip key={id} tenetId={id} />
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex items-start justify-end">
                    <Link href={`/modules/${m.slug}`}>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                        style={{ color: "#5A7E66", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Open module <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
