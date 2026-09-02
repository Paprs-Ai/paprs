"use client";

import { useLanguage } from "../context/LanguageContext";
import { tR1 } from "../r1Copy";
import R1Waitlist from "./R1Waitlist";

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
      <svg className="r1-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="r1-path" d="M8 18 L32 22 L48 14 L72 28 L88 20" />
        <path className="r1-path r1-path-b" d="M12 42 L28 38 L44 52 L61 46 L84 58" />
        <path className="r1-path" d="M18 78 L36 64 L52 72 L70 60 L90 74" />
        <path className="r1-path r1-path-b" d="M22 12 L26 48 L40 80" />
        <path className="r1-path" d="M68 10 L62 44 L78 82" />
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
      <div className="r1-ticks" aria-hidden="true">
        <a href="#maze" className="r1-tick" />
        <a href="#paprs" className="r1-tick" />
      </div>

      <section id="maze" className="r1-slide" aria-label={c.navMaze}>
        <Maze />
        <div className="r1-copy r1-copy-1">
          <p className="r1-kicker">{c.slide1Kicker}</p>
          <h2 className="r1-h1">{c.slide1H1}</h2>
          <p className="r1-p">{c.slide1Line}</p>
          <p className="r1-llm">{c.llm}</p>
        </div>
      </section>

      <section id="paprs" className="r1-slide r1-slide-2" aria-label={c.navPaprs}>
        <div className="r1-copy">
          <h1 className="r1-h1">{c.slide2H1}</h1>
          <ol className="r1-nodes">
            <li>{c.nodeYou}</li>
            <li>{c.nodeNext}</li>
            <li>{c.nodeSubmit}</li>
          </ol>
          <p className="r1-p">{c.slide2Line}</p>
          <R1Waitlist />
          <p className="r1-note">{c.footerNote}</p>
        </div>
      </section>
    </div>
  );
}
