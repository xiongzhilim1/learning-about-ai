export type HarnessComponent = {
  id: "loop" | "context" | "tools" | "hooks" | "state";
  name: string;
  role: string;
  description: string;
  example: string;
  color: string;
};

export const HARNESS_COMPONENTS: HarnessComponent[] = [
  {
    id: "loop",
    name: "Loop",
    role: "The Engine",
    description:
      "The control flow that drives the agent through observe → reason → act → evaluate cycles. The Loop decides when to call the LLM, when to invoke a tool, when to retry, and when to stop.",
    example:
      "while not done(goal): plan = llm.invoke(context); result = tools.execute(plan); context.append(result)",
    color: "oklch(0.65 0.15 250)",
  },
  {
    id: "context",
    name: "Context",
    role: "Working Memory",
    description:
      "The dynamic window of information visible to the LLM on each turn. The harness manages it as a budget — injecting AGENTS.md on boot, compacting old turns, offloading large outputs to disk.",
    example: "context.budget=100k; context.utilization=27%; offload(large_output, '/runs/42.log')",
    color: "oklch(0.65 0.14 160)",
  },
  {
    id: "tools",
    name: "Tools",
    role: "The Hands",
    description:
      "The capabilities the agent can invoke — bash, file_read, http_get, db_query, request_human_approval. The harness defines the registry, the schemas, and the allow-list.",
    example: 'registry.allow(["read_file", "write_file", "bash_safe"])',
    color: "oklch(0.72 0.16 70)",
  },
  {
    id: "hooks",
    name: "Hooks",
    role: "Guardrails",
    description:
      "Interception points in the loop. Pre-tool hooks enforce policy (block --force pushes, redact secrets). Post-tool hooks validate output (typecheck, lint, schema match) and feed errors back into context.",
    example: "before(tool): block_destructive(); after(tool): typecheck() || inject_error()",
    color: "oklch(0.62 0.18 295)",
  },
  {
    id: "state",
    name: "State",
    role: "Long-Term Memory",
    description:
      "Durable artifacts outside the context window. feature_list.json, git history, audit logs — the records that survive a context wipe and let a fresh agent resume work seamlessly.",
    example: 'state.write("feature_list.json", { features }); git.commit("feat: pagination")',
    color: "oklch(0.68 0.16 50)",
  },
];

export const CORE_EQUATION = {
  agent: {
    label: "Agent",
    sub: "The complete running system",
  },
  llm: {
    label: "LLM",
    sub: "Reasoning engine (CPU)",
  },
  harness: {
    label: "Harness",
    sub: "OS, peripherals, sandbox",
  },
};
