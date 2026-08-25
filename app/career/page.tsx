"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Compass,
  MapPin,
  Palette,
  Rocket,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

interface Role {
  id: string;
  title: string;
  category: "Advisory & Capital" | "Executive" | "Design & Craft";
  type: string;
  location: string;
  badge: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  icon: React.ElementType;
}

const ROLES: Role[] = [
  {
    id: "co-founder",
    title: "Co-Founder (Legal, Tax, Ops & Real-World EU Systems)",
    category: "Executive",
    type: "Equal Co-Founder (50/50 Equity Split)",
    location: "Anywhere in the EU / Remote",
    badge: "50/50 Founding Partner",
    tagline: "An equal partner with deep, lived experience in EU legal, tax, and bureaucratic realities.",
    description:
      "I'm a technical founder (AI/agentic systems background) building a platform that makes bureaucracy in Spain — and eventually the EU — actually navigable instead of a maze nobody explains. The MVP is built, about to ship v1, and fully bootstrapped with no outside funding.\n\nI can build the product, AI, and infrastructure. What I don't have is deep, lived experience with EU legal, tax, and bureaucratic systems — how things actually work on the ground, not just in theory.\n\nI'm looking for a co-founder from anywhere in the EU who's either worked in this space (legal, tax advisory, gestoría, govtech, relocation) or has personally felt the pain as an autónomo, freelancer, or self-employed professional somewhere in the EU. Someone who knows the real traps and steps nobody tells you about until you've already messed them up.\n\nI am open to an equal 50/50 split with the right person — this is about finding a real partner anywhere in Europe, not outsourcing a piece of the problem.",
    responsibilities: [
      "Map real-world bureaucratic traps, edge cases, and paperwork workflows into intuitive step-by-step product logic.",
      "Co-lead product direction, operations, customer community, and rollout strategy across Spain and the EU.",
      "Validate European and Spanish legal, tax, and immigration procedures (freelancer registrations, social security, tax filings, residency).",
      "Equal co-ownership of company culture, strategy, and high-velocity execution.",
    ],
    requirements: [
      "Based anywhere in the EU (or remote) with lived experience navigating EU bureaucracy as an autónomo, freelancer, expat, or professional advisor (gestoría, legal, tax, relocation).",
      "Deep understanding of the real traps and steps nobody tells you about until you've already messed them up.",
      "High-agency builder mindset with obsessive curiosity and extreme accountability.",
      "Fluent or strong working proficiency in English (other European languages are a plus).",
    ],
    perks: [
      "Equal 50/50 founding equity split.",
      "A production-ready MVP already built with full AI and AWS Activate cloud infrastructure in place.",
      "True co-founding partnership with 100% location flexibility across the EU.",
    ],
    icon: Rocket,
  },
  {
    id: "mentor-investor",
    title: "Startup Mentor & Investor",
    category: "Advisory & Capital",
    type: "Advisory / Angel Investment / Board",
    location: "EU-Wide / Global / Remote",
    badge: "Strategic Advisory",
    tagline: "Help guide strategy, consumer growth, and expansion across Europe.",
    description:
      "As a solo technical founder, I am looking for experienced operators, founders, and angel investors across the EU and globally who have scaled consumer SaaS, legaltech, or fintech platforms. As an advisor or angel, you will help me navigate international B2C growth, banking integrations, and cross-border expansion as we make European relocation effortless for real people.",
    responsibilities: [
      "Provide strategic guidance on B2C expat user acquisition, organic growth loops, and scaling direct-to-consumer bureaucracy navigation across Europe.",
      "Advise on European regulatory, immigration, and fintech compliance frameworks.",
      "Open doors to angel syndicates, institutional venture funds, and strategic ecosystem partners across the EU.",
      "Participate in regular advisory check-ins on roadmap, metrics, and growth.",
    ],
    requirements: [
      "Track record as a founder, early-stage executive, or active angel investor in European or global tech.",
      "Deep understanding of consumer markets, relocation journeys, or European administration.",
      "Desire to make living, moving, and working across the EU seamless and modern for real people.",
    ],
    perks: [
      "Advisory equity or early angel allocation terms.",
      "Direct influence on product roadmap and European expansion trajectory.",
      "Exclusive access to performance benchmarks, growth metrics, and product roadmap.",
    ],
    icon: TrendingUp,
  },
  {
    id: "designer-ui-ux",
    title: "UI & UX / Product Designer",
    category: "Design & Craft",
    type: "Internship / Early Experience (Unpaid until Seed)",
    location: "Anywhere in the EU / Remote",
    badge: "Student Experience & Mentorship",
    tagline: "Ideal for early college students wanting to build real-world product design experience and a standout portfolio.",
    description:
      "European bureaucracy is notoriously ugly, terrifying, and overwhelming. I build the backend, AI agent pipelines, and full-stack engine, and I am looking for an enthusiastic UI & UX / Product Designer—especially early college students who want to gain hands-on startup experience in their early college days.\n\nPlease note: As a bootstrapped startup, we are not offering financial compensation until we hit our seed funding round. What we do provide is an official certificate of completion, strong recommendation letters, direct mentorship on shipping live AI-powered consumer software, and a direct pathway to paid compensation once our seed round closes.",
    responsibilities: [
      "Design intuitive wireframes, mockups, and interactive prototypes in Figma for complex bureaucracy flows.",
      "Collaborate directly with me to translate messy official paperwork into clean, step-by-step digital interfaces.",
      "Iterate on typography, layout hierarchy, and responsive screens across web and mobile.",
      "Build a portfolio of real, live-in-production designs used by actual people moving and working across Europe.",
    ],
    requirements: [
      "Early college student, design bootcamp learner, or self-taught designer looking for hands-on startup experience.",
      "Basic proficiency in Figma, wireframing, layout hierarchy, and visual typography.",
      "Curiosity and excitement about clean, modern, Apple-grade consumer design.",
      "Based anywhere in the EU (or remote) with high motivation to learn and ship real work.",
    ],
    perks: [
      "Official Completion Certificate & founder recommendation letter for your CV / LinkedIn.",
      "Real-world portfolio projects deployed live to real users across Europe.",
      "Pathway to paid compensation / equity once we close our seed round.",
    ],
    icon: Palette,
  },
];

