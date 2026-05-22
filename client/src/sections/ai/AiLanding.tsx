import { Link } from "wouter";
import { ArrowRight, MessageSquare, Compass, Network } from "lucide-react";
import { getDomain } from "@/lib/siteConfig";
import { useTitle } from "@/lib/useTitle";

const sectionIcons: Record<string, typeof MessageSquare> = {
  "prompt-engineering": MessageSquare,
  "context-engineering": Compass,
  "harness-engineering": Network,
};

export default function AiLanding() {
  useTitle("AI Education");
  const domain = getDomain("ai");
  if (!domain) return null;

  return (
    <div>
      {/* Header */}
      <section className="py-14 md:py-20" style={{ background: "#2D2A26" }}>
        <div className="container">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
          >
            AI Education
          </h1>
          <p
            className="text-base md:text-lg max-w-xl"
            style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7 }}
          >
            Structured learning paths for mastering AI tools and techniques — from prompting to context engineering and beyond.
          </p>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-12" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {domain.sections.map((section) => {
              const Icon = sectionIcons[section.slug] || MessageSquare;
              const comingSoon = section.status === "coming-soon";

              return (
                <Link
                  key={section.slug}
                  href={comingSoon ? "#" : `/${section.slug}`}
                  className="no-underline block"
                >
                  <div
                    className="p-6 rounded-xl border transition-all duration-300 h-full"
                    style={{
                      background: "#FDFBF7",
                      borderColor: comingSoon ? "#E8E0D4" : "#E8E0D4",
                      opacity: comingSoon ? 0.6 : 1,
                      cursor: comingSoon ? "default" : "pointer",
                    }}
                    {...(!comingSoon && {
                      className: "p-6 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] h-full",
                    })}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "rgba(199,91,57,0.08)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#C75B39" }} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
                    >
                      {section.label}
                      {comingSoon && (
                        <span
                          className="ml-2 text-xs font-normal px-2 py-0.5 rounded-full"
                          style={{ background: "#E8E0D4", color: "#6B6560" }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {section.description}
                    </p>
                    {!comingSoon && (
                      <span
                        className="inline-flex items-center gap-1 text-sm font-medium"
                        style={{ color: "#C75B39", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Start learning <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
