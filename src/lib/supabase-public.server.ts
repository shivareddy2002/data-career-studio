import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Publishable-key client for public, read-only Data API access from server
 * functions and server routes. RLS still applies as the anonymous role, so it
 * can only reach content covered by a public SELECT policy.
 * Create it inside a handler — never at module scope.
 */
export function createPublicServerClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}