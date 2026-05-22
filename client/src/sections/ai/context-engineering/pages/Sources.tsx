import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { sources } from "@/sections/ai/context-engineering/lib/data";
import { useState } from "react";
import { ExternalLink, BookOpen, FlaskConical, Wrench } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

const categoryConfig = {
  framework: { label: "Framework Articles", icon: BookOpen, color: "text-blue-700 bg-blue-50" },
  research: { label: "Research Papers", icon: FlaskConical, color: "text-purple-700 bg-purple-50" },
  technical: { label: "Technical References", icon: Wrench, color: "text-emerald-700 bg-emerald-50" }
};

type Category = "all" | "framework" | "research" | "technical";

export default function Sources() {
  useTitle("Source Catalog — Context Engineering");
  const [filter, setFilter] = useState<Category>("all");

  const filtered = filter === "all" ? sources : sources.filter(s => s.category === filter);

  const frameworkSources = sources.filter(s => s.category === "framework");
  const researchSources = sources.filter(s => s.category === "research");
  const technicalSources = sources.filter(s => s.category === "technical");

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn}>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
            The Library
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Source Catalog
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            28 canonical sources underpinning this volume — framework articles, arXiv research papers, and technical references — fully categorized and annotated with their key contributions.
          </p>
        </div>

        {/* Hero placeholder */}
        <div className="max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden border border-border/60 shadow-sm bg-gradient-to-r from-sienna/5 via-sienna/10 to-sienna/5 h-48 md:h-64 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-sienna/30" />
        </div>

        {/* Filter Tabs */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all" as Category, label: `All (${sources.length})` },
              { key: "framework" as Category, label: `Framework (${frameworkSources.length})` },
              { key: "research" as Category, label: `Research (${researchSources.length})` },
              { key: "technical" as Category, label: `Technical (${technicalSources.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 text-sm font-sans rounded-md transition-colors ${
                  filter === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sources List */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-3">
            {filtered.map((source) => {
              const config = categoryConfig[source.category];
              const Icon = config.icon;
              return (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 border border-border/50 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all duration-200 bg-card group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <span className="text-xs font-mono text-muted-foreground/50 mt-1 shrink-0">
                        [{source.id}]
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground group-hover:text-sienna transition-colors">
                            {source.title}
                          </h3>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {source.author} ({source.year})
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {source.contribution}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-sans font-medium px-2 py-1 rounded shrink-0 flex items-center gap-1 ${config.color}`}>
                      <Icon className="w-3 h-3" />
                      {source.category}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="max-w-5xl mx-auto mt-12 p-6 bg-parchment border border-border/50 rounded-lg">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-sienna font-mono">{frameworkSources.length}</p>
              <p className="text-xs font-sans text-muted-foreground mt-1">Framework Articles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sienna font-mono">{researchSources.length}</p>
              <p className="text-xs font-sans text-muted-foreground mt-1">Research Papers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sienna font-mono">{technicalSources.length}</p>
              <p className="text-xs font-sans text-muted-foreground mt-1">Technical References</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
