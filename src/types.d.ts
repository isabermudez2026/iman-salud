export type FormType = {
  especialidad: string;
  pacienteIdeal: string;
  problema: string;
  enfoqueDiferencial: string;
  tipoServicio: string;
  tonoVoz: string;
  fraseReal: string;
  tipoHook: string;
};

export type OutputType = {
  hookSeleccionado: string;
  capaEstrategica: string;
  totalLaminas: number;
  justificacionLongitud: string;
  laminas: SlideType[];
};

export type SlideType = {
  numero: number;
  tipo: string;
  copy: string;
};
