export interface BrainNode {
  id: string;
  label: string;
  role: string;
  x: number;
  y: number;
  card: string;
}

export const brainNodes: BrainNode[] = [
  {
    id: "second",
    label: "second",
    role: "working",
    x: 50,
    y: 50,
    card:
      "The working brain. PARA organised. Active projects, ongoing areas of responsibility, the inbox and the archive. If anything has a deadline or a status, it lives here. The other brains read it to stay grounded in what is actually being done this week.",
  },
  {
    id: "formation",
    label: "formation",
    role: "input · synthesis",
    x: 50,
    y: 18,
    card:
      "The synthesis layer. An LLM wiki of who I am becoming, what I believe, the people and ideas shaping the inner life. Faith, growing careers, being human. The other brains consume this when a project needs to be checked against what matters.",
  },
  {
    id: "craft",
    label: "craft",
    role: "input · taste",
    x: 90,
    y: 35,
    card:
      "The taste brain. Convictions about what makes a product good, tested in real builds. Anti-patterns. The shape of judgment. The agent pulls from here when I am making a build call and need to remember why I think what I think.",
  },
  {
    id: "atlas",
    label: "atlas",
    role: "input · orientation",
    x: 10,
    y: 35,
    card:
      "The mental maps. How industries actually work, where the structural leverage points sit, cross-domain patterns. Meta-cognitive tools for reading and reasoning. Consulted when the question is how a domain really runs.",
  },
  {
    id: "frontier",
    label: "frontier",
    role: "input · research",
    x: 50,
    y: 82,
    card:
      "The AI arbitrage brain. What is technically possible right now, where opportunities are forming, what signals are accumulating. Time sensitive by design. The signals folder is ephemeral on purpose. Frontier feeds the other brains a sense of where the wind is moving.",
  },
];

export const consoleBlocks = [
  {
    eyebrow: "SECOND_BRAIN / INDEX.MD",
    body: `# Second Brain — Index

A live map of this brain. Claude updates it after every structural change.

## 1 — Projects (active)

| Project              | Goal                                                              | Status |
|----------------------|-------------------------------------------------------------------|--------|
| Evaluation Eng       | Add evaluation engineering as the 4th segment of the AI ed. site  | active |
| Personal Site        | Evolve learning-about-ai into the broader personal site           | active |
| Thought Leadership   | Continuous sprint of public writing on digital brains + AI orgs   | active |

## 2 — Areas

| Area                 | Health | Brain Status     |
|----------------------|--------|------------------|
| Arbitraging AI       | green  | ready-to-split   |
| Building Products    | green  | ready-to-split   |
| Shepherding Finances | green  | embryonic        |
| Growing Careers      | green  | growing          |
| Being Human          | green  | growing          |
| Loving God           | green  | embryonic        |`,
    caption:
      "The index is a live map, not a table of contents. It moves with the work.",
  },
  {
    eyebrow: "SECOND_BRAIN / LOG.MD",
    body: `# Operations Log

Append-only record of all changes to this brain.

## 2026-06-05

- Scaffolded page plan at 1-projects/personal-site/page-digital-brain.md.
  New site page that breaks down the public digital brain repo. Draws content
  from series-01-digital-brain (10 posts). Open questions captured.
- Drafted PRD at page-digital-brain-prd.md. Single-page deliverable,
  soft-pull funnel, 10 sections. Voice held to feedback_writing_voice.
- Drafted research at page-digital-brain-research.md. Pulled from
  craft-brain taste wikis, caura.ai, and the site's current design tokens.
  Recommended the Workshop Console direction.

## 2026-06-03

- Expanded Series 01 to 10 posts. Integrated 3 beats from an earlier draft:
  Centaur/Cyborg (Post 6), cognitive load + default mode network (Post 7),
  abundance shifts the premium to taste (Post 9).`,
    caption:
      "The log is append-only. The brain logs its own planning of this page in the same record it logs everything else.",
  },
  {
    eyebrow: "CLAUDE / MEMORY.MD",
    body: `# Memory Index

- Sean — User Profile — who he is, background, areas, how to work with him
- Brain Architecture — the 5-brain system: second, formation, atlas,
  frontier, craft — domains, paths, special folders
- Project Tracking Pattern — detailed tracking in repo docs/, brain stays
  high-level with links
- Session Separation — code in project dirs, planning in second-brain,
  never mix
- Weekly Review Is Manual — triggered by Sean, not automated
- Multi-Project Session Start — when one repo holds multiple PARA projects,
  do one project per session and brief Claude with the PARA goal first
- Writing Voice — Public — PG/YC style, no em-dashes, embeds wiki lexicon,
  faith as undertone, one spine sentence per piece`,
    caption:
      "The agent's persistent layer. Index only. Each line points to a file the agent reads when it becomes relevant.",
  },
];

