// Centralized catalog of harness-engineering sources, organized by the
// taxonomy used in walkinglabs/awesome-harness-engineering. Every entry has
// a stable `id` so module Further Reading sections can reference these by id
// and stay in sync if a URL or annotation changes.

export type SourceCluster =
  | "foundations"
  | "context-memory"
  | "guardrails"
  | "specs-workflows"
  | "evals-observability"
  | "benchmarks"
  | "runtimes-implementations"
  | "courses";

export type Source = {
  id: string;
  title: string;
  author: string; // canonical attribution preserved exactly
  url: string;
  cluster: SourceCluster;
  annotation: string; // 1-line annotation, taken (or paraphrased) from the awesome-list
  whyItMatters: string; // our editorial commentary on why a learner should read this
  tenetIds?: string[]; // tenets this source most informs
  primary?: boolean; // marks "must-read" sources for a serious learner
};

export const CLUSTER_META: Record<SourceCluster, { title: string; intro: string }> = {
  foundations: {
    title: "Foundations",
    intro:
      "The field-defining articles. If you only read five things, read five from this cluster. They establish the vocabulary (harness, control, agency, runtime), the failure modes (drift, declared victory, context anxiety), and the shape of the discipline.",
  },
  "context-memory": {
    title: "Context, Memory & Working State",
    intro:
      "Context is the working memory of the agent and the most expensive surface in the system. These sources teach you how to budget it, externalize it, condense it, and keep it cache-friendly across long runs.",
  },
  guardrails: {
    title: "Constraints, Guardrails & Safe Autonomy",
    intro:
      "How to grant the agent power without granting it harm. Sandboxing, tool design, prompt-injection defense, approval policies, and reference applications that anchor model behavior.",
  },
  "specs-workflows": {
    title: "Specs, Agent Files & Workflow Design",
    intro:
      "Externalized contracts. AGENTS.md and agent.md are open standards for repo-local agent instructions; the 12-Factor frameworks codify operational principles. Read this cluster on a Friday and ship it on Monday.",
  },
  "evals-observability": {
    title: "Evals & Observability",
    intro:
      "If you cannot measure it, the harness does not exist. Trace grading, deterministic verifiers, no-skill baselines, OpenTelemetry GenAI conventions, and the empirical evidence that harness changes alone move benchmark scores meaningfully.",
  },
  benchmarks: {
    title: "Benchmarks",
    intro:
      "The empirical backbone of the field. Useful when you want to compare harness quality, not just model quality. Start with SWE-bench Verified for coding, GAIA for general assistants, and Terminal-Bench for shell-native work.",
  },
  "runtimes-implementations": {
    title: "Runtimes, Harnesses & Reference Implementations",
    intro:
      "Real harness code you can read tonight. Ralph is twelve lines of bash and makes every tenet visible. SWE-agent is the canonical research harness. Citadel and deepagents show what production looks like.",
  },
  courses: {
    title: "Courses & Companion Curricula",
    intro:
      "Other structured paths into the field. Read alongside this course for additional perspective, especially the WalkingLabs lectures, which mirror many of our tenets with a different organizing structure.",
  },
};

