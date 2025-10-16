import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { SelectChangeEvent } from "@mui/material/Select";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SelectConstruccion from "./SelectContruccion";
import { ListaMuros } from "./ListaMuros";
import { ListaTechos } from "./ListaTechos";
import { ListaPuertasVentanas } from "./ListaPuertasVentanas";

// ✅ 1️⃣ INTERFACE CORRECTA
type Paso4ConstruccionProps ={
  onChatMessage?: (mensaje: string) => void;
}


// ======= Listas de Selects =======
const tipoNivelList = ["Piso", "Mezzanine", "Sótano", "Azotea", "Aires"];
const materialList = ["Concreto", "Ladrillo", "Adobe"];
const estadoConservList = ["Muy bueno", "Bueno", "Regular", "Malo"];
const unidadMedidaList = ["m2", "m3", "litros", "metros"];

const descripcionesObra = [
  "Muro de concreto armado que incluye armadura y cimentacion.",
  "Muro traslucido de concreto armado (tipo UNI) y/o metálico que incluye cimentación. h: 2.40 m.",
  "Muro de ladrillo con columnas de concreto armado y/o metálicas que incluye cimentacion h. (altura) mayor a 2.40 m.",
  "Muro de ladrillo con columnas de concreto armado y/o metálicas que incluye cimentacion. h. hasta 2.40 m.",
  "Muro de ladrillo con columnas de concreto armado Solaqueados h. hasta 2.40 m.",
  "Pasamano Metalico de Tubo Redondo Galvanizado de 3\"",
  "Pasamano Metalico de Tubo Redondo Galvanizado de 2\"",
  "Pasamano Metalico de Tubo Redondo Galvanizado de 1\"",
  "Cerco Metalico; Tubo Redondo 2\" Ang 1\" Malla 2x2 Alam #8",
  "Cerco Metalico; Tubo Redondo 2\" Ang 1\" Malla 2x2 Alam #10",
  "Cerco Metalico; Tubo Redondo 2\" Ang 1\" Malla 2x2 Alam #12",
  "Poste/Estructura de fierro h=4mt",
  "Poste/Estructura de fierro h=2.50mt",
  "Sardinell de concreto e=0,15m; h=0,65m",
  "Pista o Losa de Concreto de 6\"",
  "Trampa de Grasa de concreto armado",
  "Plataforma de Estacionamiento hasta 2 niveles.",
];

const categoriasObra = [
  "Muros perimétricos o cercos",
  "Portones y puertas",
  "Tanques elevados",
  "Cisternas, pozos sumideros, tanques septicos",
  "Piscinas, espejos de agua",
  "Losas deportivas, estacionamientos...",
  "Hornos, chimeneas, incineradores",
  "Torres de vigilancia",
  "Bovedas",
  "Balanzas industriales",
  "Postes de alumbrado",
  "Bases de soporte de maquinas",
  "Cajas de Registro de Concreto",
  "Buzón de Concreto",
  "Parapeto",
  "Rampas, Gradas y Escaleras de Concreto",
  "Muro de Contención de Concreto Armado",
];

const getColorByLetra = (letra: string) => {
  switch (letra) {
    case "A": return "#1565c0"; // azul fuerte
    case "B": return "#2e7d32"; // verde
    case "C": return "#f9a825"; // amarillo
    case "D": return "#ef6c00"; // naranja
    case "E": return "#6a1b9a"; // morado
    default: return "#607d8b"; // gris por defecto
  }
};

const compactTableTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          padding: "3px 7px",
        },
        head: {
          fontWeight: 550,
          backgroundColor: "#f8f9fb",
          color: "#333",
          fontSize: "0.72rem",
        },
      },
    },
  },
});

// ====== Tipos ======
interface Piso {
  tipoNivel: string;
  nroPiso: string;
  fechaConstruccion: string;
  areaPropia: string;
  areaComun: string;
  material: string;
  estadoConserv: string;
  muros: string;
  techos: string;
  puertasVentanas: string;
  valorUnitario: string;
  incremento: string;
  depreciacion: string;
  valorDepreciado: string;
  valorFinal: string;
}

