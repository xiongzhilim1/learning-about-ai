// Context Engineering Mastery (Vol. 2) — Rebuilt Data Model
// Zero-based from first principles. Audited as super-learner + master teacher.

// ============================================================
// FOUNDATIONAL CONCEPTS — The "physics" of context engineering
// ============================================================

export interface Concept {
  id: string;
  title: string;
  oneLiner: string;
  explanation: string;
  implication: string;
  source: string;
}

export const foundationalConcepts: Concept[] = [
  {
    id: "context-rot",
    title: "Context Rot",
    oneLiner: "Performance degrades as the context window fills.",
    explanation: "As the number of tokens in the context window increases, the model's ability to accurately recall and reason over information decreases — even when the information is explicitly present. Chroma Research demonstrated that even one distractor document reduces accuracy versus baseline, and four distractors compound the damage significantly.",
    implication: "You cannot treat the context window as a database. Every token added must earn its place. The advertised context length (1M, 200K) is a capacity ceiling, not a quality guarantee.",
    source: "Chroma Research (2025)"
  },
  {
    id: "lost-in-middle",
    title: "Lost in the Middle",
    oneLiner: "Models attend poorly to information in middle positions.",
    explanation: "Liu et al. (2023) demonstrated that LLMs exhibit a U-shaped attention curve: they attend strongly to the beginning (primacy) and end (recency) of context, but performance drops significantly for information placed in the middle. On multi-document QA, accuracy dropped from 75% to 45% when the relevant document moved from position 1 to position 10 of 20.",
    implication: "Position within the context window is not neutral. Critical information must be placed at the start or end. The middle is an attention dead zone.",
    source: "Liu et al. (2023)"
  },
  {
    id: "agentic-loop",
    title: "The Agentic Loop (ReAct Paradigm)",
    oneLiner: "Agents operate in Reason → Act → Observe cycles, each cycle is a context engineering decision.",
    explanation: "Modern AI agents follow the ReAct paradigm: they Reason about the current state, take an Action (tool call, search, code execution), then Observe the result. Each cycle adds to the context window. A typical Manus task averages ~50 tool calls, meaning the context window is being engineered 50 times per task — not once.",
    implication: "Context engineering is not a one-time setup. It is a continuous, per-turn discipline. Every observation that enters context is an editorial decision.",
    source: "Yao et al. (2022), Manus (2025)"
  },
  {
    id: "quadratic-scaling",
    title: "Quadratic Attention Scaling",
    oneLiner: "Self-attention cost grows as O(n²) with context length.",
    explanation: "The transformer architecture computes attention between every pair of tokens, creating n² pairwise relationships. Doubling context length quadruples computational cost. This is why techniques like Ring Attention, GQA, and KV-cache compression exist — they make long context economically viable but don't eliminate the fundamental tension.",
    implication: "Longer context is always more expensive. The economic pressure to minimize context is permanent, regardless of how large windows become.",
    source: "Vaswani et al. (2017)"
  },
  {
    id: "hundred-to-one",
    title: "The 100:1 Input-Output Ratio",
    oneLiner: "Context tokens dominate cost — output is a rounding error.",
    explanation: "Manus reports an average input-to-output token ratio of 100:1. This means for every token the model generates, it processes 100 tokens of context. The cost structure of AI systems is overwhelmingly determined by context management, not generation.",
    implication: "Optimizing context (caching, compression, retrieval precision) delivers 100x more cost impact than optimizing generation.",
    source: "Manus (2025)"
  },
  {
    id: "smart-zone",
    title: "The Smart Zone",
    oneLiner: "Effective context is dramatically shorter than advertised context.",
    explanation: "HumanLayer's research shows Claude's 'smart zone' is approximately 75K tokens — beyond this threshold, instruction-following and reasoning quality degrade noticeably. The phrase '200K context' on a model card is a capacity statement, not a quality statement. Optimal utilization is 40-60% of the available window.",
    implication: "Design for 40-60% utilization. Leave headroom for reasoning. Never fill the window assuming the model will handle it.",
    source: "HumanLayer (2025)"
  },
  {
    id: "kv-cache-economics",
    title: "KV-Cache Economics",
    oneLiner: "Cache hits are 10x cheaper than cache misses.",
    explanation: "When a prompt prefix matches a cached KV-cache, the model skips recomputation of those tokens. Anthropic charges 0.30 USD/MTok for cache hits vs 3.00 USD/MTok for cache misses — a 10x difference. Manus reports KV-cache hit rate as their single most important production metric.",
    implication: "Context must be designed as append-only with stable prefixes. Any change to early tokens invalidates the entire cache.",
    source: "Manus (2025), Anthropic"
  }
];

// ============================================================
// THE SIX APPROACHES — Architectural strategies
// ============================================================

export interface Approach {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  philosophy: string;
  description: string;
  strengths: string[];
  limitations: string[];
  whenWorks: string;
  whenFails: string;
  tokenEfficiency: "Low" | "Medium" | "Medium-High" | "High";
  keyPapers: string[];
  mostCriticalTenets: string[]; // Links to tenet IDs
  keyTechniques: string[];
}

