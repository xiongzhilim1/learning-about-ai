/*
 * ExercisesPage — Browse and explore all exercises
 * Filterable by tenet and difficulty, with expandable exercise cards
 */
import { useState } from "react";
import { exercises, tenets } from "@/sections/ai/prompt-engineering/lib/courseData";
import { useTitle } from "@/lib/useTitle";
import { ChevronDown, ChevronUp, Target, ListChecks, Sparkles } from "lucide-react";

const difficultyColors: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "rgba(123,158,135,0.1)", text: "#5A7E66" },
  intermediate: { bg: "rgba(196,163,90,0.1)", text: "#9E8A3A" },
  advanced: { bg: "rgba(199,91,57,0.1)", text: "#C75B39" },
  capstone: { bg: "rgba(120,90,160,0.1)", text: "#785AA0" },
};

const tenetColors: Record<number, { bg: string; text: string }> = {
  1: { bg: "rgba(199,91,57,0.08)", text: "#C75B39" },
  2: { bg: "rgba(123,158,135,0.08)", text: "#5A7E66" },
  3: { bg: "rgba(196,163,90,0.08)", text: "#9E8A3A" },
  4: { bg: "rgba(120,90,160,0.08)", text: "#785AA0" },
  5: { bg: "rgba(180,70,100,0.08)", text: "#B44664" },
};

export default function ExercisesPage() {
  useTitle("Exercise Library");
  const [filterTenet, setFilterTenet] = useState<number | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = exercises.filter((ex) => {
    if (filterTenet && ex.tenetId !== filterTenet) return false;
    if (filterDifficulty && ex.difficulty !== filterDifficulty) return false;
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D2A26 0%, #3D3530 50%, #4A3F38 100%)" }} />
        <div className="container relative z-10 py-14 md:py-18">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#A8D5B8", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Hands-On Practice
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
          >
            Exercise Library
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "520px" }}
          >
            Progressive exercises for each Core Tenet. Start with beginner drills and work up to
            advanced capstone projects that combine all five tenets.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Tenet Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: "#6B6560", fontFamily: "'Source Sans 3', sans-serif" }}>Tenet:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setFilterTenet(null)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                  style={{
                    background: filterTenet === null ? "#2D2A26" : "#F0EBE3",
                    color: filterTenet === null ? "#FAF7F2" : "#5A5550",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  All
                </button>
                {tenets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFilterTenet(t.id === filterTenet ? null : t.id)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                    style={{
                      background: filterTenet === t.id ? tenetColors[t.id].bg : "#F0EBE3",
                      color: filterTenet === t.id ? tenetColors[t.id].text : "#5A5550",
                      fontFamily: "'Source Sans 3', sans-serif",
                      border: filterTenet === t.id ? `1px solid ${tenetColors[t.id].text}33` : "1px solid transparent",
                    }}
                  >
                    {t.icon} {t.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: "#6B6560", fontFamily: "'Source Sans 3', sans-serif" }}>Level:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setFilterDifficulty(null)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                  style={{
                    background: filterDifficulty === null ? "#2D2A26" : "#F0EBE3",
                    color: filterDifficulty === null ? "#FAF7F2" : "#5A5550",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  All
                </button>
                {["beginner", "intermediate", "advanced"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDifficulty(d === filterDifficulty ? null : d)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all"
                    style={{
                      background: filterDifficulty === d ? difficultyColors[d].bg : "#F0EBE3",
                      color: filterDifficulty === d ? difficultyColors[d].text : "#5A5550",
                      fontFamily: "'Source Sans 3', sans-serif",
                      border: filterDifficulty === d ? `1px solid ${difficultyColors[d].text}33` : "1px solid transparent",
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise List */}
      <div className="container py-10">
        <div className="mb-4 text-sm" style={{ color: "#6B6560", fontFamily: "'Source Sans 3', sans-serif" }}>
          Showing {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
        </div>

        <div className="space-y-4">
          {filtered.map((ex) => {
            const tenet = tenets.find((t) => t.id === ex.tenetId);
            const isExpanded = expandedId === ex.id;

            return (
              <div
                key={ex.id}
                className="rounded-xl border overflow-hidden"
                style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}
              >
                {/* Exercise Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  className="w-full p-5 flex items-start justify-between text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded capitalize"
                        style={{
                          background: difficultyColors[ex.difficulty].bg,
                          color: difficultyColors[ex.difficulty].text,
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}>
                        {ex.difficulty}
                      </span>
                      {tenet && (
                        <span className="text-xs px-2 py-0.5 rounded"
                          style={{
                            background: tenetColors[tenet.id].bg,
                            color: tenetColors[tenet.id].text,
                            fontFamily: "'Source Sans 3', sans-serif",
                          }}>
                          {tenet.icon} {tenet.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
                      {ex.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {ex.description}
                    </p>
                  </div>
                  <div className="ml-4 mt-1 shrink-0" style={{ color: "#6B6560" }}>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t pt-5" style={{ borderColor: "#E8E0D4" }}>
                    {/* Scenario */}
                    <div className="mb-5 p-4 rounded-lg" style={{ background: "#F5F0E8", borderLeft: "3px solid #C75B39" }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Target className="w-3.5 h-3.5" style={{ color: "#C75B39" }} />
                        <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#C75B39", fontFamily: "'Source Sans 3', sans-serif" }}>
                          Scenario
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif" }}>
                        {ex.scenario}
                      </p>
                    </div>

                    {/* Instructions */}
                    <div className="mb-5">
                      <div className="flex items-center gap-1.5 mb-3">
                        <ListChecks className="w-3.5 h-3.5" style={{ color: "#5A7E66" }} />
                        <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#5A7E66", fontFamily: "'Source Sans 3', sans-serif" }}>
                          Instructions
                        </span>
                      </div>
                      <ol className="space-y-2">
                        {ex.instructions.map((inst, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif" }}>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                              style={{ background: "rgba(90,126,102,0.12)", color: "#5A7E66" }}>
                              {j + 1}
                            </span>
                            {inst}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expected Outcome */}
                    <div className="p-4 rounded-lg" style={{ background: "rgba(90,126,102,0.06)", border: "1px solid rgba(90,126,102,0.15)" }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: "#5A7E66" }} />
                        <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#5A7E66", fontFamily: "'Source Sans 3', sans-serif" }}>
                          Expected Outcome
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif" }}>
                        {ex.expectedOutcome}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "#6B6560", fontFamily: "'Source Sans 3', sans-serif" }}>
              No exercises match the current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
