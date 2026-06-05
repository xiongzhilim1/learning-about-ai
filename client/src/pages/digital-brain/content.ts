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

export interface TransitionStage {
  id: string;
  number: string;
  name: string;
  attribution: string;
  oneLiner: string;
  strengthTag: string;
  strengthFull: string;
  weaknessTag: string;
  weaknessFull: string;
}

export const transitions: TransitionStage[] = [
  {
    id: "para",
    number: "01",
    name: "Pure PARA",
    attribution: "Tiago Forte",
    oneLiner:
      "Four folders. Projects, Areas, Resources, Archives. Files live where they are most actionable.",
    strengthTag: "intuitive folders",
    strengthFull:
      "Immediately intuitive. Zero learning curve for anyone who has used folders.",
    weaknessTag: "no knowledge layer",
    weaknessFull:
      "Resources becomes a junk drawer in six months. Insights die in the archive.",
  },
  {
    id: "wiki",
    number: "02",
    name: "LLM Wiki",
    attribution: "Andrej Karpathy",
    oneLiner:
      "A semantic graph of concepts and entities, interlinked with double brackets. The agent maintains it.",
    strengthTag: "compounds knowledge",
    strengthFull:
      "Every conceptual addition is a permanent brick. Excellent for compounding pure knowledge.",
    weaknessTag: "no triggers to act",
    weaknessFull:
      "No operational layer. The wiki knows what is true but never when to act on it.",
  },
  {
    id: "hybrid",
    number: "03",
    name: "Hybrid PARA + Wiki",
    attribution: "the canonical individual choice",
    oneLiner:
      "PARA and wiki live in one directory. Active work cross-pollinates with long-term knowledge.",
    strengthTag: "no routing tax",
    strengthFull:
      "Best fit for an interdisciplinary individual. Cross-domain links happen by default.",
    weaknessTag: "leaks past 15 people",
    weaknessFull:
      "A single folder structure begins to leak between teams once distinct vocabularies emerge.",
  },
  {
    id: "multibrain",
    number: "04",
    name: "Multi-brain",
    attribution: "Thalamic Router model",
    oneLiner:
      "Accumulation brains hold deep domain knowledge. An orchestration brain runs PARA and queries them read-only.",
    strengthTag: "scales past 15",
    strengthFull:
      "Each brain stays sovereign. Boundaries reflect real communication boundaries.",
    weaknessTag: "routing tax",
    weaknessFull:
      "Every input pays a routing decision. Intersections need a synthesis layer to land anywhere.",
  },
];

export const transitionsCaption =
  "Fig 1. The four canonical shapes of personal knowledge architecture. Most individuals stop at Hybrid. The move to multi-brain is a boundary call, not a scale call.";

export interface FractalLayer {
  id: string;
  number: string;
  name: string;
  purpose: string;
  inheritsFrom: string;
  writers: string;
  readers: string;
  card: string;
}

export const fractalLayers: FractalLayer[] = [
  {
    id: "cortex",
    number: "L0",
    name: "Cortex",
    purpose: "Company-wide source of truth",
    inheritsFrom: "nothing",
    writers: "executive team, legal, strategy",
    readers: "everyone, automatically",
    card:
      "The cortex holds identity, mission, governance, and global strategy. Every other brain inherits from it. This is the organisational equivalent of the neocortex's global workspace, the shared context that travels with every downstream session.",
  },
  {
    id: "product",
    number: "L1",
    name: "Product line",
    purpose: "Deep domain knowledge for one product",
    inheritsFrom: "cortex",
    writers: "product managers, engineers, designers",
    readers: "everyone working on that product",
    card:
      "Product line brains hold architecture decisions, feature roadmaps, customer feedback, and engineering best practice. They are the cortical modules. One product line, one canonical place to look.",
  },
  {
    id: "region",
    number: "L2",
    name: "Region",
    purpose: "Local context that varies by geography",
    inheritsFrom: "cortex",
    writers: "regional leads, local compliance, regional sales",
    readers: "anyone operating in that region",
    card:
      "Regional brains hold compliance, market dynamics, partnerships, and communication norms specific to a geography. The data residency rules for Singapore do not belong in the global cortex. They belong here.",
  },
  {
    id: "intersection",
    number: "L3",
    name: "Intersection",
    purpose: "Dual inheritance, product times region",
    inheritsFrom: "product line and region",
    writers: "the cross-functional team itself",
    readers: "the team plus both parent brains",
    card:
      "Where the fractal gets interesting. Analytics in APAC needs both the product depth and the regional context. This brain inherits from both parents and adds its own client work, case studies, and localisation.",
  },
  {
    id: "individual",
    number: "L4",
    name: "Individual",
    purpose: "Personal working memory",
    inheritsFrom: "the team brain",
    writers: "the individual",
    readers: "the individual, private by default",
    card:
      "Each contributor's own hippocampus. Meeting notes, draft thinking, personal learnings, career goals. Fast capture that eventually consolidates upward into the team and product wikis through weekly review.",
  },
];

