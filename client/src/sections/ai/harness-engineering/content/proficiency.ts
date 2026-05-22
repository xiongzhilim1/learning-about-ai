export type ProficiencyLevel = {
  level: "L0" | "L1" | "L2" | "L3" | "L4" | "L5";
  name: string;
  oneLiner: string;
  description: string;
  observableIndicators: string[];
  tenetMastery: { tenetId: string; behavior: string }[];
};

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  {
    level: "L0",
    name: "Awareness",
    oneLiner: "Knows there is a difference between model and harness.",
    description:
      "L0 marks the moment of recognition. The practitioner stops blaming the model for every failure and starts asking, 'is this a configuration problem?' They cannot yet engineer a harness, but they read AGENTS.md files and tool specs with new eyes.",
    observableIndicators: [
      "Uses the words 'harness', 'context', and 'tool' as distinct concepts.",
      "Can explain the equation Agent = LLM + Harness.",
      "Suspects the harness, not the model, when an agent misbehaves.",
    ],
    tenetMastery: [
      { tenetId: "harness-is-artifact", behavior: "Recognizes the harness as the engineering surface." },
    ],
  },
  {
    level: "L1",
    name: "Foundation",
    oneLiner: "Writes effective AGENTS.md and basic hooks.",
    description:
      "At L1 the practitioner makes their first ratcheted rules and small hooks. The harness is still mostly handwritten, but it traces every rule to a real incident. They begin to feel the impact of progressive disclosure.",
    observableIndicators: [
      "Maintains an AGENTS.md with annotated, incident-tied rules.",
      "Writes pre-tool hooks for at least one destructive command.",
      "Splits rules into a small boot file plus on-demand domain docs.",
    ],
    tenetMastery: [
      { tenetId: "harness-is-artifact", behavior: "Treats the harness as the artifact, not the prompt." },
      { tenetId: "the-ratchet", behavior: "Adds rules in response to actual incidents and annotates them." },
    ],
  },
  {
    level: "L2",
    name: "Practitioner",
    oneLiner: "Closes the cybernetic loop with feedforward and feedback.",
    description:
      "L2 practitioners design feedback sensors that run in seconds. They no longer rely on the agent's self-judgment for routine work. Verification is fast, deterministic, and verbose only on failure.",
    observableIndicators: [
      "Has a post-tool hook chain that runs typecheck, tests, and lint.",
      "Can explain when to use a computational check vs. an LLM judge.",
      "Reduces context size aggressively when sessions grow long.",
    ],
    tenetMastery: [
      { tenetId: "cybernetic-loop", behavior: "Designs both feedforward and feedback regulators in the loop." },
      { tenetId: "context-budget", behavior: "Treats context as a budget; offloads and compacts." },
    ],
  },
  {
    level: "L3",
    name: "Architect",
    oneLiner: "Designs harnesses for multi-hour autonomous tasks.",
    description:
      "L3 practitioners externalize state into JSON, use git as durable memory, and design phase boundaries that allow full context resets. Their agents survive restarts and resume cleanly.",
    observableIndicators: [
      "Maintains a feature_list.json (or equivalent) as the canonical progress record.",
      "Has a working rehydrate() that lets a fresh agent resume from durable state.",
      "Detects context anxiety and intervenes before the agent prematurely wraps up.",
    ],
    tenetMastery: [
      { tenetId: "state-externalization", behavior: "Externalizes state so agents survive context wipes." },
      { tenetId: "context-budget", behavior: "Compacts, offloads, and resets without data loss." },
    ],
  },
  {
    level: "L4",
    name: "Multi-Agent Designer",
    oneLiner: "Builds Planner / Generator / Evaluator pipelines.",
    description:
      "L4 practitioners separate generation from evaluation. They negotiate sprint contracts before code is written. They run Evaluators in fresh contexts to break sycophancy. Their agents catch their own mistakes inside the loop.",
    observableIndicators: [
      "Runs Planner, Generator, and Evaluator as separate processes with separate prompts.",
      "Uses sprint contracts as the long-term record of what 'done' meant.",
      "Persists Evaluator rejections back into Generator context as structured feedback.",
    ],
    tenetMastery: [
      { tenetId: "separation-of-concerns", behavior: "Never lets the agent grade its own work on complex tasks." },
      { tenetId: "cybernetic-loop", behavior: "Uses the Evaluator as the highest-fidelity feedback sensor." },
    ],
  },
  {
    level: "L5",
    name: "Systems Thinker",
    oneLiner: "Treats the harness as a living production system.",
    description:
      "L5 practitioners ship autonomous agents to production. Their harness has sandboxes, audit logs, traces, metrics, and human-in-the-loop escalation via tool calls. They prune obsolete rules as models improve. The harness co-evolves with the model frontier.",
    observableIndicators: [
      "Sandboxes agent execution with read-only mounts, dropped capabilities, no implicit network.",
      "Escalates sensitive actions via request_human_approval tool calls, never via chat.",
      "Instruments the harness with traces, metrics, and audit logs.",
      "Removes constraints when newer models no longer need them.",
    ],
    tenetMastery: [
      { tenetId: "safe-autonomy", behavior: "Bounds blast radius structurally, not by prompt." },
      { tenetId: "the-ratchet", behavior: "Ratchets in both directions — adds and removes rules with intent." },
      { tenetId: "harness-is-artifact", behavior: "Treats the harness as a versioned, observable production service." },
    ],
  },
];
