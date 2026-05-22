import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

interface Recipe {
  id: string;
  tenet: string;
  title: string;
  description: string;
  language: string;
  code: string;
  explanation: string;
  category: "layout" | "compaction" | "retrieval" | "tools" | "memory";
}

const recipes: Recipe[] = [
  {
    id: "kv-cache-layout",
    tenet: "Tenet #2 — Token Economics",
    title: "KV-Cache-Safe Prompt Layout",
    description: "Structure your prompt so the stable prefix is never invalidated by dynamic content.",
    language: "python",
    category: "layout",
    code: `# ✗ WRONG: Timestamp at start invalidates entire KV-cache every call
messages = [
    {"role": "system", "content": f"Time: {datetime.now()}\\nYou are a helpful assistant..."},
    # ... rest of prompt (ALL cache-missed)
]

# ✓ CORRECT: Stable prefix first, dynamic content appended last
messages = [
    {"role": "system", "content": """You are a helpful assistant.
<rules>
1. Always cite sources
2. Use structured output
3. Follow the user's language
</rules>

<tools>
{STABLE_TOOL_DEFINITIONS}
</tools>"""},  # ← This entire block is KV-cached (10x cheaper)
    
    # Dynamic content AFTER the stable prefix
    {"role": "user", "content": f"[Context: {datetime.now()}]\\n{user_query}"},
]

# Result: System prompt cached at $0.30/MTok instead of $3.00/MTok`,
    explanation: "The KV-cache works on prefix matching. Any change to early tokens invalidates everything after it. By placing all stable content (system prompt, rules, tool definitions) first and all dynamic content (timestamps, retrieved docs, user messages) last, you maximize cache hits. Manus reports this as their single most impactful optimization."
  },
  {
    id: "deterministic-swallow",
    tenet: "Tenet #6 — Deterministic Control",
    title: "Output Swallowing Pattern",
    description: "Deterministically filter tool outputs before they enter context — don't waste tokens on noise.",
    language: "python",
    category: "tools",
    code: `import subprocess

def run_tests_filtered(test_path: str) -> str:
    """Run tests and return only actionable information."""
    result = subprocess.run(
        ["pytest", test_path, "--tb=short", "-q"],
        capture_output=True, text=True
    )
    
    if result.returncode == 0:
        # ✓ Swallow success — 5 tokens instead of 200 lines
        return "✓ All tests passed"
    
    # ✗ Only surface failures with context
    lines = result.stdout.split("\\n")
    failures = [l for l in lines if "FAILED" in l or "ERROR" in l]
    # Include the short traceback for debugging
    return f"✗ {len(failures)} failures:\\n" + result.stdout[-2000:]


def run_linter_filtered(file_path: str) -> str:
    """Run linter, only return errors (not warnings or passes)."""
    result = subprocess.run(
        ["ruff", "check", file_path, "--output-format=concise"],
        capture_output=True, text=True
    )
    
    if result.returncode == 0:
        return "✓ No lint errors"
    
    # Only errors, not the 50 lines of "all good" output
    return f"Lint errors:\\n{result.stdout[:1500]}"


def fetch_api_filtered(url: str, relevant_fields: list[str]) -> dict:
    """Fetch API response but only inject relevant fields into context."""
    import requests
    response = requests.get(url).json()
    
    # Don't dump the entire 5KB response — extract what matters
    return {k: response.get(k) for k in relevant_fields if k in response}`,
    explanation: "Every token of tool output that enters context competes with instructions and reasoning space. Successful operations carry zero information — the model already expected success. Only failures and their details are actionable. This pattern can reduce context consumption by 60-80% in agentic loops."
  },
  {
    id: "compaction-trigger",
    tenet: "Tenet #5 — Compaction Is First-Class",
    title: "Proactive Context Compaction",
    description: "Compact at defined thresholds, not at the limit. Summarize, don't truncate.",
    language: "python",
    category: "compaction",
    code: `from dataclasses import dataclass
from typing import Optional

@dataclass
class ContextBudget:
    max_tokens: int = 200_000
    target_utilization: float = 0.50  # 40-60% optimal
    compact_threshold: float = 0.65   # Trigger compaction here
    danger_threshold: float = 0.80    # Emergency compaction
    
    @property
    def compact_at(self) -> int:
        return int(self.max_tokens * self.compact_threshold)
    
    @property
    def danger_at(self) -> int:
        return int(self.max_tokens * self.danger_threshold)


def should_compact(current_tokens: int, budget: ContextBudget) -> str:
    """Check if compaction is needed. Returns action to take."""
    utilization = current_tokens / budget.max_tokens
    
    if utilization >= budget.danger_threshold:
        return "emergency_compact"  # Aggressive summarization
    elif utilization >= budget.compact_threshold:
        return "standard_compact"   # Normal summarization
    return "none"


async def compact_context(
    messages: list[dict],
    budget: ContextBudget,
    llm_client,
    mode: str = "standard_compact"
) -> list[dict]:
    """Intelligently compact conversation history."""
    
    # NEVER compact these:
    protected = []
    compactable = []
    
    for msg in messages:
        if msg.get("role") == "system":
            protected.append(msg)  # Static layer — never touch
        elif msg.get("metadata", {}).get("has_error"):
            protected.append(msg)  # Errors are evidence — keep them
        elif msg.get("metadata", {}).get("is_objective"):
            protected.append(msg)  # Current goal — keep visible
        else:
            compactable.append(msg)
    
    if not compactable:
        return messages
    
    # Summarize the compactable portion
    summary_prompt = """Summarize the following conversation history.
Preserve: decisions made, errors encountered, current state.
Discard: raw tool outputs, intermediate reasoning, successful operations.
Format: bullet points, max 500 tokens."""
    
    summary = await llm_client.summarize(
        content="\\n".join(m["content"] for m in compactable),
        prompt=summary_prompt
    )
    
    # Reconstruct: protected messages + summary + recent messages
    recent = compactable[-3:]  # Keep last 3 for recency
    
    return protected + [
        {"role": "assistant", "content": f"[Compacted history]\\n{summary}",
         "metadata": {"compacted": True}}
    ] + recent`,
    explanation: "The key insight: compact at 65% utilization, not at 100%. This preserves cache efficiency (the compacted version becomes a stable prefix) and maintains reasoning quality. Never compact errors (they prevent retry loops) or the current objective (attention geography). OpenHands showed this transforms cost scaling from quadratic to linear."
  },
  {
    id: "progressive-skills",
    tenet: "Tenet #4 — Progressive Disclosure",
    title: "Lazy-Loading Skills Pattern",
    description: "Load task-specific instructions on demand instead of stuffing everything into the system prompt.",
    language: "typescript",
    category: "layout",
    code: `// skills/index.ts — Skill registry with lazy loading
interface Skill {
  id: string;
  trigger: string[];  // Keywords that activate this skill
  tokenCost: number;  // Budget awareness
  load: () => Promise<string>;  // Lazy loader
}

const skillRegistry: Skill[] = [
  {
    id: "database-migration",
    trigger: ["migrate", "schema", "database", "SQL"],
    tokenCost: 800,
    load: async () => \`
## Database Migration Conventions
- Always create reversible migrations (up + down)
- Name format: YYYYMMDD_HHMMSS_description.sql
- Test migrations on a copy before applying to production
- Include data backfill scripts when changing column types
- Never drop columns without a deprecation period
\`
  },
  {
    id: "testing",
    trigger: ["test", "spec", "coverage", "jest", "vitest"],
    tokenCost: 600,
    load: async () => \`
## Testing Conventions
- Unit tests: colocate with source (file.test.ts)
- Integration tests: /tests/integration/
- Use factories for test data, never raw fixtures
- Minimum 80% coverage for new code
- Mock external services, never hit real APIs in tests
\`
  },
  {
    id: "api-design",
    trigger: ["endpoint", "route", "API", "REST", "handler"],
    tokenCost: 700,
    load: async () => \`
## API Design Conventions
- RESTful naming: plural nouns, no verbs
- Always version APIs: /api/v1/resources
- Use proper HTTP status codes (201 for creation, 204 for deletion)
- Validate input with Zod schemas at the boundary
- Return consistent error format: { error: string, details?: object }
\`
  }
];

// Root instruction file (always in context — kept minimal)
const ROOT_INSTRUCTIONS = \`
You are a senior engineer. Follow project conventions.
When working on specific areas, relevant conventions will be loaded automatically.
Current active skills will appear below when triggered.
\`;

// Skill loader — called each turn based on user message
async function loadRelevantSkills(
  userMessage: string,
  currentBudget: number,
  maxSkillBudget: number = 3000
): Promise<string[]> {
  const messageLower = userMessage.toLowerCase();
  let budgetUsed = 0;
  const loaded: string[] = [];
  
  for (const skill of skillRegistry) {
    if (budgetUsed >= maxSkillBudget) break;
    
    const triggered = skill.trigger.some(t => 
      messageLower.includes(t.toLowerCase())
    );
    
    if (triggered && budgetUsed + skill.tokenCost <= maxSkillBudget) {
      const content = await skill.load();
      loaded.push(content);
      budgetUsed += skill.tokenCost;
    }
  }
  
  return loaded;
}`,
    explanation: "HumanLayer's research shows frontier models reliably follow only ~150-200 instructions. A 400-line conventions file causes uniform decay across ALL instructions. The solution: keep the root file under 60 lines with pointers, then lazy-load task-specific 'Skills' based on the current message. This keeps the instruction budget healthy while providing deep guidance when needed."
  },
  {
    id: "error-preservation",
    tenet: "Tenet #7 — Errors Are Evidence",
    title: "Error-Preserving Context Management",
    description: "Structure errors as high-signal learning that survives compaction and prevents retry loops.",
    language: "python",
    category: "memory",
    code: `from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

@dataclass
class ActionResult:
    action: str
    success: bool
    output: Optional[str] = None
    error: Optional[str] = None
    timestamp: datetime = field(default_factory=datetime.now)
    
    def to_context_entry(self) -> str:
        """Convert to minimal context representation."""
        if self.success:
            # Swallow success details — just confirm it worked
            return f"✓ {self.action}"
        else:
            # Preserve FULL error context — this is high-signal
            return f"""✗ FAILED: {self.action}
Error: {self.error}
[This approach has been tried and failed. Do NOT retry without a different strategy.]"""


class ErrorMemory:
    """Maintains a persistent record of failures that survives compaction."""
    
    def __init__(self):
        self.failures: list[ActionResult] = []
    
    def record(self, result: ActionResult):
        if not result.success:
            self.failures.append(result)
    
    def get_failure_context(self) -> str:
        """Generate context block that MUST be included in every turn."""
        if not self.failures:
            return ""
        
        lines = ["## Previous Failures (DO NOT RETRY THESE)"]
        for f in self.failures[-10:]:  # Keep last 10 failures
            lines.append(f"- ✗ {f.action}: {f.error}")
        
        return "\\n".join(lines)
    
    def has_tried(self, action: str) -> bool:
        """Check if an action has already been attempted and failed."""
        return any(
            f.action.lower().strip() == action.lower().strip() 
            for f in self.failures
        )


# Usage in an agentic loop:
error_memory = ErrorMemory()

async def agent_step(context: list[dict], llm_client) -> ActionResult:
    # Inject failure memory into context (survives compaction)
    failure_block = error_memory.get_failure_context()
    if failure_block:
        # Place near the END for recency attention
        context.append({
            "role": "system",
            "content": failure_block,
            "metadata": {"has_error": True, "protected": True}
        })
    
    # ... agent decides and acts ...
    result = await execute_action(context, llm_client)
    error_memory.record(result)
    return result`,
    explanation: "Manus discovered that erasing failures removes evidence. Without evidence of what failed, the model will try the exact same approach again — creating infinite retry loops. Errors are the highest-signal tokens in context: they update the model's beliefs about what works. The pattern: swallow successes (low signal), preserve failures (high signal), and protect them from compaction."
  },
  {
    id: "editorial-retrieval",
    tenet: "Tenet #3 — Retrieval Is Editorial",
    title: "Multi-Stage Editorial Retrieval",
    description: "Retrieve broadly, then curate ruthlessly. Similarity ≠ relevance.",
    language: "python",
    category: "retrieval",
    code: `from dataclasses import dataclass
from typing import Optional

@dataclass
class RetrievedChunk:
    content: str
    source: str
    similarity_score: float
    relevance_score: Optional[float] = None
    recency_weight: float = 1.0
    authority_weight: float = 1.0
    token_count: int = 0

async def editorial_retrieval(
    query: str,
    vector_store,
    reranker,
    token_budget: int = 4000,
) -> list[RetrievedChunk]:
    """
    Three-stage editorial retrieval:
    1. Cast a wide net (retrieve many)
    2. Rerank by task relevance (not just similarity)
    3. Budget-fit (select what earns its tokens)
    """
    
    # Stage 1: Broad retrieval (cast wide net)
    candidates = await vector_store.search(
        query=query,
        top_k=20,  # Retrieve MORE than you need
        include_metadata=True
    )
    
    # Stage 2: Rerank by TASK RELEVANCE (not just similarity)
    reranked = await reranker.rerank(
        query=query,
        documents=[c.content for c in candidates],
        top_k=10
    )
    
    for i, chunk in enumerate(candidates[:10]):
        chunk.relevance_score = reranked[i].score
        # Apply editorial weights
        chunk.relevance_score *= chunk.recency_weight
        chunk.relevance_score *= chunk.authority_weight
    
    # Stage 3: Budget-fit (greedy selection by relevance/token ratio)
    candidates.sort(key=lambda c: (c.relevance_score or 0), reverse=True)
    
    selected = []
    tokens_used = 0
    
    for chunk in candidates:
        if tokens_used + chunk.token_count > token_budget:
            continue  # Skip if over budget
        if chunk.relevance_score and chunk.relevance_score < 0.3:
            break  # Stop if quality drops below threshold
        
        selected.append(chunk)
        tokens_used += chunk.token_count
    
    # Deduplicate (remove near-identical chunks)
    return deduplicate(selected, threshold=0.85)


def deduplicate(chunks: list[RetrievedChunk], threshold: float) -> list[RetrievedChunk]:
    """Remove chunks that are >85% similar to already-selected ones."""
    unique = []
    for chunk in chunks:
        is_duplicate = any(
            text_similarity(chunk.content, u.content) > threshold
            for u in unique
        )
        if not is_duplicate:
            unique.append(chunk)
    return unique`,
    explanation: "Anthropic's key insight: retrieval is editorial, not lookup. Cosine similarity measures semantic closeness but NOT task relevance. A legal document's introduction mentions 'penalties' and 'filing' (high similarity) but contains no actual penalty amounts (low relevance). The three-stage pattern — broad retrieval → reranking → budget-fitting — ensures only the most task-relevant chunks earn their place in the context window."
  },
  {
    id: "todo-recitation",
    tenet: "Tenet #8 — Attention Geography",
    title: "Objective Recitation via Scratchpad",
    description: "Keep the current goal within 'line of sight' of the generation position using a todo.md pattern.",
    language: "typescript",
    category: "memory",
    code: `// scratchpad.ts — Maintains a persistent scratchpad that recites the objective
// near the END of context (recency position = high attention)

interface ScratchpadState {
  objective: string;
  currentStep: string;
  completedSteps: string[];
  blockers: string[];
  keyDecisions: string[];
}

function buildScratchpadBlock(state: ScratchpadState): string {
  // This block is injected NEAR THE END of context every turn
  // Leveraging recency bias to keep the model on track
  return \`
## Current Scratchpad (Updated Every Turn)

### Objective
\${state.objective}

### Current Step
\${state.currentStep}

### Progress
\${state.completedSteps.map((s, i) => \`\${i + 1}. ✓ \${s}\`).join('\\n')}

### Blockers
\${state.blockers.length > 0 ? state.blockers.map(b => \`- ⚠ \${b}\`).join('\\n') : '- None'}

### Key Decisions Made
\${state.keyDecisions.slice(-5).map(d => \`- \${d}\`).join('\\n')}
\`;
}

// In the agent loop, inject scratchpad at the end of messages:
function buildContextWithRecitation(
  systemPrompt: string,
  conversationHistory: Message[],
  retrievedContext: string,
  scratchpad: ScratchpadState,
  userMessage: string
): Message[] {
  return [
    // Position 1 (PRIMACY): System prompt with rules
    { role: "system", content: systemPrompt },
    
    // Position 2-N (MIDDLE): History + retrieved context
    // This is the "attention dead zone" — put bulk data here
    ...conversationHistory,
    { role: "system", content: \`[Retrieved Context]\\n\${retrievedContext}\` },
    
    // Position N-1 (RECENCY): Scratchpad recitation
    // High attention here — model "sees" this clearly
    { role: "system", content: buildScratchpadBlock(scratchpad) },
    
    // Position N (MOST RECENT): User's current message
    { role: "user", content: userMessage }
  ];
}`,
    explanation: "Manus calls this 'todo recitation' — after 30+ tool calls, the original objective has been pushed deep into the attention dead zone (middle positions). The model starts drifting. The fix: maintain a scratchpad that recites the current objective near the END of context every turn, leveraging recency bias. This is why Manus's agents maintain a todo.md that gets appended to context — it's an attention geography hack."
  },
  {
    id: "sub-agent-isolation",
    tenet: "Tenet #12 — Isolation",
    title: "Sub-Agent Context Isolation",
    description: "Spawn sub-agents with clean, focused context. Return only condensed results to the parent.",
    language: "python",
    category: "tools",
    code: `from dataclasses import dataclass
from typing import Callable, Any

@dataclass
class SubAgentResult:
    """Condensed result returned to parent context."""
    summary: str       # Max 500 tokens — the editorial output
    confidence: float  # 0-1 confidence score
    sources: list[str] # References for verification
    raw_tokens_used: int  # How much the sub-agent explored

async def spawn_sub_agent(
    task: str,
    context_docs: list[str],
    llm_client,
    max_tokens: int = 100_000,
) -> SubAgentResult:
    """
    Spawn a sub-agent with CLEAN, ISOLATED context.
    
    Key principle: The sub-agent explores extensively within its own
    context window but returns ONLY a condensed result to the parent.
    This achieves both depth AND efficiency.
    """
    
    # Clean context — no parent history, no cross-contamination
    sub_context = [
        {"role": "system", "content": f"""You are a focused research agent.
Task: {task}
Constraints: Be thorough but concise in your final answer.
Return: A summary (max 500 tokens), confidence score, and key sources."""},
        {"role": "user", "content": "\\n\\n".join(context_docs)}
    ]
    
    # Sub-agent explores deeply in its own window
    result = await llm_client.chat(sub_context, max_tokens=max_tokens)
    
    # Parse and CONDENSE before returning to parent
    return SubAgentResult(
        summary=result.summary,  # Only this enters parent context
        confidence=result.confidence,
        sources=result.sources,
        raw_tokens_used=result.usage.total_tokens
    )


async def fan_out_research(
    topics: list[str],
    retriever,
    llm_client
) -> str:
    """
    Fan-out pattern: spawn N sub-agents, each with isolated context.
    Fan-in: collect condensed results into parent context.
    """
    import asyncio
    
    # Fan-out: parallel sub-agents with isolated contexts
    tasks = []
    for topic in topics:
        docs = await retriever.search(topic, top_k=10)
        tasks.append(spawn_sub_agent(
            task=f"Research: {topic}",
            context_docs=[d.content for d in docs],
            llm_client=llm_client
        ))
    
    results = await asyncio.gather(*tasks)
    
    # Fan-in: ONLY condensed summaries enter parent context
    # Each sub-agent may have used 50K tokens internally,
    # but only ~500 tokens of summary enter the parent
    parent_context = "## Research Results\\n\\n"
    for topic, result in zip(topics, results):
        parent_context += f"### {topic}\\n"
        parent_context += f"{result.summary}\\n"
        parent_context += f"(Confidence: {result.confidence:.0%}, "
        parent_context += f"Sources: {len(result.sources)})\\n\\n"
    
    return parent_context  # ~2500 tokens instead of ~250,000`,
    explanation: "Anthropic's key pattern for multi-agent systems: each sub-agent explores extensively within its own context but returns only a condensed result to the parent. This prevents cross-contamination (competitor A's data polluting competitor B's analysis) while achieving both depth (sub-agent has full context budget) and efficiency (parent only receives summaries). The fan-out/fan-in pattern is the architectural embodiment of context isolation."
  }
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  layout: { label: "Layout & Structure", color: "bg-blue-50 text-blue-700" },
  compaction: { label: "Compaction", color: "bg-amber-50 text-amber-700" },
  retrieval: { label: "Retrieval", color: "bg-purple-50 text-purple-700" },
  tools: { label: "Tools & Agents", color: "bg-green-50 text-green-700" },
  memory: { label: "Memory & State", color: "bg-teal-50 text-teal-700" }
};