export const fractalCaption =
  "Fig 2. Five fractal layers. Each layer has the same internal shape, raw plus wiki plus sessions. Each one inherits from its parent and specialises. Subsidiarity for memory at scale.";

export interface TopologyBox {
  label: string;
  sublabel?: string;
  tone: "ink" | "sage" | "peach" | "terracotta";
  indent?: number;
}

export interface TopologyConfig {
  id: string;
  tab: string;
  size: string;
  threshold: string;
  spine: string;
  body: string;
  boxes: TopologyBox[];
  caption: string;
}

export const topologyConfigs: TopologyConfig[] = [
  {
    id: "solo",
    tab: "Solo",
    size: "1 person",
    threshold: "no boundaries yet",
    spine: "One brain, hybrid, all of it traversable.",
    body:
      "A single hybrid PARA plus wiki directory. Active projects in 1-projects, knowledge in wiki. The agent reads both in the same session. No routing tax, because there is no routing.",
    boxes: [
      {
        label: "your_brain/",
        sublabel: "PARA + wiki, single directory",
        tone: "peach",
      },
      {
        label: "1-projects, 2-areas, 3-resources, 4-archive",
        sublabel: "PARA layer, active work",
        tone: "sage",
        indent: 1,
      },
      {
        label: "wiki/",
        sublabel: "concepts, entities, playbooks",
        tone: "sage",
        indent: 1,
      },
    ],
    caption:
      "Fig 2a. Solo. One brain holds everything. The interdisciplinary individual ships here.",
  },
  {
    id: "small",
    tab: "Small team",
    size: "2 to 15 people",
    threshold: "shared vocabulary, no real boundaries",
    spine: "One team brain. Everyone reads, a few people write.",
    body:
      "Same hybrid shape as solo, but shared. The team writes into a single brain because their work overlaps and their vocabulary is shared. Splitting here introduces silos before the team is ready for them.",
    boxes: [
      {
        label: "team_brain/",
        sublabel: "shared PARA + wiki",
        tone: "peach",
      },
      {
        label: "1-projects/",
        sublabel: "active client work and sprints",
        tone: "sage",
        indent: 1,
      },
      {
        label: "wiki/",
        sublabel: "playbooks, decisions, glossary",
        tone: "sage",
        indent: 1,
      },
      {
        label: "people/",
        sublabel: "individual working memory, private by default",
        tone: "sage",
        indent: 1,
      },
    ],
    caption:
      "Fig 2b. Small team. One brain still works. Save the multi-brain investment for when vocabularies actually diverge.",
  },
  {
    id: "mid",
    tab: "Mid-size",
    size: "15 to 100 people",
    threshold: "departments forming, distinct vocabularies emerging",
    spine: "Three layers. Cortex, chapters, squads.",
    body:
      "The fifteen-person threshold. Communication paths have crossed the inflection point. The brain splits into a cortex (strategy, identity, governance), chapter brains for each domain of practice, and squad brains for active cross-functional teams running PARA.",
    boxes: [
      {
        label: "cortex/",
        sublabel: "L0 · identity, strategy, governance",
        tone: "terracotta",
      },
      {
        label: "chapter-engineering/",
        sublabel: "L1 · domain depth, inherits cortex",
        tone: "peach",
        indent: 1,
      },
      {
        label: "chapter-go-to-market/",
        sublabel: "L1 · domain depth, inherits cortex",
        tone: "peach",
        indent: 1,
      },
      {
        label: "squad-platform-q3/",
        sublabel: "L2 · active sprint, reads from chapters",
        tone: "sage",
        indent: 2,
      },
      {
        label: "squad-onboarding-revamp/",
        sublabel: "L2 · active sprint, reads from chapters",
        tone: "sage",
        indent: 2,
      },
    ],
    caption:
      "Fig 2c. Mid-size. Three layers is usually enough. Resist a fourth until the topology actually demands it.",
  },
  {
    id: "enterprise",
    tab: "Enterprise",
    size: "100 plus, multiple regions, products, compliance",
    threshold: "fractal, dual inheritance, governance-driven",
    spine: "Five fractal layers. The same shape, all the way down.",
    body:
      "Real boundaries everywhere. Product lines, regions, the intersections where they meet, and the individual contributors underneath. Each layer is a brain with the same internal shape. Each one inherits from its parents. The synthesiser at the top can query across without ever flattening the context.",
    boxes: [
      {
        label: "cortex/",
        sublabel: "L0 · global identity and strategy",
        tone: "terracotta",
      },
      {
        label: "product-analytics/",
        sublabel: "L1 · product line",
        tone: "peach",
        indent: 1,
      },
      {
        label: "region-apac/",
        sublabel: "L2 · region, compliance, partners",
        tone: "peach",
        indent: 1,
      },
      {
        label: "analytics-apac/",
        sublabel: "L3 · intersection, dual inheritance",
        tone: "sage",
        indent: 2,
      },
      {
        label: "individual/",
        sublabel: "L4 · personal working memory",
        tone: "sage",
        indent: 3,
      },
    ],
    caption:
      "Fig 2d. Enterprise fractal. Each layer specialises while inheriting context. Subsidiarity all the way down.",
  },
];

