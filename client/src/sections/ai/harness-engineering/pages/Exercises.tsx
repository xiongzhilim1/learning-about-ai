import { useTitle } from "@/lib/useTitle";
import { CompletionDot, PageHeader, TenetChip } from "@/sections/ai/harness-engineering/components/Pieces";
import { EXERCISES } from "@/sections/ai/harness-engineering/content/exercises";
import {
  Eye,
  FlaskConical,
  ListChecks,
  RotateCw,
  Target,
  Wrench,
} from "lucide-react";
import { useState } from "react";

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-600 border-emerald-600/30",
  Intermediate: "bg-amber-50 text-amber-600 border-amber-600/30",
  Advanced: "bg-rose-50 text-rose-600 border-rose-600/30",
};

export default function Exercises() {
  useTitle("Exercises — Harness Engineering");
  const [openSlug, setOpenSlug] = useState<string | null>(EXERCISES[0]?.slug ?? null);

  return (
    <>
      <div className="container py-10">
        <PageHeader
          eyebrow="HANDS-ON · BUILD A HARNESS"
          title="Interactive Exercises"
          description="Five scenario-based challenges in the build-a-harness format: observe a failure, apply the ratchet, verify the fix. Each exercise gives you a concrete five-step path from broken to engineered."
        />

        <div className="space-y-3">
          {EXERCISES.map((ex) => {
            const open = openSlug === ex.slug;
            const done = false;
            return (
              <div
                key={ex.slug}
                className={`rounded-lg border border-border bg-card transition-all ${
                  done ? "border-emerald-600/40" : open ? "border-primary/50" : ""
                }`}
              >
                <button
                  onClick={() => setOpenSlug(open ? null : ex.slug)}
                  className="w-full text-left p-5 flex items-start gap-4"
                >
                  <CompletionDot complete={done} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-xs text-muted-foreground">
                        EXERCISE {String(ex.number).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                          DIFFICULTY_STYLES[ex.difficulty]
                        }`}
                      >
                        {ex.difficulty.toUpperCase()}
                      </span>
                      {ex.tenetIds.map((id) => (
                        <TenetChip key={id} tenetId={id} />
                      ))}
                    </div>
                    <h2
                      className="text-xl font-semibold tracking-tight"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {ex.title}
                    </h2>
                    <p
                      className="text-sm text-muted-foreground mt-1 line-clamp-2"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {ex.scenario}
                    </p>
                  </div>
                  <div
                    className={`p-1 rounded transition-transform ${open ? "rotate-90" : ""}`}
                  >
                    <RotateCw className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>

                {open && (
                  <div className="border-t border-border p-5 space-y-5">
                    <div className="text-sm leading-relaxed text-foreground/85">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">SCENARIO</span>
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{ex.scenario}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <ExBlock
                        icon={<Eye className="w-3.5 h-3.5" />}
                        title="STEP 1 · OBSERVE"
                        body={ex.observe}
                      />
                      <ExBlock
                        icon={<Wrench className="w-3.5 h-3.5" />}
                        title="STEP 2 · APPLY THE RATCHET"
                        body={ex.applyRatchet}
                      />
                    </div>

                    <div className="rounded-lg border border-primary/30 bg-card">
                      <div className="px-4 py-3 border-b border-border bg-primary/10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 text-primary">
                          <ListChecks className="w-3.5 h-3.5" />
                          STEP 3 · INSTRUCTIONS
                        </span>
                      </div>
                      <ol className="px-4 py-3 space-y-2.5">
                        {ex.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="font-mono text-primary text-xs mt-0.5">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className="text-foreground/85"
                              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                            >
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <ExBlock
                      icon={<Target className="w-3.5 h-3.5" />}
                      title="EXPECTED OUTCOME"
                      body={ex.expectedOutcome}
                      tone="success"
                    />

                    <ExBlock
                      icon={<FlaskConical className="w-3.5 h-3.5" />}
                      title="REFLECTION"
                      body={ex.reflection}
                      tone="muted"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ExBlock({
  icon,
  title,
  body,
  tone = "default",
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone?: "default" | "success" | "muted";
}) {
  const styles = {
    default: "border-border bg-card",
    success: "border-emerald-600/30 bg-emerald-50/50",
    muted: "border-border bg-background/40",
  }[tone];
  return (
    <div className={`rounded-lg border p-4 ${styles}`}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5 mb-2">
        {icon}
        {title}
      </div>
      <p
        className="text-sm text-foreground/85 leading-relaxed"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {body}
      </p>
    </div>
  );
}
