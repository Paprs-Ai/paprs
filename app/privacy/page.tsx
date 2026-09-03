"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function PrivacyPage() {
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
          <ShieldCheck className="h-3.5 w-3.5 text-black" />
          GDPR / RGPD (UE 2016/679) & LOPDGDD 3/2018
        </div>

        <h1 className="font-syne text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
          {language === "es" ? "Política de Privacidad" : language === "ca" ? "Política de Privadesa" : "Privacy Policy"}
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-400">
          {language === "es"
            ? "Última actualización: 1 de septiembre de 2026 · Cumplimiento estricto RGPD y AEPD"
            : language === "ca"
            ? "Darrera actualització: 1 de setembre de 2026 · Compliment estricte RGPD i AEPD"
            : "Last updated: September 1, 2026 · Full EU GDPR & Spanish LOPDGDD compliance"}
        </p>

        <hr className="my-8 border-zinc-200" />

        <div className="space-y-8 text-sm leading-relaxed text-zinc-700">
          <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 font-mono text-xs">
            <p className="font-bold text-black uppercase tracking-wider">
              {language === "es" ? "Resumen Informativo (Primera Capa RGPD)" : language === "ca" ? "Resum Informatiu (Primera Capa RGPD)" : "At-a-Glance Privacy Summary"}
            </p>
            <ul className="mt-3 space-y-1.5 text-zinc-600">
              <li><strong>Responsable:</strong> Paprs AI Technologies (Barcelona, España)</li>
              <li><strong>Finalidad:</strong> Gestión de acceso a la lista de espera, comunicaciones de lanzamiento y soporte.</li>
              <li><strong>Legitimación:</strong> Consentimiento expreso del interesado (Art. 6.1.a RGPD).</li>
              <li><strong>Destinatarios:</strong> Proveedores de infraestructura técnica con servidores en la Unión Europea (UE). No se ceden datos a terceros.</li>
              <li><strong>Derechos:</strong> Acceso, rectificación, supresión, limitación y oposición en <code>privacy@paprs.app</code>.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              1. {language === "es" ? "Responsable del Tratamiento" : language === "ca" ? "Responsable del Tractament" : "Data Controller"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "El responsable del tratamiento de sus datos de carácter personal es Paprs AI Technologies, con sede operativa en Barcelona, España, y correo electrónico de contacto para cuestiones de protección de datos: privacy@paprs.app."
                : language === "ca"
                ? "El responsable del tractament de les seves dades personals és Paprs AI Technologies, amb seu operativa a Barcelona, Espanya, i correu electrònic de contacte per a protecció de dades: privacy@paprs.app."
                : "The data controller responsible for processing your personal information is Paprs AI Technologies, based in Barcelona, Spain. For privacy-related inquiries, contact: privacy@paprs.app."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              2. {language === "es" ? "Datos que Recopilamos y Finalidad" : language === "ca" ? "Dades que Recopilem i Finalitat" : "Data Collected and Purpose"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "En nuestra fase de acceso anticipado, recopilamos únicamente la dirección de correo electrónico que usted nos proporciona voluntariamente en el formulario de lista de espera. Tratamos esta información con la finalidad de:"
                : language === "ca"
                ? "En la nostra fase d'accés anticipat, recopilem únicament l'adreça de correu electrònic que ens proporciona voluntàriament. Tractem aquesta informació amb la finalitat de:"
                : "During our early access preview, we collect only the email address voluntarily submitted via the waitlist form. We process this information to:"}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
              <li>{language === "es" ? "Registrar su posición en la lista de espera y gestionar invitaciones de acceso." : "Manage your waitlist spot and send prioritized onboarding invitations."}</li>
              <li>{language === "es" ? "Comunicar actualizaciones relevantes del producto, disponibilidad y lanzamiento." : "Send relevant product launch updates and service notifications."}</li>
              <li>{language === "es" ? "Atender consultas y solicitudes enviadas a nuestro equipo." : "Respond to direct user queries and feedback."}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              3. {language === "es" ? "Base Legal del Tratamiento" : language === "ca" ? "Base Legal del Tractament" : "Legal Basis for Processing"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "La base jurídica que legitima el tratamiento de su correo electrónico es el consentimiento expreso e informado otorgado al marcar la casilla de verificación y enviar el formulario de suscripción (Artículo 6.1.a del RGPD y Artículo 6 de la LOPDGDD)."
                : language === "ca"
                ? "La base jurídica que legitima el tractament del vostre correu és el consentiment exprés atorgat en marcar la casella i enviar el formulari (Article 6.1.a del RGPD)."
                : "The legal basis for processing your email is your explicit, freely given consent granted when checking the acceptance box and submitting the form (Article 6.1.a of the GDPR). You may revoke your consent at any time."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              4. {language === "es" ? "Seguridad y Bóveda Cifrada" : language === "ca" ? "Seguretat i Caixa Forta Xifrada" : "Security and Encryption Standards"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Implementamos medidas técnicas y organizativas de seguridad avanzadas, incluyendo cifrado AES-256 en reposo y TLS 1.3 en tránsito. Sus datos se alojan exclusivamente en infraestructuras seguras ubicadas dentro del Espacio Económico Europeo (EEE). Nunca vendemos ni compartimos sus datos personales con anunciantes o terceros no autorizados."
                : language === "ca"
                ? "Implementem mesures tècniques de seguretat avançades, inclòs xifratge AES-256 en repòs i TLS 1.3 en trànsit. Les vostres dades s'allotgen exclusivament dins de l'Espai Econòmic Europeu (EEE)."
                : "We implement rigorous technical and organizational safeguards, including AES-256 encryption at rest and TLS 1.3 in transit. Data is hosted exclusively in secure infrastructure located within the European Economic Area (EEA). We never sell or monetize your personal information."}
            </p>
          </section>

          <section>
            <h2 className="font-syne text-lg font-bold text-black sm:text-xl">
              5. {language === "es" ? "Sus Derechos (Acceso, Supresión y Oposición)" : language === "ca" ? "Els Seus Drets" : "Your Rights under GDPR"}
            </h2>
            <p className="mt-2">
              {language === "es"
                ? "Usted puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión ('derecho al olvido'), limitación del tratamiento, portabilidad y oposición enviando un correo electrónico a privacy@paprs.app. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en www.aepd.es si considera vulnerados sus derechos."
                : language === "ca"
                ? "Podeu exercir en qualsevol moment els vostres drets d'accés, rectificació, supressió, limitació i oposició escrivint a privacy@paprs.app. També teniu dret a presentar una reclamació davant l'AEPD a www.aepd.es."
                : "Under Articles 15–22 of the GDPR, you have the right to access, rectify, or erase ('right to be forgotten') your data, as well as restrict or object to processing by emailing privacy@paprs.app. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD) at www.aepd.es."}
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
            <Link href="/privacy" className="text-black font-semibold">{dict.footer.privacyPolicy}</Link>
            <Link href="/terms" className="hover:text-black">{dict.footer.termsOfService}</Link>
            <Link href="/cookies" className="hover:text-black">{dict.footer.cookies}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
