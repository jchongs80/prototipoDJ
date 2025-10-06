export type TechoOpciones = {
  value: string;
  label: string;
};

export const ListaTechos: TechoOpciones[] = [
  {
    value: "A",
    label: "Losa o aligerado de concreto armado con luces >6m y sobrecarga >300kg/m²",
  },
  {
    value: "B",
    label: "Aligerados o losas de concreto armado inclinadas",
  },
  {
    value: "C",
    label: "Aligerados o losas de concreto armado horizontales",
  },
  {
    value: "D",
    label: "Calamina metálica o fibrocemento sobre viguería metálica o bambú",
  },
  {
    value: "E",
    label: "Madera con impermeabilizante o policarbonato",
  },
  {
    value: "F",
    label: "Calamina metálica, fibrocemento o teja sobre viguería de madera corriente",
  },
  {
    value: "G",
    label: "Madera rústica o caña con torta de barro",
  },
  {
    value: "H",
    label: "Sin techo",
  },
];