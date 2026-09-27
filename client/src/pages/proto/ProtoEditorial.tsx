// PROTOTYPE, throwaway. Issue #10 (child of map #2).
// Direction: EDITORIAL PRINT. Type-led, no cards/boxes/shadows, hairline rules
// and whitespace do the separating, asymmetric 12-col grid.
// Rendered as a fixed full-viewport layer so SiteShell's header does not bleed
// into the comparison. "TK" marks copy or numbers still to come (print usage):
// nothing here is a real claim yet.
import { useTitle } from "@/lib/useTitle";

const work = [
  {
    no: "01",
    title: "Deploying an agent into a sales org that did not ask for one",
    dek: "How a pilot became the default workflow for TK account teams, and the eval that made leadership trust it.",
    meta: "Deployment strategy · 20TK",
  },
  {
    no: "02",
    title: "From prompt folklore to a shared evaluation habit",
    dek: "A rubric, a golden set and a weekly review that turned opinions about output quality into a number people argued about instead.",
    meta: "Evals · 20TK",
  },
  {
    no: "03",
    title: "Teaching TK people to write for a model",
    dek: "The course that became Prompting Mastery, and what changed in the work of the people who finished it.",
    meta: "Enablement · 20TK",
  },
];

const frameworks = [
  ["The five tenets", "A working grammar for prompts that survives model upgrades."],
  ["Context before cleverness", "What goes into the window matters more than how you ask."],
  ["The harness is the product", "Loops, tools and state, not the model, decide whether it ships."],
  ["Brain protocol", "How I run several personal knowledge systems without them rotting."],
];

const talks = [
  ["TK 2026", "Talk title TK", "Venue TK"],
  ["TK 2026", "Talk title TK", "Venue TK"],
  ["TK 2025", "Talk title TK", "Venue TK"],
];

const css = `
.ed { --paper:#FAF7F2; --ink:#221F1B; --ink2:#5E574E; --rule:#221F1B; --hair:#D9D1C4; --spot:#C75B39;
  position:fixed; inset:0; z-index:100; overflow-y:auto; background:var(--paper); color:var(--ink);
  font-family:'Fraunces',serif; font-variation-settings:'opsz' 14; font-size:19px; line-height:1.55; }
.ed a { color:inherit; text-decoration:none; }
.ed .wrap { max-width:1280px; margin:0 auto; padding:0 40px; }
.ed .grid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); column-gap:24px; }
.ed .meta { font-family:'Source Sans 3',sans-serif; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--ink2); }
.ed .rule { border:0; border-top:1px solid var(--rule); margin:0; }
.ed .hair { border:0; border-top:1px solid var(--hair); margin:0; }
.ed .display { font-variation-settings:'opsz' 144; font-weight:300; letter-spacing:-.025em; }
.ed .ital { font-style:italic; }
.ed .spot { color:var(--spot); }
.ed .ul { background-image:linear-gradient(currentColor,currentColor); background-size:100% 1px; background-repeat:no-repeat; background-position:0 100%; }
.ed .row:hover .rowtitle { color:var(--spot); }
.ed .nav a { margin-left:28px; }
.ed .nav a:hover { color:var(--spot); }
@media (max-width:800px){
  .ed { font-size:17px; }
  .ed .wrap { padding:0 16px; }
  .ed .grid > * { grid-column:1 / -1 !important; }
  .ed .nav a { margin-left:0; margin-right:18px; }
  .ed .hide-sm { display:none; }
}
`;

