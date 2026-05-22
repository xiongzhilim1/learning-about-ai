export type Exercise = {
  slug: string;
  number: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tenetIds: string[];
  scenario: string;
  observe: string; // Step 1: observe failure
  applyRatchet: string; // Step 2: design the harness change
  steps: string[]; // 5-step instructions
  expectedOutcome: string;
  reflection: string;
};

export const EXERCISES: Exercise[] = [
  {
    slug: "block-the-force-push",
    number: 1,
    title: "Block the Force Push",
    difficulty: "Beginner",
    tenetIds: ["the-ratchet", "safe-autonomy"],
    scenario:
      "Your coding agent has access to a bash tool. During a routine refactor it ran `git push --force` and overwrote a teammate's branch. Your manager is unhappy. You have one job: make sure this is structurally impossible going forward.",
    observe:
      "Reproduce the failure. Give the agent a bash tool with no constraints and a goal that incentivizes a fast push. Confirm the agent will reach for `--force` when the local branch diverges.",
    applyRatchet:
      "Add a regex filter inside the bash tool's execute function. Block any command matching `--force` or `-f` on a push. The error message must include the incident reference so the rule is auditable.",
    steps: [
      "Implement a `bash_safe(cmd: str)` wrapper that scans for forbidden patterns.",
      "Add patterns: `--force` on git push, `rm -rf /`, `chmod 777` on production paths.",
      "Return a structured error to the agent: `{ blocked: true, reason: '…', incident: '2026-04-12' }`.",
      "Write a vitest case that asserts every forbidden pattern is rejected.",
      "Run the agent with the same task and confirm the loop self-corrects without a destructive write.",
    ],
    expectedOutcome:
      "The agent attempts `git push --force`, the harness intercepts with a structured error, the agent reads the error in its next turn and falls back to `git push` (no force). No data is lost.",
    reflection:
      "What other 'one-time mistakes' would you ratchet next? Write three more incident-tied rules.",
  },
  {
    slug: "context-overflow-on-test-logs",
    number: 2,
    title: "Tame the 12,000-Line Test Log",
    difficulty: "Intermediate",
    tenetIds: ["context-budget"],
    scenario:
      "Your agent runs a test suite that emits 12,000 lines of stack traces on failure. Currently the entire log is dumped into context. The agent then forgets the original task and hallucinates patches.",
    observe:
      "Run the agent on a known-failing test. Watch the context utilization spike past 70%. Confirm the agent's next turn drifts off-task.",
    applyRatchet:
      "Implement a tool-result interceptor: any tool output above 8,000 tokens is written to disk under `/runs/<run_id>/<call_id>.log`. The context receives only a head + tail summary plus a `grep_file` hint.",
    steps: [
      "Add a `truncate_and_offload(raw: str, limit: int)` helper.",
      "Wrap the test-runner tool so its output passes through the helper.",
      "Add a `grep_file(path, pattern)` tool to the registry so the agent can search the offloaded log.",
      "Re-run the failing test and verify context utilization stays below 30%.",
      "Confirm the agent uses `grep_file` to inspect specific frames instead of reasoning over the full dump.",
    ],
    expectedOutcome:
      "Context stays clean. The agent searches the offloaded log surgically and produces a focused, correct fix on the first attempt.",
    reflection:
      "Which other tools in your harness leak large outputs? Audit them next.",
  },
  {
    slug: "sprint-contract-from-vague-task",
    number: 3,
    title: "From Vague Task to Sprint Contract",
    difficulty: "Intermediate",
    tenetIds: ["separation-of-concerns", "cybernetic-loop"],
    scenario:
      "A product manager files a ticket: 'make the dashboard faster.' Your agent ships a 'fix' that adds a spinner. The ticket is reopened. You realize the agent never had a calibrated definition of done.",
    observe:
      "Run the agent on the vague ticket. Watch it produce a plausible-but-useless artifact. The Evaluator (or human) rejects it. Note the time and tokens wasted.",
    applyRatchet:
      "Insert a Planner step before the Generator runs. The Planner's job is to produce a sprint contract with measurable acceptance criteria. The contract is human-approved before generation begins.",
    steps: [
      "Author a `planner.md` system prompt that converts a vague task into a YAML sprint contract.",
      "Define the contract schema: `task`, `acceptance_criteria`, `non_goals`, `evaluator`, `human_approver`.",
      "Add a human-approval gate: the Generator cannot start until the contract is signed.",
      "Have the Evaluator grade the resulting artifact strictly against the contract.",
      "Run the same vague ticket through the new pipeline. Confirm the Planner asked for clarification before any code was written.",
    ],
    expectedOutcome:
      "The Planner produces a contract that includes 'p95 dashboard load time under 1.5s on 50k rows.' The Generator now has measurable targets. The Evaluator can grade objectively.",
    reflection:
      "What other tickets in your backlog are 'vague task' in disguise? Run them through the Planner first.",
  },
  {
    slug: "rehydrate-after-context-wipe",
    number: 4,
    title: "Rehydrate After a Full Context Wipe",
    difficulty: "Advanced",
    tenetIds: ["state-externalization"],
    scenario:
      "A long-running build agent has been working for two hours. You want to prove your harness can survive a full context wipe at any moment without losing progress.",
    observe:
      "At a random point mid-task, kill the agent process. Restart it with an empty context. Watch what happens.",
    applyRatchet:
      "Implement a phase-boundary hook that maintains `feature_list.json` and frequent git commits. On every restart, rehydrate context from these durable artifacts before resuming work.",
    steps: [
      "Define a `feature_list.json` schema with `id`, `status`, `commit`, `subtasks`.",
      "Add a `phase_boundary()` function: requires clean git, green tests, and updates feature_list.json before allowing context reset.",
      "Implement `rehydrate()`: read `feature_list.json`, last 20 git log entries, and `AGENTS.md`; inject them into the empty context.",
      "Mid-task, kill the process. Start a fresh agent with `rehydrate()` as its first step.",
      "Verify the new agent picks up exactly where the previous one stopped — no repeated work, no lost work.",
    ],
    expectedOutcome:
      "A killed-and-restarted agent reads feature_list.json, sees that feature `dashboard` is `in_progress` at subtask `pagination`, checks git for the most recent commit, and resumes the pagination subtask without duplicating any prior work.",
    reflection:
      "How long can your agent run before a wipe is required? Where is your context-budget bottleneck?",
  },
  {
    slug: "human-approval-for-prod-deploys",
    number: 5,
    title: "Escalate Production Deploys to Humans",
    difficulty: "Advanced",
    tenetIds: ["safe-autonomy"],
    scenario:
      "Your agent has the authority to deploy to staging autonomously. It must NEVER deploy to production without an explicit human approval, but it should request that approval cleanly — not via chat.",
    observe:
      "Currently the agent reads the deploy tool's args and decides which environment to target. You've already had one near-miss where a typo could have shipped to prod.",
    applyRatchet:
      "Build a `request_human_approval` tool. Make any prod-target deploy invoke this tool, suspend the loop, and resume only when a Slack approval webhook fires.",
    steps: [
      "Create a `request_human_approval(action, reason, blast_radius, data)` tool that writes a row to an approvals table and posts to Slack.",
      "Modify the `deploy(env, ...)` tool: if `env == 'prod'`, call request_human_approval and return `{ paused: true, approval_token }`.",
      "Implement a webhook receiver that flips the approval row to `approved` and resumes the agent loop with the original deploy call.",
      "Write a vitest that simulates approval and rejection flows.",
      "End-to-end test: have the agent attempt a prod deploy, approve it via Slack, confirm the deploy proceeds.",
    ],
    expectedOutcome:
      "Prod deploys always pause for human approval; the agent surface is unchanged for staging deploys; every approval is logged with timestamp, approver, and the original tool args.",
    reflection:
      "Which other tool calls deserve this treatment? Anything with money, customer data, or DNS.",
  },
];