export const approaches: Approach[] = [
  {
    id: "brute-force",
    number: 1,
    title: "Brute-Force Long Context",
    subtitle: "Stuff everything in, let attention sort it out",
    philosophy: "Feed entire documents, codebases, or histories directly into the model's context window, relying on internal attention mechanisms to find relevant information.",
    description: "The brute-force approach feeds entire documents, codebases, or conversation histories directly into the model's context window without external filtering. Modern models overcome quadratic scaling through Ring Attention, Multi-Head Latent Attention (MLA), Grouped Query Attention (GQA), and KV-cache compression. Google's Gemini 1.5 demonstrated near-perfect recall up to 1M tokens on single-needle tasks, but performance drops sharply on multi-needle retrieval (96% → 74%).",
    strengths: [
      "Eliminates complex external retrieval pipelines",
      "Preserves deep contextual relationships across entire documents",
      "Enables complex cross-document reasoning and summarization",
      "Zero indexing or preprocessing required"
    ],
    limitations: [
      "1250x more expensive than targeted retrieval at scale",
      "45x slower than RAG per query",
      "Susceptible to 'Lost in the Middle' phenomenon",
      "Performance drops sharply on multi-needle retrieval tasks",
      "Context rot degrades quality as window fills"
    ],
    whenWorks: "Static datasets requiring one-off deep analysis, full-document summarization, or situations where the entire corpus fits within the effective smart zone.",
    whenFails: "Dynamic data requiring frequent updates, cost-sensitive production workloads, multi-needle retrieval tasks, and any scenario where the model must reliably extract specific facts from a sea of distractors.",
    tokenEfficiency: "Low",
    keyPapers: ["Gemini 1.5 (Google DeepMind, 2024)", "Lost in the Middle (Liu et al., 2023)", "Context Rot (Chroma, 2025)"],
    mostCriticalTenets: ["attention-geography", "token-economics", "context-is-world"],
    keyTechniques: ["Ring Attention", "GQA", "MLA", "KV-cache compression", "Prompt caching"]
  },
  {
    id: "rules-engineering",
    number: 2,
    title: "Rules Engineering / Markdown Filesystem",
    subtitle: "Structure as navigable, version-controlled documents",
    philosophy: "Structure context as a hierarchy of version-controlled markdown files, treating the agent's memory and instructions as a navigable filesystem with progressive disclosure.",
    description: "Rules Engineering structures context as a hierarchy of version-controlled markdown files (CLAUDE.md, AGENTS.md, .cursorrules) within a repository. It treats the agent's instructions as a navigable filesystem rather than a monolithic prompt. The key innovation is progressive disclosure: a root file provides high-level guidance and pointers, while task-specific 'Skills' are lazy-loaded only when relevant. This approach leverages the distinction between static context (always present) and dynamically-loaded context (on demand).",
    strengths: [
      "Version-controllable and distributable across teams via Git",
      "Provides deterministic control over AI behavior",
      "Enables progressive disclosure — load instructions only when needed",
      "Supports lazy-loading of task-specific Skills",
      "Separates concerns: rules vs. tools vs. knowledge"
    ],
    limitations: [
      "Frontier models reliably follow only ~150-200 instructions",
      "Monolithic files cause uniform instruction decay (not just newest ignored)",
      "Cannot reason over information not captured in the filesystem",
      "Smaller models show exponential decay in instruction-following",
      "Requires careful instruction budgeting"
    ],
    whenWorks: "Coding agents in established repositories, team-based development where conventions must be shared, and scenarios where deterministic control over agent behavior is more important than semantic flexibility.",
    whenFails: "When the agent must reason over information not captured in the filesystem, when tasks require dynamic real-time information retrieval, or when the instruction budget is already exhausted by the base system prompt.",
    tokenEfficiency: "Medium",
    keyPapers: ["Writing a Good CLAUDE.md (HumanLayer, 2025)", "Context Engineering for AI Agents in OSS (Mohsenimofidi et al., 2025)", "Context Engineering for Coding Agents (Böckeler/Fowler, 2026)"],
    mostCriticalTenets: ["progressive-disclosure", "three-layers", "tools-are-context"],
    keyTechniques: ["Progressive disclosure", "Instruction budgeting", "Skills (lazy-loaded docs)", "Hooks (event-triggered actions)", "Convention files"]
  },
  {
    id: "knowledge-graphs",
    number: 3,
    title: "Knowledge Graphs / GraphRAG",
    subtitle: "Model relationships explicitly through graph structure",
    philosophy: "Leverage knowledge graphs to represent and connect information, capturing both data points and their relationships through entity extraction and network analysis.",
    description: "GraphRAG leverages knowledge graphs to represent and connect information, capturing both data points and their relationships through entity extraction, Leiden community detection, and hierarchical map-reduce summarization. Unlike vector RAG which retrieves isolated chunks, GraphRAG enables global sensemaking — answering questions that require connecting disparate information across an entire corpus. RAPTOR extends this with recursive abstractive processing, building tree-structured summaries.",
    strengths: [
      "Enables global sensemaking over entire datasets",
      "Excels at multi-hop reasoning by traversing relationships",
      "5-20% accuracy improvement over vanilla vector RAG",
      "Provides more comprehensive and diverse answers",
      "Captures structural relationships that embedding similarity misses"
    ],
    limitations: [
      "Higher computational cost during indexing phase",
      "Dependency on LLM quality for entity/relationship extraction",
      "Expensive graph construction for rapidly changing data",
      "Overkill for simple factual lookups",
      "Graph quality degrades with poor extraction"
    ],
    whenWorks: "Thematic, open-ended questions requiring connecting disparate information — 'What are the main themes?' questions that require global understanding. Multi-hop reasoning across entities.",
    whenFails: "Simple factual lookups (where classic RAG is faster and cheaper), rapidly changing data (expensive graph reconstruction), and when entity extraction quality is poor.",
    tokenEfficiency: "Medium-High",
    keyPapers: ["From Local to Global: GraphRAG (Edge et al., 2024)", "RAPTOR (Sarthi et al., 2024)", "Knowledge Graphs for RAG (Pan et al., 2024)"],
    mostCriticalTenets: ["editorial-retrieval", "context-is-world", "token-economics"],
    keyTechniques: ["Leiden community detection", "Map-reduce synthesis", "Entity extraction", "Recursive abstractive processing", "Hierarchical summarization"]
  },
  {
    id: "modular-rag",
    number: 4,
    title: "Modular RAG / Multi-Agent Swarms",
    subtitle: "Decompose, orchestrate, and isolate",
    philosophy: "Decompose traditional linear RAG pipelines into specialized, independent modules and autonomous agents that dynamically orchestrate retrieval strategies with isolated contexts.",
    description: "Modular RAG decomposes traditional retrieve-then-generate pipelines into specialized, reconfigurable modules (like LEGO blocks). Multi-agent swarms extend this by embedding autonomous AI agents into the pipeline, each with their own isolated context window. The key insight from Anthropic: each sub-agent explores extensively within its own context but returns only condensed results to the parent — achieving both depth and efficiency. This is the architectural embodiment of context isolation.",
    strengths: [
      "High flexibility and reconfigurability for diverse tasks",
      "Context isolation prevents cross-contamination between sub-tasks",
      "Each sub-agent explores deeply but returns condensed results",
      "Dynamic adaptation to complex, multi-step queries",
      "Clear separation of concerns via specialized agents"
    ],
    limitations: [
      "Increased system complexity and orchestration overhead",
      "Higher latency (2-3x longer response times)",
      "Debugging across multiple agents is extremely difficult",
      "Orchestration cost may exceed benefit for simple queries",
      "Skills vs. sub-agents distinction requires careful judgment"
    ],
    whenWorks: "Complex research tasks requiring parallel exploration, tasks where different sub-problems need different retrieval strategies, and scenarios where context isolation prevents cross-contamination.",
    whenFails: "Simple queries where orchestration overhead exceeds benefit, latency-sensitive applications, and when debugging is critical.",
    tokenEfficiency: "High",
    keyPapers: ["Modular RAG (Gao et al., 2024)", "Agentic RAG Survey (Singh et al., 2025)", "Toolformer (Schick et al., 2023)", "Building Effective Agents (Anthropic, 2024)"],
    mostCriticalTenets: ["isolation", "tools-are-context", "compaction-first-class"],
    keyTechniques: ["Sub-agent spawning", "Context isolation", "Tool orchestration", "Reflection patterns", "Fan-out/fan-in", "Skills vs. sub-agents"]
  },
  {
    id: "cognitive-architecture",
    number: 5,
    title: "Cognitive Architecture / Memory Palace",
    subtitle: "Tiered memory with active self-management",
    philosophy: "Treat LLMs as central processors within a broader system, using tiered memory systems inspired by operating systems and human cognition to manage context dynamically across sessions.",
    description: "The Cognitive Architecture approach (MemGPT, CoALA) treats LLMs as CPUs managing hierarchical memory — main context as RAM, external storage as disk. The LLM uses function calls to actively manage its own state: search_memory(), archive_fact(), update_working_context(). This transforms context scaling from quadratic (attention over all tokens) to linear (only relevant tokens loaded). OpenHands demonstrated that intelligent condensation maintains performance while reducing cost by >50%.",
    strengths: [
      "Overcomes fixed context window limitations entirely",
      "Enables true long-term memory across multiple sessions",
      "Transforms scaling from quadratic to linear",
      "Supports long-horizon strategies impossible in single windows",
      "Self-managing: the model decides what to remember/forget"
    ],
    limitations: [
      "Significant architectural complexity",
      "Continuous memory management overhead and latency",
      "LLM must reliably execute memory management function calls",
      "Complex multi-hop reasoning across memory tiers is fragile",
      "Memory retrieval quality depends on how well facts were archived"
    ],
    whenWorks: "Long-horizon tasks spanning hours or days, personalized assistants remembering user preferences across sessions, and scenarios where total relevant information far exceeds the context window.",
    whenFails: "Short simple tasks where overhead exceeds benefit, when the LLM cannot reliably execute memory management calls, and when complex reasoning requires information fragmented across tiers.",
    tokenEfficiency: "High",
    keyPapers: ["MemGPT (Packer et al., 2023)", "CoALA (Sumers et al., 2023)", "OpenHands Context Condensation (2025)", "AI-native Memory: Pathway to AGI (Shang et al., 2024)"],
    mostCriticalTenets: ["file-system-memory", "compaction-first-class", "errors-are-evidence"],
    keyTechniques: ["Tiered memory (RAM/disk metaphor)", "Self-directed memory management", "Context condensation", "Working context updates", "Archival storage search"]
  },
  {
    id: "classic-rag",
    number: 6,
    title: "Classic RAG",
    subtitle: "Retrieve relevant chunks on demand",
    philosophy: "Combine pre-trained parametric memory with non-parametric memory (a dense vector index) to ground generation in retrieved facts at query time.",
    description: "Retrieval-Augmented Generation (Lewis et al., 2020) combines the language model's parametric memory with a dense vector index of documents. At query time, a bi-encoder retrieves the top-k most relevant chunks via Maximum Inner Product Search (MIPS), which are then injected into the context window alongside the query. This grounds generation in verifiable facts, reduces hallucinations, and allows knowledge updates without retraining.",
    strengths: [
      "Reduces hallucinations by grounding in retrieved facts",
      "Updates world knowledge by replacing the index (no retraining)",
      "1250x cheaper than full-context approaches",
      "45x faster than brute-force long context",
      "Mature ecosystem with proven production patterns"
    ],
    limitations: [
      "Retrieval quality depends heavily on chunking strategy",
      "Fixed-size chunking ignores semantic structures",
      "Cannot perform global sensemaking across documents",
      "Misses relationships between disconnected chunks",
      "Embedding similarity ≠ task relevance"
    ],
    whenWorks: "Knowledge-intensive QA over large, frequently updated corpora, grounding generation in verifiable sources, and cost-sensitive production workloads.",
    whenFails: "Global sensemaking requiring cross-document reasoning, tasks requiring document structure understanding, and when chunking destroys semantic coherence.",
    tokenEfficiency: "High",
    keyPapers: ["RAG for Knowledge-Intensive NLP (Lewis et al., 2020)", "RAGAS (Es et al., 2023)", "LLMLingua: Prompt Compression (Jiang et al., 2023)"],
    mostCriticalTenets: ["editorial-retrieval", "token-economics", "deterministic-control"],
    keyTechniques: ["Bi-encoder retrieval", "Semantic chunking", "Reranking", "Hybrid search (dense + sparse)", "Prompt compression"]
  }
];

