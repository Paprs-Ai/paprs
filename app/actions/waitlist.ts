"use server";

import { WaitlistService, WaitlistResult } from "@/services/waitlist.service";

/**
 * Server Action to add an email to the waitlist using @supabase/server on the backend.
 * Keeps all Supabase secret credentials strictly on the server.
 */
export async function joinWaitlistAction(email: string): Promise<WaitlistResult> {
  return await WaitlistService.addToWaitlist(email);
}
