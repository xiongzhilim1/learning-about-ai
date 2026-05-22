import { useTitle } from "@/lib/useTitle";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/sections/ai/harness-engineering/content/modules";
import { TENETS } from "@/sections/ai/harness-engineering/content/tenets";
import { ArrowRight, BookOpen, ChevronRight, Clock, PlayCircle, Target } from "lucide-react";
import { Link } from "wouter";

const SAGE = "#5A7E66";

const tenetColors = [
  { border: "rgba(90,126,102,0.25)", text: "#5A7E66" },
  { border: "rgba(180,100,50,0.25)", text: "#C75B39" },
  { border: "rgba(120,90,160,0.25)", text: "#6B4D96" },
  { border: "rgba(180,130,60,0.25)", text: "#8A7530" },
  { border: "rgba(70,120,160,0.25)", text: "#3D7A8A" },
  { border: "rgba(180,70,100,0.25)", text: "#A33D5C" },
  { border: "rgba(139,115,85,0.25)", text: "#8B7355" },
];

export default function Home() {
  useTitle("Harness Engineering");

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p
              className="text-sm font-sans font-medium tracking-widest uppercase mb-4"
              style={{ color: SAGE }}
            >
              Volume 3 of 3
            </p>
            <h1
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Harness Engineering
              <br />
              <span style={{ color: SAGE }}>for AI Agents</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The model is the CPU. The harness is the operating system. Stop debugging the model
              and start engineering the system around it. Seven tenets, nine modules — synthesized
              from the canonical sources of the field.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/mental-model">
                <Button size="lg" className="gap-2" style={{ background: SAGE }}>
                  Start with the Mental Model
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/simulator">
                <Button size="lg" variant="outline" className="bg-card gap-2">
                  <PlayCircle className="w-4 h-4" />
                  Open the Simulator
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero panel — harness anatomy */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">harness-anatomy.live</span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-3 font-mono text-xs">
                <div className="text-muted-foreground">
                  $ <span style={{ color: SAGE }}>describe</span> agent
                </div>
                <div className="pl-3 space-y-1.5" style={{ borderLeft: `2px solid ${SAGE}40` }}>
                  <div className="flex justify-between"><span className="text-muted-foreground">agent</span><span className="text-foreground">= LLM + Harness</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ loop</span><span className="text-foreground">observe → reason → act</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ context</span><span className="text-foreground">budget · 100k tokens</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ tools</span><span className="text-foreground">allow-listed</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ hooks</span><span className="text-foreground">pre + post</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ state</span><span className="text-foreground">feature_list.json + git</span></div>
                </div>
                <div className="text-muted-foreground pt-2">
                  $ <span className="text-emerald-600">status</span> ok · <span className="text-emerald-600">7</span> tenets engineered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Tenets Overview */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="text-center mb-10">
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-2 block"
              style={{ color: SAGE, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The Foundation
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              The Seven Tenets
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Seven principles cross-validated across the canonical sources,
              each with its own key question and trigger phrases.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TENETS.slice(0, 7).map((tenet, i) => (
              <Link key={tenet.id} href={`/tenets#${tenet.id}`} className="no-underline block">
                <div
                  className="p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.02] h-full"
                  style={{
                    background: "#FDFBF7",
                    borderColor: tenetColors[i % tenetColors.length].border,
                  }}
                >
                  <div
                    className="text-xs font-mono font-semibold mb-2"
                    style={{ color: tenetColors[i % tenetColors.length].text }}
                  >
                    T{tenet.number}
                  </div>
                  <h3
                    className="text-sm font-bold mb-1.5"
                    style={{ fontFamily: "'Fraunces', serif", color: tenetColors[i % tenetColors.length].text }}
                  >
                    {tenet.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {tenet.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/tenets"
              className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
              style={{ color: SAGE, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Read all tenets <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-16" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                style={{ color: "#8A7530", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                9 Modules
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
              >
                The Module Progression
              </h2>
            </div>
            <Link
              href="/modules"
              className="flex items-center gap-1.5 text-sm font-semibold no-underline"
              style={{ color: SAGE, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.slice(0, 4).map((mod) => (
              <Link key={mod.slug} href={`/modules/${mod.slug}`} className="no-underline block">
                <div
                  className="p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] h-full"
                  style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "rgba(90,126,102,0.08)",
                        color: SAGE,
                        fontFamily: "'Fraunces', serif",
                      }}
                    >
                      {String(mod.number).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#6B6560" }}>
                      <Clock className="w-3 h-3" /> {mod.estimatedReadingMinutes} min
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
                  >
                    {mod.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {mod.summary.length > 120 ? mod.summary.slice(0, 120) + "…" : mod.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: "#2D2A26" }}>
        <div className="container text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
          >
            Ready to Start?
          </h2>
          <p
            className="text-base mb-8 max-w-lg mx-auto"
            style={{ color: "#A09B93", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Begin with the Mental Model to understand the harness anatomy,
            then work through the seven tenets and nine progressive modules.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/modules/foundations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline hover:scale-[1.02] transition-all"
              style={{ background: SAGE, color: "#FAF7F2", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <BookOpen className="w-4 h-4" /> Start Module 1
            </Link>
            <Link
              href="/exercises"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline hover:scale-[1.02] transition-all"
              style={{ background: "rgba(250,247,242,0.12)", color: "#FAF7F2", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <Target className="w-4 h-4" /> Browse Exercises
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
