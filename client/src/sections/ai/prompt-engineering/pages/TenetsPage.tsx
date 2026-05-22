/*
 * TenetsPage — Deep dive into the 5 Core Tenets
 * Each tenet gets a full section with definition, examples, best practices
 */
import { tenets } from "@/sections/ai/prompt-engineering/lib/courseData";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTitle } from "@/lib/useTitle";

const tenetAccents = [
  { bg: "rgba(199, 91, 57, 0.08)", border: "rgba(199, 91, 57, 0.20)", accent: "#C75B39" },
  { bg: "rgba(123, 158, 135, 0.08)", border: "rgba(123, 158, 135, 0.20)", accent: "#5A7E66" },
  { bg: "rgba(196, 163, 90, 0.08)", border: "rgba(196, 163, 90, 0.20)", accent: "#8A7530" },
  { bg: "rgba(120, 90, 160, 0.08)", border: "rgba(120, 90, 160, 0.20)", accent: "#6B4D96" },
  { bg: "rgba(180, 70, 100, 0.08)", border: "rgba(180, 70, 100, 0.20)", accent: "#A33D5C" },
];

export default function TenetsPage() {
  useTitle("5 Core Tenets");
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D2A26 0%, #3D3530 50%, #4A3F38 100%)" }} />
        <div className="container relative z-10 py-16 md:py-20">
          <span className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#F5C4A1", fontFamily: "'Source Sans 3', sans-serif" }}>
            The Foundation
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}>
            The 5 Core Tenets
          </h1>
          <p className="text-base md:text-lg"
            style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "560px" }}>
            Drawn from "The Prompt Report" (Schulhoff et al., 2024), these five meta-categories
            form the backbone of effective prompt engineering. Every technique maps to one or more of these tenets.
          </p>
        </div>
      </section>

      {/* Tenet Navigation */}
      <section className="border-b sticky top-16 z-40" style={{ background: "rgba(253,251,247,0.95)", backdropFilter: "blur(12px)", borderColor: "#E8E0D4" }}>
        <div className="container py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tenets.map((t, i) => (
              <a
                key={t.id}
                href={`#tenet-${t.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold no-underline transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: tenetAccents[i].bg,
                  border: `1px solid ${tenetAccents[i].border}`,
                  color: tenetAccents[i].accent,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <span>{t.icon}</span> {t.shortName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tenet Sections */}
      <div className="container py-12">
        {tenets.map((tenet, i) => (
          <section key={tenet.id} id={`tenet-${tenet.id}`} className="mb-16 last:mb-0 scroll-mt-36">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: tenetAccents[i].bg, border: `1px solid ${tenetAccents[i].border}` }}>
                {tenet.icon}
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded"
                  style={{ background: tenetAccents[i].bg, color: tenetAccents[i].accent, fontFamily: "'Source Sans 3', sans-serif" }}>
                  Tenet {tenet.id}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-1" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
                  {tenet.name}
                </h2>
              </div>
            </div>

            <div className="p-5 rounded-xl mb-6" style={{ background: tenetAccents[i].bg, borderLeft: `3px solid ${tenetAccents[i].accent}` }}>
              <p className="text-sm leading-relaxed" style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif" }}>
                <strong>Definition:</strong> {tenet.definition}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl border" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                <h3 className="text-sm font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", color: tenetAccents[i].accent }}>Key Question</h3>
                <p className="text-lg font-semibold italic mb-4" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>"{tenet.keyQuestion}"</p>
                <h3 className="text-sm font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", color: tenetAccents[i].accent }}>When to Use</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4A453E", fontFamily: "'Source Sans 3', sans-serif" }}>{tenet.whenToUse}</p>
              </div>
              <div className="p-5 rounded-xl border" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: tenetAccents[i].accent }}>Best Practices</h3>
                <ul className="space-y-2">
                  {tenet.bestPractices.map((bp, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tenetAccents[i].accent }} />
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>Trigger Phrases</h3>
              <div className="flex flex-wrap gap-2">
                {tenet.triggerPhrases.map((phrase, j) => (
                  <span key={j} className="px-3 py-1.5 rounded-lg text-xs"
                    style={{ background: "#F5F0E8", border: "1px solid #E8E0D4", color: "#3A3530", fontFamily: "'Source Code Pro', monospace" }}>
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
              <div className="p-4 border-b" style={{ background: "#F0EBE3", borderColor: "#E8E0D4" }}>
                <h3 className="text-sm font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>Example: Before & After</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 border-b md:border-b-0 md:border-r" style={{ background: "#FEF7F5", borderColor: "#E8E0D4" }}>
                  <span className="text-xs font-bold tracking-wider uppercase mb-2 block" style={{ color: "#DC2626" }}>Without {tenet.shortName}</span>
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Source Code Pro', monospace", color: "#3A3530" }}>{tenet.example.bad}</pre>
                </div>
                <div className="p-5" style={{ background: "#F5FBF7" }}>
                  <span className="text-xs font-bold tracking-wider uppercase mb-2 block" style={{ color: "#16A34A" }}>With {tenet.shortName}</span>
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Source Code Pro', monospace", color: "#3A3530" }}>{tenet.example.good}</pre>
                </div>
              </div>
              <div className="p-4 border-t" style={{ background: "#F5F0E8", borderColor: "#E8E0D4" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#4A453E" }}>
                  <strong style={{ color: "#2D2A26" }}>Why it works:</strong> {tenet.example.explanation}
                </p>
              </div>
            </div>

            {i < tenets.length - 1 && <div className="mt-12 border-b" style={{ borderColor: "#E8E0D4" }} />}
          </section>
        ))}
      </div>

      <section className="py-12 border-t" style={{ background: "#F0EBE3", borderColor: "#E8E0D4" }}>
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>Ready to Apply These Tenets?</h2>
          <p className="text-sm mb-6" style={{ color: "#4A453E" }}>Start with Module 1 to build your foundation, or jump straight into the exercises.</p>
          <div className="flex justify-center gap-3">
            <Link href="/modules/1" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline"
              style={{ background: "#C75B39", color: "#FAF7F2" }}>
              Start Module 1 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/exercises" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline"
              style={{ background: "rgba(90,126,102,0.10)", color: "#4A6B55", border: "1px solid rgba(90,126,102,0.25)" }}>
              Browse Exercises
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
