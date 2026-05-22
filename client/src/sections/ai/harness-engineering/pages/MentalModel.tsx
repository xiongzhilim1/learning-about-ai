import { useTitle } from "@/lib/useTitle";
import { PageHeader } from "@/sections/ai/harness-engineering/components/Pieces";
import { CORE_EQUATION, HARNESS_COMPONENTS, HarnessComponent } from "@/sections/ai/harness-engineering/content/mentalModel";
import { Brain, Cpu, Layers, ArrowRight, Cog } from "lucide-react";
import { useState } from "react";

const ICONS: Record<HarnessComponent["id"], React.ReactNode> = {
  loop: <Cog className="w-5 h-5" />,
  context: <Brain className="w-5 h-5" />,
  tools: <Cpu className="w-5 h-5" />,
  hooks: <Layers className="w-5 h-5" />,
  state: <Layers className="w-5 h-5" />,
};

export default function MentalModel() {
  useTitle("Mental Model — Harness Engineering");
  const [active, setActive] = useState<HarnessComponent["id"]>("loop");
  const activeComp = HARNESS_COMPONENTS.find((c) => c.id === active)!;

  return (
    <>
      <div className="container py-10">
        <PageHeader
          eyebrow="THE LAY OF THE LAND"
          title="Agent = LLM + Harness"
          description="A mental model for navigating the field. The model is the reasoning engine. The harness is the operating system around it. Mastering harness engineering means understanding the five components that make up that operating system."
        />

        {/* Equation */}
        <div className="rounded-lg border border-border bg-card mb-10">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">core.equation</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-4">canonical</span>
          </div>
          <div className="px-4 py-3">
            <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
              <EquationPart
                label={CORE_EQUATION.agent.label}
                sub={CORE_EQUATION.agent.sub}
                tone="primary"
              />
              <div className="text-2xl text-muted-foreground hidden md:block text-center">=</div>
              <EquationPart label={CORE_EQUATION.llm.label} sub={CORE_EQUATION.llm.sub} tone="muted" />
              <div className="text-2xl text-muted-foreground hidden md:block text-center">+</div>
              <EquationPart
                label={CORE_EQUATION.harness.label}
                sub={CORE_EQUATION.harness.sub}
                tone="accent"
              />
            </div>
            <p
              className="text-sm text-muted-foreground mt-6 max-w-3xl"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The Agent is the complete running system. The LLM is the probabilistic reasoning
              engine — the CPU. The Harness is everything else: the loop that drives the cycle, the
              memory the model sees, the tools it can call, the policy hooks that constrain it, and
              the state that survives between runs. Most agent failures are harness failures.
            </p>
          </div>
        </div>

        {/* Five components — interactive map */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">COMPONENTS · 5</div>
            <div className="space-y-2">
              {HARNESS_COMPONENTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    active === c.id
                      ? "border-primary/60 bg-card"
                      : "border-border bg-card/40 hover:border-primary/30"
                  }`}
                  style={
                    active === c.id
                      ? {
                          boxShadow: `0 0 0 1px ${c.color.replace(")", " / 0.4)")}, 0 4px 16px ${c.color.replace(")", " / 0.15)")}`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: c.color.replace(")", " / 0.12)"),
                        color: c.color,
                        border: `1px solid ${c.color.replace(")", " / 0.3)")}`,
                      }}
                    >
                      {ICONS[c.id]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium leading-none">{c.name}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{c.role}</div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-opacity ${
                        active === c.id ? "opacity-100 text-primary" : "opacity-0"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-border bg-card sticky top-20">
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeComp.color }}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{activeComp.name.toLowerCase()}.spec</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{activeComp.role}</span>
              </div>
              <div className="px-4 py-3">
                <h3
                  className="text-2xl font-semibold tracking-tight mb-1"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {activeComp.name}
                </h3>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">{activeComp.role}</div>
                <p
                  className="text-foreground/85 leading-relaxed mb-6"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {activeComp.description}
                </p>

                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">EXAMPLE</div>
                <pre className="bg-background border border-border rounded-md p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                  <code>{activeComp.example}</code>
                </pre>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-md bg-muted/50 border border-border">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">SHAPES</div>
                    <div>What the LLM sees and can do.</div>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 border border-border">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">CONSTRAINS</div>
                    <div>What the LLM cannot bypass.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual flow */}
        <div className="mt-12 rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">flow.sketch</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-4">one loop iteration</span>
          </div>
          <div className="px-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-7 items-stretch gap-2 text-xs font-mono">
              <FlowStep label="State" sub="rehydrate" color="#b08040" />
              <FlowArrow />
              <FlowStep label="Context" sub="render" color="#3d9970" />
              <FlowArrow />
              <FlowStep label="LLM" sub="reason" color="#4a7ebf" />
              <FlowArrow />
              <FlowStep label="Hook" sub="pre-tool" color="#8b5fbf" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 items-stretch gap-2 text-xs font-mono mt-2">
              <FlowStep label="State" sub="commit" color="#b08040" />
              <FlowArrowReverse />
              <FlowStep label="Context" sub="append" color="#3d9970" />
              <FlowArrowReverse />
              <FlowStep label="Hook" sub="post-tool" color="#8b5fbf" />
              <FlowArrowReverse />
              <FlowStep label="Tool" sub="execute" color="#c49040" />
            </div>
            <p
              className="text-xs text-muted-foreground mt-6 max-w-3xl"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              One loop iteration moves left-to-right on the top row and right-to-left on the
              bottom: the harness rehydrates state, renders context, calls the LLM, runs pre-tool
              hooks, executes the tool, runs post-tool hooks, appends results to context, and
              commits state. Hooks are the only place where deterministic policy lives.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function EquationPart({
  label,
  sub,
  tone,
}: {
  label: string;
  sub: string;
  tone: "primary" | "muted" | "accent";
}) {
  const styles = {
    primary: "border-primary/40 bg-primary/10 text-primary",
    muted: "border-border bg-background/50 text-foreground",
    accent: "border-emerald-600/40 bg-emerald-50 text-emerald-600",
  }[tone];
  return (
    <div className={`p-5 rounded-lg border text-center ${styles}`}>
      <div
        className="text-2xl font-semibold tracking-tight"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {label}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1 opacity-80">{sub}</div>
    </div>
  );
}

function FlowStep({ label, sub, color }: { label: string; sub: string; color: string }) {
  return (
    <div
      className="p-3 rounded-md border text-center"
      style={{
        borderColor: `${color}66`,
        backgroundColor: `${color}14`,
        color,
      }}
    >
      <div className="font-semibold">{label}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 opacity-70">{sub}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-muted-foreground">
      <ArrowRight className="w-4 h-4" />
    </div>
  );
}
function FlowArrowReverse() {
  return (
    <div className="flex items-center justify-center text-muted-foreground rotate-180">
      <ArrowRight className="w-4 h-4" />
    </div>
  );
}
