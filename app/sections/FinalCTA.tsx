"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Bell, Check, Loader2, Lock, Mail, MapPin } from "lucide-react";
import { joinWaitlistAction } from "@/actions/waitlist";
import { useLanguage } from "../context/LanguageContext";

export default function FinalCTA() {
  const { dict } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailToSubmit = email.trim();
    if (!emailToSubmit) return;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    setEmail("");
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const data = await joinWaitlistAction(emailToSubmit);

      if (!data.success && !data.alreadyRegistered) {
        setErrorMessage(data.message || dict.finalCTA.defaultError);
        setIsSubmitted(false);
      } else {
        setIsSubmitted(true);
        setFeedbackMessage(data.message || dict.finalCTA.defaultFeedback);

        // After 2.5 seconds, return button and state to normal so user can type again
        resetTimerRef.current = setTimeout(() => {
          setIsSubmitted(false);
        }, 2500);
      }
    } catch (err) {
      console.error("Waitlist submit error:", err);
      setErrorMessage(dict.finalCTA.unexpectedError);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="final-cta relative flex min-h-[80svh] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-16 text-black select-none scroll-mt-28 sm:px-6 sm:py-24 md:px-8"
    >
 
      {/* Decorative floating badge */}
      <div className="cta-badge relative mb-4 flex items-center gap-1.5 rounded-full border border-black/15 bg-zinc-100 px-3.5 py-1 font-mono text-[9px] font-bold tracking-widest uppercase sm:mb-6 sm:px-4 sm:py-1.5 sm:text-[10px]">
        <Bell className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black" /> {dict.finalCTA.badge}
      </div>
 
      {/* Content */}
      <div className="cta-content relative flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-6">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold font-syne tracking-tight leading-[0.95] text-black whitespace-pre-line">
          {dict.finalCTA.title}
        </h2>
        
        <p className="font-sans text-xs sm:text-base md:text-xl text-zinc-600 font-medium max-w-lg leading-relaxed">
          {dict.finalCTA.desc}
        </p>
 
        {/* Waitlist form */}
        <form
          onSubmit={handleSubmit}
          className="waitlist-form mt-4 flex w-full max-w-xl flex-col items-stretch gap-2 rounded-2xl border border-black/15 bg-zinc-50 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:mt-6 sm:flex-row sm:rounded-full sm:p-2"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            {dict.finalCTA.emailPlaceholder}
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3 px-3 sm:px-4">
            <Mail className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
            <input
              id="waitlist-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={dict.finalCTA.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isSubmitted) setIsSubmitted(false);
                if (errorMessage) setErrorMessage(null);
              }}
              required
              disabled={isSubmitting}
              className="waitlist-email min-w-0 flex-1 appearance-none bg-transparent py-2.5 sm:py-3 font-sans text-xs sm:text-sm text-black caret-black outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed select-text selection:bg-zinc-300 selection:text-black"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="ink-button group flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-5 text-center font-syne text-[11px] font-bold tracking-wider text-white uppercase shadow-md disabled:cursor-not-allowed disabled:bg-zinc-800 sm:min-h-12 sm:rounded-full sm:px-6 sm:text-xs"
          >
            {isSubmitting ? (
              <>
                <span>{dict.finalCTA.joining}</span>
                <Loader2 className="h-3.5 sm:h-4 w-3.5 sm:h-4 animate-spin" aria-hidden="true" />
              </>
            ) : isSubmitted ? (
              <>
                <span>{dict.finalCTA.youAreOnList}</span>
                <Check className="h-3.5 sm:h-4 w-3.5 sm:h-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <span>{dict.finalCTA.joinWaitlistBtn}</span>
                <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <p
          className={`min-h-5 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${
            errorMessage ? "text-red-500" : isSubmitted ? "text-zinc-800" : "text-zinc-500"
          }`}
          aria-live="polite"
        >
          {errorMessage
            ? errorMessage
            : feedbackMessage
            ? feedbackMessage
            : dict.finalCTA.defaultFeedback}
        </p>

        <div className="flex justify-center w-full">
          <a
            href="#pain"
            className="secondary-button apple-press flex items-center justify-center rounded-full border border-black/20 bg-transparent px-5 py-2.5 text-center font-syne text-[10px] font-bold tracking-wider text-black uppercase sm:px-6 sm:py-3 sm:text-xs"
          >
            {dict.finalCTA.seeHowItWorks}
          </a>
        </div>
 
        {/* Trust signals */}
        <div className="trust-signals mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[9px] font-semibold tracking-wider text-zinc-600 uppercase sm:mt-12 sm:gap-x-6 sm:text-[10px]">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-black" /> {dict.finalCTA.noSpam}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-black" /> {dict.finalCTA.builtInSpain}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-black" /> {dict.finalCTA.earlyAccessPriority}</span>
        </div>
      </div>
 
    </section>
  );
}
