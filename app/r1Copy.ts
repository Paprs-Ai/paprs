import type { Language } from "./i18n/language.types";

export type R1Lang = "en" | "es";

export function r1Lang(lang: Language): R1Lang {
  return lang === "es" ? "es" : "en";
}

export const r1Copy = {
  en: {
    navMaze: "The maze",
    navPaprs: "Paprs",
    navWaitlist: "Waitlist",
    joinWaitlist: "Join the waitlist",
    slide1Kicker: "The first year in Spain",
    slide1H1: "Nobody tells you what to do first. Or what happens if you don't.",
    slide1Line:
      "NIE, TIE, padrón Madrid, padrón Barcelona, EU registration. The trámite is not optional. Madrid is not Barcelona.",
    llm: "A model invents a path. The administration wants one form, one office, one order.",
    slide2H1: "Your next official step in Spain — form ready, you submit.",
    slide2Line: "Not a gestoría. Not a sede. We do not file. You review. You submit.",
    nodeYou: "You",
    nodeNext: "Next step",
    nodeSubmit: "You submit",
    micro: "Closed beta. Madrid and Barcelona. You submit.",
    emailPh: "Email",
    joining: "Joining",
    onList: "You are on the list",
    err: "Could not join. Try again.",
    unexpected: "Something went wrong. Try again.",
    footerNote:
      "Paprs is in closed beta. Waitlist on this page. Madrid and Barcelona. English and Spanish.",
    privacy: "Privacy",
    terms: "Terms",
  },
  es: {
    navMaze: "El laberinto",
    navPaprs: "Paprs",
    navWaitlist: "Lista de espera",
    joinWaitlist: "Apúntate a la lista de espera",
    slide1Kicker: "El primer año en España",
    slide1H1: "Nadie te dice qué va primero. Ni qué pasa si no lo haces.",
    slide1Line:
      "NIE, TIE, padrón Madrid, padrón Barcelona, certificado UE. El trámite no es opcional. Madrid no es Barcelona.",
    llm: "Un modelo inventa un camino. La administración quiere un formulario, una oficina, un orden.",
    slide2H1: "Tu siguiente trámite oficial en España — formulario listo, tú presentas.",
    slide2Line: "No es gestoría. No es una sede. No presentamos. Tú revisas. Tú presentas.",
    nodeYou: "Tú",
    nodeNext: "Siguiente paso",
    nodeSubmit: "Tú presentas",
    micro: "Beta cerrada. Madrid y Barcelona. Tú presentas.",
    emailPh: "Correo",
    joining: "Apuntando",
    onList: "Estás en la lista",
    err: "No se pudo apuntar. Inténtalo de nuevo.",
    unexpected: "Algo falló. Inténtalo de nuevo.",
    footerNote:
      "Paprs está en beta cerrada. Lista de espera en esta página. Madrid y Barcelona. Inglés y español.",
    privacy: "Privacidad",
    terms: "Términos",
  },
} as const;

export function tR1(lang: Language) {
  return r1Copy[r1Lang(lang)];
}
