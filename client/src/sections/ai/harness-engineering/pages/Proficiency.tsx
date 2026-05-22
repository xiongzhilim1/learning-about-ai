import { PageHeader, TenetChip } from "@/sections/ai/harness-engineering/components/Pieces";
import { Button } from "@/components/ui/button";
import { PROFICIENCY_LEVELS, ProficiencyLevel } from "@/sections/ai/harness-engineering/content/proficiency";
import { CheckCircle2, Compass, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTitle } from "@/lib/useTitle";

const LEVEL_COLORS: Record<string, string> = {
  L0: "#5A7E66",
  L1: "#4A8B6E",
  L2: "#3D7A8A",
  L3: "#8B7355",
  L4: "#7B6B8A",
  L5: "#C75B39",
};

export default function Proficiency() {
  useTitle("Proficiency — Harness Engineering");
  const [myLevel, setMyLevel] = useState<string>("L0");

  return (
    <>
      <div className="container py-10">
        <PageHeader
          eyebrow="THE L0 — L5 FRAMEWORK"
          title="Proficiency Self-Assessment"
          description="Six observable bands of harness engineering competency. Each level defines what a practitioner does — not what they know. Find your current band, then read the next one as a roadmap."
        />

        <div className="space-y-4">
          {PROFICIENCY_LEVELS.map((level) => (
            <LevelCard
              key={level.level}
              level={level}
              isMine={myLevel === level.level}
              onSetMine={() => setMyLevel(level.level)}
            />
          ))}
        </div>

        <div className="mt-10 p-5 rounded-lg border border-border" style={{ background: "rgba(90,126,102,0.04)" }}>
          <div className="flex gap-3 items-start">
            <Compass className="w-5 h-5 mt-0.5" style={{ color: "#5A7E66" }} />
            <div>
              <div className="font-medium mb-1" style={{ fontFamily: "'Fraunces', serif" }}>How to use this framework</div>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Self-assessment is most useful as a self-check, not a credential. Read your
                current band carefully — every observable indicator should be true of your
                day-to-day practice. Then read the next band as a list of behaviors to adopt next.
                Move up only when the new behaviors are habitual, not aspirational.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LevelCard({
  level,
  isMine,
  onSetMine,
}: {
  level: ProficiencyLevel;
  isMine: boolean;
  onSetMine: () => void;
}) {
  const color = LEVEL_COLORS[level.level] || "#5A7E66";

  return (
    <div
      className="group rounded-lg border p-5 md:p-6 transition-colors bg-card"
      style={{
        borderColor: isMine ? color : "var(--border)",
        boxShadow: isMine ? `0 0 0 1px ${color}40` : undefined,
      }}
    >
      <div className="flex items-start gap-4 flex-wrap">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center font-mono text-xl font-semibold"
          style={{
            backgroundColor: `${color}15`,
            color,
            border: `1px solid ${color}40`,
          }}
        >
          {level.level}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>{level.name}</h2>
            {isMine && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded" style={{ background: `${color}15`, color, border: `1px solid ${color}40` }}>
                <Sparkles className="w-3 h-3" /> YOUR LEVEL
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1 italic" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{level.oneLiner}</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className={isMine ? "border-emerald-600/40 text-emerald-700" : "opacity-0 group-hover:opacity-100 transition-opacity"}
          onClick={onSetMine}
        >
          {isMine ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Your level
            </>
          ) : (
            "Set as my level"
          )}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mt-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{level.description}</p>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">OBSERVABLE INDICATORS</div>
          <ul className="space-y-1.5">
            {level.observableIndicators.map((ind, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/85" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color }} />
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">TENET MASTERY</div>
          <ul className="space-y-2.5">
            {level.tenetMastery.map((tm, i) => (
              <li key={i}>
                <TenetChip tenetId={tm.tenetId} size="md" />
                <p className="text-xs text-muted-foreground mt-1.5 ml-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{tm.behavior}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
