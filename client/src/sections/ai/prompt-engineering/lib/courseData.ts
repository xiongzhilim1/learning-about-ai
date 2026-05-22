/*
 * Course Data — Prompting Mastery
 * All module content, tenets, exercises, and proficiency framework data
 */

export interface Tenet {
  id: number;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  colorLight: string;
  definition: string;
  keyQuestion: string;
  whenToUse: string;
  bestPractices: string[];
  triggerPhrases: string[];
  example: { bad: string; good: string; explanation: string };
}

export interface Exercise {
  id: string;
  title: string;
  tenetId: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "capstone";
  description: string;
  scenario: string;
  instructions: string[];
  expectedOutcome: string;
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tenetIds: number[];
  targetLevel: string;
  duration: string;
  topics: string[];
  keyTakeaways: string[];
  content: ContentSection[];
}

export interface ContentSection {
  title: string;
  body: string;
  type: "text" | "example" | "tip" | "exercise-preview";
  promptExample?: { bad?: string; good: string; explanation?: string };
}

export interface ProficiencyLevel {
  level: number;
  title: string;
  tenetMastery: string;
  capabilities: string[];
  indicators: string[];
}

export const tenets: Tenet[] = [
  {
    id: 1,
    name: "In-Context Learning",
    shortName: "ICL",
    icon: "🔍",
    color: "#C75B39",
    colorLight: "rgba(199,91,57,0.10)",
    definition: "Providing the LLM with examples of desired input-output pairs within the prompt itself, enabling the model to learn the pattern and apply it to new inputs without any parameter updates.",
    keyQuestion: "Do I have examples to show the model?",
    whenToUse: "Consistent formatting, domain-specific tasks, style matching, classification tasks, and any scenario where showing is more effective than telling.",
    bestPractices: [
      "Use 2-5 diverse, representative examples that cover the range of expected inputs",
      "Cover edge cases and boundary conditions in your examples",
      "Format all examples consistently — the model learns from the pattern",
      "Place examples before the actual task for best results",
      "Order examples from simple to complex for progressive understanding",
    ],
    triggerPhrases: [
      "Here are 3 examples of what I want...",
      "Follow this format exactly...",
      "Based on these examples, now do...",
      "Match the style and tone of these samples...",
    ],
    example: {
      bad: "Write a professional email declining a meeting.",
      good: "Here are 2 examples of professional meeting decline emails:\n\nExample 1:\nSubject: Re: Q3 Planning Session\nHi Sarah, Thank you for the invitation to the Q3 planning session on Thursday. Unfortunately, I have a conflicting client presentation that I cannot reschedule. Could we find 15 minutes on Friday to sync on key decisions? Best, Alex\n\nExample 2:\nSubject: Re: Team Standup Change\nHi Marcus, I appreciate you including me in the revised standup schedule. I won't be able to attend the Tuesday 9am slot due to a recurring training commitment. I'd be happy to provide async updates via Slack instead. Thanks, Jordan\n\nNow write a similar email declining a budget review meeting scheduled for Monday, citing a pre-existing client workshop.",
      explanation: "The few-shot version provides concrete examples that demonstrate the desired tone, structure, length, and level of professionalism. The model can now pattern-match rather than guess at your preferences.",
    },
  },
  {
    id: 2,
    name: "Thought Generation",
    shortName: "CoT",
    icon: "🧠",
    color: "#5A7E66",
    colorLight: "rgba(90,126,102,0.10)",
    definition: "Prompting the LLM to articulate its reasoning process step-by-step before arriving at a conclusion, making the model's logic transparent and improving accuracy on complex tasks.",
    keyQuestion: "Does this task require reasoning or multi-step logic?",
    whenToUse: "Mathematical calculations, logical analysis, multi-step problem solving, decision justification, comparative analysis, and any task where showing work improves accuracy.",
    bestPractices: [
      "Use explicit trigger phrases like 'Let's think step by step' or 'Walk me through your reasoning'",
      "Ask the model to show its work before giving a final answer",
      "Combine with few-shot examples of step-by-step reasoning for best results",
      "Use for verification — ask the model to check its own reasoning",
      "Break complex reasoning into labeled steps (Step 1, Step 2, etc.)",
    ],
    triggerPhrases: [
      "Let's think step by step...",
      "Walk me through your reasoning...",
      "Before answering, analyze each factor...",
      "Show your work and explain each step...",
      "First, consider... Then, evaluate... Finally, conclude...",
    ],
    example: {
      bad: "What's the ROI if we spend $50,000 on a campaign that generates $175,000 in revenue?",
      good: "Calculate the ROI for the following campaign. Show your reasoning step by step:\n\nInvestment: $50,000\nRevenue Generated: $175,000\n\nPlease:\n1. First, calculate the net profit (revenue minus investment)\n2. Then, apply the ROI formula: (Net Profit / Investment) × 100\n3. Interpret what this ROI percentage means for the business\n4. Compare this to typical industry benchmarks for digital campaigns",
      explanation: "The Chain-of-Thought version forces the model to show each calculation step, making errors easy to spot and the reasoning transparent. It also asks for interpretation, adding business context to raw numbers.",
    },
  },
  {
    id: 3,
    name: "Decomposition",
    shortName: "DEC",
    icon: "🧩",
    color: "#9E8A3A",
    colorLight: "rgba(158,138,58,0.15)",
    definition: "Breaking complex problems into smaller, manageable sub-questions or sub-tasks, solving each independently, and then synthesizing the results into a comprehensive solution.",
    keyQuestion: "Is this too complex for a single prompt?",
    whenToUse: "Strategy documents, comprehensive plans, multi-faceted research, complex analysis, proposal generation, and any task that has multiple distinct components.",
    bestPractices: [
      "Identify natural breakpoints in the task — what are the independent components?",
      "Choose the right decomposition strategy: Sequential, Parallel, or Hierarchical",
      "Solve each sub-task with its own focused prompt for better quality",
      "Include a synthesis step that combines sub-task outputs coherently",
      "Use the output of earlier sub-tasks as context for later ones when sequential",
    ],
    triggerPhrases: [
      "Let's break this into parts...",
      "First answer X, then Y, then combine...",
      "Address each of these components separately...",
      "Step 1: Research. Step 2: Analyze. Step 3: Recommend...",
    ],
    example: {
      bad: "Create a complete competitive analysis for our product vs. three competitors.",
      good: "I need a competitive analysis. Let's break this into focused sub-tasks:\n\nSub-task 1: For each competitor (Competitor A, B, C), list their top 5 product features and pricing tiers.\n\nSub-task 2: Create a feature comparison matrix showing where our product leads, matches, or trails each competitor.\n\nSub-task 3: Analyze each competitor's target market and positioning strategy.\n\nSub-task 4: Identify 3 key differentiators where we have a clear advantage.\n\nSub-task 5: Synthesize findings into a 1-page executive summary with strategic recommendations.\n\nLet's start with Sub-task 1.",
      explanation: "Decomposition transforms an overwhelming request into manageable pieces. Each sub-task gets the model's full attention, and the sequential approach builds context progressively for a more thorough analysis.",
    },
  },
  {
    id: 4,
    name: "Ensembling",
    shortName: "ENS",
    icon: "🎭",
    color: "#6B4D96",
    colorLight: "rgba(107,77,150,0.10)",
    definition: "Using multiple prompts, perspectives, or variations to solve the same problem, then aggregating the diverse responses to produce a more robust, well-rounded solution.",
    keyQuestion: "Is this high-stakes enough to warrant multiple perspectives?",
    whenToUse: "Critical decisions, client-facing content, high-stakes communications, strategy development, and any scenario where a single perspective might miss important angles.",
    bestPractices: [
      "Generate 3-5 variations using different perspectives, roles, or approaches",
      "Use diverse aggregation methods: Majority Voting, Union, Synthesis, or Weighted",
      "Assign different expert personas for each variation to maximize diversity",
      "Compare outputs before synthesizing to identify common themes and unique insights",
      "Use for final deliverables where quality matters more than speed",
    ],
    triggerPhrases: [
      "Generate 3 versions from different perspectives...",
      "Approach this as [Role A], then as [Role B], then as [Role C]...",
      "Create multiple variations, then synthesize the best elements...",
      "What would a [expert type] say about this? Now what would a [different expert] say?",
    ],
    example: {
      bad: "Write a response to a client who is unhappy with campaign performance.",
      good: "A client's campaign underperformed expectations. Generate 3 response approaches:\n\nVersion 1 (Empathetic Approach): Write as a relationship-focused account manager who prioritizes the client's feelings and trust.\n\nVersion 2 (Data-Driven Approach): Write as an analytics specialist who leads with performance data, root cause analysis, and optimization recommendations.\n\nVersion 3 (Strategic Approach): Write as a senior strategist who reframes the situation as a learning opportunity and presents a revised go-forward plan.\n\nAfter generating all three, synthesize the strongest elements from each into a final response that balances empathy, data transparency, and forward-looking strategy.",
      explanation: "Ensembling produces a richer, more nuanced response by combining multiple perspectives. The final synthesis captures the emotional intelligence of Version 1, the analytical rigor of Version 2, and the strategic vision of Version 3.",
    },
  },
  {
    id: 5,
    name: "Self-Criticism",
    shortName: "SC",
    icon: "🪞",
    color: "#A33D5C",
    colorLight: "rgba(163,61,92,0.10)",
    definition: "Prompting the LLM to critique, evaluate, and iteratively improve its own outputs through structured review cycles, producing progressively higher-quality results.",
    keyQuestion: "Should I validate and refine this output before using it?",
    whenToUse: "Final deliverables, complex writing, client-facing content, proposals, any high-quality output where first drafts are rarely sufficient.",
    bestPractices: [
      "Use role-based critique: 'Review this as a [skeptical CMO / detail-oriented editor]'",
      "Apply checklist validation against specific quality criteria",
      "Implement adversarial review: 'What would a competitor say about this?'",
      "Use iterative refinement: Generate → Critique → Revise → Repeat",
      "Set explicit improvement targets: 'Make v2 at least 20% more specific than v1'",
    ],
    triggerPhrases: [
      "Now review what you just wrote and identify 3 weaknesses...",
      "Red-team this proposal from the client's perspective...",
      "Rate this output 1-10 on [criteria] and explain how to improve it...",
      "What would a skeptical [role] critique about this?",
      "Revise this to address the weaknesses you identified...",
    ],
    example: {
      bad: "Write a sales proposal for our enterprise analytics platform.",
      good: "Step 1 — Generate: Write a sales proposal for our enterprise analytics platform targeting a Fortune 500 retail client.\n\nStep 2 — Critique: Now review this proposal as if you were:\na) The client's CFO (focused on ROI and cost justification)\nb) A competing vendor (looking for weaknesses to exploit)\nc) An internal editor (checking for clarity, specificity, and persuasiveness)\n\nList the top 3 weaknesses from each perspective.\n\nStep 3 — Revise: Rewrite the proposal addressing all identified weaknesses. Make the value proposition more specific, strengthen the ROI argument, and preemptively address likely objections.\n\nStep 4 — Final Check: Compare v1 and v2. Confirm that v2 is measurably stronger on specificity, persuasiveness, and objection handling.",
      explanation: "Self-Criticism transforms a single-pass output into a refined deliverable through structured review. Each critique perspective catches different weaknesses, and the revision step ensures improvements are actually implemented.",
    },
  },
];