export default function ProtoEditorial() {
  useTitle("Prototype: Editorial");

  return (
    <div className="ed">
      <style>{css}</style>
      <div className="wrap">
        {/* Masthead */}
        <header className="grid" style={{ paddingTop: 28, paddingBottom: 14, alignItems: "baseline" }}>
          <div style={{ gridColumn: "1 / 5" }}>
            <span style={{ fontSize: 20, fontWeight: 500 }}>Xiong Zhi Lim</span>
          </div>
          <nav className="nav meta" style={{ gridColumn: "5 / 13", textAlign: "right" }}>
            <a href="#work">Work</a>
            <a href="#frameworks">Frameworks</a>
            <a href="#speaking">Speaking</a>
            <a href="#elsewhere">Courses</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        <hr className="rule" />

        {/* Lede */}
        <section className="grid" style={{ paddingTop: 96, paddingBottom: 120 }}>
          <div style={{ gridColumn: "1 / 2" }} className="meta hide-sm">
            No. 1
          </div>
          <h1 className="display" style={{ gridColumn: "2 / 11", fontSize: "clamp(44px, 7.2vw, 104px)", lineHeight: 1.0, margin: 0 }}>
            I take AI out of the demo and into the <span className="ital spot">work</span> that people actually do on a Tuesday.
          </h1>
          <aside style={{ gridColumn: "8 / 13", marginTop: 56, fontSize: 18, color: "var(--ink2)" }}>
            <p style={{ margin: 0 }}>
              Deployment strategy, deployed product work and the teaching that makes new tools stick, for teams who have already bought the model and are now wondering why nothing has changed.
            </p>
            <p className="meta" style={{ marginTop: 20 }}>
              Open to roles, paid projects and talks · Location TK / remote
            </p>
          </aside>
        </section>

        {/* Selected work */}
        <section id="work">
          <div className="grid" style={{ alignItems: "baseline", paddingBottom: 12 }}>
            <h2 className="meta" style={{ gridColumn: "1 / 5", margin: 0, color: "var(--ink)" }}>Selected work</h2>
            <span className="meta hide-sm" style={{ gridColumn: "9 / 13", textAlign: "right" }}>Case studies, with outcomes</span>
          </div>
          <hr className="rule" />
          {work.map((w) => (
            <a key={w.no} href="#" className="row" style={{ display: "block" }}>
              <div className="grid" style={{ paddingTop: 36, paddingBottom: 40 }}>
                <span className="display spot" style={{ gridColumn: "1 / 2", fontSize: 28 }}>{w.no}</span>
                <h3 className="display rowtitle" style={{ gridColumn: "2 / 8", fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.08, margin: 0, transition: "color .2s" }}>
                  {w.title}
                </h3>
                <div style={{ gridColumn: "9 / 13" }}>
                  <p style={{ margin: 0, color: "var(--ink2)", fontSize: 17 }}>{w.dek}</p>
                  <p className="meta" style={{ marginTop: 16 }}>{w.meta}</p>
                </div>
              </div>
              <hr className="hair" />
            </a>
          ))}
        </section>

        {/* Pull quote */}
        <section className="grid" style={{ paddingTop: 140, paddingBottom: 140 }}>
          <blockquote className="display ital" style={{ gridColumn: "4 / 12", fontSize: "clamp(30px, 3.6vw, 52px)", lineHeight: 1.15, margin: 0, position: "relative" }}>
            <span className="spot hide-sm" style={{ position: "absolute", left: "-0.55em", top: "-0.05em" }}>“</span>
            A model that nobody trusts on Monday is a model that nobody uses on Friday, so the first thing I build is never the agent, it is the evidence.
            <footer className="meta" style={{ fontStyle: "normal", marginTop: 28 }}>From a talk, TK</footer>
          </blockquote>
        </section>

        {/* Frameworks: two-column index, narrow label column on the left */}
        <section id="frameworks" className="grid">
          <div style={{ gridColumn: "1 / 4" }}>
            <hr className="rule" />
            <h2 className="meta" style={{ margin: "12px 0 0", color: "var(--ink)" }}>Frameworks</h2>
            <p style={{ fontSize: 16, color: "var(--ink2)", marginTop: 12, maxWidth: 240 }}>
              Reusable ways of thinking I bring into every engagement.
            </p>
          </div>
          <div style={{ gridColumn: "5 / 13" }}>
            <hr className="rule" />
            {frameworks.map(([t, d]) => (
              <div key={t}>
                <div className="grid" style={{ gridTemplateColumns: "repeat(8,minmax(0,1fr))", padding: "22px 0" }}>
                  <span className="display" style={{ gridColumn: "1 / 5", fontSize: 26, lineHeight: 1.2 }}>{t}</span>
                  <span style={{ gridColumn: "5 / 9", fontSize: 17, color: "var(--ink2)" }}>{d}</span>
                </div>
                <hr className="hair" />
              </div>
            ))}
          </div>
        </section>

        {/* Speaking: set like a table of dates, no boxes */}
        <section id="speaking" className="grid" style={{ paddingTop: 120 }}>
          <div style={{ gridColumn: "1 / 4" }}>
            <hr className="rule" />
            <h2 className="meta" style={{ margin: "12px 0 0", color: "var(--ink)" }}>Speaking</h2>
          </div>
          <div style={{ gridColumn: "5 / 13" }}>
            <hr className="rule" />
            {talks.map(([date, title, venue], i) => (
              <div key={i}>
                <div className="grid" style={{ gridTemplateColumns: "repeat(8,minmax(0,1fr))", padding: "18px 0", alignItems: "baseline" }}>
                  <span className="meta" style={{ gridColumn: "1 / 2" }}>{date}</span>
                  <span className="ital" style={{ gridColumn: "2 / 6", fontSize: 22 }}>{title}</span>
                  <span style={{ gridColumn: "6 / 9", fontSize: 16, color: "var(--ink2)", textAlign: "right" }}>{venue}</span>
                </div>
                <hr className="hair" />
              </div>
            ))}
            <p style={{ marginTop: 20, fontSize: 17 }}>
              <a href="#" className="ul">Watch raw footage</a>
              <span style={{ margin: "0 14px", color: "var(--hair)" }}>/</span>
              <a href="#" className="ul">Speaker kit</a>
            </p>
          </div>
        </section>

        {/* Subordinate proof: set small, like the back pages */}
        <section id="elsewhere" className="grid" style={{ paddingTop: 140 }}>
          <div style={{ gridColumn: "1 / 13" }}><hr className="rule" /></div>
          <h2 className="meta" style={{ gridColumn: "1 / 4", margin: "12px 0 0", color: "var(--ink)" }}>Also on this site</h2>
          <div style={{ gridColumn: "5 / 13", columnCount: 2, columnGap: 24, marginTop: 12, fontSize: 17 }}>
            <p style={{ marginTop: 0, breakInside: "avoid" }}>
              <a href="/ai/prompt-engineering" className="ul">Prompting Mastery</a>, an eight-module course, with context and harness engineering alongside it.
            </p>
            <p style={{ breakInside: "avoid" }}>
              <a href="/digital-brain" className="ul">Digital Brain</a>, the system I think inside.
            </p>
            <p style={{ breakInside: "avoid", color: "var(--ink2)" }}>
              <span className="ital">Life</span> and <span className="ital">Journal</span>, coming soon, and signposted here so you know they are on the way.
            </p>
          </div>
        </section>

        {/* Contact as the last big line of type */}
        <section id="contact" className="grid" style={{ paddingTop: 160, paddingBottom: 48 }}>
          <div className="meta hide-sm" style={{ gridColumn: "1 / 2" }}>Write</div>
          <p className="display" style={{ gridColumn: "2 / 13", fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02, margin: 0 }}>
            If you have a model and a team that has not met yet, <a href="#" className="ul spot ital">write to me</a>.
          </p>
        </section>
        <hr className="rule" />
        <footer className="grid meta" style={{ padding: "16px 0 40px" }}>
          <span style={{ gridColumn: "1 / 5" }}>© {new Date().getFullYear()} Xiong Zhi Lim</span>
          <span style={{ gridColumn: "5 / 10" }}>Set in Fraunces, with Source Sans 3 for small labels</span>
          <span style={{ gridColumn: "10 / 13", textAlign: "right" }}>
            <a href="#">LinkedIn</a>
          </span>
        </footer>
      </div>
    </div>
  );
}
