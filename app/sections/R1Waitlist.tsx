"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { joinWaitlistAction } from "@/actions/waitlist";
import { useLanguage } from "../context/LanguageContext";
import { tR1 } from "../r1Copy";

export default function R1Waitlist() {
  const { language } = useLanguage();
  const c = tR1(language);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setEmail("");
    setIsSubmitting(true);
    setError(null);
    try {
      const data = await joinWaitlistAction(value);
      if (!data.success && !data.alreadyRegistered) {
        setError(data.message || c.err);
        setIsSubmitted(false);
      } else {
        setIsSubmitted(true);
        setFeedback(data.message || c.onList);
        resetTimerRef.current = setTimeout(() => setIsSubmitted(false), 2500);
      }
    } catch {
      setError(c.unexpected);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id="waitlist" className="mt-5 w-full max-w-xl scroll-mt-28">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch gap-2 rounded-2xl border border-black/15 bg-zinc-50 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:flex-row sm:rounded-full sm:p-2"
      >
        <label htmlFor="r1-waitlist-email" className="sr-only">
          {c.emailPh}
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 sm:px-4">
          <Mail className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
          <input
            id="r1-waitlist-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={c.emailPh}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isSubmitted) setIsSubmitted(false);
              if (error) setError(null);
            }}
            required
            disabled={isSubmitting}
            className="min-w-0 flex-1 appearance-none bg-transparent py-2.5 font-sans text-xs text-black caret-black outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed sm:py-3 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-5 font-sans text-[11px] font-bold tracking-wider text-white uppercase disabled:cursor-not-allowed disabled:bg-zinc-800 sm:min-h-12 sm:rounded-full sm:px-6 sm:text-xs"
        >
          {isSubmitting ? (
            <>
              <span>{c.joining}</span>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            </>
          ) : isSubmitted ? (
            <>
              <span>{c.onList}</span>
              <Check className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              <span>{c.joinWaitlist}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
      <p
        className={`mt-2 min-h-5 font-mono text-[9px] font-semibold tracking-wider uppercase sm:text-[10px] ${
          error ? "text-red-500" : "text-zinc-500"
        }`}
        aria-live="polite"
      >
        {error || feedback || c.micro}
      </p>
    </div>
  );
}
