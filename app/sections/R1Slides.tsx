"use client";

import { useLanguage } from "../context/LanguageContext";
import { tR1 } from "../r1Copy";
import R1Waitlist from "./R1Waitlist";

const STAMPS = [
  { label: "NIE", cls: "r1-s-nie" },
  { label: "padrón", cls: "r1-s-padron" },
  { label: "TIE", cls: "r1-s-tie" },
  { label: "MAD", cls: "r1-s-mad" },
  { label: "BCN", cls: "r1-s-bcn" },
] as const;

function Maze() {
  return (
    <div className="r1-maze" aria-hidden="true">
      <i className="r1-line r1-l1" />
      <i className="r1-line r1-l2" />
      <i className="r1-line r1-l3" />
      <i className="r1-line r1-l4" />
      <i className="r1-line r1-l5" />
      <i className="r1-line r1-l6" />
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
      <section id="maze" className="r1-slide" aria-label={c.navMaze}>
        <Maze />
        <div className="r1-copy">
          <p className="r1-kicker">{c.slide1Kicker}</p>
          <h2 className="r1-h1">{c.slide1H1}</h2>
          <p className="r1-p">{c.slide1P1}</p>
          <p className="r1-p">{c.slide1P2}</p>
          <p className="r1-p">{c.slide1P3}</p>
          <p className="r1-p">{c.slide1P4}</p>
          <p className="r1-llm">{c.llm}</p>
        </div>
      </section>

      <section id="paprs" className="r1-slide r1-slide-2" aria-label={c.navPaprs}>
        <div className="r1-copy">
          <h1 className="r1-h1">{c.slide2H1}</h1>
          <p className="r1-p">{c.slide2Lead}</p>
          <p className="r1-p">{c.slide2P1}</p>
          <p className="r1-p">{c.notGestor}</p>
          <p className="r1-p">{c.audience}</p>
          <R1Waitlist />
          <p className="r1-note">{c.footerNote}</p>
        </div>
      </section>
    </div>
  );
}