export interface ArchitectureFile {
  name: string;
  role: string;
}

export const architectureFiles: ArchitectureFile[] = [
  { name: "BRAIN.md", role: "Manifest. A few lines of YAML, what the brain offers and consumes." },
  { name: "CLAUDE.md", role: "Operating manual. The prose that tells the agent how to behave." },
  { name: "index.md", role: "Live map. What is currently active." },
  { name: "log.md", role: "Append-only record. The audit trail." },
  { name: "MEMORY.md", role: "Persistent layer. Index of pointers, one line each." },
];

export const furtherReading = [
  {
    heading: "The arc that shaped the page",
    items: [
      {
        text: "digital-brain-toolkit-public",
        href: "https://github.com/xiongzhilim1/digital-brain-toolkit-public",
        tail: "The repo this page walks through.",
      },
      {
        text: "Series 01, the digital brain",
        href: "https://www.linkedin.com/in/limxiongzhi/",
        tail: "Ten posts that fed the prose.",
      },
    ],
  },
  {
    heading: "The shape of the system",
    items: [
      {
        text: "Andrej Karpathy, LLM Wiki",
        href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
        tail: "The sketch the wiki brains lean on.",
      },
      {
        text: "Tiago Forte, Introducing the AI Second Brain",
        href: "https://fortelabs.com/blog/introducing-the-ai-second-brain/",
        tail: "PARA, and the move from PKM to context management.",
      },
      {
        text: "Michael Simmons, the Three Brains framework",
        href: "https://blog.michaelsimmons.com/p/the-third-brain-revolution",
        tail: "Where the orchestration framing comes from.",
      },
      {
        text: "Christopher Allen, Wikilinks and Named Edges",
        href: "https://gist.github.com/ChristopherA/151aefa6a6bde1ce4fa6b1182656cebe",
        tail: "Typed edges in a markdown brain.",
      },
      {
        text: "Rumproarious, Your file system is already a graph database",
        href: "https://rumproarious.com/2026/04/04/your-file-system-is-already-a-graph-database/",
        tail: "Why a folder of markdown is a knowledge graph.",
      },
    ],
  },
  {
    heading: "The neuroscience underneath",
    items: [
      {
        text: "Squire et al., Memory consolidation",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4526749/",
        tail: "Hippocampus to neocortex. The blueprint for raw to wiki.",
      },
      {
        text: "Sweller, Cognitive load theory",
        href: "https://www.sciencedirect.com/topics/social-sciences/cognitive-load-theory",
        tail: "Why the always-loaded surface has to stay small.",
      },
      {
        text: "Shofty et al., Default mode network",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9613551/",
        tail: "The white space that offloading buys back.",
      },
      {
        text: "Fitts and Posner, three stages of skill",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8048153/",
        tail: "Cognitive, associative, autonomous. The shape of playbook maturity.",
      },
    ],
  },
  {
    heading: "The topology at scale",
    items: [
      {
        text: "Martin Fowler, Conway's Law",
        href: "https://martinfowler.com/bliki/ConwaysLaw.html",
        tail: "Why brain boundaries should map to communication boundaries.",
      },
      {
        text: "Eric Evans, Domain-driven Design",
        href: "https://www.domainlanguage.com/",
        tail: "Bounded contexts. The grammar of where one brain ends and another begins.",
      },
      {
        text: "Robin Dunbar, the social brain",
        href: "https://journals.sagepub.com/doi/abs/10.1177/0963721413517118",
        tail: "The fifteen-person sympathy group. One of three independent routes to the same threshold.",
      },
      {
        text: "Fred Brooks, The Mythical Man-Month",
        href: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
        tail: "Communication paths grow as n(n-1)/2. The arithmetic behind the threshold.",
      },
      {
        text: "Analytics at Meta, progressive disclosure",
        href: "https://medium.com/@analytics-at-meta",
        tail: "Loading a lean map first. Drilling only when needed.",
      },
      {
        text: "Dell'Acqua et al., the Jagged Frontier",
        href: "https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf",
        tail: "Centaur and Cyborg. Two valid shapes of human and AI co-work.",
      },
    ],
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
