import { createAdminClient } from "@supabase/server/core";
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

/**
 * Helper to get an active Supabase client with admin/secret privileges.
 * Falls back to standard @supabase/supabase-js createClient if needed.
 */
export function getSupabaseAdminClient(): SupabaseClient {
  try {
    return createAdminClient();
  } catch {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase environment variables (SUPABASE_URL and SUPABASE_SECRET_KEY) are missing.");
    }
    return createClient(url, key);
  }
}

/**
 * Validates basic email structure.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

/**
 * Service to manage waitlist registrations.
 */
export class WaitlistService {
  /**
   * Adds an email address to the Supabase waitlist table.
   */
  static async addToWaitlist(rawEmail: string): Promise<WaitlistResult> {
    const email = rawEmail?.trim()?.toLowerCase();

    if (!email || !validateEmail(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
        error: "INVALID_EMAIL",
      };
    }

    try {
      const supabase = getSupabaseAdminClient();

      const { data, error } = await supabase
        .from("waitlist")
        .insert({ email })
        .select()
        .single();

      if (error) {
        // Handle PostgreSQL unique constraint violation (duplicate email)
        if (error.code === "23505" || error.message?.includes("duplicate key")) {
          return {
            success: true,
            alreadyRegistered: true,
            message: "You're already on the waiting list! We'll keep you posted.",
          };
        }

        console.error("Supabase insert error:", error);
        return {
          success: false,
          message: error.message || "Failed to join waitlist. Please try again.",
          error: error.code || "DB_ERROR",
        };
      }

      return {
        success: true,
        message: "You have been added to the waiting list!",
        data: data as WaitlistEntry,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      console.error("Unexpected error in addToWaitlist:", err);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: errorMessage,
      };
    }
  }

  /**
   * Optional helper to fetch all waitlist entries (for administrative queries).
   */
  static async getAll(): Promise<WaitlistEntry[]> {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("createAt", { ascending: false });

    if (error) {
      console.error("Failed to fetch waitlist:", error);
      throw error;
    }

    return (data as WaitlistEntry[]) || [];
  }
}
