import { notFound } from "next/navigation";
import { SmokeTestPanel } from "./SmokeTestPanel";

// TEMPORARY dev-only page for the E1-01 Supabase smoke test.
// Remove this route (and src/app/actions/supabase-smoke-test.ts) once the
// connection has been verified.
export default function DevSmokeTestPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <SmokeTestPanel />;
}
