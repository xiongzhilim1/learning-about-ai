import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";
import { foundationalConcepts, skillsVsSubAgents } from "@/sections/ai/context-engineering/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

export default function MentalModel() {
  useTitle("Mental Model — Context Engineering");
  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        {/* Header */}
        <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
          Conceptual Framework
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          The Mental Model
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Context engineering is the discipline of assembling, ordering, and budgeting everything the model sees on a single turn. It sits between prompt engineering (one message) and harness engineering (many turns) as the critical middle layer.
        </p>

        {/* Learning Objectives */}
        <div className="p-5 bg-muted/30 border border-border/50 rounded-lg mb-12">
          <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3">After this section, you will be able to:</h4>
          <ul className="space-y-1.5 text-sm text-foreground/80">
            <li>• Define context engineering and distinguish it from prompt engineering and harness engineering</li>
            <li>• Identify the three layers of context (static, dynamic, ephemeral) and their properties</li>
            <li>• Explain the seven foundational phenomena that constrain context systems</li>
            <li>• Articulate the relationship between approaches (architectural choices) and tenets (operating principles)</li>
            <li>• Decide when to use Skills vs. Sub-agents for a given sub-task</li>
          </ul>
        </div>

        {/* Hero placeholder */}
        <div className="mb-16 rounded-lg overflow-hidden border border-border/60 shadow-sm bg-gradient-to-r from-sienna/5 via-sienna/10 to-sienna/5 h-48 md:h-64 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-sienna/30" />
        </div>

        {/* Core Definition */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            What Is Context Engineering?
          </h2>
          <div className="p-4 bg-muted/20 border border-border/40 rounded-lg mb-8">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">What It Is NOT</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Context engineering is distinct from <strong>fine-tuning</strong> (changing model weights), <strong>RLHF/Constitutional AI</strong> (alignment training), <strong>prompt engineering</strong> (crafting a single message), and <strong>RAG</strong> (which is one approach <em>within</em> context engineering, not the whole discipline). Context engineering is the meta-discipline of assembling, ordering, and budgeting the complete token payload the model receives on each turn.
            </p>
          </div>
          <blockquote className="border-l-4 border-primary/40 pl-6 py-3 my-8 bg-muted/30 rounded-r-md">
            <p className="text-foreground/80 italic text-lg leading-relaxed">
              "Context engineering is building dynamic systems to provide the right information and tools in the right format such that the LLM can plausibly accomplish the task."
            </p>
            <cite className="block mt-2 text-sm font-sans text-muted-foreground not-italic">
              — Harrison Chase, LangChain (2025)
            </cite>
          </blockquote>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The term "context" refers to the complete set of tokens included when sampling from a large language model. The engineering problem is optimizing the utility of those tokens against the inherent constraints of LLMs in order to consistently achieve a desired outcome. Unlike the discrete task of writing a prompt, context engineering is iterative — the curation happens each time we decide what to pass to the model.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Modern agents operate in agentic loops (Reason → Act → Observe), averaging ~50 tool calls per task. Each cycle is a context engineering decision. The context window is not set once — it is re-engineered on every single turn.
          </p>
        </section>

        {/* The Three Layers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            The Three Layers of Context
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Every context window is composed of three distinct layers, each with different lifecycles, caching properties, and management strategies:
          </p>
          <div className="space-y-4">
            <div className="p-6 border-l-4 border-blue-500 bg-blue-50/30 rounded-r-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-900" style={{ fontFamily: "'Fraunces', serif" }}>
                Static Layer — Always Present, Cached
              </h3>
              <p className="text-sm text-blue-900/70 leading-relaxed mb-2">
                System prompt, persona, rules (CLAUDE.md), tool definitions, and identity. This layer is stable across turns and benefits from KV-cache (10x cheaper when cached). Changes here invalidate the entire cache.
              </p>
              <p className="text-xs font-mono text-blue-700/60">
                Lifecycle: Session-level · Cache: Full prefix caching · Budget: ~2000 tokens ideal
              </p>
            </div>
            <div className="p-6 border-l-4 border-amber-500 bg-amber-50/30 rounded-r-lg">
              <h3 className="font-semibold text-lg mb-2 text-amber-900" style={{ fontFamily: "'Fraunces', serif" }}>
                Dynamic Layer — Changes Per Turn, Managed
              </h3>
              <p className="text-sm text-amber-900/70 leading-relaxed mb-2">
                Retrieved context (RAG results), compacted conversation history, working memory (scratchpad, todo), and current task state. This layer requires active management: compaction, eviction, and editorial selection.
              </p>
              <p className="text-xs font-mono text-amber-700/60">
                Lifecycle: Turn-level · Cache: Partial (append-only helps) · Budget: 40-60% of window
              </p>
            </div>
            <div className="p-6 border-l-4 border-green-500 bg-green-50/30 rounded-r-lg">
              <h3 className="font-semibold text-lg mb-2 text-green-900" style={{ fontFamily: "'Fraunces', serif" }}>
                Ephemeral Layer — This Turn Only, Disposable
              </h3>
              <p className="text-sm text-green-900/70 leading-relaxed mb-2">
                The user's current message, fresh tool results (just returned), and observations from the environment. This layer is processed once and then either promoted to the dynamic layer (if valuable) or discarded.
              </p>
              <p className="text-xs font-mono text-green-700/60">
                Lifecycle: Single turn · Cache: None · Budget: Whatever remains after static + dynamic
              </p>
            </div>
          </div>
        </section>

        {/* Foundational Concepts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
            The Physics of Context
          </h2>
          <p className="text-muted-foreground mb-8">
            Seven foundational phenomena that make context engineering necessary. These are the "gravity" of the discipline — ignore them and your system will fail.
          </p>
          <div className="space-y-4">
            {foundationalConcepts.map((concept) => (
              <div key={concept.id} className="p-5 border border-border/60 rounded-lg bg-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                      {concept.title}
                    </h3>
                    <p className="text-sm font-medium text-sienna mb-2">{concept.oneLiner}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {concept.explanation}
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      <span className="font-semibold">Implication:</span> {concept.implication}
                    </p>
                    <p className="text-xs font-sans text-muted-foreground/60 mt-2">Source: {concept.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Approaches ↔ Tenets Relationship */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
            How Approaches and Tenets Relate
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            A common confusion: are approaches and tenets competing frameworks? No. They operate at different levels of abstraction:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 border border-border/60 rounded-lg bg-card">
              <h4 className="font-semibold text-sienna mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Approaches = Architecture</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The six approaches are <strong>architectural choices</strong> — they determine HOW you retrieve, structure, and deliver information to the model. You choose an approach (or combine several) based on your data characteristics, latency requirements, and cost constraints.
              </p>
            </div>
            <div className="p-5 border border-border/60 rounded-lg bg-card">
              <h4 className="font-semibold text-sienna mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Tenets = Operating Principles</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The twelve tenets are <strong>operating principles</strong> that apply ACROSS approaches. They guide HOW you implement whichever approach you choose. Every approach benefits from attention geography, token economics, and compaction — but each approach has 2-3 tenets that are especially critical.
              </p>
            </div>
          </div>
          <div className="p-5 bg-parchment border border-border/50 rounded-lg">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong>Analogy:</strong> Approaches are like choosing between a car, train, or airplane (architectural decision). Tenets are like the rules of physics that apply to ALL vehicles — gravity, friction, aerodynamics. You can't ignore the tenets regardless of which approach you choose. But a car cares more about friction (retrieval quality) while an airplane cares more about fuel efficiency (token economics).
            </p>
          </div>
        </section>

        {/* Skills vs Sub-Agents */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
            {skillsVsSubAgents.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {skillsVsSubAgents.description}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 font-sans font-semibold text-muted-foreground uppercase tracking-wider text-xs">Dimension</th>
                  <th className="text-left py-3 px-4 font-sans font-semibold text-muted-foreground uppercase tracking-wider text-xs">Skill (In-Context)</th>
                  <th className="text-left py-3 px-4 font-sans font-semibold text-muted-foreground uppercase tracking-wider text-xs">Sub-Agent (Separate Call)</th>
                </tr>
              </thead>
              <tbody>
                {skillsVsSubAgents.comparison.map((row) => (
                  <tr key={row.dimension} className="border-b border-border/50">
                    <td className="py-3 px-4 font-semibold">{row.dimension}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.skill}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.subAgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Progression */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            The Progression: From Prompt to Harness
          </h2>
          <div className="space-y-4">
            {[
              { vol: "Vol. 1", title: "Prompt Engineering", desc: "How to talk to the model in one message. The unit of work is a single prompt. Mental model: output = f(prompt). Identity: Communicator.", active: false },
              { vol: "Vol. 2", title: "Context Engineering", desc: "How to assemble, order, and budget everything the model sees on a single turn. The unit of work is one complete context window. Mental model: output = f(context_window). Identity: Information Architect.", active: true },
              { vol: "Vol. 3", title: "Harness Engineering", desc: "How to run the model as a system over time — managing loops, branches, error recovery, and state across many turns. Mental model: agent = LLM + harness. Identity: Systems Engineer.", active: false }
            ].map((vol) => (
              <div key={vol.vol} className={`p-6 rounded-lg border ${vol.active ? "border-primary/40 bg-primary/5 shadow-sm" : "border-border/50 bg-card"}`}>
                <div className="flex items-start gap-4">
                  <span className={`text-xs font-sans font-bold uppercase tracking-wider px-2 py-1 rounded ${vol.active ? "bg-primary/10 text-sienna" : "bg-muted text-muted-foreground"}`}>
                    {vol.vol}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: "'Fraunces', serif" }}>{vol.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{vol.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Insight */}
        <section className="mb-16">
          <blockquote className="border-l-4 border-primary/40 pl-6 py-3 bg-muted/30 rounded-r-md">
            <p className="text-foreground/80 italic text-lg leading-relaxed">
              "The phrase '1M context' on a model card is a capacity statement; it is not a quality statement. Effective context is dramatically shorter than the advertised window."
            </p>
          </blockquote>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 pt-8 border-t border-border/40">
          <Link href="/approaches">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
              Explore the Six Approaches <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link href="/tenets">
            <span className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-sans text-sm font-medium rounded-md hover:bg-muted/50 transition-colors">
              Read the 12 Tenets <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
