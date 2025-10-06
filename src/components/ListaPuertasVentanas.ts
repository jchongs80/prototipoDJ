export type PuertasVentanasOpciones = {
  value: string;
  label: string;
};

export const ListaPuertasVentanas: PuertasVentanasOpciones[] = [
  {
    value: "A",
    label: "Puertas y ventanas de madera fina o metálicas con acabado superior",
  },
  {
    value: "B",
    label: "Puertas y ventanas metálicas o de madera común con acabado regular",
  },
  {
    value: "C",
    label: "Puertas y ventanas de madera rústica, triplay o sin acabado",
  },
  {
    value: "D",
    label: "Puertas y ventanas simples o incompletas (sólo bastidores)",
  },
  {
    value: "E",
    label: "Sin puertas ni ventanas instaladas",
  },
];