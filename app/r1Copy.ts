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
    slide1P1:
      "The first year in Spain is a sequence of official steps that gate the rest of life. Housing, work, a bank account, healthcare, a phone — each one waits on a paper you were supposed to already have.",
    slide1P2:
      "The work is not optional. You still have to do it if the pages are in Spanish, if two forums disagree, and if the office sends you away for the form you did not know was next.",
    slide1P3:
      "NIE, padrón, TIE or EU registration. The names are public. The order is not. It changes with your passport, why you are here, your city, your family, and what you already hold. Madrid is not Barcelona. A Spanish or EU citizen hitting padrón or an alta is in the same maze — this is not an expats-only problem.",
    slide1P4:
      "Every official page explains one trámite. None of them explain yours. Get the order wrong and you burn a cita and weeks.",
    llm:
      "A model invents a path. The administration wants one form, one office, one order. ChatGPT, Claude, or Perplexity will answer a Spain question. They will not hold your situation, keep Madrid distinct from Barcelona, or refuse a form that is not yours.",
    slide2H1: "Your next official step in Spain — form ready, you submit.",
    slide2Lead: "Paprs turns your situation into the next official step in Spain.",
    slide2P1:
      "You say where you stand. Paprs puts the work in order for Madrid or Barcelona — NIE if you need it, padrón, TIE or EU registration — and gets the form ready. You review. You submit: at the office, on the official site, or however that trámite actually works.",
    notGestor:
      "Not a gestoría. Not a lawyer. Not a representative. We do not file, we do not hold a poder, we do not book Cita Previa. If you want a human to present for you, that person is not us.",
    audience:
      "English and Spanish. Newcomers and residents, including Spanish and EU citizens. Closed beta on a waitlist. Not generally live.",
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
    slide1P1:
      "El primer año en España es una secuencia de trámites oficiales que abren o cierran el resto de la vida. Vivienda, trabajo, banco, sanidad, teléfono: cada uno espera un papel que se supone que ya tenías.",
    slide1P2:
      "No es opcional. Hay que hacerlo aunque las páginas estén en un idioma que no es el tuyo, aunque dos foros se contradigan, y aunque la oficina te despache por el impreso que no sabías que iba después.",
    slide1P3:
      "NIE, padrón, TIE o certificado de ciudadano de la UE. Los nombres son públicos. El orden no. Cambia con el pasaporte, el motivo de estancia, la ciudad, la familia y lo que ya tienes. Madrid no es Barcelona. Quien es español o ciudadano de la UE y choca con el padrón o un alta está en el mismo laberinto: esto no es un problema solo de expats.",
    slide1P4:
      "Cada sede explica un trámite. Ninguna explica el tuyo. Si fallas el orden, quemas una cita y semanas.",
    llm:
      "Un modelo inventa un camino. La administración quiere un formulario, una oficina, un orden. ChatGPT, Claude o Perplexity responden una pregunta sobre España. No sostienen tu caso, no separan Madrid de Barcelona, ni descartan el impreso que no te corresponde.",
    slide2H1: "Tu siguiente trámite oficial en España — formulario listo, tú presentas.",
    slide2Lead: "Paprs convierte tu situación en el siguiente trámite oficial en España.",
    slide2P1:
      "Cuentas dónde estás. Paprs ordena el trabajo para Madrid o Barcelona — NIE si te hace falta, padrón, TIE o certificado UE — y deja el formulario listo. Tú revisas. Tú presentas: en la oficina, en la sede, o como se presente ese trámite de verdad.",
    notGestor:
      "No es gestoría. No es un despacho. No es representación. No presentamos, no tenemos poder, no reservamos Cita Previa. Si quieres que alguien presente en tu nombre, esa persona no somos nosotros.",
    audience:
      "Inglés y español. Quien acaba de llegar y quien ya vive aquí, también ciudadanos españoles y de la UE. Beta cerrada, lista de espera. No está abierto al público.",
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
