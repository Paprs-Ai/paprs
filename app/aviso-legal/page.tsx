"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function AvisoLegalPage() {
  const { dict, language } = useLanguage();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header
        className="fixed top-3 sm:top-4 left-1/2 z-50 flex w-[calc(100%-1.25rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-black/10 px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:top-4 sm:w-[calc(100%-2rem)] sm:px-6 sm:py-3.5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Link href="/" className="flex items-center hover:opacity-85">
          <span className="text-xl font-extrabold tracking-tighter text-black sm:text-2xl">paprs</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/#waitlist"
            className="flex items-center justify-center rounded-full bg-black px-3.5 py-1 font-mono text-[9px] font-bold tracking-wider text-white uppercase hover:bg-zinc-800 sm:px-4 sm:py-1.5"
          >
            {dict.nav.joinWaitlist}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {language === "es" ? "Volver al inicio" : language === "ca" ? "Tornar a l'inici" : "Back to home"}
        </Link>

        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-700">
          <Scale className="h-3.5 w-3.5 text-black" />
          LSSI-CE Art. 10
        </div>

        <h1 className="font-syne text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
          {language === "es" ? "Aviso Legal" : language === "ca" ? "Avís Legal" : "Legal Notice"}
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-400">
          {language === "es"
            ? "Última actualización: 1 de septiembre de 2026 · Conforme a la Ley 34/2002 (LSSI-CE)"
            : language === "ca"
            ? "Darrera actualització: 1 de setembre de 2026 · Conforme a la Llei 34/2002 (LSSI-CE)"
            : "Last updated: September 1, 2026 · In compliance with Spanish Law 34/2002 (LSSI-CE)"}
        </p>

        <hr className="my-8 border-zinc-200" />

        <div className="space-y-8 text-sm leading-relaxed text-zinc-700">
          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              1. {language === "es" ? "Datos Identificativos del Titular" : language === "ca" ? "Dades Identificatives del Titular" : "Entity Identification"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web:"
                : language === "ca"
                ? "En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), s'informa de les dades identificatives del titular d'aquest lloc web:"
                : "In compliance with Article 10 of Spanish Law 34/2002 of July 11 on Information Society Services and Electronic Commerce (LSSI-CE), the following information details the operator of this website:"}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 font-mono text-xs text-zinc-800">
              <li><strong>Titular:</strong> Paprs AI Technologies S.L. (en constitución / project initiative)</li>
              <li><strong>Dominio:</strong> paprs.app</li>
              <li><strong>Domicilio Social:</strong> Barcelona, España (Spain)</li>
              <li><strong>Contacto legal:</strong> legal@paprs.app</li>
              <li><strong>Contacto privacidad:</strong> privacy@paprs.app</li>
            </ul>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              2. {language === "es" ? "Objeto y Alcance del Servicio" : language === "ca" ? "Objecte i Abast del Servei" : "Purpose and Service Scope"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Paprs es una plataforma de software de productividad y auto-gestión administrativa diseñada para estructurar requisitos, calendarios de plazos y preparación de borradores oficiales en España. El uso del sitio web atribuye la condición de usuario e implica la aceptación plena de este Aviso Legal."
                : language === "ca"
                ? "Paprs és una plataforma de programari de productivitat i autogestió administrativa dissenyada per estructurar requisits, calendaris de terminis i preparació d'esborranys oficials a Espanya. L'ús del lloc web atribueix la condició d'usuari i implica l'acceptació plena d'aquest Avís Legal."
                : "Paprs is an administrative productivity and self-management SaaS platform designed to organize document checklists, deadline calendars, and official paperwork drafts in Spain. Browsing this site constitutes acceptance of this Legal Notice."}
            </p>
          </section>

          <section className="rounded-xl border border-zinc-300 bg-zinc-50 p-5">
            <h2 className="font-syne text-base font-bold text-black sm:text-lg">
              3. {language === "es" ? "Descargo Profesional (No Gestoría Colegiada)" : language === "ca" ? "Descàrrec Professional (No Gestoria Col·legiada)" : "Professional Disclaimer (Not a Gestoría)"}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-700 sm:text-sm">
              {language === "es"
                ? "Paprs NO es un despacho de abogados ni una Gestoría Administrativa colegiada, ni presta asesoramiento jurídico o tributario vinculante. El software proporciona guías informativas y herramientas de pre-cumplimentación. Las presentaciones formales ante administraciones públicas (Extranjería, AEAT, Seguridad Social) son ejecutadas de manera autónoma por el usuario o mediante nuestra red de gestores y profesionales colaboradores colegiados debidamente facultados."
                : language === "ca"
                ? "Paprs NO és un despatx d'advocats ni una Gestoria Administrativa col·legiada, ni presta assessorament jurídic o tributari vinculant. El programari proporciona guies informatives i eines de preemplenat. Les presentacions formals davant administracions públiques són executades autònomament per l'usuari o mitjançant la nostra xarxa de gestors col·laboradors col·legiats."
                : "Paprs is NOT a law firm or a certified Gestoría Administrativa, and does not provide binding legal or tax advisory services. Our platform offers structured checklists and automated draft preparation. Formal filings with public administrations are executed either directly by the user or through our network of licensed partner gestores and legal representatives."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              4. {language === "es" ? "Propiedad Intelectual e Industrial" : language === "ca" ? "Propietat Intel·lectual i Industrial" : "Intellectual Property"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Todos los contenidos, diseños, código fuente, logotipos y algoritmos son titularidad exclusiva de Paprs o de sus licenciantes, estando protegidos por la legislación española e internacional de propiedad intelectual e industrial."
                : language === "ca"
                ? "Tots els continguts, dissenys, codi font, logotips i algoritmes són titularitat exclusiva de Paprs o dels seus llicenciants, estant protegits per la legislació vigent."
                : "All designs, layouts, source code, brand assets, and proprietary algorithms are the intellectual property of Paprs and are protected under Spanish and international intellectual property treaties."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              5. {language === "es" ? "Legislación y Jurisdicción Aplicable" : language === "ca" ? "Legislació i Jurisdicció Aplicable" : "Applicable Law"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Para la resolución de controversias derivadas de este sitio web se aplicará la legislación española vigente, sometiéndose las partes a los juzgados y tribunales de la ciudad de Barcelona."
                : language === "ca"
                ? "Per a la resolució de conflictes s'aplicarà la legislació espanyola, sotmetent-se les parts als jutjats i tribunals de Barcelona."
                : "This Legal Notice is governed by the laws of the Kingdom of Spain. Any disputes shall be submitted to the courts of Barcelona, Spain."}
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white px-4 py-8 text-center font-mono text-[9px] text-zinc-500 sm:px-6 sm:py-12 sm:text-[10px]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p>{dict.footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end sm:gap-6">
            <Link href="/aviso-legal" className="text-black font-semibold">{dict.footer.legalNotice}</Link>
            <Link href="/privacy" className="hover:text-black">{dict.footer.privacyPolicy}</Link>
            <Link href="/terms" className="hover:text-black">{dict.footer.termsOfService}</Link>
            <Link href="/cookies" className="hover:text-black">{dict.footer.cookies}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
