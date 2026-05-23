import { Anchor, ArrowRight, Flame, Linkedin, Route } from "lucide-react";
import { useTitle } from "@/lib/useTitle";

export default function AboutMe() {
  useTitle("About");

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: "#2D2A26" }}>
        <div className="container">
          <div className="max-w-2xl">
            <p
              className="text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F5C4A1", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "0.15em" }}
            >
              About
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2", lineHeight: 1.1 }}
            >
              Hi, I'm <span style={{ color: "#F5C4A1" }}>Xiong Zhi</span>.
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{
                color: "#D4CFC8",
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: 1.7,
              }}
            >
              Who I am, the road I took, what I keep coming back to.
            </p>
          </div>
        </div>
      </section>

      {/* Who I am */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold mb-3"
              style={{
                color: "#C75B39",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              01 · Who I am
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(199,91,57,0.08)" }}
              >
                <Anchor className="w-5 h-5" style={{ color: "#C75B39" }} />
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
              >
                Who I am
              </h2>
            </div>

            <p
              className="text-lg md:text-xl mb-5"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7 }}
            >
              I'm a Christian, and that, honestly, is what gives this life its
              purpose, its meaning, and the comfort to sit with the mysteries
              and tensions, both the things within this heart and mind, and the
              things far beyond my control.
            </p>

            <p
              className="text-base md:text-lg mb-5"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              I love life, in its beauty and its majesty, that we are so small,
              a speckle in the continuum of time, so pointless, so meaningless,
              yet in that we can dare, we can dream, we can hope, we can have
              faith. That is what makes a small life beautiful.
            </p>

            <p
              className="text-base md:text-lg mb-5"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              I'm presently curious about second brains, brain protocols, team
              and org brain formation, experimenting with what makes a good
              digital brain and drawing lots of reference from a good first one:
              the human brain. The thing I keep noticing: a digital brain only
              feels alive when it has opinions, not just memory.
            </p>

            <p
              className="text-base md:text-lg mb-5"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              Day job:{" "}
              <strong style={{ color: "#2D2A26" }}>
                Client Solutions Director at Meta
              </strong>
              , for top e-commerce players in the Greater China region.
            </p>

            <p
              className="text-base md:text-lg mb-8"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              On the side, I'm building toward an Agentic Economy that's
              finding its footing. AI agents that don't just browse, but{" "}
              <span style={{ color: "#C75B39", fontWeight: 600 }}>
                act, monitor, transact, loop, judge, self-heal, climb the hill
              </span>
              .
            </p>

            <p
              className="text-base md:text-lg mb-3"
              style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              The question underneath all of it:
            </p>

            <div
              className="p-5 md:p-6 rounded-r-lg"
              style={{
                background: "rgba(199,91,57,0.06)",
                borderLeft: "3px solid #C75B39",
              }}
            >
              <p
                className="text-base md:text-lg"
                style={{
                  color: "#2D2A26",
                  fontFamily: "'Source Sans 3', sans-serif",
                  lineHeight: 1.8,
                  fontWeight: 500,
                }}
              >
                How might we compound our defensible value as humans
                (conviction, judgment, taste, meta-cognition), not fear but
                enjoy the capabilities of AI, and even more, this life with all
                its beauty, all its tragedies, and the presence of Christ in
                it, so that we love people, steward our gifts, and make
                memories?
              </p>
            </div>

            <p
              className="text-sm md:text-base mt-4"
              style={{ color: "#5A5550", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7 }}
            >
              Where I'm leaning, for now:{" "}
              <strong style={{ color: "#2D2A26" }}>
                build the digital brain that helps people compound the human
                parts, not replace them.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* How I got here */}
      <section className="py-16" style={{ background: "#F0EBE3" }}>
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold mb-3"
              style={{
                color: "#C75B39",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              02 · How I got here
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(199,91,57,0.08)" }}
              >
                <Route className="w-5 h-5" style={{ color: "#C75B39" }} />
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
              >
                How I got here
              </h2>
            </div>

            <p
              className="text-lg md:text-xl mb-5"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7 }}
            >
              Honestly? Somehow haha. Started out in the Air Force as an
              engineer, fresh-eyed and looking for purpose, and that was where
              I committed to my first career after university.
            </p>

            <p
              className="text-base md:text-lg mb-5"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              After that, I followed the curiosity. Tried software engineering.
              Then product management in blockchain finance. Then payments. Now
              social adtech. Not a straight line by any stretch, but each door
              pulled at me in some way, and each one turned out to be worth
              walking through.
            </p>

            <p
              className="text-base md:text-lg"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              A series of open doors. Kind people and friends who said "you
              should try this." A hunger to see how different worlds actually
              run, where smart and intelligent people gather, where the beauty
              in things quietly lives.
            </p>
          </div>
        </div>
      </section>

      {/* Formation: what I keep returning to */}
      <section className="py-20" style={{ background: "#2D2A26" }}>
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold mb-3"
              style={{
                color: "#7B9E87",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              03 · What I keep returning to
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(123,158,135,0.14)" }}
              >
                <Flame className="w-5 h-5" style={{ color: "#7B9E87" }} />
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "#FAF7F2" }}
              >
                What I keep returning to
              </h2>
            </div>
            <p
              className="text-lg md:text-xl mb-4"
              style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7 }}
            >
              This is the part that's harder to put on a CV. It's also the thing
              that quietly connects everything above. The wonder underneath the
              careers.
            </p>
            <p
              className="text-xs md:text-sm mb-10 italic"
              style={{ color: "#8A8278", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.6 }}
            >
              Auto-synthesised from my <em style={{ color: "#A89F94" }}>formation-brain</em>, a
              personal LLM-wiki of interlinked notes on the people, ideas, and
              questions shaping who I am becoming. Credit:{" "}
              <a
                href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#A89F94", textDecoration: "underline" }}
              >
                Andrej Karpathy's LLM Wiki
              </a>{" "}
              pattern.
            </p>

            <div className="space-y-8">
              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", color: "#F5C4A1" }}
                >
                  Purpose is a question, not a destination.
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
                >
                  Held too tightly, it becomes a cage. Held too loosely, it
                  becomes drift. The work is to follow the breadcrumbs gently.
                  What pulls at you. What keeps coming back. Refine over years,
                  not weekends.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", color: "#F5C4A1" }}
                >
                  Many of the deepest truths are held opposites.
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
                >
                  Stress and recovery. Conviction and openness. Care personally{" "}
                  <em>and</em> challenge directly. Be the expert <em>and</em> be
                  the beginner. The instinct is always to resolve a tension. But
                  resolving it often kills the very thing the tension was
                  generating.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", color: "#F5C4A1" }}
                >
                  Beauty decenters the self.
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
                >
                  Where arguments fail, beauty can succeed. It moves the heart,
                  not just the mind. And the observer of beauty receives a
                  passion to share it.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", color: "#F5C4A1" }}
                >
                  Transformation follows attention.
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
                >
                  What you consistently behold shapes what you become.
                  (2 Corinthians 3:18, but also Shreyas Doshi.) Masters of
                  craft. Beauty. People who do things you want to but can't yet.
                  Calibration matters more than hero worship.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", color: "#F5C4A1" }}
                >
                  Work as co-creation. Sabbath as freedom.
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "#D4CFC8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
                >
                  Work matters to me, deeply. It's a primary vehicle for
                  meaning, competency, and service to the world. Sabbath matters
                  too. It's how I remember I'm not the one keeping the world
                  running. Neither alone is the full thing.
                </p>
              </div>
            </div>

            <div
              className="mt-10 pt-8 border-t"
              style={{ borderColor: "#4A453E" }}
            >
              <p
                className="text-sm md:text-base"
                style={{ color: "#A89F94", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7 }}
              >
                Outside of work, I facilitate small groups, real conversations,
                emotional processing. It keeps me close to the part of being
                human that no CV captures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="max-w-3xl">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "#2D2A26" }}
            >
              Let's swap insights
            </h2>
            <p
              className="text-base md:text-lg mb-6"
              style={{ color: "#3A3530", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.75 }}
            >
              If you're building for a future where AI agents are intelligent,
              transactional participants, or if any of the above resonated, I'd
              love to connect.
            </p>
            <a
              href="https://www.linkedin.com/in/limxiongzhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-200 no-underline"
              style={{
                background: "#C75B39",
                color: "#FAF7F2",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
