import { ArrowRight } from "lucide-react";
import { useTitle } from "@/lib/useTitle";
import SectionEyebrow from "./digital-brain/SectionEyebrow";
import ConsoleBlock from "./digital-brain/ConsoleBlock";
import WireDiagram from "./digital-brain/WireDiagram";
import TraceRow from "./digital-brain/TraceRow";
import AnnotatedSplit from "./digital-brain/AnnotatedSplit";
import CtaBand from "./digital-brain/CtaBand";
import { brainMdExample, consoleBlocks } from "./digital-brain/content";

const REPO_URL = "https://github.com/xiongzhilim1/digital-brain-toolkit-public";
const SERIES_URL = "https://www.linkedin.com/in/limxiongzhi/";
const LINKEDIN_URL = "https://www.linkedin.com/in/limxiongzhi/";

export default function DigitalBrain() {
  useTitle("A Brain You Can Fork");

  return (
    <div>
      {/* § 01 — HERO */}
      <section className="py-24 md:py-32" style={{ background: "#2D2A26" }}>
        <div className="container">
          <div className="max-w-3xl">
            <SectionEyebrow number="01" label="A BRAIN YOU CAN FORK" tone="cream" />
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "#FAF7F2",
                lineHeight: 1.1,
              }}
            >
              Most people treat their digital tools as storage.{" "}
              <span style={{ color: "#F5C4A1" }}>
                I treat mine as a second mind, one I can hand to an agent.
              </span>
            </h1>
            <p
              className="text-lg md:text-xl mb-10"
              style={{
                color: "#D4CFC8",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              A walk through the public digital brain repo. The shape of the
              system, the artifacts that hold it together, and a session with
              the agent who reads alongside me.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium no-underline group"
                style={{
                  color: "#F5C4A1",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                See the repo
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={SERIES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium no-underline group"
                style={{
                  color: "#D4CFC8",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Read the series
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* § 02 — THE WIRE */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="max-w-5xl">
            <SectionEyebrow number="02" label="THE WIRE" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              Five brains, one protocol.
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-2xl"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              The wire is the architecture, not a metaphor. Each brain owns
              one orientation, reads the others read-only, and writes only in
              its own directory. Subsidiarity for memory. Click a node.
            </p>
            <WireDiagram />
          </div>
        </div>
      </section>

      {/* § 03 — WHY A SECOND BRAIN AT ALL */}
      <section className="py-20" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="max-w-2xl">
            <SectionEyebrow number="03" label="WHY A SECOND BRAIN AT ALL" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              The quiet fatigue, and the room it makes when you offload it.
            </h2>

            <p
              className="text-lg md:text-xl mb-6"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.75,
              }}
            >
              Every AI conversation is bright, useful, and gone. The models
              are brilliant and amnesiac, and the continuity of the work,
              what mattered, what was scaffolding, what was decided and why,
              is held by exactly one person in the room. We are tired of
              being the only one in the room. It is not annoyance. It is the
              particular tiredness of having done good thinking with someone
              who, on their side, has no memory that the thinking ever
              happened.
            </p>

            <p
              className="text-base md:text-lg mb-6"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.75,
              }}
            >
              Underneath the fatigue sits a budget problem. Working memory
              holds about four chunks before judgment degrades. Most
              professional work spends that budget on routine, on tracking
              fifteen ongoing threads, on remembering which decision was made
              where. The productivity pitch for AI is that you do more of the
              same work in less time. The truer pitch is that AI lets you do
              less of the wrong thing, so the part of the mind built for
              strategy and taste has room to come online.
            </p>

            <p
              className="text-base md:text-lg"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.75,
              }}
            >
              That is what a second brain is for. Not a faster engine. A
              place for memory to land, with a structure that says this
              matters, keep it, and this was scaffolding, let it go. I needed
              a second mind I could hand to an agent.
            </p>
          </div>
        </div>
      </section>

      {/* § 04 — THE ARCHITECTURE */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="max-w-6xl">
            <SectionEyebrow number="04" label="THE ARCHITECTURE" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-10"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              Two ideas, layered. PARA and a manifest.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p
                  className="text-base md:text-lg mb-5"
                  style={{
                    color: "#3A3530",
                    fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: 1.75,
                  }}
                >
                  The first idea is PARA. Every active thing in the brain
                  is a project, an area, a resource, or an archive. Four
                  buckets, no more. The second is the brain protocol, a
                  small spec that lets several brains live next to each
                  other, each one sovereign in its own directory, each one
                  read-only to the others.
                </p>
                <p
                  className="text-base md:text-lg mb-5"
                  style={{
                    color: "#3A3530",
                    fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: 1.75,
                  }}
                >
                  Five files do the load-bearing work, and naming them is
                  half the design.
                </p>
                <ul
                  className="space-y-3 text-base md:text-lg"
                  style={{
                    color: "#3A3530",
                    fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: 1.7,
                  }}
                >
                  <li>
                    <code
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C75B39",
                      }}
                    >
                      BRAIN.md
                    </code>{" "}
                    is the manifest, a few lines of YAML that say what the
                    brain offers and what it consumes.
                  </li>
                  <li>
                    <code
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C75B39",
                      }}
                    >
                      CLAUDE.md
                    </code>{" "}
                    is the operating manual, the prose that tells the
                    agent how to behave inside this brain.
                  </li>
                  <li>
                    <code
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C75B39",
                      }}
                    >
                      index.md
                    </code>{" "}
                    is the live map, what is currently active.
                  </li>
                  <li>
                    <code
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C75B39",
                      }}
                    >
                      log.md
                    </code>{" "}
                    is the append-only record of what happened, the audit
                    trail.
                  </li>
                  <li>
                    <code
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        color: "#C75B39",
                      }}
                    >
                      MEMORY.md
                    </code>{" "}
                    is the agent's persistent layer, an index of pointers
                    to things that matter, capped at one line each.
                  </li>
                </ul>
                <p
                  className="text-base md:text-lg mt-6"
                  style={{
                    color: "#3A3530",
                    fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: 1.75,
                  }}
                >
                  The agent reads these. So do I. One file, two consumers.
                  That is the differentiator.
                </p>
              </div>
              <ConsoleBlock
                eyebrow="SECOND_BRAIN / BRAIN.MD"
                body={brainMdExample}
                caption="A manifest names what the brain owns and what it leans on. The agent reads it first."
              />
            </div>
          </div>
        </div>
      </section>

      {/* § 05 — THE CONSOLE */}
      <section className="py-20" style={{ background: "#2D2A26" }}>
        <div className="container">
          <div className="max-w-4xl">
            <SectionEyebrow number="05" label="THE CONSOLE" tone="cream" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
            >
              The surface the agent reads.
            </h2>
            <p
              className="text-base md:text-lg mb-10"
              style={{
                color: "#D4CFC8",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              Three files, in order. The map, the record, the persistent
              layer. Verbatim from the brain on 2026-06-05, formatted for
              the page.
            </p>
            {consoleBlocks.map((block) => (
              <div key={block.eyebrow} className="mb-2">
                <ConsoleBlockOnDark {...block} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* § 06 — WORKING WITH THE BRAIN */}
      <section className="py-20" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="max-w-6xl">
            <SectionEyebrow number="06" label="WORKING WITH THE BRAIN" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              The agent is the second reader.
            </h2>
            <p
              className="text-base md:text-lg mb-12 max-w-3xl"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              Most of what makes a digital brain useful is invisible until
              you watch an agent move through it. The agent reads the same
              files you do, follows the same rules, and leaves a trail.
              Here is one short session, annotated.
            </p>
            <AnnotatedSplit />
            <p
              className="text-lg md:text-xl mt-16 max-w-3xl"
              style={{
                color: "#2D2A26",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              That is the loop. Read, ask, pull, scaffold, log. The agent
              does not get smarter at my work over time on its own. It gets
              useful because the brain it reads from is shaped to be read.
              The taste is in the system, not in the prompt.
            </p>
          </div>
        </div>
      </section>

      {/* § 07 — TRACE */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="max-w-6xl">
            <SectionEyebrow number="07" label="TRACE" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              From human root to surface.
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-2xl"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              One design choice in the brain, traced through five layers
              back to a human root. The artifact at the surface is
              <code
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: "#C75B39",
                  marginLeft: "0.35em",
                }}
              >
                MEMORY.md
              </code>
              . The root is the four-chunk budget of working memory. The
              taste sits in the constraints between them.
            </p>
            <TraceRow />
          </div>
        </div>
      </section>

      {/* § 08 — FORK IT */}
      <section className="py-20" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="max-w-3xl">
            <SectionEyebrow number="08" label="FORK IT" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              Yours in one command.
            </h2>
            <p
              className="text-base md:text-lg mb-6"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              The toolkit is public. Clone it, point an agent at it, edit
              three files, and you have a working second brain by the end
              of the afternoon.
            </p>
            <ConsoleBlock
              eyebrow="TERMINAL"
              body={`git clone https://github.com/xiongzhilim1/digital-brain-toolkit-public.git
cd digital-brain-toolkit-public
cat README.md`}
            />
            <p
              className="text-base md:text-lg mb-4 mt-8"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              Three things a new owner edits first:
            </p>
            <ol
              className="space-y-3 text-base md:text-lg list-decimal pl-6"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              <li>
                <code
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: "#C75B39",
                  }}
                >
                  CLAUDE.md
                </code>{" "}
                so the agent knows whose brain it is in.
              </li>
              <li>
                <code
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: "#C75B39",
                  }}
                >
                  index.md
                </code>{" "}
                with whatever you are actually working on this week.
              </li>
              <li>
                The first project folder under{" "}
                <code
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: "#C75B39",
                  }}
                >
                  1-projects/
                </code>
                . The brain becomes yours the moment you put real work
                inside it.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* § 09 — NOTES FROM THE WORKSHOP */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="max-w-3xl">
            <SectionEyebrow number="09" label="NOTES FROM THE WORKSHOP" />
            <CtaBand
              sentence="If you are building this for a team, get in touch."
              linkText="Find me on LinkedIn"
              href={LINKEDIN_URL}
            />
          </div>
        </div>
      </section>

      {/* § 10 — FURTHER READING */}
      <section className="py-20" style={{ background: "#FDFBF7" }}>
        <div className="container">
          <div className="max-w-3xl">
            <SectionEyebrow number="10" label="FURTHER READING" />
            <ul
              className="space-y-3 text-base md:text-lg"
              style={{
                color: "#3A3530",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              <li>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C75B39" }}
                >
                  digital-brain-toolkit-public
                </a>
                . The repo this page walks through.
              </li>
              <li>
                <a
                  href={SERIES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C75B39" }}
                >
                  Series 01, the digital brain
                </a>
                . Ten posts that fed this page.
              </li>
              <li>
                <a
                  href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C75B39" }}
                >
                  Andrej Karpathy's LLM Wiki
                </a>
                . The sketch the wiki brains lean on.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function ConsoleBlockOnDark({
  eyebrow,
  body,
  caption,
}: {
  eyebrow: string;
  body: string;
  caption?: string;
}) {
  return (
    <figure className="mb-10">
      <p
        className="text-xs font-semibold mb-2"
        style={{
          color: "#F5C4A1",
          fontFamily: "'Fira Code', monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </p>
      <pre
        className="overflow-x-auto rounded-r-md"
        style={{
          background: "#1F1D1A",
          color: "#FAF7F2",
          borderLeft: "4px solid #C75B39",
          padding: "1.25rem 1.5rem",
          fontFamily: "'Fira Code', monospace",
          fontSize: "0.8125rem",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        <code style={{ fontFamily: "inherit", color: "inherit" }}>{body}</code>
      </pre>
      {caption && (
        <figcaption
          className="mt-3 text-sm"
          style={{
            color: "#A89F94",
            fontFamily: "'Source Sans 3', sans-serif",
            lineHeight: 1.65,
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