export const modules: Module[] = [
  {
    id: 1,
    title: "Foundations",
    subtitle: "How AI Actually Works",
    description: "Understand the fundamentals of Large Language Models, tokens, context windows, and why prompting matters. Build the mental model that makes everything else click.",
    tenetIds: [],
    targetLevel: "L0 → L1",
    duration: "10 min",
    topics: ["How LLMs process language", "Tokens and tokenization", "Context windows and their limits", "Temperature and sampling", "Why prompt structure matters"],
    keyTakeaways: [
      "LLMs predict the next token based on patterns in training data — they don't 'understand' in the human sense",
      "Token limits affect how much context you can provide — be strategic about what you include",
      "Temperature controls randomness: lower for factual tasks, higher for creative ones",
      "The quality of your output is directly proportional to the quality of your input",
    ],
    content: [
      {
        title: "Why Understanding the Machine Matters",
        type: "text",
        body: "You don't need a computer science degree to be great at prompting. But understanding three things about how LLMs work will make you dramatically more effective — and save you hours of frustration.\n\nFirst: LLMs predict, they don't understand. They're extraordinarily capable pattern-matching engines, not thinking machines. This means they can produce brilliant outputs and confident-sounding nonsense with equal fluency. Knowing this changes how you evaluate what they give you.\n\nSecond: your prompt shapes their prediction. The words you choose, the structure you use, and the context you provide all directly influence which patterns the model activates. A small change in your prompt can produce a completely different output — not because the model is unpredictable, but because you've pointed it at a different region of its learned patterns.\n\nThird: they have hard limits you need to work within. Token limits, no real-time data, no memory between conversations, no ability to verify their own claims. Once you internalize these constraints, you stop fighting the tool and start working with it.\n\nThis module gives you the mental model that makes everything else in this course click. The techniques in Modules 2-8 are powerful, but they're all built on top of these fundamentals. Skip this foundation and the advanced techniques feel like magic tricks. Understand it and they feel like logical extensions of how the machine works.",
      },
      {
        title: "How LLMs Actually Work: A Mental Model",
        type: "text",
        body: "Here's a simplified but accurate picture of what happens when you send a prompt to an LLM:\n\nStep 1 — Tokenization: Your prompt is broken into tokens (words, sub-words, or characters). 'Unbelievable' might become three tokens: 'un' + 'believ' + 'able'. The model doesn't see your words — it sees a sequence of token IDs.\n\nStep 2 — Attention: The model processes all tokens simultaneously through layers of 'attention' — a mechanism that lets each token consider its relationship to every other token. This is how the model understands that 'bank' means something different in 'river bank' vs. 'bank account.' The attention mechanism weighs which parts of your prompt are most relevant to generating each part of the response.\n\nStep 3 — Next-Token Prediction: The model generates its response one token at a time. For each new token, it considers everything that came before — your entire prompt plus all the tokens it has already generated — and predicts the most likely next token. Then it adds that token to the sequence and repeats.\n\nStep 4 — Output Assembly: The generated tokens are decoded back into readable text and returned to you.\n\nThe critical insight for prompting: because the model generates one token at a time, and each token is influenced by everything before it, the structure and content of your prompt shapes every single token in the response. Early tokens in the output are shaped by your prompt. Later tokens are shaped by your prompt AND the model's own earlier output. This is why prompt structure matters so much — you're setting the trajectory for the entire generation process.",
      },
      {
        title: "Tokens, Context Windows, and Why They Matter",
        type: "text",
        body: "Every model has a context window — a maximum number of tokens it can process in a single conversation. Think of it as the model's working memory. Everything must fit inside this window: your system prompt, your instructions, any examples you provide, the conversation history, AND the model's response.\n\nCurrent context window sizes (as of early 2026):\n• GPT-4o: 128K tokens (~96,000 words)\n• Claude 3.5 Sonnet: 200K tokens (~150,000 words)\n• Gemini 1.5 Pro: 2M tokens (~1.5M words)\n• Llama 3: 128K tokens (~96,000 words)\n\nThese numbers sound enormous, but they fill up faster than you'd expect — especially when you're providing examples, context documents, or having multi-turn conversations.\n\nPractical implications for your prompting:\n\n1. Long prompts eat into response space. If your prompt uses 80% of the context window, the model only has 20% left for its response. Be strategic about what you include.\n\n2. Relevant context beats more context. Don't dump everything you have into the prompt. Select the information that's actually relevant to the task. A focused 500-word prompt with the right context will outperform a 5,000-word prompt with everything including the kitchen sink.\n\n3. Recency bias is real. In very long contexts, models tend to pay more attention to content at the beginning and end of the prompt. If you're providing a long document, put the most important instructions at the start and the task at the end.\n\n4. Token count ≠ word count. Special characters, code, and non-English languages often use more tokens per word. When working near the limit, use a tokenizer tool to check your actual token count.",
      },
      {
        title: "What LLMs Are Good At (and What They're Not)",
        type: "tip",
        body: "Setting realistic expectations is the difference between productive AI use and constant frustration. Here's an honest assessment:\n\nWhat LLMs excel at:\n• Synthesis and summarization — condensing large amounts of information into structured summaries\n• Reformatting and transformation — converting data between formats (prose to table, email to bullet points, code to documentation)\n• Brainstorming and ideation — generating diverse options, angles, and approaches you might not have considered\n• Pattern matching and classification — categorizing text, identifying sentiment, extracting entities\n• Writing and editing — drafting, rewriting, adjusting tone, and improving clarity\n• Translation — between languages, between technical and non-technical, between formats\n• Explaining complex topics — breaking down difficult concepts into accessible language\n\nWhat LLMs struggle with:\n• Real-time or recent information — models have a training cutoff date and don't know what happened yesterday\n• Precise mathematics — they can reason about math conceptually but make arithmetic errors; use a calculator for exact numbers\n• Guaranteed factual accuracy — they can 'hallucinate' plausible-sounding but false information with complete confidence\n• Counting and spatial reasoning — surprisingly weak at tasks like 'how many r's in strawberry'\n• Memory between conversations — each conversation starts fresh unless you explicitly provide context\n• Verifying their own claims — they can't fact-check themselves against external sources\n• Truly novel reasoning — they recombine patterns from training data rather than reasoning from first principles\n\nThe practical takeaway: use LLMs as powerful first-draft generators and thinking partners, not as authoritative sources of truth. Always verify critical facts, double-check numbers, and apply your own judgment to the output.",
      },
      {
        title: "The Prompt-Quality Connection",
        type: "example",
        body: "Now that you understand the prediction mechanism, the most important insight in prompt engineering becomes intuitive: the model's output quality is a direct function of your input quality.\n\nHere's why, mechanically: when you write a vague prompt like 'tell me about marketing,' the model's first generated token could go in hundreds of directions — digital marketing, historical marketing, B2B, B2C, strategy, tactics, theory. Each early token narrows the path for subsequent tokens, but you've given the model no guidance on which path to take. The result is generic, because generic is the safest prediction when the input is ambiguous.\n\nWhen you write a specific prompt, you've already constrained the probability space. The model's first token is much more likely to be relevant because you've eliminated most of the irrelevant directions. Specificity compounds — each well-constrained token makes the next token more likely to be on-target.",
        promptExample: {
          bad: "Tell me about marketing.",
          good: "Explain the top 3 digital marketing strategies for B2B SaaS companies with annual revenue between $5M-$50M, focusing on strategies that have shown measurable ROI in the past 2 years. For each strategy, include: a brief description, typical implementation timeline, expected ROI range, and one real-world example.",
          explanation: "The vague prompt could generate a 10,000-word textbook chapter or a 3-sentence overview — the model has no way to know what you need. The specific prompt constrains every dimension: industry (B2B SaaS), company size ($5M-$50M), timeframe (past 2 years), quantity (top 3), metric (measurable ROI), and output structure (description, timeline, ROI range, example per strategy). The model can now generate confidently because you've defined exactly what 'good' looks like.",
        },
      },
      {
        title: "Temperature, Sampling, and Other Controls",
        type: "tip",
        body: "Beyond your prompt text, most AI platforms expose parameters that influence how the model generates its response. Understanding the key ones helps you fine-tune outputs for different tasks.\n\nTemperature (0-2): Controls randomness in token selection. At temperature 0, the model always picks the single most likely next token — producing deterministic, consistent outputs. At temperature 1+, it samples more broadly from probable tokens — producing more varied, creative, and sometimes surprising outputs.\n\nPractical temperature guide:\n• 0 - 0.3: Factual analysis, data extraction, classification, code generation. You want consistency and accuracy.\n• 0.4 - 0.7: Business writing, summaries, explanations. Balanced between consistency and natural variation.\n• 0.8 - 1.2: Creative brainstorming, ideation, storytelling. You want diversity and unexpected connections.\n• 1.3+: Experimental. Outputs become increasingly random and may lose coherence.\n\nTop-p (nucleus sampling, 0-1): An alternative to temperature. Instead of adjusting randomness across all tokens, top-p considers only the smallest set of tokens whose cumulative probability exceeds p. Top-p of 0.9 means the model considers tokens that together account for 90% of the probability mass. Lower values = more focused; higher values = more diverse. Most users should adjust either temperature OR top-p, not both.\n\nMax tokens: Sets a hard limit on response length. Useful when you need concise outputs or want to prevent the model from rambling. Note: this is a hard cutoff — the model will stop mid-sentence if it hits the limit. It's better to specify desired length in your prompt ('respond in under 200 words') and use max tokens as a safety net.\n\nSystem prompt vs. user prompt: Many platforms let you set a 'system prompt' that defines the AI's overall behavior, separate from your specific request. System prompts are ideal for persistent instructions (role, tone, constraints) that apply across an entire conversation. User prompts are for specific tasks.\n\nFor most prompting work, the defaults are fine. Focus your energy on writing better prompts — that's where 90% of the improvement comes from. Adjust parameters only when you have a specific reason.",
      },
      {
        title: "The Road Ahead: Introducing the 5 Core Tenets",
        type: "text",
        body: "You now understand the machine. You know that LLMs predict tokens based on patterns, that your prompt shapes those predictions, and that the model has real capabilities and real limitations. This foundation puts you at L1 (AI Curious) — you can use AI tools and get reasonable results.\n\nThe rest of this course teaches you 5 techniques — the Core Tenets — that will take you from L1 to L5 (AI Native). Here's a preview of the journey:\n\n1. In-Context Learning (ICL) — Showing the model what you want through examples, rather than just telling it. When you provide 2-5 examples of desired input-output pairs, the model learns the pattern and applies it consistently. You'll learn this in Modules 2-3.\n\n2. Chain-of-Thought (CoT) — Making the model show its reasoning step by step, rather than jumping to conclusions. This dramatically improves accuracy on tasks requiring analysis, logic, or multi-step thinking. You'll learn this in Module 4.\n\n3. Decomposition (DEC) — Breaking complex problems into smaller, manageable sub-tasks instead of asking one mega-prompt to do everything. This is how you tackle tasks that would overwhelm a single prompt. You'll learn this in Module 5.\n\n4. Self-Criticism (SC) — Teaching the model to critique and improve its own outputs through structured review cycles. This is how you go from 'good enough' first drafts to polished, high-quality deliverables. You'll learn this in Module 6.\n\n5. Ensembling (ENS) — Using multiple prompts or perspectives to solve the same problem, then combining the best elements. This is how you handle high-stakes outputs where a single perspective isn't enough. You'll learn this in Module 7.\n\nModule 8 brings all 5 tenets together in real-world capstone scenarios.\n\nBefore you move on, here are the most common beginner mistakes to avoid as you start practicing:\n\n• Treating AI like a search engine — Don't ask 'What is X?' Ask 'Help me do Y.' AI is a doing tool, not just a knowing tool.\n• Expecting mind-reading — The model doesn't know your context, your audience, or your goals unless you tell it. More context = better output.\n• Accepting the first output — Your first prompt is a first draft. Iteration is normal and expected. The best prompters refine 2-3 times.\n• Being afraid of long prompts — A 200-word prompt that's specific will dramatically outperform a 20-word prompt that's vague. Don't confuse brevity with clarity.\n• Not specifying what 'good' looks like — If you don't define success criteria, the model guesses. Tell it what format, length, tone, and level of detail you want.",
      },
    ],
  },
  {
    id: 2,
    title: "Clarity & Structure",
    subtitle: "The Art of Clear Instructions",
    description: "Master the fundamentals of writing clear, unambiguous prompts. Learn zero-shot vs. few-shot techniques and how to structure prompts for consistent, high-quality outputs.",
    tenetIds: [1],
    targetLevel: "L1 → L2",
    duration: "12 min",
    topics: ["Writing unambiguous instructions", "Zero-shot vs. few-shot prompting", "Output format specification", "Constraint setting", "The CRAFT framework"],
    keyTakeaways: [
      "Ambiguity is the enemy of good outputs — every vague word is a chance for the model to go off-track",
      "Few-shot examples are often more effective than lengthy instructions",
      "Specifying the output format (JSON, markdown, table) dramatically improves consistency",
      "Constraints help the model focus: word limits, tone requirements, audience specifications",
    ],
    content: [
      {
        title: "From Understanding to Doing",
        type: "text",
        body: "In Module 1, you learned what LLMs are and how they work — token prediction, context windows, and the fundamental link between input quality and output quality. Now we move from understanding to doing.\n\nThis module is where you cross the threshold from L1 (AI Curious) to L2 (AI Assisted). The difference between these two levels is simple but profound: L1 users type whatever comes to mind and hope for the best. L2 users write prompts with intention — they know how to be clear, how to structure their requests, and how to constrain the model's output space so it produces exactly what they need.\n\nThe techniques in this module — the CRAFT framework, zero-shot vs. few-shot selection, output format specification, and constraint setting — are the tools you'll use in every single prompt from here on. They're not advanced tricks. They're the fundamentals that make everything else in this course possible.",
      },
      {
        title: "Why Clarity Beats Cleverness",
        type: "text",
        body: "Most prompt failures come from ambiguity, not model limitations. When you write 'make it better,' the model has to guess what 'better' means to you — shorter? more formal? more data-driven? more persuasive? Each interpretation leads to a completely different output, and the model has no way to know which one you wanted.\n\nContrast that with: 'Increase the specificity by adding 3 data points per paragraph, reduce the total word count by 20%, and shift the tone from conversational to executive-summary formal.' Now the model knows exactly what 'better' means in your context.\n\nThis is the core principle of Module 2: every vague word in your prompt is a fork in the road where the model might take the wrong path. Your job is to remove those forks. Not by writing longer prompts — by writing more precise ones.\n\nA useful mental model: imagine you're briefing a talented but literal-minded new hire. They'll do excellent work if you're specific. They'll produce something random if you're vague. LLMs behave the same way.",
      },
      {
        title: "The CRAFT Framework in Action",
        type: "example",
        body: "CRAFT is a five-component checklist for building clear prompts. Not every prompt needs all five components, but running through the checklist ensures you haven't left out something critical.\n\n• Context — What's the background situation? What does the model need to know?\n• Role — Who should the AI act as? What expertise should it bring?\n• Action — What specific task should it perform? (Use a strong verb: 'write,' 'analyze,' 'compare,' 'extract')\n• Format — How should the output be structured? (Bullet points, table, JSON, email, etc.)\n• Tone — What voice or style is appropriate for the audience?\n\nLet's build a prompt component by component to see CRAFT in practice.",
        promptExample: {
          bad: "Write something about our Q3 results for the team.",
          good: "[Context] Our Q3 revenue was $4.2M (up 18% QoQ), driven primarily by a 34% increase in enterprise deals. However, SMB churn rose to 6.2%, up from 4.1% in Q2. The board meeting is next Tuesday.\n\n[Role] You are our VP of Sales preparing an internal update for the 45-person sales team.\n\n[Action] Write a Q3 performance summary that celebrates the enterprise wins, honestly addresses the SMB churn problem, and rallies the team around 3 specific Q4 priorities.\n\n[Format] Structure as: (1) a 2-sentence headline summary, (2) 'What Went Well' section with 3 bullet points, (3) 'Where We Need to Improve' section with 2 bullet points, (4) 'Q4 Game Plan' with 3 numbered priorities. Total length: 300-400 words.\n\n[Tone] Direct, honest, and motivating. No corporate jargon. The team should feel proud of Q3 but clear-eyed about the work ahead.",
          explanation: "The vague prompt gives the model almost nothing to work with — it doesn't know the audience, the data, the purpose, or the desired format. The CRAFT version provides all five components, and each one narrows the output space. Notice how the Context includes specific numbers, the Role defines the perspective, the Action uses precise verbs, the Format is structurally explicit, and the Tone includes both what to do and what to avoid.",
        },
      },
      {
        title: "Zero-Shot vs. Few-Shot: A Side-by-Side",
        type: "example",
        body: "Zero-shot prompting gives the model instructions without examples — you describe what you want and trust the model to infer the pattern. Few-shot prompting includes 2-5 examples of desired input-output pairs, letting the model learn the pattern directly. This is the first Core Tenet (In-Context Learning) in action.\n\nWhen should you use which? Zero-shot works well for tasks where the model's default behavior is close to what you want — simple summaries, translations, straightforward Q&A. Few-shot is dramatically more effective when you need consistent formatting, a specific tone, domain-specific terminology, or classification into custom categories.\n\nThe key decision rule: if you've tried a zero-shot prompt twice and the output isn't matching your expectations, switch to few-shot. Showing is almost always more effective than telling.\n\nHere's the same classification task done both ways:",
        promptExample: {
          bad: "Classify this customer message as either 'billing', 'technical', 'feature-request', or 'churn-risk':\n\n'We've been evaluating other platforms since the last price increase. Can you walk me through what's included in the Enterprise tier?'",
          good: "Classify customer messages into exactly one category: 'billing', 'technical', 'feature-request', or 'churn-risk'.\n\nExamples:\n\nMessage: 'My invoice shows a charge for 50 seats but we only have 38 active users.'\nCategory: billing\n\nMessage: 'The dashboard keeps timing out when I try to export reports over 10K rows.'\nCategory: technical\n\nMessage: 'It would be great if we could set up automated alerts when a metric crosses a threshold.'\nCategory: feature-request\n\nMessage: 'Our contract renews next month and we're weighing our options. What can you offer?'\nCategory: churn-risk\n\nNow classify this message:\n'We've been evaluating other platforms since the last price increase. Can you walk me through what's included in the Enterprise tier?'\nCategory:",
          explanation: "The zero-shot version might work, but the model has to guess your classification boundaries. Is asking about pricing 'billing' or 'churn-risk'? The few-shot version resolves this ambiguity through examples — the model sees that renewal/evaluation language maps to 'churn-risk' and pricing questions map to 'billing,' so it can correctly classify the test message as 'churn-risk' (evaluation of other platforms + triggered by a price increase).",
        },
      },
      {
        title: "Specifying Output Formats",
        type: "example",
        body: "One of the highest-leverage clarity techniques is telling the model exactly how to format its output. Without a format specification, the model defaults to whatever structure seems most natural — which may not be what you need. With a format spec, you get consistent, parseable, immediately usable output.\n\nCommon format specifications and when to use them:\n\n• Markdown table — comparing items across dimensions (features, competitors, options)\n• JSON — when the output feeds into another system or needs programmatic parsing\n• Numbered list — sequential steps, ranked recommendations, prioritized items\n• Bullet points — non-sequential information, key takeaways, feature lists\n• Email/memo format — when the output IS the deliverable\n• Specific template — when you need exact structure (e.g., 'Headline: ... / Body: ... / CTA: ...')\n\nThe more specific your format instruction, the more consistent the output.",
        promptExample: {
          bad: "Compare Slack, Teams, and Discord for our company's internal communication needs.",
          good: "Compare Slack, Microsoft Teams, and Discord as internal communication tools for a 200-person B2B SaaS company.\n\nReturn your analysis as a markdown table with these exact columns:\n| Feature | Slack | Microsoft Teams | Discord | Winner |\n\nInclude these rows: Pricing (per user/month), File storage limit, Video call capacity, Integration ecosystem (number of apps), Enterprise security features, Learning curve (Low/Medium/High), Best for.\n\nAfter the table, add a 2-sentence 'Bottom Line' recommendation.",
          explanation: "The unformatted prompt will produce a wall of prose that you'll need to restructure yourself. The formatted version produces a ready-to-use comparison table that you can paste directly into a Slack message, presentation, or decision document. The explicit column and row specifications ensure nothing is missed.",
        },
      },
      {
        title: "Setting Constraints That Work",
        type: "tip",
        body: "Constraints are guardrails that keep the model focused. Without them, outputs tend to be too long, too generic, or off-target. Effective constraints fall into several categories:\n\nLength constraints narrow the output to what you actually need. Instead of hoping for a concise response, specify it: 'Maximum 150 words,' 'Exactly 5 bullet points,' '3 paragraphs, each 50-75 words.' Length constraints force the model to prioritize — it has to decide what's most important, which usually improves quality.\n\nAudience constraints shape the vocabulary, depth, and framing. 'Explain this for a non-technical executive' produces fundamentally different output than 'Explain this for a senior backend engineer.' Always name your audience.\n\nExclusion constraints are surprisingly powerful. Telling the model what NOT to do often clarifies your intent faster than describing what you want: 'Do not include generic advice,' 'Avoid marketing jargon,' 'Do not start with a greeting or preamble — begin directly with the analysis.' Exclusions cut the filler that plagues most AI outputs.\n\nScope constraints prevent the model from wandering: 'Focus only on the North American market,' 'Consider only data from 2023-2025,' 'Address only the technical feasibility, not the business case.'\n\nA practical pattern: start with your core instruction, then add 2-3 constraints that address the most likely ways the output could go wrong. You'll develop an instinct for which constraints matter most as you practice.",
      },
      {
        title: "Common Clarity Mistakes",
        type: "tip",
        body: "Knowing what to avoid is as valuable as knowing what to do. Here are the most frequent clarity failures and how to fix them:\n\n1. Vague adjectives without anchors. 'Write a good summary' — good how? 'Write a concise, data-driven summary under 100 words that highlights the 3 most actionable findings' — now the model knows what 'good' means to you.\n\n2. Contradictory instructions. 'Be comprehensive but keep it short' puts the model in an impossible bind. Pick one and be specific: 'Cover all 5 product lines but limit each to 2 sentences.'\n\n3. Overloaded prompts. Asking for a market analysis, competitive comparison, strategic recommendation, AND implementation timeline in a single prompt degrades quality on all of them. If your prompt has more than 2-3 distinct deliverables, split it into separate prompts (this is Decomposition — Tenet 3, which we'll cover in Module 5).\n\n4. Assumed context. You know your company, your project, your audience. The model doesn't. Every time you reference 'the project' or 'our client' or 'the usual format' without defining it, you're introducing ambiguity. Spell out context explicitly, even if it feels redundant.\n\n5. Missing success criteria. If you can't tell whether the output is good or bad, the model can't either. Include what success looks like: 'A successful output will include specific revenue numbers, name at least 2 competitors, and end with a clear recommendation.'",
      },
    ],
  },
  {
    id: 3,
    title: "Persona & Tone",
    subtitle: "Shaping the Voice",
    description: "Learn to assign roles and personas to the AI, control tone and voice, target specific audiences, and maintain brand consistency across all AI-generated content.",
    tenetIds: [1],
    targetLevel: "L2",
    duration: "10 min",
    topics: ["Role assignment techniques", "Audience targeting", "Brand voice calibration", "Tone spectrum control", "Multi-persona conversations"],
    keyTakeaways: [
      "Assigning a specific expert role activates relevant knowledge patterns in the model",
      "Audience specification is as important as content specification — the same information needs different framing for a CEO vs. an engineer",
      "Tone can be precisely controlled with examples and explicit descriptors",
      "Consistent brand voice requires a 'voice card' — a reusable prompt component defining your brand's communication style",
    ],
    content: [
      {
        title: "The Power of Role Assignment",
        type: "text",
        body: "When you tell an LLM 'You are a senior data scientist with 15 years of experience in retail analytics,' you're not just setting a persona — you're activating a specific cluster of knowledge patterns that the model learned during training. The model will draw on different vocabulary, frameworks, and analytical approaches than if you'd said 'You are a marketing intern.'\n\nThis isn't metaphorical. LLMs learned from text written by people in specific roles — doctors write differently than marketers, lawyers differently than engineers. When you assign a role, you're steering the model toward the language patterns, reasoning frameworks, and domain knowledge associated with that role.\n\nEffective role prompts include three elements: the role title, relevant experience/expertise, and the communication context. 'You are a CFO presenting to the board' produces very different output than 'You are a CFO mentoring a junior analyst' — same knowledge base, completely different communication style. The context element is what most people forget, and it's often the most important.",
      },
      {
        title: "Building a Role Prompt: The Three-Layer Method",
        type: "example",
        body: "Most people write role prompts that are too thin — 'Act as an expert' gives the model almost nothing to work with. The three-layer method builds a role prompt that actually constrains the model's behavior in useful ways. Each layer adds specificity: Layer 1 is the role title, Layer 2 adds expertise and constraints, Layer 3 adds the communication context.",
        promptExample: {
          bad: "You are an expert. Write a competitive analysis of our product vs. Competitor X.",
          good: "[Layer 1 — Role] You are a senior competitive intelligence analyst.\n\n[Layer 2 — Expertise & Constraints] You have 12 years of experience in B2B SaaS markets, specializing in analytics and data platforms. You've conducted 200+ competitive analyses for companies ranging from Series B startups to Fortune 500 enterprises. You prioritize evidence-based claims over speculation and always flag confidence levels.\n\n[Layer 3 — Communication Context] You're preparing a briefing document for the VP of Product who needs to make a build-vs-buy decision by Friday. She's technical but time-constrained — she wants conclusions first, supporting evidence second, and no fluff.\n\nTask: Write a competitive analysis of our analytics platform vs. DataCo, covering: (1) feature parity, (2) pricing model comparison, (3) integration ecosystem, (4) customer sentiment from G2/Gartner reviews. Flag any claims where your confidence is below 80%.",
          explanation: "The weak prompt gives the model no constraints — 'expert' in what? For whom? In what context? The three-layer version specifies exactly what kind of expert, what their analytical standards are, and who they're writing for. Notice how Layer 3 even tells the model the reader's preferences (conclusions first, no fluff), which directly shapes the output structure.",
        },
      },
      {
        title: "Audience-Aware Prompting",
        type: "example",
        body: "The same content needs fundamentally different framing depending on who will read it. This is one of the most underused techniques in prompting — people write for themselves instead of for their audience. When you specify the audience explicitly, the model adjusts vocabulary, depth, emphasis, and structure automatically.",
        promptExample: {
          good: "Explain our AI analytics platform's value proposition in three versions:\n\n1. For a CTO (focus on: technical architecture, integration capabilities, data security, scalability)\n2. For a CFO (focus on: ROI timeline, cost reduction metrics, competitive advantage, risk mitigation)\n3. For an end-user sales rep (focus on: daily workflow improvement, time saved, ease of use, quick wins)\n\nEach version should be 100 words max, use the audience's language and priorities, and end with a single compelling call-to-action.",
          explanation: "This prompt demonstrates audience targeting — the same product, three completely different framings. The CTO version will use technical terminology and focus on architecture. The CFO version will lead with numbers and business impact. The sales rep version will emphasize daily workflow and ease of use. Each version should feel like it was written specifically for that reader, because the prompt told the model exactly what each reader cares about.",
        },
      },
      {
        title: "The Tone Spectrum: Dialing Voice Up and Down",
        type: "example",
        body: "Tone isn't binary (formal vs. casual). It's a spectrum with multiple dimensions, and you can control each one independently. The most useful dimensions are: formality (casual ↔ formal), technicality (accessible ↔ expert), warmth (neutral ↔ empathetic), and assertiveness (tentative ↔ authoritative). Specifying where you want the output on each dimension gives you precise control over voice.",
        promptExample: {
          bad: "Write a professional email about the project delay.",
          good: "Write an email to the client about a 2-week project delay. Use these tone settings:\n\n• Formality: 7/10 (professional but not stiff — use contractions, avoid jargon)\n• Warmth: 8/10 (empathetic, acknowledge the inconvenience, show you care)\n• Assertiveness: 6/10 (confident about the solution, but not dismissive of their frustration)\n• Technicality: 3/10 (no technical details about why — focus on impact and resolution)\n\nThe email should: (1) acknowledge the delay upfront in the first sentence, (2) briefly explain the reason without making excuses, (3) present the revised timeline with specific dates, (4) offer a concrete goodwill gesture (e.g., expedited review of next milestone).\n\nLength: 150-200 words. The client is a non-technical marketing director who values transparency.",
          explanation: "'Professional' is meaningless as a tone instruction — it could mean anything from a legal brief to a friendly business email. The numbered tone dimensions give the model precise coordinates on the voice spectrum. Combined with the audience description (non-technical marketing director who values transparency), the model has everything it needs to hit the exact right tone.",
        },
      },
      {
        title: "Building a Reusable Voice Card",
        type: "tip",
        body: "A voice card is a reusable prompt block that defines a consistent brand or personal voice. Instead of re-describing your desired tone in every prompt, you create a voice card once and paste it into any prompt that needs that voice. This is essential for teams — it ensures everyone's AI outputs sound consistent.\n\nHere's a complete voice card template:\n\n--- VOICE CARD: [Brand/Person Name] ---\nPersonality: [2-3 adjectives, e.g., 'confident, approachable, slightly irreverent']\nVocabulary: [Words to use and avoid, e.g., 'Use: partners, build, unlock. Avoid: synergy, leverage, disrupt']\nSentence style: [e.g., 'Short sentences. Mix of declarative and rhetorical questions. Never more than 25 words per sentence.']\nPerspective: [e.g., 'First person plural (we/our). Address the reader as you.']\nDo: [e.g., 'Use concrete examples. Include data when available. End sections with a clear takeaway.']\nDon't: [e.g., 'Don't use exclamation marks. Don't hedge with maybe/perhaps. Don't use passive voice.']\nExample phrase: [A sentence that perfectly captures the voice, e.g., 'We tested three approaches. Here's what actually worked — and what we'd skip next time.']\n--- END VOICE CARD ---\n\nTo use it, simply paste the voice card at the top of any prompt and add: 'Write in the voice defined above.' The model will maintain that voice throughout the output. Build voice cards for your brand, your CEO's communications, your technical docs, and your marketing content.",
      },
      {
        title: "Common Persona Mistakes",
        type: "tip",
        body: "Five persona anti-patterns that consistently produce poor results:\n\n1. The Generic Expert: 'You are an expert' or 'You are a helpful assistant.' These add almost no constraint. Always specify the domain, seniority level, and context.\n\n2. The Contradictory Role: 'Be creative and innovative, but follow the template exactly.' Contradictory instructions force the model to guess which constraint to prioritize. If you need both creativity and structure, specify where each applies: 'Be creative with the messaging angles (section 2), but follow the exact format template for the executive summary (section 1).'\n\n3. The Role-Audience Mismatch: Assigning a technical expert role but asking them to write for a non-technical audience without saying so. The model will default to the role's natural communication style. Always specify both who's writing AND who's reading.\n\n4. The Missing Context: 'You are a CFO' — but presenting to whom? A board of directors? A team of interns? An investor? The communication context changes everything about how the CFO would speak.\n\n5. The Persona Overload: Assigning 3-4 simultaneous roles ('You are a data scientist, marketing strategist, and UX researcher'). The model can't meaningfully embody multiple personas at once. Instead, use sequential prompts with different roles, or use ensembling (Module 7) to generate outputs from each perspective separately.",
      },
    ],
  },
  {
    id: 4,
    title: "Reasoning Techniques",
    subtitle: "Teaching AI to Think",
    description: "Master Chain-of-Thought, Tree-of-Thought, and step-by-step reasoning techniques. Learn when and how to make the model show its work for more accurate, transparent outputs.",
    tenetIds: [2],
    targetLevel: "L2 → L3",
    duration: "15 min",
    topics: ["Chain-of-Thought (CoT) prompting", "Zero-CoT vs. Explicit CoT", "Tree-of-Thought exploration", "Step-by-step reasoning", "Reasoning verification"],
    keyTakeaways: [
      "Adding 'Let's think step by step' can improve accuracy by 10-40% on reasoning tasks",
      "Explicit CoT (providing example reasoning chains) outperforms Zero-CoT on complex tasks",
      "Tree-of-Thought explores multiple reasoning branches before committing to an answer",
      "Always verify reasoning outputs — the model can produce plausible-sounding but incorrect logic",
    ],
    content: [
      {
        title: "Why Reasoning Prompts Matter",
        type: "text",
        body: "In Module 3, you learned to control who the AI is and how it communicates. Now we tackle how it thinks. This module is where you cross from L2 (AI Assisted) to L3 (AI Accelerated) — the level where you can get the model to produce genuine analysis, not just pattern-matched responses.\n\nBy default, LLMs don't reason — they predict the most likely next token. When you ask 'Should we increase ad spend?', the model generates a plausible-sounding answer by pattern-matching against similar text in its training data. It's not actually analyzing your situation.\n\nReasoning prompts change this. By forcing the model to show its work — to think step by step, explore multiple paths, or verify its own logic — you activate a fundamentally different mode of operation. Research by Wei et al. (2022) showed that Chain-of-Thought prompting improves accuracy by 10-40% on reasoning tasks. That's not a marginal improvement — it's the difference between a useful tool and a unreliable one.",
      },
      {
        title: "Chain-of-Thought: The Foundation",
        type: "text",
        body: "Chain-of-Thought (CoT) prompting asks the model to work through a problem sequentially before reaching a conclusion. There are two main approaches:\n\n1. Zero-Shot CoT: Simply append 'Let's think step by step' or 'Think through this carefully before answering' to your prompt. No examples needed. Surprisingly effective for straightforward reasoning — math problems, logical deductions, simple analysis.\n\n2. Explicit CoT (Few-Shot CoT): Provide 1-2 examples of the reasoning process you want, then ask the model to follow the same pattern. More reliable for complex or domain-specific reasoning where you need the model to follow a particular analytical framework.\n\nThe key insight: Zero-Shot CoT is your default — try it first. If the reasoning quality isn't sufficient, upgrade to Explicit CoT by providing a reasoning template. The template doesn't need to be about the same topic — it just needs to demonstrate the depth and structure of reasoning you expect.",
      },
      {
        title: "Zero-CoT vs. Explicit CoT: Side-by-Side",
        type: "example",
        body: "Here's the same analytical task handled three ways: direct question (no reasoning), Zero-CoT (minimal reasoning nudge), and Explicit CoT (full reasoning framework). The quality difference is dramatic.",
        promptExample: {
          bad: "Should we increase our ad spend on Platform X?",
          good: "Analyze whether we should increase ad spend on Platform X. Use the following reasoning framework:\n\nStep 1 — Current Performance: Our current spend is $25K/month with a 3.2x ROAS. Industry average is 2.8x.\n\nStep 2 — Trend Analysis: Examine the trajectory. Is our ROAS improving, stable, or declining over the past 3 months?\n\nStep 3 — Marginal Returns: At what spend level do we typically see diminishing returns? Consider the law of diminishing marginal returns.\n\nStep 4 — Opportunity Cost: What else could we do with additional budget? Compare expected returns.\n\nStep 5 — Risk Assessment: What are the risks of increasing spend? (Market saturation, audience fatigue, seasonal factors)\n\nStep 6 — Recommendation: Based on steps 1-5, provide a clear recommendation with specific numbers.",
          explanation: "The direct question gets a surface-level answer. Adding 'Let's think step by step' (Zero-CoT) would produce some reasoning, but the model chooses its own framework — which may miss critical dimensions. The Explicit CoT version provides a complete reasoning framework with 6 specific steps. Each step builds on the previous one, and the model can't skip to a conclusion without working through the analysis. Notice how the framework includes both quantitative steps (performance, trends) and qualitative ones (opportunity cost, risk).",
        },
      },
      {
        title: "Tree-of-Thought: Branching Decisions",
        type: "example",
        body: "Tree-of-Thought (ToT) extends CoT by exploring multiple reasoning branches simultaneously, then evaluating which path leads to the best solution. While CoT follows one linear path, ToT generates 2-3 different approaches, evaluates each against criteria, and selects or synthesizes the best. This is invaluable for strategic decisions where there's no single obvious approach.",
        promptExample: {
          bad: "What's the best strategy for entering the European market?",
          good: "We're a B2B SaaS analytics company ($15M ARR, 200 US customers) evaluating European market entry. Explore three distinct strategic approaches:\n\nBranch A — Partnership-Led: Identify what a channel partner strategy would look like. What types of partners? Timeline? Investment required? Key risks?\n\nBranch B — Direct Sales: What would building a direct sales team in Europe require? Hiring plan? Office location? Regulatory considerations?\n\nBranch C — Product-Led Growth: Could we enter with a self-serve motion? What product changes would be needed? How would we handle localization and compliance?\n\nFor each branch, evaluate against these criteria (score 1-10):\n• Speed to first revenue\n• Capital efficiency\n• Scalability potential\n• Risk level\n• Fit with our current capabilities\n\nAfter evaluating all three, recommend either the best single approach or a hybrid strategy that combines elements from multiple branches. Justify your recommendation.",
          explanation: "The direct question gets one generic answer. The ToT version forces the model to genuinely explore three different strategic paths, evaluate each against the same criteria, and make a reasoned selection. This produces dramatically richer analysis because the model can't anchor on its first idea — it has to consider alternatives and justify why one is better.",
        },
      },
      {
        title: "When to Use Which Technique",
        type: "tip",
        body: "A quick decision guide for choosing your reasoning approach:\n\nUse Zero-Shot CoT ('Let's think step by step') when:\n• The task involves straightforward logic, math, or deduction\n• You want to improve accuracy without spending time on a framework\n• The domain is general enough that the model's default reasoning is adequate\n• You're exploring a problem and don't yet know what framework to apply\n\nUse Explicit CoT (provide a reasoning framework) when:\n• The task requires domain-specific analytical steps\n• You need the reasoning to follow a particular structure (e.g., SWOT, cost-benefit, risk assessment)\n• Zero-CoT produced reasoning that missed critical dimensions\n• You're building a reusable prompt for a recurring analytical task\n\nUse Tree-of-Thought when:\n• There are multiple viable approaches and you need to compare them\n• The problem is strategic or creative with no single right answer\n• You want to avoid anchoring bias (the model committing to its first idea)\n• The stakes are high enough to justify the extra output length\n\nRule of thumb: Start with Zero-CoT. If the reasoning is shallow, upgrade to Explicit CoT. If the problem has multiple valid approaches, use ToT.",
      },
      {
        title: "Reasoning Verification: Trust but Check",
        type: "example",
        body: "LLMs can produce reasoning that sounds convincing but is logically flawed. This is especially dangerous because the step-by-step format makes wrong answers look more credible. Verification prompts add a safety layer by asking the model to audit its own reasoning.",
        promptExample: {
          bad: "[Accept the model's first reasoning output without review]",
          good: "Now review your analysis above. For each step in your reasoning:\n\n1. Is the logic valid? Does each conclusion actually follow from the premises?\n2. Are there any hidden assumptions that might not hold?\n3. Did you consider the strongest counterargument at each step?\n4. Which step in your reasoning are you least confident about, and why?\n5. If you had to argue the opposite conclusion, what would be your strongest point?\n\nBased on this review, rate your confidence in the final recommendation (1-10) and note any caveats.",
          explanation: "This verification prompt forces the model to stress-test its own reasoning. Question 4 is particularly powerful — it asks the model to identify its own weakest link. Question 5 (arguing the opposite) is a form of adversarial review that often surfaces considerations the initial analysis missed. Always add a verification pass for high-stakes reasoning tasks.",
        },
      },
      {
        title: "Common Reasoning Pitfalls",
        type: "tip",
        body: "Four reasoning anti-patterns to watch for:\n\n1. Plausible but Wrong: The model produces a confident, well-structured reasoning chain that reaches an incorrect conclusion. The step-by-step format makes it look more credible. Fix: Always add a verification pass for important decisions. Don't let format substitute for accuracy.\n\n2. CoT Overkill: Using elaborate reasoning frameworks for simple tasks. If you need a one-paragraph email summary, don't ask for a 6-step analytical framework. CoT adds value when the task genuinely requires reasoning — not when it's just generation.\n\n3. Groundless Reasoning: The model reasons step-by-step but the reasoning isn't grounded in the actual data you provided. It fills gaps with plausible-sounding but invented facts. Fix: Provide all relevant data in the prompt and add 'Only reason from the data provided. If information is missing, say so rather than assuming.'\n\n4. Confusing Length with Depth: Longer reasoning chains aren't necessarily better. A model might pad its reasoning with obvious observations to appear thorough. Fix: Specify 'Focus on non-obvious insights and critical decision points. Skip steps that state the obvious.'",
      },
    ],
  },
  {
    id: 5,
    title: "Complex Problem Solving",
    subtitle: "Divide and Conquer",
    description: "Learn to decompose complex, multi-faceted problems into manageable sub-tasks. Master sequential, parallel, and hierarchical decomposition strategies for comprehensive solutions.",
    tenetIds: [3],
    targetLevel: "L3",
    duration: "15 min",
    topics: ["Sequential decomposition", "Parallel decomposition", "Hierarchical decomposition", "Sub-prompt design", "Output synthesis"],
    keyTakeaways: [
      "Complex tasks almost always produce better results when decomposed into focused sub-tasks",
      "Sequential decomposition works when later steps depend on earlier results",
      "Parallel decomposition is ideal when sub-tasks are independent and can be combined later",
      "The synthesis step is critical — decomposed outputs need deliberate integration",
    ],
    content: [
      {
        title: "Why Decomposition Transforms Output Quality",
        type: "text",
        body: "When you ask an LLM to 'create a comprehensive marketing strategy,' you're asking it to simultaneously consider market analysis, competitive positioning, channel selection, messaging, budgeting, timeline, and KPIs. The model spreads its attention across all these dimensions, producing shallow coverage of each.\n\nDecomposition solves this by giving the model's full attention to one dimension at a time. A focused prompt about competitive positioning will produce dramatically better analysis than a paragraph buried in a 'do everything' prompt.\n\nThis is where you start thinking in systems, not single prompts. At L3, the question isn't 'How do I write a better prompt?' but 'How do I break this problem into prompts that each do one thing well?'\n\nThree decomposition strategies, each suited to different problem shapes:\n\n1. Sequential: Each sub-task feeds into the next (research → analysis → strategy → execution plan)\n2. Parallel: Independent sub-tasks solved simultaneously, then combined (analyze market A, B, C separately, then compare)\n3. Hierarchical: Break into categories, then sub-categories (strategy → channels → per-channel tactics)",
      },
      {
        title: "Sequential Decomposition in Action",
        type: "example",
        body: "Sequential decomposition is your go-to when later steps depend on earlier results. Each prompt's output becomes context for the next. The key discipline: resist the urge to combine steps. Even if two steps seem related, keeping them separate produces better results because the model gives full attention to each.",
        promptExample: {
          good: "I'm building an account strategy for Acme Corp (Fortune 500 retail). Let's work through this sequentially:\n\nPrompt 1/5 — Research: Summarize Acme Corp's recent earnings, strategic priorities, technology investments, and key decision-makers in their marketing/technology departments.\n\n[After receiving output, use it as context for:]\n\nPrompt 2/5 — Pain Points: Based on the research above, identify the top 5 business challenges Acme Corp likely faces that our analytics platform could address.\n\n[Continue building...]\n\nPrompt 3/5 — Solution Mapping: For each pain point, map specific features of our platform to their needs.\n\nPrompt 4/5 — Objection Preparation: Anticipate the top 5 objections from Acme's CTO and CFO, and prepare responses.\n\nPrompt 5/5 — Synthesis: Combine all outputs into a 2-page account strategy brief.",
          explanation: "Each prompt builds on the previous output, creating a chain of increasingly refined and contextualized analysis. Notice the dependency chain: you can't identify pain points (Prompt 2) without the research (Prompt 1), and you can't map solutions (Prompt 3) without knowing the pain points. The final synthesis step ensures all the pieces come together coherently.",
        },
      },
      {
        title: "Parallel Decomposition: Independent Lanes",
        type: "example",
        body: "Parallel decomposition is ideal when you need the same type of analysis applied to multiple independent subjects. Instead of asking the model to analyze everything at once (which produces shallow comparisons), you run the same analytical framework against each subject separately, then combine the results.",
        promptExample: {
          bad: "Compare our product against competitors DataCo, AnalytiQ, and InsightPro across features, pricing, market position, and customer satisfaction.",
          good: "I need a competitive analysis. Let's run this in parallel lanes:\n\n[Prompt A — run independently]\nAnalyze DataCo as a competitor to our analytics platform. Cover: (1) Feature comparison — where they're stronger and weaker, (2) Pricing model and how it compares to ours, (3) Market positioning and target customer, (4) Customer sentiment from G2 and Gartner reviews. Format as a structured brief with a summary verdict.\n\n[Prompt B — same framework, different subject]\nAnalyze AnalytiQ as a competitor... [same structure]\n\n[Prompt C — same framework, different subject]\nAnalyze InsightPro as a competitor... [same structure]\n\n[Synthesis Prompt — after receiving all three]\nHere are three independent competitor analyses: [paste A, B, C]. Now create a comparative matrix and identify: (1) Our strongest competitive advantages across all three, (2) Our most critical vulnerability, (3) The competitor we should worry about most and why, (4) Recommended positioning strategy.",
          explanation: "The bad prompt asks the model to juggle 4 dimensions across 3 competitors simultaneously — 12 analytical threads at once. The parallel approach gives full attention to each competitor, producing deeper analysis. The synthesis prompt then has rich material to work with for the comparison. Notice how each parallel prompt uses the identical framework, making the outputs directly comparable.",
        },
      },
      {
        title: "Hierarchical Decomposition: Categories Within Categories",
        type: "example",
        body: "Hierarchical decomposition works like an outline — you break a big problem into categories, then break each category into sub-categories. This is powerful for strategic planning, content creation, and any task with natural nested structure.",
        promptExample: {
          good: "I'm building a content marketing strategy. Let's decompose hierarchically:\n\n[Level 1 — Channel Identification]\nIdentify the 4 most effective content channels for a B2B SaaS analytics company targeting enterprise buyers. For each channel, provide a one-sentence rationale.\n\n[Level 2 — Per-Channel Deep Dive] (run for each channel from Level 1)\nFor the [CHANNEL] channel, define:\n• Target audience segment (who specifically are we reaching here?)\n• Content cadence (how often should we publish?)\n• Top 5 topic themes with working titles\n• Key metrics and KPI targets for the first 6 months\n• Resource requirements (headcount, tools, budget)\n\n[Level 3 — Content Briefs] (run for top-priority topics from Level 2)\nCreate a detailed content brief for: [TOPIC TITLE]\nInclude: target keyword, audience pain point addressed, outline with H2/H3 structure, key data points to include, CTA, and distribution plan.",
          explanation: "Each level adds specificity. Level 1 gives you the strategic framework (which channels). Level 2 gives you the operational plan for each channel. Level 3 gives you execution-ready briefs for individual pieces. You couldn't write good Level 3 briefs without the Level 2 context, and you couldn't write Level 2 plans without the Level 1 strategy. The hierarchy ensures each decision is informed by the level above it.",
        },
      },
      {
        title: "The Synthesis Step: Putting It All Back Together",
        type: "tip",
        body: "Decomposition without synthesis is just a pile of parts. The synthesis step is where you integrate all the sub-outputs into a coherent whole — and it's the step most people skip or do poorly.\n\nA good synthesis prompt includes four elements:\n\n1. All sub-outputs as context: Paste every sub-output into the synthesis prompt. The model needs the full picture to integrate effectively.\n\n2. Integration instructions: Don't just say 'combine these.' Specify how they should connect: 'Identify common themes across all three analyses. Resolve any contradictions by explaining which perspective is more supported by evidence.'\n\n3. Final format specification: Define exactly what the synthesized output should look like — executive summary, comparison matrix, action plan, narrative report, etc.\n\n4. Contradiction handling: Explicitly tell the model what to do when sub-outputs disagree: 'If the competitor analyses suggest conflicting positioning strategies, present both options with pros/cons rather than arbitrarily choosing one.'\n\nExample synthesis prompt opener: 'Below are [N] analysis outputs from separate focused prompts. Your task is to synthesize these into a single coherent [deliverable type]. Identify patterns that appear across multiple analyses, flag any contradictions, and produce a unified recommendation that accounts for all perspectives.'",
      },
      {
        title: "When Decomposition Hurts",
        type: "tip",
        body: "Decomposition is powerful, but it's not always the right tool. Four situations where it can actually make things worse:\n\n1. Over-Decomposing Simple Tasks: If the task can be described in under 100 words and doesn't involve multiple distinct analytical dimensions, try it as a single prompt first. Writing a 3-prompt chain for a one-paragraph email is overhead that adds no value.\n\n2. Losing Context Across Sub-Prompts: Each sub-prompt starts with limited context. If your decomposition creates 8 sub-prompts, the model in Prompt 8 may not have enough context from Prompts 1-3 to produce coherent output. Fix: Include relevant context summaries in later prompts, or use a running context document that grows with each step.\n\n3. Forgetting the Synthesis Step: Running 5 parallel analyses and then just stapling the outputs together. Without a deliberate synthesis prompt, you get a collection of parts, not an integrated deliverable. Always budget a synthesis step.\n\n4. Decomposing Before Understanding: Breaking a problem into sub-tasks before you understand the problem structure. Fix: Start with a 'problem understanding' prompt that maps the problem space, identifies dependencies, and suggests a decomposition strategy. Then decompose based on that map.\n\nRule of thumb: If a single well-crafted prompt produces 80%+ quality output, decomposition probably isn't worth the overhead. Save it for genuinely complex, multi-dimensional problems.",
      },
    ],
  },
  {
    id: 6,
    title: "Iteration & Refinement",
    subtitle: "The Critique Loop",
    description: "Master the art of iterative improvement through self-critique, validation loops, and structured refinement. Learn to transform first drafts into polished deliverables.",
    tenetIds: [5],
    targetLevel: "L3 → L4",
    duration: "12 min",
    topics: ["Generate-Critique-Revise cycles", "Role-based critique", "Adversarial review", "Checklist validation", "Measurable improvement"],
    keyTakeaways: [
      "First drafts from AI should be treated as starting points, not final outputs",
      "Role-based critique (reviewing as different stakeholders) catches different types of weaknesses",
      "Adversarial review ('red-teaming') is essential for high-stakes deliverables",
      "Setting measurable improvement targets (e.g., '20% more specific') drives real quality gains",
    ],
    content: [
      {
        title: "The Generate-Critique-Revise Cycle",
        type: "text",
        body: "This module marks the transition from L3 to L4 — from someone who can get good outputs to someone who consistently produces excellent ones. The key insight: LLMs are often better critics than generators. A model that produces a B+ first draft can frequently identify exactly what would make it an A+, if you ask it to.\n\nThe Generate-Critique-Revise (GCR) cycle exploits this asymmetry:\n\n1. Generate: Create an initial output with a well-structured prompt\n2. Critique: Ask the model to evaluate its own output against specific criteria\n3. Revise: Use the critique to produce an improved version\n4. Repeat: Continue until quality targets are met\n\nBy separating generation from evaluation, you get the best of both capabilities. The generation step is creative and expansive. The critique step is analytical and precise. The revision step is targeted and efficient.\n\nResearch shows that v2 outputs from this cycle are typically 20-40% stronger than v1 on measurable quality dimensions like specificity, accuracy, and persuasiveness. The first revision captures most of the value — v3 improvements are typically smaller but still meaningful for high-stakes deliverables.",
      },
      {
        title: "A GCR Cycle in Practice",
        type: "example",
        body: "Let's walk through the full three-step cycle on a concrete task: writing a client follow-up email after a product demo. Watch how each step transforms the output.",
        promptExample: {
          bad: "Write a follow-up email after a product demo. Make it better.",
          good: "[Step 1 — Generate]\nYou are a senior account executive. Write a follow-up email to the VP of Marketing at RetailCo after a 45-minute product demo of our analytics platform. The demo went well — they were particularly interested in our real-time dashboard feature and asked about integration with Salesforce. Their main concern was implementation timeline. Keep it under 200 words, professional but warm.\n\n[Step 2 — Critique] (after receiving the draft)\nReview the email draft above against these 4 criteria:\n• Specificity: Does it reference specific moments from the demo, or is it generic?\n• Value-add: Does it provide something new (not just a recap)?\n• Next steps: Is the CTA clear, specific, and easy to act on?\n• Tone: Does it sound like a trusted advisor or a pushy salesperson?\nFor each criterion, score 1-10 and provide a specific improvement suggestion.\n\n[Step 3 — Revise] (after receiving the critique)\nRevise the email incorporating all four improvement suggestions from the critique. Maintain the same length and tone, but address each specific weakness identified.",
          explanation: "The bad prompt ('make it better') gives the model no criteria for improvement. The GCR version separates the three cognitive tasks: creative generation, analytical evaluation, and targeted revision. The critique step uses specific, measurable criteria — not vague quality judgments. The revision step explicitly references the critique, creating a clear improvement path.",
        },
      },
      {
        title: "Multi-Perspective Critique",
        type: "example",
        body: "A single perspective catches single-perspective problems. Multi-perspective critique assigns different stakeholder roles to the reviewer, each looking for different types of weaknesses. This is one of the most powerful techniques for high-stakes deliverables.",
        promptExample: {
          good: "Here's a draft proposal for our enterprise analytics platform:\n[paste draft]\n\nNow critique this proposal from three perspectives:\n\n1. As the client's CFO: Is the ROI argument convincing? Are the financial projections credible? What cost concerns would you raise?\n\n2. As a competing vendor: What weaknesses would you exploit? Where is the proposal vague or unsubstantiated? What would you say to undermine it?\n\n3. As an internal editor: Is the writing clear and concise? Are there any jargon or buzzwords that add no value? Is the structure logical?\n\nFor each perspective, provide:\n- 3 specific weaknesses (with exact quotes from the draft)\n- A suggested fix for each weakness\n- An overall quality score (1-10) with justification",
          explanation: "The CFO perspective catches financial gaps and credibility issues. The competitor perspective catches strategic weaknesses and vague claims — things a friendly reviewer would never notice. The editor perspective catches communication issues. Together, they cover analytical, strategic, and stylistic dimensions. Notice the requirement for 'exact quotes from the draft' — this forces specific, actionable feedback rather than vague observations.",
        },
      },
      {
        title: "Adversarial Red-Teaming",
        type: "example",
        body: "For high-stakes outputs — proposals, public communications, legal-adjacent content, executive presentations — friendly review isn't enough. Adversarial red-teaming asks the model to actively try to break your output, find every flaw, and exploit every weakness. It's uncomfortable but invaluable.",
        promptExample: {
          bad: "Review this proposal for any errors or issues.",
          good: "You are a hostile, highly experienced critic who has been hired to find every possible flaw in this proposal. Your reputation depends on finding problems others missed. Your job is to be adversarial, not helpful.\n\nReview the proposal below and attack it on these vectors:\n\n1. Logical gaps: Where does the argument not follow? Where are claims unsupported?\n2. Missing evidence: What claims need data that isn't provided? What would a skeptic demand proof of?\n3. Competitive vulnerability: If a competitor read this, what would they use against us?\n4. Worst-case interpretation: How could a hostile reader misinterpret any section?\n5. Credibility risks: What sounds like marketing fluff vs. substantiated claims?\n\nFor each issue found, rate severity (Critical / Major / Minor) and suggest a specific fix.\n\n[paste proposal]",
          explanation: "'Review for errors' gets a polite, surface-level review. The adversarial framing ('hostile critic,' 'your reputation depends on finding problems') activates a completely different mode. The specific attack vectors ensure the model looks for structural issues, not just typos. Severity ratings help you prioritize which fixes matter most.",
        },
      },
      {
        title: "Setting Measurable Improvement Targets",
        type: "tip",
        body: "'Make it better' is not a useful instruction — for humans or AI. Measurable improvement targets transform vague quality aspirations into concrete, achievable goals.\n\nUseful quality dimensions you can measure:\n\n• Specificity: Count of concrete details, data points, or named examples. Target: 'Increase from 3 specific examples to at least 7.'\n• Conciseness: Word count. Target: 'Reduce from 500 words to under 300 while preserving all key points.'\n• Evidence density: Ratio of claims to supporting evidence. Target: 'Every claim should have at least one supporting data point or example.'\n• Actionability: Count of specific, implementable recommendations. Target: 'Each section should end with a concrete next step that includes who, what, and by when.'\n• Reading level: Flesch-Kincaid score. Target: 'Rewrite for a grade 10 reading level (currently grade 14).'\n\nBuild these into your critique prompts: 'Score this draft on specificity (count of concrete examples), conciseness (word count), and actionability (number of specific recommendations). Then revise to improve the lowest-scoring dimension by at least 50%.'\n\nThis approach turns iteration from a subjective 'does this feel better?' into an objective 'did the numbers improve?'",
      },
      {
        title: "Knowing When to Stop",
        type: "tip",
        body: "Iteration has diminishing returns. The first GCR cycle captures 60-80% of the possible improvement. The second cycle captures another 10-20%. By the third cycle, you're usually polishing, not improving.\n\nSigns you're done iterating:\n\n• The critique finds only minor issues (word choice, formatting) rather than structural problems\n• Changes between versions are cosmetic, not substantive\n• The output meets all your measurable quality targets\n• The model starts 'improving' things that were already good (a sign of over-optimization)\n\nSigns you need another round:\n\n• The critique identified a structural issue (missing section, wrong audience, logical gap)\n• A key stakeholder perspective hasn't been considered yet\n• The output would embarrass you if a senior leader read it\n\nThe 80/20 rule applies: spend 80% of your effort on the first revision (where the biggest gains are) and only do additional rounds for truly high-stakes deliverables. For a routine email, one GCR cycle is plenty. For a board presentation, three cycles is justified.\n\nAnti-pattern to avoid: infinite polishing loops where you keep asking the model to 'improve' without specific criteria. Each iteration should have a clear, measurable goal. If you can't articulate what 'better' means for the next round, you're done.",
      },
    ],
  },
  {
    id: 7,
    title: "Advanced Strategies",
    subtitle: "Multi-Prompt Systems",
    description: "Explore ensembling, multi-prompt architectures, aggregation techniques, and advanced prompting patterns. Learn to design prompt systems that produce consistently excellent outputs.",
    tenetIds: [4],
    targetLevel: "L4 → L5",
    duration: "15 min",
    topics: ["Multi-perspective generation", "Aggregation methods", "Prompt chaining", "Meta-prompting", "Prompt templates and libraries"],
    keyTakeaways: [
      "Ensembling multiple perspectives produces more robust outputs than any single prompt",
      "Four aggregation methods: Majority Voting, Union, Synthesis, and Weighted",
      "Prompt chaining creates sophisticated workflows from simple building blocks",
      "Meta-prompting (prompts that generate prompts) enables scalable prompt engineering",
    ],
    content: [
      {
        title: "From Single Prompts to Prompt Systems",
        type: "text",
        body: "This module marks the transition from L4 to L5 — from someone who writes excellent individual prompts to someone who designs systems of prompts that work together. At this level, you're not a prompt writer anymore. You're a prompt architect.\n\nThe key insight: just as a single function can't build a complex application, a single prompt can't reliably handle complex, multi-dimensional tasks. But a system of simple, focused prompts — each doing one thing well — can produce outputs that no single prompt could match.\n\nThree architectural patterns you'll master in this module:\n\n1. Ensembling: Multiple perspectives on the same problem, aggregated into a superior output\n2. Prompt Chaining: Sequential prompts where each output feeds the next input\n3. Meta-Prompting: Prompts that generate other prompts, enabling scalable prompt engineering\n\nThese patterns combine everything you've learned — ICL, CoT, Decomposition, and Self-Criticism — into production-ready systems.",
      },
      {
        title: "Ensembling in Practice",
        type: "example",
        body: "Ensembling generates multiple responses to the same problem using different perspectives, then combines the best elements. It's borrowed from machine learning, where combining multiple models consistently outperforms any single model. In prompt engineering, the 'multiple models' are different role assignments or analytical frameworks applied to the same question.",
        promptExample: {
          bad: "Create a product launch strategy for our new AI analytics feature targeting enterprise buyers.",
          good: "I need a product launch strategy for our new AI analytics feature targeting enterprise buyers. Generate three independent perspectives:\n\n[Perspective 1 — Growth Marketer]\nYou are a growth marketer with 15 years in B2B SaaS. Design a launch strategy focused on demand generation, conversion funnels, and measurable pipeline impact. Include specific channels, tactics, and KPIs.\n\n[Perspective 2 — Brand Strategist]\nYou are a brand strategist who has launched 20+ enterprise products. Design a launch strategy focused on market positioning, narrative, competitive differentiation, and long-term brand equity. Include messaging framework and positioning statement.\n\n[Perspective 3 — Data-Driven Product Marketer]\nYou are a product marketer who relies heavily on data and customer research. Design a launch strategy focused on customer segmentation, use-case prioritization, proof points, and customer evidence. Include specific customer stories to develop.\n\n[Synthesis Prompt — after receiving all three]\nHere are three launch strategy perspectives from different experts: [paste all three]. Synthesize these into a single unified launch plan that:\n• Takes the strongest tactical elements from the Growth Marketer\n• Uses the positioning framework from the Brand Strategist\n• Grounds everything in the customer evidence approach from the Product Marketer\n• Resolves any contradictions by explaining your reasoning\nFormat as an executive-ready launch brief.",
          explanation: "The single-prompt version gets one perspective — whatever the model defaults to. The ensembling version gets three genuinely different strategic lenses, each with domain-specific depth. The synthesis prompt doesn't just merge them — it specifies what to take from each perspective and how to resolve conflicts. The result is a strategy that no single perspective could have produced.",
        },
      },
      {
        title: "Choosing Your Aggregation Method",
        type: "tip",
        body: "Not all ensembling outputs should be combined the same way. Four aggregation methods, each suited to different situations:\n\n1. Majority Voting\nHow it works: Generate 3-5 responses, go with the most common answer.\nBest for: Factual questions, classification tasks, yes/no decisions.\nExample: 'Is this customer email a complaint, a feature request, or a general inquiry?' Run 5 times, take the majority classification.\n\n2. Union\nHow it works: Combine all unique points from multiple responses, removing duplicates.\nBest for: Brainstorming, comprehensive research, risk identification.\nExample: 'What are the risks of this product launch?' Run 3 times with different framings, union all unique risks into a master list.\n\n3. Synthesis\nHow it works: Blend the strongest elements from each response into a new, superior output.\nBest for: Strategy, writing, creative work, complex analysis.\nExample: The product launch strategy example above — taking the best from each perspective.\n\n4. Weighted\nHow it works: Give more weight to responses from prompts that historically perform better.\nBest for: Production systems where you have quality data on which prompts produce better outputs.\nExample: In a customer support system, weight responses from the 'empathetic support agent' prompt higher than the 'technical troubleshooter' prompt for complaint tickets, based on customer satisfaction scores.\n\nQuick decision guide: If there's a 'right answer' → Majority Voting. If you need comprehensive coverage → Union. If you need quality → Synthesis. If you have performance data → Weighted.",
      },
      {
        title: "Prompt Chaining: A Worked Architecture",
        type: "example",
        body: "Prompt chaining connects multiple prompts in sequence, where each prompt's output becomes the next prompt's input. Unlike decomposition (Module 5), which breaks a problem into parts, chaining creates a workflow where each step transforms and enriches the output.",
        promptExample: {
          bad: "Research the topic of AI in healthcare, write a comprehensive 2000-word article about it, make sure it's well-structured, accurate, engaging, and optimized for SEO.",
          good: "[Chain Step 1 — Research & Angle]\nI'm writing an article about AI in healthcare for a B2B audience of hospital CTOs. Identify 3 specific angles that would be timely and differentiated (not the generic 'AI is transforming healthcare' angle). For each, provide: the specific angle, why it's timely, and 3 key data points or examples.\n\n[Chain Step 2 — Outline] (using output from Step 1)\nBased on the angle [selected angle from Step 1], create a detailed article outline. Include: H1 title (SEO-optimized), H2 section headers, 2-3 bullet points per section describing what to cover, target word count per section, and the key takeaway for each section.\n\n[Chain Step 3 — Draft] (using output from Steps 1+2)\nWrite the full article following this outline: [paste outline]. Use the research and data points from the research phase: [paste research]. Write in a confident, authoritative tone appropriate for hospital CTOs. Target 2000 words total.\n\n[Chain Step 4 — Critique & Revise] (using output from Step 3)\nReview this article draft against these criteria: (1) Accuracy — are all claims substantiated? (2) Engagement — would a busy CTO keep reading? (3) Actionability — does it give readers something to do? (4) SEO — are target keywords naturally integrated? Score each 1-10, then revise the draft to address the lowest-scoring areas.",
          explanation: "The single mega-prompt asks the model to simultaneously research, structure, write, and optimize — spreading attention across all dimensions. The chain gives full attention to each step: research produces better angles, which produce a better outline, which produces a better draft, which gets a focused critique. Each step is simple; the chain is sophisticated.",
        },
      },
      {
        title: "Meta-Prompting: Prompts That Write Prompts",
        type: "example",
        body: "Meta-prompting is the most advanced technique in prompt engineering. Instead of writing prompts for each specific task, you write a prompt that generates optimized prompts. This is how you scale from handling 5 use cases to handling 500.",
        promptExample: {
          bad: "[Manually writing separate prompts for each of 10 customer segments]\nWrite an email to enterprise healthcare buyers about our analytics platform...\nWrite an email to mid-market retail buyers about our analytics platform...\nWrite an email to startup fintech buyers about our analytics platform...\n[...repeat 7 more times]",
          good: "You are a prompt engineering expert. I need to generate personalized outreach emails for 10 different customer segments for our AI analytics platform.\n\nFor each segment below, generate an optimized prompt that I can use to create a tailored email. Each generated prompt should include:\n• A specific role assignment relevant to that segment's industry\n• 3 key pain points specific to that segment\n• The tone and formality level appropriate for that buyer persona\n• A specific CTA relevant to their buying stage\n• Format and length constraints\n\nSegments:\n1. Enterprise Healthcare — CTO, evaluating vendors\n2. Mid-Market Retail — VP Marketing, aware but not engaged\n3. Startup Fintech — CEO, early-stage exploration\n[...continue for all 10]\n\nFor each segment, output the complete, ready-to-use prompt in a code block.",
          explanation: "Instead of writing 10 prompts manually (each taking 5-10 minutes), you write one meta-prompt that generates all 10 in a single pass. The meta-prompt encodes your prompt engineering knowledge (role assignment, pain points, tone matching, CTA design) and applies it systematically to each segment. This is how prompt engineering scales from craft to system.",
        },
      },
      {
        title: "Building Reusable Prompt Templates",
        type: "tip",
        body: "The difference between a prompt and a template is parameterization. A prompt solves one specific task. A template solves a category of tasks by using variable slots that get filled in for each instance.\n\nAnatomy of a good prompt template:\n\n═══ TEMPLATE: Stakeholder Email ═══\nRole: You are a [ROLE] at [COMPANY_TYPE].\nContext: You just completed a [EVENT_TYPE] with [STAKEHOLDER_NAME], [STAKEHOLDER_TITLE] at [CLIENT_COMPANY]. Key discussion points: [KEY_POINTS]. Their main concern: [MAIN_CONCERN].\nTask: Write a follow-up email that [OBJECTIVE].\nConstraints: [WORD_LIMIT] words max. Tone: [TONE]. Include: [REQUIRED_ELEMENTS].\nFormat: Subject line + email body. End with a specific CTA for [NEXT_STEP].\n══════════════════════════════════\n\nTemplate design principles:\n\n1. Fixed scaffold, variable slots: The structure stays the same; only the specifics change. Use [CAPS_WITH_UNDERSCORES] for variable slots so they're easy to spot and fill.\n\n2. Include usage instructions: Document what each variable expects (e.g., '[TONE]: Choose from: formal, conversational, urgent, empathetic').\n\n3. Organize by task type: Group templates into categories — emails, analysis, content creation, strategy — so your team can find the right template quickly.\n\n4. Version your templates: Track which version works best. When you improve a template, keep the old version and note what changed and why.\n\n5. Share with your team: A prompt template library is one of the highest-leverage things you can build. One person's optimization benefits everyone.",
      },
    ],
  },
  {
    id: 8,
    title: "Real-World Applications",
    subtitle: "Putting It All Together",
    description: "Apply all 5 Core Tenets to real-world scenarios: pitch creation, objection handling, account research, competitive analysis, and crisis response. Capstone exercises that integrate everything you've learned.",
    tenetIds: [1, 2, 3, 4, 5],
    targetLevel: "L5",
    duration: "15 min",
    topics: ["Enterprise deal strategy", "Crisis response", "Vertical expansion", "Pitch creation", "Objection handling playbooks"],
    keyTakeaways: [
      "Real-world problems rarely need just one tenet — mastery means knowing which combination to apply",
      "Start with Decomposition to break the problem, then apply other tenets to each sub-task",
      "Always end with Self-Criticism for any client-facing deliverable",
      "Build reusable prompt templates for recurring tasks to scale your expertise",
    ],
    content: [
      {
        title: "The Tenet Selection Framework",
        type: "text",
        body: "You've now learned all 5 Core Tenets individually. The real skill is knowing which ones to apply — and in what combination — when you face a new problem. Here's a decision framework:\n\nStep 1 — Assess Complexity: Is this a single-step task or a multi-step workflow?\n• Single-step: Start with ICL (few-shot examples) and clear structure (Module 2). This handles 60% of tasks.\n• Multi-step: You'll need Decomposition (Module 5) as the backbone.\n\nStep 2 — Assess Reasoning Needs: Does the task require analysis, logic, or decision-making?\n• Yes: Add Chain-of-Thought or Tree-of-Thought (Module 4).\n• No (pure generation): Skip reasoning techniques.\n\nStep 3 — Assess Perspective Needs: Would multiple viewpoints improve the output?\n• Yes: Add Ensembling (Module 7) — multiple roles or analytical frameworks.\n• No (single clear perspective): Use a single, well-defined role (Module 3).\n\nStep 4 — Assess Stakes: How important is this output?\n• High stakes (client-facing, public, executive): Add Self-Criticism (Module 6) — GCR cycle + adversarial review.\n• Low stakes (internal, exploratory): One pass is usually sufficient.\n\nStep 5 — Assess Consistency Needs: Do you need the same quality every time?\n• Yes: Build a reusable template with ICL examples baked in.\n• No (one-off): A custom prompt is fine.\n\nThis framework becomes intuitive with practice. You'll stop thinking 'which tenet should I use?' and start naturally reaching for the right combination.",
      },
      {
        title: "Capstone: Enterprise Deal Strategy (Fully Worked)",
        type: "example",
        body: "Scenario: A Fortune 500 retail client is evaluating your analytics platform vs. two competitors for a $2M annual commitment. You need a comprehensive deal strategy. This capstone shows the actual prompts — not just the tenet mapping.",
        promptExample: {
          good: "[Prompt 1 — Decomposition + Research]\nI'm preparing a deal strategy for RetailMax (Fortune 500, $12B revenue, 2,400 stores). They're evaluating our analytics platform against CompetitorA and CompetitorB for a $2M annual commitment. Decision-makers: CTO (technical evaluation), CFO (budget approval), CMO (business sponsor).\n\nBreak this into a 4-phase strategy and for Phase 1, research RetailMax's recent earnings, strategic priorities, and technology investments. Identify their top 3 business challenges relevant to analytics.\n\n[Prompt 2 — ICL + Positioning]\nHere's the research output: [paste Prompt 1 output]\n\nHere are two examples of winning positioning statements from similar F500 deals:\nExample 1: [paste winning positioning for a retail client]\nExample 2: [paste winning positioning for a similar-sized deal]\n\nUsing these as style and structure guides, write a positioning statement for RetailMax that directly addresses their top 3 challenges.\n\n[Prompt 3 — CoT + ROI Model]\nBuild an ROI model for RetailMax's $2M investment. Think step by step:\n1. Identify 3 quantifiable value drivers based on their challenges\n2. For each, estimate conservative, moderate, and aggressive impact\n3. Calculate total projected ROI at each scenario\n4. Show your reasoning for every assumption\n\n[Prompt 4 — Ensembling + Objection Prep]\nGenerate objection responses from three perspectives:\nAs the CTO: What technical concerns would you raise? Write a response for each.\nAs the CFO: What budget/ROI concerns would you raise? Write a response for each.\nAs a competitor: What would you say to undermine our proposal? Write a counter for each.\nSynthesize into a single objection playbook organized by stakeholder.\n\n[Prompt 5 — Self-Criticism]\nRed-team the complete deal strategy: [paste all outputs]. You are a hostile competitor who has seen this proposal. Find every weakness, unsupported claim, and vulnerability. Rate each issue Critical/Major/Minor. Then revise the strategy to address all Critical and Major issues.",
          explanation: "This capstone uses all 5 tenets in a natural workflow: Decomposition structures the overall approach, ICL provides proven templates for positioning, CoT builds a transparent ROI model, Ensembling generates multi-stakeholder objection prep, and Self-Criticism stress-tests the final output. Notice how each prompt builds on previous outputs — this is prompt chaining (Module 7) applied to a real deal.",
        },
      },
      {
        title: "Capstone: Crisis Response (Fully Worked)",
        type: "example",
        body: "Scenario: Your top client's Q4 campaign significantly underperformed expectations. They spent $500K and got 40% below projected leads. The CMO is demanding answers and considering pausing all spend.",
        promptExample: {
          good: "[Prompt 1 — CoT Diagnosis]\nA client spent $500K on a Q4 campaign that delivered 40% below projected leads. Analyze this step by step:\n1. What are the most common causes of campaign underperformance at this scale?\n2. For each cause, what data would confirm or rule it out?\n3. Given Q4 timing (holiday competition, audience fatigue, budget flush), which causes are most likely?\n4. Rank the top 3 most probable root causes with your reasoning.\n\n[Prompt 2 — Ensembling Response Options]\nBased on the diagnosis: [paste Prompt 1 output]\n\nGenerate three response approaches:\nApproach A (Empathetic): Lead with acknowledgment and relationship preservation\nApproach B (Technical): Lead with root cause analysis and data transparency\nApproach C (Solution-Forward): Lead with the remediation plan and quick wins\n\nFor each, write the opening paragraph of the client email and outline the full structure.\n\n[Prompt 3 — Synthesis + Role Assignment]\nYou are a senior client director with 20 years of experience saving at-risk accounts. Synthesize the three approaches above into a single response that:\n• Opens with empathy (from Approach A)\n• Transitions to transparent analysis (from Approach B)\n• Closes with a concrete action plan (from Approach C)\nWrite the full client email (under 400 words) + a separate internal post-mortem summary.\n\n[Prompt 4 — Adversarial Review]\nYou are the angry CMO who received this email. Your $500K is gone and your board is asking questions. Read this response and identify: (1) Anything that sounds like an excuse rather than an explanation, (2) Any missing accountability, (3) Whether the action plan is specific enough to restore confidence. Then revise the email to address your concerns.",
          explanation: "The crisis response uses CoT for systematic diagnosis (not guessing), Ensembling to explore multiple response strategies before committing, Role Assignment for the right tone, and Adversarial Review to stress-test from the angry client's perspective. The key insight: the synthesis step doesn't pick one approach — it takes the best elements from each.",
        },
      },
      {
        title: "Capstone: Market Expansion Strategy",
        type: "example",
        body: "Scenario: Your company (B2B SaaS analytics platform) is expanding from your core market (retail) into healthcare. You need a market entry strategy that accounts for a completely different buyer persona, regulatory environment, and competitive landscape.",
        promptExample: {
          good: "[Prompt 1 — Decomposition: Parallel Market Analysis]\nWe're expanding our B2B analytics platform from retail (our core market) into healthcare. Run three parallel analyses:\n\nAnalysis A — Market Landscape: Size the healthcare analytics market. Who are the top 5 incumbents? What are the key buying criteria for hospital systems vs. health insurers vs. pharma companies?\n\nAnalysis B — Regulatory & Compliance: What are the critical regulatory requirements (HIPAA, FDA, etc.) that affect analytics products in healthcare? What certifications do we need? What are the compliance risks?\n\nAnalysis C — Buyer Persona Mapping: How do healthcare buyers (CTO, CMIO, VP of Population Health) differ from retail buyers in their evaluation process, decision timeline, and key concerns?\n\n[Prompt 2 — ICL: Positioning Translation]\nHere's our winning positioning in retail: [paste current retail positioning]\nHere are two examples of successful healthcare SaaS positioning statements: [paste examples]\n\nTranslate our retail value proposition into healthcare language. Keep our core differentiators but reframe them for healthcare pain points. The output should feel native to healthcare, not like a retail pitch with medical terms swapped in.\n\n[Prompt 3 — CoT: Go-to-Market Sequencing]\nThink step by step about our market entry sequence:\n1. Which healthcare sub-segment should we enter first and why?\n2. What's the minimum viable product adaptation needed?\n3. What partnerships or certifications are prerequisites vs. nice-to-haves?\n4. What's a realistic timeline from first pilot to first enterprise deal?\n5. What are the top 3 risks and how do we mitigate each?\n\n[Prompt 4 — Self-Criticism: Healthcare Expert Review]\nYou are a healthcare IT consultant with 25 years of experience. Review this market entry strategy: [paste all outputs]. Identify: (1) Naive assumptions from someone who doesn't understand healthcare, (2) Missing regulatory considerations, (3) Unrealistic timeline expectations, (4) Competitive threats we've underestimated. Be blunt — better to hear this now than after we've invested.",
          explanation: "Market expansion requires understanding a completely new domain. This capstone uses Parallel Decomposition to analyze the market from three independent angles, ICL to translate proven positioning into new language, CoT for systematic go-to-market planning, and Self-Criticism from a domain expert to catch blind spots. The key pattern: when entering unfamiliar territory, the adversarial review from a domain expert is the most valuable step.",
        },
      },
      {
        title: "Capstone: Pitch Creation",
        type: "example",
        body: "Scenario: You're building a pitch deck narrative for a Series B fundraise. You need to tell a compelling story that connects your traction, market opportunity, and vision into a narrative that makes investors want to act.",
        promptExample: {
          good: "[Prompt 1 — Decomposition: Narrative Building Blocks]\nI'm building a Series B pitch deck for our AI analytics platform. Here are our key facts:\n• $8M ARR, growing 120% YoY\n• 45 enterprise customers including 3 Fortune 500\n• Net revenue retention: 135%\n• TAM: $15B analytics market\n• Raising $30M at $150M pre-money\n\nDecompose the pitch into 5 narrative building blocks: (1) The Problem — why now?, (2) The Solution — what's unique?, (3) Traction — proof it works, (4) Market — how big can this get?, (5) The Ask — why this amount, why now?\n\nFor each block, identify the single most compelling data point or story to lead with.\n\n[Prompt 2 — Ensembling: Investor Perspectives]\nGenerate three versions of the pitch narrative opening (first 2 slides) from different angles:\nVersion A — Market-First: Lead with the $15B opportunity and why the market is at an inflection point\nVersion B — Traction-First: Lead with the 120% growth and Fortune 500 logos\nVersion C — Problem-First: Lead with a specific customer story that illustrates the pain point\n\n[Prompt 3 — Synthesis + Role Assignment]\nYou are a pitch coach who has helped 50+ companies raise Series B rounds. Review the three narrative openings above and synthesize the strongest approach. Then write the complete narrative arc for all 12 slides: slide title, key message (one sentence), supporting data point, and speaker notes (what the CEO should say).\n\n[Prompt 4 — Adversarial Review: Skeptical VC]\nYou are a partner at a top-tier VC firm who sees 200 pitches a month. You're smart, skeptical, and have seen every trick. Review this pitch narrative: [paste output]. Identify: (1) Where the story loses momentum, (2) Claims that need stronger evidence, (3) The question you'd ask that would make the CEO uncomfortable, (4) What's missing that the best Series B pitches always include. Then suggest specific revisions.",
          explanation: "Pitch creation is fundamentally a storytelling challenge. This capstone uses Decomposition to identify the narrative building blocks, Ensembling to explore different narrative angles (market-first vs. traction-first vs. problem-first), Role Assignment for a pitch coach's expertise, and Adversarial Review from a skeptical VC. The key insight: the best pitches aren't built by writing slides — they're built by finding the right narrative arc first, then fitting slides to the story.",
        },
      },
      {
        title: "Capstone: Technical Content Creation",
        type: "example",
        body: "Scenario: You need to create a technical blog post explaining your platform's new real-time streaming analytics feature. The audience is split: developers who will implement it and product managers who need to understand its business value. The post needs to serve both without alienating either.",
        promptExample: {
          good: "[Prompt 1 — Decomposition: Audience-Split Outline]\nI'm writing a technical blog post about our new real-time streaming analytics feature. Two audiences: (1) developers who will implement it, (2) product managers who need to understand business value.\n\nCreate a post outline that serves both audiences. Use a structure where each section has a 'business value' paragraph (for PMs) and a 'technical deep-dive' subsection (for developers). The PM should be able to read just the main paragraphs and get the full story. The developer should be able to read the technical subsections and get implementation guidance.\n\n[Prompt 2 — ICL: Style Matching]\nHere are two examples of blog posts that successfully served both technical and business audiences: [paste examples]\n\nUsing these as style guides, write the first two sections of the post following the outline from Prompt 1. Match the tone: authoritative but accessible, with concrete examples rather than abstract claims.\n\n[Prompt 3 — Complete Draft]\nContinue writing the remaining sections following the same style and structure. Include: at least one code snippet for developers, at least one customer use case for PMs, and a clear CTA at the end.\n\n[Prompt 4 — Dual-Audience Review]\nReview this post from two perspectives:\nAs a senior developer: Is the technical content accurate and useful? Would you trust this company's engineering based on this post? Is anything oversimplified to the point of being misleading?\nAs a product manager: Can you understand the business value without reading the technical sections? Is the 'so what?' clear? Would you share this with your VP?\nScore each perspective 1-10 and revise to address the lowest-scoring areas.",
          explanation: "This capstone tackles the common challenge of multi-audience content. Decomposition creates a dual-track structure (business + technical). ICL ensures the tone matches proven examples. The dual-audience review (Self-Criticism) checks that neither audience is underserved. The key pattern: instead of writing two separate posts, create one post with two reading paths.",
        },
      },
      {
        title: "Building Your Prompt Library",
        type: "tip",
        body: "The ultimate sign of prompting mastery is building a reusable library of prompt templates for your recurring tasks. Here's a concrete template to get you started:\n\n═══ TEMPLATE: Stakeholder Communication ═══\nRole: You are a [ROLE] with [YEARS] years of experience in [DOMAIN].\nContext: [SITUATION_DESCRIPTION]. Key stakeholders: [STAKEHOLDER_LIST]. Current status: [STATUS].\nTask: Write a [DELIVERABLE_TYPE] that [OBJECTIVE].\nConstraints: [WORD_LIMIT] words. Tone: [TONE]. Must include: [REQUIRED_ELEMENTS]. Must avoid: [EXCLUSIONS].\nFormat: [OUTPUT_FORMAT]. End with [CTA_TYPE].\n════════════════════════════════════════\n\nA good prompt library should include:\n\n• Templates organized by task type: emails, analysis, content creation, strategy, presentations\n• Role cards: Pre-built persona definitions (e.g., 'Senior Financial Analyst,' 'Empathetic Customer Success Manager') that you can plug into any template\n• Critique checklists: Quality criteria for different output types (e.g., 'Proposal Review: check ROI credibility, competitive positioning, CTA clarity')\n• Chain templates: Multi-step workflows for complex deliverables (e.g., the 4-prompt deal strategy chain from the capstone above)\n• Example banks: Curated few-shot examples organized by task type\n\nStart by identifying your 5 most frequent AI tasks and creating optimized templates for each. Version them (v1, v2, v3) as you improve them. Then share with your team — one person's optimization benefits everyone.",
      },
      {
        title: "What's Next: From Practitioner to AI-Native",
        type: "text",
        body: "Congratulations — you've reached L5. You can decompose complex problems, apply the right combination of tenets, build multi-prompt systems, and stress-test your outputs. You're not just using AI; you're thinking with it.\n\nBut mastery isn't a destination. Here are three paths for continued growth:\n\n1. Depth — Domain-Specific Prompt Systems: Build specialized prompt systems for your field. A sales team's prompt library looks completely different from a product team's or a legal team's. The tenets are universal; the applications are domain-specific. Become the person who builds the prompt infrastructure for your organization.\n\n2. Breadth — The Next Frontier: Prompting is the foundation, but the field is expanding rapidly. Retrieval-Augmented Generation (RAG) connects LLMs to your organization's knowledge base. AI Agents use prompts to drive autonomous multi-step workflows. Tool Use lets LLMs call APIs, search the web, and execute code. Each of these builds directly on the prompting skills you've developed here.\n\n3. Teaching — The Ultimate Mastery Test: The best way to solidify your expertise is to teach others. Run a workshop for your team. Create a prompt style guide for your organization. Mentor a colleague through the L0-to-L3 journey. Teaching forces you to articulate the intuitions you've developed, making them more robust and transferable.\n\nThe most important thing: keep practicing. Prompting is a craft, and crafts improve with deliberate practice. Every task you do with AI is an opportunity to apply these tenets, experiment with new patterns, and push the boundaries of what's possible.",
      },
    ],
  },
];

