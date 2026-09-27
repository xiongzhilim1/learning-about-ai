// PROTOTYPE, throw away. Issue #10 (map #2): design direction off the AI-generated look.
// Direction: TECHNICAL INSTRUMENT. Monospace-led, dense, tabular, borders not shadows.
// Three variants of a portfolio home on /proto/instrument, switchable via ?variant=A|B|C.
// Renders as a fixed full-viewport layer so the current SiteShell header/footer stay out of the comparison.
// All outcomes and numbers below are placeholders ([brackets] / TBD), not facts.
//
// Kept from The Workshop: off-white canvas (as paper), ink #2D2A26, terracotta #C75B39 as the single
// signal colour, sage demoted to a status light only, Fira Code promoted to the lead face.
// Thrown away: Fraunces, Source Sans 3, rounded cards, icon badges, soft gradients, shadows, blur.

import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";

const C = {
  paper: "#F7F4EE",
  paper2: "#EFEAE1",
  ink: "#2D2A26",
  ink2: "#6B655D",
  rule: "#2D2A26",
  hair: "#CFC7BA",
  signal: "#C75B39",
  ok: "#7B9E87",
};
const MONO = "'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace";

// ---------- shared placeholder content ----------

const ME = {
  name: "Xiong Zhi Lim",
  line: "AI strategy and deployment. I take agents from a demo to a system a business runs on.",
  now: "Client Solutions Director, Meta, Greater China e-commerce",
  base: "[city]",
  open: ["AI strategy roles", "Deployed PM", "Deployment Strategist", "Paid projects", "Speaking"],
};

type Row = { id: string; type: "case" | "framework" | "talk" | "course" | "system"; title: string; outcome: string; year: string; status: "live" | "draft" | "soon" };

const ROWS: Row[] = [
  { id: "CS-01", type: "case", title: "Agent deployment for [client], e-commerce ops", outcome: "[metric] +[x]%", year: "2026", status: "draft" },
  { id: "CS-02", type: "case", title: "Eval harness for [workflow], from pilot to prod", outcome: "[metric] -[x]%", year: "2026", status: "draft" },
  { id: "CS-03", type: "case", title: "[Org] AI adoption plan, [n] teams", outcome: "[outcome] TBD", year: "2025", status: "draft" },
  { id: "FW-01", type: "framework", title: "Brain protocol: team and org brain formation", outcome: "reusable spec", year: "2026", status: "live" },
  { id: "FW-02", type: "framework", title: "Deployment readiness checklist", outcome: "[n] uses TBD", year: "2026", status: "draft" },
  { id: "SY-01", type: "system", title: "Digital Brain: a second brain with opinions", outcome: "running daily", year: "2026", status: "live" },
  { id: "CO-01", type: "course", title: "Prompting Mastery, 8 modules", outcome: "published", year: "2026", status: "live" },
  { id: "CO-02", type: "course", title: "Context engineering", outcome: "published", year: "2026", status: "live" },
  { id: "CO-03", type: "course", title: "Harness engineering", outcome: "published", year: "2026", status: "live" },
  { id: "TK-01", type: "talk", title: "[Talk title], [event]", outcome: "footage TBD", year: "2026", status: "draft" },
  { id: "TK-02", type: "talk", title: "[Talk title], [event]", outcome: "footage TBD", year: "2025", status: "draft" },
];

const SOON = [
  { path: "/life", note: "coming soon" },
  { path: "/journal", note: "coming soon" },
];

const CONTACT = [
  { k: "email", v: "[address]" },
  { k: "linkedin", v: "linkedin.com/in/[handle]" },
  { k: "booking", v: "[speaker kit link]" },
];

function Dot({ s }: { s: Row["status"] }) {
  const color = s === "live" ? C.ok : s === "draft" ? C.signal : C.hair;
  return <span style={{ display: "inline-block", width: 7, height: 7, background: color, marginRight: 6, verticalAlign: "middle" }} />;
}

// ---------- A: Datasheet ----------
// Reads like a component spec sheet: numbered sections in a left gutter, ruled tables, a parameter block up top.

