export type MurosOpciones = {
  value: string;
  label: string;
};

export const ListaMuros: MurosOpciones[] = [
  {
    value: "A",
    label: "Concreto armado o mixtos de concreto armado y albañilería confinada",
  },
  {
    value: "B",
    label: "Albañilería confinada o reforzada de ladrillo o bloque de cemento",
  },
  {
    value: "C",
    label: "Adobe reforzado o tapia confinada",
  },
  {
    value: "D",
    label: "Madera estructural o quincha reforzada",
  },
  {
    value: "E",
    label: "Adobe, tapia o quincha sin refuerzo estructural",
  },
  {
    value: "F",
    label: "Material rústico (piedra, caña, estera, etc.)",
  },
  {
    value: "G",
    label: "Sin muros o sin columnas definidas",
  },
];