export default function Recipes() {
  useTitle("Recipes — Context Engineering");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRecipes = activeCategory === "all"
    ? recipes
    : recipes.filter(r => r.category === activeCategory);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn}>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
            Implementation Patterns
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Recipes
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Concrete implementation snippets for each tenet. Copy-paste these patterns into your codebase. Each recipe includes the code, the tenet it implements, and a detailed explanation of why it works.
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 text-xs font-sans font-medium rounded-md transition-colors ${
                activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({recipes.length})
            </button>
            {Object.entries(categoryLabels).map(([key, { label }]) => {
              const count = recipes.filter(r => r.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1.5 text-xs font-sans font-medium rounded-md transition-colors ${
                    activeCategory === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Recipes */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="border border-border/60 rounded-lg overflow-hidden bg-card">
              {/* Recipe Header */}
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-sans font-medium px-2 py-0.5 rounded ${categoryLabels[recipe.category].color}`}>
                    {categoryLabels[recipe.category].label}
                  </span>
                  <span className="text-xs font-mono text-sienna">{recipe.tenet}</span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                  {recipe.title}
                </h3>
                <p className="text-sm text-muted-foreground">{recipe.description}</p>
              </div>

              {/* Code Block */}
              <div className="relative">
                <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-[#313244]">
                  <span className="text-xs font-mono text-[#a6adc8]">{recipe.language}</span>
                  <button
                    onClick={() => copyCode(recipe.id, recipe.code)}
                    className="text-xs font-sans text-[#a6adc8] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedId === recipe.id ? (
                      <><Check className="w-3 h-3" /> Copied</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy</>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-[#1e1e2e] overflow-x-auto text-sm leading-relaxed">
                  <code className="text-[#cdd6f4] font-mono text-xs">
                    {recipe.code}
                  </code>
                </pre>
              </div>

              {/* Explanation */}
              <div className="p-6 bg-muted/20 border-t border-border/40">
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Why This Works
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {recipe.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
