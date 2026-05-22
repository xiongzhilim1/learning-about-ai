import { PlayCircle } from "lucide-react";
import { useTitle } from "@/lib/useTitle";

export default function SimulatorPlaceholder() {
  useTitle("Simulator — Harness Engineering");
  return (
    <div className="container py-20">
      <div className="max-w-lg mx-auto text-center">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(90,126,102,0.08)" }}
        >
          <PlayCircle className="w-8 h-8" style={{ color: "#5A7E66" }} />
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
        >
          Harness Simulator
        </h1>
        <p
          className="text-muted-foreground mb-6"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          An interactive environment where you can design, test, and iterate on
          harness architectures with live LLM feedback.
        </p>
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: "#E8E0D4",
            color: "#6B6560",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          Coming Soon
        </span>
      </div>
    </div>
  );
}
