"use client";

import { useLanguage } from "../context/LanguageContext";
import { tR1 } from "../r1Copy";

const STAMPS = [
  { label: "NIE", cls: "r1-s-nie" },
  { label: "padrón", cls: "r1-s-padron" },
  { label: "TIE", cls: "r1-s-tie" },
  { label: "alta", cls: "r1-s-alta" },
  { label: "MAD", cls: "r1-s-mad" },
  { label: "BCN", cls: "r1-s-bcn" },
  { label: "EU", cls: "r1-s-eu" },
] as const;

function Maze() {
  return (
    <div className="r1-maze" aria-hidden="true">
      <svg
        className="r1-maze-svg"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="r1-path" d="M90 95h210l80-40 170 70 160-50 170 90" />
        <path className="r1-path r1-path-b" d="M130 290 280 160 470 240 640 140 820 210 910 90" />
        <path className="r1-path" d="M70 430 200 310 360 390 520 280 690 360 860 300" />
        <path className="r1-path r1-path-b" d="M110 560 250 470 410 540 590 430 760 520 930 410" />
        <path className="r1-path" d="M90 95v200l70 90v175" />
        <path className="r1-path r1-path-b" d="M300 55v240l40 90v160" />
        <path className="r1-path" d="M550 125v155l-30 100v180" />
        <path className="r1-path r1-path-b" d="M820 90v220l40 80v140" />
        <path className="r1-path" d="M40 210h180 220 200 240" />
        <path className="r1-path r1-path-b" d="M180 160 470 240 820 210" />
        <path className="r1-path" d="M130 290 410 540 760 520" />
        <path className="r1-path r1-path-b" d="M910 90 760 520 140 560" />
      </svg>
      {STAMPS.map((s) => (
        <span key={s.label} className={`r1-stamp ${s.cls}`}>
          {s.label}
        </span>
      ))}
    </div>
  );
}

export default function R1Slides() {
  const { language } = useLanguage();
  const c = tR1(language);

  return (
    <div className="r1-deck">
      <section id="maze" className="r1-slide r1-slide-1" aria-label={c.navMaze}>
        <Maze />
        <div className="r1-copy">
          <p className="r1-kicker">{c.slide1Kicker}</p>
          <h2 className="r1-h1">{c.slide1H1}</h2>
          <p className="r1-line-copy">{c.slide1Line}</p>
          <p className="r1-llm">{c.llm}</p>
        </div>
      </section>

      <section id="paprs" className="r1-slide r1-slide-2" aria-label={c.navPaprs}>
        <div className="r1-copy">
          <h1 className="r1-h1">{c.slide2H1}</h1>
          <div className="r1-nodes">
            <div className="r1-node">
              <span className="r1-node-i">01</span>
              {c.nodeYou}
            </div>
            <div className="r1-node">
              <span className="r1-node-i">02</span>
              {c.nodeNext}
            </div>
            <div className="r1-node r1-node-last">
              <span className="r1-node-i">03</span>
              {c.nodeSubmit}
            </div>
          </div>
          <p className="r1-line-copy">{c.slide2Line}</p>
        </div>
      </section>
    </div>
  );
}
