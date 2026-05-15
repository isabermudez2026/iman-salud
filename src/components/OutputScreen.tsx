import { OutputType } from "@/types";
import { BRAND, tipoColor } from "@/utils/style";
import { Copy, Check, RotateCcw } from "lucide-react";

export const OutputScreen = ({
  output,
  copySlide,
  copyAll,
  resetAll,
  copiedSlide,
  copiedAll,
}: {
  output: OutputType;
  copySlide: ({ numero, copy }: { numero: number; copy: string }) => void;
  copyAll: () => void;
  resetAll: () => void;
  copiedSlide: number | null;
  copiedAll: boolean;
}) => {
  return (
    <div style={{ padding: "28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <h2
            style={{
              color: BRAND.navy,
              fontSize: "20px",
              fontWeight: "700",
              margin: "0 0 4px 0",
              letterSpacing: "-0.3px",
            }}
          >
            Carrusel listo · {output?.laminas.length} láminas
          </h2>
          <p
            style={{
              color: BRAND.muted,
              fontSize: "12px",
              margin: "0 0 4px 0",
            }}
          >
            Hook: {output?.hookSeleccionado}
            {output?.capaEstrategica
              ? ` · Estrategia: ${output?.capaEstrategica}`
              : ""}
          </p>
          {output?.justificacionLongitud && (
            <p
              style={{
                color: BRAND.muted,
                fontSize: "11px",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {output?.justificacionLongitud}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={copyAll}
            style={{
              padding: "9px 14px",
              backgroundColor: BRAND.blue,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {copiedAll ? (
              <>
                <Check size={13} /> Copiado
              </>
            ) : (
              <>
                <Copy size={13} /> Copiar todo
              </>
            )}
          </button>
          <button
            onClick={resetAll}
            style={{
              padding: "9px 14px",
              backgroundColor: "white",
              color: BRAND.navy,
              border: `1.5px solid ${BRAND.border}`,
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <RotateCcw size={13} /> Nuevo
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {output?.laminas.map((l) => (
          <div
            key={l.numero}
            style={{
              border: `1.5px solid ${BRAND.border}`,
              borderLeft: `4px solid ${tipoColor(l.tipo)}`,
              borderRadius: "10px",
              padding: "16px 18px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    backgroundColor: BRAND.navy,
                    color: BRAND.yellow,
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {l.numero}
                </span>
                <span
                  style={{
                    color:
                      tipoColor(l.tipo) === BRAND.yellow
                        ? BRAND.navy
                        : tipoColor(l.tipo),
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  {l.tipo}
                </span>
              </div>
              <button
                onClick={() => copySlide({ numero: l.numero, copy: l.copy })}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: BRAND.muted,
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  fontFamily: "inherit",
                }}
              >
                {copiedSlide === l.numero ? (
                  <>
                    <Check size={12} color={BRAND.blue} />{" "}
                    <span style={{ color: BRAND.blue }}>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copiar
                  </>
                )}
              </button>
            </div>
            <p
              style={{
                color: BRAND.text,
                fontSize: "14px",
                margin: 0,
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
            >
              {l.copy}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "14px",
          backgroundColor: BRAND.bg,
          borderRadius: "8px",
          fontSize: "11px",
          color: BRAND.muted,
          lineHeight: "1.6",
        }}
      >
        Recuerda: revisa, valida clínicamente y adapta antes de publicar.
        Incluye siempre la aclaración de que el contenido no sustituye consulta
        médica.
      </div>
    </div>
  );
};
