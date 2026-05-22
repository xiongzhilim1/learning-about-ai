import { Link, useLocation } from "wouter";
import { getDomain } from "@/lib/siteConfig";

interface SectionLayoutProps {
  domainSlug: string;
  children: React.ReactNode;
}

export default function SectionLayout({ domainSlug, children }: SectionLayoutProps) {
  const [location] = useLocation();
  const domain = getDomain(domainSlug);

  if (!domain) return <>{children}</>;

  // Only show section tabs if there's more than one section
  if (domain.sections.length <= 1) return <>{children}</>;

  return (
    <div>
      <div className="border-b" style={{ borderColor: "#E8E0D4", background: "#FDFBF7" }}>
        <div className="container">
          <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
            {domain.sections.map((section) => {
              const sectionPath = `/${section.slug}`;
              const active = location === sectionPath || location.startsWith(`${sectionPath}/`);
              const comingSoon = section.status === "coming-soon";

              return (
                <Link
                  key={section.slug}
                  href={comingSoon ? "#" : sectionPath}
                  className="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 no-underline"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    borderColor: active ? "#C75B39" : "transparent",
                    color: comingSoon ? "#A09B93" : active ? "#C75B39" : "#4A453E",
                    opacity: comingSoon ? 0.6 : 1,
                    cursor: comingSoon ? "default" : "pointer",
                  }}
                >
                  {section.label}
                  {comingSoon && (
                    <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#E8E0D4", color: "#6B6560" }}>
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
