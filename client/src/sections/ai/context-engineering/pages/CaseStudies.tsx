import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Layers, FileCode, Bot, Cpu, BookOpen, AlertTriangle } from "lucide-react";

/*
 * DESIGN: Cartographer's Workshop — Case Studies page
 * Warm parchment backgrounds, serif headings, structured analysis cards
 * Each case study: architecture diagram (text), approaches used, tenets applied, key insight
 */

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
};

interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  source: string;
  sourceUrl: string;
  icon: typeof Bot;
  overview: string;
  architecture: string[];
  primaryApproach: string;
  secondaryApproaches: string[];
  keyDecisions: { decision: string; rationale: string }[];
  tenetsApplied: { tenet: string; how: string }[];
  keyInsight: string;
  counterpoint: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "manus",
    name: "Manus",
    tagline: "The Context-First General Agent",
    source: "Manus Blog, 2025",
    sourceUrl: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus",
    icon: Cpu,
    overview: "Manus is a general-purpose AI agent that averages 50 tool calls per task with a 100:1 input-to-output token ratio. Their engineering team treats context engineering as the single most important discipline — more important than model selection, prompting technique, or tool design. Their key metric is KV-cache hit rate, which they monitor as obsessively as a trading firm monitors latency.",
    architecture: [
      "Single-agent with append-only prompt layout",
      "Static layer: system prompt + tool definitions (stable, cached)",
      "Dynamic layer: conversation history + retrieved context (managed)",
      "Ephemeral layer: current tool results (processed then cleared)",
      "File system as unlimited external memory (todo.md, scratchpads)",
      "Logit masking to control tool availability without removing definitions",
      "Context condensation at defined thresholds (not at the limit)"
    ],
    primaryApproach: "Cognitive Architecture / Memory Palace",
    secondaryApproaches: ["Rules Engineering (structured markdown instructions)", "Modular RAG (sub-agents for research tasks)"],
    keyDecisions: [
      { decision: "Timestamps placed LAST in the prompt, never first", rationale: "A timestamp at position 0 invalidates the entire KV-cache every second. Moving it to the end preserves cache for the stable prefix — saving 10x on token costs." },
      { decision: "Tool definitions kept stable; availability controlled via logit masking", rationale: "Removing/adding tool definitions between turns invalidates the cache. Logit masking achieves the same effect (model cannot select masked tools) while preserving the cached prefix." },
      { decision: "Todo.md recitation at the end of context", rationale: "After 30+ tool calls, the original objective drifts into the attention dead zone. Reciting the current plan near the generation position exploits recency bias to keep the agent on track." },
      { decision: "Errors are NEVER removed from context", rationale: "Erasing a failed 'pip install tensorflow' means the agent will try it again. The error message is the highest-signal token in context — it prevents infinite retry loops." }
    ],
    tenetsApplied: [
      { tenet: "Token Economics (#2)", how: "KV-cache hit rate is their #1 production metric. They coined 'Stochastic Graduate Descent' for the manual process of optimizing context layout." },
      { tenet: "Attention Geography (#8)", how: "Todo.md recitation exploits the U-shaped attention curve. Critical instructions at start (primacy) and end (recency)." },
      { tenet: "File System as Memory (#9)", how: "Core architectural principle. The file system is their 'disk' — context window is 'RAM.' Documents are saved to files, only paths + summaries kept in context." },
      { tenet: "Errors Are Evidence (#7)", how: "Failed actions and their error messages are treated as the highest-signal tokens. Never compacted, never removed." }
    ],
    keyInsight: "The KV-cache hit rate is the single most important metric for a production-stage AI agent. Every architectural decision — from prompt layout to tool management to timestamp placement — should be evaluated against its impact on cache efficiency. This is not a micro-optimization; it is a 10x cost difference.",
    counterpoint: "Manus's approach works because they control the full stack. Teams using third-party APIs (OpenAI, Anthropic) have less control over caching behavior and may not be able to implement logit masking or append-only layouts as cleanly."
  },
  {
    id: "cursor",
    name: "Cursor",
    tagline: "The Dynamic Discovery IDE",
    source: "Cursor Context Discovery Principles, 2026",
    sourceUrl: "https://medium.com/@ai-labs/cursors-new-context-discovery-principles-can-transform-how-you-use-any-ai-coding-tool-d379191d4f25",
    icon: FileCode,
    overview: "Cursor is an AI-powered IDE that has evolved from simple autocomplete to fully autonomous coding agents. Their core insight is counterintuitive: to get better results from models, provide LESS information in the context window. They implement 'dynamic context discovery' — information not needed right now should not be in the context window, but must be retrievable when needed.",
    architecture: [
      "Codebase-level semantic indexing (custom embedding model)",
      ".cursorrules / AGENTS.md for progressive disclosure",
      "Agent Skills: only name + description in context (~0.2% of tokens)",
      "MCP tool descriptions stored as files, discovered dynamically",
      "Long tool responses saved to .context/ folder (not kept in window)",
      "Chat history preserved as retrieval files (not just summarized)",
      "Terminal sessions logged to files, grepped when needed",
      "Background agents with fresh context per task"
    ],
    primaryApproach: "Rules Engineering / Markdown Filesystem",
    secondaryApproaches: ["Classic RAG (semantic search over codebase embeddings)", "Cognitive Architecture (file-based memory, context condensation)"],
    keyDecisions: [
      { decision: "Agent Skills expose only name + description in static context", rationale: "Five configured skills consume only ~0.2% of total tokens. The full skill content is lazy-loaded via grep or semantic search only when the agent determines it's relevant." },
      { decision: "MCP tool descriptions stored as files, not in context", rationale: "Dynamic discovery of MCP tools reduced token usage by 46.9%. The agent looks up tool schemas from files only when it needs them." },
      { decision: "Long tool responses saved to .context/ folder", rationale: "Instead of truncating (losing data) or keeping in context (bloating), save to file. The agent can re-read the file multiple times without re-calling the tool." },
      { decision: "Each new chat starts with fresh context", rationale: "Prevents 'memory overload' — accumulated context from previous tasks pollutes reasoning on the current task. Fresh context = focused agent." }
    ],
    tenetsApplied: [
      { tenet: "Progressive Disclosure (#4)", how: "Skills are lazy-loaded. Only names visible in context. Full instructions fetched on demand via semantic search." },
      { tenet: "Tools Are Context Too (#11)", how: "Dynamic tool discovery reduced usage by 46.9%. Tool schemas stored as files, not loaded into every turn." },
      { tenet: "File System as Memory (#9)", how: "Everything goes to .context/ folder — tool responses, chat history, terminal logs. Context window stays lean." },
      { tenet: "Deterministic Control (#6)", how: "Uses grep over files instead of asking the LLM to process raw logs. Pattern matching is deterministic and free." }
    ],
    keyInsight: "Less is more. The counterintuitive principle that providing FEWER tokens produces BETTER results is Cursor's core philosophy. Every piece of information has a cost: it consumes tokens, may confuse the model, and displaces potentially more relevant content. The question is not 'what CAN we include?' but 'what MUST we include?'",
    counterpoint: "Cursor's approach optimizes for short-lived coding tasks within a single repository. For long-running agents that must maintain state across hours of work (like Manus or Devin), fresh-context-per-chat would lose critical accumulated knowledge."
  },
  {
    id: "devin",
    name: "Devin",
    tagline: "The Single-Thread Maximalist",
    source: "Cognition Blog: 'Don't Build Multi-Agents', 2025",
    sourceUrl: "https://cognition.ai/blog/dont-build-multi-agents",
    icon: Bot,
    overview: "Devin is an autonomous software engineering agent built by Cognition. Their most provocative architectural stance: they explicitly reject multi-agent architectures for production systems. Their argument is that 'the decision-making ends up being too dispersed and context isn't able to be shared thoroughly enough between agents.' Instead, they invest heavily in a single-threaded agent with a fine-tuned compression model for context management.",
    architecture: [
      "Single-threaded linear agent (deliberately NOT multi-agent)",
      "Full context sharing — every action sees all previous context",
      "Fine-tuned smaller model for history compression/condensation",
      "Sub-agents only for investigation (answering questions, never writing code)",
      "Actions carry implicit decisions — no parallel conflicting decision-makers",
      "Compressed history preserves key details, events, and decisions"
    ],
    primaryApproach: "Cognitive Architecture / Memory Palace",
    secondaryApproaches: ["Rules Engineering (structured task breakdown)", "Explicitly REJECTS Multi-Agent Swarms"],
    keyDecisions: [
      { decision: "Single-threaded by design — no parallel decision-makers", rationale: "Principle 2: 'Actions carry implicit decisions, and conflicting decisions carry bad results.' Two agents working in parallel will make conflicting assumptions that are expensive to reconcile." },
      { decision: "Share full agent traces, not just individual messages", rationale: "Principle 1: Context must include the full history of actions and their results. Sharing only a summary or a single message loses the implicit decisions embedded in the trace." },
      { decision: "Fine-tuned a smaller model specifically for compression", rationale: "Generic summarization loses domain-specific details. A fine-tuned compressor knows what matters in a software engineering trace — architectural decisions, unresolved bugs, file paths." },
      { decision: "Sub-agents only answer questions, never write code", rationale: "Following Claude Code's pattern: sub-agents lack the full context needed to make code-writing decisions. They can investigate (read-only) and return findings to the main agent." }
    ],
    tenetsApplied: [
      { tenet: "Context Is World (#1)", how: "Every action must see the full context of all previous actions. This is their non-negotiable architectural constraint." },
      { tenet: "Compaction Is First-Class (#5)", how: "They invested in fine-tuning a dedicated compression model — treating compaction as a core ML problem, not an afterthought." },
      { tenet: "Isolation (#12)", how: "Sub-agents get isolated context for investigation only. Results are condensed before returning to the main thread." },
      { tenet: "Errors Are Evidence (#7)", how: "Implicit in 'share full traces' — the trace includes failures, which inform subsequent decisions." }
    ],
    keyInsight: "The multi-agent dream is premature. In 2025-2026, running multiple decision-making agents in collaboration produces fragile systems because context cannot be shared thoroughly enough between them. The resolution: invest in making your single-threaded agent better at compression, not in adding more agents. Parallelism will come 'for free' as single-agent communication improves.",
    counterpoint: "Anthropic's sub-agent pattern (used in Claude Code) works precisely because sub-agents are read-only investigators, not decision-makers. The tension between Devin and Anthropic resolves when you distinguish exploration (safe to parallelize) from decision-making (must be serial)."
  }
];

