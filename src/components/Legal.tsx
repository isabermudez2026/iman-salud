import { BRAND } from "@/utils/style";
import { FileText } from "lucide-react";

export const Legal = ({
  setAcceptedLegal,
  fontStyle,
}: {
  setAcceptedLegal: (accepted: boolean) => void;
  fontStyle: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        ...fontStyle,
        minHeight: "100vh",
        backgroundColor: BRAND.bg,
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "36px",
          boxShadow: "0 4px 24px rgba(44, 62, 107, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <FileText size={24} color={BRAND.navy} />
          <h2
            style={{
              color: BRAND.navy,
              fontSize: "22px",
              fontWeight: "700",
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            Aviso legal y condiciones de uso
          </h2>
        </div>
        <div style={{ color: BRAND.text, fontSize: "13px", lineHeight: "1.7" }}>
          <p style={{ marginTop: 0 }}>
            Antes de utilizar IMAN Salud Carruseles, debes leer y aceptar las
            siguientes condiciones:
          </p>
          <ol style={{ paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Uso profesional exclusivo.</strong> Esta herramienta está
              diseñada exclusivamente para profesionales de la salud debidamente
              acreditados. El usuario declara contar con la titulación, licencia
              y autorización vigente para ejercer su especialidad en su
              jurisdicción.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Contenido no sustituye consulta médica.</strong> Los
              carruseles generados son piezas de comunicación educativa y de
              posicionamiento profesional. No constituyen diagnóstico,
              tratamiento ni recomendación clínica individualizada. Cualquier
              contenido publicado debe incluir esta aclaración.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Responsabilidad clínica y editorial.</strong> El usuario
              es el único responsable del contenido que publica. Antes de
              difundir cualquier carrusel, debe revisarlo, validarlo
              clínicamente y adaptarlo según la normativa de su gremio, colegio
              profesional y país.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Cumplimiento normativo y publicitario.</strong> El usuario
              se compromete a cumplir con las regulaciones sanitarias, de
              publicidad médica, protección de datos y derechos del paciente
              vigentes en su jurisdicción. IMAN y su autora no se
              responsabilizan por usos que infrinjan dichas normativas.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Confidencialidad de pacientes.</strong> Queda prohibido
              ingresar datos identificables de pacientes reales (nombres,
              historias clínicas, imágenes) en los campos de esta herramienta.
              Cualquier referencia debe ser genérica, anonimizada y respetar el
              secreto profesional.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Propiedad y limitación de garantías.</strong> El sistema
              IMAN, su metodología y arquitectura son propiedad de Isa Bermúdez.
              Se concede al usuario un uso personal e intransferible para fines
              de su práctica profesional. La herramienta se ofrece &quot;tal
              cual&quot;; los resultados dependen de la calidad de los inputs y
              del criterio clínico del usuario.
            </li>
          </ol>
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            marginTop: "20px",
            padding: "14px",
            backgroundColor: BRAND.bg,
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            onChange={(e) => e.target.checked && setAcceptedLegal(true)}
            style={{ marginTop: "2px", cursor: "pointer" }}
          />
          <span
            style={{ fontSize: "13px", color: BRAND.text, lineHeight: "1.5" }}
          >
            He leído y acepto las condiciones de uso. Confirmo que soy un
            profesional de la salud acreditado y asumo la responsabilidad
            clínica y editorial del contenido que genere y publique.
          </span>
        </label>
        <p
          style={{
            color: BRAND.muted,
            fontSize: "11px",
            textAlign: "center",
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          Para consultas: hola@isabermudez.com
        </p>
      </div>
    </div>
  );
};
