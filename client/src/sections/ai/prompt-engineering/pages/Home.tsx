/*
 * Home Page — "The Workshop" Design
 * Hero with workshop imagery, 5 Tenets overview, Module grid, CTA
 * Warm earth tones, Fraunces headings, tactile card design
 */
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Layers, Target, ChevronRight, Compass } from "lucide-react";
import { tenets, modules } from "@/sections/ai/prompt-engineering/lib/courseData";
import { useTitle } from "@/lib/useTitle";

const tenetColors = [
  { bg: "rgba(199, 91, 57, 0.10)", border: "rgba(199, 91, 57, 0.25)", text: "#C75B39" },
  { bg: "rgba(123, 158, 135, 0.10)", border: "rgba(123, 158, 135, 0.25)", text: "#5A7E66" },
  { bg: "rgba(196, 163, 90, 0.10)", border: "rgba(196, 163, 90, 0.25)", text: "#8A7530" },
  { bg: "rgba(120, 90, 160, 0.10)", border: "rgba(120, 90, 160, 0.25)", text: "#6B4D96" },
  { bg: "rgba(180, 70, 100, 0.10)", border: "rgba(180, 70, 100, 0.25)", text: "#A33D5C" },
];

export default function Home() {
  useTitle("Prompt Engineering");
  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p
              className="text-sm font-sans font-medium tracking-widest uppercase mb-4"
              style={{ color: "#C75B39" }}
            >
              Volume 1 of 3
            </p>
            <h1
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Master the Craft of
              <br />
              <span style={{ color: "#C75B39" }}>AI Prompting</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              A structured learning journey through the 5 Core Tenets of effective prompting.
              Progress from AI novice to AI-native practitioner with hands-on exercises
              and real-world applications.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/modules/1">
                <Button size="lg" className="gap-2" style={{ background: "#C75B39" }}>
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tenets">
                <Button size="lg" variant="outline" className="bg-card gap-2">
                  <Compass className="w-4 h-4" />
                  Explore the 5 Tenets
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero panel — prompt anatomy */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#C75B39" }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">prompt-anatomy.ref</span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-3 font-mono text-xs">
                <div className="text-muted-foreground">
                  $ <span style={{ color: "#C75B39" }}>describe</span> effective_prompt
                </div>
                <div className="pl-3 space-y-1.5" style={{ borderLeft: "2px solid rgba(199,91,57,0.25)" }}>
                  <div className="flex justify-between"><span className="text-muted-foreground">role</span><span className="text-foreground">persona + constraints</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">context</span><span className="text-foreground">relevant background</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">task</span><span className="text-foreground">clear instruction</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">examples</span><span className="text-foreground">few-shot demonstrations</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">format</span><span className="text-foreground">output structure</span></div>
                </div>
                <div className="pl-3 space-y-1.5 pt-1" style={{ borderLeft: "2px solid rgba(90,126,102,0.25)" }}>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ decompose</span><span className="text-foreground">break complex tasks</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ reason</span><span className="text-foreground">chain-of-thought</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↳ validate</span><span className="text-foreground">self-criticism loop</span></div>
                </div>
                <div className="text-muted-foreground pt-2">
                  $ <span style={{ color: "#5A7E66" }}>status</span> ok · <span style={{ color: "#5A7E66" }}>5</span> tenets · <span style={{ color: "#5A7E66" }}>8</span> modules
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Tenets Overview */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase mb-2 block"
              style={{ color: "#C75B39", fontFamily: "'Source Sans 3', sans-serif" }}>
              The Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
              5 Core Tenets of Prompting
            </h2>
            <p className="text-base max-w-xl mx-auto"
              style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}>
              Based on the taxonomy from "The Prompt Report" (Schulhoff et al., 2024),
              these five meta-categories form the backbone of effective prompt engineering.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tenets.map((tenet, i) => (
              <Link key={tenet.id} href="/tenets" className="no-underline block">
                <div className="p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.02] h-full"
                  style={{
                    background: "#FDFBF7",
                    borderColor: tenetColors[i].border,
                  }}>
                  <div className="text-2xl mb-3">{tenet.icon}</div>
                  <h3 className="text-sm font-bold mb-1.5"
                    style={{ fontFamily: "'Fraunces', serif", color: tenetColors[i].text }}>
                    {tenet.name}
                  </h3>
                  <p className="text-xs leading-relaxed"
                    style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {tenet.keyQuestion}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-16" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                style={{ color: "#5A7E66", fontFamily: "'Source Sans 3', sans-serif" }}>
                8 Modules
              </span>
              <h2 className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
                Your Learning Path
              </h2>
            </div>
            <Link href="/modules" className="flex items-center gap-1.5 text-sm font-semibold no-underline"
              style={{ color: "#C75B39", fontFamily: "'Source Sans 3', sans-serif" }}>
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.slice(0, 4).map((mod) => (
              <Link key={mod.id} href={`/modules/${mod.id}`} className="no-underline block">
                <div className="p-5 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] h-full"
                  style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ background: "rgba(199,91,57,0.08)", color: "#C75B39", fontFamily: "'Fraunces', serif" }}>
                      {mod.id}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#6B6560" }}>
                      <Clock className="w-3 h-3" /> {mod.duration}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-1"
                    style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
                    {mod.title}
                  </h3>
                  <p className="text-xs" style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {mod.subtitle}
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
          <h2 className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}>
            Ready to Start?
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto"
            style={{ color: "#A09B93", fontFamily: "'Source Sans 3', sans-serif" }}>
            Begin with Module 1 to build your foundation, or explore the 5 Core Tenets
            to understand the framework behind effective prompting.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/modules/1" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline hover:scale-[1.02] transition-all"
              style={{ background: "#C75B39", color: "#FAF7F2", fontFamily: "'Source Sans 3', sans-serif" }}>
              <BookOpen className="w-4 h-4" /> Start Module 1
            </Link>
            <Link href="/exercises" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline hover:scale-[1.02] transition-all"
              style={{ background: "rgba(250,247,242,0.12)", color: "#FAF7F2", fontFamily: "'Source Sans 3', sans-serif" }}>
              <Target className="w-4 h-4" /> Browse Exercises
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
