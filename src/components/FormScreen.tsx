import { BRAND } from "@/utils/style";
import { AlertCircle, Check, Sparkles } from "lucide-react";
import { camposBase, tiposHook, tonosSugeridos } from "@/utils/constants";
import { FormType } from "@/types";

export const FormScreen = ({
  form,
  updateForm,
  setShowTonoDropdown,
  showTonoDropdown,
  generateCarrusel,
  loading,
  error,
}: {
  form: FormType;
  updateForm: ({
    field,
    value,
  }: {
    field: keyof FormType;
    value: string;
  }) => void;
  setShowTonoDropdown: (show: boolean) => void;
  showTonoDropdown: boolean;
  generateCarrusel: () => void;
  loading: boolean;
  error: string;
}) => {
  const validateForm = () => {
    return (
      form.especialidad.trim() &&
      form.pacienteIdeal.trim() &&
      form.problema.trim() &&
      form.enfoqueDiferencial.trim() &&
      form.tipoServicio.trim() &&
      form.tonoVoz.trim()
    );
  };

  return (
    <div style={{ padding: "28px" }}>
      <h2
        style={{
          color: BRAND.navy,
          fontSize: "20px",
          fontWeight: "700",
          margin: "0 0 6px 0",
          letterSpacing: "-0.3px",
        }}
      >
        Generar carrusel
      </h2>
      <p style={{ color: BRAND.muted, fontSize: "13px", margin: "0 0 24px 0" }}>
        Completa los datos. El sistema construye internamente el diagnóstico
        estratégico.
      </p>

      {camposBase.map((f) => (
        <div key={f.key} style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              color: BRAND.text,
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "6px",
            }}
          >
            {f.label}
          </label>
          <input
            type="text"
            value={form[f.key as keyof FormType] as string}
            onChange={(e) =>
              updateForm({
                field: f.key as keyof FormType,
                value: e.target.value,
              })
            }
            placeholder={f.placeholder}
            style={{
              width: "100%",
              padding: "11px 13px",
              fontSize: "13px",
              border: `1.5px solid ${BRAND.border}`,
              borderRadius: "8px",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>
      ))}

      {/* Tono y voz · combobox */}
      <div style={{ marginBottom: "16px", position: "relative" }}>
        <label
          style={{
            display: "block",
            color: BRAND.text,
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "6px",
          }}
        >
          ¿Cómo hablas con tus pacientes?
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={form.tonoVoz}
            onChange={(e) => {
              updateForm({ field: "tonoVoz", value: e.target.value });
              setShowTonoDropdown(true);
            }}
            onFocus={() => setShowTonoDropdown(true)}
            onBlur={() => setTimeout(() => setShowTonoDropdown(false), 150)}
            placeholder="Escribe tu tono propio aquí o elige uno sugerido…"
            style={{
              width: "100%",
              padding: "11px 38px 11px 13px",
              fontSize: "13px",
              border: `1.5px solid ${showTonoDropdown ? BRAND.blue : BRAND.border}`,
              borderRadius: "8px",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              backgroundColor: "white",
            }}
          />
          <div
            onClick={() => setShowTonoDropdown(!showTonoDropdown)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: `translateY(-50%) rotate(${showTonoDropdown ? "180deg" : "0deg"})`,
              cursor: "pointer",
              color: BRAND.muted,
              transition: "transform 0.2s",
              display: "flex",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          {showTonoDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: `1.5px solid ${BRAND.border}`,
                borderRadius: "8px",
                boxShadow: "0 6px 16px rgba(44, 62, 107, 0.12)",
                maxHeight: "280px",
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  padding: "10px 13px",
                  fontSize: "11px",
                  color: BRAND.navy,
                  backgroundColor: "#FFF8E1",
                  borderBottom: `1px solid ${BRAND.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  lineHeight: "1.4",
                }}
              >
                <Sparkles size={13} style={{ flexShrink: 0 }} />
                <span>
                  <strong>Escribe directamente en el campo de arriba</strong>{" "}
                  para definir tu tono propio, o elige uno de los sugeridos.
                </span>
              </div>
              <div
                style={{
                  padding: "8px 13px 6px 13px",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: BRAND.muted,
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                }}
              >
                Tonos sugeridos
              </div>
              {tonosSugeridos
                .filter(
                  (t) =>
                    form.tonoVoz === "" ||
                    t.toLowerCase().includes(form.tonoVoz.toLowerCase()) ||
                    form.tonoVoz === t,
                )
                .map((t) => (
                  <div
                    key={t}
                    onMouseDown={() => {
                      updateForm({ field: "tonoVoz", value: t });
                      setShowTonoDropdown(false);
                    }}
                    style={{
                      padding: "10px 13px",
                      fontSize: "13px",
                      color: BRAND.text,
                      cursor: "pointer",
                      backgroundColor: form.tonoVoz === t ? "#EFF3FB" : "white",
                      fontWeight: form.tonoVoz === t ? "600" : "400",
                    }}
                  >
                    {t}
                  </div>
                ))}
              {tonosSugeridos.filter(
                (t) =>
                  form.tonoVoz === "" ||
                  t.toLowerCase().includes(form.tonoVoz.toLowerCase()) ||
                  form.tonoVoz === t,
              ).length === 0 && (
                <div
                  style={{
                    padding: "12px 13px",
                    fontSize: "12px",
                    color: BRAND.muted,
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  Ningún tono sugerido coincide. Tu texto quedará como tono
                  propio.
                </div>
              )}
              {form.tonoVoz && !tonosSugeridos.includes(form.tonoVoz) && (
                <div
                  style={{
                    padding: "12px 13px",
                    fontSize: "12px",
                    color: BRAND.blue,
                    borderTop: `1px solid ${BRAND.border}`,
                    backgroundColor: "#F8FAFD",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Check size={14} />
                  <span>
                    Tono propio guardado:{" "}
                    <strong>&quot;{form.tonoVoz}&quot;</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <p
          style={{
            color: BRAND.muted,
            fontSize: "11px",
            margin: "6px 0 0 0",
            lineHeight: "1.4",
          }}
        >
          Escribe libremente tu tono propio (ej: &quot;directo y cálido&quot;,
          &quot;irónico pero respetuoso&quot;) o elige uno de los sugeridos.
        </p>
      </div>

      {/* Frase real · opcional */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            color: BRAND.text,
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "6px",
          }}
        >
          Frase real que usarías en consulta sobre este problema{" "}
          <span style={{ color: BRAND.muted, fontWeight: "400" }}>
            (opcional)
          </span>
        </label>
        <textarea
          value={form.fraseReal}
          onChange={(e) =>
            updateForm({ field: "fraseReal", value: e.target.value })
          }
          placeholder="Si quieres, cita textualmente algo que le dirías a un paciente. Esta frase calibra el tono del carrusel a tu voz real."
          rows={2}
          style={{
            width: "100%",
            padding: "11px 13px",
            fontSize: "13px",
            border: `1.5px solid ${BRAND.border}`,
            borderRadius: "8px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
            resize: "vertical",
            lineHeight: "1.5",
          }}
        />
      </div>

      {/* Tipo de hook */}
      <label
        style={{
          display: "block",
          color: BRAND.text,
          fontSize: "12px",
          fontWeight: "600",
          marginBottom: "6px",
        }}
      >
        Tipo de hook
      </label>
      <select
        value={form.tipoHook}
        onChange={(e) =>
          updateForm({ field: "tipoHook", value: e.target.value })
        }
        style={{
          width: "100%",
          padding: "11px 13px",
          fontSize: "13px",
          border: `1.5px solid ${BRAND.border}`,
          borderRadius: "8px",
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        {tiposHook.map((h) => (
          <option key={h.value} value={h.value}>
            {h.label}
          </option>
        ))}
      </select>

      {error && (
        <div
          style={{
            backgroundColor: "#FFEBEE",
            border: "1px solid #D32F2F",
            borderRadius: "8px",
            padding: "10px 12px",
            marginBottom: "16px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <AlertCircle
            size={14}
            color="#D32F2F"
            style={{ marginTop: "2px", flexShrink: 0 }}
          />
          <p style={{ color: "#D32F2F", fontSize: "12px", margin: 0 }}>
            {error}
          </p>
        </div>
      )}

      <button
        onClick={() => validateForm() && generateCarrusel()}
        disabled={!validateForm() || loading}
        style={{
          width: "100%",
          padding: "13px",
          backgroundColor:
            validateForm() && !loading ? BRAND.navy : BRAND.border,
          color: validateForm() && !loading ? BRAND.yellow : "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: validateForm() && !loading ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          letterSpacing: "0.3px",
        }}
      >
        {loading ? (
          <>
            <div
              style={{
                width: "14px",
                height: "14px",
                border: `2px solid ${BRAND.yellow}`,
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            Generando carrusel...
          </>
        ) : (
          <>
            <Sparkles size={16} /> Generar carrusel
          </>
        )}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
