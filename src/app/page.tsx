"use client";

import { useState } from "react";
import { BRAND, fontStyle } from "@/utils/style";
import { FormScreen } from "@/components/FormScreen";
import { FormType, OutputType, SlideType } from "@/types";
import { HeaderNode } from "@/components/HeaderNode";
import { Legal } from "@/components/Legal";
import { SignIn } from "@/components/SignIn";
import { OutputScreen } from "@/components/OutputScreen";
import { verifyPassword } from "./actions/auth";
import { generateCarruselAction } from "./actions/carrousel";

const initialForm: FormType = {
  especialidad: "",
  pacienteIdeal: "",
  problema: "",
  enfoqueDiferencial: "",
  tipoServicio: "",
  tonoVoz: "",
  fraseReal: "",
  tipoHook: "automatico",
};

export default function IMANSaludCarruseles() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<OutputType | null>(null);
  const [error, setError] = useState("");
  const [copiedSlide, setCopiedSlide] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [showTonoDropdown, setShowTonoDropdown] = useState(false);
  const [form, setForm] = useState<FormType>(initialForm);

  const handlePassword = async () => {
    // Llamamos al servidor de forma segura
    const isValid = await verifyPassword(password);

    if (isValid) {
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Contraseña incorrecta. Verifica e intenta nuevamente.");
    }
  };

  const updateForm = ({
    field,
    value,
  }: {
    field: keyof FormType;
    value: string;
  }) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateCarrusel = async () => {
    setLoading(true);
    setError("");
    setOutput(null);

    const result = await generateCarruselAction(form);
    if (result.success && result.data) {
      setOutput(result.data);
      setStep(2);
    } else {
      setError(result.error || "Ocurrió un error. Intenta nuevamente.");
    }
    setLoading(false);
  };

  const copySlide = ({ numero, copy }: { numero: number; copy: string }) => {
    navigator.clipboard.writeText(copy);
    setCopiedSlide(numero);
    setTimeout(() => setCopiedSlide(null), 2000);
  };

  const copyAll = () => {
    if (!output) return;
    const text = output?.laminas
      .map((l: SlideType) => `LÁMINA ${l.numero} — ${l.tipo}\n${l.copy}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const resetAll = () => {
    setStep(1);
    setOutput(null);
    setError("");
    setForm(initialForm);
  };

  // ───────────── PANTALLA DE ACCESO ─────────────
  if (!authenticated) {
    return (
      <SignIn
        password={password}
        setPassword={setPassword}
        handlePassword={handlePassword}
        passwordError={passwordError}
        fontStyle={fontStyle}
      />
    );
  }

  // ───────────── PANTALLA DE AVISO LEGAL ─────────────
  if (!acceptedLegal) {
    return <Legal setAcceptedLegal={setAcceptedLegal} fontStyle={fontStyle} />;
  }

  // ───────────── MAIN LAYOUT ─────────────
  return (
    <div
      style={{
        ...fontStyle,
        minHeight: "100vh",
        backgroundColor: BRAND.bg,
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(44, 62, 107, 0.08)",
          overflow: "hidden",
        }}
      >
        <HeaderNode />
        {step === 1 ? (
          <FormScreen
            form={form}
            updateForm={updateForm}
            setShowTonoDropdown={setShowTonoDropdown}
            showTonoDropdown={showTonoDropdown}
            generateCarrusel={generateCarrusel}
            loading={loading}
            error={error}
          />
        ) : (
          output && (
            <OutputScreen
              output={output}
              copySlide={copySlide}
              copyAll={copyAll}
              resetAll={resetAll}
              copiedSlide={copiedSlide}
              copiedAll={copiedAll}
            />
          )
        )}
      </div>
      <p
        style={{
          textAlign: "center",
          color: BRAND.muted,
          fontSize: "11px",
          marginTop: "20px",
        }}
      >
        IMAN · hola@isabermudez.com
      </p>
    </div>
  );
}
