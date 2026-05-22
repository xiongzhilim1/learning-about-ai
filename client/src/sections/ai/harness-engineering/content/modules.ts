// =============================================================================
// MODULES — Harness Engineering Mastery (Vol. 02)
//
// Running case study: REFUNDCO
//   A mid-sized payments company. The team is building an autonomous agent
//   that processes refund requests against the Stripe API. Every module
//   advances the same harness, on the same repo, against the same Stripe
//   account. By module 8 the harness is production-ready.
//
//   Repo:           refundco/refund-agent
//   Languages:      TypeScript (server), Python (agent runtime)
//   External APIs:  Stripe, internal Postgres, Slack
//   Stakes:         Real money. Every action is auditable.
// =============================================================================

export type Section =
  | { kind: "prose"; heading?: string; body: string }
  | { kind: "code"; heading?: string; lang: string; code: string; caption?: string }
  | { kind: "callout"; tone: "tip" | "warn" | "insight"; heading: string; body: string }
  | {
      kind: "naive-vs-engineered";
      naive: { code: string; lang?: string; problem: string };
      engineered: { code: string; lang?: string; benefit: string };
    }
  | { kind: "when-this-hurts"; items: { signal: string; cause: string }[] }
  | { kind: "diagram"; heading: string; src: string; alt: string; caption?: string }
  | {
      kind: "worked-trace";
      heading: string;
      scenario: string;
      turns: { actor: "user" | "llm" | "tool" | "hook" | "state"; label: string; detail: string }[];
      takeaway: string;
    }
  | { kind: "objection"; question: string; response: string }
  | {
      kind: "anatomy";
      heading: string;
      failure: string;
      trigger: string;
      detect: string;
      prevent: string;
    }
  | {
      kind: "self-check";
      questions: { q: string; a: string }[];
    };

// A FurtherReadingItem may either be inlined (source/url) or reference the
// centralized sources catalog by id. The `note` field carries our editorial
// pointer to where in the source the most relevant content lives.
export type FurtherReadingItem =
  | { sourceId: string; section?: string; note?: string }
  | { source: string; section?: string; url: string; note?: string };

export type Module = {
  slug: string;
  number: number;
  title: string;
  level: "L0" | "L1" | "L2" | "L3" | "L4" | "L5";
  levelTransition: string;
  tenetIds: string[];
  estimatedReadingMinutes: number;
  summary: string;
  caseStudyContext: string; // What state RefundCo is in at the start of this module
  learningOutcomes: string[];
  sections: Section[];
  coachTips: string[];
  furtherReading: FurtherReadingItem[];
};

// =============================================================================

