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
      className="min-h-[80vh] w-full flex flex-col justify-center items-center text-black px-8 relative overflow-hidden select-none bg-white scroll-mt-28"
    >
 
      {/* Decorative floating badge */}
      <div className="relative border border-black/15 bg-zinc-100 px-4 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-1.5 apple-spring">
        <Bell className="w-3.5 h-3.5 text-black" /> {dict.finalCTA.badge}
      </div>
 
      {/* Content */}
      <div className="relative max-w-3xl text-center flex flex-col items-center gap-6">
        <h2 className="text-5xl md:text-7xl font-extrabold font-syne tracking-tight leading-[0.95] text-black whitespace-pre-line">
          {dict.finalCTA.title}
        </h2>
        
        <p className="font-sans text-base md:text-xl text-zinc-600 font-medium max-w-lg leading-relaxed">
          {dict.finalCTA.desc}
        </p>
 
        {/* Waitlist form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 w-full max-w-xl rounded-[1.75rem] sm:rounded-full border border-black/15 bg-zinc-50 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-stretch gap-2 apple-spring"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            {dict.finalCTA.emailPlaceholder}
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
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
              className="waitlist-email min-w-0 flex-1 appearance-none bg-transparent py-3 font-sans text-sm text-black caret-black outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed select-text selection:bg-zinc-300 selection:text-black"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="group min-h-12 shrink-0 rounded-full bg-black px-6 text-white hover:bg-zinc-800 disabled:bg-zinc-800 font-syne font-bold text-xs sm:text-sm tracking-wider uppercase apple-press shadow-md flex items-center justify-center gap-2 text-center transition-all"
          >
            {isSubmitting ? (
              <>
                <span>{dict.finalCTA.joining}</span>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              </>
            ) : isSubmitted ? (
              <>
                <span>{dict.finalCTA.youAreOnList}</span>
                <Check className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <span>{dict.finalCTA.joinWaitlistBtn}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <p
          className={`min-h-5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
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
            className="px-6 py-3 rounded-full bg-transparent border border-black/20 text-black hover:bg-zinc-100 font-syne font-bold text-xs tracking-wider uppercase apple-press flex items-center justify-center text-center"
          >
            {dict.finalCTA.seeHowItWorks}
          </a>
        </div>
 
        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-wider font-semibold text-zinc-600 items-center">
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
