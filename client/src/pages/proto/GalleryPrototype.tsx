/*
 * PROTOTYPE, throwaway (issue #10, map #2). Direction: WORK-FIRST GALLERY.
 * Three variants of a work-first home on /proto/gallery, switchable via ?variant=A|B|C
 * or the floating bar / arrow keys.
 *
 * The work fills the screen; chrome is a name and a contact link. Images are
 * viewport screenshots of this site's own pages, standing in for real
 * case-study imagery. Captions are placeholders, not final copy.
 *
 * From The Workshop, kept: ink + cream as ground and figure, terracotta as a
 * single accent (index numerals, active marker), Fraunces at display sizes in
 * a light weight, Fira Code for metadata.
 * Thrown away: sage/gold/sienna/parchment, Source Sans 3, rounded corners,
 * cards, icon badges, borders, shadows, gradients, blur.
 */
import { useState } from "react";
import PrototypeSwitcher, { useVariant } from "@/components/PrototypeSwitcher";

const INK = "oklch(0.17 0.01 50)";
const CREAM = "oklch(0.97 0.01 85)";
const TERRACOTTA = "#C75B39";
const serif = { fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 144" };
const mono = { fontFamily: "'Fira Code', monospace" };

const work = [
  { img: "prompting", title: "Prompting Mastery", line: "Eight modules on the craft of asking.", kind: "Course" },
  { img: "brain", title: "A brain you can fork", line: "The public repo my agent reads alongside me.", kind: "System" },
  { img: "context", title: "Context Engineering", line: "What the model sees, and why.", kind: "Course" },
  { img: "harness", title: "Harness Engineering", line: "The system built around the model.", kind: "Course" },
  { img: "design", title: "The Workshop", line: "A living style guide for this site.", kind: "Design" },
];
const src = (name: string) => `/proto/gallery/${name}.jpg`;
const num = (i: number) => String(i + 1).padStart(2, "0");

function Chrome() {
  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex justify-between px-6 py-5 text-sm pointer-events-none"
      style={{ ...mono, color: CREAM, mixBlendMode: "difference" }}
    >
      <span className="pointer-events-auto">Xiong Zhi Lim</span>
      <a className="pointer-events-auto underline underline-offset-4" href="#contact">
        Contact
      </a>
    </div>
  );
}

/* A: Wall. One project per viewport, stacked. Caption sits on the work itself. */
function VariantA() {
  return (
    <main style={{ background: INK }}>
      <Chrome />
      {work.map((w, i) => (
        <section key={w.img} className="relative h-screen w-full overflow-hidden">
          <img src={src(w.img)} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div
            className="absolute left-6 right-6 bottom-8 flex items-end justify-between gap-8"
            style={{ color: CREAM, mixBlendMode: "difference" }}
          >
            <h2 className="leading-[0.9] tracking-tight font-light text-[clamp(3rem,9vw,9rem)]" style={serif}>
              {w.title}
            </h2>
            <span className="text-sm pb-3 whitespace-nowrap" style={mono}>
              {num(i)} / {num(work.length - 1)}
            </span>
          </div>
        </section>
      ))}
    </main>
  );
}

/* B: Reel. Horizontal, one screen at a time; the work above, a single caption line below. */
function VariantB() {
  return (
    <main
      className="h-screen w-screen flex overflow-x-auto snap-x snap-mandatory"
      style={{ background: INK, color: CREAM }}
      onWheel={(e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY;
      }}
    >
      <Chrome />
      {work.map((w, i) => (
        <section key={w.img} className="snap-start shrink-0 w-screen h-screen flex flex-col">
          <img src={src(w.img)} alt="" className="w-full h-[74vh] object-cover object-top" />
          <div className="flex-1 flex items-center justify-between gap-10 px-6">
            <div className="flex items-baseline gap-6">
              <span className="text-lg" style={{ ...mono, color: TERRACOTTA }}>{num(i)}</span>
              <h2 className="font-light leading-none tracking-tight text-[clamp(2.5rem,6vw,6rem)]" style={serif}>
                {w.title}
              </h2>
            </div>
            <p className="hidden md:block max-w-xs text-right text-sm opacity-70" style={mono}>
              {w.kind}. {w.line}
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}

/* C: Index. Titles as the only navigation; hovering one puts its work on the stage. */
function VariantC() {
  const [active, setActive] = useState(0);
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row overflow-hidden" style={{ background: INK, color: CREAM }}>
      <Chrome />
      <ol className="md:w-[42%] flex flex-col justify-end gap-1 px-6 pb-10 pt-24">
        {work.map((w, i) => (
          <li
            key={w.img}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            className="cursor-default flex items-baseline gap-4 transition-opacity duration-200 outline-none"
            style={{ opacity: active === i ? 1 : 0.28 }}
          >
            <span className="text-xs w-6" style={{ ...mono, color: active === i ? TERRACOTTA : CREAM }}>
              {num(i)}
            </span>
            <span className="font-light leading-[1.02] tracking-tight text-[clamp(2rem,4.2vw,4.5rem)]" style={serif}>
              {w.title}
            </span>
          </li>
        ))}
        <p className="mt-6 pl-10 text-sm opacity-70" style={mono}>
          {work[active].kind}. {work[active].line}
        </p>
      </ol>
      <div className="relative flex-1 min-h-[40vh]">
        {work.map((w, i) => (
          <img
            key={w.img}
            src={src(w.img)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-300"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </main>
  );
}

const variants = [
  { key: "A", name: "Wall" },
  { key: "B", name: "Reel" },
  { key: "C", name: "Index" },
];

export default function GalleryPrototype() {
  const v = useVariant(variants.map((x) => x.key));
  return (
    <>
      {v === "A" && <VariantA />}
      {v === "B" && <VariantB />}
      {v === "C" && <VariantC />}
      <PrototypeSwitcher variants={variants} current={v} />
    </>
  );
}