// ============================================================
// THE 12 CANONICAL TENETS — Operating principles across all approaches
// ============================================================

export interface Tenet {
  id: string;
  number: number;
  title: string;
  keyQuestion: string;
  triggerPhrase: string;
  triggerSource: string;
  naive: string[];
  engineered: string[];
  failureStory: string;
  crossValidation: string[];
  appliesTo: string; // Which approaches this is most critical for
}

export const tenets: Tenet[] = [
  {
    id: "context-is-world",
    number: 1,
    title: "The Context Window Is the Model's Entire World",
    keyQuestion: "What does the model actually see this turn?",
    triggerPhrase: "Context refers to the set of tokens included when sampling from a large-language model. The engineering problem is optimizing the utility of those tokens.",
    triggerSource: "Anthropic",
    naive: [
      "Assumes the model 'knows' things from previous sessions",
      "Dumps everything into the prompt hoping the model figures it out",
      "Ignores what the model actually sees vs. what you think it knows"
    ],
    engineered: [
      "Treats every turn as fresh inference with explicit context",
      "Curates the minimal set of high-signal tokens for this specific turn",
      "Audits the full token payload before every inference call"
    ],
    failureStory: "A customer support agent is given a 100K-token conversation history containing 47 previous tickets. The relevant billing information is buried at position 45,000 — deep in the 'lost in the middle' zone. The agent hallucinates a plausible but incorrect resolution because it cannot attend to the buried fact.",
    crossValidation: ["Anthropic", "Manus", "HumanLayer", "LangChain"],
    appliesTo: "All approaches — this is the foundational axiom"
  },
  {
    id: "token-economics",
    number: 2,
    title: "Design Around Token Economics",
    keyQuestion: "Will this change invalidate the KV-cache? What is the cost per turn?",
    triggerPhrase: "The KV-cache hit rate is the single most important metric for a production-stage AI agent, directly affecting latency and cost.",
    triggerSource: "Manus",
    naive: [
      "Includes a precise timestamp at the start of the system prompt",
      "Dynamically adds/removes tools between turns",
      "Restructures the prompt layout every turn",
      "Ignores the 100:1 input-to-output cost ratio"
    ],
    engineered: [
      "Places stable instructions first, dynamic content last (append-only)",
      "Masks tool availability via logit constraints while keeping definitions stable",
      "Monitors KV-cache hit rate as a production metric",
      "Treats prompt caching as a first-class architectural concern"
    ],
    failureStory: "A production agent includes 'Current time: 2026-05-19T13:45:02Z' as the first line of its system prompt. Every inference call invalidates the entire KV-cache — paying 10x more per token (3.00 vs 0.30 USD/MTok) and experiencing 3x higher latency. Over 1M requests/day, this costs $80K/month in unnecessary compute.",
    crossValidation: ["Manus", "Anthropic", "Google DeepMind"],
    appliesTo: "Most critical for: Brute-Force, Classic RAG, any high-volume production system"
  },
  {
    id: "editorial-retrieval",
    number: 3,
    title: "Retrieval Is Editorial, Not Lookup",
    keyQuestion: "Which N documents earn their place in this turn's context?",
    triggerPhrase: "Find the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.",
    triggerSource: "Anthropic",
    naive: [
      "Retrieves top-5 chunks by cosine similarity alone",
      "Treats retrieval as a database lookup returning 'matches'",
      "Uses fixed chunk sizes regardless of content structure",
      "Never reranks or filters after initial retrieval"
    ],
    engineered: [
      "Retrieves broadly, then reranks by task relevance (not just similarity)",
      "Treats retrieval as a curatorial decision — what earns its tokens?",
      "Uses semantic chunking that respects document structure",
      "Applies recency weighting, authority scoring, and deduplication"
    ],
    failureStory: "A legal research assistant retrieves the top-5 most similar paragraphs to 'What are the penalties for late filing?' All five are introduction sections mentioning 'penalties' and 'filing' but containing no actual penalty amounts. The relevant Section 4.2.3 scores lower on cosine similarity because it uses formal legal language.",
    crossValidation: ["Anthropic", "Lewis et al.", "Edge et al.", "HumanLayer"],
    appliesTo: "Most critical for: Classic RAG, GraphRAG, any retrieval-based system"
  },
  {
    id: "progressive-disclosure",
    number: 4,
    title: "Progressive Disclosure Prevents Instruction Decay",
    keyQuestion: "Does the agent need to know this right now, or can it be loaded on demand?",
    triggerPhrase: "As instruction count increases, instruction-following quality decreases uniformly — not just the newest instructions, ALL of them.",
    triggerSource: "HumanLayer",
    naive: [
      "Stuffs 300+ lines of coding conventions into a single CLAUDE.md",
      "Loads all tool definitions at session start regardless of task",
      "Provides the full API reference in the system prompt",
      "Treats all instructions as equally important at all times"
    ],
    engineered: [
      "Keeps root instruction file under 60 lines with pointers to task-specific docs",
      "Lazy-loads 'Skills' (focused instruction sets) based on current task context",
      "Provides brief API summary with a tool to fetch specific endpoints on demand",
      "Budgets instructions: frontier models follow ~150-200 reliably"
    ],
    failureStory: "A team creates a 400-line CLAUDE.md covering every coding convention. The agent begins ignoring ALL instructions uniformly — not just the newest ones. Testing reveals Claude Code's system prompt already consumes ~50 of the ~150 reliable instruction slots, leaving only ~100 for user conventions.",
    crossValidation: ["HumanLayer", "Martin Fowler/Böckeler", "Manus", "Anthropic"],
    appliesTo: "Most critical for: Rules Engineering, Cognitive Architecture, any system with complex instructions"
  },
  {
    id: "compaction-first-class",
    number: 5,
    title: "Compaction Is a First-Class Operation",
    keyQuestion: "What is the current context utilization, and what should be evicted?",
    triggerPhrase: "The more you use the context window, the worse the outcomes you'll get. Optimal utilization is 40-60%.",
    triggerSource: "HumanLayer / OpenHands",
    naive: [
      "Lets context grow until it hits the limit, then truncates blindly",
      "Keeps all tool call results in history forever",
      "Compacts only when forced by the context limit",
      "Treats compaction as an error recovery mechanism"
    ],
    engineered: [
      "Maintains context utilization in the 40-60% range proactively",
      "Clears tool results after processing, keeping only the decision made",
      "Compacts at defined thresholds (not at the limit) for cache efficiency",
      "Uses intelligent condensation: summarize, don't truncate"
    ],
    failureStory: "An agent working on a complex migration runs for 50 tool calls. By turn 40, context is 95% full with old grep results and file contents. The agent starts repeating actions, contradicting earlier decisions, and losing track of the plan. OpenHands showed condensation transforms scaling from quadratic to linear cost.",
    crossValidation: ["Anthropic", "Manus", "OpenHands", "HumanLayer"],
    appliesTo: "Most critical for: Cognitive Architecture, Multi-Agent, any long-running agentic system"
  },
  {
    id: "deterministic-control",
    number: 6,
    title: "Deterministic Control Beats Probabilistic Filtering",
    keyQuestion: "Are we relying on the model to filter its own noise, or can code handle this?",
    triggerPhrase: "If you already know what matters, don't leave it to a model to churn through 1000s of junk tokens. Use code.",
    triggerSource: "HumanLayer",
    naive: [
      "Runs full test suite and dumps 200 lines of PASS output into context",
      "Lets the model decide which tool outputs to truncate",
      "Uses the LLM to check code formatting (wasting tokens on deterministic tasks)",
      "Passes raw API responses without filtering"
    ],
    engineered: [
      "Swallows successful output (single ✓), only surfaces failures with details",
      "Deterministically filters tool output BEFORE it enters context",
      "Runs linters/formatters via Hooks, only shows errors to the model",
      "Extracts relevant fields from API responses before injection"
    ],
    failureStory: "A coding agent runs pytest on a 500-test suite. All pass, generating 200+ lines of 'PASS' output consuming 3% of context with zero informational value. The same signal could be conveyed in 5 tokens: '✓ 500/500 passed.' Meanwhile, the one failing test's stack trace — the only actionable information — gets lost in the noise.",
    crossValidation: ["HumanLayer", "Manus", "Martin Fowler/Böckeler"],
    appliesTo: "Most critical for: All agentic approaches, especially Multi-Agent and Cognitive Architecture"
  },
  {
    id: "errors-are-evidence",
    number: 7,
    title: "Errors Are Evidence — Keep Them In Context",
    keyQuestion: "If this action failed, does the model have enough evidence to avoid repeating it?",
    triggerPhrase: "Erasing failure removes evidence. And without evidence, the model can't adapt. It will try the same thing again.",
    triggerSource: "Manus",
    naive: [
      "Removes failed actions from history to 'clean up' context",
      "Retries the same approach after clearing the error",
      "Treats errors as noise to be filtered out",
      "Compacts error messages during context condensation"
    ],
    engineered: [
      "Retains failed actions and their error messages as high-signal learning",
      "Keeps stack traces visible so the model updates its beliefs",
      "Treats errors as the highest-signal tokens in context (never compact them)",
      "Structures error context: what was tried → what failed → why"
    ],
    failureStory: "An agent tries 'pip install tensorflow' and gets a dependency conflict. A context management system removes the failed action to 'save tokens.' Next turn, the agent tries the exact same command — entering an infinite retry loop with no evidence the approach already failed. Three retries later, it hits the rate limit.",
    crossValidation: ["Manus", "Anthropic", "HumanLayer"],
    appliesTo: "Most critical for: Multi-Agent, Cognitive Architecture, any agentic loop"
  },
  {
    id: "attention-geography",
    number: 8,
    title: "Attention Has Geography — Position Matters",
    keyQuestion: "Is the most important information positioned where the model attends most strongly?",
    triggerPhrase: "We affectionately refer to this manual process of optimizing context layout as 'Stochastic Graduate Descent.'",
    triggerSource: "Manus",
    naive: [
      "Places critical instructions in the middle of a long system prompt",
      "Lets the task objective get buried under 50 tool call results",
      "Assumes the model attends equally to all positions",
      "Never recites the objective after long action sequences"
    ],
    engineered: [
      "Places critical instructions at the very beginning AND very end (primacy + recency)",
      "Recites the objective at the end of context via a todo.md or scratchpad",
      "Designs context layout around the U-shaped attention curve",
      "Keeps the current goal within 'line of sight' of the generation position"
    ],
    failureStory: "A complex agent averaging 50 tool calls starts drifting from its objective around turn 30. The original task 'Migrate auth from JWT to OAuth2' has been pushed to position 15,000 — deep in the attention dead zone. The agent starts refactoring unrelated utility functions because that's what the recent context suggests.",
    crossValidation: ["Manus", "Liu et al.", "Anthropic", "HumanLayer"],
    appliesTo: "Most critical for: Brute-Force Long Context, any long-running agent"
  },
  {
    id: "file-system-memory",
    number: 9,
    title: "The File System Is Unlimited Context",
    keyQuestion: "Can this information live outside the context window and be retrieved on demand?",
    triggerPhrase: "If model progress is the rising tide, we want Manus to be the boat — not the pillar stuck to the seabed.",
    triggerSource: "Manus",
    naive: [
      "Keeps all retrieved documents in the context window simultaneously",
      "Loses information permanently when context is compacted",
      "Treats the context window as the only available memory",
      "Stores intermediate results only in context"
    ],
    engineered: [
      "Saves documents to files, keeps only paths + summaries in context",
      "Uses restorable compression — drops content but keeps URL/path for re-retrieval",
      "Treats the file system as unlimited, persistent, external memory",
      "Writes scratchpads, plans, and intermediate results to files"
    ],
    failureStory: "An agent researching a topic retrieves 15 web pages (75,000 tokens total). The raw content fills the context window, leaving no room for reasoning. The agent cannot synthesize because it has no 'thinking space' left — all capacity is consumed by raw data that should have been saved to files.",
    crossValidation: ["Manus", "Anthropic", "HumanLayer", "OpenHands"],
    appliesTo: "Most critical for: Cognitive Architecture, Multi-Agent, any research-heavy task"
  },
  {
    id: "three-layers",
    number: 10,
    title: "Context Has Three Layers: Static, Dynamic, Ephemeral",
    keyQuestion: "Which layer does this information belong to, and is it in the right one?",
    triggerPhrase: "The system prompt is the constitution. The conversation history is the dynamic state. The current turn is ephemeral.",
    triggerSource: "Synthesis (Anthropic + Manus + Fowler)",
    naive: [
      "Mixes system instructions with conversation history",
      "Puts dynamic information in the system prompt (invalidating cache)",
      "Treats all context as equally permanent or equally disposable",
      "No clear separation between what's always-on vs. per-turn"
    ],
    engineered: [
      "Static layer: system prompt, rules, tool definitions (stable, cached)",
      "Dynamic layer: retrieved context, compacted history, working memory (per-session)",
      "Ephemeral layer: current message, fresh tool results (this turn only)",
      "Each layer has different caching, compaction, and lifecycle policies"
    ],
    failureStory: "A team puts 'Current sprint goals: ...' in their system prompt, updating it daily. Every day, the entire KV-cache is invalidated for all users. Moving this to the dynamic layer (injected per-session) would preserve the cache while keeping the information fresh.",
    crossValidation: ["Anthropic", "Manus", "Martin Fowler/Böckeler"],
    appliesTo: "All approaches — this is the structural organizing principle"
  },
  {
    id: "tools-are-context",
    number: 11,
    title: "Tools Are Context Too",
    keyQuestion: "How many tokens are my tool definitions consuming, and does the model need all of them right now?",
    triggerPhrase: "Every tool definition, every schema, every description consumes tokens from the same finite budget as your instructions and retrieved documents.",
    triggerSource: "Manus / Martin Fowler",
    naive: [
      "Defines 50 tools with verbose descriptions, all loaded every turn",
      "Treats tool definitions as 'free' because they're in the system prompt",
      "Never audits the token cost of tool schemas",
      "Adds tools without removing unused ones"
    ],
    engineered: [
      "Audits tool definition token cost (often 500-2000 tokens per tool)",
      "Uses logit masking to hide tools without removing definitions (preserves cache)",
      "Loads tool sets contextually — file tools only when doing file operations",
      "Distinguishes Skills (instructions loaded into context) from Sub-agents (separate LLM calls)"
    ],
    failureStory: "An agent has 40 tool definitions consuming 25,000 tokens of context. On a simple text-editing task, it only needs 3 tools. The other 37 definitions waste 23,000 tokens AND confuse the model about which tool to select, causing tool selection errors 15% of the time.",
    crossValidation: ["Manus", "Martin Fowler/Böckeler", "Anthropic"],
    appliesTo: "Most critical for: Multi-Agent, Modular RAG, Rules Engineering"
  },
  {
    id: "isolation",
    number: 12,
    title: "Isolate to Prevent Contamination",
    keyQuestion: "Should this sub-task get its own clean context, or share the parent's?",
    triggerPhrase: "Each sub-agent explores extensively within its own context but returns only a condensed result to the parent — achieving both depth and efficiency.",
    triggerSource: "Anthropic",
    naive: [
      "Runs all sub-tasks in the same context window",
      "Lets one failed retrieval pollute the context for subsequent tasks",
      "Never separates exploration from synthesis",
      "Shares all tool outputs across all reasoning paths"
    ],
    engineered: [
      "Spawns sub-agents with clean, focused context for independent exploration",
      "Returns only condensed results from sub-agents to parent context",
      "Isolates retrieval results before deciding what enters main context",
      "Uses Skills (in-context instructions) for simple tasks, Sub-agents (separate calls) for complex ones"
    ],
    failureStory: "An agent researching 5 competitors does all research in one context. By competitor 3, the context is so polluted with competitor 1 and 2 data that the model starts confusing companies, attributing revenue figures from Company A to Company B. Spawning 5 sub-agents with isolated contexts eliminates cross-contamination.",
    crossValidation: ["Anthropic", "Manus", "LangChain"],
    appliesTo: "Most critical for: Multi-Agent Swarms, Modular RAG, complex research tasks"
  }
];