export const brainMdExample = `---
brain: second_brain
protocol_version: "0.1"
orientation: output
domain: Action and project management
path: ~/second_brain
entrypoint: index.md
structure: PARA
maintainer: Claude Code
updated: 2026-05-17
---

# second_brain — manifest

## Offers

- What projects are currently active, and their goals.
- What areas of responsibility I maintain, and their standards.
- The status and history of any past (archived) project.

## Consumes

- formation_brain — wisdom and frameworks that inform how
  a project is approached or whether it aligns with values.

## Boundaries

- Read-only toward other brains. Never writes outside its
  own directory.`;

export interface AnnotatedTurn {
  patternEyebrow: string;
  annotation: string;
  exchange: string;
}

export const section6Turns: AnnotatedTurn[] = [
  {
    patternEyebrow: "T1 — NAMING AS UX",
    annotation:
      "I open the session in the second brain and ask for what I want. No setup, no system prompt. The brain is the system prompt. The folder names, 1-projects, 2-areas, 3-resources, already tell the agent how to think.",
    exchange: `USER
Help me scaffold a README for series-02-flat-org.
It should match the shape of series-01.`,
  },
  {
    patternEyebrow: "T2 — SHOW YOUR WORK",
    annotation:
      "The agent reads CLAUDE.md (the brain's operating instructions), index.md (the live map), and the persistent memory layer. It tells me what it pulled. This is not for show. It is the same move Perplexity makes when it lists its sources, a trust anchor before the answer arrives.",
    exchange: `CLAUDE
Reading:
  - CLAUDE.md            (PARA + behavior rules)
  - index.md             (active projects)
  - MEMORY.md            (your profile, voice rules, session rules)
  - 1-projects/thought-leadership/
      series-01-digital-brain/README.md   (the shape to match)

Found:
  - feedback_writing_voice (PG/YC, no em-dashes, embedded lexicon)
  - series-01 uses an arc table:
      # | title | spine sentence | reader gift`,
  },
  {
    patternEyebrow: "T2 — PRESERVING AGENCY",
    annotation:
      "Before scaffolding anything, the agent asks the one question that determines the shape of the work. This is the signature T2 move: AI suggests, human decides. A weaker agent would have started writing. This one waits for the call.",
    exchange: `CLAUDE
One call before I scaffold:

Is series-02 a continuation of the digital brain arc
(same voice, same medium-heavy citations) or a sharper
turn into org design (flatter, less personal lineage)?

Series-01 leans on biographical beats. Series-02 could
read as commentary if you keep that. Or it can stand
alone as a thesis sequence.

USER
Stand alone. Thesis sequence.`,
  },
  {
    patternEyebrow: "T3 — AUDITABILITY + SCOPE GUARANTEE",
    annotation:
      "The agent reaches into craft_brain to pull a relevant taste page. It does so read-only. The cross-brain protocol forbids writes into other brains. Each brain stays sovereign. The reader does not need to know the rule. The reader sees the rule being honoured.",
    exchange: `CLAUDE
Pulling read-only from craft_brain (cross-brain protocol):
  - ~/craft_brain/wiki/ai-era-taste-moat.md
  - ~/craft_brain/wiki/scarcity-inversion.md

Both are relevant to a flat-org thesis sequence, the
moat-shift from execution to taste, and the inversion
that makes flatter orgs viable. Will reference, not copy.`,
  },
  {
    patternEyebrow: "T3 — APPEND-ONLY AUDIT TRAIL",
    annotation:
      "The agent writes the README and appends a single line to log.md. The log is append-only by convention. Six months from now, when I have forgotten this conversation, the log will tell me what was decided and why. The artifact and the audit are the same act.",
    exchange: `CLAUDE
Wrote:
  1-projects/thought-leadership/series-02-flat-org/README.md
  (arc table with 8 placeholders, citations stub,
   voice held to feedback_writing_voice)

Appended to log.md:
  2026-06-05
  - Scaffolded series-02-flat-org/README.md as standalone
    thesis sequence. Referenced ai-era-taste-moat and
    scarcity-inversion from craft-brain.

Next: do you want to draft post 1 now, or sit with
the arc for a day?`,
  },
];

export const traceSteps = [
  {
    label: "Root",
    title: "Cognitive load",
    body:
      "The human working memory holds about four chunks. Past that, judgment degrades.",
  },
  {
    label: "Principle",
    title: "Keep the always-loaded surface small",
    body:
      "If the agent must read it every turn, every line is paying rent on attention.",
  },
  {
    label: "Pattern",
    title: "Index, do not store",
    body:
      "The persistent layer points at what matters. The content lives one hop away, fetched on demand.",
  },
  {
    label: "Component",
    title: "MEMORY.md as one-line entries",
    body:
      "Each line is a pointer with a hook, never the body itself. Pure index.",
  },
  {
    label: "Surface",
    title: "A 150-character cap per line",
    body:
      "A hard constraint that forces the writer to compress. The cap is the taste, made executable.",
  },
];
