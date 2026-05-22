import { Link } from "wouter";
import { ArrowRight, Brain } from "lucide-react";
import { domains } from "@/lib/siteConfig";
import { useTitle } from "@/lib/useTitle";

const domainIcons: Record<string, typeof Brain> = {
  ai: Brain,
};

export default function SiteLanding() {
  useTitle();
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: "#2D2A26" }}>
        <div className="container">
          <div className="max-w-2xl">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2", lineHeight: 1.1 }}
            >
              Hi, I'm <span style={{ color: "#F5C4A1" }}>Sean</span>
            </h1>
            <p
              className="text-lg md:text-xl mb-8"
              style={{
                color: "#D4CFC8",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
                maxWidth: "500px",
              }}
            >
              Building at the intersection of AI, product, and faith.
              This is where I share what I'm learning.
            </p>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {domains.map((domain) => {
              const Icon = domainIcons[domain.slug] || Brain;
              const activeSections = domain.sections.filter((s) => s.status === "active");
              return (
                <Link
                  key={domain.slug}
                  href={`/${domain.slug}`}
                  className="no-underline block"
                >
                  <div
                    className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.01] h-full"
                    style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}
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
                      {domain.label}
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {activeSections.length} {activeSections.length === 1 ? "section" : "sections"} available
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: "#C75B39", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
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
