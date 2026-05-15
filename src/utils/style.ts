export const BRAND = {
  blue: "#4E78B8",
  navy: "#2C3E6B",
  yellow: "#FFE600",
  bg: "#F5F7FA",
  text: "#1A2240",
  muted: "#6B7794",
  border: "#E1E6F0",
};

export const fontStyle = {
  fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
};

export const tipoColor = (tipo: string) => {
  switch (tipo) {
    case "HOOK":
      return BRAND.yellow;
    case "IDENTIFICACIÓN":
      return "#F2C94C";
    case "INSIGHT MÉDICO":
      return BRAND.blue;
    case "ORIENTACIÓN":
      return "#26A69A";
    case "REENCUADRE":
      return "#7B68EE";
    default:
      return BRAND.muted;
  }
};
