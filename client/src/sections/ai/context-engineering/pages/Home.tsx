import { useTitle } from "@/lib/useTitle";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ChevronRight, Clock, Compass, Scroll } from "lucide-react";
import { approaches, tenets } from "@/sections/ai/context-engineering/lib/data";

const SIENNA = "oklch(0.45 0.12 45)";

const tenetColors = [
  { border: "rgba(180,100,50,0.25)", text: "oklch(0.45 0.12 45)" },
  { border: "rgba(90,126,102,0.25)", text: "#5A7E66" },
  { border: "rgba(180,130,60,0.25)", text: "#8A7530" },
  { border: "rgba(120,90,160,0.25)", text: "#6B4D96" },
  { border: "rgba(180,70,100,0.25)", text: "#A33D5C" },
  { border: "rgba(70,120,160,0.25)", text: "#3D7A8A" },
];

export default function Home() {
  useTitle("Context Engineering");
  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p
              className="text-sm font-sans font-medium tracking-widest uppercase mb-4"
              style={{ color: SIENNA }}
            >
              Volume 2 of 3
            </p>
            <h1
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Context Engineering
              <br />
              <span className="text-sienna">Mastery</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The art and science of curating what the model sees on a single turn.
              Prompting is one message. Harness engineering is many turns.
              Context engineering is the craft in between.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/approaches">
                <Button size="lg" className="gap-2" style={{ background: SIENNA }}>
                  Explore the Six Approaches
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tenets">
                <Button size="lg" variant="outline" className="bg-card gap-2">
                  <Scroll className="w-4 h-4" />
                  Read the 12 Tenets
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero panel — context layers */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: SIENNA }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">context-layers.model</span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-3 font-mono text-xs">
                <div className="text-muted-foreground">
                  $ <span className="text-sienna">inspect</span> context_window
                </div>
                <div className="pl-3 space-y-1.5" style={{ borderLeft: "2px solid oklch(0.45 0.12 45 / 0.25)" }}>
                  <div className="flex justify-between"><span className="text-muted-foreground">capacity</span><span className="text-foreground">200k tokens</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">smart zone</span><span className="text-foreground">~75k tokens</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">target util</span><span className="text-foreground">40–60%</span></div>
                </div>
                <div className="pl-3 space-y-1.5 pt-1" style={{ borderLeft: "2px solid #5A7E6640" }}>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ static</span><span className="text-foreground">cached rules · system prompt</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ dynamic</span><span className="text-foreground">managed per-turn</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ ephemeral</span><span className="text-foreground">this turn only</span></div>
                </div>
                <div className="text-muted-foreground pt-2">
                  $ <span style={{ color: "#5A7E66" }}>health</span> ok · <span style={{ color: "#5A7E66" }}>12</span> tenets · <span style={{ color: "#5A7E66" }}>6</span> approaches
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Tenets Overview */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="text-center mb-10">
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-2 block"
              style={{ color: SIENNA, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The Foundation
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              12 Canonical Tenets
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Cross-validated operating principles grounding the discipline
              in measurable reality — each with naive vs. engineered comparisons.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tenets.slice(0, 8).map((tenet, i) => (
              <Link key={tenet.id} href="/tenets" className="no-underline block">
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
                    {tenet.keyQuestion}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/tenets"
              className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
              style={{ color: SIENNA, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              See all 12 tenets <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Approaches Preview */}
      <section className="py-16" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                style={{ color: "#5A7E66", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                6 Approaches
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
              >
                Architectural Strategies
              </h2>
            </div>
            <Link
              href="/approaches"
              className="flex items-center gap-1.5 text-sm font-semibold no-underline"
              style={{ color: SIENNA, fontFamily: "'Source Sans 3', sans-serif" }}
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approaches.slice(0, 6).map((a) => (
              <Link key={a.id} href="/approaches" className="no-underline block">
                <div
                  className="p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] h-full"
                  style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "rgba(140,90,40,0.08)",
                        color: SIENNA,
                        fontFamily: "'Fraunces', serif",
                      }}
                    >
                      {a.number}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: "rgba(90,126,102,0.08)", color: "#5A7E66" }}
                    >
                      {a.tokenEfficiency} efficiency
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {a.subtitle}
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
            Begin with the Mental Model to understand the conceptual framework,
            then explore the six approaches and their canonical tenets.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/mental-model"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline hover:scale-[1.02] transition-all"
              style={{ background: SIENNA, color: "#FAF7F2", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <BookOpen className="w-4 h-4" /> Start with the Mental Model
            </Link>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline hover:scale-[1.02] transition-all"
              style={{ background: "rgba(250,247,242,0.12)", color: "#FAF7F2", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <Scroll className="w-4 h-4" /> Pre-Flight Checklist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
