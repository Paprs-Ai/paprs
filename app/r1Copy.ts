import type { Language } from "./i18n/language.types";

export type R1Lang = "en" | "es" | "ca";

export function r1Lang(lang: Language): R1Lang {
  if (lang === "es" || lang === "ca") return lang;
  return "en";
}

export const r1Copy = {
  en: {
    navMaze: "The maze",
    navPaprs: "Paprs",
    navWaitlist: "Waitlist",
    joinWaitlist: "Join the waitlist",
    slide1Kicker: "Newcomers and Spanish citizens",
    slide1H1: "Nobody tells you what to do first — or in what order.",
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
      "Paprs is in closed beta. Waitlist on this page. Madrid and Barcelona. English, Spanish, and Catalan.",
    waitlistPurpose: "We only use this email to add you to the waitlist.",
    privacy: "Privacy",
    terms: "Terms",
  },
  es: {
    navMaze: "El laberinto",
    navPaprs: "Paprs",
    navWaitlist: "Lista de espera",
    joinWaitlist: "Apúntate a la lista de espera",
    slide1Kicker: "Quien llega y quien ya es ciudadano",
    slide1H1: "Nadie te dice qué va primero, ni en qué orden.",
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
      "Paprs está en beta cerrada. Lista de espera en esta página. Madrid y Barcelona. Inglés, español y catalán.",
    waitlistPurpose: "Usamos este correo solo para añadirte a la lista de espera.",
    privacy: "Privacidad",
    terms: "Términos",
  },
  ca: {
    navMaze: "El laberint",
    navPaprs: "Paprs",
    navWaitlist: "Llista d'espera",
    joinWaitlist: "Apunta't a la llista d'espera",
    slide1Kicker: "Qui arriba i qui ja és ciutadà",
    slide1H1: "Ningú no et diu què va primer, ni en quin ordre.",
    slide1Line:
      "NIE, TIE, padró Madrid, padró Barcelona, certificat UE. El tràmit no és opcional. Madrid no és Barcelona.",
    llm: "Un model inventa un camí. L'administració vol un formulari, una oficina, un ordre.",
    slide2H1: "El teu següent tràmit oficial a Espanya — formulari a punt, tu presentes.",
    slide2Line: "No és gestoria. No és una seu. No presentem. Tu revises. Tu presentes.",
    nodeYou: "Tu",
    nodeNext: "Següent pas",
    nodeSubmit: "Tu presentes",
    micro: "Beta tancada. Madrid i Barcelona. Tu presentes.",
    emailPh: "Correu",
    joining: "Apuntant",
    onList: "Ets a la llista",
    err: "No s'ha pogut apuntar. Torna-ho a provar.",
    unexpected: "Alguna cosa ha fallat. Torna-ho a provar.",
    footerNote:
      "Paprs està en beta tancada. Llista d'espera en aquesta pàgina. Madrid i Barcelona. Anglès, espanyol i català.",
    waitlistPurpose: "Només fem servir aquest correu per afegir-te a la llista d'espera.",
    privacy: "Privadesa",
    terms: "Termes",
  },
} as const;

export function tR1(lang: Language) {
  return r1Copy[r1Lang(lang)];
}
