import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { practitionerChecklist } from "@/sections/ai/context-engineering/lib/data";
import { useState } from "react";
import { CheckSquare, Square, Printer } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

export default function Checklist() {
  useTitle("Checklist — Context Engineering");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const totalItems = practitionerChecklist.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = checked.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn}>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
            Pre-Flight Check
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Practitioner's Checklist
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            A comprehensive pre-deployment checklist synthesizing all 12 tenets into actionable verification steps. Use this before launching any context-engineered system.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-sans text-muted-foreground">
              {checkedCount} of {totalItems} items checked
            </span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {practitionerChecklist.map((section, sectionIdx) => {
            const sectionChecked = section.items.filter((_, i) => checked.has(`${sectionIdx}-${i}`)).length;
            const sectionComplete = sectionChecked === section.items.length;

            return (
              <div
                key={section.title}
                className={`border rounded-lg p-6 transition-all duration-200 ${
                  sectionComplete ? "border-green-300 bg-green-50/30" : "border-border/50 bg-card"
                }`}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                    {section.title}
                  </h2>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    sectionComplete ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}>
                    {sectionChecked}/{section.items.length}
                  </span>
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => {
                    const key = `${sectionIdx}-${itemIdx}`;
                    const isChecked = checked.has(key);

                    return (
                      <li key={key}>
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full text-left flex items-start gap-3 group"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-5 h-5 text-muted-foreground/50 group-hover:text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm leading-relaxed transition-colors ${
                            isChecked ? "text-muted-foreground line-through" : "text-foreground/80 group-hover:text-foreground"
                          }`}>
                            {item}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-parchment border border-border/50 rounded-lg">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            How to Use This Checklist
          </h3>
          <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <p>
              <strong>Before deployment:</strong> Walk through every section. Items you cannot check indicate gaps in your context engineering that will manifest as production failures.
            </p>
            <p>
              <strong>During development:</strong> Use the Architecture Selection section first to validate your approach choice. Then use the layer-specific sections as you build each component.
            </p>
            <p>
              <strong>During incidents:</strong> When an agent misbehaves, use this checklist as a diagnostic tool. Most failures trace back to a violated tenet — the checklist helps you identify which one.
            </p>
            <p>
              <strong>For team alignment:</strong> Print this checklist and use it in design reviews. It provides a shared vocabulary for discussing context engineering decisions.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