export default function CareerPage() {
  const { dict } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<string>("co-founder");

  const activeRole = ROLES.find((r) => r.id === selectedRole) || ROLES[0];
  const emailSubject = encodeURIComponent(`Interested in ${activeRole.title} - Paprs`);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-clip bg-[#FFFFFF] text-black font-sans selection:bg-zinc-200 selection:text-black">
      {/* Sticky Top Header — Matching Main Website Header */}
      <header
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-5xl z-50 flex justify-between items-center px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] select-none text-black transition-all"
        style={{
          backgroundColor: "transparent",
          backdropFilter: "blur(2px) saturate(150%)",
          WebkitBackdropFilter: "blur(2px) saturate(150%)",
        }}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center hover:opacity-85 apple-press">
          <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-black">
            paprs
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex gap-5 text-[10px] font-mono uppercase tracking-widest text-black/75">
          <Link href="/#pain" className="transition-colors hover:text-black font-bold apple-press">
            {dict.nav.reality}
          </Link>
          <Link href="/#how-it-works" className="transition-colors hover:text-black font-bold apple-press">
            {dict.nav.howItWorks}
          </Link>
          <Link href="/#autonomo-engine" className="transition-colors hover:text-black font-bold apple-press">
            {dict.nav.autonomoEngine}
          </Link>
          <Link href="/#ai-learns" className="transition-colors hover:text-black font-bold apple-press">
            {dict.nav.intelligence}
          </Link>
          <Link href="/#countries" className="transition-colors hover:text-black font-bold apple-press">
            {dict.nav.europe}
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-black font-bold apple-press">
            {dict.nav.faq}
          </Link>
        </nav>

        {/* Nav Controls: Language Switcher & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <LanguageSwitcher />
          <Link
            href="/#waitlist"
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-black/20 text-white bg-black/85 backdrop-blur-md hover:bg-black font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider shadow-xs apple-press flex items-center justify-center text-center leading-none"
          >
            {dict.nav.joinWaitlist}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto w-full">
        {/* Intro */}
        <div className="flex flex-col items-center text-center gap-3.5 sm:gap-5 max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-black/10 bg-zinc-100 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black" />
            Solo Founder Seeking Partners · Shaping Spain & Europe
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-syne tracking-tight leading-[1.05] text-black">
            Build the Future of European Bureaucracy.
          </h1>

          <p className="font-sans text-xs sm:text-base md:text-lg text-zinc-600 font-medium leading-relaxed">
            I&apos;m a technical founder building Paprs to make bureaucracy in Spain and the EU actually navigable. MVP is built, shipping v1, and fully bootstrapped. If you are interested in partnering, advising, or designing with me, write directly to{" "}
            <a
              href="mailto:people@paprs.app"
              className="font-bold text-black hover:text-zinc-600 transition-colors"
            >
              people@paprs.app
            </a>
            .
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 sm:mb-8 w-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50/80 font-mono text-center">
          <div>
            <div className="text-base sm:text-xl md:text-2xl font-bold text-black font-syne">50 / 50</div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Co-Founder Split</div>
          </div>
          <div className="border-x border-zinc-200">
            <div className="text-base sm:text-xl md:text-2xl font-bold text-black font-syne">Bootstrapped</div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">AWS Activate · v1 Ready</div>
          </div>
          <div>
            <div className="text-base sm:text-xl md:text-2xl font-bold text-black font-syne">EU Remote</div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">High Autonomy</div>
          </div>
        </div>

        {/* Roles Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            const Icon = role.icon;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 sm:gap-4 cursor-pointer select-none ${
                  isSelected
                    ? "border-black bg-zinc-50/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3 w-full">
                  <div
                    className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center border ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-zinc-100 border-zinc-200 text-black"
                    }`}
                  >
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <span
                    className={`text-[8.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-zinc-100 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    {role.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-syne font-bold text-base sm:text-xl leading-snug mb-1 text-black">
                    {role.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 text-zinc-600">
                    {role.tagline}
                  </p>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-zinc-200/80 text-[9px] sm:text-[10px] font-mono flex items-center justify-between text-zinc-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {role.location.split("/")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Detailed View */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex flex-col gap-6 sm:gap-8 selection:bg-zinc-200 selection:text-black">
          {/* Header */}
          <div className="flex flex-col gap-2 pb-8 border-b border-zinc-200">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span className="px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-black">
                {activeRole.badge}
              </span>
              <span>•</span>
              <span>{activeRole.type}</span>
              <span>•</span>
              <span>{activeRole.location}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-syne text-black">
              {activeRole.title}
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-medium max-w-2xl">
              {activeRole.tagline}
            </p>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
              The Mission & Context
            </h4>
            <div className="font-sans text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4">
              {activeRole.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Responsibilities & Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Responsibilities */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center gap-2 font-syne font-bold text-base text-black">
                <Compass className="w-4 h-4 text-black" />
                What we will do together
              </div>
              <ul className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-zinc-600">
                {activeRole.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-black" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center gap-2 font-syne font-bold text-base text-black">
                <UserCheck className="w-4 h-4 text-black" />
                What you bring to the table
              </div>
              <ul className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-zinc-600">
                {activeRole.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-black" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Perks & What We Offer */}
          <div className="flex flex-col gap-4 pt-4 border-t border-zinc-100">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
              What I offer
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeRole.perks.map((perk, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-zinc-200 bg-white flex flex-col gap-1 text-xs text-zinc-700"
                >
                  <span className="font-mono text-[10px] font-bold text-black uppercase">
                    0{i + 1}
                  </span>
                  <p className="font-medium">{perk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Application Contact Note */}
          <div className="pt-6 border-t border-zinc-200">
            <p className="text-xs sm:text-sm text-zinc-600 font-mono">
              Interested in partnering or chatting? Write directly to{" "}
              <a
                href={`mailto:people@paprs.app?subject=${emailSubject}`}
                className="text-black font-bold hover:text-zinc-600 transition-colors"
              >
                people@paprs.app
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] py-12 px-6 text-center select-none font-mono text-[10px] text-zinc-500 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Paprs. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <Link href="/career" className="text-black font-bold">
              Careers (3 Open)
            </Link>
            <a href="mailto:people@paprs.app" className="hover:text-black transition-colors font-medium">
              people@paprs.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