export const exercises: Exercise[] = [
  {
    id: "1.1",
    title: "Few-Shot Email Builder",
    tenetId: 1,
    difficulty: "beginner",
    description: "Transform a zero-shot email prompt into a few-shot prompt by adding 2-3 examples.",
    scenario: "You need to write a professional follow-up email after a client demo. Your current prompt is: 'Write a follow-up email after a product demo.'",
    instructions: [
      "Start with the zero-shot prompt and note the output quality",
      "Find or create 2-3 examples of excellent follow-up emails",
      "Add these examples to your prompt with clear formatting",
      "Compare the few-shot output to the zero-shot output",
      "Document what specifically improved and why",
    ],
    expectedOutcome: "A few-shot prompt that consistently produces follow-up emails matching your desired tone, structure, and level of personalization.",
  },
  {
    id: "1.2",
    title: "Shot Count Optimizer",
    tenetId: 1,
    difficulty: "intermediate",
    description: "Test how the number of examples affects output quality by comparing 0-shot, 1-shot, 3-shot, and 5-shot versions.",
    scenario: "You're creating product descriptions for an e-commerce catalog. Test different shot counts to find the optimal number.",
    instructions: [
      "Write a zero-shot prompt for a product description",
      "Create versions with 1, 3, and 5 examples",
      "Generate outputs from each version",
      "Rate each output on consistency, quality, and relevance (1-10)",
      "Identify the point of diminishing returns",
    ],
    expectedOutcome: "A data-driven understanding of how example count affects output quality, with a recommended shot count for your specific use case.",
  },
  {
    id: "2.1",
    title: "ROI Calculator Coach",
    tenetId: 2,
    difficulty: "intermediate",
    description: "Use Chain-of-Thought prompting to build a transparent ROI calculation with step-by-step reasoning.",
    scenario: "A client asks for the ROI of switching to your analytics platform. The investment is $150K/year, and you need to build a compelling, transparent calculation.",
    instructions: [
      "Write a prompt that asks for step-by-step ROI calculation",
      "Include specific data points: current costs, time savings, efficiency gains",
      "Ask the model to show each calculation step with formulas",
      "Request interpretation of the results in business terms",
      "Add a verification step where the model checks its own math",
    ],
    expectedOutcome: "A transparent, step-by-step ROI analysis that a client can follow and trust, with clear assumptions and verifiable calculations.",
  },
  {
    id: "2.2",
    title: "Decision Justification Generator",
    tenetId: 2,
    difficulty: "intermediate",
    description: "Create a prompt that generates transparent, well-reasoned recommendations with explicit reasoning chains.",
    scenario: "You need to recommend one of three marketing channels for a new product launch. Use CoT to make the reasoning transparent.",
    instructions: [
      "Define the decision criteria (cost, reach, conversion rate, timeline)",
      "Prompt the model to evaluate each option against each criterion",
      "Ask for explicit scoring and weighting of criteria",
      "Request a final recommendation with full reasoning trail",
      "Compare with a non-CoT version to see the difference",
    ],
    expectedOutcome: "A structured recommendation with transparent reasoning that stakeholders can follow, question, and trust.",
  },
  {
    id: "3.1",
    title: "Account Strategy Decomposer",
    tenetId: 3,
    difficulty: "advanced",
    description: "Break a complex account strategy task into 5+ focused sub-prompts using sequential decomposition.",
    scenario: "You need to create a comprehensive account strategy for a new enterprise prospect. Instead of one massive prompt, decompose it.",
    instructions: [
      "Identify the 5-7 components of a complete account strategy",
      "Design a sub-prompt for each component",
      "Determine the optimal sequence (which outputs feed into which inputs)",
      "Execute the chain, passing context between prompts",
      "Synthesize all outputs into a cohesive strategy document",
    ],
    expectedOutcome: "A comprehensive account strategy built from focused, high-quality sub-analyses, demonstrating how decomposition improves depth and coherence.",
  },
  {
    id: "4.1",
    title: "Multi-Perspective Objection Handler",
    tenetId: 4,
    difficulty: "advanced",
    description: "Use ensembling to generate objection responses from multiple expert perspectives, then synthesize the best elements.",
    scenario: "A client objects: 'Your platform is too expensive compared to alternatives.' Generate responses from 3 different expert angles.",
    instructions: [
      "Define 3 expert personas (e.g., value consultant, technical architect, customer success manager)",
      "Generate a response from each persona's perspective",
      "Analyze the strengths and unique insights from each response",
      "Synthesize the strongest elements into a unified response",
      "Compare the synthesized version to any single-perspective response",
    ],
    expectedOutcome: "A nuanced, multi-dimensional objection response that addresses the concern from value, technical, and relationship angles simultaneously.",
  },
  {
    id: "5.1",
    title: "The Critique Loop",
    tenetId: 5,
    difficulty: "intermediate",
    description: "Practice the Generate-Critique-Revise cycle to measurably improve a piece of content.",
    scenario: "Write a one-page executive summary for a quarterly business review. Then systematically improve it through critique cycles.",
    instructions: [
      "Generate v1 of the executive summary with a clear prompt",
      "Critique v1 using 3 specific quality dimensions (clarity, specificity, persuasiveness)",
      "Score v1 on each dimension (1-10) with specific justifications",
      "Revise to create v2, addressing all identified weaknesses",
      "Score v2 on the same dimensions and compare to v1",
    ],
    expectedOutcome: "Measurable improvement from v1 to v2 (target: 20%+ improvement on at least 2 of 3 dimensions), with clear documentation of what changed and why.",
  },
  {
    id: "5.2",
    title: "Red Team Your Proposal",
    tenetId: 5,
    difficulty: "advanced",
    description: "Apply adversarial self-criticism to stress-test a sales proposal from multiple hostile perspectives.",
    scenario: "You've drafted a proposal for a $500K analytics platform deal. Red-team it before sending.",
    instructions: [
      "Generate the initial proposal with best practices",
      "Red-team as the client's procurement team (looking for cost concerns)",
      "Red-team as a competing vendor (looking for weaknesses to exploit)",
      "Red-team as the client's IT security team (looking for risk factors)",
      "Revise the proposal to preemptively address all identified vulnerabilities",
    ],
    expectedOutcome: "A battle-tested proposal that anticipates and addresses objections from procurement, competitors, and security — significantly stronger than the original draft.",
  },
  {
    id: "1.3",
    title: "Domain-Specific Style Transfer",
    tenetId: 1,
    difficulty: "advanced",
    description: "Use few-shot examples to teach the model a highly specific writing style from a domain expert.",
    scenario: "Your company's CEO has a distinctive communication style in internal memos — direct, data-driven, with a signature closing phrase. You need the AI to replicate this style for draft communications.",
    instructions: [
      "Collect 3-4 real examples of the target writing style (anonymize if needed)",
      "Analyze the key stylistic elements: sentence length, vocabulary, structure, tone markers",
      "Create a few-shot prompt that captures these stylistic elements with labeled examples",
      "Test with 3 different topics to verify style consistency",
      "Refine examples if the model drifts from the target style on any topic",
    ],
    expectedOutcome: "A reusable few-shot prompt template that reliably produces content matching the target writing style across different topics and contexts.",
  },
  {
    id: "2.3",
    title: "Assumption Spotter",
    tenetId: 2,
    difficulty: "beginner",
    description: "Use Chain-of-Thought prompting to identify hidden assumptions in business proposals.",
    scenario: "A team member presents a plan to expand into a new market. Use CoT to systematically uncover the unstated assumptions behind the plan.",
    instructions: [
      "Write the market expansion plan as a prompt input (3-4 paragraphs)",
      "Ask the model to identify all explicit claims in the plan",
      "For each claim, ask it to list the unstated assumptions required for the claim to be true",
      "Ask the model to rate each assumption's risk level (low/medium/high)",
      "Request a summary of the top 5 riskiest assumptions with mitigation strategies",
    ],
    expectedOutcome: "A structured analysis revealing 8-12 hidden assumptions, ranked by risk, with actionable mitigation strategies for the top 5.",
  },
  {
    id: "3.2",
    title: "Research Report Builder",
    tenetId: 3,
    difficulty: "intermediate",
    description: "Use parallel decomposition to create a comprehensive research report by tackling independent sections simultaneously.",
    scenario: "You need to create a market research report on the AI productivity tools market. The report needs an executive summary, market size analysis, competitor landscape, trend analysis, and recommendations.",
    instructions: [
      "Map out the report structure and identify which sections are independent",
      "Design a focused sub-prompt for each independent section",
      "Execute the parallel sub-prompts (sections that don't depend on each other)",
      "Use outputs from parallel sections as input for the synthesis sections",
      "Create a final prompt that weaves all sections into a cohesive report with cross-references",
    ],
    expectedOutcome: "A well-structured research report where each section has depth and quality that would be impossible from a single monolithic prompt.",
  },
  {
    id: "3.3",
    title: "Prompt Chain Debugger",
    tenetId: 3,
    difficulty: "advanced",
    description: "Diagnose and fix a broken prompt chain by identifying where context is lost between steps.",
    scenario: "A 4-step prompt chain for generating customer case studies is producing inconsistent results. Step 1 gathers data, Step 2 identifies themes, Step 3 writes the narrative, Step 4 adds quotes and metrics. The final output often contradicts earlier steps.",
    instructions: [
      "Run the existing 4-step chain and save each intermediate output",
      "Compare each step's output to identify where information is lost or contradicted",
      "Identify the specific context that fails to transfer between steps",
      "Redesign the handoff between steps with explicit context summaries",
      "Re-run the improved chain and verify consistency across all steps",
    ],
    expectedOutcome: "A debugged prompt chain with explicit context bridges between steps, producing consistent case studies where the final output aligns with all intermediate outputs.",
  },
  {
    id: "4.2",
    title: "Consensus Builder",
    tenetId: 4,
    difficulty: "intermediate",
    description: "Use majority voting ensembling to improve accuracy on a classification task.",
    scenario: "You need to classify 10 customer support tickets into categories (billing, technical, feature request, complaint, praise). Use ensembling to improve classification accuracy.",
    instructions: [
      "Write 3 different classification prompts with varying approaches (rule-based, example-based, description-based)",
      "Run all 10 tickets through each of the 3 prompt variants",
      "For each ticket, compare the 3 classifications and use majority voting",
      "Identify tickets where all 3 variants disagree — these need human review",
      "Calculate the agreement rate and discuss when ensembling adds the most value",
    ],
    expectedOutcome: "A classification system with higher accuracy than any single prompt, plus a clear escalation path for ambiguous cases where ensemble members disagree.",
  },
  {
    id: "4.3",
    title: "Creative Brief Generator",
    tenetId: 4,
    difficulty: "beginner",
    description: "Generate multiple creative directions for a marketing campaign using different persona-based prompts.",
    scenario: "A client needs a social media campaign for a new sustainable fashion line. Generate 3 distinct creative directions using different expert personas.",
    instructions: [
      "Define 3 creative personas (e.g., minimalist designer, storytelling copywriter, data-driven marketer)",
      "Give each persona the same brief and ask for a campaign concept",
      "Compare the 3 concepts side by side, noting unique strengths",
      "Pick the strongest elements from each and combine into a final brief",
      "Present the final brief alongside the 3 source concepts to show the synthesis",
    ],
    expectedOutcome: "A creative brief that combines the best elements from 3 distinct creative perspectives, resulting in a richer and more well-rounded campaign concept.",
  },
  {
    id: "5.3",
    title: "Fact-Check Pipeline",
    tenetId: 5,
    difficulty: "intermediate",
    description: "Build a self-verification pipeline that catches factual errors and hallucinations in AI-generated content.",
    scenario: "You've used AI to generate a blog post about recent developments in renewable energy. Before publishing, you need to verify all factual claims.",
    instructions: [
      "Generate the initial blog post with a detailed prompt",
      "Ask the model to extract every factual claim from the post as a numbered list",
      "For each claim, ask the model to rate its confidence (high/medium/low) and flag potential hallucinations",
      "For low-confidence claims, ask the model to suggest verifiable sources or alternative phrasings",
      "Revise the post: remove unverifiable claims, add hedging language for medium-confidence claims",
    ],
    expectedOutcome: "A fact-checked blog post with a confidence audit trail, where every claim is either verified, hedged with appropriate language, or removed.",
  },
];

