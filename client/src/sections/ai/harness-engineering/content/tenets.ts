export type Tenet = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  accentColor: string; // OKLCH color
  accentClass: string; // tailwind-friendly bg class via inline style
  shortDefinition: string;
  longDefinition: string;
  keyQuestion: string;
  triggerPhrases: { phrase: string; source: string }[];
  bestPractices: string[];
  naive: { title: string; code: string; problem: string };
  engineered: { title: string; code: string; benefit: string };
  sources: string[];
};

export const TENETS: Tenet[] = [
  {
    id: "harness-is-artifact",
    number: 1,
    title: "The Harness is the Artifact",
    subtitle: "Not the model — the system around it.",
    accentColor: "oklch(0.65 0.15 250)",
    accentClass: "tenet-1",
    shortDefinition:
      "The model is a commodity input. The harness is where your engineering value lives.",
    longDefinition:
      "A raw LLM is not an agent — it is a reasoning engine. The harness is the operating system that surrounds the model: the loop, the tools, the context, the hooks, and the state. When agents misbehave, the instinct to blame the model is almost always wrong. A decent model with a great harness reliably outperforms a great model with a bad harness, because the harness is what turns probabilistic output into deterministic behavior.",
    keyQuestion: "Are you blaming the model for a configuration problem?",
    triggerPhrases: [
      { phrase: "A decent model with a great harness beats a great model with a bad harness.", source: "Addy Osmani" },
      { phrase: "It's not a model problem. It's a configuration problem.", source: "HumanLayer" },
      { phrase: "Models are over-fitted to their own training harnesses.", source: "Anthropic" },
      { phrase: "The harness is your engineering surface.", source: "WalkingLabs" },
    ],
    bestPractices: [
      "Treat the harness — not the prompt — as your primary engineering deliverable.",
      "Don't wait for the next model version to fix systemic problems.",
      "Recognize when frontier-model behaviors degrade in your harness because they were trained on a different one.",
      "Make harness configuration version-controlled, reviewable, and testable like any other production code.",
    ],
    naive: {
      title: "Naive Harness",
      code: `# system_prompt.txt
You are an expert React developer.
CRITICAL: Do NOT use deprecated React 17 patterns.
You MUST use hooks. NEVER use class components.
Be very careful. This is important.`,
      problem:
        "Pleading with the model in the system prompt has no structural enforcement. The model will violate this rule whenever its training distribution disagrees with the instruction.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `# .agent/hooks/post_edit.sh
#!/usr/bin/env bash
set -e
FILE="$1"

# AST-level enforcement
npx eslint --rule 'react/no-deprecated: error' "$FILE" \\
  || { echo "BLOCKED: deprecated React API"; exit 1; }

# Pattern-level enforcement
if grep -qE 'componentWillMount|componentWillReceiveProps' "$FILE"; then
  echo "BLOCKED: legacy lifecycle method"
  exit 1
fi`,
      benefit:
        "The hook intercepts every edit and feeds the linter error back into the loop. The agent self-corrects within seconds. The rule is structural — it works for any model, any session, forever.",
    },
    sources: ["Addy Osmani", "HumanLayer", "Anthropic"],
  },
  {
    id: "cybernetic-loop",
    number: 2,
    title: "The Cybernetic Loop",
    subtitle: "Feedforward guides + feedback sensors.",
    accentColor: "oklch(0.72 0.16 70)",
    accentClass: "tenet-2",
    shortDefinition:
      "A reliable agent is regulated by guides that steer it before action and sensors that correct it after.",
    longDefinition:
      "Martin Fowler frames the harness as a cybernetic governor. Two control mechanisms operate in tension: feedforward controls (specs, AGENTS.md, coding conventions, progressive disclosure) shape behavior before the agent acts, while feedback controls (linters, type checkers, tests, screenshots, end-to-end runs) observe what actually happened and inject corrections back into the loop. Effective harnesses use both — and they keep verification loops fast, deterministic, and verbose only on failure. As Anthropic puts it: success is silent, failures are loud.",
    keyQuestion: "How does the agent know what to do, and how does it know if it succeeded?",
    triggerPhrases: [
      { phrase: "Success is silent, failures are verbose.", source: "Anthropic" },
      { phrase: "Shift quality checks left in the agent lifecycle.", source: "Martin Fowler" },
      { phrase: "Computational checks are cheap; inferential checks are expensive.", source: "Martin Fowler" },
      { phrase: "End-to-end testing capability is non-negotiable.", source: "Anthropic" },
    ],
    bestPractices: [
      "Combine feedforward (rules, specs) with feedback (linters, tests) — neither is sufficient alone.",
      "Prefer deterministic, computational checks over LLM-judge inferential checks where possible.",
      "Keep tool-result outputs short on success and detailed only on failure.",
      "Make the quality loop run in seconds, not minutes — speed determines whether agents self-correct.",
    ],
    naive: {
      title: "Naive Harness",
      code: `# Agent task: Write database migration

> Agent writes migration.sql
> Agent says "Migration looks correct."
> Human reviews PR 4 hours later
> Migration fails on staging
> Human files bug, restarts loop`,
      problem:
        "No feedback sensor. The agent's confidence is uncalibrated. Errors only surface in the human review loop, hours after the work was done.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `# .agent/post_tool_call/migration_check.sh
#!/usr/bin/env bash
docker run --rm -v "$PWD":/m postgres:16 \\
  psql -f /m/migration.sql || exit 1

# Verify rollback works too
docker run --rm -v "$PWD":/m postgres:16 \\
  psql -f /m/rollback.sql || {
    echo "BLOCKED: rollback failed for migration"
    exit 1
  }
echo "OK: migration + rollback verified"`,
      benefit:
        "The harness boots a Postgres container, applies the migration, applies the rollback, and only marks the task done if both succeed. The agent gets a verifiable answer in seconds.",
    },
    sources: ["Martin Fowler", "Anthropic", "WalkingLabs"],
  },
  {
    id: "context-budget",
    number: 3,
    title: "Context is a Budget, Not a Dump",
    subtitle: "Working memory is scarce. Curate ruthlessly.",
    accentColor: "oklch(0.65 0.14 160)",
    accentClass: "tenet-3",
    shortDefinition:
      "The context window is the agent's working memory. Filling it with irrelevant content causes context rot and degraded reasoning.",
    longDefinition:
      "Every token in the context competes for the model's limited attention. Bloated tool outputs, dead conversation turns, and over-eager tool catalogs all silently degrade reasoning long before the window technically fills up. Anthropic also documents 'context anxiety' — models that prematurely wrap up work when they sense the limit approaching. The harness must own the context window: compact old turns, offload large outputs to the filesystem, progressively disclose tools and skills, and reset the context entirely on long-running tasks.",
    keyQuestion: "Is the agent drowning in irrelevant information?",
    triggerPhrases: [
      { phrase: "Own your context window.", source: "HumanLayer (Factor 3)" },
      { phrase: "Compact long sessions before they rot.", source: "Anthropic" },
      { phrase: "Progressive disclosure beats one fat system prompt.", source: "Anthropic" },
      { phrase: "Watch for context anxiety — premature wrap-ups.", source: "Anthropic" },
    ],
    bestPractices: [
      "Offload large tool outputs (logs, files, search results) to disk; inject only references.",
      "Use progressive disclosure: load skill instructions only when the relevant trigger appears.",
      "Compact or summarize old turns once the window crosses ~50% utilization.",
      "Perform full context resets between phases of long tasks; rehydrate from durable state.",
    ],
    naive: {
      title: "Naive Harness",
      code: `# Test runner outputs 12,000 lines of logs
test_output = run_tests()  # 12k lines
context.append(test_output)
# Agent now has 38k tokens of stack traces
# Forgets original task, hallucinates fixes`,
      problem:
        "The full log is dumped into context. The model loses focus, mis-reads the original task, and produces low-quality patches.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `# Harness intercepts tool output
result = run_tests()
key = f"/runs/{run_id}.log"
fs.write(key, result.full_text)

context.append({
  "summary": result.head(50) + "\\n...\\n" + result.tail(50),
  "saved_to": key,
  "hint": "Use grep_file to search the full log."
})`,
      benefit:
        "Context stays clean. The agent sees a curated head/tail and a pointer; it can pull more on demand. Reasoning quality is preserved.",
    },
    sources: ["Anthropic", "HumanLayer", "WalkingLabs"],
  },
  {
    id: "state-externalization",
    number: 4,
    title: "State Must Be Externalized",
    subtitle: "Durable artifacts survive context resets.",
    accentColor: "oklch(0.68 0.16 50)",
    accentClass: "tenet-4",
    shortDefinition:
      "Long-running tasks will outlive any context window. The agent must externalize its state into durable, structured artifacts.",
    longDefinition:
      "If the agent's context were wiped right now, could a fresh agent pick up exactly where it left off? If the answer is no, the harness has a state-externalization gap. Anthropic recommends a two-fold structure: a structured progress file (JSON, never markdown — markdown gets accidentally rewritten) plus frequent git commits as the durable record of work. HumanLayer's Factor 5 calls this 'unify execution state.' The harness must enforce externalization before each phase boundary, not after a failure.",
    keyQuestion:
      "If the agent's context was wiped right now, could a new agent pick up exactly where it left off?",
    triggerPhrases: [
      { phrase: "Unify execution state.", source: "HumanLayer (Factor 5)" },
      { phrase: "Use JSON for feature lists — models overwrite markdown.", source: "Anthropic" },
      { phrase: "Git commits are the agent's durable memory.", source: "Anthropic" },
      { phrase: "A clean state must precede the next feature.", source: "Anthropic" },
    ],
    bestPractices: [
      "Maintain a feature_list.json (not .md) as the canonical progress file.",
      "Require a green test run and a clean git status before starting the next feature.",
      "Use structured handoff files when one agent passes work to another.",
      "Treat git history as a first-class harness component, not an afterthought.",
    ],
    naive: {
      title: "Naive Harness",
      code: `// Plan held only in the agent's context
agent.run(\"Build 10-feature app: auth, dashboard, ...\")
// 3 hours in, context fills up
// Agent forgets feature 1, overwrites work
// No way to recover progress`,
      problem:
        "All progress lives in volatile context. A single context reset destroys hours of work. The agent loses track of what it has and hasn't done.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `// feature_list.json — durable state
{
  "features": [
    { "id": "auth", "status": "done", "commit": "a3f9c1" },
    { "id": "dashboard", "status": "in_progress",
      "started_at": 1730000000 },
    { "id": "billing", "status": "todo" }
  ]
}

// Phase boundary hook
on_phase_boundary:
  require_clean_git_status()
  require_green_tests()
  context.reset()  # full wipe
  context.inject(read("feature_list.json"))
  context.inject(git_log("--last=20"))`,
      benefit:
        "Any context reset is recoverable. A fresh agent reads feature_list.json plus the git log and resumes exactly where the previous instance stopped. No work is lost.",
    },
    sources: ["Anthropic", "HumanLayer"],
  },
  {
    id: "the-ratchet",
    number: 5,
    title: "The Ratchet",
    subtitle: "Every mistake becomes a rule.",
    accentColor: "oklch(0.65 0.20 25)",
    accentClass: "tenet-5",
    shortDefinition:
      "Every agent mistake is a permanent signal. The harness tightens with each failure so that specific failure becomes structurally impossible.",
    longDefinition:
      "The ratchet is the discipline that turns one-off errors into systemic guarantees. When the agent makes a mistake, you do not scold it in chat — you change the harness. You add a hook, a regex filter, a forbidden-tool list, or a new rule in AGENTS.md, and you tie that rule to the specific incident that produced it. Over time the harness becomes a precise, traceable record of every failure mode you have eliminated. Crucially, the ratchet works in both directions: when models become capable enough to no longer need a constraint, you remove it.",
    keyQuestion:
      "Have you engineered the system so the agent never makes this specific mistake again?",
    triggerPhrases: [
      { phrase: "The ratchet: every mistake becomes a rule.", source: "Addy Osmani" },
      { phrase: "Trace every rule to a specific incident.", source: "Mitchell Hashimoto" },
      { phrase: "Constraints are rented, not owned — remove them when no longer needed.", source: "WalkingLabs" },
      { phrase: "Don't add a rule for a hypothetical failure.", source: "Addy Osmani" },
    ],
    bestPractices: [
      "Only add constraints in response to actual observed failures.",
      "Annotate every rule in AGENTS.md with the date and incident that produced it.",
      "Periodically prune rules that newer models no longer need.",
      "Make rule additions a small, lightweight commit — the ratchet should turn often.",
    ],
    naive: {
      title: "Naive Harness",
      code: `# Agent ran: git push --force
# Overwrote teammate's branch
# Engineer in chat:
"Hey, please don't ever use --force again, ok?"

# Next session:
# Agent ran: git push --force ...`,
      problem:
        "Telling the agent in chat is not a fix — chat instructions vanish at the next session. The mistake is repeatable indefinitely.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `# .agent/tools/bash.py
FORBIDDEN_PATTERNS = [
  (r'--force\\b', 'Force operations are blocked by policy'),
  (r'rm\\s+-rf\\s+/', 'Destructive root removal blocked'),
  (r'git push.*--force', 'Force push disabled — see incident #2026-04-12'),
]

def execute(cmd):
    for pattern, reason in FORBIDDEN_PATTERNS:
        if re.search(pattern, cmd):
            return error(f"BLOCKED: {reason}")
    return shell(cmd)`,
      benefit:
        "The mistake is now structurally impossible for any agent, in any session, forever. The incident reference makes the rule auditable and removable when context changes.",
    },
    sources: ["Addy Osmani", "Mitchell Hashimoto", "WalkingLabs"],
  },
  {
    id: "separation-of-concerns",
    number: 6,
    title: "Separation of Generation and Evaluation",
    subtitle: "Don't let the agent grade its own homework.",
    accentColor: "oklch(0.62 0.18 295)",
    accentClass: "tenet-6",
    shortDefinition:
      "LLMs are sycophantic graders of their own work. Complex tasks require separating the agent that does the work from the agent that judges it.",
    longDefinition:
      "Anthropic documents this with a GAN-inspired architecture: a Planner that writes a contract, a Generator that produces work, and an independent Evaluator with strict criteria that approves or rejects the output. This avoids the dominant failure mode of single-agent loops — the agent declares victory on broken work because it has no incentive to find its own mistakes. The 'sprint contract' negotiated up front is a critical artifact: it gives the Evaluator concrete grading criteria so judgment is calibrated, not vibes-based.",
    keyQuestion: "Is the agent marking its own homework?",
    triggerPhrases: [
      { phrase: "Generators are sycophants. Evaluators are skeptics.", source: "Anthropic" },
      { phrase: "Sprint contracts before code.", source: "Anthropic" },
      { phrase: "GAN-inspired multi-agent structure.", source: "Anthropic" },
      { phrase: "Calibrate judgment with concrete criteria.", source: "Anthropic" },
    ],
    bestPractices: [
      "Use a Planner → Generator → Evaluator architecture for any task longer than ~30 minutes.",
      "Have Planner and human negotiate a sprint contract before the Generator starts work.",
      "Give the Evaluator a separate context, separate prompt, and concrete grading rubric.",
      "Persist Evaluator rejections back into the Generator's context as feedback.",
    ],
    naive: {
      title: "Naive Harness",
      code: `# One agent, one loop
agent.run("Redesign the landing page")
# Agent writes HTML/CSS
# Agent reviews own work:
"Looks great! Beautiful design. Task complete."
# In reality: contrast 2.1, layout broken on mobile`,
      problem:
        "The agent has no incentive to find its own faults. Self-grading produces uncalibrated confidence and shipped defects.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `# Three-agent harness
contract = planner.draft_contract(task, criteria=[
  "WCAG AA contrast (≥ 4.5:1)",
  "Mobile breakpoint at 375px works",
  "Lighthouse perf ≥ 90",
])
human.approve(contract)

while not approved:
  artifact = generator.run(contract)
  screenshot = render(artifact)
  verdict = evaluator.grade(
    contract=contract,
    artifact=artifact,
    screenshot=screenshot,
  )
  if verdict.passed:
    approved = True
  else:
    generator.context.append(verdict.reasons)`,
      benefit:
        "The Evaluator has a fresh context and concrete criteria — it has no investment in declaring success. Quality is enforced before the human ever sees the work.",
    },
    sources: ["Anthropic"],
  },
  {
    id: "safe-autonomy",
    number: 7,
    title: "Safe Autonomy",
    subtitle: "Explicit boundaries, not vibes.",
    accentColor: "oklch(0.65 0.13 195)",
    accentClass: "tenet-7",
    shortDefinition:
      "To let agents run unattended without losing control, the harness must enforce strict, inspectable boundaries.",
    longDefinition:
      "Reducing approval friction is what makes long-running agents productive — but every removed approval must be replaced by structural enforcement. The harness uses sandboxed execution, allow-listed tool surfaces, hooks that escalate sensitive actions to humans (HumanLayer's Factor 7), and tight blast-radius limits. The principle is: if the worst-case action would be catastrophic, it must be impossible without explicit human consent. Hooks become the policy enforcement layer — they make safety a property of the system, not the prompt.",
    keyQuestion: "What structurally prevents the agent from executing a destructive command?",
    triggerPhrases: [
      { phrase: "Contact humans with tool calls — not chat.", source: "HumanLayer (Factor 7)" },
      { phrase: "Hooks are the policy enforcement layer.", source: "WalkingLabs" },
      { phrase: "Sandboxes contain blast radius.", source: "Anthropic" },
      { phrase: "Allow-list tools, never blocklist.", source: "WalkingLabs" },
    ],
    bestPractices: [
      "Run agent code in isolated sandboxes (containers, microVMs, tmp dirs).",
      "Use allow-lists for tools and shell commands; default deny everything else.",
      "Escalate sensitive actions (refunds, deletes, prod deploys) via a request_human_approval tool.",
      "Make every privileged action auditable — log inputs, outputs, and the human approver.",
    ],
    naive: {
      title: "Naive Harness",
      code: `# Refund agent
tools = [issue_refund]
system_prompt = "Only refund up to $50."
agent.run(ticket)
# Agent hallucinates context
# Issues a $500 refund to wrong customer`,
      problem:
        "A system-prompt limit is a suggestion, not a constraint. The blast radius of a single hallucination is unbounded.",
    },
    engineered: {
      title: "Engineered Harness",
      code: `# Refund tool with structural limits
def issue_refund(amount, customer_id):
    if amount > 50:
        token = create_approval_request(
          action="refund",
          amount=amount,
          customer_id=customer_id,
          slack_channel="#refund-approvals",
        )
        return PAUSED(approval_token=token)
    return execute_refund(amount, customer_id)

# Loop suspends until approval webhook fires`,
      benefit:
        "The harness pauses the agent loop and routes to a human via Slack for any refund over $50. The blast radius is bounded by code, not by hope.",
    },
    sources: ["HumanLayer", "WalkingLabs", "Anthropic"],
  },
];
