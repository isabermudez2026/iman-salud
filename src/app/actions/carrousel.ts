"use server";

import { FormType } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "@/utils/prompts";

export async function generateCarruselAction(form: FormType) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 3000,
        system: buildSystemPrompt(),
        messages: [{ role: "user", content: buildUserPrompt({ form }) }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[Anthropic API Error] Status: ${response.status}, Body: ${errorBody}`);
      if (response.status === 403) {
        throw new Error("Acceso denegado. Por favor, activa tu VPN e intenta nuevamente.");
      }
      throw new Error(`Error de la API (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    const text = data.content
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("");

    const clean = text.replace(/```json|```/g, "").trim();
    
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (parseError) {
      console.error("[JSON Parse Error] Raw text from Claude:", clean);
      throw new Error("La IA no devolvió un JSON válido. Intenta de nuevo.");
    }

    if (
      !parsed.laminas ||
      parsed.laminas.length < 6 ||
      parsed.laminas.length > 10
    ) {
      throw new Error(
        "Output incompleto o fuera de rango (6-10 láminas). Genera nuevamente.",
      );
    }

    return { success: true, data: parsed };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}
