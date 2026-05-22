/*
 * ModulePage — Individual module content view
 * Displays module content sections, examples, tips, and navigation between modules
 */
import { useParams, Link } from "wouter";
import { modules, tenets } from "@/sections/ai/prompt-engineering/lib/courseData";
import { useTitle } from "@/lib/useTitle";
import { ArrowLeft, ArrowRight, Clock, Lightbulb, BookOpen, Code, Target } from "lucide-react";

function getSectionIcon(type: string) {
  switch (type) {
    case "example": return <Code className="w-4 h-4" />;
    case "tip": return <Lightbulb className="w-4 h-4" />;
    case "exercise-preview": return <Target className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
}

function getSectionLabel(type: string) {
  switch (type) {
    case "example": return "Example";
    case "tip": return "Pro Tip";
    case "exercise-preview": return "Exercise Preview";
    default: return "Lesson";
  }
}

export default function ModulePage() {
  const params = useParams<{ id: string }>();
  const moduleId = parseInt(params.id || "1", 10);
  const mod = modules.find((m) => m.id === moduleId);
  useTitle(mod ? `Module ${mod.id}: ${mod.title}` : "Module Not Found");
  const prevMod = modules.find((m) => m.id === moduleId - 1);
  const nextMod = modules.find((m) => m.id === moduleId + 1);

  if (!mod) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Module Not Found</h1>
        <Link href="/" className="text-sm underline" style={{ color: "#C75B39" }}>Return home</Link>
      </div>
    );
  }

  const relatedTenets = tenets.filter((t) => mod.tenetIds.includes(t.id));

  return (
    <div>
      {/* Module Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D2A26 0%, #3D3530 50%, #4A3F38 100%)" }} />
        <div className="container relative z-10 py-14 md:py-18">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md"
              style={{ background: "rgba(199,91,57,0.25)", color: "#F5C4A1", fontFamily: "'Source Sans 3', sans-serif" }}>
              Module {mod.id} of {modules.length}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "#A09B93", fontFamily: "'Source Sans 3', sans-serif" }}>
              <Clock className="w-3.5 h-3.5" /> {mod.duration}
            </span>
            <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(123,158,135,0.2)", color: "#A8D5B8", fontFamily: "'Source Sans 3', sans-serif" }}>
              {mod.targetLevel}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}>
            {mod.title}
          </h1>
          <p className="text-lg" style={{ fontFamily: "'Fraunces', serif", color: "#F5C4A1", fontStyle: "italic" }}>
            {mod.subtitle}
          </p>
        </div>
      </section>

      {/* Module Navigation Sidebar + Content */}
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-36 space-y-4">
              <div className="p-5 rounded-xl border" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "#C75B39", fontFamily: "'Source Sans 3', sans-serif" }}>Overview</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A453E", fontFamily: "'Source Sans 3', sans-serif" }}>{mod.description}</p>
                {relatedTenets.length > 0 && (
                  <>
                    <h4 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#6B6560" }}>Related Tenets</h4>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {relatedTenets.map((t) => (
                        <Link key={t.id} href="/tenets" className="text-xs px-2 py-1 rounded-md no-underline"
                          style={{ background: "rgba(199,91,57,0.08)", color: "#C75B39" }}>
                          {t.icon} {t.shortName}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
                <h4 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#6B6560" }}>Topics</h4>
                <ul className="space-y-1.5">
                  {mod.topics.map((topic, i) => (
                    <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: "#4A453E" }}>
                      <span style={{ color: "#C75B39" }}>•</span> {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                <h4 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "#6B6560" }}>All Modules</h4>
                <div className="space-y-1">
                  {modules.map((m) => (
                    <Link key={m.id} href={`/modules/${m.id}`}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs no-underline transition-all"
                      style={{
                        background: m.id === moduleId ? "rgba(199,91,57,0.08)" : "transparent",
                        color: m.id === moduleId ? "#C75B39" : "#5A5550",
                        fontWeight: m.id === moduleId ? 600 : 400,
                      }}>
                      <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{
                          background: m.id === moduleId ? "#C75B39" : "#E8E0D4",
                          color: m.id === moduleId ? "#FAF7F2" : "#6B6560",
                        }}>
                        {m.id}
                      </span>
                      {m.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {mod.content.map((section, i) => (
              <div key={i} className="rounded-xl border overflow-hidden" style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}>
                <div className="px-6 py-3 border-b flex items-center gap-2" style={{
                  background: section.type === "tip" ? "rgba(196,163,90,0.06)" : section.type === "example" ? "rgba(199,91,57,0.04)" : "#F5F0E8",
                  borderColor: "#E8E0D4",
                }}>
                  <span style={{ color: section.type === "tip" ? "#9E8A3A" : section.type === "example" ? "#C75B39" : "#6B6560" }}>
                    {getSectionIcon(section.type)}
                  </span>
                  <span className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: section.type === "tip" ? "#9E8A3A" : section.type === "example" ? "#C75B39" : "#6B6560" }}>
                    {getSectionLabel(section.type)}
                  </span>
                </div>
                <div className="px-6 py-5">
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>{section.title}</h3>
                  <div className="text-sm leading-[1.8] whitespace-pre-line" style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif" }}>{section.body}</div>
                  {section.promptExample && (
                    <div className="mt-6 rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
                      {section.promptExample.bad && (
                        <div className="p-4 border-b" style={{ background: "#FEF7F5", borderColor: "#E8E0D4" }}>
                          <span className="text-[10px] font-bold tracking-wider uppercase mb-2 block" style={{ color: "#DC2626" }}>Weak Prompt</span>
                          <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Source Code Pro', monospace", color: "#3A3530" }}>{section.promptExample.bad}</pre>
                        </div>
                      )}
                      <div className="p-4" style={{ background: "#F5FBF7" }}>
                        <span className="text-[10px] font-bold tracking-wider uppercase mb-2 block" style={{ color: "#16A34A" }}>Strong Prompt</span>
                        <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Source Code Pro', monospace", color: "#3A3530" }}>{section.promptExample.good}</pre>
                      </div>
                      {section.promptExample.explanation && (
                        <div className="p-4 border-t" style={{ background: "#F5F0E8", borderColor: "#E8E0D4" }}>
                          <p className="text-xs leading-relaxed" style={{ color: "#4A453E" }}>
                            <strong style={{ color: "#2D2A26" }}>Why it works:</strong> {section.promptExample.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Key Takeaways */}
            <div className="p-6 rounded-xl border" style={{ background: "rgba(90,126,102,0.06)", borderColor: "rgba(90,126,102,0.20)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Fraunces', serif", color: "#5A7E66" }}>Key Takeaways</h3>
              <ul className="space-y-3">
                {mod.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#3A3530" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: "rgba(90,126,102,0.12)", color: "#5A7E66" }}>{i + 1}</span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            {/* Module Navigation */}
            <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "#E8E0D4" }}>
              {prevMod ? (
                <Link href={`/modules/${prevMod.id}`} className="flex items-center gap-2 text-sm font-semibold no-underline" style={{ color: "#5A5550" }}>
                  <ArrowLeft className="w-4 h-4" /> {prevMod.title}
                </Link>
              ) : <div />}
              {nextMod ? (
                <Link href={`/modules/${nextMod.id}`} className="flex items-center gap-2 text-sm font-semibold no-underline" style={{ color: "#C75B39" }}>
                  {nextMod.title} <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link href="/exercises" className="flex items-center gap-2 text-sm font-semibold no-underline" style={{ color: "#C75B39" }}>
                  Start Exercises <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
