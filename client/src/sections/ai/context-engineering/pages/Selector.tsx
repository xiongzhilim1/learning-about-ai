import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }
};

interface Question {
  id: string;
  question: string;
  context: string;
  options: { label: string; value: string; scores: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: "corpus-size",
    question: "How large is your total knowledge corpus?",
    context: "The size of data the system must reason over determines whether brute-force approaches are viable.",
    options: [
      { label: "Small (< 50K tokens — fits in one window)", value: "small", scores: { "brute-force": 3, "rules-engineering": 2, "classic-rag": 0, "knowledge-graphs": 0, "modular-rag": 0, "cognitive-architecture": 0 } },
      { label: "Medium (50K–500K tokens)", value: "medium", scores: { "brute-force": 1, "rules-engineering": 1, "classic-rag": 3, "knowledge-graphs": 2, "modular-rag": 1, "cognitive-architecture": 1 } },
      { label: "Large (500K–10M tokens)", value: "large", scores: { "brute-force": 0, "rules-engineering": 0, "classic-rag": 3, "knowledge-graphs": 3, "modular-rag": 2, "cognitive-architecture": 2 } },
      { label: "Massive (> 10M tokens or unbounded)", value: "massive", scores: { "brute-force": 0, "rules-engineering": 0, "classic-rag": 2, "knowledge-graphs": 3, "modular-rag": 3, "cognitive-architecture": 3 } }
    ]
  },
  {
    id: "update-frequency",
    question: "How frequently does your data change?",
    context: "Static data favors indexing-heavy approaches; dynamic data favors lightweight retrieval or rules.",
    options: [
      { label: "Static (rarely or never changes)", value: "static", scores: { "brute-force": 2, "rules-engineering": 1, "classic-rag": 2, "knowledge-graphs": 3, "modular-rag": 1, "cognitive-architecture": 1 } },
      { label: "Periodic (daily/weekly updates)", value: "periodic", scores: { "brute-force": 1, "rules-engineering": 2, "classic-rag": 3, "knowledge-graphs": 2, "modular-rag": 2, "cognitive-architecture": 2 } },
      { label: "Real-time (continuous changes)", value: "realtime", scores: { "brute-force": 0, "rules-engineering": 3, "classic-rag": 2, "knowledge-graphs": 0, "modular-rag": 3, "cognitive-architecture": 3 } }
    ]
  },
  {
    id: "query-type",
    question: "What type of reasoning does your task require?",
    context: "Simple lookups favor RAG; global sensemaking favors graphs; multi-step tasks favor agents.",
    options: [
      { label: "Factual lookup (find specific answers)", value: "factual", scores: { "brute-force": 1, "rules-engineering": 0, "classic-rag": 3, "knowledge-graphs": 1, "modular-rag": 0, "cognitive-architecture": 0 } },
      { label: "Cross-document synthesis (connect themes)", value: "synthesis", scores: { "brute-force": 2, "rules-engineering": 0, "classic-rag": 1, "knowledge-graphs": 3, "modular-rag": 2, "cognitive-architecture": 1 } },
      { label: "Multi-step reasoning (plan → execute → verify)", value: "multistep", scores: { "brute-force": 0, "rules-engineering": 2, "classic-rag": 1, "knowledge-graphs": 1, "modular-rag": 3, "cognitive-architecture": 3 } },
      { label: "Code generation / structured output", value: "code", scores: { "brute-force": 1, "rules-engineering": 3, "classic-rag": 1, "knowledge-graphs": 0, "modular-rag": 2, "cognitive-architecture": 2 } }
    ]
  },
  {
    id: "latency",
    question: "What is your latency tolerance?",
    context: "Sub-second responses require pre-computed retrieval; multi-minute tasks can afford agent orchestration.",
    options: [
      { label: "Sub-second (real-time chat, autocomplete)", value: "subsecond", scores: { "brute-force": 0, "rules-engineering": 3, "classic-rag": 3, "knowledge-graphs": 1, "modular-rag": 0, "cognitive-architecture": 0 } },
      { label: "Seconds (interactive assistant, 2-10s)", value: "seconds", scores: { "brute-force": 2, "rules-engineering": 2, "classic-rag": 3, "knowledge-graphs": 2, "modular-rag": 1, "cognitive-architecture": 1 } },
      { label: "Minutes (background task, research agent)", value: "minutes", scores: { "brute-force": 2, "rules-engineering": 1, "classic-rag": 2, "knowledge-graphs": 3, "modular-rag": 3, "cognitive-architecture": 3 } }
    ]
  },
  {
    id: "cost-sensitivity",
    question: "How cost-sensitive is your deployment?",
    context: "High-volume production workloads demand token efficiency; one-off analyses can afford brute-force.",
    options: [
      { label: "Very sensitive (high volume, tight margins)", value: "very", scores: { "brute-force": 0, "rules-engineering": 2, "classic-rag": 3, "knowledge-graphs": 1, "modular-rag": 1, "cognitive-architecture": 2 } },
      { label: "Moderate (balanced cost/quality)", value: "moderate", scores: { "brute-force": 1, "rules-engineering": 2, "classic-rag": 3, "knowledge-graphs": 2, "modular-rag": 2, "cognitive-architecture": 2 } },
      { label: "Low sensitivity (quality-first, one-off tasks)", value: "low", scores: { "brute-force": 3, "rules-engineering": 1, "classic-rag": 1, "knowledge-graphs": 2, "modular-rag": 3, "cognitive-architecture": 2 } }
    ]
  },
  {
    id: "session-length",
    question: "How long are your agent sessions?",
    context: "Short sessions can fit in one window; long sessions require memory management and compaction.",
    options: [
      { label: "Single turn (one question, one answer)", value: "single", scores: { "brute-force": 3, "rules-engineering": 1, "classic-rag": 3, "knowledge-graphs": 2, "modular-rag": 0, "cognitive-architecture": 0 } },
      { label: "Multi-turn (5-20 exchanges)", value: "multi", scores: { "brute-force": 1, "rules-engineering": 3, "classic-rag": 2, "knowledge-graphs": 2, "modular-rag": 2, "cognitive-architecture": 2 } },
      { label: "Long-horizon (50+ turns, hours/days)", value: "long", scores: { "brute-force": 0, "rules-engineering": 2, "classic-rag": 1, "knowledge-graphs": 1, "modular-rag": 2, "cognitive-architecture": 3 } }
    ]
  }
];

