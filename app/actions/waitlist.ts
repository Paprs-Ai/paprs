"use server";

import { WaitlistService, WaitlistResult } from "@/services/waitlist.service";

/**
 * Server Action to register an email to the waitlist.
 */
export async function joinWaitlistAction(email: string): Promise<WaitlistResult> {
  return await WaitlistService.addToWaitlist(email);
}
