import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, X, Link as LinkIcon, Map } from "lucide-react";
import { approaches, tenets } from "@/sections/ai/context-engineering/lib/data";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

const efficiencyColor: Record<string, string> = {
  "Low": "text-red-700 bg-red-50",
  "Medium": "text-amber-700 bg-amber-50",
  "Medium-High": "text-emerald-700 bg-emerald-50",
  "High": "text-green-700 bg-green-50"
};

export default function Approaches() {
  useTitle("The Six Approaches — Context Engineering");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn}>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
            Architectural Strategies
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            The Six Approaches
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Six distinct architectural strategies for feeding the context window. Each answers: <em>"How do you structure the system that assembles what the model sees?"</em> They are not mutually exclusive — production systems often combine two or three.
          </p>
        </div>

        {/* Map placeholder */}
        <div className="max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden border border-border/60 shadow-sm bg-gradient-to-r from-sienna/5 via-sienna/10 to-sienna/5 h-48 md:h-64 flex items-center justify-center">
          <Map className="w-16 h-16 text-sienna/30" />
        </div>

        {/* Comparison Matrix */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Comparison Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-2 font-sans font-semibold text-muted-foreground uppercase tracking-wider">Approach</th>
                  <th className="text-center py-3 px-2 font-sans font-semibold text-muted-foreground uppercase tracking-wider">Token Eff.</th>
                  <th className="text-center py-3 px-2 font-sans font-semibold text-muted-foreground uppercase tracking-wider">Latency</th>
                  <th className="text-center py-3 px-2 font-sans font-semibold text-muted-foreground uppercase tracking-wider">Complexity</th>
                  <th className="text-center py-3 px-2 font-sans font-semibold text-muted-foreground uppercase tracking-wider">Corpus Size</th>
                  <th className="text-center py-3 px-2 font-sans font-semibold text-muted-foreground uppercase tracking-wider">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Brute-Force Long Context", eff: "Low", latency: "High", complexity: "Low", corpus: "< 200K", best: "One-off deep analysis" },
                  { name: "Rules / Markdown FS", eff: "Medium-High", latency: "Low", complexity: "Low", corpus: "< 50K", best: "Agent behavior control" },
                  { name: "Classic RAG", eff: "High", latency: "Low", complexity: "Medium", corpus: "Unlimited", best: "Factual QA at scale" },
                  { name: "Knowledge Graphs", eff: "High", latency: "Medium", complexity: "High", corpus: "> 1M", best: "Global sensemaking" },
                  { name: "Modular RAG / Swarms", eff: "High", latency: "High", complexity: "Very High", corpus: "Unlimited", best: "Complex multi-step tasks" },
                  { name: "Cognitive Architecture", eff: "High", latency: "Medium", complexity: "Very High", corpus: "Unlimited", best: "Long-horizon agents" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-semibold text-sm">{row.name}</td>
                    <td className="py-3 px-2 text-center"><span className={`font-medium px-1.5 py-0.5 rounded ${efficiencyColor[row.eff]}`}>{row.eff}</span></td>
                    <td className="py-3 px-2 text-center text-muted-foreground">{row.latency}</td>
                    <td className="py-3 px-2 text-center text-muted-foreground">{row.complexity}</td>
                    <td className="py-3 px-2 text-center font-mono text-muted-foreground">{row.corpus}</td>
                    <td className="py-3 px-2 text-muted-foreground">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cards */}
        <div className="max-w-5xl mx-auto space-y-4">
          {approaches.map((approach) => {
            const isExpanded = expanded === approach.id;
            const linkedTenets = tenets.filter(t => approach.mostCriticalTenets.includes(t.id));

            return (
              <div
                key={approach.id}
                className={`border rounded-lg transition-all duration-200 ${
                  isExpanded ? "border-primary/40 shadow-md bg-card" : "border-border/50 bg-card hover:border-border"
                }`}
              >
                {/* Card Header */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : approach.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-mono font-bold text-sienna/60 mt-0.5">
                      {String(approach.number).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                        {approach.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">{approach.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-sans font-medium px-2 py-1 rounded ${efficiencyColor[approach.tokenEfficiency]}`}>
                      {approach.tokenEfficiency}
                    </span>
                    <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-border/40 pt-6 space-y-6">
                      {/* Philosophy */}
                      <blockquote className="border-l-4 border-sienna/40 pl-4 py-2 text-sm italic text-foreground/70">
                        {approach.philosophy}
                      </blockquote>

                      {/* Description */}
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {approach.description}
                      </p>

                      {/* Strengths & Limitations */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-green-700 mb-3">Strengths</h4>
                          <ul className="space-y-2">
                            {approach.strengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-red-700 mb-3">Limitations</h4>
                          <ul className="space-y-2">
                            {approach.limitations.map((l, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <span>{l}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* When Works / When Fails */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50/50 border border-green-200/50 rounded-md">
                          <h4 className="text-xs font-sans font-semibold uppercase text-green-800 mb-2">When It Works</h4>
                          <p className="text-sm text-green-900/70 leading-relaxed">{approach.whenWorks}</p>
                        </div>
                        <div className="p-4 bg-red-50/50 border border-red-200/50 rounded-md">
                          <h4 className="text-xs font-sans font-semibold uppercase text-red-800 mb-2">When It Fails</h4>
                          <p className="text-sm text-red-900/70 leading-relaxed">{approach.whenFails}</p>
                        </div>
                      </div>

                      {/* Key Techniques */}
                      <div>
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Techniques</h4>
                        <div className="flex flex-wrap gap-2">
                          {approach.keyTechniques.map((tech) => (
                            <span key={tech} className="text-xs font-mono px-2 py-1 bg-muted rounded-md text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Linked Tenets */}
                      <div>
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" /> Most Critical Tenets
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {linkedTenets.map((tenet) => (
                            <Link key={tenet.id} href="/tenets">
                              <span className="text-xs font-sans px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-md text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                                #{tenet.number} {tenet.title.length > 40 ? tenet.title.substring(0, 40) + "..." : tenet.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Key Papers */}
                      <div>
                        <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Papers</h4>
                        <ul className="space-y-1">
                          {approach.keyPapers.map((p, i) => (
                            <li key={i} className="text-xs text-muted-foreground font-mono">• {p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Relationship Explanation */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-parchment border border-border/50 rounded-lg">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            How Approaches Relate to Tenets
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            <strong>Approaches</strong> answer <em>"What architecture do I choose?"</em> — they are the structural decision about how your system feeds the context window.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            <strong>Tenets</strong> answer <em>"How do I operate well regardless of architecture?"</em> — they are universal operating principles that apply across all approaches.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Every tenet applies to every approach, but with different emphasis. A brute-force system must worry most about attention geography; a multi-agent system must worry most about isolation. The tenet linkages above indicate where each principle is most critical.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <Link href="/tenets">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
              Read the 12 Canonical Tenets <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
