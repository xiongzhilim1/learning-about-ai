/*
 * Prompt Engineering Content Layout — Tier 3 Navigation
 * Content-level nav within the prompt engineering section.
 * Adapted from the original Layout.tsx — footer and site chrome now live in SiteShell.
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  BookOpen,
  Compass,
  FlaskConical,
  Layers,
  Library,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/tenets", label: "5 Core Tenets", icon: Compass },
  { href: "/modules", label: "Modules", icon: Layers },
  { href: "/exercises", label: "Exercises", icon: FlaskConical },
  { href: "/resources", label: "Resources", icon: Library },
];

export default function PromptEngineeringLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div>
      {/* Content Navigation */}
      <div
        className="border-b"
        style={{ borderColor: "#E8E0D4", background: "rgba(253,251,247,0.6)" }}
      >
        <div className="container flex items-center justify-between h-12">
          {/* Section Identity */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "#C75B39" }}
            >
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              Prompt Engineering
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 no-underline"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: active ? "rgba(199,91,57,0.08)" : "transparent",
                    color: active ? "#C75B39" : "#4A453E",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-1.5 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#4A453E" }}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "#E8E0D4" }}>
            <nav className="container py-2 flex flex-col gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium no-underline"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      background: active ? "rgba(199,91,57,0.08)" : "transparent",
                      color: active ? "#C75B39" : "#4A453E",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Breadcrumb */}
      {location !== "/" && (
        <div className="container py-3">
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560" }}
          >
            <a href="/" className="hover:underline no-underline" style={{ color: "#6B6560" }}>
              Home
            </a>
            <ChevronRight className="w-3 h-3" />
            <a href="/ai" className="hover:underline no-underline" style={{ color: "#6B6560" }}>
              AI Education
            </a>
            <ChevronRight className="w-3 h-3" />
            <Link href="/" className="hover:underline no-underline" style={{ color: "#6B6560" }}>
              Prompt Engineering
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "#C75B39" }}>
              {navItems.find((n) => isActive(n.href))?.label || "Page"}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