interface Obra {
  descripcion: string;
  tipoNivel: string;
  nroPiso: string;
  material: string;
  estadoConserv: string;
  categoria: string;
  cantidad: string;
  unidadMedida: string;
  metrado: string;
  mesAnio: string;
  valorObra: string;
  incremento: string;
  depreciacion: string;
  valorObraDepreciada: string;
  factorOfic: string;
  valorTotalObras: string;
}


const Paso4Construccion: React.FC<Paso4ConstruccionProps> = ( props) => {
  
const { onChatMessage } = props; // 🔹 evita sombrear el tipo
  
  // ✅ 3️⃣ FUNCIONES AUXILIARES (no confundir con el tipo)
  const avisarNuevoPiso = () => {
    onChatMessage?.(
      "🏗️ Ahora estás registrando un nuevo piso. Completa los campos relacionados con el nivel, área, materiales y estado de conservación.\n\n💬 Si tienes dudas sobre cómo llenar este formulario para agregar un piso con características de construcción, solo preguntame y yo estaré gustoso de ayudarte en el registro de tu DJ."
    );
  };

  const avisarNuevaObra = () => {
    onChatMessage?.(
      "⚙️ Estás registrando una nueva obra complementaria. Completa los campos de descripción, categoría, materiales y medidas.\n\n💬 Si tienes dudas sobre cómo llenar este formulario para agregar una obra complementaria, solo preguntame y yo estaré gustoso de ayudarte en el registro de tu DJ."
    );
  };


  // ✅ 4️⃣ HANDLERS DE BOTONES
  const handleAgregarPisoClick = () => {
    setMostrarFormPiso(true);
    setMostrarFormObra(false);
    avisarNuevoPiso();
  };

  const handleAgregarObraClick = () => {
    setMostrarFormObra(true);
    setMostrarFormPiso(false);
    avisarNuevaObra();
  };
 

  const pisoInicial: Piso = {
  tipoNivel: "",
  nroPiso: "",
  fechaConstruccion: "",
  areaPropia: "",
  areaComun: "",
  material: "",
  estadoConserv: "",
  muros: "",
  techos: "",
  puertasVentanas: "",
  valorUnitario: "100",
  incremento: "5",
  depreciacion: "15",
  valorDepreciado: "15",
  valorFinal: "90",
};




  const [nuevaObra, setNuevaObra] = useState<Obra>({
    descripcion: "",
    tipoNivel: "",
    nroPiso: "",
    material: "",
    estadoConserv: "",
    categoria: "",
    cantidad: "",
    unidadMedida: "",
    metrado: "",
    mesAnio: "",
    valorObra: "100",
    incremento: "5",
    depreciacion: "15",
    valorObraDepreciada: "85",
    factorOfic: "0.68",
    valorTotalObras: "57.8",
  });


  const [pisos, setPisos] = useState<Piso[]>([
 {
    tipoNivel: "Piso",
    nroPiso: "1",
    fechaConstruccion: "2025-10",
    areaPropia: "30",
    areaComun: "0",
    material: "Concreto",
    estadoConserv: "Bueno",
    muros: "A",
    techos: "A",
    puertasVentanas: "B",
    valorUnitario: "100",
    incremento: "5",
    depreciacion: "15",
    valorDepreciado: "15",
    valorFinal: "90",
  },
  {
    tipoNivel: "Piso",
    nroPiso: "2",
    fechaConstruccion: "2025-10",
    areaPropia: "25",
    areaComun: "0",
    material: "Concreto",
    estadoConserv: "Bueno",
    muros: "A",
    techos: "A",
    puertasVentanas: "C",
    valorUnitario: "100",
    incremento: "5",
    depreciacion: "15",
    valorDepreciado: "15",
    valorFinal: "90",
  },
  {
    tipoNivel: "Piso",
    nroPiso: "3",
    fechaConstruccion: "2025-10",
    areaPropia: "20",
    areaComun: "0",
    material: "Concreto",
    estadoConserv: "Bueno",
    muros: "B",
    techos: "B",
    puertasVentanas: "D",
    valorUnitario: "100",
    incremento: "5",
    depreciacion: "15",
    valorDepreciado: "15",
    valorFinal: "90",
  },
]);

 const [nuevoPiso, setNuevoPiso] = useState<Piso>(pisoInicial);

  const [obras, setObras] = useState<Obra[]>([
     {
    descripcion: "Muro de ladrillo con columnas de concreto armado y/o metálicas que incluye cimentacion. h. hasta 2.40 m.",
    tipoNivel: "Piso",
    nroPiso: "1",
    material: "Concreto",
    estadoConserv: "Bueno",
    categoria: "Muros perimétricos o cercos",
    cantidad: "1",
    unidadMedida: "m²",
    metrado: "10",
    mesAnio: "2025-10",
    valorObra: "100",
    incremento: "5",
    depreciacion: "15",
    valorObraDepreciada: "85",
    factorOfic: "0.68",
    valorTotalObras: "57.8",
  },
  ]);
  const [mostrarFormPiso, setMostrarFormPiso] = useState(false);
  const [mostrarFormObra, setMostrarFormObra] = useState(false);
  
  const [erroresPiso, setErroresPiso] = useState<{ [key: string]: boolean }>({});
  const [erroresObra, setErroresObra] = useState<{ [key: string]: boolean }>({});

  // ✅ Snackbar de éxito
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChangePiso = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  // Actualiza el valor
  setNuevoPiso((prev) => ({ ...prev, [name]: value }));

  // ✅ Si el campo tenía error y ahora el usuario escribe algo, se limpia el error
  if (erroresPiso[name]) {
    setErroresPiso((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }
};



 const camposObligatoriosObra = [
  "descripcion",
  "categoria",
  "unidadMedida",
  "mesAnio",
  "material",
  "estadoConserv",
  "tipoNivel",
  "nroPiso",
  "cantidad",
  "metrado",
];

const handleAgregarPiso = () => {
  const camposObligatorios = [
    "tipoNivel",
    "nroPiso",
    "fechaConstruccion",
    "areaPropia",
    "areaComun",
    "material",
    "estadoConserv",
    "muros",
    "techos",
    "puertasVentanas",
  ];


   // Validar vacíos
  const nuevosErrores: Record<string, boolean> = {};
  camposObligatorios.forEach((campo) => {
    if (!nuevoPiso[campo as keyof Piso] || (nuevoPiso[campo as keyof Piso] + "").trim() === "") {
      nuevosErrores[campo] = true;
    }
  });




  // Si hay errores, marcarlos y detener proceso
  if (Object.keys(nuevosErrores).length > 0) {
    setErroresPiso(nuevosErrores);
    return;
  }


  // ✅ Si todo está bien, agrega el piso
  setPisos((prev) => [...prev, { ...nuevoPiso }]);
  setNuevoPiso(pisoInicial);
  setErroresPiso({});
  setMostrarFormPiso(false); // ✅ Cierra formulario y vuelve a mostrar todo

   // Mostrar Snackbar
  setOpenSnackbar(true);

};

  const handleAgregarObra = () => {
  const nuevosErrores: Record<string, boolean> = {};

  camposObligatoriosObra.forEach((campo) => {
    if (!nuevaObra[campo as keyof Obra] || (nuevaObra[campo as keyof Obra] + "").trim() === "") {
      nuevosErrores[campo] = true;
    }
  });

  if (Object.keys(nuevosErrores).length > 0) {
    setErroresObra(nuevosErrores);
    return; // Detiene si hay campos vacíos
  }

  setObras((prev) => [...prev, { ...nuevaObra }]);
  setNuevaObra({
    descripcion: "",
    tipoNivel: "",
    nroPiso: "",
    material: "",
    estadoConserv: "",
    categoria: "",
    cantidad: "",
    unidadMedida: "",
    metrado: "",
    mesAnio: "",
    valorObra: "100",
    incremento: "5",
    depreciacion: "15",
    valorObraDepreciada: "85",
    factorOfic: "0.68",
    valorTotalObras: "57.8",
  });

  setErroresObra({});
  setMostrarFormObra(false);
  setOpenSnackbar(true);
};

  const totalConstruccion = pisos.reduce(
    (acc, p) => acc + parseFloat(p.valorFinal || "0"),
    0
  );
  const totalObras = obras.reduce(
    (acc, o) => acc + parseFloat(o.valorTotalObras || "0"),
    0
  );

const handleObraChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
) => {
  const { name, value } = e.target as HTMLInputElement;
  setNuevaObra((prev) => ({ ...prev, [name]: value }));

  if (erroresObra[name]) {
    setErroresObra((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }
};





  return (
    <Box sx={{ p: 3 }}>
      {/* ====== CONSTRUCCIÓN ====== */}
      {!mostrarFormObra && (
        <>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          color: "#003366",
          mb: 2,
        }}
      >
        <ApartmentIcon sx={{ mr: 1 }} /> Características de la construcción propia y común
      </Typography>


      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        {!mostrarFormPiso ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Pisos registrados
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                color="success"
                onClick={handleAgregarPisoClick}
              >
                Agregar nuevo Piso
              </Button>
            </Box>
          <ThemeProvider theme={compactTableTheme}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f0f4f8" }}>
                <TableRow>
                  <TableCell>Nivel</TableCell>
                  <TableCell>N°Piso</TableCell>
                  <TableCell>Fecha de Construc.</TableCell>
                  <TableCell>Área Propia (m²)</TableCell>
                  <TableCell>Área Común (m²)</TableCell>
                  <TableCell>Material Estruct. Predom.</TableCell>
                  <TableCell>Estado de Conserv.</TableCell>
                  <TableCell >Muros y columnas</TableCell>
                  <TableCell>Techos</TableCell>
                  <TableCell>Puertas y Ventanas</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Valor unitario m² (S/.)</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Incremento (5%)</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Deprec. (S/.)</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Valor Unit. Deprec. (S/.)</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Valor Total Construcción (S/.)</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pisos.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.tipoNivel}</TableCell>
                    <TableCell>{p.nroPiso}</TableCell>
                    <TableCell>{p.fechaConstruccion}</TableCell>
                    <TableCell>{p.areaPropia}</TableCell>
                    <TableCell>{p.areaComun}</TableCell>
                    <TableCell>{p.material}</TableCell>
                    <TableCell>{p.estadoConserv}</TableCell>
                    <TableCell align="center"
                      sx={{
                        verticalAlign: "middle",
                        padding: 0,
                      }}><Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          bgcolor: getColorByLetra(p.muros), // azul SAT
                          color: "#fff",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          mx: "auto",
                        }}
                      >
                        {p.muros}
                      </Box></TableCell>
                                        <TableCell align="center"
                      sx={{
                        verticalAlign: "middle",
                        padding: 0,
                      }}><Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          bgcolor: getColorByLetra(p.techos), // verde SAT
                          color: "#fff",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          mx: "auto",
                        }}
                      >
                        {p.techos}
                      </Box></TableCell>
                                        <TableCell align="center"
                      sx={{
                        verticalAlign: "middle",
                        padding: 0,
                      }}><Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          bgcolor: getColorByLetra(p.puertasVentanas), // morado SAT
                          color: "#fff",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          mx: "auto",
                        }}
                      >
                        {p.puertasVentanas}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{p.valorUnitario}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{p.incremento}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{p.depreciacion}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{p.valorDepreciado}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{p.valorFinal}</TableCell>
                    <TableCell>
                      <Tooltip title="Eliminar">
                        <Button
                          color="error"
                          size="small"
                          onClick={() => setPisos(pisos.filter((_, idx) => idx !== i))}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </ThemeProvider>
            <Typography sx={{ textAlign: "right", fontWeight: 600, mt: 2 }}>
              Total de Construcción (S/): {totalConstruccion.toFixed(2)}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Nuevo Piso
          </Typography>

  


  {/* 🔹 Primera fila: Tipo Nivel, N° Piso, Área Propia, Área Común */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 2,
      mb: 2,
    }}
  >
  <TextField
    select
    label="Tipo de Nivel"
    name="tipoNivel"
    value={nuevoPiso.tipoNivel}
    onChange={handleChangePiso}
    size="small"
    error={!!erroresPiso["tipoNivel"]}
    helperText={erroresPiso["tipoNivel"] ? "Campo obligatorio" : ""}
  >
    {tipoNivelList.map((n) => (
      <MenuItem key={n} value={n}>
        {n}
      </MenuItem>
    ))}
  </TextField>

  <TextField
    label="N° Piso"
    name="nroPiso"
    value={nuevoPiso.nroPiso}
    onChange={handleChangePiso}
    size="small"
    error={!!erroresPiso["nroPiso"]}
    helperText={erroresPiso["nroPiso"] ? "Campo obligatorio" : ""}
  />

  <TextField
    label="Área Propia (m²)"
    name="areaPropia"
    value={nuevoPiso.areaPropia}
    onChange={handleChangePiso}
    size="small"
    error={!!erroresPiso["areaPropia"]}
    helperText={erroresPiso["areaPropia"] ? "Campo obligatorio" : ""}
  />

  <TextField
    label="Área Común (m²)"
    name="areaComun"
    value={nuevoPiso.areaComun}
    onChange={handleChangePiso}
    size="small"
    error={!!erroresPiso["areaComun"]}
    helperText={erroresPiso["areaComun"] ? "Campo obligatorio" : ""}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: erroresPiso["areaComun"] ? "#d32f2f" : "" },
      "&:hover fieldset": { borderColor: erroresPiso["areaComun"] ? "#d32f2f" : "" },
    },
  }}
  />
