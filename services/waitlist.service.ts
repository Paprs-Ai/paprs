import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface WaitlistEntry {
  id?: number;
  email: string;
  createAt?: string;
  created_at?: string;
}

export interface WaitlistResult {
  success: boolean;
  message: string;
  data?: WaitlistEntry;
  alreadyRegistered?: boolean;
  error?: string;
}

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a cached Supabase server client.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment configuration is missing.");
  }

  cachedClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}

// In-memory sliding rate limiter: tracks timestamp array per IP/key
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Basic in-memory rate limiter to prevent automated flooding.
 */
export function checkRateLimit(identifier: string = "global"): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(identifier, recent);

  // Periodically cleanup memory
  if (rateLimitMap.size > 10000) {
    rateLimitMap.clear();
  }

  return true;
}

/**
 * Validates email format according to RFC 5321 length and regex constraints.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254 || trimmed.length < 5) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Service to manage waitlist registrations securely.
 */
export class WaitlistService {
  /**
   * Adds an email address to the waitlist table.
   */
  static async addToWaitlist(rawEmail: string, clientIp: string = "anonymous"): Promise<WaitlistResult> {
    if (!checkRateLimit(clientIp)) {
      return {
        success: false,
        message: "Too many requests. Please try again in a few minutes.",
        error: "RATE_LIMITED",
      };
    }

    const email = rawEmail?.trim()?.toLowerCase();

    if (!email || !validateEmail(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
        error: "INVALID_EMAIL",
      };
    }

    try {
      const supabase = getSupabaseServerClient();

      const { data, error } = await supabase
        .from("waitlist")
        .insert({ email })
        .select()
        .single();

      if (error) {
        if (error.code === "23505" || error.message?.includes("duplicate key")) {
          return {
            success: true,
            alreadyRegistered: true,
            message: "You're already on the waiting list! We'll keep you posted.",
          };
        }

        console.error("Supabase waitlist error:", error.code);
        return {
          success: false,
          message: "Failed to join waitlist. Please try again.",
          error: "REGISTRATION_FAILED",
        };
      }

      return {
        success: true,
        message: "You have been added to the waiting list!",
        data: data as WaitlistEntry,
      };
    } catch (err: unknown) {
      console.error("Unexpected waitlist error:", err instanceof Error ? err.message : "Internal error");
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: "SERVER_ERROR",
      };
    }
  }
}