export const SOURCES: Source[] = [
  // ============================================================
  // Foundations
  // ============================================================
  {
    id: "openai-harness-codex",
    title: "Harness engineering: leveraging Codex in an agent-first world",
    author: "OpenAI",
    url: "https://openai.com/index/harness-engineering/",
    cluster: "foundations",
    primary: true,
    annotation:
      "OpenAI's flagship field report on building a large application with Codex using architectural constraints, repo-local instructions, browser validation, and telemetry.",
    whyItMatters:
      "The single most important field report. OpenAI explicitly named the discipline 'harness engineering' and showed how repo-local instructions plus telemetry plus browser validation produced a production-grade Codex deployment.",
    tenetIds: ["harness-is-artifact", "state-externalization", "cybernetic-loop"],
  },
  {
    id: "anthropic-effective-harnesses",
    title: "Effective Harnesses for Long-Running Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
    cluster: "foundations",
    primary: true,
    annotation:
      "The canonical reference on long-running agent design. Initializer agents, feature lists, init.sh, self-verification, handoff artifacts.",
    whyItMatters:
      "Introduces the two-fold harness structure (JSON progress files + git commits) and names 'context anxiety' as a failure mode. The reference for state externalization.",
    tenetIds: ["state-externalization", "context-budget"],
  },
  {
    id: "anthropic-harness-design",
    title: "Harness Design for Long-Running Apps",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/harness-design-long-running-apps",
    cluster: "foundations",
    primary: true,
    annotation:
      "Anthropic follow-up focused on improving long-running app generation with better task state and evaluator design.",
    whyItMatters:
      "Lays out the GAN-inspired Planner / Generator / Evaluator architecture and sprint contracts. Read this when the single-loop pattern starts to fail.",
    tenetIds: ["separation-of-concerns"],
  },
  {
    id: "langchain-anatomy",
    title: "The Anatomy of an Agent Harness",
    author: "LangChain",
    url: "https://blog.langchain.com/the-anatomy-of-an-agent-harness/",
    cluster: "foundations",
    primary: true,
    annotation:
      "LangChain's concise framing of an agent as model plus harness, with prompts, tools, middleware, orchestration, and runtime infrastructure.",
    whyItMatters:
      "The cleanest decomposition of the Agent = LLM + Harness equation in print. Read after our Mental Model page for a second perspective on the same components.",
    tenetIds: ["harness-is-artifact"],
  },
  {
    id: "fowler-harness",
    title: "Harness Engineering",
    author: "Martin Fowler / Birgitta Böckeler (Thoughtworks)",
    url: "https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html",
    cluster: "foundations",
    primary: true,
    annotation:
      "Thoughtworks' framing of harness work into context engineering, architectural constraints, and 'garbage collection' against entropy.",
    whyItMatters:
      "Distinguishes feedforward controls (specs, conventions) from feedback controls (linters, tests, screenshots). The clearest control-theory framing of the discipline.",
    tenetIds: ["cybernetic-loop", "context-budget"],
  },
  {
    id: "anthropic-building-agents",
    title: "Building Effective Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    cluster: "foundations",
    annotation:
      "Anthropic's broader guide to workflows, agents, tools, and when structured systems outperform raw prompting.",
    whyItMatters:
      "Read this before deciding whether your problem actually needs an agent. Often the right answer is a workflow, not an agent.",
    tenetIds: ["harness-is-artifact"],
  },
  {
    id: "humanlayer-skill-issue",
    title: "Skill Issue: Harness Engineering for Coding Agents",
    author: "HumanLayer",
    url: "https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents",
    cluster: "foundations",
    primary: true,
    annotation:
      "A practical argument that weak results from coding agents are often harness problems rather than model problems.",
    whyItMatters:
      "The reframe. 'It's not a model problem. It's a configuration problem.' If you've ever blamed the model, read this first.",
    tenetIds: ["harness-is-artifact"],
  },
  {
    id: "inngest-harness-not-framework",
    title: "Your Agent Needs a Harness, Not a Framework",
    author: "Inngest",
    url: "https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework",
    cluster: "foundations",
    annotation:
      "Inngest's case for treating state, retries, traces, and concurrency as first-class infrastructure.",
    whyItMatters:
      "Argues durably that the things you actually need (retries, traces, concurrency) are infrastructure problems, not framework features.",
    tenetIds: ["state-externalization", "harness-is-artifact"],
  },
  {
    id: "osmani-agent-harness",
    title: "Agent Harness Engineering",
    author: "Addy Osmani",
    url: "https://addyosmani.com/blog/agent-harness-engineering/",
    cluster: "foundations",
    primary: true,
    annotation:
      "Coined the operating maxim 'a decent model with a great harness beats a great model with a bad harness.'",
    whyItMatters:
      "Introduces 'the ratchet' as the discipline of turning every mistake into a structural rule. The single best one-page summary.",
    tenetIds: ["harness-is-artifact", "the-ratchet"],
  },

  // ============================================================
  // Context, Memory & Working State
  // ============================================================
  {
    id: "anthropic-context-engineering",
    title: "Effective Context Engineering for AI Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    cluster: "context-memory",
    primary: true,
    annotation:
      "Anthropic's guidance on managing the context window as a working memory budget rather than a dumping ground.",
    whyItMatters:
      "The text that turned 'prompt engineering' into 'context engineering.' Pairs perfectly with our Tenet 4 (Treat Context as a Budget).",
    tenetIds: ["context-budget"],
  },
  {
    id: "manus-context-engineering",
    title: "Context Engineering for AI Agents: Lessons from Building Manus",
    author: "Manus",
    url: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus",
    cluster: "context-memory",
    primary: true,
    annotation:
      "Manus' detailed playbook on KV-cache locality, tool masking, filesystem memory, and keeping useful failures in-context.",
    whyItMatters:
      "The most operational context-engineering essay in print. KV-cache locality alone is worth a 30% latency improvement when you do it right.",
    tenetIds: ["context-budget", "state-externalization"],
  },
  {
    id: "humanlayer-advanced-context",
    title: "Advanced Context Engineering for Coding Agents",
    author: "HumanLayer",
    url: "https://www.humanlayer.dev/blog/advanced-context-engineering",
    cluster: "context-memory",
    annotation:
      "HumanLayer patterns for reducing context drift and making coding sessions easier to resume.",
    whyItMatters:
      "Sequel to 12 Factor Agents. Where Factor 3 says 'own your context window,' this article tells you how.",
    tenetIds: ["context-budget"],
  },
  {
    id: "humanlayer-backpressure",
    title: "Context-Efficient Backpressure for Coding Agents",
    author: "HumanLayer",
    url: "https://www.humanlayer.dev/blog/context-efficient-backpressure",
    cluster: "context-memory",
    annotation:
      "HumanLayer's ideas for preventing agents from burning context on noisy or low-value work.",
    whyItMatters:
      "Read this when your agent is reading 50 files to answer a question that needed 3. Backpressure is the cure.",
    tenetIds: ["context-budget"],
  },
  {
    id: "openhands-condensation",
    title: "OpenHands Context Condensation for More Efficient AI Agents",
    author: "OpenHands",
    url: "https://openhands.dev/blog/openhands-context-condensensation-for-more-efficient-ai-agents",
    cluster: "context-memory",
    primary: true,
    annotation:
      "OpenHands' design for bounded conversation memory that preserves goals, progress, critical files, and failing tests.",
    whyItMatters:
      "Concrete reference architecture for compaction. Shows what to keep, what to drop, and how to verify the compacted state still works.",
    tenetIds: ["context-budget", "state-externalization"],
  },
  {
    id: "humanlayer-claude-md",
    title: "Writing a Good CLAUDE.md",
    author: "HumanLayer",
    url: "https://www.humanlayer.dev/blog/writing-a-good-claude-md",
    cluster: "context-memory",
    annotation:
      "A practical guide to creating durable, repo-local instructions that agents can repeatedly follow.",
    whyItMatters:
      "The companion to AGENTS.md. Read both when deciding what belongs in your repo-level instruction file.",
    tenetIds: ["state-externalization"],
  },
  {
    id: "fowler-context-coding",
    title: "Context Engineering for Coding Agents",
    author: "Martin Fowler / Thoughtworks",
    url: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html",
    cluster: "context-memory",
    annotation:
      "Thoughtworks guidance on shaping the task environment so coding agents can stay grounded and productive.",
    whyItMatters:
      "Pragmatic, opinionated, and short. A good first read on the topic before diving into Anthropic or Manus.",
    tenetIds: ["context-budget"],
  },

  // ============================================================
  // Constraints, Guardrails & Safe Autonomy
  // ============================================================
  {
    id: "anthropic-beyond-permissions",
    title: "Beyond Permission Prompts: Making Claude Code More Secure and Autonomous",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/claude-code-sandboxing",
    cluster: "guardrails",
    primary: true,
    annotation:
      "Anthropic on reducing approval friction without losing control through better sandboxing and policy design.",
    whyItMatters:
      "The reference on graduating from 'ask before every action' to declarative policy. Read before designing your hooks.",
    tenetIds: ["safe-autonomy"],
  },
  {
    id: "anthropic-mcp-execution",
    title: "Code Execution with MCP: Building More Efficient Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/code-execution-with-mcp",
    cluster: "guardrails",
    annotation:
      "Anthropic's approach to giving agents controlled execution power through explicit, inspectable tool boundaries.",
    whyItMatters:
      "If you're shipping tools through MCP, this is the article on making them inspectable and bounded.",
    tenetIds: ["safe-autonomy"],
  },
  {
    id: "anthropic-writing-tools",
    title: "Writing Effective Tools for Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/writing-tools-for-agents",
    cluster: "guardrails",
    primary: true,
    annotation:
      "Anthropic's guidance on tool interfaces that are easier for models to call correctly and safely.",
    whyItMatters:
      "Tool design is harness design. Bad tool docs cause more failures than bad models. Read this before adding any new tool.",
    tenetIds: ["safe-autonomy"],
  },
  {
    id: "openhands-prompt-injection",
    title: "Mitigating Prompt Injection Attacks in Software Agents",
    author: "OpenHands",
    url: "https://openhands.dev/blog/mitigating-prompt-injection-attacks-in-software-agents",
    cluster: "guardrails",
    primary: true,
    annotation:
      "OpenHands' practical guide to confirmation mode, analyzers, sandboxing, and hard policies for reducing prompt-injection risk.",
    whyItMatters:
      "If your agent reads untrusted input (issues, web pages, user files), you have a prompt-injection problem. This is the playbook.",
    tenetIds: ["safe-autonomy"],
  },
  {
    id: "fowler-internal-quality",
    title: "Assessing Internal Quality While Coding with an Agent",
    author: "Martin Fowler / Thoughtworks",
    url: "https://martinfowler.com/articles/exploring-gen-ai/ccmenu-quality.html",
    cluster: "guardrails",
    annotation:
      "Thoughtworks on moving quality checks into the loop instead of relying on after-the-fact manual review.",
    whyItMatters:
      "The argument for in-loop linting and tests as a structural quality lever. Counter to the 'review after generation' default.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "fowler-anchoring",
    title: "Anchoring AI to a Reference Application",
    author: "Martin Fowler / Thoughtworks",
    url: "https://martinfowler.com/articles/exploring-gen-ai/anchoring-to-reference.html",
    cluster: "guardrails",
    annotation:
      "Thoughtworks on constraining agents with concrete exemplars so they produce more consistent output.",
    whyItMatters:
      "When 'follow our conventions' fails, point the agent at a reference app and say 'do it like that.' Cheap, effective.",
    tenetIds: ["safe-autonomy", "state-externalization"],
  },

  // ============================================================
  // Specs, Agent Files & Workflow Design
  // ============================================================
  {
    id: "agents-md-spec",
    title: "AGENTS.md (open spec)",
    author: "agentsmd.net",
    url: "https://agents.md/",
    cluster: "specs-workflows",
    primary: true,
    annotation:
      "A lightweight open format for repo-local instructions that tell agents how to work inside a codebase.",
    whyItMatters:
      "If you're going to externalize agent instructions (Tenet 2), do it in a format other tools recognize. AGENTS.md is becoming the de facto standard.",
    tenetIds: ["state-externalization"],
  },
  {
    id: "agent-md-spec",
    title: "agent.md (alt spec)",
    author: "agentmd",
    url: "https://github.com/agentmd/agent.md",
    cluster: "specs-workflows",
    annotation:
      "A related standardization effort for machine-readable agent instructions across projects and tools.",
    whyItMatters:
      "Sister effort to AGENTS.md with a different bias. Read both before committing to one in your repo.",
    tenetIds: ["state-externalization"],
  },
  {
    id: "github-spec-kit",
    title: "GitHub Spec Kit",
    author: "GitHub",
    url: "https://github.com/github/spec-kit",
    cluster: "specs-workflows",
    primary: true,
    annotation:
      "GitHub's toolkit for spec-driven development, useful when you want agents to execute against explicit product and engineering specs.",
    whyItMatters:
      "Closest thing to a 'use this on Monday' template for spec-driven agent work. Pairs with feature_list.json.",
    tenetIds: ["state-externalization", "separation-of-concerns"],
  },
  {
    id: "humanlayer-12-factor",
    title: "12 Factor Agents",
    author: "HumanLayer",
    url: "https://www.humanlayer.dev/blog/12-factor-agents",
    cluster: "specs-workflows",
    primary: true,
    annotation:
      "HumanLayer's operating principles for production agents: explicit prompts, state ownership, clean pause-resume.",
    whyItMatters:
      "Especially relevant: Factor 3 (own your context window), Factor 5 (unify execution state), Factor 7 (contact humans with tool calls).",
    tenetIds: ["context-budget", "state-externalization", "safe-autonomy"],
  },
  {
    id: "12-factor-agentops",
    title: "12-Factor AgentOps",
    author: "12factoragentops.com",
    url: "https://www.12factoragentops.com/",
    cluster: "specs-workflows",
    annotation:
      "An operations-oriented companion focused on context discipline, validation, and reproducible agent workflows.",
    whyItMatters:
      "Where 12 Factor Agents tells you what to build, AgentOps tells you how to operate it day-to-day.",
    tenetIds: ["cybernetic-loop", "the-ratchet"],
  },

  // ============================================================
  // Evals & Observability
  // ============================================================
  {
    id: "openai-trace-grading",
    title: "Trace Grading",
    author: "OpenAI",
    url: "https://platform.openai.com/docs/guides/trace-grading",
    cluster: "evals-observability",
    primary: true,
    annotation:
      "OpenAI documentation on grading agent traces directly, especially helpful for long multi-step tasks.",
    whyItMatters:
      "When success/fail is too coarse, trace grading lets you score the journey. Essential for long-running tasks.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "openai-eval-skills",
    title: "Testing Agent Skills Systematically with Evals",
    author: "OpenAI",
    url: "https://developers.openai.com/blog/eval-skills/",
    cluster: "evals-observability",
    primary: true,
    annotation:
      "OpenAI's concrete guide to turning agent traces into repeatable evals with JSONL logs and deterministic checks.",
    whyItMatters:
      "Step-by-step: take your real traces, turn them into eval cases, run them every time you change the harness. The path from 'I think it's better' to 'I know it's better.'",
    tenetIds: ["cybernetic-loop", "the-ratchet"],
  },
  {
    id: "openhands-evaluate-skills",
    title: "How to Evaluate Agent Skills (And Why You Should)",
    author: "OpenHands",
    url: "https://openhands.dev/blog/evaluating-agent-skills",
    cluster: "evals-observability",
    primary: true,
    annotation:
      "OpenHands' hands-on playbook with bounded tasks, deterministic verifiers, no-skill baselines, and trace review.",
    whyItMatters:
      "The 'no-skill baseline' idea alone is worth the read. If your skill isn't beating the baseline, you don't have a skill.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "inspect-ai",
    title: "Inspect AI",
    author: "UK AISI",
    url: "https://inspect.aisi.org.uk/",
    cluster: "evals-observability",
    annotation:
      "UK AISI's open-source evaluation framework with solver, scorer, sandboxing, tool-use, MCP, and log-viewer primitives.",
    whyItMatters:
      "Government-grade reproducibility. If you need a defensible eval harness, this is the boring, working answer.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "otel-genai",
    title: "OpenTelemetry Semantic Conventions for Generative AI",
    author: "OpenTelemetry",
    url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/",
    cluster: "evals-observability",
    primary: true,
    annotation:
      "Standard span, metric, event, and attribute conventions for instrumenting LLM and agent workflows.",
    whyItMatters:
      "If your traces aren't OTel-compatible, switching observability backends is a rewrite. Start in this format.",
    tenetIds: ["cybernetic-loop", "harness-is-artifact"],
  },
  {
    id: "agentops-sdk",
    title: "AgentOps",
    author: "AgentOps-AI",
    url: "https://github.com/AgentOps-AI/agentops",
    cluster: "evals-observability",
    annotation:
      "Open-source Python SDK for agent monitoring, session replay, cost tracking, benchmarking, and tracing.",
    whyItMatters:
      "Plug-in observability without writing your own instrumentation. Worth a 30-minute trial on any agent project.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "agenttrace",
    title: "agenttrace",
    author: "luoyuctl",
    url: "https://github.com/luoyuctl/agenttrace",
    cluster: "evals-observability",
    annotation:
      "Local-first TUI/CLI for auditing AI coding-agent session traces, health gates, cost spikes, tool failures.",
    whyItMatters:
      "When you want to audit a session right now without spinning up a dashboard. Good for incident response.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "anthropic-demystifying-evals",
    title: "Demystifying Evals for AI Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    cluster: "evals-observability",
    annotation:
      "Anthropic's guidance on what to measure when agents have many possible trajectories to success or failure.",
    whyItMatters:
      "When the same task has 10 valid solutions, single-trace pass/fail is too brittle. This article tells you what to measure instead.",
    tenetIds: ["cybernetic-loop"],
  },
  {
    id: "anthropic-infra-noise",
    title: "Quantifying Infrastructure Noise in Agentic Coding Evals",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/infrastructure-noise",
    cluster: "evals-observability",
    primary: true,
    annotation:
      "Anthropic on how runtime configuration can move coding benchmark scores by more than many leaderboard gaps.",
    whyItMatters:
      "The single most important data point in this discipline: harness noise often exceeds model gaps. If you don't read anything else from this cluster, read this.",
    tenetIds: ["harness-is-artifact", "cybernetic-loop"],
  },
  {
    id: "langchain-improving-deepagents",
    title: "Improving Deep Agents with Harness Engineering",
    author: "LangChain",
    url: "https://blog.langchain.com/improving-deep-agents-with-harness-engineering/",
    cluster: "evals-observability",
    primary: true,
    annotation:
      "LangChain's evidence that harness changes alone can significantly improve benchmark performance.",
    whyItMatters:
      "Empirical proof of the field's central claim. The numbers are large enough that no serious practitioner can ignore them.",
    tenetIds: ["harness-is-artifact"],
  },
  {
    id: "langchain-evaluating-deepagents",
    title: "Evaluating Deep Agents: Our Learnings",
    author: "LangChain",
    url: "https://blog.langchain.com/evaluating-deep-agents-our-learnings/",
    cluster: "evals-observability",
    annotation:
      "LangChain's practical breakdown of single-step, full-run, and multi-turn eval design for stateful agents.",
    whyItMatters:
      "If you're evaluating an agent and not just a model, the single-step / full-run / multi-turn taxonomy here is the right starting point.",
    tenetIds: ["cybernetic-loop"],
  },

  // ============================================================
  // Benchmarks
  // ============================================================
  {
    id: "swe-bench",
    title: "SWE-bench Verified",
    author: "Princeton NLP / OpenAI verified set",
    url: "https://www.swebench.com/",
    cluster: "benchmarks",
    primary: true,
    annotation:
      "A strong benchmark for software engineering agents working against real GitHub issues and tests.",
    whyItMatters:
      "The reference benchmark for coding agents. If your harness doesn't show up here, you can't claim coding-agent results in a defensible way.",
  },
  {
    id: "gaia",
    title: "GAIA",
    author: "Hugging Face / GAIA team",
    url: "https://huggingface.co/datasets/gaia-benchmark/GAIA",
    cluster: "benchmarks",
    primary: true,
    annotation:
      "A benchmark for general AI assistants used to compare harness-level choices around tools, planning, verification, and long-horizon autonomy.",
    whyItMatters:
      "The reference benchmark for general-purpose assistants. Useful for any harness that isn't pure code.",
  },
  {
    id: "terminal-bench",
    title: "Terminal-Bench",
    author: "Terminal-Bench team",
    url: "https://www.tbench.ai/",
    cluster: "benchmarks",
    primary: true,
    annotation:
      "A benchmark suite for terminal-native agents operating in shells, filesystems, and verification-heavy environments.",
    whyItMatters:
      "The right benchmark for any harness whose primary surface is a shell. Pairs with Terminal-Bench 2.0 / Harbor.",
  },
  {
    id: "tau-bench",
    title: "τ-Bench",
    author: "Sierra Research",
    url: "https://github.com/sierra-research/tau-bench",
    cluster: "benchmarks",
    annotation:
      "Emulates dynamic conversations between a simulated user and a language agent equipped with domain-specific API tools and policy guidelines.",
    whyItMatters:
      "If your agent talks to humans and uses tools under policy, τ-Bench is more representative than SWE-bench.",
  },
  {
    id: "osworld",
    title: "OSWorld",
    author: "OSWorld team",
    url: "https://os-world.github.io/",
    cluster: "benchmarks",
    annotation:
      "A real computer-use benchmark with 369 tasks across Ubuntu, Windows, and macOS, with execution-based evaluators.",
    whyItMatters:
      "The reference benchmark for desktop / multimodal harnesses. State-of-the-art is still well below human; lots of harness headroom.",
  },
  {
    id: "webarena",
    title: "WebArena",
    author: "WebArena team",
    url: "https://webarena.dev/",
    cluster: "benchmarks",
    annotation:
      "A standalone, self-hostable web environment for evaluating autonomous agents on realistic tasks.",
    whyItMatters:
      "Reproducible, self-hostable, and realistic. The default for browser-agent harness comparisons.",
  },
  {
    id: "tbench-2-harbor",
    title: "Terminal-Bench 2.0 and Harbor",
    author: "Terminal-Bench team",
    url: "https://www.tbench.ai/news/announcement-2-0",
    cluster: "benchmarks",
    annotation:
      "The Terminal-Bench 2.0 announcement, useful for understanding the harder tasks and generalized evaluation harness behind Harbor.",
    whyItMatters:
      "Where Terminal-Bench is the dataset, Harbor is the harness for running it. Read both together.",
  },
  {
    id: "hal-leaderboard",
    title: "HAL: Holistic Agent Leaderboard",
    author: "Princeton",
    url: "https://hal.cs.princeton.edu/",
    cluster: "benchmarks",
    annotation:
      "A benchmark and leaderboard for agent systems with attention to reliability, cost, and broad task coverage.",
    whyItMatters:
      "Useful when you care about reliability and cost, not just task success.",
  },

  // ============================================================
  // Runtimes, Harnesses & Reference Implementations
  // ============================================================
  {
    id: "ralph-wiggum",
    title: "Ralph Wiggum as a Software Engineer",
    author: "Geoffrey Huntley",
    url: "https://ghuntley.com/ralph/",
    cluster: "runtimes-implementations",
    primary: true,
    annotation:
      "Geoffrey Huntley's write-up of 'Ralph,' a minimalist `while :; do cat PROMPT.md | claude-code; done` harness pattern.",
    whyItMatters:
      "Twelve lines of bash. Profoundly minimal. Makes every tenet visible at once. If you read one reference implementation, read this.",
    tenetIds: ["harness-is-artifact", "state-externalization", "the-ratchet"],
  },
  {
    id: "swe-agent",
    title: "SWE-agent",
    author: "Princeton NLP",
    url: "https://github.com/SWE-agent/SWE-agent",
    cluster: "runtimes-implementations",
    primary: true,
    annotation:
      "A mature research coding agent that makes the harness, prompt, tools, and environment design directly inspectable.",
    whyItMatters:
      "The canonical research harness. Read its prompts, tools, and environment definition; that's a graduate course in harness engineering.",
    tenetIds: ["harness-is-artifact", "safe-autonomy"],
  },
  {
    id: "deepagents",
    title: "deepagents",
    author: "LangChain",
    url: "https://github.com/langchain-ai/deepagents",
    cluster: "runtimes-implementations",
    annotation:
      "LangChain's open-source project for building deeper, longer-running agents with middleware and harness patterns.",
    whyItMatters:
      "Production-shaped. Useful when you've outgrown a notebook and need middleware, durability, and orchestration.",
    tenetIds: ["separation-of-concerns", "harness-is-artifact"],
  },
  {
    id: "claude-agent-sdk",
    title: "Building Agents with the Claude Agent SDK",
    author: "Anthropic",
    url: "https://claude.com/blog/building-agents-with-the-claude-agent-sdk",
    cluster: "runtimes-implementations",
    annotation:
      "Anthropic's guide to a production-oriented agent SDK with sessions, tools, and orchestration support.",
    whyItMatters:
      "Anthropic's reference for what they consider production-shaped on Claude. Worth reading even if you ship on a different model.",
    tenetIds: ["harness-is-artifact"],
  },
  {
    id: "anthropic-multi-agent-research",
    title: "How We Built Our Multi-Agent Research System",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/multi-agent-research-system",
    cluster: "runtimes-implementations",
    primary: true,
    annotation:
      "Anthropic's architecture write-up for a multi-agent system with separation of roles and structured coordination.",
    whyItMatters:
      "The Planner / Generator / Evaluator pattern in production. Pairs with our Module 7.",
    tenetIds: ["separation-of-concerns"],
  },
  {
    id: "citadel-harness",
    title: "Citadel",
    author: "Seth Gammon",
    url: "https://github.com/SethGammon/Citadel",
    cluster: "runtimes-implementations",
    annotation:
      "A harness for Claude Code and OpenAI Codex with isolated worktrees, multi-agent coordination, and persisted memory and campaign state.",
    whyItMatters:
      "Real, production-flavored harness with worktree isolation and persisted memory. Read after Ralph for what 'serious' looks like.",
    tenetIds: ["safe-autonomy", "state-externalization"],
  },
  {
    id: "harness-evolver",
    title: "Harness Evolver",
    author: "Raphael Christi",
    url: "https://github.com/raphaelchristi/harness-evolver",
    cluster: "runtimes-implementations",
    annotation:
      "Claude Code plugin that autonomously evolves LLM agent harnesses using multi-agent proposers and LangSmith-backed evaluation.",
    whyItMatters:
      "The meta-move: use an agent to improve your harness. Based on the Meta-Harness research line.",
    tenetIds: ["the-ratchet", "cybernetic-loop"],
  },
  {
    id: "browser-harness",
    title: "browser-use/browser-harness",
    author: "browser-use",
    url: "https://github.com/browser-use/browser-harness",
    cluster: "runtimes-implementations",
    annotation:
      "A thin CDP-based browser harness that lets agents extend helper functions during execution.",
    whyItMatters:
      "Self-healing web automation patterns. Read when your agent needs to drive a browser.",
    tenetIds: ["safe-autonomy"],
  },

  // ============================================================
  // Courses & Companion Curricula
  // ============================================================
  {
    id: "walkinglabs-awesome",
    title: "Awesome Harness Engineering",
    author: "WalkingLabs",
    url: "https://github.com/walkinglabs/awesome-harness-engineering",
    cluster: "courses",
    primary: true,
    annotation:
      "Curated index of articles, playbooks, benchmarks, specifications, and open-source projects for harness engineering.",
    whyItMatters:
      "The map of the field. Bookmark it. Most of the sources in this catalog were curated from this list.",
  },
  {
    id: "walkinglabs-learn",
    title: "Learn Harness Engineering",
    author: "WalkingLabs",
    url: "https://walkinglabs.github.io/learn-harness-engineering/en/",
    cluster: "courses",
    primary: true,
    annotation:
      "A 12-lecture course covering harness primitives, sandboxing, hooks, and policy design.",
    whyItMatters:
      "Sister course to this one with a different structure (12 lectures vs. our 9 modules) and a coding-agent emphasis. Read alongside for triangulation.",
  },
];

// ----------- helpers -----------

export const SOURCES_BY_ID: Record<string, Source> = SOURCES.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<string, Source>,
);

export function sourcesByCluster(cluster: SourceCluster): Source[] {
  return SOURCES.filter((s) => s.cluster === cluster);
}

export function getSource(id: string): Source {
  const s = SOURCES_BY_ID[id];
  if (!s) throw new Error(`Unknown source id: ${id}`);
  return s;
}
