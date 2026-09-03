"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function CookiesPage() {
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
          <Cookie className="h-3.5 w-3.5 text-black" />
          {language === "es" ? "Directiva ePrivacy & LSSI-CE" : "ePrivacy & LSSI-CE"}
        </div>

        <h1 className="font-syne text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
          {language === "es" ? "Política de Cookies" : language === "ca" ? "Política de Cookies" : "Cookie Policy"}
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-400">
          {language === "es"
            ? "Última actualización: 1 de septiembre de 2026 · Conforme al Art. 22.2 de la LSSI-CE"
            : language === "ca"
            ? "Darrera actualització: 1 de setembre de 2026 · Conforme a l'Art. 22.2 de la LSSI-CE"
            : "Last updated: September 1, 2026 · In compliance with Spanish LSSI-CE Art. 22.2"}
        </p>

        <hr className="my-8 border-zinc-200" />

        <div className="space-y-8 text-sm leading-relaxed text-zinc-700">
          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              1. {language === "es" ? "¿Qué son las Cookies?" : language === "ca" ? "Què són les Cookies?" : "What Are Cookies?"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Una cookie es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario para recordar preferencias de navegación, idioma o rendimiento técnico."
                : language === "ca"
                ? "Una cookie és un petit fitxer de text que un lloc web emmagatzema al navegador de l'usuari per recordar preferències tècniques."
                : "A cookie is a small data file stored in your browser to remember technical preferences such as language selection and ensure smooth page navigation."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              2. {language === "es" ? "Cookies y Almacenamiento Utilizados" : language === "ca" ? "Cookies Utilitzades" : "Storage Used by Paprs"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Actualmente, Paprs utiliza únicamente mecanismos técnicos y estrictamente necesarios para el funcionamiento del sitio web:"
                : language === "ca"
                ? "Actualment, Paprs utilitza únicament mecanismes tècnics i estrictament necessaris:"
                : "Currently, Paprs uses strictly necessary technical storage mechanisms to operate this website:"}
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 font-mono text-xs">
              <div className="grid grid-cols-3 border-b border-zinc-200 bg-zinc-100 p-3 font-bold text-black">
                <span>Clave / Nombre</span>
                <span>Tipo / Finalidad</span>
                <span>Duración</span>
              </div>
              <div className="grid grid-cols-3 border-b border-zinc-100 p-3 text-zinc-700">
                <span><code>paprs_landing_language</code></span>
                <span>Técnica (recuerda idioma: EN/ES/CA)</span>
                <span>Persistente (Local)</span>
              </div>
              <div className="grid grid-cols-3 p-3 text-zinc-700">
                <span><code>cf_clearance</code> (Cloudflare)</span>
                <span>Seguridad y protección anti-DDoS</span>
                <span>Sesión / 1 año</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              3. {language === "es" ? "Cómo Gestionar o Eliminar las Cookies" : language === "ca" ? "Com Gestionar les Cookies" : "How to Control or Disable Cookies"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador o dispositivo móvil (Chrome, Safari, Firefox, Edge)."
                : language === "ca"
                ? "Podeu permetre, bloquejar o eliminar les cookies mitjançant la configuració del vostre navegador (Chrome, Safari, Firefox, Edge)."
                : "You can configure your browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) to refuse or delete cookies and clear local storage at any time."}
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
            <Link href="/terms" className="hover:text-black">{dict.footer.termsOfService}</Link>
            <Link href="/cookies" className="text-black font-semibold">{dict.footer.cookies}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