// ============================================================
// SKILLS vs SUB-AGENTS — A key distinction
// ============================================================

export const skillsVsSubAgents = {
  title: "Skills vs. Sub-Agents: When to Use Which",
  description: "One of the most important architectural decisions in context engineering is whether to load instructions into the current context (a Skill) or spawn a separate LLM call with its own context (a Sub-agent).",
  comparison: [
    { dimension: "Context", skill: "Shares parent's context window", subAgent: "Gets its own clean context window" },
    { dimension: "Cost", skill: "Free (just tokens in existing call)", subAgent: "Full additional LLM inference call" },
    { dimension: "Isolation", skill: "No isolation — can be contaminated", subAgent: "Full isolation — clean slate" },
    { dimension: "Depth", skill: "Limited by remaining context budget", subAgent: "Full context window available" },
    { dimension: "Latency", skill: "Zero additional latency", subAgent: "Additional round-trip latency" },
    { dimension: "Use When", skill: "Task is simple, context is clean, budget allows", subAgent: "Task is complex, needs deep exploration, or context is polluted" }
  ]
};

// ============================================================
// SOURCE CATALOG
// ============================================================

export interface Source {
  id: number;
  title: string;
  author: string;
  year: number;
  url: string;
  category: "framework" | "research" | "technical";
  contribution: string;
}