</Box>

{/* 🔹 Bloques inferior: Izquierdo (datos generales) y Derecho (componentes) */}
<Box
  sx={{
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
  }}
>
  {/* 🔸 Bloque Izquierdo */}
  <Box
    sx={{
      flex: 1,
      minWidth: 280,
      p: 2,
      borderRadius: 2,
      backgroundColor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <TextField
      type="month"
      label="Fecha de Construcción"
      name="fechaConstruccion"
      value={nuevoPiso.fechaConstruccion}
      onChange={handleChangePiso}
      size="small"
      error={!!erroresPiso["fechaConstruccion"]}
      helperText={erroresPiso["fechaConstruccion"] ? "Campo obligatorio" : ""}
      InputLabelProps={{ shrink: true }}
    />

    <TextField
      select
      label="Material Estruct. Predom."
      name="material"
      value={nuevoPiso.material}
      onChange={handleChangePiso}
      size="small"
      error={!!erroresPiso["material"]}
    helperText={erroresPiso["material"] ? "Campo obligatorio" : ""}
      
    >
      {materialList.map((m) => (
        <MenuItem key={m} value={m}>
          {m}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      label="Estado de Conservación"
      name="estadoConserv"
      value={nuevoPiso.estadoConserv}
      onChange={handleChangePiso}
      size="small"
      error={!!erroresPiso["estadoConserv"]}
    helperText={erroresPiso["estadoConserv"] ? "Campo obligatorio" : ""}
    >
      {estadoConservList.map((e) => (
        <MenuItem key={e} value={e}>
          {e}
        </MenuItem>
      ))}
    </TextField>
  </Box>

  {/* 🔸 Bloque Derecho */}
  <Box
    sx={{
      flex: 1,
      minWidth: 280,
      p: 2,
      borderRadius: 2,
      backgroundColor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      gap: 2.5, // 👈 mayor separación entre selects
    }}
  >
    <SelectConstruccion
      label="Muros y columnas"
      value={nuevoPiso.muros}
      opciones={ListaMuros}
      onChange={(val) => {
    setNuevoPiso((prev) => ({ ...prev, muros: val }));
    if (erroresPiso["muros"]) {
      setErroresPiso((prev) => {
        const updated = { ...prev };
        delete updated["muros"];
        return updated;
      });
    }
  }}
  error={!!erroresPiso["muros"]}
  helperText={erroresPiso["muros"] ? "Campo obligatorio" : ""}
    />

    <SelectConstruccion
      label="Techos"
      value={nuevoPiso.techos}
      opciones={ListaTechos}
      onChange={(val) => {
    setNuevoPiso((prev) => ({ ...prev, techos: val }));
    if (erroresPiso["techos"]) {
      setErroresPiso((prev) => {
        const updated = { ...prev };
        delete updated["techos"];
        return updated;
      });
    }
  }}
  error={!!erroresPiso["techos"]}
  helperText={erroresPiso["techos"] ? "Campo obligatorio" : ""}
    />

    <SelectConstruccion
      label="Puertas y Ventanas"
      value={nuevoPiso.puertasVentanas}
      opciones={ListaPuertasVentanas}
      onChange={(val) => {
    setNuevoPiso((prev) => ({ ...prev, puertasVentanas: val }));
    if (erroresPiso["puertasVentanas"]) {
      setErroresPiso((prev) => {
        const updated = { ...prev };
        delete updated["puertasVentanas"];
        return updated;
      });
    }
  }}
  error={!!erroresPiso["puertasVentanas"]}
  helperText={erroresPiso["puertasVentanas"] ? "Campo obligatorio" : ""}
    />
  </Box>
</Box>

{/* 🔹 Botones de acción */}
<Box sx={{ display: "flex", gap: 2, mt: 3 }}>
  <Button
    variant="contained"
    color="success"
    onClick={handleAgregarPiso}
    sx={{ px: 4 }}
  >
    Agregar
  </Button>
  <Button
    variant="outlined"
    color="inherit"
    onClick={() => setMostrarFormPiso(false)}
    sx={{ px: 4 }}
  >
    Cancelar
  </Button>
</Box>
          </>
        )}
      </Paper>
      </>
)}

{!mostrarFormPiso && (
  <>
      {/* ====== OBRAS COMPLEMENTARIAS ====== */}
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          color: "#003366",
          mb: 2,
        }}
      >
        <WorkIcon sx={{ mr: 1 }} /> Obras – Características de las obras
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        {!mostrarFormObra ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Obras registradas
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                color="success"
                 onClick={handleAgregarObraClick}
              >
                Agregar nueva Obra
              </Button>
            </Box>
          <ThemeProvider theme={compactTableTheme}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f0f4f8" }}>
                <TableRow>
                  <TableCell>Descrip. de Obra</TableCell>
                  <TableCell>Nivel</TableCell>
                  <TableCell>N°Piso</TableCell>
                  <TableCell>Material Estruct. Predom.</TableCell>
                  <TableCell>Estado Conserv.</TableCell>
                  <TableCell>Categ.</TableCell>
                  <TableCell>Cant.</TableCell>
                  <TableCell>UM.</TableCell>
                  <TableCell>Metrado</TableCell>
                  <TableCell>Mes/Año</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Valor Obra</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Incremento</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Deprec.</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Valor Obra Deprec.</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Factor Ofic.</TableCell>
                  <TableCell sx={{ bgcolor: "#f7f7f7" }}>Valor Total Obras</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {obras.map((o, i) => (
                  <TableRow key={i}>
                    <TableCell>{o.descripcion}</TableCell>
                    <TableCell>{o.tipoNivel}</TableCell>
                    <TableCell>{o.nroPiso}</TableCell>
                    <TableCell>{o.material}</TableCell>
                    <TableCell>{o.estadoConserv}</TableCell>
                    <TableCell>{o.categoria}</TableCell>
                    <TableCell>{o.cantidad}</TableCell>
                    <TableCell>{o.unidadMedida}</TableCell>
                    <TableCell>{o.metrado}</TableCell>
                    <TableCell>{o.mesAnio}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{o.valorObra}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{o.incremento}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{o.depreciacion}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{o.valorObraDepreciada}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{o.factorOfic}</TableCell>
                    <TableCell sx={{ bgcolor: "#f7f7f7" }}>{o.valorTotalObras}</TableCell>
                    <TableCell>
                      <Tooltip title="Eliminar">
                        <Button
                          color="error"
                          size="small"
                          onClick={() => setObras(obras.filter((_, idx) => idx !== i))}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ThemeProvider>
            <Typography sx={{ textAlign: "right", fontWeight: 600, mt: 2 }}>
              Total Obras Complementarias (S/): {totalObras.toFixed(2)}
            </Typography>
          </>
        ) : (
          <>
            {/* 🔹 Título */}
<Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
  Nueva Obra
</Typography>

{/* 🔹 Fila superior */}
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: "50% 25% 15%",
    gap: 2,
    mb: 2,
    alignItems: "center",
  }}
>
  <TextField
    select
      label="Descripción de Obra"
      name="descripcion"
      value={nuevaObra.descripcion}
      size="small"
      onChange={handleObraChange}
      fullWidth
      error={!!erroresObra["descripcion"]}
      helperText={erroresObra["descripcion"] ? "Campo obligatorio" : ""}
    >
      {descripcionesObra.map((d, idx) => (
        <MenuItem key={idx} value={d}>
          {d}
        </MenuItem>
      ))}
    </TextField>

    <TextField
    select
    label="Categoría"
    name="categoria"
    value={nuevaObra.categoria}
    onChange={handleObraChange}
    size="small"
    fullWidth
    error={!!erroresObra["categoria"]}
      helperText={erroresObra["categoria"] ? "Campo obligatorio" : ""}
  >
    {categoriasObra.map((c, idx) => (
      <MenuItem key={idx} value={c}>
        {c}
      </MenuItem>
    ))}
  </TextField>

  <TextField
    select
    label="Unidad de Medida"
    name="unidadMedida"
    value={nuevaObra.unidadMedida}
    onChange={handleObraChange}
    size="small"
    fullWidth
    error={!!erroresObra["unidadMedida"]}
      helperText={erroresObra["unidadMedida"] ? "Campo obligatorio" : ""}
  >
    {unidadMedidaList.map((u) => (
      <MenuItem key={u} value={u}>
        {u}
      </MenuItem>
    ))}
  </TextField>
</Box>
{/* 🔹 Segunda fila: bloques lado a lado */}
<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
  {/* 🔸 Bloque Izquierdo */}
  <Box
    sx={{
      flex: 1,
      minWidth: 280,
      p: 2,
      borderRadius: 2,
      backgroundColor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <TextField
      type="month"
      label="Mes/Año"
      name="mesAnio"
      value={nuevaObra.mesAnio}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["mesAnio"]}
      helperText={erroresObra["mesAnio"] ? "Campo obligatorio" : ""}
      InputLabelProps={{ shrink: true }}
    />

    <TextField
      select
      label="Material Estruct. Predom."
      name="material"
      value={nuevaObra.material}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["material"]}
      helperText={erroresObra["material"] ? "Campo obligatorio" : ""}
    >
      {materialList.map((m) => (
        <MenuItem key={m} value={m}>
          {m}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      label="Estado de Conservación"
      name="estadoConserv"
      value={nuevaObra.estadoConserv}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["estadoConserv"]}
      helperText={erroresObra["estadoConserv"] ? "Campo obligatorio" : ""}
    >
      {estadoConservList.map((e) => (
        <MenuItem key={e} value={e}>
          {e}
        </MenuItem>
      ))}
    </TextField>
  </Box>

  {/* 🔸 Bloque Derecho */}
  <Box
    sx={{
      flex: 1,
      minWidth: 280,
      p: 2,
      borderRadius: 2,
      backgroundColor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <TextField
      select
      label="Tipo Nivel"
      name="tipoNivel"
      value={nuevaObra.tipoNivel}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["tipoNivel"]}
      helperText={erroresObra["tipoNivel"] ? "Campo obligatorio" : ""}
    >
      {tipoNivelList.map((n) => (
        <MenuItem key={n} value={n}>
          {n}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      label="N° Piso"
      name="nroPiso"
      value={nuevaObra.nroPiso}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["nroPiso"]}
      helperText={erroresObra["nroPiso"] ? "Campo obligatorio" : ""}
    />

    <TextField
      label="Cantidad"
      name="cantidad"
      value={nuevaObra.cantidad}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["cantidad"]}
      helperText={erroresObra["cantidad"] ? "Campo obligatorio" : ""}
    />

    <TextField
      label="Metrado"
      name="metrado"
      value={nuevaObra.metrado}
      onChange={handleObraChange}
      size="small"
      error={!!erroresObra["metrado"]}
      helperText={erroresObra["metrado"] ? "Campo obligatorio" : ""}
    />
  </Box>
</Box>


{/* 🔹 Botones */}
<Box sx={{ display: "flex", gap: 2, mt: 3 }}>
  <Button
    variant="contained"
    color="success"
    onClick={handleAgregarObra}
    sx={{ px: 4 }}
  >
    AGREGAR
  </Button>
  <Button
    variant="outlined"
    color="inherit"
    onClick={() => setMostrarFormObra(false)}
    sx={{ px: 4 }}
  >
    CANCELAR
  </Button>
</Box>
          </>
        )}
      </Paper>




 </>
)}

<Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <MuiAlert
    onClose={() => setOpenSnackbar(false)}
    severity="success"
    sx={{ width: "100%" }}
    variant="filled"
  >
    ✅ Piso agregado correctamente
  </MuiAlert>
</Snackbar>
    </Box>




  );
};


export default Paso4Construccion;