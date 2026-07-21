"use server";

// TEMPORARY — smoke test for E1-01 (Supabase wiring). Remove this file and
// its dev-only page once the Supabase connection has been verified.

import { createClient } from "@/lib/supabase/server";

export async function supabaseSmokeTestAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { success: false as const, message: error.message };
  }

  return {
    success: true as const,
    message: data.user
      ? `Conectado. Usuario autenticado: ${data.user.email}`
      : "Conectado a Supabase. No hay sesión activa (esperado sin login todavía).",
  };
}
