import { useTitle } from "@/lib/useTitle";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
};

interface LayerConfig {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tokens: number;
  description: string;
  components: string[];
}

const modelPresets: Record<string, number> = {
  "claude-3.5-sonnet": 200000,
  "gpt-4o": 128000,
  "gemini-1.5-pro": 1000000,
  "claude-3-haiku": 200000,
  "gpt-4-turbo": 128000,
  "custom": 200000
};

export default function Visualizer() {
  useTitle("Context Visualizer — Context Engineering");
  const [model, setModel] = useState("claude-3.5-sonnet");
  const [totalWindow, setTotalWindow] = useState(200000);
  const [staticTokens, setStaticTokens] = useState(8000);
  const [dynamicTokens, setDynamicTokens] = useState(60000);
  const [ephemeralTokens, setEphemeralTokens] = useState(15000);

  const presets: Record<string, { label: string; desc: string; static: number; dynamic: number; ephemeral: number; model: string }> = {
    optimal: { label: "Optimal (50% util)", desc: "Well-balanced allocation following the 40-60% utilization rule.", static: 8000, dynamic: 60000, ephemeral: 15000, model: "claude-3.5-sonnet" },
    overstuffed: { label: "Anti-Pattern: Overstuffed", desc: "90% utilization — no reasoning headroom. Quality will degrade.", static: 25000, dynamic: 120000, ephemeral: 35000, model: "claude-3.5-sonnet" },
    cacheKiller: { label: "Anti-Pattern: Cache Killer", desc: "Dynamic content in static layer. KV-cache invalidated every turn.", static: 45000, dynamic: 80000, ephemeral: 20000, model: "claude-3.5-sonnet" },
    agentLoop: { label: "Agentic (50 tool calls)", desc: "Long-running agent with compaction. Heavy dynamic layer.", static: 6000, dynamic: 90000, ephemeral: 8000, model: "claude-3.5-sonnet" }
  };

  const applyPreset = (key: string) => {
    const p = presets[key];
    setModel(p.model);
    setTotalWindow(modelPresets[p.model]);
    setStaticTokens(p.static);
    setDynamicTokens(p.dynamic);
    setEphemeralTokens(p.ephemeral);
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    const newTotal = modelPresets[newModel] || 200000;
    setTotalWindow(newTotal);
    // Scale proportionally
    const ratio = newTotal / totalWindow;
    setStaticTokens(Math.round(staticTokens * ratio));
    setDynamicTokens(Math.round(dynamicTokens * ratio));
    setEphemeralTokens(Math.round(ephemeralTokens * ratio));
  };

  const layers: LayerConfig[] = useMemo(() => [
    {
      name: "Static Layer",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300",
      tokens: staticTokens,
      description: "System prompt, rules (CLAUDE.md), tool definitions, persona. Cached via KV-cache.",
      components: ["System prompt", "Tool definitions", "Rules/conventions", "Persona/identity"]
    },
    {
      name: "Dynamic Layer",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-300",
      tokens: dynamicTokens,
      description: "Retrieved context, compacted history, working memory, scratchpad.",
      components: ["RAG results", "Conversation history", "Working memory", "Todo/scratchpad"]
    },
    {
      name: "Ephemeral Layer",
      color: "text-green-700",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
      tokens: ephemeralTokens,
      description: "Current user message, fresh tool results. Processed once then evicted or promoted.",
      components: ["User message", "Tool results", "Observations", "Current turn data"]
    }
  ], [staticTokens, dynamicTokens, ephemeralTokens]);

  const usedTokens = staticTokens + dynamicTokens + ephemeralTokens;
  const utilization = (usedTokens / totalWindow) * 100;
  const reasoningHeadroom = totalWindow - usedTokens;
  const reasoningPercent = (reasoningHeadroom / totalWindow) * 100;

  // Smart zone check (effective quality threshold)
  const smartZone = Math.min(totalWindow, 75000);
  const isInSmartZone = usedTokens <= smartZone;

  // Utilization health
  const getHealthStatus = () => {
    if (utilization <= 40) return { status: "Under-utilized", color: "text-blue-600", icon: Info, message: "You have significant headroom. Consider adding more context for better grounding." };
    if (utilization <= 60) return { status: "Optimal", color: "text-green-600", icon: CheckCircle2, message: "You're in the optimal 40-60% utilization range. Good balance of context and reasoning headroom." };
    if (utilization <= 80) return { status: "Caution", color: "text-amber-600", icon: AlertTriangle, message: "Approaching high utilization. Quality may degrade. Consider compaction." };
    return { status: "Danger", color: "text-red-600", icon: AlertTriangle, message: "Context is over-filled. Expect instruction-following degradation and reasoning errors." };
  };

  const health = getHealthStatus();
  const HealthIcon = health.icon;

  // Cost estimate (Claude pricing)
  const cacheMissRate = 0.003; // $3/MTok
  const cacheHitRate = 0.0003; // $0.30/MTok
  const staticCost = (staticTokens / 1000000) * cacheHitRate; // Cached
  const dynamicCost = (dynamicTokens / 1000000) * cacheMissRate; // Not cached
  const ephemeralCost = (ephemeralTokens / 1000000) * cacheMissRate; // Not cached
  const totalCostPerTurn = staticCost + dynamicCost + ephemeralCost;

  return (
    <div className="container py-16 md:py-24">
      <motion.div {...fadeIn} className="max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-sm font-sans font-medium tracking-widest uppercase text-sienna mb-4">
          Interactive Tool
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          Context Window Visualizer
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
          Visualize the three layers of your context window. Adjust token budgets to plan allocation and see real-time cost, utilization, and health metrics.
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Presets */}
            <div>
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Scenarios
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className="text-left p-2 border border-border/50 rounded-md hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-[10px] font-sans font-medium block leading-tight">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector */}
            <div>
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-card"
              >
                <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (200K)</option>
                <option value="gpt-4o">GPT-4o (128K)</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (1M)</option>
                <option value="claude-3-haiku">Claude 3 Haiku (200K)</option>
                <option value="gpt-4-turbo">GPT-4 Turbo (128K)</option>
              </select>
            </div>

            {/* Layer Sliders */}
            {[
              { label: "Static Layer", value: staticTokens, setter: setStaticTokens, max: Math.round(totalWindow * 0.3), color: "accent-blue-600" },
              { label: "Dynamic Layer", value: dynamicTokens, setter: setDynamicTokens, max: Math.round(totalWindow * 0.7), color: "accent-amber-600" },
              { label: "Ephemeral Layer", value: ephemeralTokens, setter: setEphemeralTokens, max: Math.round(totalWindow * 0.4), color: "accent-green-600" }
            ].map((slider) => (
              <div key={slider.label}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground">
                    {slider.label}
                  </label>
                  <span className="text-xs font-mono text-muted-foreground">
                    {slider.value.toLocaleString()} tokens
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={slider.max}
                  step={1000}
                  value={slider.value}
                  onChange={(e) => slider.setter(Number(e.target.value))}
                  className={`w-full h-2 bg-muted rounded-full appearance-none cursor-pointer ${slider.color}`}
                />
              </div>
            ))}

            {/* Health Status */}
            <div className={`p-4 border rounded-lg ${health.color === "text-green-600" ? "bg-green-50/50 border-green-200/50" : health.color === "text-amber-600" ? "bg-amber-50/50 border-amber-200/50" : health.color === "text-red-600" ? "bg-red-50/50 border-red-200/50" : "bg-blue-50/50 border-blue-200/50"}`}>
              <div className="flex items-center gap-2 mb-1">
                <HealthIcon className={`w-4 h-4 ${health.color}`} />
                <span className={`text-sm font-semibold ${health.color}`}>{health.status}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{health.message}</p>
            </div>

            {/* Metrics */}
            <div className="space-y-3 p-4 border border-border/50 rounded-lg bg-card">
              <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground">Metrics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Utilization</p>
                  <p className="text-lg font-mono font-bold">{utilization.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reasoning Headroom</p>
                  <p className="text-lg font-mono font-bold">{reasoningPercent.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cost/Turn</p>
                  <p className="text-lg font-mono font-bold">${(totalCostPerTurn * 1000).toFixed(3)}</p>
                  <p className="text-[10px] text-muted-foreground">per 1K turns</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Smart Zone</p>
                  <p className={`text-lg font-mono font-bold ${isInSmartZone ? "text-green-600" : "text-red-600"}`}>
                    {isInSmartZone ? "✓ Inside" : "✗ Outside"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-3">
            {/* Bar Visualization */}
            <div className="border border-border/60 rounded-lg p-6 bg-card mb-6">
              <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Context Window Layout ({totalWindow.toLocaleString()} tokens total)
              </h3>

              {/* Stacked Bar */}
              <div className="w-full h-16 rounded-lg overflow-hidden flex border border-border/40 mb-4">
                {layers.map((layer) => {
                  const pct = (layer.tokens / totalWindow) * 100;
                  if (pct < 0.5) return null;
                  return (
                    <div
                      key={layer.name}
                      className={`${layer.bgColor} ${layer.borderColor} border-r flex items-center justify-center transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                    >
                      {pct > 8 && (
                        <span className={`text-xs font-mono font-medium ${layer.color}`}>
                          {pct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  );
                })}
                {/* Headroom */}
                {reasoningPercent > 1 && (
                  <div
                    className="bg-gray-50 border-r border-gray-200 flex items-center justify-center"
                    style={{ width: `${reasoningPercent}%` }}
                  >
                    {reasoningPercent > 8 && (
                      <span className="text-xs font-mono text-gray-500">
                        Headroom {reasoningPercent.toFixed(0)}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4">
                {layers.map((layer) => (
                  <div key={layer.name} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-sm ${layer.bgColor} ${layer.borderColor} border`} />
                    <span className="text-xs text-muted-foreground">{layer.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gray-50 border border-gray-200" />
                  <span className="text-xs text-muted-foreground">Reasoning Headroom</span>
                </div>
              </div>
            </div>

            {/* Layer Details */}
            <div className="space-y-3">
              {layers.map((layer) => (
                <div key={layer.name} className={`p-4 border rounded-lg ${layer.bgColor}/30 ${layer.borderColor}/50 border`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-semibold ${layer.color}`}>{layer.name}</h4>
                    <span className="text-xs font-mono text-muted-foreground">
                      {layer.tokens.toLocaleString()} tokens ({((layer.tokens / totalWindow) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{layer.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.components.map((comp) => (
                      <span key={comp} className="text-[10px] font-mono px-1.5 py-0.5 bg-background/80 rounded border border-border/30">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Attention Geography */}
            <div className="mt-6 p-4 border border-border/50 rounded-lg bg-card">
              <h4 className="text-sm font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Attention Geography (U-Shaped Curve)
              </h4>
              <div className="relative h-24 w-full">
                <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                  {/* U-shaped attention curve */}
                  <path
                    d="M 0 10 C 50 10, 80 70, 200 70 C 320 70, 350 10, 400 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-sienna/60"
                  />
                  {/* Labels */}
                  <text x="20" y="10" className="text-[8px] fill-green-600 font-sans">HIGH</text>
                  <text x="180" y="75" className="text-[8px] fill-red-500 font-sans">LOW</text>
                  <text x="360" y="10" className="text-[8px] fill-green-600 font-sans">HIGH</text>
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-muted-foreground font-mono px-2">
                  <span>Start (primacy)</span>
                  <span>Middle (dead zone)</span>
                  <span>End (recency)</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Place critical instructions at the <strong>start</strong> (system prompt) and <strong>end</strong> (current goal recitation). The middle is an attention dead zone — avoid placing important information there.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