export default function CaseStudies() {
  useTitle("Case Studies — Context Engineering");
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="container py-16">
        <motion.div {...fadeIn}>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-sienna mb-3">
            Production Systems
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Case Studies
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            How three production systems — each handling millions of requests — implement context engineering differently. 
            These are not toy examples. Each represents a deliberate architectural bet, validated at scale, with real cost and reliability tradeoffs.
          </p>
        </motion.div>
      </section>

      {/* Comparison Matrix */}
      <section className="container pb-12">
        <motion.div {...fadeIn} className="overflow-x-auto">
          <table className="w-full text-sm border border-border/40 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left p-3 font-semibold">Dimension</th>
                <th className="text-left p-3 font-semibold">Manus</th>
                <th className="text-left p-3 font-semibold">Cursor</th>
                <th className="text-left p-3 font-semibold">Devin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr>
                <td className="p-3 font-medium">Primary Approach</td>
                <td className="p-3">Cognitive Architecture</td>
                <td className="p-3">Rules Engineering</td>
                <td className="p-3">Cognitive Architecture</td>
              </tr>
              <tr className="bg-muted/10">
                <td className="p-3 font-medium">Multi-Agent Stance</td>
                <td className="p-3">Selective (research only)</td>
                <td className="p-3">N/A (IDE, not agent)</td>
                <td className="p-3">Against (single-thread)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Context Strategy</td>
                <td className="p-3">KV-cache optimization</td>
                <td className="p-3">Dynamic discovery</td>
                <td className="p-3">Fine-tuned compressor</td>
              </tr>
              <tr className="bg-muted/10">
                <td className="p-3 font-medium">Memory Strategy</td>
                <td className="p-3">File system + todo.md</td>
                <td className="p-3">.context/ folder + grep</td>
                <td className="p-3">Compression model</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Key Innovation</td>
                <td className="p-3">Logit masking + append-only</td>
                <td className="p-3">Skills at 0.2% token cost</td>
                <td className="p-3">Shared full traces</td>
              </tr>
              <tr className="bg-muted/10">
                <td className="p-3 font-medium">Production Metric</td>
                <td className="p-3">KV-cache hit rate</td>
                <td className="p-3">Token utilization %</td>
                <td className="p-3">Trace coherence</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Core Philosophy</td>
                <td className="p-3">"Cache everything"</td>
                <td className="p-3">"Less is more"</td>
                <td className="p-3">"Share everything"</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Case Study Cards */}
      <section className="container pb-16">
        <div className="space-y-16">
          {caseStudies.map((cs, idx) => (
            <motion.article
              key={cs.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="border border-border/40 rounded-lg overflow-hidden"
            >
              {/* Case Study Header */}
              <div className="p-6 md:p-8 bg-muted/20 border-b border-border/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sienna/10 rounded-lg">
                    <cs.icon className="w-6 h-6 text-sienna" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                        {cs.name}
                      </h2>
                      <span className="text-sm text-muted-foreground italic">{cs.tagline}</span>
                    </div>
                    <a href={cs.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-sienna hover:underline">
                      {cs.source} →
                    </a>
                  </div>
                </div>
                <p className="mt-4 text-foreground/80 leading-relaxed">{cs.overview}</p>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* Architecture */}
                <div>
                  <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Architecture
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {cs.architecture.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-sienna mt-1">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approaches Used */}
                <div>
                  <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Approaches Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-sienna/10 text-sienna text-xs font-semibold rounded-full border border-sienna/20">
                      Primary: {cs.primaryApproach}
                    </span>
                    {cs.secondaryApproaches.map((a, i) => (
                      <span key={i} className="px-3 py-1 bg-muted/40 text-foreground/70 text-xs rounded-full border border-border/40">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Decisions */}
                <div>
                  <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Key Context Engineering Decisions
                  </h3>
                  <div className="space-y-3">
                    {cs.keyDecisions.map((kd, i) => (
                      <div key={i} className="p-3 bg-muted/10 border border-border/20 rounded-md">
                        <p className="text-sm font-medium text-foreground mb-1">{kd.decision}</p>
                        <p className="text-xs text-muted-foreground">{kd.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tenets Applied */}
                <div>
                  <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Tenets Applied
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {cs.tenetsApplied.map((t, i) => (
                      <div key={i} className="p-3 border border-border/30 rounded-md">
                        <p className="text-xs font-semibold text-sienna mb-1">{t.tenet}</p>
                        <p className="text-xs text-muted-foreground">{t.how}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Insight */}
                <div className="p-4 bg-sienna/5 border border-sienna/20 rounded-lg">
                  <h3 className="text-sm font-semibold text-sienna mb-2">Key Insight</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{cs.keyInsight}</p>
                </div>

                {/* Counterpoint */}
                <div className="p-4 bg-muted/20 border border-border/30 rounded-lg">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Counterpoint / Limitation
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cs.counterpoint}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Synthesis Section */}
      <section className="container pb-16">
        <motion.div {...fadeIn} className="p-6 md:p-8 border border-border/40 rounded-lg bg-muted/10">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Synthesis: What the Case Studies Reveal
          </h2>
          
          <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Cognitive Architecture Dominates Production</h3>
              <p>
                Two of three systems (Manus, Devin) chose Cognitive Architecture as their primary approach. 
                The third (Cursor) uses it as a secondary. This suggests that for long-running, multi-step tasks, 
                tiered memory management is not optional — it is the minimum viable architecture. The file system 
                as external memory is a universal pattern across all three.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">2. The Multi-Agent Debate Is Resolved</h3>
              <p>
                The apparent tension between Anthropic (pro-sub-agents) and Devin (anti-multi-agent) resolves 
                cleanly: <strong>parallelize exploration, serialize decision-making.</strong> Sub-agents are safe 
                for read-only investigation (answering questions, researching). They are dangerous for write 
                operations (writing code, making architectural choices). Manus threads this needle by using 
                sub-agents only for research tasks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">3. "Less Is More" Is Universal</h3>
              <p>
                Despite different architectures, all three converge on the same principle: the context window 
                should contain the <em>minimum necessary</em> information, not the <em>maximum available</em>. 
                Manus achieves this through append-only + condensation. Cursor achieves it through dynamic 
                discovery. Devin achieves it through fine-tuned compression. Three paths, one destination.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Compaction Is an ML Problem</h3>
              <p>
                Devin fine-tuned a dedicated model for compression. Manus uses intelligent condensation at 
                defined thresholds. Cursor saves to files and retrieves on demand. The common thread: 
                naive truncation is never acceptable. Compaction requires understanding what information 
                is high-signal and what is noise — and this judgment is itself a machine learning problem.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap gap-4">
            <Link href="/approaches">
              <span className="inline-flex items-center gap-2 text-sm text-sienna hover:underline">
                <ArrowRight className="w-4 h-4" /> Compare with the Six Approaches
              </span>
            </Link>
            <Link href="/tenets">
              <span className="inline-flex items-center gap-2 text-sm text-sienna hover:underline">
                <ArrowRight className="w-4 h-4" /> See all 12 Canonical Tenets
              </span>
            </Link>
            <Link href="/checklist">
              <span className="inline-flex items-center gap-2 text-sm text-sienna hover:underline">
                <ArrowRight className="w-4 h-4" /> Practitioner's Checklist
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