export const sources: Source[] = [
  { id: 1, title: "Effective Context Engineering for AI Agents", author: "Anthropic", year: 2025, url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", category: "framework", contribution: "Defines context engineering; attention budget; compaction; sub-agents; editorial retrieval" },
  { id: 2, title: "Context Engineering for AI Agents: Lessons from Building Manus", author: "Manus / Yichao Ji", year: 2025, url: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus", category: "framework", contribution: "KV-cache optimization; logit masking; file-system-as-context; error preservation; todo recitation" },
  { id: 3, title: "Context Engineering for Coding Agents", author: "Birgitta Böckeler / Martin Fowler", year: 2026, url: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html", category: "framework", contribution: "Context interfaces; Skills vs sub-agents; Hooks; illusion of control; tools as context" },
  { id: 4, title: "Advanced Context Engineering", author: "HumanLayer / Dex", year: 2025, url: "https://www.humanlayer.dev/blog/advanced-context-engineering", category: "framework", contribution: "Frequent intentional compaction; research-plan-implement pattern; 40-60% utilization" },
  { id: 5, title: "Context-Efficient Backpressure", author: "HumanLayer / Dex", year: 2025, url: "https://www.humanlayer.dev/blog/context-efficient-backpressure", category: "framework", contribution: "Smart zone (~75K tokens); deterministic output swallowing; fail-fast patterns" },
  { id: 6, title: "Writing a Good CLAUDE.md", author: "HumanLayer / Kyle", year: 2025, url: "https://www.humanlayer.dev/blog/writing-a-good-claude-md", category: "framework", contribution: "Instruction budget (~150-200); progressive disclosure; uniform decay phenomenon" },
  { id: 7, title: "OpenHands Context Condensation", author: "OpenHands", year: 2025, url: "https://www.openhands.dev/blog/openhands-context-condensensation-for-more-efficient-ai-agents", category: "framework", contribution: "Intelligent condensation; linear vs quadratic scaling; >50% cost reduction" },
  { id: 8, title: "The Rise of Context Engineering", author: "Harrison Chase / LangChain", year: 2025, url: "https://www.langchain.com/blog/the-rise-of-context-engineering", category: "framework", contribution: "Write-Select-Compress-Isolate framework; context as dynamic system" },
  { id: 9, title: "Lost in the Middle: How Language Models Use Long Contexts", author: "Liu et al.", year: 2023, url: "https://arxiv.org/abs/2307.03172", category: "research", contribution: "U-shaped attention curve; positional bias; middle-position performance drop" },
  { id: 10, title: "Gemini 1.5: Multimodal Understanding at Scale", author: "Google DeepMind", year: 2024, url: "https://arxiv.org/abs/2403.05530", category: "research", contribution: "1M token context; near-perfect single-needle recall; multi-needle degradation" },
  { id: 11, title: "RAG for Knowledge-Intensive NLP Tasks", author: "Lewis et al.", year: 2020, url: "https://arxiv.org/abs/2005.11401", category: "research", contribution: "Original RAG architecture; RAG-Sequence vs RAG-Token; non-parametric memory" },
  { id: 12, title: "From Local to Global: GraphRAG", author: "Edge et al.", year: 2024, url: "https://arxiv.org/abs/2404.16130", category: "research", contribution: "Graph-based retrieval; Leiden community detection; map-reduce QA; global sensemaking" },
  { id: 13, title: "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval", author: "Sarthi et al.", year: 2024, url: "https://arxiv.org/abs/2401.18059", category: "research", contribution: "Recursive abstractive processing; tree-organized retrieval; +20% accuracy" },
  { id: 14, title: "Modular RAG: Transforming RAG Systems into LEGO-like Frameworks", author: "Gao et al.", year: 2024, url: "https://arxiv.org/abs/2407.21059", category: "research", contribution: "LEGO-like reconfigurable RAG; module taxonomy; routing patterns" },
  { id: 15, title: "Agentic Information Retrieval: A Survey", author: "Singh et al.", year: 2025, url: "https://arxiv.org/abs/2501.09136", category: "research", contribution: "Reflection, planning, tool use in RAG; agentic retrieval patterns" },
  { id: 16, title: "MemGPT: Towards LLMs as Operating Systems", author: "Packer et al.", year: 2023, url: "https://arxiv.org/abs/2310.08560", category: "research", contribution: "LLM as OS; tiered memory; self-directed memory management; virtual context" },
  { id: 17, title: "CoALA: Cognitive Architectures for Language Agents", author: "Sumers et al.", year: 2023, url: "https://arxiv.org/abs/2309.02427", category: "research", contribution: "Cognitive architecture taxonomy; modular memory; decision procedures" },
  { id: 18, title: "Toolformer: Language Models Can Teach Themselves to Use Tools", author: "Schick et al.", year: 2023, url: "https://arxiv.org/abs/2302.04761", category: "research", contribution: "Self-supervised tool learning; tool use as context extension; API integration" },
  { id: 19, title: "ReAct: Synergizing Reasoning and Acting", author: "Yao et al.", year: 2022, url: "https://arxiv.org/abs/2210.03629", category: "research", contribution: "Reason-Act-Observe loop; interleaving reasoning with actions; the agentic paradigm" },
  { id: 20, title: "Building Effective Agents", author: "Anthropic", year: 2024, url: "https://www.anthropic.com/research/building-effective-agents", category: "research", contribution: "Agent design patterns; workflows vs agents; orchestration principles" },
  { id: 21, title: "RAGAS: Automated Evaluation of RAG", author: "Es et al.", year: 2023, url: "https://arxiv.org/abs/2309.15217", category: "research", contribution: "Automated RAG evaluation; faithfulness and relevance metrics" },
  { id: 22, title: "Context Rot", author: "Chroma Research", year: 2025, url: "https://research.trychroma.com/context-rot", category: "technical", contribution: "Empirical measurement of performance degradation with increasing context" },
  { id: 23, title: "LLMLingua: Prompt Compression", author: "Jiang et al.", year: 2023, url: "https://arxiv.org/abs/2310.05736", category: "technical", contribution: "Token-level perplexity filtering; 20x compression with minimal quality loss" },
  { id: 24, title: "Context Engineering for AI Agents in OSS", author: "Mohsenimofidi et al.", year: 2025, url: "https://arxiv.org/abs/2510.21413", category: "technical", contribution: "Empirical study of AGENTS.md adoption; instruction patterns in open-source" },
  { id: 25, title: "Beyond the Limits: A Survey on Context Length Extension", author: "Wang et al.", year: 2024, url: "https://arxiv.org/abs/2402.02244", category: "technical", contribution: "Survey of techniques to extend effective context length" },
  { id: 26, title: "A Survey on In-Context Learning", author: "Dong et al.", year: 2023, url: "https://arxiv.org/abs/2301.00234", category: "technical", contribution: "ICL mechanisms; learning from analogy; demonstration selection" },
  { id: 27, title: "RAG vs Long Context: A Comparative Study", author: "Phan et al.", year: 2024, url: "https://arxiv.org/abs/2407.07321", category: "technical", contribution: "1250x cost difference; 45x latency difference; complementary strengths" },
  { id: 28, title: "KV Cache Management Survey", author: "Li et al.", year: 2024, url: "https://arxiv.org/abs/2412.19442", category: "technical", contribution: "KV cache optimization techniques; eviction policies; compression methods" },
  { id: 29, title: "AI-native Memory: A Pathway from LLMs Towards AGI", author: "Shang et al.", year: 2024, url: "https://arxiv.org/abs/2406.18312", category: "technical", contribution: "Memory hierarchy for AI systems; pathway to persistent intelligence" },
  { id: 30, title: "LongMemEval: Benchmarking Long-Term Memory", author: "Wu et al.", year: 2024, url: "https://arxiv.org/abs/2410.10813", category: "technical", contribution: "Benchmarking long-term interactive memory across sessions" }
];

// ============================================================
// KEY METRICS
// ============================================================

export const metrics = [
  { metric: "KV-cache cost savings", value: "10x", detail: "0.30 vs 3.00 USD/MTok (cache hit vs miss)", source: "Manus" },
  { metric: "Input-to-output token ratio", value: "100:1", detail: "Context dominates the cost structure", source: "Manus" },
  { metric: "Average tool calls per task", value: "~50", detail: "Each is a context engineering decision", source: "Manus" },
  { metric: "Reliable instruction budget", value: "150-200", detail: "Beyond this, uniform decay occurs", source: "HumanLayer" },
  { metric: "Optimal context utilization", value: "40-60%", detail: "Leave headroom for reasoning quality", source: "HumanLayer" },
  { metric: "Smart zone for Claude", value: "~75K tokens", detail: "Effective < advertised context", source: "HumanLayer" },
  { metric: "Multi-needle retrieval drop", value: "96% → 74%", detail: "Long context ≠ reliable multi-retrieval", source: "Gemini 1.5" },
  { metric: "Context condensation savings", value: ">50% cost", detail: "Maintains quality while halving spend", source: "OpenHands" },
  { metric: "GraphRAG vs vector RAG", value: "+5-20%", detail: "Accuracy improvement on global questions", source: "Edge et al." },
  { metric: "RAG vs long context cost", value: "1250x cheaper", detail: "RAG remains economically dominant", source: "Phan et al." },
  { metric: "RAPTOR + GPT-4 improvement", value: "+20%", detail: "Hierarchical retrieval improves QA accuracy", source: "Sarthi et al." }
];

// ============================================================
// VOLUME ARC
// ============================================================

export const volumeArc = [
  { volume: "Vol. 1", discipline: "Prompt Engineering", unit: "One message", model: "output = f(prompt)", identity: "Communicator" },
  { volume: "Vol. 2", discipline: "Context Engineering", unit: "One turn (full window)", model: "output = f(context_window)", identity: "Information Architect" },
  { volume: "Vol. 3", discipline: "Harness Engineering", unit: "Many turns (system)", model: "agent = LLM + harness", identity: "Systems Engineer" }
];

// ============================================================
// PRACTITIONER'S CHECKLIST
// ============================================================

export interface ChecklistSection {
  title: string;
  items: string[];
}

export const practitionerChecklist: ChecklistSection[] = [
  {
    title: "Architecture Selection",
    items: [
      "Have I chosen my primary approach based on data characteristics (size, update frequency, query type)?",
      "Have I identified which secondary approaches to combine?",
      "Have I benchmarked against the simplest viable approach (avoid over-engineering)?",
      "Do I understand the cost/latency/accuracy tradeoffs of my chosen architecture?"
    ]
  },
  {
    title: "Static Layer (System Prompt + Rules + Tools)",
    items: [
      "Is my system prompt under 2000 tokens with clear role and constraints?",
      "Are my rules progressive? (root file → task-specific Skills loaded on demand)",
      "Is the total instruction count under 150 items?",
      "Are tool definitions minimal, well-described, and audited for token cost?",
      "Are stable elements placed FIRST to maximize KV-cache hits?",
      "Have I separated identity/persona from task instructions?"
    ]
  },
  {
    title: "Dynamic Layer (Retrieved Context + History + Working Memory)",
    items: [
      "Is context utilization monitored and maintained at 40-60%?",
      "Is compaction triggered proactively (at threshold), not reactively (at limit)?",
      "Are errors preserved as high-signal learning (never compacted)?",
      "Is retrieval editorial? (reranked, filtered, curated — not just top-k similarity)",
      "Is the objective recited near the end of context (attention geography)?",
      "Are intermediate results saved to files, not held in context?"
    ]
  },
  {
    title: "Ephemeral Layer (Current Turn)",
    items: [
      "Are tool results truncated after processing (keep decision, drop raw output)?",
      "Is deterministic filtering applied BEFORE content enters context?",
      "Are successful operations swallowed (single ✓ instead of full output)?",
      "Is there a fail-fast mechanism for runaway context growth?"
    ]
  },
  {
    title: "Token Economics & Performance",
    items: [
      "Is the KV-cache hit rate monitored as a production metric?",
      "Is the context append-only (no mid-prompt mutations)?",
      "Is cost per task tracked and optimized?",
      "Are timestamps and dynamic values placed LAST (not first)?",
      "Is tool availability managed via logit masking (not definition removal)?"
    ]
  },
  {
    title: "Attention Management",
    items: [
      "Are critical instructions at the START and END (primacy + recency)?",
      "Is there variation in phrasing to prevent pattern mimicry?",
      "Is the current goal within 'line of sight' of the generation position?",
      "After long action sequences, is the objective re-stated?"
    ]
  },
  {
    title: "Isolation & Multi-Agent",
    items: [
      "Do sub-agents get clean, focused context (not the parent's full history)?",
      "Are sub-agent results condensed before returning to parent?",
      "Am I using Skills (in-context) for simple tasks and Sub-agents (separate calls) for complex ones?",
      "Are tool outputs sandboxed/validated before entering main context?",
      "Is there cross-contamination between independent sub-tasks?"
    ]
  }
];
