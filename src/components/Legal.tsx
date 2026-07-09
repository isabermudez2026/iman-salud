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
            Aviso Legal y Condiciones de Uso
          </h2>
        </div>
        <div style={{ color: BRAND.text, fontSize: "13px", lineHeight: "1.7" }}>
          <p style={{ marginTop: 0 }}>
            El &quot;Sistema Estratégico IMAN · Profesionales de la Salud&quot;
            es un recurso de uso exclusivo para los alumnos activos de Isa
            Bermúdez. Al acceder, aceptas que:
          </p>
          <ol style={{ paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Tu criterio es lo primero.</strong> El contenido lo
              genera una IA y es una guía de apoyo. Es tu responsabilidad
              revisar, editar y validar cada palabra antes de publicar. La
              responsabilidad médico-legal es siempre tuya.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Privacidad absoluta (HIPAA/RGPD).</strong> Está prohibido
              ingresar nombres, historias clínicas o datos personales de
              pacientes. No incluyas información protegida en la plataforma.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Fin educativo, no médico.</strong> Este material es para
              marketing y educación general. No sustituye un diagnóstico ni tu
              intervención profesional calificada.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Uso personal y autorizado.</strong> Esta herramienta ha
              sido diseñada únicamente para potenciar tu marca personal y
              práctica profesional. Queda estrictamente prohibido compartir,
              distribuir o ceder tus credenciales de acceso a terceros.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Derechos de autor.</strong> El sistema, su metodología y
              su estructura son propiedad intelectual protegida. Su
              reproducción total o parcial no está permitida.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Comunidad privada.</strong> Formas parte de un entorno de
              aprendizaje selecto. El uso indebido de este sistema por
              personas ajenas a la formación compromete la integridad
              estratégica de nuestra comunidad.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>
                Acceso a la herramienta (Bono de regalo no ofertado).
              </strong>{" "}
              El acceso a esta herramienta se otorga exclusivamente como un
              beneficio de cortesía derivado de la adquisición y participación
              en IMAN profesionales de la salud con Isa Bermúdez. Este acceso
              es de carácter temporal durante 2026 con limites de uso por
              usuario. Transcurrido este plazo o número de carruseles limite,
              el acceso gratuito finalizará de forma automática, reservándose
              el derecho de continuidad bajo las tarifas comerciales vigentes
              en ese momento.
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
