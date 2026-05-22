import { LevelBadge, PageHeader, TenetChip } from "@/sections/ai/harness-engineering/components/Pieces";
import { Button } from "@/components/ui/button";
import { MODULES, Section } from "@/sections/ai/harness-engineering/content/modules";
import { SOURCES_BY_ID } from "@/sections/ai/harness-engineering/content/sources";
import { useTitle } from "@/lib/useTitle";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  GraduationCap,
  HelpCircle,
  Info,
  Lightbulb,
  Microscope,
  ScrollText,
  Shield,
  Target,
  User as UserIcon,
  Wrench,
} from "lucide-react";
import { Link, useParams } from "wouter";
import { useState } from "react";

export default function ModuleDetail() {
  useTitle("Module Detail — Harness Engineering");

  const { slug } = useParams<{ slug: string }>();
  const moduleIndex = MODULES.findIndex((m) => m.slug === slug);
  const m = MODULES[moduleIndex];
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  if (!m) {
    return (
      <>
        <div className="container py-10">
          <PageHeader title="Module not found" description="That module slug doesn't exist." />
          <Link href="/modules">
            <Button variant="outline" className="bg-card">
              Back to modules
            </Button>
          </Link>
        </div>
      </>
    );
  }

  const done = completedSlugs.has(m.slug);
  const prev = MODULES[moduleIndex - 1];
  const next = MODULES[moduleIndex + 1];

  const toggleComplete = (slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <>
      <div className="container py-10 max-w-4xl">
        <Link
          href="/modules"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All modules
        </Link>

        {/* Header */}
        <div className="border-b border-border pb-6 mb-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <LevelBadge level={m.level} transition={m.levelTransition} />
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="font-mono">{m.estimatedReadingMinutes} min read</span>
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              · MODULE {String(m.number).padStart(2, "0")} of {MODULES.length}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-3"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {m.title}
          </h1>
          <p
            className="text-muted-foreground leading-relaxed text-lg max-w-3xl"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {m.summary}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {m.tenetIds.map((id) => (
              <TenetChip key={id} tenetId={id} />
            ))}
          </div>
        </div>

        {/* RefundCo case-study context */}
        <div
          className="rounded-lg border border-border bg-card mb-8"
          style={{ borderColor: "#5A7E6640", background: "#5A7E6615" }}
        >
          <div
            className="px-4 py-3 border-b border-border"
            style={{ background: "#5A7E6615" }}
          >
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5"
              style={{ color: "#5A7E66" }}
            >
              <Microscope className="w-3.5 h-3.5" />
              REFUNDCO · CASE STUDY CONTEXT
            </span>
          </div>
          <div className="px-4 py-3">
            <p
              className="text-sm text-foreground/85 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {m.caseStudyContext}
            </p>
          </div>
        </div>

        {/* Learning outcomes */}
        <div className="rounded-lg border border-border bg-card mb-10">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" style={{ color: "#5A7E66" }} />
              LEARNING OUTCOMES
            </span>
          </div>
          <ul className="px-4 py-3 space-y-2.5">
            {m.learningOutcomes.map((o, i) => (
              <li key={i} className="flex gap-2.5 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#5A7E66" }} />
                <span
                  className="text-foreground/85"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <article className="space-y-6">
          {m.sections.map((s, i) => (
            <SectionRenderer key={i} section={s} />
          ))}
        </article>

        {/* Coach Tips */}
        <div
          className="mt-10 rounded-lg border border-border bg-card"
          style={{ borderColor: "#5A7E6640", background: "#5A7E6615" }}
        >
          <div
            className="px-4 py-3 border-b border-border"
            style={{ background: "#5A7E6615" }}
          >
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5"
              style={{ color: "#5A7E66" }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              COACH'S TIPS
            </span>
          </div>
          <ul className="px-4 py-3 space-y-3">
            {m.coachTips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="font-mono text-xs mt-1" style={{ color: "#5A7E66" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-foreground/90 leading-relaxed"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Further reading (annotated) */}
        <div className="mt-6 rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              FURTHER READING
            </span>
          </div>
          <ul className="px-4 py-3 space-y-4 text-sm">
            {m.furtherReading.map((r, i) => {
              // Resolve sourceId-based references against the catalog;
              // fall back to inline source/url for legacy entries.
              let href = "";
              let title = "";
              let author = "";
              if ("sourceId" in r) {
                const s = SOURCES_BY_ID[r.sourceId];
                if (!s) return null;
                href = s.url;
                title = s.title;
                author = s.author;
              } else {
                href = r.url;
                title = r.source;
              }
              return (
                <li key={i}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="block group hover:bg-muted/30 -mx-2 px-2 py-2 rounded transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" style={{ color: "#5A7E66" }} />
                      <div className="min-w-0">
                        <div
                          className="font-medium text-foreground/95 group-hover:text-emerald-700 transition-colors"
                          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                        >
                          {title}
                        </div>
                        {author && (
                          <div className="text-[11px] uppercase tracking-wider text-muted-foreground/80 mt-0.5">
                            {author}
                          </div>
                        )}
                        {r.section && (
                          <div className="text-xs text-muted-foreground mt-1.5">{r.section}</div>
                        )}
                        {r.note && (
                          <div
                            className="text-xs text-foreground/75 mt-1.5 leading-relaxed border-l-2 pl-2"
                            style={{ borderColor: "#5A7E6640" }}
                          >
                            {r.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mark complete + nav */}
        <div className="mt-10 rounded-lg border border-border bg-card p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <div className="font-medium" style={{ fontFamily: "'Fraunces', serif" }}>
              Finished this module?
            </div>
            <div
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Mark as read to keep your place in the series.
            </div>
          </div>
          <Button
            variant={done ? "outline" : "default"}
            className={done ? "bg-card" : ""}
            onClick={() => toggleComplete(m.slug)}
          >
            {done ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                Marked complete · click to undo
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Mark complete
              </>
            )}
          </Button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/modules/${prev.slug}`}
              className="rounded-lg border border-border bg-card p-4 hover:border-emerald-600/40 group"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                PREVIOUS
              </div>
              <div
                className="font-medium text-sm group-hover:text-emerald-700 transition-colors"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/modules/${next.slug}`}
              className="rounded-lg border border-border bg-card p-4 hover:border-emerald-600/40 group text-right"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                NEXT
                <ArrowRight className="w-3 h-3" />
              </div>
              <div
                className="font-medium text-sm group-hover:text-emerald-700 transition-colors"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {next.title}
              </div>
            </Link>
          ) : (
            <Link
              href="/exercises"
              className="rounded-lg border border-border bg-card p-4 hover:border-emerald-600/40 group text-right"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                ALL MODULES DONE — TRY
                <ArrowRight className="w-3 h-3" />
              </div>
              <div
                className="font-medium text-sm group-hover:text-emerald-700 transition-colors"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Hands-on exercises
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

// =============================================================================
// SECTION RENDERER
// =============================================================================

const ACTOR_META: Record<
  "user" | "llm" | "tool" | "hook" | "state",
  { icon: React.ComponentType<{ className?: string }>; color: string; label: string }
> = {
  user: { icon: UserIcon, color: "text-sky-600", label: "USER" },
  llm: { icon: Brain, color: "text-blue-600", label: "LLM" },
  tool: { icon: Wrench, color: "text-violet-600", label: "TOOL" },
  hook: { icon: Shield, color: "text-amber-600", label: "HOOK" },
  state: { icon: Database, color: "text-emerald-600", label: "STATE" },
};

function SectionRenderer({ section }: { section: Section }) {
  if (section.kind === "prose") {
    return (
      <section>
        {section.heading && (
          <h2
            className="text-2xl font-semibold tracking-tight mb-3"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {section.heading}
          </h2>
        )}
        <p
          className="text-foreground/85 leading-relaxed"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {section.body}
        </p>
      </section>
    );
  }
  if (section.kind === "code") {
    return (
      <section className="rounded-lg border border-border bg-card">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{section.heading || "code"}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-2">{section.lang}</span>
        </div>
        <div className="px-4 py-3 p-0">
          <pre className="bg-muted/50 p-4 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
            <code>{section.code}</code>
          </pre>
          {section.caption && (
            <div className="px-4 py-2.5 border-t border-border text-xs text-muted-foreground italic">
              {section.caption}
            </div>
          )}
        </div>
      </section>
    );
  }
  if (section.kind === "callout") {
    const tones = {
      tip: {
        icon: Lightbulb,
        border: "border-emerald-600/40",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
      },
      warn: {
        icon: AlertTriangle,
        border: "border-amber-500/40",
        bg: "bg-amber-50",
        text: "text-amber-700",
      },
      insight: {
        icon: Info,
        border: "border-emerald-600/40",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
      },
    };
    const t = tones[section.tone];
    const Icon = t.icon;
    return (
      <section className={`rounded-lg border p-4 ${t.border} ${t.bg}`}>
        <div className="flex gap-3">
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${t.text}`} />
          <div>
            <div
              className={`font-semibold mb-1 ${t.text}`}
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {section.heading}
            </div>
            <p
              className="text-sm text-foreground/85 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {section.body}
            </p>
          </div>
        </div>
      </section>
    );
  }
  if (section.kind === "naive-vs-engineered") {
    return (
      <section className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card border-destructive/30">
          <div className="px-4 py-3 border-b border-border bg-destructive/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-destructive">
              <AlertTriangle className="w-3.5 h-3.5" />
              NAIVE HARNESS
            </span>
          </div>
          <div className="px-4 py-3 p-0">
            <pre className="bg-muted/50 p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{section.naive.code}</code>
            </pre>
            <div className="p-4 border-t border-border text-sm text-foreground/85">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">PROBLEM</span>
              <p className="mt-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {section.naive.problem}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card border-emerald-600/30">
          <div className="px-4 py-3 border-b border-border bg-emerald-50">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ENGINEERED HARNESS
            </span>
          </div>
          <div className="px-4 py-3 p-0">
            <pre className="bg-muted/50 p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{section.engineered.code}</code>
            </pre>
            <div className="p-4 border-t border-border text-sm text-foreground/85">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">BENEFIT</span>
              <p className="mt-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {section.engineered.benefit}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (section.kind === "when-this-hurts") {
    return (
      <section className="rounded-lg border border-border bg-card">
        <div className="px-4 py-3 border-b border-border bg-amber-50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-amber-700">
            <AlertTriangle className="w-3.5 h-3.5" />
            WHEN THIS HURTS
          </span>
        </div>
        <div className="px-4 py-3 space-y-4">
          {section.items.map((item, i) => (
            <div key={i} className="grid md:grid-cols-12 gap-3 text-sm">
              <div className="md:col-span-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">SIGNAL</div>
                <div className="text-foreground/90" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {item.signal}
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">LIKELY CAUSE</div>
                <div className="text-foreground/80" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {item.cause}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── New section kinds ────────────────────────────────────────────────────
  if (section.kind === "diagram") {
    return (
      <section className="rounded-lg border border-border bg-card">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" style={{ color: "#5A7E66" }} />
            DIAGRAM · {section.heading.toUpperCase()}
          </span>
        </div>
        <div className="px-4 py-3 bg-muted/50 p-4">
          <img
            src={section.src}
            alt={section.alt}
            className="w-full rounded border border-border bg-white"
          />
          {section.caption && (
            <p className="mt-3 text-xs text-muted-foreground italic leading-relaxed">
              {section.caption}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (section.kind === "worked-trace") {
    return (
      <section className="rounded-lg border border-border bg-card border-sky-500/30">
        <div className="px-4 py-3 border-b border-border bg-sky-50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-sky-700">
            <Bot className="w-3.5 h-3.5" />
            WORKED TRACE · {section.heading.toUpperCase()}
          </span>
        </div>
        <div className="px-4 py-3">
          <p
            className="text-sm text-foreground/85 leading-relaxed mb-4 italic"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {section.scenario}
          </p>
          <ol className="space-y-3">
            {section.turns.map((turn, i) => {
              const meta = ACTOR_META[turn.actor];
              const Icon = meta.icon;
              return (
                <li key={i} className="flex gap-3 text-sm">
                  <div className="flex-shrink-0 w-16 pt-0.5">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1 ${meta.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {meta.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground/95">{turn.label}</div>
                    <div
                      className="text-foreground/75 mt-0.5 leading-relaxed"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {turn.detail}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-5 pt-4 border-t border-border">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-sky-700 mb-1">TAKEAWAY</div>
            <p
              className="text-sm text-foreground/90 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {section.takeaway}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "objection") {
    return (
      <section className="rounded-lg border border-violet-500/40 bg-violet-50 p-4">
        <div className="flex gap-3">
          <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-violet-600" />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-violet-600 mb-1">COMMON OBJECTION</div>
            <p
              className="text-sm font-medium text-foreground/95 mb-2 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              "{section.question}"
            </p>
            <p
              className="text-sm text-foreground/85 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {section.response}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "anatomy") {
    return (
      <section className="rounded-lg border border-border bg-card border-rose-500/30">
        <div className="px-4 py-3 border-b border-border bg-rose-50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-rose-700">
            <ScrollText className="w-3.5 h-3.5" />
            ANATOMY OF A FAILURE · {section.heading.toUpperCase()}
          </span>
        </div>
        <div className="px-4 py-3 space-y-3 text-sm">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">FAILURE</div>
            <p className="text-foreground/85 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {section.failure}
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">TRIGGER</div>
            <p className="text-foreground/85 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {section.trigger}
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">DETECT</div>
            <p className="text-foreground/85 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {section.detect}
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 text-emerald-600">PREVENT</div>
            <p className="text-foreground/90 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {section.prevent}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "self-check") {
    return (
      <section className="rounded-lg border border-border bg-card border-emerald-600/30">
        <div className="px-4 py-3 border-b border-border bg-emerald-50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            SELF-CHECK
          </span>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground italic mb-4">
            Try answering these before peeking. If you can answer all three, you have the
            module's core internalized.
          </p>
          <ol className="space-y-4">
            {section.questions.map((q, i) => (
              <li key={i} className="text-sm">
                <details className="group">
                  <summary className="cursor-pointer list-none flex gap-2 items-start hover:text-emerald-700 transition-colors">
                    <span className="font-mono text-emerald-600 text-xs mt-0.5 flex-shrink-0">
                      Q{i + 1}.
                    </span>
                    <span className="font-medium text-foreground/95 flex-1 group-open:text-emerald-700">
                      {q.q}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-2 ml-6 pl-3 border-l-2 border-emerald-600/40 text-foreground/80 leading-relaxed">
                    {q.a}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return null;
}
