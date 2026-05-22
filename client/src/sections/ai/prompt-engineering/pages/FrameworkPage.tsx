/*
 * FrameworkPage — Proficiency Framework (L0-L5)
 * Visual progression from AI Unaware to AI Native
 */

import { proficiencyLevels } from "@/sections/ai/prompt-engineering/lib/courseData";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useTitle } from "@/lib/useTitle";

const levelGradients = [
  { from: "#E8E0D4", to: "#F0EBE3", accent: "#6B6560", bar: "#A09B93" },
  { from: "#D4E8DC", to: "#E8F4EC", accent: "#5A7E66", bar: "#7B9E87" },
  { from: "#E8E0C8", to: "#F0EBD8", accent: "#9E8A3A", bar: "#C4A35A" },
  { from: "#E8D0C4", to: "#F4E8E0", accent: "#C75B39", bar: "#C75B39" },
  { from: "#D4C8E8", to: "#E8E0F4", accent: "#785AA0", bar: "#785AA0" },
  { from: "#E8C0D0", to: "#F4D8E4", accent: "#B44664", bar: "#B44664" },
];

export default function FrameworkPage() {
  useTitle("Proficiency Framework");
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D2A26 0%, #3D3530 50%, #4A3F38 100%)" }} />
        <div className="container relative z-10 py-14 md:py-18">
          <span className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#C4A35A", fontFamily: "'Source Sans 3', sans-serif" }}>
            Measure Your Growth
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}>
            Proficiency Framework
          </h1>
          <p className="text-base md:text-lg"
            style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "520px" }}>
            Six levels from AI Unaware (L0) to AI Native (L5). Each level builds on the previous,
            adding new tenet mastery and capabilities.
          </p>
        </div>
      </section>

      {/* Progress Bar Overview */}
      <section className="border-b" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
        <div className="container py-6">
          <div className="flex items-center gap-1">
            {proficiencyLevels.map((level, i) => (
              <div key={level.level} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full h-2 rounded-full" style={{ background: levelGradients[i].bar, opacity: 0.3 + (i * 0.14) }} />
                <span className="text-[10px] font-bold" style={{ color: levelGradients[i].accent }}>L{level.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level Cards */}
      <div className="container py-12">
        <div className="space-y-6">
          {proficiencyLevels.map((level, i) => (
            <div key={level.level} className="rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
              <div className="p-5 flex items-center gap-4" style={{
                background: `linear-gradient(135deg, ${levelGradients[i].from}, ${levelGradients[i].to})`,
              }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.5)", border: `2px solid ${levelGradients[i].accent}` }}>
                  <span className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: levelGradients[i].accent }}>L{level.level}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>{level.title}</h2>
                  <p className="text-xs font-medium" style={{ color: levelGradients[i].accent }}>Tenet Mastery: {level.tenetMastery}</p>
                </div>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ background: "#FDFBF7" }}>
                <div>
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: levelGradients[i].accent }}>Capabilities</h3>
                  <ul className="space-y-2">
                    {level.capabilities.map((cap, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#3A3530" }}>
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: levelGradients[i].accent }} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "#6B6560" }}>Observable Indicators</h3>
                  <ul className="space-y-2">
                    {level.indicators.map((ind, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#5A5550" }}>
                        <Circle className="w-3 h-3 mt-1 shrink-0" style={{ color: "#8A8580" }} />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-xl" style={{ background: "#F0EBE3" }}>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>Ready to Level Up?</h2>
          <p className="text-sm mb-6 mx-auto" style={{ color: "#5A5550", maxWidth: "420px" }}>
            Start with the modules to build your foundation, then practice with exercises to solidify each level.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/modules/1" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline"
              style={{ background: "#C75B39", color: "#FAF7F2" }}>
              Start Module 1 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/exercises" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline"
              style={{ background: "rgba(90,126,102,0.12)", color: "#5A7E66", border: "1px solid rgba(90,126,102,0.25)" }}>
              Browse Exercises
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
