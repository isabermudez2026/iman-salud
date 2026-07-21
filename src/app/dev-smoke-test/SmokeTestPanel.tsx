"use client";

import { useState, useTransition } from "react";
import { supabaseSmokeTestAction } from "@/app/actions/supabase-smoke-test";

export function SmokeTestPanel() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const response = await supabaseSmokeTestAction();
      setMessage(response.message);
    });
  };

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", maxWidth: 560 }}>
      <h1>Prueba de conexión a Supabase (temporal — E1-01)</h1>
      <p>
        Esta página es solo para desarrollo y se elimina tras verificar la
        conexión.
      </p>
      <button
        onClick={handleClick}
        disabled={isPending}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        {isPending ? "Probando..." : "Probar conexión"}
      </button>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  );
}
