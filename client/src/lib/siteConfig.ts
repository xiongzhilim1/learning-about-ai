export interface SectionConfig {
  slug: string;
  label: string;
  description: string;
  icon: string;
  status: "active" | "coming-soon";
}

export interface DomainConfig {
  slug: string;
  label: string;
  icon: string;
  sections: SectionConfig[];
}

export const domains: DomainConfig[] = [
  {
    slug: "ai",
    label: "AI Education",
    icon: "Brain",
    sections: [
      {
        slug: "prompt-engineering",
        label: "Prompt Engineering",
        description: "Master the craft of AI prompting through the 5 Core Tenets",
        icon: "MessageSquare",
        status: "active",
      },
      {
        slug: "context-engineering",
        label: "Context Engineering",
        description: "The art of curating what the model sees — tokens, retrieval, and memory",
        icon: "Compass",
        status: "active",
      },
      {
        slug: "harness-engineering",
        label: "Harness Engineering",
        description: "Engineer the system around the model — loops, tools, hooks, and state",
        icon: "Network",
        status: "active",
      },
    ],
  },
];

export function getDomain(slug: string) {
  return domains.find((d) => d.slug === slug);
}

export function getSection(domainSlug: string, sectionSlug: string) {
  return getDomain(domainSlug)?.sections.find((s) => s.slug === sectionSlug);
}
