import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { domains } from "@/lib/siteConfig";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActiveDomain = (slug: string) => location.startsWith(`/${slug}`);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5F0E8" }}>
      {/* Site Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(253,251,247,0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "#E8E0D4",
        }}
      >
        <div className="container flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 no-underline"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "#2D2A26", color: "#FAF7F2", fontFamily: "'Fraunces', serif" }}
            >
              X
            </div>
            <span
              className="text-base font-semibold"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              Xiong Zhi Lim
            </span>
          </Link>

          {/* Desktop Domain Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {domains.map((domain) => {
              const active = isActiveDomain(domain.slug);
              return (
                <Link
                  key={domain.slug}
                  href={`/${domain.slug}`}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: active ? "rgba(199,91,57,0.08)" : "transparent",
                    color: active ? "#C75B39" : "#4A453E",
                  }}
                >
                  {domain.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#4A453E" }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "#E8E0D4" }}>
            <nav className="container py-3 flex flex-col gap-1">
              {domains.map((domain) => {
                const active = isActiveDomain(domain.slug);
                return (
                  <Link
                    key={domain.slug}
                    href={`/${domain.slug}`}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium no-underline"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      background: active ? "rgba(199,91,57,0.08)" : "transparent",
                      color: active ? "#C75B39" : "#4A453E",
                    }}
                  >
                    {domain.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Site Footer */}
      <footer
        className="border-t mt-16 py-8"
        style={{ borderColor: "#E8E0D4", background: "#F0EBE3" }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                style={{ background: "#2D2A26", color: "#FAF7F2", fontFamily: "'Fraunces', serif" }}
              >
                S
              </div>
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
              >
                Xiong Zhi Lim
              </span>
            </div>
            <p className="text-xs" style={{ color: "#6B6560" }}>
              &copy; {new Date().getFullYear()} Xiong Zhi Lim
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
