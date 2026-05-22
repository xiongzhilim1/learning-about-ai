/*
 * ResourcesPage — Curated external resources, references, and further reading
 */

import { ExternalLink, BookOpen, FileText, GraduationCap, Newspaper, Video } from "lucide-react";
import { useTitle } from "@/lib/useTitle";

interface Resource {
  title: string;
  description: string;
  url: string;
  type: "paper" | "guide" | "course" | "tool" | "article" | "video";
  tags: string[];
}

const resources: Resource[] = [
  {
    title: "The Prompt Report: A Systematic Survey of Prompting Techniques",
    description: "Comprehensive academic survey by Schulhoff et al. (2024) cataloguing 58+ text prompting techniques across taxonomy categories. The foundational research behind the 5 Core Tenets framework used in this course.",
    url: "https://arxiv.org/abs/2406.06608",
    type: "paper",
    tags: ["Academic", "Taxonomy", "Foundational"],
  },
  {
    title: "Learn Prompting — Comprehensive Prompt Engineering Guide",
    description: "Open-source educational resource covering prompt engineering from basics to advanced techniques. Includes interactive examples and a structured curriculum.",
    url: "https://learnprompting.org/docs/introduction",
    type: "course",
    tags: ["Interactive", "Beginner-Friendly", "Open Source"],
  },
  {
    title: "Lakera Prompt Engineering Guide",
    description: "Practical guide covering prompt engineering best practices, common pitfalls, and security considerations. Strong focus on production-ready prompting.",
    url: "https://www.lakera.ai/blog/prompt-engineering-guide",
    type: "guide",
    tags: ["Practical", "Security", "Production"],
  },
  {
    title: "LlamaIndex RAG Documentation",
    description: "Technical documentation on Retrieval-Augmented Generation (RAG) — a key technique for grounding LLM outputs in external knowledge. Essential for advanced prompt engineering workflows.",
    url: "https://docs.llamaindex.ai/en/stable/understanding/rag/",
    type: "guide",
    tags: ["RAG", "Technical", "Advanced"],
  },
  {
    title: "OpenAI Prompt Engineering Guide",
    description: "Official best practices from OpenAI for getting the most out of GPT models. Covers strategies like writing clear instructions, providing reference text, and splitting complex tasks.",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    type: "guide",
    tags: ["Official", "GPT", "Best Practices"],
  },
  {
    title: "Anthropic Prompt Engineering Guide",
    description: "Anthropic's comprehensive guide to prompting Claude effectively. Covers system prompts, chain-of-thought, and structured output techniques.",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    type: "guide",
    tags: ["Official", "Claude", "Best Practices"],
  },
  {
    title: "Chain-of-Thought Prompting Elicits Reasoning (Wei et al., 2022)",
    description: "The seminal paper that introduced Chain-of-Thought prompting, demonstrating that asking models to 'think step by step' dramatically improves reasoning performance.",
    url: "https://arxiv.org/abs/2201.11903",
    type: "paper",
    tags: ["Academic", "Chain-of-Thought", "Seminal"],
  },
  {
    title: "Tree of Thoughts: Deliberate Problem Solving with LLMs",
    description: "Research paper introducing Tree-of-Thought prompting, which extends CoT by exploring multiple reasoning branches before committing to an answer.",
    url: "https://arxiv.org/abs/2305.10601",
    type: "paper",
    tags: ["Academic", "Tree-of-Thought", "Advanced"],
  },
  {
    title: "Google Gemini Prompt Engineering Guide",
    description: "Google's guide to effective prompting for Gemini models, covering multimodal prompting, structured outputs, and system instructions.",
    url: "https://ai.google.dev/gemini-api/docs/prompting-intro",
    type: "guide",
    tags: ["Official", "Gemini", "Multimodal"],
  },
  {
    title: "Prompt Engineering for Developers — DeepLearning.AI",
    description: "Free course by Andrew Ng and Isa Fulford covering prompt engineering fundamentals for software developers. Includes hands-on Jupyter notebooks.",
    url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
    type: "course",
    tags: ["Free Course", "Developers", "Hands-On"],
  },
  {
    title: "Microsoft Prompt Engineering Techniques",
    description: "Microsoft's documentation on advanced prompting techniques for Azure OpenAI, including system message design and few-shot learning patterns.",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering",
    type: "guide",
    tags: ["Official", "Azure", "Enterprise"],
  },
  {
    title: "Prompting Guide — DAIR.AI",
    description: "Community-driven prompt engineering guide with extensive examples, research paper summaries, and technique comparisons across different models.",
    url: "https://www.promptingguide.ai/",
    type: "guide",
    tags: ["Community", "Comprehensive", "Multi-Model"],
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  paper: <FileText className="w-4 h-4" />,
  guide: <BookOpen className="w-4 h-4" />,
  course: <GraduationCap className="w-4 h-4" />,
  tool: <ExternalLink className="w-4 h-4" />,
  article: <Newspaper className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
};

const typeColors: Record<string, { bg: string; text: string }> = {
  paper: { bg: "rgba(120,90,160,0.08)", text: "#785AA0" },
  guide: { bg: "rgba(199,91,57,0.08)", text: "#C75B39" },
  course: { bg: "rgba(123,158,135,0.08)", text: "#5A7E66" },
  tool: { bg: "rgba(196,163,90,0.08)", text: "#9E8A3A" },
  article: { bg: "rgba(45,42,38,0.06)", text: "#5A5550" },
  video: { bg: "rgba(180,70,100,0.08)", text: "#B44664" },
};

export default function ResourcesPage() {
  useTitle("Resources");
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2D2A26 0%, #3D3530 50%, #4A3F38 100%)" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 30%, rgba(120,90,160,0.15) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 70%, rgba(199,91,57,0.1) 0%, transparent 50%)" }} />
        </div>
        <div className="container relative z-10 py-14 md:py-18">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: "#C4A3D4", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Further Reading
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
          >
            Resources & References
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "560px" }}
          >
            Curated collection of academic papers, official guides, courses, and tools
            to deepen your prompt engineering expertise beyond this course.
          </p>
        </div>
      </section>

      {/* Resource Grid */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] no-underline block"
              style={{ background: "#FDFBF7", borderColor: "#E8E0D4" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: typeColors[resource.type].bg, color: typeColors[resource.type].text }}>
                  {typeIcons[resource.type]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                      style={{
                        background: typeColors[resource.type].bg,
                        color: typeColors[resource.type].text,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}>
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-1.5" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
                    {resource.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "#F0EBE3",
                          color: "#6B6560",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 mt-1" style={{ color: "#7A7570" }} />
              </div>
            </a>
          ))}
        </div>

        {/* Attribution */}
        <div className="mt-12 p-6 rounded-xl border" style={{ background: "#F5F0E8", borderColor: "#E8E0D4" }}>
          <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}>
            About This Course
          </h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#4A453E", fontFamily: "'Source Sans 3', sans-serif" }}>
            The Prompting Mastery training program is built on the taxonomy established in
            "The Prompt Report: A Systematic Survey of Prompting Techniques" by Schulhoff et al. (2024).
            The 5 Core Tenets — In-Context Learning, Thought Generation, Decomposition, Ensembling,
            and Self-Criticism — represent the five meta-categories of text-based prompting techniques
            identified in this comprehensive survey of 58+ techniques.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#4A453E", fontFamily: "'Source Sans 3', sans-serif" }}>
            The proficiency framework (L0-L5) provides a structured progression path from AI novice
            to AI-native practitioner, with each level building on the tenet mastery of the previous level.
            Course exercises are designed to develop practical skills at each proficiency level through
            real-world scenarios and progressive difficulty.
          </p>
        </div>
      </div>
    </div>
  );
}