function VariantA() {
  const th = { textAlign: "left" as const, fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.ink2, padding: "6px 10px", borderBottom: `1px solid ${C.rule}` };
  const td = { padding: "7px 10px", borderBottom: `1px solid ${C.hair}`, fontSize: 13, verticalAlign: "top" as const };
  const Section = ({ n, label, children }: { n: string; label: string; children: React.ReactNode }) => (
    <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", borderTop: `1px solid ${C.rule}` }}>
      <div style={{ padding: "14px 16px", borderRight: `1px solid ${C.rule}`, fontSize: 12, color: C.ink2 }}>
        <div style={{ color: C.ink }}>{n}</div>
        <div>{label}</div>
      </div>
      <div style={{ padding: "14px 16px" }}>{children}</div>
    </section>
  );
  return (
    <div style={{ maxWidth: 1080, margin: "32px auto 96px", border: `1px solid ${C.rule}`, background: C.paper }}>
      <header style={{ display: "grid", gridTemplateColumns: "1fr 360px" }}>
        <div style={{ padding: "20px 16px", borderRight: `1px solid ${C.rule}` }}>
          <div style={{ fontSize: 11, color: C.ink2, letterSpacing: "0.08em" }}>DATASHEET / REV 2026.09 / XZL-001</div>
          <h1 style={{ fontFamily: MONO, fontSize: 34, fontWeight: 500, margin: "10px 0 8px", letterSpacing: "-0.02em" }}>{ME.name}</h1>
          <p style={{ fontSize: 15, lineHeight: 1.55, maxWidth: 560, margin: 0 }}>{ME.line}</p>
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
          <tbody>
            {[
              ["now", ME.now],
              ["base", ME.base],
              ["status", <span key="s"><Dot s="live" />available for select work</span>],
              ["contact", <a key="c" href="#contact" style={{ color: C.signal }}>see 06</a>],
            ].map(([k, v], i) => (
              <tr key={i}>
                <td style={{ ...td, fontSize: 12, color: C.ink2, width: 80, borderBottom: `1px solid ${C.hair}` }}>{k}</td>
                <td style={{ ...td, fontSize: 12 }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>

      <Section n="01" label="Applications">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0, border: `1px solid ${C.hair}` }}>
          {ME.open.map((o, i) => (
            <div key={o} style={{ padding: "8px 12px", fontSize: 13, borderRight: i < ME.open.length - 1 ? `1px solid ${C.hair}` : "none" }}>{o}</div>
          ))}
        </div>
      </Section>

      <Section n="02" label="Case studies">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead><tr><th style={th}>id</th><th style={th}>engagement</th><th style={{ ...th, textAlign: "right" }}>measured outcome</th><th style={th}>yr</th></tr></thead>
          <tbody>
            {ROWS.filter((r) => r.type === "case").map((r) => (
              <tr key={r.id}>
                <td style={{ ...td, color: C.ink2, width: 70 }}>{r.id}</td>
                <td style={td}>{r.title}</td>
                <td style={{ ...td, textAlign: "right", color: C.signal, fontVariantNumeric: "tabular-nums" }}>{r.outcome}</td>
                <td style={{ ...td, width: 50 }}>{r.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section n="03" label="Frameworks + systems">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {ROWS.filter((r) => r.type === "framework" || r.type === "system").map((r) => (
              <tr key={r.id}>
                <td style={{ ...td, color: C.ink2, width: 70 }}>{r.id}</td>
                <td style={td}>{r.title}</td>
                <td style={{ ...td, width: 150 }}><Dot s={r.status} />{r.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section n="04" label="Teaching">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {ROWS.filter((r) => r.type === "course").map((r) => (
              <tr key={r.id}>
                <td style={{ ...td, color: C.ink2, width: 70 }}>{r.id}</td>
                <td style={td}>{r.title}</td>
                <td style={{ ...td, width: 150 }}><Dot s={r.status} />{r.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section n="05" label="Talks">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {ROWS.filter((r) => r.type === "talk").map((r) => (
              <tr key={r.id}>
                <td style={{ ...td, color: C.ink2, width: 70 }}>{r.id}</td>
                <td style={td}>{r.title}</td>
                <td style={{ ...td, width: 150 }}><Dot s={r.status} />{r.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <div id="contact">
        <Section n="06" label="Contact">
          <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {CONTACT.map((c) => (
                <tr key={c.k}><td style={{ ...td, color: C.ink2, width: 90 }}>{c.k}</td><td style={td}>{c.v}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>

      <footer style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.rule}`, padding: "8px 16px", fontSize: 11, color: C.ink2 }}>
        <span>{SOON.map((s) => `${s.path} (${s.note})`).join("   ")}</span>
        <span>page 1 of 1</span>
      </footer>
    </div>
  );
}

// ---------- B: Terminal / TUI ----------
// Panes, a status bar, a file tree for nav, number keys to switch panes. Ink ground, paper text.

const PANES = ["README", "work", "frameworks", "teaching", "talks", "contact", "life", "journal"] as const;
type Pane = (typeof PANES)[number];

function VariantB() {
  const [pane, setPane] = useState<Pane>("README");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= PANES.length) setPane(PANES[n - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bg = C.ink, fg = "#EDE7DC", dim = "#948C80", line = "#4A453E";
  const rows = (t: Row["type"][]) => ROWS.filter((r) => t.includes(r.type));
  const Table = ({ items }: { items: Row[] }) => (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr style={{ color: dim }}>
          {["ID", "TITLE", "OUTCOME", "YR", "STATE"].map((h) => <th key={h} style={{ textAlign: "left", fontWeight: 400, padding: "2px 16px 6px 0", borderBottom: `1px dashed ${line}` }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.id}>
            <td style={{ padding: "5px 16px 5px 0", color: dim }}>{r.id}</td>
            <td style={{ padding: "5px 16px 5px 0" }}>{r.title}</td>
            <td style={{ padding: "5px 16px 5px 0", color: r.type === "case" ? C.signal : fg }}>{r.outcome}</td>
            <td style={{ padding: "5px 16px 5px 0", color: dim }}>{r.year}</td>
            <td style={{ padding: "5px 0", color: r.status === "live" ? C.ok : C.signal }}>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const body: Record<Pane, React.ReactNode> = {
    README: (
      <div style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 720 }}>
        <div style={{ color: dim }}># README.md</div>
        <div style={{ fontSize: 26, margin: "8px 0 12px", color: fg }}>{ME.name}</div>
        <p style={{ margin: "0 0 16px" }}>{ME.line}</p>
        <div style={{ color: dim }}>## open to</div>
        {ME.open.map((o) => <div key={o}><span style={{ color: C.signal }}>-</span> {o}</div>)}
        <div style={{ color: dim, marginTop: 16 }}>## now</div>
        <div>{ME.now}</div>
        <div style={{ color: dim, marginTop: 16 }}>## start here</div>
        <div>press <span style={{ color: C.signal }}>2</span> for work, <span style={{ color: C.signal }}>6</span> for contact</div>
      </div>
    ),
    work: <Table items={rows(["case"])} />,
    frameworks: <Table items={rows(["framework", "system"])} />,
    teaching: <Table items={rows(["course"])} />,
    talks: <Table items={rows(["talk"])} />,
    contact: (
      <div style={{ fontSize: 14, lineHeight: 1.9 }}>
        {CONTACT.map((c) => <div key={c.k}><span style={{ color: dim, display: "inline-block", width: 100 }}>{c.k}</span>{c.v}</div>)}
      </div>
    ),
    life: <div style={{ color: dim }}>/life: coming soon. Nothing hidden, just not written yet.</div>,
    journal: <div style={{ color: dim }}>/journal: coming soon.</div>,
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, color: fg, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${line}`, padding: "6px 14px", fontSize: 12, color: dim }}>
        <span><span style={{ color: fg }}>xzl</span>@portfolio:~/{pane === "README" ? "" : pane}</span>
        <span><span style={{ color: C.ok }}>●</span> available for select work</span>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "220px 1fr" }}>
        <nav style={{ borderRight: `1px solid ${line}`, padding: "14px 0", fontSize: 13 }}>
          <div style={{ padding: "0 14px 8px", color: dim }}>~/</div>
          {PANES.map((p, i) => {
            const active = p === pane;
            const soon = p === "life" || p === "journal";
            return (
              <button key={p} onClick={() => setPane(p)} style={{ display: "flex", width: "100%", textAlign: "left", padding: "3px 14px", background: active ? C.signal : "transparent", color: active ? bg : soon ? dim : fg, fontFamily: MONO, fontSize: 13, border: 0, cursor: "pointer" }}>
                <span style={{ width: 22, color: active ? bg : dim }}>{i + 1}</span>
                {p}{p === "README" ? ".md" : "/"}{soon && <span style={{ marginLeft: "auto" }}>soon</span>}
              </button>
            );
          })}
        </nav>
        <main style={{ padding: "18px 24px" }}>
          <div style={{ color: dim, fontSize: 13, marginBottom: 14 }}>$ {pane === "README" ? "cat README.md" : pane === "contact" ? "cat contact" : `ls -l ${pane}/`}</div>
          {body[pane]}
        </main>
      </div>
      <div style={{ display: "flex", gap: 20, borderTop: `1px solid ${line}`, padding: "6px 14px 56px", fontSize: 12, color: dim }}>
        <span>[1-8] pane</span><span>{ROWS.length} entries</span><span>{ROWS.filter((r) => r.status === "live").length} live</span><span style={{ marginLeft: "auto" }}>rev 2026.09</span>
      </div>
    </div>
  );
}

// ---------- C: Ledger ----------
// Everything is one filterable index. Rows expand in place. Identity is one sentence, not a hero.

function VariantC() {
  const types: Row["type"][] = ["case", "framework", "system", "course", "talk"];
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(types.map((t) => [t, true])));
  const [open, setOpen] = useState<string | null>("CS-01");
  const visible = ROWS.filter((r) => on[r.type]);
  const cell = { padding: "9px 12px", borderBottom: `1px solid ${C.hair}`, fontSize: 13, verticalAlign: "top" as const };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 110px", display: "grid", gridTemplateColumns: "1fr 290px", gap: 32 }}>
      <div>
        <div style={{ fontSize: 12, color: C.ink2, marginBottom: 6 }}>{ME.name} / index</div>
        <p style={{ fontSize: 20, lineHeight: 1.45, margin: "0 0 22px", maxWidth: 760 }}>{ME.line}</p>

        <div style={{ display: "flex", gap: 0, border: `1px solid ${C.rule}`, width: "fit-content", marginBottom: 12, fontSize: 12 }}>
          {types.map((t, i) => (
            <button key={t} onClick={() => setOn({ ...on, [t]: !on[t] })} style={{ fontFamily: MONO, fontSize: 12, padding: "5px 10px", border: 0, borderRight: i < types.length - 1 ? `1px solid ${C.rule}` : 0, background: on[t] ? C.ink : "transparent", color: on[t] ? C.paper : C.ink, cursor: "pointer" }}>
              {on[t] ? "[x]" : "[ ]"} {t}
            </button>
          ))}
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%", borderTop: `1px solid ${C.rule}` }}>
          <thead>
            <tr>
              {["", "id", "type", "title", "outcome", "yr", "state"].map((h) => (
                <th key={h} style={{ ...cell, fontSize: 11, fontWeight: 500, color: C.ink2, textAlign: "left", borderBottom: `1px solid ${C.rule}`, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => {
              const isOpen = open === r.id;
              return [
                <tr key={r.id} onClick={() => setOpen(isOpen ? null : r.id)} style={{ cursor: "pointer", background: isOpen ? C.paper2 : "transparent" }}>
                  <td style={{ ...cell, width: 20, color: C.ink2 }}>{isOpen ? "v" : ">"}</td>
                  <td style={{ ...cell, color: C.ink2, width: 64 }}>{r.id}</td>
                  <td style={{ ...cell, color: C.ink2, width: 90 }}>{r.type}</td>
                  <td style={cell}>{r.title}</td>
                  <td style={{ ...cell, color: r.type === "case" ? C.signal : C.ink, whiteSpace: "nowrap" }}>{r.outcome}</td>
                  <td style={{ ...cell, width: 44 }}>{r.year}</td>
                  <td style={{ ...cell, width: 80, whiteSpace: "nowrap" }}><Dot s={r.status} />{r.status}</td>
                </tr>,
                isOpen && (
                  <tr key={r.id + "-d"} style={{ background: C.paper2 }}>
                    <td />
                    <td colSpan={6} style={{ ...cell, paddingBottom: 16 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", rowGap: 4, fontSize: 12 }}>
                        <span style={{ color: C.ink2 }}>problem</span><span>[one line on what was broken]</span>
                        <span style={{ color: C.ink2 }}>move</span><span>[what was deployed, and how]</span>
                        <span style={{ color: C.ink2 }}>result</span><span style={{ color: C.signal }}>{r.outcome}</span>
                        <span style={{ color: C.ink2 }}>read</span><span style={{ textDecoration: "underline" }}>/work/{r.id.toLowerCase()}</span>
                      </div>
                    </td>
                  </tr>
                ),
              ];
            })}
          </tbody>
        </table>
        <div style={{ fontSize: 11, color: C.ink2, marginTop: 8 }}>{visible.length} of {ROWS.length} rows</div>
      </div>

      <aside style={{ position: "sticky", top: 28, alignSelf: "start", border: `1px solid ${C.rule}`, fontSize: 12 }}>
        <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.rule}`, background: C.ink, color: C.paper }}>status</div>
        <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.hair}` }}><Dot s="live" />available for select work</div>
        <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.hair}`, lineHeight: 1.7 }}>
          {ME.open.map((o) => <div key={o}>+ {o}</div>)}
        </div>
        {CONTACT.map((c) => (
          <div key={c.k} style={{ display: "flex", padding: "6px 12px", borderBottom: `1px solid ${C.hair}` }}><span style={{ width: 84, flexShrink: 0, color: C.ink2 }}>{c.k}</span>{c.v}</div>
        ))}
        {SOON.map((s) => (
          <div key={s.path} style={{ display: "flex", padding: "6px 12px", borderBottom: `1px solid ${C.hair}`, color: C.ink2 }}><span style={{ width: 84, flexShrink: 0 }}>{s.path}</span>{s.note}</div>
        ))}
        <div style={{ padding: "6px 12px", color: C.ink2 }}>now: {ME.now}</div>
      </aside>
    </div>
  );
}

// ---------- switcher ----------

const VARIANTS = [
  { key: "A", name: "Datasheet", C: VariantA },
  { key: "B", name: "Terminal", C: VariantB },
  { key: "C", name: "Ledger", C: VariantC },
];

export default function ProtoInstrument() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const key = new URLSearchParams(search).get("variant") ?? "A";
  const idx = Math.max(0, VARIANTS.findIndex((v) => v.key === key));
  const go = (d: number) => navigate(`/proto/instrument?variant=${VARIANTS[(idx + d + VARIANTS.length) % VARIANTS.length].key}`, { replace: true });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const V = VARIANTS[idx].C;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, overflow: "auto", background: C.paper, color: C.ink, fontFamily: MONO }}>
      <V />
      {import.meta.env.DEV && (
        <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 12, background: "#111", color: "#fff", padding: "8px 14px", borderRadius: 999, fontFamily: "system-ui, sans-serif", fontSize: 13, boxShadow: "0 4px 16px rgba(0,0,0,.35)", zIndex: 101 }}>
          <button onClick={() => go(-1)} style={{ color: "#fff", background: "none", border: 0, cursor: "pointer", fontSize: 16 }}>←</button>
          <span>prototype {VARIANTS[idx].key} ({VARIANTS[idx].name})</span>
          <button onClick={() => go(1)} style={{ color: "#fff", background: "none", border: 0, cursor: "pointer", fontSize: 16 }}>→</button>
        </div>
      )}
    </div>
  );
}
