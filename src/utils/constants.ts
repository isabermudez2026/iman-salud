export const tonosSugeridos = [
  "Directo",
  "Empático",
  "Técnico",
  "Cercano",
  "Firme",
  "Cálido",
  "Pedagógico",
  "Sereno",
  "Inspirador",
  "Provocador",
];

export const tiposHook = [
  {
    value: "automatico",
    label: "Automático (el sistema elige el más potente)",
  },
  {
    value: "ERROR INVISIBLE",
    label: "Error invisible — el paciente cree que está bien",
  },
  {
    value: "FALSA NORMALIDAD",
    label: "Falsa normalidad — rompe lo normalizado",
  },
  {
    value: "IDENTIFICACIÓN DIRECTA",
    label: "Identificación directa — escena concreta",
  },
  { value: "CONTRADICCIÓN", label: "Contradicción — rompe creencia instalada" },
  {
    value: "CONSECUENCIA SILENCIOSA",
    label: "Consecuencia silenciosa — sin alarmismo",
  },
  { value: "PREGUNTA INCÓMODA", label: "Pregunta incómoda — duda interna" },
  {
    value: "EXPERIENCIA CLÍNICA",
    label: "Experiencia clínica — autoridad desde consulta",
  },
  { value: "DESMONTE DE MITO", label: "Desmonte de mito" },
  { value: "ERROR DE AUTODIAGNÓSTICO", label: "Error de autodiagnóstico" },
  { value: "MICRO-SÍNTOMA", label: "Micro-síntoma ignorado" },
  { value: "COSTO OCULTO", label: "Costo oculto de no actuar" },
  { value: "ERROR COMÚN", label: "Error común en pacientes" },
];

export const camposBase = [
  {
    key: "especialidad",
    label: "Especialidad",
    placeholder: "Ej: Endocrinología, Dermatología pediátrica…",
  },
  {
    key: "pacienteIdeal",
    label: "Tipo de paciente ideal",
    placeholder: "Ej: Mujeres 35-50 con fatiga crónica no diagnosticada",
  },
  {
    key: "problema",
    label: "Problema clínico a tratar en este carrusel",
    placeholder: "Ej: Resistencia a la insulina mal diagnosticada como estrés",
  },
  {
    key: "enfoqueDiferencial",
    label: "¿Cuál es tu enfoque diferenciador?",
    placeholder:
      "Ej: Combino medicina funcional con análisis bioquímico avanzado para encontrar la causa raíz que otros pasan por alto",
  },
  {
    key: "tipoServicio",
    label: "Tipo de servicio",
    placeholder: "Ej: Consulta presencial, telemedicina, programa 12 semanas",
  },
];
