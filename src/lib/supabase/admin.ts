import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only: uses the secret key and bypasses RLS. Never import this file
// from a Client Component ("use client") or expose SUPABASE_SECRET_KEY with
// a NEXT_PUBLIC_ prefix.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
