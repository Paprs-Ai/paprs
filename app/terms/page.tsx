"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function TermsPage() {
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
          <FileText className="h-3.5 w-3.5 text-black" />
          {language === "es" ? "Condiciones de Uso" : language === "ca" ? "Condicions d'Ús" : "Terms of Service"}
        </div>

        <h1 className="font-syne text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
          {language === "es" ? "Términos del Servicio" : language === "ca" ? "Termes del Servei" : "Terms of Service"}
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-400">
          {language === "es"
            ? "Última actualización: 1 de septiembre de 2026"
            : language === "ca"
            ? "Darrera actualització: 1 de setembre de 2026"
            : "Last updated: September 1, 2026"}
        </p>

        <hr className="my-8 border-zinc-200" />

        <div className="space-y-8 text-sm leading-relaxed text-zinc-700">
          {/* Critical Regulatory Disclaimer Callout */}
          <section className="rounded-xl border border-zinc-300 bg-zinc-50 p-5">
            <div className="flex items-center gap-2 font-syne font-bold text-black text-base sm:text-lg">
              <AlertTriangle className="h-4 w-4 text-zinc-800" />
              <span>
                {language === "es"
                  ? "Aviso Fundamental: Naturaleza del Software y Gestoría"
                  : language === "ca"
                  ? "Avís Fonamental: Naturalesa del Programari i Gestoria"
                  : "Core Notice: Nature of the Software & Gestoría Disclaimer"}
              </span>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-zinc-700 sm:text-sm">
              {language === "es"
                ? "Paprs es una herramienta tecnológica de auto-gestión y productividad administrativa. Paprs NO es una gestoría administrativa colegiada ni una firma jurídica, y en ningún caso presta asesoramiento legal, fiscal o tributario vinculante. El usuario es responsable de verificar los requisitos oficiales y de la veracidad de la información aportada. La presentación de trámites ante organismos públicos es responsabilidad del usuario o, en su caso, de los profesionales colegiados colaboradores que el usuario decida contratar expresamente."
                : language === "ca"
                ? "Paprs és una eina tecnològica d'autogestió i productivitat administrativa. Paprs NO és una gestoria administrativa col·legiada ni un bufet jurídic, i en cap cas presta assessorament legal o fiscal vinculant. L'usuari és responsable de verificar els requisits oficials."
                : "Paprs is a technology self-management and administrative productivity tool. Paprs is NOT a licensed Gestoría Administrativa or law firm, and does not provide binding legal or tax advice. Users remain solely responsible for verifying official requirements and ensuring the veracity of information submitted to government portals."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              1. {language === "es" ? "Aceptación de las Condiciones" : language === "ca" ? "Acceptació de les Condicions" : "Acceptance of Terms"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "El acceso y utilización del sitio web paprs.app y de los servicios ofrecidos suponen la aceptación expresa e íntegra de los presentes Términos de Servicio por parte del usuario."
                : language === "ca"
                ? "L'accés i utilització del lloc web paprs.app suposa l'acceptació expressa d'aquests Termes de Servei."
                : "By accessing or using paprs.app and any related preview services, you agree to be bound by these Terms of Service."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              2. {language === "es" ? "Uso del Servicio y Responsabilidad del Usuario" : language === "ca" ? "Ús del Servei" : "Permitted Use and User Responsibilities"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "El usuario se compromete a hacer un uso lícito y diligente de la plataforma, absteniéndose de introducir información falsa o fraudulenta. El usuario reconoce que las tasas oficiales y los criterios administrativos de ayuntamientos, Extranjería y Hacienda pueden variar por provincia y convocatoria."
                : language === "ca"
                ? "L'usuari es compromet a fer un ús lícit de la plataforma, abstenint-se d'introduir dades falses. Les taxes oficials i criteris poden variar segons l'administració."
                : "You agree to use the platform lawfully and accurately. You acknowledge that official statutory fees, processing times, and local town hall criteria in Spain are set by public authorities and may fluctuate across provinces."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              3. {language === "es" ? "Limitación de Responsabilidad" : language === "ca" ? "Limitació de Responsabilitat" : "Limitation of Liability"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Paprs no se hace responsable de denegaciones de visados, retrasos en la asignación de citas previas por parte de las sedes electrónicas estatales, o sanciones derivadas de errores u omisiones en las declaraciones presentadas por el propio usuario."
                : language === "ca"
                ? "Paprs no es fa responsable de denegacions de visats ni de retards en l'obtenció de cites prèvies derivats de les seus electròniques estatals."
                : "Paprs shall not be liable for visa or permit rejections, civil service delays, appointment slot shortages on public sedes electrónicas, or tax penalties resulting from erroneous data submitted by users."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              4. {language === "es" ? "Ley Aplicable y Fuero" : language === "ca" ? "Llei Aplicable i Fur" : "Governing Law"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Los presentes Términos se rigen en todos sus aspectos por la legislación española. Cualquier controversia se someterá a la jurisdicción de los tribunales de Barcelona, España."
                : language === "ca"
                ? "Aquests Termes es regeixen per la legislació espanyola i la jurisdicció dels tribunals de Barcelona."
                : "These Terms are governed by and construed in accordance with the laws of Spain. The courts of Barcelona shall have exclusive jurisdiction."}
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white px-4 py-8 text-center font-mono text-[9px] text-zinc-500 sm:px-6 sm:py-12 sm:text-[10px]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p>{dict.footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end sm:gap-6">
            <Link href="/aviso-legal" className="hover:text-black">{dict.footer.legalNotice}</Link>
            <Link href="/privacy" className="hover:text-black">{dict.footer.privacyPolicy}</Link>
            <Link href="/terms" className="text-black font-semibold">{dict.footer.termsOfService}</Link>
            <Link href="/cookies" className="hover:text-black">{dict.footer.cookies}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
