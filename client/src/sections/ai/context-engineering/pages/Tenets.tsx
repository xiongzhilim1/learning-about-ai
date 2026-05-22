import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { tenets } from "@/sections/ai/context-engineering/lib/data";
import { useState } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

export default function Tenets() {
  useTitle("Canonical Tenets — Context Engineering");
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn}>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
            Operating Principles
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            The 12 Canonical Tenets
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
            Universal operating principles that apply across all six approaches. Each tenet survived three tests: the "So What?" test (is it actionable?), the "Monday Morning" test (can I use it today?), and the "Universal" test (does it apply to all architectures?).
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Each tenet includes: the key question to ask yourself, the canonical trigger phrase from the source literature, a naive-vs-engineered comparison, and a concrete failure story demonstrating the cost of ignoring it.
          </p>

          {/* Learning Objectives */}
          <div className="p-5 bg-muted/30 border border-border/50 rounded-lg mt-6">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3">After this section, you will be able to:</h4>
            <ul className="space-y-1.5 text-sm text-foreground/80">
              <li>• Apply the key question from each tenet as a design review checklist</li>
              <li>• Distinguish naive from engineered approaches for any context decision</li>
              <li>• Identify which 2-3 tenets are most critical for your chosen architecture</li>
              <li>• Recognize common anti-patterns before they cause production failures</li>
            </ul>
          </div>
        </div>

        {/* Tenets List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {tenets.map((tenet) => {
            const isExpanded = expanded === tenet.number;

            return (
              <div
                key={tenet.id}
                className={`border rounded-lg transition-all duration-200 ${
                  isExpanded ? "border-primary/40 shadow-md bg-card" : "border-border/50 bg-card hover:border-border"
                }`}
              >
                {/* Tenet Header */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : tenet.number)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-lg font-mono font-bold text-sienna/70 mt-0.5 shrink-0 w-8">
                      {String(tenet.number).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base md:text-lg font-bold leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                        {tenet.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 italic">
                        Key question: {tenet.keyQuestion}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-0">
                    <div className="border-t border-border/40 pt-5 ml-12 space-y-5">
                      {/* Trigger Phrase */}
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-md border border-border/30">
                        <Quote className="w-4 h-4 text-sienna shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm italic text-foreground/80 leading-relaxed">
                            "{tenet.triggerPhrase}"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">— {tenet.triggerSource}</p>
                        </div>
                      </div>

                      {/* Naive vs Engineered */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50/40 border border-red-200/40 rounded-md">
                          <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-red-700 mb-3">
                            Naive Approach
                          </h4>
                          <ul className="space-y-2">
                            {tenet.naive.map((item, i) => (
                              <li key={i} className="text-sm text-red-900/70 flex items-start gap-2">
                                <span className="text-red-500 shrink-0">✗</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50/40 border border-green-200/40 rounded-md">
                          <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-green-700 mb-3">
                            Engineered Approach
                          </h4>
                          <ul className="space-y-2">
                            {tenet.engineered.map((item, i) => (
                              <li key={i} className="text-sm text-green-900/70 flex items-start gap-2">
                                <span className="text-green-600 shrink-0">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Failure Story */}
                      <div className="p-4 bg-amber-50/40 border border-amber-200/40 rounded-md">
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-amber-700 mb-2">
                          Failure Story
                        </h4>
                        <p className="text-sm text-amber-900/80 leading-relaxed">
                          {tenet.failureStory}
                        </p>
                      </div>

                      {/* Cross-Validation & Applies To */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <div>
                          <span className="text-xs font-sans text-muted-foreground">Cross-validated by: </span>
                          {tenet.crossValidation.map((source, i) => (
                            <span key={i} className="text-xs font-mono text-primary/80 ml-1">
                              {source}{i < tenet.crossValidation.length - 1 ? "," : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {tenet.appliesTo}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Common Anti-Patterns */}
        <div className="max-w-4xl mx-auto mt-12 mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            The 7 Deadly Anti-Patterns
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            These are the most common mistakes teams make when building context systems. Each violates one or more tenets.
          </p>
          <div className="space-y-3">
            {[
              { name: "The Kitchen Sink", desc: "Dumping everything into the prompt hoping the model figures it out. Violates Tenets #1, #3, #5.", symptom: "Model ignores instructions, hallucinates, or gives generic responses." },
              { name: "The Timestamp Trap", desc: "Placing dynamic values (timestamps, counters) at the start of the system prompt, invalidating KV-cache every call. Violates Tenet #2.", symptom: "10x higher costs, 3x latency, no cache hits in production metrics." },
              { name: "The Amnesia Loop", desc: "Removing failed actions from history to 'clean up' context, causing the agent to retry the same failed approach. Violates Tenet #7.", symptom: "Agent enters infinite retry loops, hitting rate limits." },
              { name: "The Instruction Avalanche", desc: "Stuffing 300+ rules into a single file, causing uniform instruction-following decay. Violates Tenet #4.", symptom: "Agent ignores ALL instructions uniformly, not just the newest ones." },
              { name: "The Context Cliff", desc: "Letting context grow until it hits the limit, then truncating blindly. Violates Tenet #5.", symptom: "Sudden quality collapse, lost decisions, repeated work after compaction." },
              { name: "The Shared Context Swamp", desc: "Running all sub-tasks in the same context window, causing cross-contamination. Violates Tenet #12.", symptom: "Model confuses entities, attributes data from task A to task B." },
              { name: "The Middle Burial", desc: "Placing critical instructions in the middle of a long prompt where attention is weakest. Violates Tenet #8.", symptom: "Agent drifts from objective after 20+ tool calls, starts doing unrelated work." }
            ].map((pattern) => (
              <div key={pattern.name} className="p-4 border border-red-200/40 bg-red-50/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg shrink-0">✘</span>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{pattern.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pattern.desc}</p>
                    <p className="text-xs text-red-700/70 mt-1 italic">Symptom: {pattern.symptom}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-parchment border border-border/50 rounded-lg">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Why 12 Tenets?
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            These 12 tenets emerged from zero-base analysis of 7 canonical framework articles and 20+ research papers. Each survived three tests:
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-sienna font-bold">1.</span>
              <span><strong>The "So What?" Test:</strong> Is it actionable? Does it change what you do on Monday morning?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sienna font-bold">2.</span>
              <span><strong>The "Universal" Test:</strong> Does it apply across ALL six approaches, not just one?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sienna font-bold">3.</span>
              <span><strong>The "Cross-Validation" Test:</strong> Is it independently confirmed by at least 2-3 separate sources?</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