const approachMeta: Record<string, { title: string; color: string; description: string }> = {
  "brute-force": { title: "Brute-Force Long Context", color: "bg-red-50 border-red-200 text-red-800", description: "Feed everything in, let attention sort it out. Best for small corpora and one-off deep analysis." },
  "rules-engineering": { title: "Rules Engineering / Markdown Filesystem", color: "bg-blue-50 border-blue-200 text-blue-800", description: "Structure as navigable, version-controlled documents with progressive disclosure." },
  "classic-rag": { title: "Classic RAG", color: "bg-green-50 border-green-200 text-green-800", description: "Retrieve relevant chunks on demand. The workhorse of production knowledge systems." },
  "knowledge-graphs": { title: "Knowledge Graphs / GraphRAG", color: "bg-purple-50 border-purple-200 text-purple-800", description: "Model relationships explicitly. Best for global sensemaking and multi-hop reasoning." },
  "modular-rag": { title: "Modular RAG / Multi-Agent Swarms", color: "bg-amber-50 border-amber-200 text-amber-800", description: "Decompose, orchestrate, and isolate. Best for complex multi-step tasks." },
  "cognitive-architecture": { title: "Cognitive Architecture / Memory Palace", color: "bg-teal-50 border-teal-200 text-teal-800", description: "Tiered memory with active self-management. Best for long-horizon persistent agents." }
};

export default function Selector() {
  useTitle("Approach Selector — Context Engineering");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    "brute-force": 0, "rules-engineering": 0, "classic-rag": 0,
    "knowledge-graphs": 0, "modular-rag": 0, "cognitive-architecture": 0
  });

  const isComplete = currentStep >= questions.length;
  const currentQuestion = questions[currentStep];

  const handleAnswer = (optionValue: string, optionScores: Record<string, number>) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionValue }));
    setScores(prev => {
      const next = { ...prev };
      Object.entries(optionScores).forEach(([key, val]) => {
        next[key] = (next[key] || 0) + val;
      });
      return next;
    });
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    const prevQuestion = questions[currentStep - 1];
    const prevAnswer = answers[prevQuestion.id];
    const prevOption = prevQuestion.options.find(o => o.value === prevAnswer);
    if (prevOption) {
      setScores(prev => {
        const next = { ...prev };
        Object.entries(prevOption.scores).forEach(([key, val]) => {
          next[key] = (next[key] || 0) - val;
        });
        return next;
      });
    }
    setAnswers(prev => {
      const next = { ...prev };
      delete next[prevQuestion.id];
      return next;
    });
    setCurrentStep(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setScores({ "brute-force": 0, "rules-engineering": 0, "classic-rag": 0, "knowledge-graphs": 0, "modular-rag": 0, "cognitive-architecture": 0 });
  };

  const sortedResults = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key, score]) => ({ key, score, ...approachMeta[key] }));

  const maxScore = sortedResults[0]?.score || 1;

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-3xl mx-auto">
        {/* Header */}
        <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
          Decision Tool
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          Approach Selector
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl">
          Answer 6 questions about your constraints and requirements. The selector will recommend which of the six approaches best fits your use case.
        </p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-sans text-muted-foreground">
              {isComplete ? "Complete" : `Question ${currentStep + 1} of ${questions.length}`}
            </span>
            {currentStep > 0 && (
              <button onClick={handleReset} className="text-xs font-sans text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question or Results */}
        {!isComplete ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                {currentQuestion.question}
              </h2>
              <p className="text-sm text-muted-foreground">{currentQuestion.context}</p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value, option.scores)}
                  className="w-full text-left p-4 border border-border/60 rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 group"
                >
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Previous question
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                Your Recommended Approaches
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {sortedResults.map((result, idx) => (
                <div
                  key={result.key}
                  className={`p-4 border rounded-lg ${idx === 0 ? result.color + " border-2" : "border-border/50 bg-card"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {idx === 0 && <span className="text-xs font-sans font-bold uppercase tracking-wider text-sienna">Recommended</span>}
                      <h3 className={`font-semibold ${idx === 0 ? "text-base" : "text-sm"}`} style={{ fontFamily: "'Fraunces', serif" }}>
                        {result.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {result.score}/{questions.length * 3}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-primary/60 rounded-full transition-all duration-500"
                      style={{ width: `${(result.score / maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{result.description}</p>
                </div>
              ))}
            </div>

            {/* Advice */}
            <div className="p-6 bg-parchment border border-border/50 rounded-lg mb-8">
              <h4 className="font-semibold mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Practitioner's Note</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Production systems rarely use a single approach. Consider combining your top 2-3 results. For example: <strong>Classic RAG</strong> for factual retrieval + <strong>Rules Engineering</strong> for agent behavior + <strong>Cognitive Architecture</strong> for long sessions. The approaches are complementary, not competing.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-sans text-sm font-medium rounded-md hover:bg-muted/50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Try Different Constraints
              </button>
              <Link href="/approaches">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
                  Deep-Dive Into Approaches <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