export const MODULES: Module[] = [
  // ---------------------------------------------------------------------------
  {
    slug: "foundations",
    number: 1,
    title: "Foundations: Model vs. Agent vs. Harness",
    level: "L1",
    levelTransition: "L0 → L1",
    tenetIds: ["harness-is-artifact"],
    estimatedReadingMinutes: 14,
    summary:
      "Why a raw LLM is not an agent, and why the harness — not the model — is the surface where reliability is engineered. We'll meet RefundCo, our running case study, and watch a single agent loop play out turn by turn.",
    caseStudyContext:
      "RefundCo's team has spent two weeks pasting refund tickets into Claude and copying the answers back into Stripe. They want to wire it up properly. They have a model. They do not yet have an agent.",
    learningOutcomes: [
      "Articulate the equation Agent = LLM + Harness in your own words.",
      "Identify the five components of any harness: Loop, Context, Tools, Hooks, State.",
      "Read a turn-by-turn trace and point at where each component does its work.",
      "Recognize when a perceived 'model problem' is actually a configuration problem.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Meet RefundCo",
        body:
          "RefundCo processes about 600 refund tickets a month. Each one requires reading the customer email, looking up the original charge in Stripe, deciding whether the refund is allowed under the company's policy (full refund within 30 days, partial after), and posting the refund. For two weeks the team has been copying tickets into a Claude conversation. The model is excellent. The system around the model is non-existent. Today they have a brilliant employee with no desk, no tools, and no memory. We're going to give them an agent.",
      },
      {
        kind: "prose",
        heading: "The equation",
        body:
          "Most failures attributed to AI agents are not failures of the model. They are failures of the system around the model. The model is a probabilistic reasoning engine — a CPU. The agent is the running system that uses that engine to achieve goals in the world. Between them sits the harness: the operating system, the peripherals, the sandbox, the memory manager. When you say 'the agent broke production,' what you almost certainly mean is 'the harness let the model break production.' Stop debugging the model. Start debugging the harness — it is the only surface where you have engineering leverage.",
      },
      {
        kind: "prose",
        heading: "The five components",
        body:
          "Every harness, no matter how minimal, is built from five primitives. The Loop is the engine that drives observe-reason-act-evaluate cycles. Context is the working memory the LLM sees on each turn. Tools are the capabilities the agent can invoke. Hooks are interception points that enforce policy. State is the durable memory that survives context resets. Master these five and you can read any harness, no matter how complex.",
      },
      {
        kind: "diagram",
        heading: "The loop, drawn",
        src: "/manus-storage/loop_daea3969.png",
        alt: "Diagram of the agent loop showing rehydrate, render, LLM, parse tool, pre-tool hook, execute tool, post-tool hook, append, checkpoint, and goal check.",
        caption:
          "Five components labeled across one iteration. The LLM (blue) emits a tool call. Hooks (amber) gate it. State (green) is the only thing that survives between iterations.",
      },
      {
        kind: "code",
        heading: "Anatomy of a minimal harness",
        lang: "python",
        code: `# refund_agent/harness.py — RefundCo's first harness, in 30 lines
class Harness:
    def __init__(self):
        self.context = Context(budget_tokens=100_000)
        self.tools   = ToolRegistry(allow_list=[
            "stripe_lookup_charge",
            "stripe_create_refund",
            "read_ticket",
            "post_slack",
        ])
        self.hooks   = HookChain([
            RedactPII(),                # pre-tool
            BlockRefundOver("$500"),    # pre-tool
            VerifyStripeIdempotency(),  # post-tool
        ])
        self.state   = State(path="./.agent/refund_progress.json")

    def loop(self, ticket_id):
        self.context.inject(self.state.read())
        while not self.context.done():
            llm_response = invoke_llm(self.context.render())
            tool_call    = parse_tool(llm_response)
            self.hooks.before_tool(tool_call)         # policy
            result       = self.tools.execute(tool_call)
            self.hooks.after_tool(tool_call, result)  # validation
            self.context.append(result)
            self.state.checkpoint()                   # durable memory`,
        caption:
          "Every other module in this course modifies one or more of these five lines. Bookmark this file.",
      },
      {
        kind: "worked-trace",
        heading: "One iteration of the RefundCo loop",
        scenario:
          "A customer (ticket #4421) emailed asking for a refund on their $79 subscription. Let's run one full turn of the harness on this ticket.",
        turns: [
          {
            actor: "state",
            label: "0. Rehydrate",
            detail:
              "Read .agent/refund_progress.json: { current_ticket: '4421', stage: 'fetching_charge' }. Inject AGENTS.md (rules), the ticket text, and Stripe customer history into context.",
          },
          {
            actor: "llm",
            label: "1. Reason",
            detail:
              "Model emits: 'I need to look up the charge before I can decide. Calling stripe_lookup_charge with customer_id=cus_J12.'",
          },
          {
            actor: "hook",
            label: "2. Pre-tool",
            detail:
              "RedactPII scans args (none found). enforceAllowList confirms stripe_lookup_charge is allowed. Pass.",
          },
          {
            actor: "tool",
            label: "3. Execute",
            detail:
              "Stripe returns the charge: $79.00 on 2026-05-04, status=succeeded, 14 days old.",
          },
          {
            actor: "hook",
            label: "4. Post-tool",
            detail:
              "validateJsonShape confirms a charge object came back. snapshotForReview writes the response to /audit/4421/turn-001.json.",
          },
          {
            actor: "state",
            label: "5. Checkpoint",
            detail:
              "Write { current_ticket: '4421', stage: 'evaluating_policy', charge_id: 'ch_abc' } back to refund_progress.json. The agent could be killed here and resumed cleanly.",
          },
        ],
        takeaway:
          "Every component earned its keep in one iteration. Remove State and a crash loses the ticket. Remove Hooks and a leaked email lands in Stripe support. Remove the Loop and you have a chatbot. Remove the LLM and you have a script. The harness is what makes this an agent.",
      },
      {
        kind: "callout",
        tone: "insight",
        heading: "The reframe",
        body:
          "Stop debugging the model. Start debugging the harness. The harness is the only surface where you have engineering leverage — you cannot retrain the model, but you can rewrite the loop. LangChain frames this as the **anatomy of an agent harness** (model + prompts + tools + middleware + orchestration + runtime); we will spend the rest of the course pulling each layer apart and engineering it deliberately.",
      },
      {
        kind: "objection",
        question:
          "Why not just paste better instructions into the system prompt? Models are getting smarter — surely the harness will become unnecessary?",
        response:
          "Smarter models make the harness more leveraged, not less. Every reliability dimension you care about — auditability, safety, durability across crashes, recoverability after a context wipe — lives outside the model. Telling a smarter model 'never push --force' is still pleading with the model. The harness turns instructions into structural constraints. Stronger models behave better inside that structure; they do not replace it.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the 'model problem' that wasn't",
        failure:
          "RefundCo's first agent issued a $79 refund twice for the same ticket. The team blamed Claude.",
        trigger:
          "The agent ran the loop, called stripe_create_refund, the network blipped, the response was lost. The agent saw no result, retried, and Stripe issued a second refund.",
        detect:
          "Look at the audit log: two stripe_create_refund calls for the same ticket inside 800ms. The model behaved identically on both turns — same context in, same call out.",
        prevent:
          "The harness was missing an idempotency hook. A post-tool hook that recorded the idempotency_key and refused duplicate calls would have eaten the second attempt without the model ever knowing. This is a configuration problem with a model-shaped scapegoat.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "You upgraded the model and reliability got worse.",
            cause:
              "Your harness was overfit to the previous model's quirks. The harness — not the model — was doing the heavy lifting.",
          },
          {
            signal: "You keep adding warnings to the system prompt and nothing changes.",
            cause:
              "Pleading with the model has no structural effect. Move the rule into a hook or tool boundary.",
          },
          {
            signal: "The agent works in your testing but fails in production.",
            cause:
              "Your harness is missing context, state, or hooks that the production environment requires.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "RefundCo's agent calls stripe_create_refund twice for the same ticket. Which of the five components needs to change?",
            a: "Hooks. Specifically a post-tool hook that records idempotency_key and rejects duplicates. (Bonus: State should record 'refund_issued' so a crash-recovery path also catches it.)",
          },
          {
            q: "A teammate suggests fixing the duplicate-refund bug by adding 'NEVER call stripe_create_refund twice' to the system prompt. Why is this insufficient?",
            a: "Prompts cannot enforce. The model can ignore, misinterpret, or hallucinate around the rule. Hooks run as deterministic code; they cannot be talked around.",
          },
          {
            q: "If you wiped the agent's context mid-ticket and started a fresh one, would it pick up where the last agent left off?",
            a: "Only if state has been externalized to refund_progress.json with enough fidelity to rehydrate. If the only record of progress lived in the chat, it's gone. (We'll fix this properly in Module 6.)",
          },
        ],
      },
    ],
    coachTips: [
      "If you find yourself writing 'CRITICAL' or 'NEVER' in all caps in a system prompt, stop. That instruction belongs in a hook.",
      "Read your AGENTS.md as if you'd never seen it — every line should trace to a real failure mode.",
      "When onboarding a new model, run your full harness test suite before changing a single instruction.",
      "Story: I once watched a senior engineer spend three days A/B-testing prompts to fix a 'creativity bug.' The actual bug was a tool that returned UTF-8 garbage on Tuesdays. The harness was invisible to him; the model was the only suspect he could see.",
      "When triaging an agent failure, name the five components out loud and ask which one let the failure happen. The answer is usually obvious within 30 seconds.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-effective-harnesses",
        section: "Section: 'Why a harness'",
        note: "Read this paragraph alongside our Mental Model page; it is the canonical statement of why long-running agents need structured environments.",
      },
      {
        sourceId: "osmani-agent-harness",
        section: "Section: 'A decent model with a great harness…'",
        note: "The operating maxim of the field. If you take one quote from this module, take this one.",
      },
      {
        sourceId: "humanlayer-skill-issue",
        section: "Whole essay; ~6 min read",
        note: "The reframe. Reads in one sitting and changes how you debug for the next year.",
      },
      {
        sourceId: "langchain-anatomy",
        section: "The five components: prompts, tools, middleware, orchestration, runtime",
        note: "A second decomposition of the same Agent = LLM + Harness equation; useful triangulation against our five components.",
      },
      {
        sourceId: "langchain-improving-deepagents",
        section: "Benchmark deltas table",
        note: "The empirical evidence that this discipline is worth your time. Harness changes alone moved scores meaningfully on the same model.",
      },
      {
        sourceId: "anthropic-infra-noise",
        section: "Whole article",
        note: "Anthropic's data showing harness/runtime noise often exceeds model gaps on coding benchmarks. The single most important data point in this discipline.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "the-agent-file",
    number: 2,
    title: "The Agent File: AGENTS.md and Progressive Disclosure",
    level: "L2",
    levelTransition: "L1 → L2",
    tenetIds: ["the-ratchet", "context-budget"],
    estimatedReadingMinutes: 16,
    summary:
      "How to design AGENTS.md as a living, ratcheted instruction surface — and why the size of your context window depends on it. We'll watch RefundCo's AGENTS.md evolve through five real incidents.",
    caseStudyContext:
      "RefundCo has the harness from Module 1 and one AGENTS.md file. It started at 80 tokens. Then incidents happened. The team's instinct is to make the file bigger. We're going to argue for the opposite discipline.",
    learningOutcomes: [
      "Structure an AGENTS.md file that scales with your codebase.",
      "Apply progressive disclosure to keep the loaded context small.",
      "Tie every rule to a specific incident so the file remains auditable.",
      "Decide when a rule belongs in AGENTS.md versus a hook versus a skill.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "AGENTS.md as a ratchet log, not a manifesto",
        body:
          "AGENTS.md (or CLAUDE.md, or whatever your harness reads on boot) is not a set of philosophical guidelines. It is a precise, traceable record of failure modes you have already eliminated. Every line should answer the question: what mistake would the agent make if this rule were not here? If you cannot answer, the rule does not belong in the file. This discipline is what makes the file prunable — and a prunable file is one that stays small enough to actually load.",
      },
      {
        kind: "code",
        heading: "RefundCo's AGENTS.md, day one",
        lang: "markdown",
        code: `# AGENTS.md — refund-agent

## Identity
You are working in the refund-agent repo. You process customer
refund requests against Stripe. Real money is at stake.

## How to do work
- Read the ticket, look up the charge, decide on policy, post the refund.
- If unsure, ask for human approval via post_slack.

## Tools available
- stripe_lookup_charge, stripe_create_refund, read_ticket, post_slack`,
        caption:
          "80 tokens. The minimum viable boot file. No rules yet — there have been no incidents to ratchet against.",
      },
      {
        kind: "prose",
        heading: "Then five incidents happened",
        body:
          "Over four weeks of running, the agent produced five distinct failures. Each one is a candidate for a new rule. The rule of thumb: if the failure was the model's fault and could repeat with a different ticket, it ratchets into AGENTS.md. If the failure was structural — the harness let it happen — it ratchets into a hook instead.",
      },
      {
        kind: "code",
        heading: "RefundCo's AGENTS.md, day 28 (after five incidents)",
        lang: "markdown",
        code: `# AGENTS.md — refund-agent

## Identity
You are working in the refund-agent repo. Real money is at stake.

## Hard rules (each tied to an incident)
- ALWAYS use the customer's preferred currency from their profile.
  (incident: 2026-04-08, ticket #3902, refunded EUR as USD)
- NEVER refund a charge older than 90 days without human approval.
  (incident: 2026-04-15, ticket #4101, $1,200 disputed by finance)
- NEVER apologize on behalf of the company in customer Slack threads.
  (incident: 2026-04-19, ticket #4192, legal flagged the wording)
- ALWAYS quote the original charge ID in the Slack confirmation.
  (incident: 2026-04-22, ticket #4220, support couldn't trace it)
- WHEN the ticket mentions chargebacks, escalate via post_slack and stop.
  (incident: 2026-04-30, ticket #4308, refund + chargeback = double loss)

## Conventions
- Use the existing stripe.refunds.create() wrapper, not raw HTTP.
- All Slack confirmations go to #refunds-audit, never DMs.

## Links to deeper docs (load on demand)
- See /docs/policies/refund-windows.md when the ticket is older than 30 days.
- See /docs/policies/edge-cases.md when the request mentions a chargeback,
  partial-shipment, or subscription pause.`,
        caption:
          "~280 tokens. Every rule is dated, ticket-numbered, and prunable. When the model improves, you'll know exactly which rule to remove.",
      },
      {
        kind: "callout",
        tone: "tip",
        heading: "Progressive disclosure",
        body:
          "The AGENTS.md should fit in a few hundred tokens. Detailed conventions live in domain-specific files that the harness loads only when the agent touches that domain. Don't dump every rule into one file — your context will rot, and the rules at the bottom will be ignored.",
      },
      {
        kind: "naive-vs-engineered",
        naive: {
          code: `# AGENTS.md (10,000 tokens)
# Refund rules, billing rules, dispute rules,
# email templates, deployment runbooks,
# every coding convention ever written…`,
          problem:
            "Every agent session pays the full 10k-token tax even when working on something unrelated. Context rot starts before the first real instruction.",
        },
        engineered: {
          code: `# AGENTS.md (280 tokens) — boot file
# 5 hard rules, 2 high-level conventions,
# pointers to domain docs

# Harness loader (in harness.py)
def on_context_inject(ticket):
    if "chargeback" in ticket.body.lower():
        context.inject(read("/docs/policies/edge-cases.md"))
    if ticket.charge.age_days > 30:
        context.inject(read("/docs/policies/refund-windows.md"))`,
          benefit:
            "Boot context stays small. Domain rules load when (and only when) the ticket triggers them. The 10k-token doc still exists — it just doesn't get loaded into every session.",
        },
      },
      {
        kind: "objection",
        question:
          "Won't the agent miss something important if I don't load all the rules upfront?",
        response:
          "If a rule must apply to every single session, it goes in the boot AGENTS.md. If a rule applies only to a domain (chargebacks, subscription pauses, foreign currencies), it loads when the trigger fires. The mistake is treating 'might be relevant' the same as 'must be loaded.' The first you can rehydrate on demand. The second deserves the budget.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the rule that aged out",
        failure:
          "RefundCo's AGENTS.md had a rule from a 2025 model: 'NEVER use markdown bullet points in customer responses — you tend to nest them.' By 2026, no current model had this issue.",
        trigger:
          "Six months passed. The model upgraded twice. The rule was now solving a problem nobody had. But it was still consuming tokens, and worse, signaling to the agent that bullet points are dangerous — which made it overly cautious in unrelated contexts.",
        detect:
          "Quarterly AGENTS.md audit: which rules trigger zero corrections in the audit log? Those are candidates for removal.",
        prevent:
          "Date-stamp every rule with the incident that created it. When you upgrade models, sweep rules whose incidents predate the previous two model generations. The file stays prunable because every line has provenance.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "Your AGENTS.md has more than ~30 hard rules.",
            cause:
              "Many rules are now redundant with newer model capabilities. Time to prune. (Hint: when did each one last save you?)",
          },
          {
            signal: "Engineers stop reading AGENTS.md before changes.",
            cause:
              "The file has become a wall of text. Restructure with progressive disclosure.",
          },
          {
            signal: "A rule you added last month is being ignored.",
            cause:
              "It's buried below 8k tokens of older rules. Move it up, or move the older rules out.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "RefundCo's agent issued a refund in USD when the customer paid in EUR. Should this become an AGENTS.md rule, or a hook?",
            a: "AGENTS.md. The model can read the customer profile and pick the right currency — it just forgot. A hook would have to inspect the call, look up the customer, and compare. The cheaper fix is the rule.",
          },
          {
            q: "RefundCo's agent issued a refund twice when the network flapped. Should this become an AGENTS.md rule, or a hook?",
            a: "Hook. Idempotency cannot be enforced through prose. The structural fix is to record the idempotency_key in a post-tool hook and reject duplicates.",
          },
          {
            q: "Your AGENTS.md is 4,200 tokens. Most of those tokens are about chargebacks (which appear in 3% of tickets). What do you do?",
            a: "Move chargeback rules to /docs/policies/edge-cases.md and load them on-demand when the ticket body contains 'chargeback'. Boot context drops by 80%; the rules still apply when they need to.",
          },
        ],
      },
    ],
    coachTips: [
      "When you remove a rule, write a one-line note explaining what changed (model upgrade, framework change, etc.). Future-you will thank present-you.",
      "Run a quarterly 'AGENTS.md audit' — prune any rule whose triggering incident is older than two model generations.",
      "Story: a team I worked with discovered their 6,000-token AGENTS.md was 70% rules from a model that had been deprecated. The team had treated the file as append-only. They cut it to 900 tokens overnight and got back two thousand tokens of actual reasoning headroom.",
      "When a teammate proposes a new rule, ask: 'what's the ticket number?' If they can't name one, the rule is speculation, not engineering.",
      "If a hook would catch the failure, prefer the hook. AGENTS.md is the place for things only the model can decide. Hooks are for things the model should never even attempt.",
    ],
    furtherReading: [
      {
        sourceId: "agents-md-spec",
        section: "The official spec",
        note: "The format itself is short. Read the spec, then come back to this module's template.",
      },
      {
        sourceId: "humanlayer-claude-md",
        section: "Whole article",
        note: "The companion guide for Claude Code's CLAUDE.md. Pair with this module when deciding what belongs in the file vs in a hook.",
      },
      {
        sourceId: "agent-md-spec",
        section: "The alternative spec",
        note: "Sister effort to AGENTS.md. Read both before committing to one.",
      },
      {
        sourceId: "github-spec-kit",
        section: "feature_list.json template",
        note: "GitHub's spec-driven development kit. The closest thing to an off-the-shelf feature_list.json template.",
      },
      {
        sourceId: "anthropic-harness-design",
        section: "Progressive disclosure section",
        note: "The pattern that makes large repos workable: keep the root file thin, link to deeper docs on demand.",
      },
      {
        sourceId: "walkinglabs-learn",
        section: "Lecture: 'Why feature lists are harness primitives'",
        note: "The sister course's argument for treating feature_list.json as a first-class harness primitive, not just a planning artifact.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "steering-feedforward",
    number: 3,
    title: "Steering: Specs, Skills, and Conventions",
    level: "L2",
    levelTransition: "L2",
    tenetIds: ["cybernetic-loop"],
    estimatedReadingMinutes: 14,
    summary:
      "The feedforward half of the cybernetic loop — how to shape agent behavior before it acts, using sprint contracts and on-demand skills. RefundCo writes its first sprint contract.",
    caseStudyContext:
      "RefundCo's product manager files a vague ticket: 'make the refund agent handle subscription pauses.' The team has run this drill before with bad results. This time we'll write a sprint contract first.",
    learningOutcomes: [
      "Author a sprint contract that gives downstream evaluators concrete criteria.",
      "Design skills that load on-demand based on context triggers.",
      "Distinguish between specs (what to build) and conventions (how to build).",
      "Recognize when feedforward steering is overkill versus necessary.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Two halves of the cybernetic loop",
        body:
          "Martin Fowler frames the harness as a governor with two regulators: feedforward, which shapes behavior before action, and feedback, which corrects after action. This module is about feedforward. The next module is about feedback. You need both — neither is sufficient alone. Feedforward is cheaper (it runs once, before work starts). Feedback is more expensive (it runs every iteration). A good harness uses feedforward to prevent classes of failure that feedback would have to catch repeatedly.",
      },
      {
        kind: "prose",
        heading: "Specs and sprint contracts",
        body:
          "Before the Generator agent starts work, a Planner (agent or human) negotiates a sprint contract: a precise statement of what success looks like, with acceptance criteria the Evaluator can grade against. This single artifact eliminates whole classes of failure — drift, scope creep, vibes-based judgment. RefundCo's PM said 'handle subscription pauses.' The sprint contract turns that into something an agent can deliver and a human can sign off on.",
      },
      {
        kind: "code",
        heading: "RefundCo's sprint contract for 'handle subscription pauses'",
        lang: "yaml",
        code: `# .agent/contracts/2026-05-12-subscription-pauses.yml
task: "Add subscription-pause handling to the refund agent"

acceptance_criteria:
  - "When ticket mentions 'pause' or 'hold', agent calls
     stripe.subscriptions.update(status='paused') instead of refunding."
  - "Agent posts confirmation to Slack with the pause_until date."
  - "Existing refund flow is unchanged for non-pause tickets
     (regression test passes)."
  - "If the customer is on annual billing, agent escalates to a human
     instead of pausing — annual pauses require finance approval."

non_goals:
  - "No new API integrations beyond Stripe."
  - "No UI changes."
  - "No changes to the refund-eligibility logic."

evaluator: "evaluator-agent-strict"
human_approver: "@finance-team"
deadline: "2026-05-19"`,
        caption:
          "The PM's vague ticket has become a graded contract. The Evaluator will reject any artifact that misses any acceptance criterion.",
      },
      {
        kind: "callout",
        tone: "insight",
        heading: "Skills as on-demand specs",
        body:
          "A 'skill' is a focused instruction document loaded only when its trigger fires. Skills keep the boot context small while giving the agent deep expertise on demand. Anthropic's harness ships dozens of skills; only a handful are ever loaded in a given session.",
      },
      {
        kind: "code",
        heading: "RefundCo's first skill",
        lang: "markdown",
        code: `# .agent/skills/subscription-pause.md
# Loaded when ticket body contains: "pause", "hold", "freeze"

## Goal
Pause an active subscription without refunding.

## Steps
1. Confirm the subscription is monthly (not annual).
2. Look up the customer's billing cycle: stripe_lookup_subscription.
3. Calculate pause_until = next_billing_date + requested_pause_weeks.
4. Call stripe.subscriptions.update(status='paused', resume_at=pause_until).
5. Post Slack confirmation in this format:
   "Paused {customer_name}'s subscription until {pause_until}. Ticket #{id}."

## Hard constraints
- If subscription is annual, STOP and post_slack to @finance-team.
- If pause request > 12 weeks, STOP and post_slack to @finance-team.

## Past incidents
- 2026-04-25 ticket #4280: agent paused without checking annual.
  Finance had to manually un-pause and bill.`,
        caption:
          "The skill is small (~200 tokens), domain-specific, and only loads when the ticket triggers it.",
      },
      {
        kind: "naive-vs-engineered",
        naive: {
          code: `# Generator agent runs immediately on PM's ticket
agent.run("handle subscription pauses")
# 4 hours later: agent ships a refund flow that 'pauses'
# by issuing a $0 refund. Tests pass. Humans reject in review.`,
          problem:
            "No contract, no calibration. The agent and the reviewer never agreed on what 'done' means. Hours wasted on a plausible-but-wrong artifact.",
        },
        engineered: {
          code: `# Step 1: Planner drafts contract from the ticket
contract = planner.draft_contract("handle subscription pauses")
# Step 2: Human signs off on the contract (10 minutes)
human.approve(contract)
# Step 3: Generator works against the contract
artifact = generator.run(contract)
# Step 4: Evaluator grades artifact against contract
verdict = evaluator.grade(contract, artifact)`,
          benefit:
            "10 minutes upfront prevents 4 hours of misaligned work. The contract is the long-term record of what 'done' meant — useful for audits, retros, and onboarding.",
        },
      },
      {
        kind: "objection",
        question:
          "This feels like a lot of process for a small change. Isn't this just bureaucracy?",
        response:
          "For a 30-minute change, yes — overkill. Sprint contracts pay off when (a) the task is fuzzy, (b) the artifact is hard to revert, or (c) multiple stakeholders need to agree on 'done.' Heuristic: if you'd ask a human to write a one-pager before starting, the agent needs a contract. If you'd just say 'go fix it' to the human, the agent can probably skip it too.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the spinner that 'made it faster'",
        failure:
          "PM filed: 'make the dashboard faster.' Agent shipped a loading spinner. Tests passed. Reviewers reopened the ticket.",
        trigger:
          "The agent had no measurable definition of 'faster.' It produced something visually plausible — a spinner makes pages feel faster — but the actual TTI was unchanged.",
        detect:
          "The Evaluator (or human) rejects on subjective grounds. The same task gets reopened. The agent's first attempt was 'reasonable' but unverifiable.",
        prevent:
          "The sprint contract makes 'faster' measurable: 'TTI < 1.2s on the staging fixture, measured by Lighthouse.' Now the agent and the Evaluator can agree on whether the artifact meets the bar — without subjective vibes.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "The agent ships work that the human reviewer rejects on subjective grounds.",
            cause:
              "No sprint contract. The agent and the reviewer never agreed on what 'done' means.",
          },
          {
            signal: "Skills are getting larger and more numerous.",
            cause: "You're packing too much into each skill. Split by trigger, not by topic.",
          },
          {
            signal: "Agents start work and then stop to ask 'what counts as done?' mid-task.",
            cause: "Skip the contract step at your peril. The agent is mid-flight asking for the runway.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "RefundCo's PM files: 'reduce refund processing time.' What's the first sentence of the sprint contract?",
            a: "An acceptance criterion: 'p95 ticket-to-resolved time < N minutes, measured over Y consecutive tickets in staging.' Without that number, you don't have a contract — you have a vibe.",
          },
          {
            q: "Should the subscription-pause skill be loaded for every ticket, or only when triggers fire?",
            a: "Only when triggers fire ('pause', 'hold', 'freeze'). Loading the skill on tickets it doesn't apply to wastes tokens and biases the agent toward irrelevant actions.",
          },
          {
            q: "When is a sprint contract overkill?",
            a: "When the task is small, easy to revert, and has a single obvious outcome. 'Add a unit test for the refund eligibility function.' No contract needed; the function and its acceptance criteria already exist.",
          },
        ],
      },
    ],
    coachTips: [
      "If the sprint contract takes more than 10 minutes to write, the task is too big. Split it.",
      "Have the human approver sign the contract before the agent writes a single line of code. The cost of a contract revision is minutes; the cost of an artifact rewrite is hours.",
      "Persist contracts as files in the repo. They become the long-term record of what 'done' meant — invaluable for audits and onboarding.",
      "Story: I once had a Planner agent that wrote contracts so vague the Generator finished in 12 seconds and the Evaluator passed in 8. Nothing useful happened. The fix: require contracts to include at least one numeric acceptance criterion or one runnable test name. Vibes are not contracts.",
      "Skills should look like a senior engineer's onboarding doc for the domain — not a complete reference. If the skill is over 500 tokens, it's probably two skills.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-harness-design",
        section: "Sprint contracts and the Planner / Generator / Evaluator pattern",
        note: "The reference for letting one agent grade another. Read once, internalize the pattern, and you have an evaluator strategy for life.",
      },
      {
        sourceId: "fowler-harness",
        section: "Feedforward controls section",
        note: "Fowler's framing of specs and conventions as feedforward control. Pairs cleanly with our 'agency budget' framing.",
      },
      {
        sourceId: "github-spec-kit",
        section: "Spec-driven development",
        note: "GitHub's toolkit treats specs as the agent's primary input; useful template for evaluator inputs in our pattern.",
      },
      {
        sourceId: "anthropic-writing-tools",
        section: "Whole article",
        note: "Tool design is harness design. Bad tool descriptions cause the LLM to over-use its agency on workarounds.",
      },
      {
        sourceId: "fowler-anchoring",
        section: "Reference application pattern",
        note: "When 'follow the conventions' fails, point the agent at a reference implementation. Cheap, effective, often forgotten.",
      },
      {
        sourceId: "humanlayer-12-factor",
        section: "Factor 4: Tools are just structured outputs",
        note: "The factor that explains why tool design is the cleanest place to budget agency.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "closing-the-loop-feedback",
    number: 4,
    title: "Closing the Loop: Hooks, Tests, and Back-Pressure",
    level: "L3",
    levelTransition: "L2 → L3",
    tenetIds: ["cybernetic-loop", "harness-is-artifact"],
    estimatedReadingMinutes: 17,
    summary:
      "The feedback half of the cybernetic loop — how hooks and tests inject corrections back into the agent before failures propagate. RefundCo builds the hook chain that catches its three worst incidents structurally.",
    caseStudyContext:
      "RefundCo has the harness, AGENTS.md, and sprint contracts. The agent is reliable on simple tickets but flaky on complex ones — typos slip through, refunds occasionally exceed limits, and CI catches things the agent should have caught itself. We need feedback.",
    learningOutcomes: [
      "Distinguish between pre-tool hooks (policy) and post-tool hooks (validation).",
      "Use computational checks before falling back to LLM-judge inferential checks.",
      "Make verification fast enough that the agent self-corrects within a single loop iteration.",
      "Order hooks for cost, dependency, and noise.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Why hooks beat prompts",
        body:
          "A hook is a piece of deterministic code that runs at a specific point in the loop — before a tool is invoked, after a file is written, on every git commit. Hooks are the policy enforcement layer of your harness. Unlike prompts, they cannot be ignored, talked around, or hallucinated past. If a hook says no, the answer is no. The model never even sees a successful execution; it sees the rejection and has to try again.",
      },
      {
        kind: "diagram",
        heading: "Hooks are the policy boundary",
        src: "/manus-storage/hooks_167e85f8.png",
        alt: "Diagram showing pre-tool hooks (redactSecrets, enforceAllowList, blockDestructiveBash), tool execution, then post-tool hooks (validateJsonShape, pnpm tsc, vitest, snapshotForReview), with rejected and stderr paths feeding back into the LLM.",
        caption:
          "The pre-chain (policy) decides whether the tool runs. The post-chain (validation) decides whether the result is acceptable. Both fail closed: the LLM sees the error and self-corrects in the same loop iteration.",
      },
      {
        kind: "code",
        heading: "RefundCo's hook chain",
        lang: "typescript",
        code: `// refund-agent/.agent/hooks/index.ts
export const hooks = {
  beforeToolCall: [
    redactPII,                    // strip emails/SSNs from args
    enforceAllowList,             // tool must be in registry
    blockRefundOver500,           // refunds > $500 require approval
    blockDestructiveBash,         // regex filter on bash tool
  ],
  afterToolCall: [
    validateJsonShape,            // schema check on tool output
    verifyStripeIdempotency,      // never charge twice
    runTypeChecker,               // if the tool wrote code
    runRelatedTests,              // if the tool changed src/
    snapshotForAudit,             // every privileged write
  ],
};

// Each hook returns either { ok: true } or { ok: false, reason: string }.
// On reject, the harness injects { error: reason } into context and
// the LLM gets to retry on its next turn.`,
        caption:
          "Order matters: cheap deterministic checks first, expensive LLM-judges last (if at all).",
      },
      {
        kind: "worked-trace",
        heading: "Watching the hook chain catch a $1,200 refund",
        scenario:
          "Ticket #4101: a customer asks for a $1,200 refund on an annual plan. The model decides to issue the refund. RefundCo's hook chain has something to say about that.",
        turns: [
          {
            actor: "llm",
            label: "1. Reason",
            detail:
              "Model emits: 'Customer wants their annual plan refunded. Calling stripe_create_refund(amount=120000, charge=ch_yyy).'",
          },
          {
            actor: "hook",
            label: "2. Pre-tool: blockRefundOver500",
            detail:
              "Hook inspects args: amount=120000 (cents) = $1,200. Returns { ok: false, reason: 'refund > $500 requires human approval. call request_human_approval first.' }",
          },
          {
            actor: "state",
            label: "3. Inject",
            detail:
              "Harness appends the error to context. The stripe_create_refund call did NOT execute.",
          },
          {
            actor: "llm",
            label: "4. Reason (retry)",
            detail:
              "Model reads the error, recalibrates: 'Right — this is over $500. Calling request_human_approval(amount=1200, ticket=4101, reason=annual plan refund).'",
          },
          {
            actor: "tool",
            label: "5. Execute",
            detail:
              "request_human_approval posts to #refunds-approvals on Slack with approve/reject buttons. Returns { paused: true, approval_token: 'apv_x' }.",
          },
          {
            actor: "state",
            label: "6. Checkpoint",
            detail:
              "State writes { ticket: '4101', stage: 'awaiting_approval', token: 'apv_x' }. The agent halts cleanly. When approval lands, a webhook restarts the loop with the verdict in context.",
          },
        ],
        takeaway:
          "The model never executed the dangerous call. The hook turned a $1,200 incident into a 30-second Slack approval. The model didn't 'learn' anything — but the next time it tries, the hook will reject again. Structural enforcement is permanent; prompt-level pleading is not.",
      },
      {
        kind: "callout",
        tone: "tip",
        heading: "Computational > inferential",
        body:
          "When you have a deterministic check (a linter, a type checker, a schema validator), use it. Reach for an LLM-as-judge only when no deterministic check exists. Inferential checks are slow, expensive, and themselves susceptible to sycophancy.",
      },
      {
        kind: "naive-vs-engineered",
        naive: {
          code: `# Agent writes code
# Agent reviews own code: "Looks fine"
# Code lands in PR
# CI fails 3 minutes later
# Engineer pings agent: "fix CI"`,
          problem:
            "The feedback loop runs in human-minutes, not agent-seconds. Errors compound across multiple commits before the agent learns.",
        },
        engineered: {
          code: `# After every file edit:
hooks.afterToolCall.run([
  () => exec("pnpm tsc --noEmit"),
  () => exec("pnpm test --related"),
  () => exec("pnpm lint --fix"),
])
// If any fail: stderr is injected back into context.
// Agent sees the failure within the same loop iteration.`,
          benefit:
            "The agent self-corrects within a single iteration. By the time work reaches CI, it already typechecks, tests, and lints clean.",
        },
      },
      {
        kind: "objection",
        question:
          "Can't I just put 'always run tests after editing' in AGENTS.md? That seems simpler than wiring up hooks.",
        response:
          "You can, and the model will obey 70-90% of the time. The other 10-30% becomes incidents. A hook makes the rule structural — it cannot be skipped, even if the model has a good reason. The hook is also more economical: it runs without burning context tokens explaining when to run tests, when not to, what to do on failure, and so on. Move enforcement out of the prompt and into code wherever you can.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: hooks too slow to matter",
        failure:
          "RefundCo added a post-tool hook that ran the entire test suite after every file edit. The agent's effective throughput dropped 15x. Engineers turned the hook off.",
        trigger:
          "The hook took 90 seconds. By the time it returned, the agent's context had moved on to the next file. The error landed without the surrounding reasoning, and the agent struggled to attribute the failure.",
        detect:
          "Look at the time-between-tool-calls metric. If hooks take longer than ~5-10 seconds, you're paying the cost without getting the benefit.",
        prevent:
          "Use --related (vitest, jest, pytest) to scope tests to the changed files. Use tsc --noEmit instead of a full build. Run heavy checks at phase boundaries, not every iteration.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "Your CI is doing the work your hooks should be doing.",
            cause: "Push validation left. Anything CI catches, hooks should catch first.",
          },
          {
            signal: "Verification takes more than 30 seconds.",
            cause:
              "The agent context will move on before feedback arrives. Speed up the loop or split the checks.",
          },
          {
            signal: "Hooks pass but the artifact is still wrong.",
            cause:
              "Your checks don't cover the failure mode. Add a check that would have caught last week's incident.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "RefundCo's agent issued a refund and the hook chain didn't run because the tool was 'safe.' Where's the bug?",
            a: "The hook chain should run for every tool call, even 'safe' ones. snapshotForAudit alone justifies it. 'Safe' tools are how exfiltration usually starts.",
          },
          {
            q: "A hook takes 60 seconds. What two things could you do?",
            a: "(1) Scope it: pnpm test --related instead of full suite. (2) Defer it: run at phase boundaries instead of every iteration.",
          },
          {
            q: "Should hooks return rich error messages, or terse ones?",
            a: "Verbose only on failure. The model reads errors as instructions. Rich, specific errors ('refund > $500 requires human approval. call request_human_approval first.') self-correct better than terse ones ('blocked').",
          },
        ],
      },
    ],
    coachTips: [
      "Treat slow hooks as a bug. Profile and optimize like any production hot path.",
      "Make hook output verbose only on failure. On success, a single OK line is enough.",
      "Story: a team I worked with chained 11 post-tool hooks because each was 'cheap.' Total: 8 seconds. Looked fine. But the cumulative latency caused the agent to lose its train of thought, and they saw a measurable quality drop. They merged half the hooks into a single 'lint & types' check. Quality recovered.",
      "Order pre-tool hooks cheapest-first. A regex check before a network call before an LLM-judge. Bail at the first rejection.",
      "When you write a new hook, also write the test that proves it would have caught last week's incident. If you can't write that test, you don't have a hook — you have a hope.",
    ],
    furtherReading: [
      {
        sourceId: "fowler-harness",
        section: "Feedback controls section",
        note: "The clean control-theory framing. After this article you will see hooks everywhere you look.",
      },
      {
        sourceId: "anthropic-beyond-permissions",
        section: "Whole article",
        note: "How to graduate from 'ask before every action' to declarative policy. The conceptual upgrade behind PreToolUse hooks.",
      },
      {
        sourceId: "fowler-internal-quality",
        section: "Whole article",
        note: "In-loop linting and tests as a structural quality lever. Read this when stakeholders push for 'review after generation' instead.",
      },
      {
        sourceId: "openhands-prompt-injection",
        section: "Confirmation mode and analyzers",
        note: "The PreToolUse hook is also your prompt-injection defense. This article spells out the threat model in detail.",
      },
      {
        sourceId: "langchain-improving-deepagents",
        section: "Hook ablation study",
        note: "Quantitative evidence that hooks alone change benchmark scores. The empirical case for this module's whole premise.",
      },
      {
        sourceId: "agentops-sdk",
        section: "PreCall and PostCall hooks",
        note: "AgentOps' instrumentation hooks ship out of the box. Useful when you want observability without writing your own.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "memory-context-management",
    number: 5,
    title: "Memory Management: Compaction, Offloading, Resets",
    level: "L3",
    levelTransition: "L3",
    tenetIds: ["context-budget"],
    estimatedReadingMinutes: 15,
    summary:
      "Treating the context window as a working-memory budget — when to compact, when to offload, and when to wipe and rehydrate. RefundCo's agent starts choking on long Stripe webhook dumps. We fix it.",
    caseStudyContext:
      "RefundCo's agent now handles complex tickets, but for tickets with chargeback history the Stripe webhook log is 12,000 lines. The agent reads the whole thing into context, drowns, and starts hallucinating refund reasons. Memory must be managed.",
    learningOutcomes: [
      "Detect context rot and context anxiety in long-running sessions.",
      "Apply compaction, offloading, and full-reset strategies appropriately.",
      "Build a rehydration flow that survives a complete context wipe.",
      "Distinguish between symptoms that look the same (slow agent, premature wrap-up) but require different fixes.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Three memory strategies",
        body:
          "Compaction summarizes old turns in place; the conversation continues but with less detail. Offloading writes large outputs to disk and replaces them with pointers; the agent can re-read on demand. Reset wipes context entirely and rehydrates from durable state. The harness should support all three and pick the right one for the situation. Compaction is fastest but lossy. Offloading is precise but adds an extra read step. Reset is the cleanest but requires good externalized state (Module 6).",
      },
      {
        kind: "code",
        heading: "RefundCo's offloading interceptor",
        lang: "python",
        code: `# refund_agent/runtime/offload.py
def execute_tool(call):
    raw = run(call)
    if estimate_tokens(raw) > 8_000:
        key = f"/runs/{run_id}/{call.id}.txt"
        fs.write(key, raw)
        head, tail = raw[:1500], raw[-500:]
        return ToolResult(
            summary=f"{head}\\n…[{estimate_tokens(raw)} tokens offloaded]…\\n{tail}",
            ref=key,
            hint="Use grep_file or read_file to inspect specific sections."
        )
    return ToolResult(summary=raw)

# When the agent next calls stripe_get_webhook_log on a chargeback ticket,
# the 12,000-line dump is offloaded. The agent sees a head/tail summary and
# a hint. It can then surgically grep_file("/runs/.../webhook.txt", "refund").`,
        caption:
          "The agent's context stays under 8k tokens for tool output. Specific lines are reachable via grep_file when needed.",
      },
      {
        kind: "code",
        heading: "Compaction at a soft threshold",
        lang: "python",
        code: `# When context utilization > 60%, summarize old turns
def maybe_compact():
    if context.utilization() > 0.60 and not context.recent_active(turns=10):
        old_turns = context.older_than(turns=20)
        summary = invoke_llm({
            "messages": old_turns + [{
                "role": "user",
                "content": "Summarize the actions, decisions, and current state in <300 tokens. Preserve ticket numbers and commit hashes verbatim."
            }]
        })
        context.replace_range(old_turns, summary)
        log("compacted", before=len(old_turns), after=estimate_tokens(summary))`,
        caption:
          "Compact only when the recent turns are inactive. Compacting active reasoning destroys it.",
      },
      {
        kind: "callout",
        tone: "warn",
        heading: "Context anxiety",
        body:
          "Anthropic documents a failure mode where models, sensing the window filling up, prematurely wrap up tasks with shallow summaries ('I'll wrap this up here…'). If your agent keeps quitting early, look at the context utilization at the moment of quit — context anxiety is the most common cause. The fix is not a bigger context window; it's earlier compaction or a phase-boundary reset.",
      },
      {
        kind: "objection",
        question:
          "Why not just use a 1M-token model and never worry about this? Memory management feels like a 2024 problem.",
        response:
          "Three reasons. First: attention degrades with depth. A model with 1M tokens of context still attends best to the first ~50k and the last ~5k; everything in the middle gets fuzzy. Second: context anxiety scales with utilization, not absolute size — a model at 80% of 1M behaves like one at 80% of 200k. Third: cost. You pay for every loaded token on every turn. A 1M-token loop costs ~5x what a well-managed 200k loop costs. Memory discipline isn't a workaround; it's a quality lever.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the 'helpful' early wrap-up",
        failure:
          "RefundCo's agent processed three tickets in a session. On the fourth, mid-ticket, it wrote: 'Looks like you've got several tickets queued. I'll wrap up by listing them, and you can run me again.' Then stopped.",
        trigger:
          "Context was at 78% utilization. The model picked up the cue and self-truncated to be 'helpful.' The user's actual request — process the fourth ticket — was abandoned.",
        detect:
          "Audit log shows the agent quitting before finishing its assigned work, with phrases like 'wrap up', 'for now', 'in summary'. Cross-reference with utilization. If utilization is high at quit-time, it's anxiety.",
        prevent:
          "Compact at 60%, not 95%. Reset at phase boundaries. Add a hook that detects wrap-up phrases at >60% utilization and forces a compaction before the model commits to quitting.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "The agent's quality degrades as the conversation grows.",
            cause: "Context rot. Compact or reset.",
          },
          {
            signal: "The agent finishes a multi-step task with 'I'll wrap this up here…'",
            cause: "Context anxiety. Reset and rehydrate from progress.json.",
          },
          {
            signal: "The agent re-reads the same large file three times in a session.",
            cause:
              "You compacted away the file content. Either offload (so it's referenceable) or do not compact tool results that the agent might need again.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "RefundCo's agent reads a 12,000-line webhook dump. Compact, offload, or reset?",
            a: "Offload. The agent needs to grep specific lines later. Compaction would destroy the searchable content; reset would lose the in-flight reasoning.",
          },
          {
            q: "RefundCo's agent has been going for 90 minutes on a complex ticket and starts saying 'I'll wrap this up.' Compact, offload, or reset?",
            a: "Reset. The session is exhausted. Wipe the context and rehydrate from refund_progress.json + the last 20 git commits. The agent picks up clean.",
          },
          {
            q: "Two agent sessions on the same ticket produce different results. The only difference is one had 4k tokens of unrelated history. What's the diagnosis?",
            a: "Context pollution. Even 'irrelevant' history biases attention. Phase-boundary resets between unrelated work prevent this.",
          },
        ],
      },
    ],
    coachTips: [
      "Instrument context utilization. Make it a first-class metric, not an afterthought. You cannot manage memory you cannot measure.",
      "Practice resets in dev. If your agent can't survive a wipe, your state externalization is broken (Module 6 will fix that).",
      "Story: I once watched an agent get noticeably 'tired' across a long session — slower, vaguer, more hedging. The fix was a context reset, not a model swap. The model was fine; the context was the bottleneck.",
      "When in doubt, prefer offloading over compaction. Offloaded content is recoverable; compacted content is not.",
      "Set the compaction threshold at 60%, not 90%. By the time you're at 90%, the model has already started behaving worse — you've waited too long.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-effective-harnesses",
        section: "Section: 'Context anxiety and compaction'",
        note: "The original definition of context anxiety. Read this once and you'll diagnose it on sight forever after.",
      },
      {
        sourceId: "anthropic-context-engineering",
        section: "Whole article",
        note: "Anthropic's broader context-engineering manifesto. Treat the window as a budget, not a dumping ground.",
      },
      {
        sourceId: "manus-context-engineering",
        section: "KV-cache locality section",
        note: "Manus' operational playbook. KV-cache locality alone is worth a real latency improvement when you implement it correctly.",
      },
      {
        sourceId: "openhands-condensation",
        section: "Compaction architecture diagram",
        note: "Concrete compaction architecture: what to keep (goals, progress, critical files, failing tests), what to drop, how to verify the compacted state still works.",
      },
      {
        sourceId: "humanlayer-advanced-context",
        section: "Whole article",
        note: "Where 12 Factor Agents tells you 'own your context window,' this article tells you how.",
      },
      {
        sourceId: "humanlayer-backpressure",
        section: "Backpressure techniques",
        note: "For when your agent reads 50 files to answer a question that needed 3. The cure for context obesity.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "long-running-tasks",
    number: 6,
    title: "Long-Running Tasks: State, Git, and Phase Boundaries",
    level: "L4",
    levelTransition: "L3 → L4",
    tenetIds: ["state-externalization"],
    estimatedReadingMinutes: 18,
    summary:
      "Designing agents that can run for hours or days — by externalizing state into JSON files and using git as durable memory. RefundCo's agent now needs to clear a 200-ticket backlog overnight without dropping anything.",
    caseStudyContext:
      "RefundCo wants the agent to clear an overnight backlog. That means surviving sandbox restarts, network blips, and at least one full context wipe at the halfway point. The agent must be able to pick up exactly where it left off — every time.",
    learningOutcomes: [
      "Maintain a feature_list.json (or refund_progress.json) that is the canonical record of progress.",
      "Enforce clean-state preconditions at every phase boundary.",
      "Write rehydration code that lets a fresh agent resume work without context.",
      "Use git as durable memory without letting the agent corrupt history.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Two-fold harness structure",
        body:
          "Anthropic's recommendation for long-running tasks is a two-fold structure: a structured progress file (always JSON, never markdown — markdown gets accidentally rewritten by helpful agents), plus frequent git commits as the durable record of code changes. Together they form a recoverable state model: at any phase boundary, you can wipe the context entirely and rebuild it from these two artifacts. The progress file says what's been done; the git log says how.",
      },
      {
        kind: "diagram",
        heading: "What happens at a phase boundary",
        src: "/manus-storage/phase_4384c20b.png",
        alt: "Diagram showing Phase 1 with 78k tokens of context, a phase boundary checking preconditions (git clean, tests green, feature done), then wiping context to 0 and rehydrating from AGENTS.md, feature_list.json, and git log into Phase 2 with 3k tokens of context.",
        caption:
          "The 'aha' moment: the harness deliberately throws away 78k tokens of working memory because everything important has been written to durable state. The fresh phase starts with 3k tokens of crisp context.",
      },
      {
        kind: "code",
        heading: "RefundCo's refund_progress.json",
        lang: "json",
        code: `{
  "session_started_at": 1737280000,
  "total_tickets": 200,
  "tickets": [
    {
      "id": "4421",
      "status": "done",
      "stripe_refund_id": "re_abc123",
      "commit": "a3f9c1b",
      "completed_at": 1737283200
    },
    {
      "id": "4422",
      "status": "in_progress",
      "stage": "awaiting_human_approval",
      "approval_token": "apv_x9",
      "started_at": 1737283210
    },
    { "id": "4423", "status": "todo" },
    { "id": "4424", "status": "todo" },
    { "id": "4425", "status": "blocked", "reason": "missing customer record" }
  ],
  "audit_log_dir": "/runs/2026-05-12-overnight/"
}`,
        caption:
          "Treat this file as a database, not a document. Read-modify-write atomically. JSON, not markdown — markdown invites the agent to 'helpfully' restructure it.",
      },
      {
        kind: "code",
        heading: "rehydrate(): the function that brings an agent back from the dead",
        lang: "python",
        code: `# refund_agent/runtime/rehydrate.py
def rehydrate(context):
    """
    Called when starting fresh OR resuming after a context wipe.
    Reads only from durable state. Never depends on prior context.
    """
    # 1. The boot rules
    context.inject(read("AGENTS.md"))

    # 2. The progress file — the only source of truth on what's been done
    progress = json.load(open(".agent/refund_progress.json"))
    context.inject({
        "role": "system",
        "content": (
            f"Session: {progress['session_started_at']}. "
            f"Tickets: {sum(1 for t in progress['tickets'] if t['status'] == 'done')}"
            f" done, {sum(1 for t in progress['tickets'] if t['status'] == 'todo')} todo. "
            f"Resume by picking the next 'todo' ticket."
        )
    })

    # 3. The last 20 git commits — the history of how we got here
    commits = git.log(n=20, format="%h %s")
    context.inject({"role": "system", "content": "Recent commits:\\n" + commits})

    # 4. Any in-progress ticket — pick up exactly where the prior agent left off
    in_progress = next((t for t in progress["tickets"] if t["status"] == "in_progress"), None)
    if in_progress:
        context.inject({
            "role": "user",
            "content": f"Ticket {in_progress['id']} was {in_progress['stage']}. Continue."
        })

    log("rehydrated", tokens=context.utilization())`,
        caption:
          "If you can't write rehydrate(), your state is not externalized — it's leaking into context. Test rehydrate by killing your agent mid-session and running rehydrate() in a fresh process.",
      },
      {
        kind: "worked-trace",
        heading: "RefundCo's overnight run, sampled across phase boundaries",
        scenario:
          "200 tickets to process. The agent works for 90 minutes, hits a context-anxiety threshold at ticket 87, takes a phase boundary, and continues fresh. We'll watch the boundary itself.",
        turns: [
          {
            actor: "state",
            label: "Pre-boundary checkpoint",
            detail:
              "After ticket 87, the harness checks: git status clean? Yes. Tests green? Yes. refund_progress.json fully written and fsync'd? Yes. Phase boundary preconditions met.",
          },
          {
            actor: "hook",
            label: "Boundary trigger",
            detail:
              "Context utilization is at 71%. The harness logs: 'Phase boundary triggered at ticket 87/200. Wiping context.' (If preconditions had failed, the boundary would block instead of wipe.)",
          },
          {
            actor: "state",
            label: "Wipe",
            detail:
              "context.wipe() — 71k tokens go to /dev/null. Nothing in working memory survives.",
          },
          {
            actor: "state",
            label: "Rehydrate",
            detail:
              "rehydrate(context) reads AGENTS.md, refund_progress.json, and git log -n 20. New context size: 3.2k tokens. The agent has all the durable knowledge it needs and none of the working-memory baggage.",
          },
          {
            actor: "llm",
            label: "Resume",
            detail:
              "Model on its first post-boundary turn: 'Picking up. Tickets 1–87 are done. Ticket 88 is next. Looking it up now.' No drift, no confusion, no apology.",
          },
        ],
        takeaway:
          "The agent that finishes ticket 200 is not the same agent that started ticket 1. Every phase boundary is a graceful death and rebirth. The state file is the soul; the context is the body.",
      },
      {
        kind: "callout",
        tone: "insight",
        heading: "JSON, not markdown",
        body:
          "Anthropic specifically recommends JSON for the progress file. Markdown is too tempting for agents to 'helpfully reformat' in ways that destroy state. JSON's strict schema makes accidental overwrites obvious and recoverable.",
      },
      {
        kind: "objection",
        question:
          "Can't I just use a database instead of a JSON file? This feels primitive.",
        response:
          "You can, and at scale you should. The reason JSON-on-disk is the recommended starting point: it's inspectable (cat the file), versionable (commit it), portable (no infra dependency), and crash-safe (atomic rename). A database adds operational surface area for benefits you can defer. When the file gets unwieldy — multiple agents, sharded state, query needs — graduate to a database. Until then, the file is the right primitive.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the agent that 'finished' twice",
        failure:
          "RefundCo's agent reported completing 73 tickets, crashed, was restarted, and reported completing 41 tickets. Total: 114. Stripe showed 87 actual refunds.",
        trigger:
          "The agent kept its state in memory and committed to refund_progress.json only at session end. The crash truncated the file mid-write. On restart, rehydrate() read a corrupt file and double-counted.",
        detect:
          "Cross-reference the progress file against the audit log. If you can't reconcile from durable artifacts, your state isn't really durable.",
        prevent:
          "Atomic writes (write-temp-then-rename). Commit progress every N tickets, not at session end. Make the audit log the secondary source of truth — Stripe IDs are unique and reconcilable.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "An agent restart loses hours of work.",
            cause: "State is not externalized. Build refund_progress.json + git commits.",
          },
          {
            signal: "The agent skips features it already completed.",
            cause:
              "Rehydration is reading the wrong source. Verify refund_progress.json is the only source of truth.",
          },
          {
            signal: "Two parallel agents write the same ticket as 'done.'",
            cause:
              "Read-modify-write isn't atomic. Use a lock file or shard the work by ticket-id range.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "Your agent crashed at ticket 47/200. After restart, how does it know which ticket to pick up?",
            a: "rehydrate() reads refund_progress.json, finds the first ticket with status='in_progress' or 'todo' after the last 'done' one, and resumes from there.",
          },
          {
            q: "Why does the harness require git status clean as a phase-boundary precondition?",
            a: "Uncommitted changes are working memory that lives outside the progress file. They will not survive a context wipe and rehydrate. Either commit them or revert them — but don't carry them across a boundary.",
          },
          {
            q: "RefundCo's agent runs every night. The progress file grows 200 tickets/night. After a week it's 1.4MB. Is this a problem?",
            a: "Eventually, yes. Rehydration loads the whole file. Strategies: (a) archive completed tickets to a separate file, (b) keep only the open + last-N-completed in the live file, (c) graduate to a database when the file exceeds ~100KB or so.",
          },
        ],
      },
    ],
    coachTips: [
      "Commit early, commit often. Each completed subtask is a commit.",
      "Treat refund_progress.json as a database, not a document. Read-modify-write atomically.",
      "Story: a team I worked with kept their progress file in /tmp because 'it's fine.' One reboot later, 14 hours of agent work was gone, but the agent kept reporting success because in-context state was intact. Move durable state to durable disk before you need to.",
      "Test rehydrate() in CI. Kill an agent mid-session, run rehydrate, assert the new agent picks up the correct next ticket. If you skip this test, you'll discover the bug in production.",
      "Make the harness, not the agent, responsible for writing the progress file. Agents will lie to themselves about progress; the harness only writes when a tool call returns success.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-effective-harnesses",
        section: "JSON progress files and phase boundaries",
        note: "The canonical pattern. Includes the rehydration script idea that we adapt in this module's RefundCo example.",
      },
      {
        sourceId: "humanlayer-12-factor",
        section: "Factor 5: Unify execution state",
        note: "Why agent state and business state belong in the same store. The factor most often violated in early prototypes.",
      },
      {
        sourceId: "ralph-wiggum",
        section: "Whole post",
        note: "Twelve lines of bash that demonstrate state externalization in its purest form: the agent's entire memory is the contents of PROMPT.md and the file system. Read this once and the pattern stops feeling abstract.",
      },
      {
        sourceId: "inngest-harness-not-framework",
        section: "State and durability section",
        note: "The infrastructure case for treating state as durable, not session-bound. Pairs with this module's RefundCo refund_progress.json.",
      },
      {
        sourceId: "citadel-harness",
        section: "Persisted memory and campaign state",
        note: "A real harness that ships isolated worktrees and persisted state. Useful as a 'serious' counterpoint to Ralph's minimal pattern.",
      },
      {
        sourceId: "manus-context-engineering",
        section: "Filesystem memory section",
        note: "Manus' argument that the filesystem is the right primary memory store, not the context window. Ties this module to Module 5.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "multi-agent-systems",
    number: 7,
    title: "Multi-Agent Systems: Planner, Generator, Evaluator",
    level: "L5",
    levelTransition: "L4 → L5",
    tenetIds: ["separation-of-concerns"],
    estimatedReadingMinutes: 19,
    summary:
      "Anthropic's GAN-inspired architecture for complex tasks — separating planning, generation, and evaluation into distinct agents with distinct contexts. RefundCo splits its monolithic agent into three roles to break sycophantic self-grading.",
    caseStudyContext:
      "RefundCo's agent passes its own tests reliably. But humans keep finding bugs in code review — usually 'edge cases the agent didn't consider.' The agent grades itself charitably. We're going to give that grading job to a different agent.",
    learningOutcomes: [
      "Architect a Planner → Generator → Evaluator pipeline.",
      "Use sprint contracts as the long-term record of what 'done' meant.",
      "Use Evaluator rejections as structured feedback into Generator context.",
      "Decide when separation is worth the cost (it isn't always).",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Why one agent isn't enough",
        body:
          "Single-agent loops fail predictably on complex work because the agent has no incentive to find its own mistakes. Sycophancy is structural — the same context that produced the work is grading it. Anthropic's answer is a GAN-style separation: a Planner negotiates the contract, a Generator does the work, and an Evaluator with a fresh context grades the output against the contract. The Evaluator has no investment in the artifact — it didn't build it, can't 'remember' the reasoning, and is prompted only with the contract and the result. This breaks the sycophancy loop.",
      },
      {
        kind: "diagram",
        heading: "Three roles, three contexts",
        src: "/manus-storage/three_agent_58fdca31.png",
        alt: "Diagram showing a vague task flowing into a Planner agent which produces a sprint contract, requiring human approval, then the Generator agent producing an artifact, which is graded by an Evaluator in a fresh context. On reject, reasons are injected into Generator context for retry.",
        caption:
          "The Evaluator's box is intentionally drawn separate. It runs in a different process with a different system prompt and (often) a different model invocation. The cost is real but minor compared to the cost of shipped defects.",
      },
      {
        kind: "code",
        heading: "RefundCo's three-agent topology",
        lang: "python",
        code: `# refund_agent/topology.py
class HarnessTopology:
    def __init__(self):
        self.planner   = Agent(prompt="planner.md",   tools=[draft_contract])
        self.generator = Agent(prompt="generator.md", tools=CODE_TOOLS)
        self.evaluator = Agent(prompt="evaluator.md", tools=[render, grade])

    def run(self, task):
        contract = self.planner.run(task)
        human.approve(contract)

        for attempt in range(MAX_ATTEMPTS):
            artifact = self.generator.run(contract)
            verdict  = self.evaluator.run(contract, artifact)  # FRESH context
            if verdict.passed:
                return artifact
            self.generator.context.append({
                "rejected_attempt": attempt,
                "reasons": verdict.reasons,
            })
        raise EscalateToHuman(contract, artifact)`,
      },
      {
        kind: "code",
        heading: "RefundCo's evaluator.md (the prompt that breaks sycophancy)",
        lang: "markdown",
        code: `# evaluator.md

## Identity
You are the Evaluator. You did NOT write the artifact you are about to
review. You have no investment in it passing. Your job is to grade it
strictly against the sprint contract — nothing more, nothing less.

## Your inputs
- The sprint contract (YAML)
- The artifact (code, test results, logs)
- Nothing else. You do NOT see the Generator's reasoning or chat history.

## Your output
- For each acceptance_criterion: PASS or FAIL with a one-sentence reason.
- For each non_goal: VIOLATED or RESPECTED.
- A final verdict: PASSED or REJECTED.
- If REJECTED: a list of specific things the Generator must change.

## Hard rules
- Do NOT speculate about what the Generator 'meant.' Grade what's there.
- A criterion is FAIL if you cannot prove it passes from the artifact alone.
- Reject for missing tests as readily as for missing functionality.

## Past rejections (your track record)
- ticket #4308 attempt 2: REJECTED for missing chargeback regression test.
  Generator added it on attempt 3. Final verdict: PASSED.`,
        caption:
          "Note what's missing: any phrasing that invites empathy, generosity, or 'partial credit.' The Evaluator's only ally is the contract.",
      },
      {
        kind: "callout",
        tone: "insight",
        heading: "The Evaluator must have a fresh context",
        body:
          "If the Evaluator shares context with the Generator, it inherits the Generator's bias toward declaring success. Use a separate process, separate prompt, separate model invocation. The cost is real but minor compared to the cost of shipped defects.",
      },
      {
        kind: "naive-vs-engineered",
        naive: {
          code: `# One agent, one loop
agent.run("Add subscription-pause handling to the refund agent")
# Agent: "Done! It looks great."
# Reality: 3 hidden bugs, no annual-plan check`,
          problem:
            "Self-grading. The same context that produced the bugs is the one declaring success.",
        },
        engineered: {
          code: `# Three-agent harness with sprint contract
contract = planner.draft_contract("subscription pauses")
human.approve(contract)
artifact = generator.run(contract)
verdict  = evaluator.grade(contract, artifact)
# Evaluator rejects: "Acceptance criterion 4 (annual plan
# escalation) FAILS: no test exercises the annual path."
# Generator retries with rejection reasons in context`,
          benefit:
            "The Evaluator has no investment in the work; rejections are calibrated and specific. Defects are caught inside the agent loop, not in production review.",
        },
      },
      {
        kind: "objection",
        question:
          "Three agents instead of one means 3x the LLM calls. How is that worth it?",
        response:
          "Two ways to look at the cost. (1) Wallet cost: yes, ~3x per task — but only on tasks complex enough to need a contract. Simple tasks still run on a single agent. (2) Total cost: a defect caught by the Evaluator costs one extra LLM call. A defect caught in code review costs ~30 minutes of human attention. A defect that ships costs whatever the incident costs. The ratio is wildly in favor of the three-agent topology for any task above 'trivial.'",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the friendly Evaluator",
        failure:
          "RefundCo's first Evaluator was prompted with: 'Review this artifact and provide constructive feedback.' It approved every artifact, often with a 'looks great, just a few minor suggestions.'",
        trigger:
          "The prompt invited empathy and partial credit. The Evaluator behaved like a friendly code reviewer, not a strict grader.",
        detect:
          "Track Evaluator approval rate. If it approaches 100%, the Evaluator isn't doing its job. RefundCo's calibrated Evaluator runs at ~70% approval — a healthy rejection rate.",
        prevent:
          "Prompt the Evaluator as a strict grader, not a reviewer. Give it the contract and forbid speculation. Reward rejections in the past-rejections section. Re-read evaluator.md every quarter and check that it still feels uncomfortable to read.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "Your single agent declares victory but humans keep rejecting PRs.",
            cause: "Sycophantic self-grading. Add an Evaluator agent.",
          },
          {
            signal: "Evaluator and Generator agree too easily.",
            cause: "They share too much context. Verify they run in separate processes.",
          },
          {
            signal: "Evaluator rejects everything; nothing ever ships.",
            cause:
              "The contract has impossible criteria, or the Evaluator is graded by friendliness instead of accuracy. Recalibrate the contract.",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "Why does the Evaluator's prompt forbid speculation about what the Generator 'meant'?",
            a: "Speculation is the entry point for sycophancy. Once the Evaluator starts giving partial credit for intent, it stops grading the artifact. The artifact alone is the evidence; the contract alone is the rubric.",
          },
          {
            q: "When is single-agent looping still the right choice?",
            a: "When the task is simple enough that a sprint contract would be overkill — small bug fixes, refactors with deterministic acceptance, mechanical migrations. The three-agent topology is for fuzzy, high-stakes, or hard-to-revert work.",
          },
          {
            q: "After three rejections, the Generator still can't satisfy the Evaluator. What does the harness do?",
            a: "Escalate to a human. The contract is probably wrong (impossible or contradictory) or the task is bigger than one sprint. Either way, a human needs to break the loop. Don't let the agents grind forever.",
          },
        ],
      },
    ],
    coachTips: [
      "Persist sprint contracts as files. They become the long-term record of what 'done' meant.",
      "Cap retries. If the Generator can't satisfy the Evaluator after 3 attempts, escalate to a human.",
      "Story: a team I worked with ran the Evaluator with the same model and prompt as the Generator and called it a day. Approval rate: 100%. They added a strict prompt and a separate process. Approval rate dropped to 71%. Quality jumped immediately. The Evaluator was always the lever; they had been pulling on a stuffed one.",
      "When the Evaluator rejects, log the reason verbatim into the Generator context — don't summarize. The Generator needs to see the specific words.",
      "Run the Evaluator with a smaller (cheaper) model than the Generator if you can. Grading is often easier than producing, and the Evaluator's freshness matters more than its raw capability.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-harness-design",
        section: "Planner / Generator / Evaluator architecture",
        note: "The architecture pattern this module is built around. Anthropic's most concrete description of the GAN-inspired loop.",
      },
      {
        sourceId: "anthropic-multi-agent-research",
        section: "Role separation and structured coordination",
        note: "Anthropic's production write-up of multi-agent research. The closest reference for what 'serious' looks like at this layer.",
      },
      {
        sourceId: "humanlayer-12-factor",
        section: "Factor 10: Small, focused agents",
        note: "The principle that justifies splitting the work. Read this and you'll stop trying to make a single agent do everything.",
      },
      {
        sourceId: "deepagents",
        section: "Architecture overview",
        note: "LangChain's open-source reference for production multi-agent harnesses. Worth reading the source.",
      },
      {
        sourceId: "langchain-anatomy",
        section: "Orchestration component section",
        note: "The orchestration layer is where multi-agent coordination lives. This article frames it cleanly within the broader harness anatomy.",
      },
      {
        sourceId: "walkinglabs-learn",
        section: "Lectures on multi-agent coordination",
        note: "The sister course covers similar territory with different examples. Useful triangulation.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "production-readiness",
    number: 8,
    title: "Production Readiness: Sandboxing, Approvals, Observability",
    level: "L5",
    levelTransition: "L5",
    tenetIds: ["safe-autonomy"],
    estimatedReadingMinutes: 20,
    summary:
      "Shipping autonomous agents that act on real systems — with structural safety, human-in-the-loop escalation, and the observability you'd expect from any production service. RefundCo's agent goes live, with kill switches.",
    caseStudyContext:
      "RefundCo's harness is engineered. The agent is correct on tickets, recovers from crashes, and breaks sycophancy with multi-agent grading. Now: real money, real customers, real auditors. Production is the final test.",
    learningOutcomes: [
      "Sandbox agent execution to bound blast radius.",
      "Use request_human_approval to keep humans in the loop without blocking the whole flow.",
      "Instrument the harness with metrics, traces, and audit logs.",
      "Run a fire drill that proves you can stop the agent in under 60 seconds.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "Reduce friction without losing control",
        body:
          "Productive long-running agents require fewer human approvals. But every removed approval must be replaced by structural enforcement — otherwise removing approvals just means removing safety. The harness becomes the policy boundary: sandboxes contain blast radius, allow-lists constrain tools, hooks escalate sensitive actions, and audit logs make every privileged action reviewable after the fact. The goal is autonomy with consent — the agent runs unattended within explicit, inspectable boundaries.",
      },
      {
        kind: "code",
        heading: "RefundCo's production sandbox",
        lang: "yaml",
        code: `# docker-compose.refund-agent.yml
services:
  agent:
    image: refundco/agent-runtime:latest
    read_only: true                       # filesystem is read-only
    tmpfs: [/tmp, /workspace]             # writable scratch only
    cap_drop: [ALL]                       # no Linux capabilities
    network_mode: none                    # no implicit network
    mem_limit: 2g
    pids_limit: 256
    volumes:
      - ./repo:/workspace:ro              # source code, read-only
      - ./.agent:/agent:ro                # AGENTS.md, skills
      - ./audit-out:/audit:rw             # audit log volume

  egress-proxy:
    image: refundco/egress-proxy:latest
    # Only allows traffic to api.stripe.com and slack.com
    # Every outbound request is logged with timestamp + tool_call_id`,
        caption:
          "Network=none plus an explicit egress proxy means the agent cannot exfiltrate to arbitrary destinations. Every byte that leaves is traceable.",
      },
      {
        kind: "code",
        heading: "Human-in-the-loop via tool call",
        lang: "typescript",
        code: `// .agent/tools/request_human_approval.ts
export async function request_human_approval(args: {
  action: string;
  reason: string;
  blast_radius: "low" | "medium" | "high";
  data: Record<string, unknown>;
}) {
  const token = nanoid();
  await db.insertApproval({ token, ...args, status: "pending" });

  await slack.post({
    channel: pickChannel(args.blast_radius), // #refunds-low / #refunds-high
    text: \`Approval needed: \${args.action}\`,
    actions: ["approve", "reject"],
  });

  // Agent halts gracefully. State is persisted. Webhook resumes the loop.
  return { paused: true, approval_token: token };
}`,
        caption:
          "Approvals are tool calls, not blocking modal dialogs. The agent halts cleanly and the state file records the pause. Resume happens via webhook — the next agent run sees the verdict in context.",
      },
      {
        kind: "callout",
        tone: "tip",
        heading: "Observability is non-negotiable",
        body:
          "Treat the agent like any other production service. Emit traces (one span per loop iteration), metrics (loops/min, hook hit rate, retry rate, context utilization), and audit logs (every privileged tool call with inputs and outputs). Without observability, debugging a misbehaving agent is guesswork.",
      },
      {
        kind: "code",
        heading: "Audit log schema",
        lang: "json",
        code: `{
  "ts": "2026-05-12T03:14:22.119Z",
  "session_id": "ses_oVernight_2026_05_12",
  "ticket_id": "4422",
  "loop_iteration": 7,
  "actor": "tool",
  "tool_call": {
    "name": "stripe_create_refund",
    "args_redacted": {
      "amount": 7900,
      "charge": "ch_abc",
      "idempotency_key": "ref_4422_v1"
    }
  },
  "result": { "id": "re_xyz", "status": "succeeded" },
  "hooks_run": ["redactPII", "blockRefundOver500", "verifyStripeIdempotency"],
  "duration_ms": 412,
  "context_utilization_pct": 41
}`,
        caption:
          "Every privileged action ships with: who, what, when, with what hooks, and how long. Reconcilable against Stripe's logs.",
      },
      {
        kind: "objection",
        question:
          "We have logging already. Do I really need separate agent observability?",
        response:
          "Generic logging captures requests; agent observability captures decisions. You need to know not just 'the agent called Stripe' but 'the agent decided to call Stripe because of these context inputs, and Hook X was checked, and the result fed back into iteration N+1.' Generic infra logs don't carry that causal chain. Treat the loop as a first-class entity with its own metrics.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a failure: the runaway agent",
        failure:
          "RefundCo's first overnight run, the agent got stuck in a tight retry loop on a malformed ticket. It burned through 14 hours and 240,000 LLM tokens before anyone noticed.",
        trigger:
          "No retry budget on the loop. No alarm on context-utilization plateaus. No kill switch wired up.",
        detect:
          "loops/min metric was steady at 28. Same ticket_id in audit log for 14 hours. Token spend graph going up linearly. Any one of these alarms would have caught it.",
        prevent:
          "Cap retries per ticket (Module 7). Alarm on (ticket_id stuck > 30 minutes), (token spend > $X/hour), (loops with no state-file update > N). Wire a kill switch into a single Slack command that flips a feature flag and halts the agent within seconds.",
      },
      {
        kind: "when-this-hurts",
        items: [
          {
            signal: "An incident happens and you can't reconstruct what the agent did.",
            cause: "Missing audit logs. Log every privileged tool call before it runs.",
          },
          {
            signal: "Approval requests pile up unread.",
            cause: "Wrong channel, no SLA, or too many requests. Tune blast-radius thresholds.",
          },
          {
            signal: "The agent's allow-list has tools no one remembers adding.",
            cause:
              "Tools accumulate. Audit quarterly; remove unused ones. (One unused powerful tool is one too many.)",
          },
        ],
      },
      {
        kind: "self-check",
        questions: [
          {
            q: "RefundCo's agent decides to call a tool that isn't in its allow-list. What happens?",
            a: "The pre-tool hook (enforceAllowList) rejects. The model sees the rejection in context and either picks a different tool or escalates via request_human_approval. The dangerous call never executes.",
          },
          {
            q: "Production agent looks fine but you can't reproduce a customer-reported refund. What's the diagnostic?",
            a: "Audit log + state file are the two-source reconciliation. Audit log says 'agent did X, Y, Z'. State file says 'progress was at A, then B'. Stripe's records say 'these refunds happened.' Three sources of truth — if any disagree, you have a bug in the harness, not the model.",
          },
          {
            q: "How do you stop the agent in under 60 seconds?",
            a: "A feature flag the harness checks at the top of every loop iteration. A Slack command flips the flag. Within one iteration (typically <10s), the loop exits cleanly with state preserved. Practice this in a fire drill before you need it.",
          },
        ],
      },
    ],
    coachTips: [
      "Run a 'fire drill': pretend the agent went rogue and prove you can stop it in <60 seconds. If you can't, you're not production-ready.",
      "Audit your tool allow-list quarterly. Tools accumulate; remove unused ones.",
      "Story: a team I knew had perfect logging, perfect metrics, and a runaway agent at 3am. Nobody got paged because their alarm was on 'errors' and the agent's retry loop returned no errors. Add alarms for stalls, plateaus, and 'too quiet' — not just failures.",
      "Make the audit log append-only and shipped to a system the agent cannot write to (e.g., S3 with PutObject only). The agent should not be able to cover its tracks.",
      "Treat the harness like a service: it has SLOs, dashboards, on-call, and runbooks. If you wouldn't deploy it like a service, don't deploy it autonomously.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-beyond-permissions",
        section: "Whole article",
        note: "The authoritative reference on graduating from interactive permissions to declarative policy. The article behind this module's three-zone model.",
      },
      {
        sourceId: "openhands-prompt-injection",
        section: "Confirmation mode, analyzers, and hard policies",
        note: "The most operational guide to prompt-injection defense in print. Read this before exposing your agent to any untrusted input.",
      },
      {
        sourceId: "humanlayer-12-factor",
        section: "Factor 7: Contact humans with tool calls",
        note: "The factor that gives us the language for promotion gates and human-in-the-loop boundaries.",
      },
      {
        sourceId: "anthropic-mcp-execution",
        section: "Bounded execution boundaries",
        note: "How to give the agent execution power without losing inspection. Read alongside this module's PreToolUse policies.",
      },
      {
        sourceId: "citadel-harness",
        section: "Worktree isolation",
        note: "A reference implementation of the Restricted-Zone pattern. Worktrees-per-agent is one of the highest-leverage isolation techniques in production.",
      },
      {
        sourceId: "otel-genai",
        section: "GenAI semantic conventions",
        note: "If your traces aren't OTel-compatible, switching observability backends is a rewrite. Start here.",
      },
      {
        sourceId: "swe-agent",
        section: "Sandbox configuration",
        note: "SWE-agent's environment definition is a graduate-level reference for what a research-grade sandbox looks like.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "measuring-the-harness",
    number: 9,
    title: "Measuring the Harness: Evals, Telemetry, and the Benchmark Landscape",
    level: "L5",
    levelTransition: "L5",
    tenetIds: ["cybernetic-loop", "the-ratchet", "harness-is-artifact"],
    estimatedReadingMinutes: 22,
    summary:
      "You can’t engineer what you can’t measure. This module covers eval design for stateful agents, the OpenTelemetry GenAI semantic conventions, the benchmark landscape (SWE-bench, GAIA, Terminal-Bench, τ-Bench, OSWorld, WebArena), and a full walk-through of Ralph — twelve lines of bash that demonstrate every tenet at once. RefundCo learns to grade itself.",
    caseStudyContext:
      "RefundCo’s agent is in production. Every approval boundary, sandbox, hook, and state file from Module 8 is in place. But the team is now arguing about whether the latest prompt change made things ‘better.’ They have intuitions, anecdotes, and a Slack channel full of incidents — but no numbers. This module gives them numbers.",
    learningOutcomes: [
      "Choose the right eval shape for your agent (single-step, full-run, or multi-turn) and avoid measuring the wrong thing.",
      "Apply the no-skill baseline to stop fooling yourself with apparent gains.",
      "Wire OpenTelemetry GenAI semantic conventions so traces survive a backend swap.",
      "Read the benchmark landscape (SWE-bench, GAIA, Terminal-Bench, τ-Bench, OSWorld) and pick the one that actually models your problem.",
      "Read Ralph end to end and explain why twelve lines of bash teach the field.",
    ],
    sections: [
      {
        kind: "prose",
        heading: "The Argument You Cannot Win Without Numbers",
        body:
          "RefundCo’s post-mortem channel is full of incidents and full of fixes. But every Friday someone asks the question: are we getting better? The senior engineer feels they are. The product manager isn’t sure. The CFO wants to know if the agent costs more than it saves. None of these people can win their argument, because the team has no measurement surface. They have logs, but logs are not evals. They have anecdotes, but anecdotes are not signal.\n\nThis is the moment harness engineering becomes empirical. Up to here we have been building structure: AGENTS.md, hooks, state files, evaluator agents, sandboxes. Structure earns its keep when you can demonstrate that it moves a number you care about. The most important field-level data point in this discipline is from Anthropic and from LangChain: harness changes alone, with the same model, can move benchmark scores by amounts larger than the gap between leaderboard models. If that’s true — and it is — then your harness is the thing that’s competing, not your model. You owe it the same instrumentation discipline you would give any production service.",
      },
      {
        kind: "callout",
        tone: "insight",
        heading: "The empirical heart of the discipline",
        body:
          "Anthropic’s 'Quantifying Infrastructure Noise' shows that runtime configuration on coding evals can move scores by more than many leaderboard gaps. LangChain’s 'Improving Deep Agents with Harness Engineering' shows the same pattern with concrete deltas. Internalize this: most claimed model improvements are partly harness improvements in disguise. Most failed model upgrades are harness regressions in disguise. The harness is the variable, not the noise.",
      },
      {
        kind: "prose",
        heading: "Three Eval Shapes You’ll Actually Use",
        body:
          "Most of the eval literature collapses three very different things into the word 'eval.' For agents the distinction matters more than for raw models, because agents have trajectories, not just outputs.\n\n**Single-step evals** measure one decision in isolation: 'given this state and this user input, did the agent pick the right tool?' These are cheap, fast, and great for catching regressions in tool-selection or hook-rejection logic. They are also blind to long-horizon failure: an agent that aces every single step can still fail catastrophically over twelve steps.\n\n**Full-run evals** measure end-to-end task success: 'given this ticket, did the system produce a refund that matches the contract?' These are expensive but truthful. RefundCo’s nightly run replays last week’s top fifty tickets and grades whether the agent’s actions matched the human’s ground truth.\n\n**Multi-turn evals** — sometimes called trajectory evals — measure behavior over many turns of an interactive session: did the agent ask the right clarifying questions, recover gracefully from a bad tool result, and refuse to escalate without authorization? τ-Bench is the canonical example: it simulates a customer talking to your agent, with a domain policy you must follow.\n\nA mature harness uses all three. The fast ones gate every PR. The expensive ones run nightly. The multi-turn ones run weekly against the policies that actually matter.",
      },
      {
        kind: "naive-vs-engineered",
        naive: {
          lang: "text",
          code:
            "# Eval suite (the 'we have eyes on it' version)\n- Spot-check 5 tickets per week.\n- If something looks wrong, escalate in #refund-agent.\n- Track 'pass / fail' subjectively.\n- Compare prompt changes by vibes.",
          problem:
            "No baseline. No regression detection. No defense against the LLM-judge being sycophantic. No way to attribute a delta to harness vs. model vs. noise.",
        },
        engineered: {
          lang: "text",
          code:
            "# Eval suite (instrumented)\n- Single-step: 200 frozen (state, input) → expected_tool pairs.\n  Runs on every PR. <90s. Fails the build on regression.\n- Full-run: 50 anonymized real tickets with known ground truth.\n  Runs nightly. Compares pass-rate, cost, latency, hook-rejection rate.\n- Multi-turn: 20 τ-Bench-shaped scripted users with policy.\n  Runs weekly. Grades policy violations and recovery.\n- No-skill baseline: random tool / random arg agent runs the same suites.\n  If we’re not strictly above no-skill, the suite is broken.",
          benefit:
            "Three signal frequencies (PR / nightly / weekly) match three failure modes (regression / quality / policy). The no-skill baseline catches 'evals that look hard but aren’t.' Cost and latency are first-class — not afterthoughts.",
        },
      },
      {
        kind: "prose",
        heading: "The No-Skill Baseline (the trick that stops you fooling yourself)",
        body:
          "Borrowed from forecasting and reinforcement learning: before you celebrate that your agent passes 70% of an eval, run a 'no-skill' baseline that picks tools or arguments at random within the same schema. If your agent is at 70% and the no-skill baseline is at 65%, your eval is mostly testing whether your tools have sensible defaults, not whether your agent reasons. RefundCo discovered this the hard way: their first eval suite had a 75% pass rate that turned out to be 71% achievable by always picking 'refund_full'. They redesigned the suite to require non-trivial reasoning to pass, and pass rates dropped — truthfully — to 48%. That was the real number to optimize against.",
      },
      {
        kind: "callout",
        tone: "warn",
        heading: "The LLM-judge sycophancy trap",
        body:
          "When you grade an agent’s output with another LLM, prefer pairwise comparisons over absolute scores, and rotate the position of the candidate to control for ordering bias. Anthropic’s 'Demystifying Evals' is the reference. If you don’t do this, the judge will tell you everything is improving even when it’s not.",
      },
      {
        kind: "prose",
        heading: "OpenTelemetry GenAI Conventions: Why You Should Care",
        body:
          "OpenTelemetry has a draft set of semantic conventions specifically for GenAI workloads (`gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.completion`, `gen_ai.tool.call.id`, etc.). The boring reason to use them is dashboards. The serious reason is portability: if your traces are OTel-compatible, switching from one observability backend to another is a configuration change. If they’re not, it’s a rewrite. RefundCo standardized on OTel after their first observability tool got acquired and the migration cost six engineer-weeks.\n\nThe minimum useful instrumentation set: model name and version, prompt and completion token counts, tool call name and arguments, hook name and decision (allow / block / modify), session id, parent span id. Tag spans with trace-level attributes like tenet violations or policy gates. The act of writing this list often reveals which information your harness already throws away.",
      },
      {
        kind: "code",
        heading: "Minimal OTel-shaped instrumentation",
        lang: "typescript",
        code:
          "import { trace } from '@opentelemetry/api';\nconst tracer = trace.getTracer('refundco-agent');\n\nasync function runTurn(state: AgentState, input: string) {\n  return tracer.startActiveSpan('agent.turn', async (span) => {\n    span.setAttributes({\n      'gen_ai.system': 'anthropic',\n      'gen_ai.request.model': 'claude-3-7-sonnet',\n      'refundco.tenet_under_test': 'cybernetic-loop',\n      'refundco.session_id': state.sessionId,\n    });\n    try {\n      const decision = await llmDecide(state, input);\n      span.setAttributes({\n        'gen_ai.usage.input_tokens': decision.usage.input,\n        'gen_ai.usage.output_tokens': decision.usage.output,\n        'gen_ai.tool.name': decision.toolCall?.name ?? 'none',\n      });\n      const allowed = await runHooks(decision); // logs hook decisions as child spans\n      if (!allowed) span.addEvent('hook.blocked', { rule: allowed.rule });\n      return decision;\n    } finally {\n      span.end();\n    }\n  });\n}",
        caption: "Every turn becomes a span you can later replay, grade, and attribute. The same shape works in Datadog, Honeycomb, Langfuse, and Phoenix without code changes.",
      },
      {
        kind: "prose",
        heading: "The Benchmark Landscape, Without the Hype",
        body:
          "You don’t need to run every benchmark. You need to pick the one whose shape matches your problem. SWE-bench Verified is the standard for coding agents — closed-loop, real GitHub issues, deterministic test verifiers. GAIA is the standard for general AI assistants — messy, multi-step, requires real tool use. Terminal-Bench is for shell-native agents and pairs with the Harbor harness for running it; if your agent’s primary surface is `bash`, this is your benchmark. τ-Bench (Sierra) emulates a customer talking to your agent under a domain policy — the right benchmark when your agent talks to humans rather than to code. OSWorld measures real computer-use across Ubuntu / Windows / macOS, where state-of-the-art is still well below human — a useful reminder that desktop-use harnesses have enormous headroom. WebArena is the reproducible, self-hostable web-agent benchmark; HAL (Princeton’s Holistic Agent Leaderboard) is the right reference if you care about reliability and cost, not just success rate.\n\nFor RefundCo, the relevant benchmark is τ-Bench. Their agent talks to humans under a refund policy — SWE-bench is irrelevant. Choosing the right benchmark is itself a harness-engineering decision; the wrong benchmark optimizes you toward the wrong harness.",
      },
      {
        kind: "callout",
        tone: "tip",
        heading: "Pick one benchmark, fully",
        body:
          "It is better to run one benchmark properly — with a no-skill baseline, harness ablations, and tracked cost — than to run five benchmarks superficially. The signal you want is: 'when I disable hooks, my score drops X. When I shrink AGENTS.md, my score drops Y. When I switch models, my score moves Z.' That table is the harness engineer’s most valuable artifact.",
      },
      {
        kind: "worked-trace",
        heading: "A Ratchet Trace, From Incident to Eval",
        scenario:
          "RefundCo ships a prompt update on Tuesday. By Thursday, three customers report that the agent confidently approved a duplicate refund. Watch the team turn this into a permanent eval, not just a fix.",
        turns: [
          { actor: "user", label: "Incident", detail: "Three duplicate refunds in 24 hours. Total: $1,840 over-refunded. The agent’s reasoning trace says 'verified original charge' but the verification was on the wrong charge id." },
          { actor: "hook", label: "Existing safety", detail: "PreToolUse hook for `issue_refund` already requires a charge id and a non-empty `original_charge_verified` field, but does not check that the charge id matches the original transaction." },
          { actor: "state", label: "Ratchet step 1", detail: "Add a deterministic verifier: `verify_charge_match(refund_request, charge_id)` that checks the charge id is for the same customer, currency, and within 14 days. Wire it as a PreToolUse hook ABOVE the LLM call." },
          { actor: "llm", label: "Ratchet step 2", detail: "Add a regression eval to the single-step suite: 12 cases where charge ids and transactions are intentionally mismatched. The agent must request additional verification, not refund." },
          { actor: "tool", label: "Ratchet step 3", detail: "Add a full-run eval with the three real (anonymized) tickets that triggered the incident. They become permanent ground truth: any prompt or harness change that breaks them blocks the PR." },
          { actor: "state", label: "Ratchet step 4", detail: "Add an OTel attribute `refundco.duplicate_refund_check: 'pass' | 'fail' | 'n/a'` so the next time the verifier fires, it shows up as a labeled span and a dashboard tile. Future incidents are caught in observability before customers notice." },
        ],
        takeaway:
          "The incident has now changed five things: a hook, a unit-shaped eval, a full-run eval, an OTel attribute, and a dashboard tile. None of these can be undone by a prompt edit. The mistake has been converted into permanent structural knowledge — the ratchet, applied to measurement.",
      },
      {
        kind: "prose",
        heading: "Ralph: Twelve Lines of Bash That Teach the Field",
        body:
          "Ralph (named after Ralph Wiggum, after a famous line about being smart enough to know what he doesn’t know) is Geoffrey Huntley’s harness pattern, and reading it is the closest thing to a graduate-level shortcut in this discipline. The whole thing is roughly: `while :; do cat PROMPT.md | claude-code; done`. There is no agent framework. No memory store. No SDK. The PROMPT.md file IS the agent’s entire memory. The filesystem IS the agent’s state. Every iteration: read the prompt, do something, modify the prompt and the filesystem, loop.\n\nWhy does this matter for a module on measurement? Because Ralph makes every tenet visible at the same time and lets you measure them with primitive tools. The harness is the artifact (a file). State is externalized (a file). Context is a budget (the file you can’t make too large). The cybernetic loop is literal (the loop). The ratchet is the practice of editing the prompt or adding a new file when something fails. Safe autonomy is the question of which directories you let `claude-code` see. And every observation is a `tail -f` away. If you cannot describe these things on a complex framework, Ralph teaches you to describe them; if you can, Ralph teaches you to demand them everywhere else.",
      },
      {
        kind: "code",
        heading: "Ralph, in spirit",
        lang: "bash",
        code:
          "# The harness is this file plus PROMPT.md plus whatever\n# directories you grant access to. That's it.\nset -e\n\nwhile true; do\n  # 1. Externalize the iteration to a single artifact.\n  echo \"--- Iteration $(date -u +%FT%TZ) ---\" >> session.log\n\n  # 2. The prompt IS the state. The filesystem IS the memory.\n  cat PROMPT.md | claude-code --cwd ./workspace 2>>session.log\n\n  # 3. The ratchet is whatever the agent (or you) appended.\n  #    Tomorrow's PROMPT.md is the version-controlled memory.\n  git -C workspace add -A && git -C workspace commit -m 'iter' || true\n\n  # 4. Pause: a context boundary, a backpressure point, an observation.\n  sleep 5\ndone",
        caption: "Read this once and the rest of the discipline stops feeling abstract. There are no abstractions — just files, a loop, and a sleep.",
      },
      {
        kind: "when-this-hurts",
        items: [
          { signal: "You can’t answer 'is this prompt change better?' with a number.", cause: "You don’t have a single-step eval suite gating the change. Add 50–200 frozen (state, input) cases." },
          { signal: "Your eval pass-rate is high but production incidents persist.", cause: "Your eval is testing the wrong thing. Run a no-skill baseline. Often the eval is solvable by a fixed default." },
          { signal: "You can’t replay a past failure.", cause: "State is in memory, not in spans/files. Externalize the trace; if it’s not in OTel, treat it as lost." },
          { signal: "Switching observability vendors costs months.", cause: "You’re emitting bespoke metrics, not OTel GenAI conventions. Migrate the schema first; the dashboards can come later." },
          { signal: "Cost spikes surprise you weekly.", cause: "Cost is not a first-class eval dimension. Add it next to pass-rate. A more expensive 'better' is often actually 'worse'." },
        ],
      },
      {
        kind: "objection",
        question: "Our agent’s problem is unique. Why benchmark against SWE-bench / GAIA / τ-Bench?",
        response:
          "You’re partly right — your production eval is the one that matters most. But public benchmarks anchor harness work in shared reality. Without them you’re proving improvements in a sealed room: every claim is unfalsifiable to anyone outside your team. With them, you can show that the harness ablations you care about (hooks on/off, AGENTS.md size, evaluator agent on/off) move scores in a way other practitioners can reproduce. Pick the public benchmark whose shape best resembles your problem and use it as a calibration channel, not as your primary KPI.",
      },
      {
        kind: "anatomy",
        heading: "Anatomy of a Failure: 'The dashboard says we’re fine'",
        failure:
          "RefundCo’s dashboard showed 99.4% tool-call success and 96% session pass-rate for two weeks. Then a Reddit post surfaced that the agent had been quietly approving small duplicate refunds because it consistently answered 'verified' to the verification step.",
        trigger:
          "The team had instrumented success of *tool calls*, not success of *outcomes*. Hooks blocked nothing because the agent was confidently producing well-formed (and wrong) decisions. The eval suite tested whether the right tool was selected, not whether the right action was taken.",
        detect:
          "Add an outcome-level eval: a sample of past sessions, each tagged with a known correct outcome, replayed nightly. Add an OTel attribute that links every refund decision back to a verifier check; missing or 'pass' on suspicious patterns becomes a flagged span.",
        prevent:
          "Always pair tool-success metrics with outcome-success metrics. Add the no-skill baseline. Replay last week’s incidents as permanent eval cases. Treat 'we don’t see anything in the dashboard' as a hypothesis, not a fact, until an outcome-level eval has corroborated it.",
      },
      {
        kind: "self-check",
        questions: [
          { q: "Your agent passes 80% of a single-step eval. Should you ship it?", a: "Not without two more numbers: the no-skill baseline pass-rate (could the suite be solvable by always picking the same default?) and a full-run pass-rate on real tickets (does single-step success transfer to end-to-end success?). 80% with no baseline is a vibe, not a number." },
          { q: "You switch from Anthropic to a different model and full-run pass-rate drops 6 points. What is the most likely cause?", a: "A harness regression in disguise. Your prompts, hooks, and tool descriptions were tuned for the old model’s behavior. Re-run with model-agnostic prompts before declaring the new model 'worse'. This is exactly the dynamic Anthropic’s 'infrastructure noise' paper measures." },
          { q: "Why is OTel’s `gen_ai` namespace worth adopting before you have a problem to solve?", a: "Because an observability migration on bespoke metrics is a rewrite. OTel makes vendor switching a configuration change and standardizes the language you use to describe agent behavior across teams. Adopt it on day 1 — the cost is hours; the cost of not adopting it is months." },
        ],
      },
      {
        kind: "prose",
        heading: "Closing the Course",
        body:
          "You started this course with the question: why is my agent unreliable, and what do I do about it? You leave it with a different question: what would it take to make this measurable? That re-framing is the work. The seven tenets are how you ratchet quality in. Modules 2 through 8 are how you build the structure around the loop. This module is how you prove, on Friday, that the structure is doing what you claimed on Monday. Every other discipline that has matured — software engineering, site reliability, security — went through the same arc: vibes, then patterns, then numbers. Harness engineering is on the same arc. You’ve just walked it.",
      },
    ],
    coachTips: [
      "Single-step evals on every PR. Full-run evals nightly. Multi-turn evals weekly. Don’t mix the cadences — they’re measuring different things.",
      "Always run a no-skill baseline next to your real agent. The day you can’t beat it, the suite is broken.",
      "Story: a team I worked with celebrated a 7-point pass-rate gain after a prompt rewrite. They noticed two weeks later their eval had a single ‘safe default’ed up by accident, masking the regression. The no-skill baseline would have caught it on day one.",
      "Cost and latency are eval dimensions, not afterthoughts. A 'better' agent that costs 3x and runs 2x slower is not better in production.",
      "Every incident becomes a permanent eval case. If it doesn’t, the ratchet hasn’t fully closed.",
      "Adopt OTel `gen_ai` conventions before you need them. The cost is hours; the cost of not adopting them is months.",
      "Benchmarks are calibration channels, not KPIs. Use the public one whose shape matches your problem; ignore the rest.",
      "Read Ralph once a quarter. Whenever the harness feels too complicated, Ralph reminds you what minimal looks like.",
    ],
    furtherReading: [
      {
        sourceId: "anthropic-infra-noise",
        section: "Whole article",
        note: "The single most important data point in this discipline: harness/runtime noise often exceeds model gaps on coding evals. Read this first; everything else in this module follows from it.",
      },
      {
        sourceId: "langchain-improving-deepagents",
        section: "Benchmark deltas table",
        note: "Companion empirical evidence: harness changes alone moved scores meaningfully on the same model. Read alongside Anthropic for triangulation.",
      },
      {
        sourceId: "anthropic-demystifying-evals",
        section: "Pairwise grading and trajectory eval design",
        note: "The reference for grading agents under multi-trajectory success. Pairwise > absolute scores; rotate position to control ordering bias.",
      },
      {
        sourceId: "langchain-evaluating-deepagents",
        section: "Single-step / full-run / multi-turn taxonomy",
        note: "The taxonomy this module is built around. Concrete patterns for each shape and how to combine them.",
      },
      {
        sourceId: "otel-genai",
        section: "GenAI semantic conventions",
        note: "Adopt the schema before you need it. If your traces aren’t OTel-compatible, observability migration is a rewrite, not a config change.",
      },
      {
        sourceId: "swe-bench",
        section: "SWE-bench Verified",
        note: "The reference benchmark for coding agents. Useful as a calibration channel even if it’s not your primary KPI.",
      },
      {
        sourceId: "tau-bench",
        section: "Domain-policy multi-turn evaluation",
        note: "The benchmark whose shape most closely matches RefundCo and any agent that talks to humans under a policy.",
      },
      {
        sourceId: "ralph-wiggum",
        section: "Whole post",
        note: "The clearest reference implementation in the field. Read it once; reread it whenever your harness feels too complicated.",
      },
      {
        sourceId: "agentops-sdk",
        section: "Out-of-the-box instrumentation",
        note: "When you want OTel-shaped agent observability without writing it yourself. A reasonable 30-minute trial on any project.",
      },
      {
        sourceId: "hal-leaderboard",
        section: "Reliability and cost dimensions",
        note: "The right reference if you care about reliability and cost in addition to success rate. Pairs with the cost-aware coach tips above.",
      },
    ],
  },
];
