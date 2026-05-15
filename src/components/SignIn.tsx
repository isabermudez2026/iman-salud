import { BRAND } from "@/utils/style";
import { AlertCircle } from "lucide-react";

export const SignIn = ({
  password,
  setPassword,
  handlePassword,
  passwordError,
  fontStyle,
}: {
  password: string;
  setPassword: (password: string) => void;
  handlePassword: () => void;
  passwordError: string;
  fontStyle: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        ...fontStyle,
        minHeight: "100vh",
        backgroundColor: BRAND.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "440px",
          width: "100%",
          boxShadow: "0 4px 24px rgba(44, 62, 107, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              fontSize: "38px",
              color: BRAND.navy,
              letterSpacing: "-1.5px",
              lineHeight: "1",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontWeight: "800" }}>isa</span>
            <span style={{ fontWeight: "300" }}>bermūdez</span>
          </div>
        </div>
        <div
          style={{
            width: "40px",
            height: "3px",
            backgroundColor: BRAND.yellow,
            margin: "0 auto 20px auto",
            borderRadius: "2px",
          }}
        />
        <h1
          style={{
            color: BRAND.navy,
            fontSize: "20px",
            fontWeight: "700",
            textAlign: "center",
            margin: "0 0 6px 0",
            letterSpacing: "-0.4px",
          }}
        >
          IMAN Salud Carruseles
        </h1>
        <p
          style={{
            color: BRAND.muted,
            fontSize: "13px",
            textAlign: "center",
            margin: "0 0 28px 0",
          }}
        >
          Sistema estratégico para profesionales de la salud
        </p>
        <label
          style={{
            display: "block",
            color: BRAND.text,
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Contraseña de acceso
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePassword()}
          placeholder="Ingresa tu contraseña"
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: "14px",
            border: `1.5px solid ${BRAND.border}`,
            borderRadius: "8px",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
        />
        {passwordError && (
          <p
            style={{
              color: "#D32F2F",
              fontSize: "12px",
              margin: "8px 0 0 0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <AlertCircle size={14} /> {passwordError}
          </p>
        )}
        <button
          onClick={handlePassword}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "13px",
            backgroundColor: BRAND.blue,
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Acceder
        </button>
        <p
          style={{
            color: BRAND.muted,
            fontSize: "11px",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          hola@isabermudez.com
        </p>
      </div>
    </div>
  );
};
