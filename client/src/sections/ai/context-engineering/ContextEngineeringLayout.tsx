import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  Compass,
  BookOpen,
  Map,
  Scroll,
  MousePointerClick,
  Sliders,
  Code2,
  FolderOpen,
  ClipboardCheck,
  Library,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/mental-model", label: "Mental Model", icon: BookOpen },
  { href: "/approaches", label: "Approaches", icon: Map },
  { href: "/tenets", label: "Tenets", icon: Scroll },
  { href: "/selector", label: "Selector", icon: MousePointerClick },
  { href: "/visualizer", label: "Visualizer", icon: Sliders },
  { href: "/recipes", label: "Recipes", icon: Code2 },
  { href: "/case-studies", label: "Case Studies", icon: FolderOpen },
  { href: "/checklist", label: "Checklist", icon: ClipboardCheck },
  { href: "/sources", label: "Sources", icon: Library },
];

export default function ContextEngineeringLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div>
      <div className="border-b" style={{ borderColor: "#E8E0D4", background: "rgba(253,251,247,0.6)" }}>
        <div className="container flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "oklch(0.45 0.12 45)" }}>
              <Compass className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
              Context Engineering
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 no-underline"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: active ? "rgba(120,80,40,0.08)" : "transparent",
                    color: active ? "oklch(0.45 0.12 45)" : "#4A453E",
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button className="lg:hidden p-1.5 rounded-md" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#4A453E" }}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t" style={{ borderColor: "#E8E0D4" }}>
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
                      background: active ? "rgba(120,80,40,0.08)" : "transparent",
                      color: active ? "oklch(0.45 0.12 45)" : "#4A453E",
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

      {location !== "/" && (
        <div className="container py-3">
          <div className="flex items-center gap-1.5 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560" }}>
            <a href="/" className="hover:underline no-underline" style={{ color: "#6B6560" }}>Home</a>
            <ChevronRight className="w-3 h-3" />
            <a href="/ai" className="hover:underline no-underline" style={{ color: "#6B6560" }}>AI Education</a>
            <ChevronRight className="w-3 h-3" />
            <Link href="/" className="hover:underline no-underline" style={{ color: "#6B6560" }}>Context Engineering</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "oklch(0.45 0.12 45)" }}>
              {navItems.find((n) => isActive(n.href))?.label || "Page"}
            </span>
          </div>
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}
