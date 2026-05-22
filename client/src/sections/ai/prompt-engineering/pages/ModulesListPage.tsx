/*
 * ModulesListPage — Overview of all 8 modules as cards
 * Provides a visual map of the entire learning journey
 */

import { modules } from "@/sections/ai/prompt-engineering/lib/courseData";
import { Link } from "wouter";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { useTitle } from "@/lib/useTitle";

const moduleAccents = [
  "#C75B39", "#5A7E66", "#9E8A3A", "#785AA0",
  "#C75B39", "#B44664", "#5A7E66", "#9E8A3A",
];

export default function ModulesListPage() {
  useTitle("Course Modules");
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D2A26 0%, #3D3530 50%, #4A3F38 100%)" }} />
        <div className="container relative z-10 py-14 md:py-18">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#F5C4A1", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            8 Modules · Progressive Learning
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
          >
            Course Modules
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "520px" }}
          >
            A structured learning path from AI fundamentals to advanced prompt engineering.
            Each module builds on the previous, progressively introducing the 5 Core Tenets.
          </p>
        </div>
      </section>

      {/* Learning Path Visual */}
      <section className="py-4 border-b" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-thin">
            {modules.map((mod, i) => (
              <div key={mod.id} className="flex items-center gap-2 shrink-0">
                <Link href={`/modules/${mod.id}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold no-underline transition-all hover:scale-[1.02] shrink-0"
                  style={{
                    background: `${moduleAccents[i]}10`,
                    color: moduleAccents[i],
                    border: `1px solid ${moduleAccents[i]}22`,
                    fontFamily: "'Source Sans 3', sans-serif",
                    whiteSpace: "nowrap",
                  }}>
                  <span className="w-5 h-5 rounded inline-flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: moduleAccents[i], color: "#FAF7F2" }}>
                    {mod.id}
                  </span>
                  {mod.title}
                </Link>
                {i < modules.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: "#8A8580" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Cards Grid */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((mod, i) => (
            <div key={mod.id}>
              <Link href={`/modules/${mod.id}`} className="block no-underline">
                <div className="rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                  style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                  <div className="p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${moduleAccents[i]}12`, border: `2px solid ${moduleAccents[i]}33` }}>
                      <span className="text-lg font-bold" style={{ fontFamily: "'Fraunces', serif", color: moduleAccents[i] }}>
                        {mod.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                          style={{ background: `${moduleAccents[i]}10`, color: moduleAccents[i], fontFamily: "'Source Sans 3', sans-serif" }}>
                          Module {mod.id}
                        </span>
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: "#6B6560", fontFamily: "'Source Sans 3', sans-serif" }}>
                          <Clock className="w-3 h-3" /> {mod.duration}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(90,126,102,0.10)", color: "#5A7E66", fontFamily: "'Source Sans 3', sans-serif" }}>
                          {mod.targetLevel}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
                        {mod.title}
                      </h3>
                      <p className="text-xs italic mb-2" style={{ fontFamily: "'Fraunces', serif", color: moduleAccents[i] }}>
                        {mod.subtitle}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}>
                        {mod.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t flex items-center justify-between" style={{ background: "#F5F0E8", borderColor: "#E8E0D4" }}>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6B6560", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <BookOpen className="w-3.5 h-3.5" />
                      {mod.content.length} lessons · {mod.topics.length} topics
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: moduleAccents[i], fontFamily: "'Source Sans 3', sans-serif" }}>
                      Start Module <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
