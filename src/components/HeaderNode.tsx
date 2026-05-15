import { BRAND } from "@/utils/style";
import { Stethoscope } from "lucide-react";

export const HeaderNode = () => (
  <div
    style={{
      backgroundColor: BRAND.navy,
      padding: "20px 24px",
      borderRadius: "12px 12px 0 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Stethoscope size={22} color={BRAND.yellow} />
      <div>
        <h1
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            margin: 0,
            letterSpacing: "-0.3px",
          }}
        >
          IMAN Salud Carruseles
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "11px",
            margin: 0,
          }}
        >
          Sistema estratégico v2
        </p>
      </div>
    </div>
  </div>
);