export const proficiencyLevels: ProficiencyLevel[] = [
  {
    level: 0,
    title: "AI Unaware",
    tenetMastery: "None",
    capabilities: [
      "No AI tool usage",
      "Unaware of AI capabilities",
      "Manual processes for all tasks",
    ],
    indicators: [
      "Has not used any AI tools",
      "Cannot describe what an LLM does",
      "No understanding of prompting concepts",
    ],
  },
  {
    level: 1,
    title: "AI Curious",
    tenetMastery: "Basic In-Context Learning",
    capabilities: [
      "Simple queries to AI tools",
      "Copy-paste workflows",
      "Basic understanding of AI capabilities",
      "Can write zero-shot prompts",
    ],
    indicators: [
      "Uses AI for simple tasks (summarization, drafting)",
      "Prompts are vague and unstructured",
      "Accepts first output without iteration",
      "Cannot explain why some prompts work better than others",
    ],
  },
  {
    level: 2,
    title: "AI Assisted",
    tenetMastery: "In-Context Learning + Thought Generation",
    capabilities: [
      "Structured prompts with context and examples",
      "Uses Chain-of-Thought for reasoning tasks",
      "Specifies output format and constraints",
      "Provides few-shot examples for consistency",
    ],
    indicators: [
      "Prompts include role, context, and format specifications",
      "Uses 'think step by step' for analytical tasks",
      "Provides 2-3 examples for formatting tasks",
      "Iterates on prompts when first output is unsatisfactory",
    ],
  },
  {
    level: 3,
    title: "AI Proficient",
    tenetMastery: "ICL + CoT + Decomposition",
    capabilities: [
      "Breaks complex tasks into sub-prompts",
      "Designs sequential and parallel prompt chains",
      "Synthesizes outputs from multiple sub-tasks",
      "Adapts prompting strategy to task complexity",
    ],
    indicators: [
      "Automatically decomposes complex requests",
      "Uses different prompting techniques for different task types",
      "Builds context progressively across prompt chains",
      "Output quality is consistently high across task types",
    ],
  },
  {
    level: 4,
    title: "AI Advanced",
    tenetMastery: "ICL + CoT + Decomposition + Self-Criticism",
    capabilities: [
      "Implements critique loops for quality assurance",
      "Uses adversarial review for high-stakes content",
      "Validates outputs against explicit quality criteria",
      "Measurably improves outputs through iteration",
    ],
    indicators: [
      "Never sends first-draft AI output as final",
      "Uses role-based critique from multiple perspectives",
      "Can demonstrate measurable improvement from v1 to v2",
      "Builds quality checklists for recurring output types",
    ],
  },
  {
    level: 5,
    title: "AI Native",
    tenetMastery: "All 5 Tenets + Ensembling",
    capabilities: [
      "Designs multi-prompt systems and workflows",
      "Uses ensembling for critical decisions",
      "Builds reusable prompt templates and libraries",
      "Teaches and mentors others in prompt engineering",
      "Integrates AI seamlessly into daily workflows",
    ],
    indicators: [
      "Maintains a personal prompt library",
      "Designs prompt chains for team use",
      "Can select and combine tenets strategically for any task",
      "Saves 5+ hours/week through AI-augmented workflows",
      "Actively shares prompting best practices with team",
    ],
  },
];
