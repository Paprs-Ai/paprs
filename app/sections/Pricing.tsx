"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, FolderLock, Bot, Receipt } from "lucide-react";

interface FeatureItem {
  text: string;
  included: boolean;
  highlightText?: string;
  subtext?: string;
  detail?: string;
}

interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  badge: string | null;
  ctaText: string;
  highlight: boolean;
  features: FeatureItem[];
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers: PricingTier[] = [
    {
      id: "free",
      name: "Free",
      subtitle: "For document vaulting & basic guidance",
      monthlyPrice: 0,
      annualMonthlyPrice: 0,
      badge: null,
      ctaText: "Start Free Vault",
      highlight: false,
      features: [
        { text: "Centralized Document Vault", included: true, highlightText: "FREE FOREVER" },
        { text: "Procedure Guidance (up to 5 topics)", included: true, subtext: "Normal guidance (no auto actions)" },
        { text: "In-App Interactive Action Engine", included: false, detail: "Disabled" },
        { text: "Tax Module (Veri*Factu, Modelos 303/130)", included: false, detail: "Disabled" },
        { text: "Multi-user / Family sharing", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      subtitle: "Full action execution & unlimited research",
      monthlyPrice: 7.99,
      annualMonthlyPrice: 5.99,
      badge: "MOST POPULAR",
      ctaText: "Get Pro",
      highlight: true,
      features: [
        { text: "Centralized Document Vault & Tags", included: true },
        { text: "Unlimited Research & Guidance topics", included: true, subtext: "Comprehensive research & solutions" },
        { 
          text: "In-App Interactive Action Engine", 
          included: true, 
          highlightText: "FULL ACCESS",
          subtext: "Query breakdown & execution with human approval" 
        },
        { text: "Tax Module (Veri*Factu, Modelos 303/130)", included: false, detail: "Requires Autónomo Tier" },
        { text: "Multi-user / Family sharing", included: false },
      ],
    },
    {
      id: "autonomo",
      name: "Autónomo",
      subtitle: "Full action execution & tax engine",
      monthlyPrice: 16.99,
      annualMonthlyPrice: 12.99,
      badge: null,
      ctaText: "Get Autónomo",
      highlight: false,
      features: [
        { text: "Centralized Document Vault & Auto-OCR", included: true },
        { text: "Unlimited Research & Analysis", included: true },
        { 
          text: "In-App Interactive Action Engine", 
          included: true, 
          subtext: "Query breakdown & execution with human approval" 
        },
        { 
          text: "Tax Module & Veri*Factu / TicketBAI", 
          included: true, 
          highlightText: "FULL ACCESS",
          subtext: "Automated Modelo 303 & 130 prep & QR vault" 
        },
        { text: "Single Autónomo account", included: true },
      ],
    },
    {
      id: "family",
      name: "Family",
      subtitle: "Full platform power for up to 4 members",
      monthlyPrice: 22.99,
      annualMonthlyPrice: 17.99,
      badge: "BEST FOR FAMILIES",
      ctaText: "Get Family Plan",
      highlight: false,
      features: [
        { text: "Up to 4 Family Members / Users", included: true, highlightText: "4 MEMBERS" },
        { text: "Shared Vault for all 4 members", included: true },
        { text: "Unlimited Research for all", included: true },
        { 
          text: "In-App Interactive Action Engine (All Members)", 
          included: true, 
          subtext: "Full action execution for family" 
        },
        { 
          text: "Tax Module & Compliance (All)", 
          included: true, 
          subtext: "Veri*Factu QR vault & tax models" 
        },
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 md:px-8 max-w-7xl mx-auto text-black scroll-mt-16 select-none"
    >
      {/* Header section — Centered */}
      <div className="text-center max-w-4xl w-full mx-auto flex flex-col items-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/15 bg-zinc-100 font-mono text-[9px] font-bold uppercase tracking-widest text-black mb-2 apple-spring">
          <Sparkles className="w-3 h-3 text-black" /> Launch Founder Pricing
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold font-syne tracking-tight text-black leading-tight text-center">
          <span className="block whitespace-nowrap">Substantially affordable.</span>
          <span className="block whitespace-nowrap">Built for everyone.</span>
        </h2>
        <p className="font-sans text-xs md:text-sm text-zinc-600 font-medium mt-2 max-w-lg text-center leading-relaxed">
          Zero risk to start. Lock in launch rates for life, with our free centralized vault included for every tier.
        </p>

        {/* Monthly / Annual Billing Toggle — Clean Tactile Segmented Control */}
        <div className="mt-4 inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-100 border border-black/10 select-none shadow-xs">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-full font-mono text-[11px] font-bold apple-press transition-all duration-200 ${
              !isAnnual
                ? "bg-black text-white shadow-sm"
                : "text-zinc-600 hover:text-black hover:bg-black/5"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-full font-mono text-[11px] font-bold apple-press transition-all duration-200 flex items-center gap-1.5 ${
              isAnnual
                ? "bg-black text-white shadow-sm"
                : "text-zinc-600 hover:text-black hover:bg-black/5"
            }`}
          >
            Annual
            <span
              className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold border transition-all duration-200 ${
                isAnnual
                  ? "bg-white text-black border-black/10 shadow-xs"
                  : "bg-black/10 text-black border-black/10"
              }`}
            >
              Save ~20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid — Centered with Apple Fluid Spring Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-stretch justify-center">
        {tiers.map((tier) => {
          const price = isAnnual ? tier.annualMonthlyPrice : tier.monthlyPrice;
          return (
            <div
              key={tier.id}
              className={`group relative flex flex-col justify-between rounded-2xl p-4 md:p-5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
                tier.highlight
                  ? "bg-black text-white border-2 border-black shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                  : "bg-white text-black border border-zinc-200/90 hover:border-black/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
              }`}
            >
              {/* Badge Centered at Top */}
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full font-mono text-[8px] font-extrabold uppercase tracking-widest shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                    tier.highlight
                      ? "bg-white text-black border border-black"
                      : "bg-black text-white"
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <div>
                {/* Tier Title */}
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="font-syne text-lg font-bold tracking-tight">
                    {tier.name}
                  </h3>
                </div>
                <p
                  className={`text-[11px] font-sans mb-4 min-h-[28px] leading-tight transition-colors ${
                    tier.highlight ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-500 group-hover:text-zinc-700"
                  }`}
                >
                  {tier.subtitle}
                </p>

                {/* Price Display with Smooth Morphing Transition */}
                <div className="mb-4 pb-4 border-b border-zinc-200/20">
                  <div className="flex items-baseline gap-1">
                    <span className="font-syne text-3xl font-extrabold tracking-tight transition-all duration-300">
                      €{price.toFixed(price % 1 === 0 ? 0 : 2)}
                    </span>
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        tier.highlight ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      / month
                    </span>
                  </div>
                  <p
                    className={`font-mono text-[9px] mt-0.5 transition-opacity duration-200 ${
                      tier.highlight ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {price === 0
                      ? "Free forever"
                      : isAnnual
                      ? `Billed annually (€${(price * 12).toFixed(0)}/yr)`
                      : "Billed monthly"}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] font-sans">
                      {feat.included ? (
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110 ${
                            tier.highlight ? "text-white" : "text-black"
                          }`}
                        />
                      ) : (
                        <X className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />
                      )}
                      <div className="flex flex-col">
                        <span
                          className={`${
                            !feat.included
                              ? tier.highlight
                                ? "text-zinc-400"
                                : "text-zinc-400"
                              : tier.highlight
                              ? "text-zinc-100"
                              : "text-zinc-800"
                          } font-medium leading-snug`}
                        >
                          {feat.text}
                          {feat.highlightText && (
                            <span
                              className={`ml-1 text-[8px] font-mono font-bold px-1 py-0.2 rounded ${
                                tier.highlight
                                  ? "bg-white text-black"
                                  : "bg-black text-white"
                              }`}
                            >
                              {feat.highlightText}
                            </span>
                          )}
                        </span>
                        {feat.subtext && (
                          <span
                            className={`text-[9px] mt-0.5 font-mono leading-tight ${
                              tier.highlight ? "text-zinc-400" : "text-zinc-500"
                            }`}
                          >
                            {feat.subtext}
                          </span>
                        )}
                        {!feat.included && feat.detail && (
                          <span className="text-[9px] font-mono text-zinc-400">
                            {feat.detail}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button with Instant Touch Response */}
              <div>
                <a
                  href="#cta"
                  className={`w-full py-2.5 px-3 rounded-full font-syne text-[11px] font-bold uppercase tracking-wider apple-press flex items-center justify-center text-center shadow-xs transition-all duration-300 ${
                    tier.highlight
                      ? "bg-white text-black hover:bg-zinc-100 group-hover:shadow-md"
                      : "bg-black text-white hover:bg-zinc-800 group-hover:shadow-md"
                  }`}
                >
                  {tier.ctaText}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature comparison highlights banner — Apple Translucent Depth */}
      <div className="mt-6 w-full bg-zinc-50/80 backdrop-blur-sm rounded-2xl p-4 border border-zinc-200/90 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-start gap-3 text-left">
          <div className="p-2 bg-black text-white rounded-xl shrink-0">
            <FolderLock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-syne font-bold text-xs text-black">Centralized Vault for All</h4>
            <p className="font-sans text-[11px] text-zinc-600 mt-0.5 leading-snug">
              Securely store and tag documents — 100% free forever for every account tier.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left">
          <div className="p-2 bg-black text-white rounded-xl shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-syne font-bold text-xs text-black">Interactive In-App Action Engine</h4>
            <p className="font-sans text-[11px] text-zinc-600 mt-0.5 leading-snug">
              Available on Pro, Autónomo & Family. Breaks tasks down into actions and executes with your approval.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left">
          <div className="p-2 bg-black text-white rounded-xl shrink-0">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-syne font-bold text-xs text-black">Veri*Factu & Tax Automation</h4>
            <p className="font-sans text-[11px] text-zinc-600 mt-0.5 leading-snug">
              Autónomo & Family tiers include full tax module automation (Veri*Factu QR & Modelos 303/130).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
