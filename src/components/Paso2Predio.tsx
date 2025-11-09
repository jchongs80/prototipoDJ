import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import HelpTooltip from "./helpTooltip";
import TipoTransferencia from "./tipoTransferencia";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import datosPredioIcon from './../assets/casa.png';
import condicionPropiedadIcon from './../assets/contrato.png';
import solesIcon from './../assets/sol-peruano.png';
import dolaresIcon from './../assets/bolsa-de-dinero.png';
import usoPredioIcon from './../assets/edificio.png';


import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import predio1 from '../assets/predio1.png';
import predio2 from '../assets/predio2.png';
import predio3 from '../assets/predio3.png';
import predio4 from '../assets/predio4.png';
import predio5 from '../assets/predio5.png';
import predio6 from '../assets/predio6.png';
import predio7 from '../assets/predio7.png';
import predio8 from '../assets/predio8.png';
import predio9 from '../assets/predio9.png';
import predio10 from '../assets/predio10.png';
import InfoCallout from "./InfoCallout";

interface Paso2PredioProps {
  formData: any;
  handleChange: (e:any) => void;
}


const Paso2Predio = forwardRef (({ formData, handleChange} :Paso2PredioProps, ref) => {


useImperativeHandle(ref, () => ({
  validarPaso2: () => {
    let valido = true;

    // 📄 Validar documento PDF de transferencia
    if (!formData.docAdquisicion) {
      setErrorArchivoAdquisicion(
        "Debe adjuntar el documento PDF que acredita la transferencia."
      );
      valido = false;
    } else {
      setErrorArchivoAdquisicion("");
    }

    // 💰 Validar Valor de adquisición (en soles o dólares)
    const valorSoles = parseFloat(formData.valorSoles || "0");
    const valorDolares = parseFloat(formData.valorDolares || "0");

    if ((!valorSoles || valorSoles <= 0) && (!valorDolares || valorDolares <= 0)) {
      setErrorValorAdq(true);
      valido = false;
    } else {
      setErrorValorAdq(false);
    }

    return valido;
  },
}));






  const [codigoPU, setCodigoPU] = useState("");
  const [openBuscarDireccion, setOpenBuscarDireccion] = useState(false);
  const [tipoViaBusqueda, setTipoViaBusqueda] = useState("");
  const [nombreCalle, setNombreCalle] = useState("");
  const [numeroPuerta, setNumeroPuerta] = useState("");
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);

  const [openImagen, setOpenImagen] = useState(false);
  const [selectedPredio, setSelectedPredio] = useState<any>(null);

  const [errorCodigoPU, setErrorCodigoPU] = useState("");

  const [mostrarDetallePredio, setMostrarDetallePredio] = useState(false);

  const [errorArchivoAdquisicion, setErrorArchivoAdquisicion] = useState("");
  const [debeValidar, setDebeValidar] = useState(false); // ✅ controla si se debe mostrar error

  const [openBuscarDNI, setOpenBuscarDNI] = useState(false);
  const [tipoDocDNI, setTipoDocDNI] = useState<"DNI" | "CE" | "">("");
  const [numDocDNI, setNumDocDNI] = useState("");
  const [loadingBusquedaDNI, setLoadingBusquedaDNI] = useState(false);
  const [resultadosBusquedaDNI, setResultadosBusquedaDNI] = useState<any[]>([]);
  const [errorTipoDocDNI, setErrorTipoDocDNI] = useState("");
  const [errorNumDocDNI, setErrorNumDocDNI] = useState("");


  // ✅ Mantener visible el detalle del predio cuando se regresa al paso 2
useEffect(() => {
  if (formData.codigoPredio && formData.codigoPredio.trim() !== "") {
    setMostrarDetallePredio(true);
  }
}, [formData.codigoPredio]);

useEffect(() => {
  setCodigoPU(formData.codigoPredio || "");
}, [formData.codigoPredio]);


const handleBuscarDireccion = () => {
  //setDebeValidar(false);


resetValidacionArchivo(); // 🧹 limpia validación antes de buscar
  setLoadingBusqueda(true);
  setTimeout(() => {
    const calles = [
      "Camaná", "Arequipa", "Tacna", "Colonial", "Brasil",
      "Salaverry", "La Mar", "Sucre", "Bolívar", "Junín",
      "Angamos", "Pardo", "Petit Thouars", "Abancay",
      "Prolongación Iquitos", "Santa Rosa"
    ];

    const nombres = [
      "Luis Ramos", "Ana Torres", "Carlos Vega", "María Salas",
      "José Paredes", "Carmen López", "Diego Vargas", "Lucía Gutiérrez",
      "Raúl Mendoza", "Patricia Rojas", "Andrés Silva", "Rosa Castillo"
    ];

    // 🔹 Lista de imágenes disponibles
    const imagenesPredio = [
      predio1, predio2, predio3, predio4, predio5,
      predio6, predio7, predio8, predio9, predio10
    ];

    // 🔹 Mezclar el orden de las imágenes (Fisher–Yates shuffle)
    const imagenesAleatorias = [...imagenesPredio].sort(() => Math.random() - 0.5);

    // 🔹 Generar datos de ejemplo
    const datosDemo = Array.from({ length: 10 }).map((_, i) => {
      const calle = calles[Math.floor(Math.random() * calles.length)];
      const numero = Math.floor(Math.random() * (1500 - 100) + 100);
      const propietario = nombres[Math.floor(Math.random() * nombres.length)];
      return {
        codigo: (10001 + i).toString(),
        direccion: `Cercado de Lima, Jr. ${calle}, ${numero}, Lima`,
        tipoVia: "Jirón",
        descripcionVia: calle,
        numero,
        propietario,
        imagen: imagenesAleatorias[i], // 🔸 Asigna imagen distinta
      };
    });

    setResultadosBusqueda(datosDemo);
    setLoadingBusqueda(false);
  }, 1000);
};


// 🔍 Buscar por PU (demo con validación)
const handleBuscarPU = () => {

  //setDebeValidar(false); // 🔹 evita mostrar error por validación anterior
 resetValidacionArchivo(); // 🧹 limpia validación antes de buscar
  // Eliminar espacios
  const codigo = codigoPU.trim();

  // Validar si está vacío
  if (!codigo) {
    setErrorCodigoPU("El código de PU es obligatorio.");
    return;
  }

  // Validar formato numérico de 5 dígitos
  if (!/^\d{5}$/.test(codigo)) {
    setErrorCodigoPU("Valor numérico de 5 dígitos.");
    return;
  }

  // Si todo está correcto, limpiar error
  setErrorCodigoPU("");

  // Setea valores demo y muestra detalle
  handleChange({ target: { name: "codigoPredio", value: codigo } } as any);
  handleChange({
    target: {
      name: "direccionCompletaPredio",
      value: "Cercado de Lima, Jr. Camaná, 499, Lima",
    },
  } as any);
  handleChange({ target: { name: "tipoViaPredio", value: "Jirón" } } as any);
  handleChange({ target: { name: "descViaPredio", value: "Camaná" } } as any);
  handleChange({ target: { name: "tipoDenomUrbPredio", value: "" } } as any);
  handleChange({ target: { name: "descDenomUrbPredio", value: "" } } as any);
  handleChange({ target: { name: "numMun1", value: "499" } } as any);

  setMostrarDetallePredio(true);
};



const handleBuscarPorDNI = () => {
  // Validaciones simples
  let valido = true;
  if (!tipoDocDNI) {
    setErrorTipoDocDNI("Seleccione el tipo de documento.");
    valido = false;
  }
  if (!numDocDNI.trim()) {
    setErrorNumDocDNI("Ingrese el número de documento.");
    valido = false;
  } else {
    // Validación básica: DNI 8 dígitos, CE 9-12 alfanum.
    if (tipoDocDNI === "DNI" && !/^\d{8}$/.test(numDocDNI)) {
      setErrorNumDocDNI("El DNI debe tener 8 dígitos.");
      valido = false;
    }
    if (tipoDocDNI === "CE" && !/^[A-Za-z0-9]{9,12}$/.test(numDocDNI)) {
      setErrorNumDocDNI("Carné de Extranjería inválido (9-12 caracteres).");
      valido = false;
    }
  }
  if (!valido) return;

  setErrorTipoDocDNI("");
  setErrorNumDocDNI("");
  setLoadingBusquedaDNI(true);

  setTimeout(() => {
    // Datos demo: SIEMPRE 3 predios
    const calles = ["Camaná", "Arequipa", "Tacna", "Colonial", "Brasil", "Salaverry", "La Mar", "Sucre"];
    const usos = ["Vivienda", "Comercio", "Cochera", "Depósito de Vivienda", "Tienda / Supermercado"];
    const duenos = ["Juan Pérez", "Ana Torres", "Carlos Vega", "María Salas", "Lucía Gutiérrez"];
    const imagenes = [predio1, predio2, predio3, predio4, predio5, predio6, predio7, predio8, predio9, predio10]
      .sort(() => Math.random() - 0.5);

    const resultados = Array.from({ length: 3 }).map((_, i) => {
      const calle = calles[Math.floor(Math.random() * calles.length)];
      const numero = Math.floor(Math.random() * (1500 - 100) + 100);
      return {
        codigo: (20001 + i).toString(),
        direccion: `Cercado de Lima, Jr. ${calle}, ${numero}, Lima`,
        uso: usos[Math.floor(Math.random() * usos.length)],
        propietario: duenos[Math.floor(Math.random() * duenos.length)],
        tipoVia: "Jirón",
        descripcionVia: calle,
        numero,
        imagen: imagenes[i],
      };
    });

    setResultadosBusquedaDNI(resultados);
    setLoadingBusquedaDNI(false);
  }, 900);
};









// Limpia errores al buscar predio o cargar datos automáticos
const resetValidacionArchivo = () => {
  setDebeValidar(false);
  setErrorArchivoAdquisicion("");
};

const [errorTipoVia, setErrorTipoVia] = useState("");
const [errorNombreCalle, setErrorNombreCalle] = useState("");

const [paginaActual, setPaginaActual] = useState(1);
const resultadosPorPagina = 5;
const totalPaginas = Math.ceil(resultadosBusqueda.length / resultadosPorPagina);
const inicio = (paginaActual - 1) * resultadosPorPagina;
const fin = inicio + resultadosPorPagina;
const resultadosPagina = resultadosBusqueda.slice(inicio, fin);

const [errorValorAdq, setErrorValorAdq] = useState(false);

const [openImagenPredio, setOpenImagenPredio] = useState(false);
const [imagenPredioModal, setImagenPredioModal] = useState<string | null>(null);

/*
// ===================== VALIDACIÓN DEL PASO 2 =====================
 const validarPaso2 = (): Boolean => {
  let valido = true;


  if (!formData.docAdquisicion) {
    setErrorArchivoAdquisicion("Debe adjuntar el documento PDF que acredita la transferencia.");
    valido = false;
  } else {
    setErrorArchivoAdquisicion("");
  }

  // 🔹 Tipo de Transferencia
  if (!formData.tipoTransferencia) {
    setErrorTipoTransferencia(true);
    valido = false;
  }

  // 🔹 PDF obligatorio si hay tipo de transferencia
  if (formData.tipoTransferencia && !formData.docAdquisicion) {
    setErrorArchivoAdquisicion("Debe adjuntar el PDF que acredita la transferencia.");
    setDebeValidar(true);
    valido = false;
  }

  // 🔹 Condición de propiedad
  if (!formData.condicionPropiedad) {
    setErrorCondicionProp(true);
    valido = false;
  }

  // 🔹 Porcentaje de propiedad
  if (
    !formData.porcentajePropiedad ||
    formData.porcentajePropiedad <= 0 ||
    formData.porcentajePropiedad > 100
  ) {
    setErrorPorcentaje(true);
    valido = false;
  }

  // 🔹 Fecha de adquisición
  if (!formData.fechaAdquisicion) {
    setErrorFechaAdq(true);
    valido = false;
  }

  // 🔹 Valor de adquisición
  if (!formData.valorSoles && !formData.valorDolares) {
    setErrorValorAdq(true);
    valido = false;
  }


// ✅ Exponemos la función al componente padre (RegistrarDJ)
  useImperativeHandle(ref, () => ({
    validarPaso2,
  }));

  return valido;
};
*/

  return (
    <Box sx={{ p: 1 }}>

     <InfoCallout
    title="Información del Predio"
    body="Registra el código PU o busca la dirección. Completa los datos de transferencia y adjunta el documento que acredita la adquisición del predio."
  />


      <Typography variant="h6" sx={{ fontWeight: 600, color: "#003366", mb: 2 }}>
        <img
        src={datosPredioIcon}
        alt="Valor Adquisicion"
        style={{ width: 30, height: 30, marginRight: 8 }}
    />  
        Datos del Predio
      </Typography>

      {/* CABECERA DE BÚSQUEDA */}
      <Box
  sx={{
    border: "1px solid #e0e0e0",
    bgcolor: "#fff",
    display: "flex",
    alignItems: "flex-start", // 👈 mantiene la alineación superior
    p: 2.5,
    gap: 2,
    flexWrap: "wrap",
    mb: 3,
  }}
>
  {/* Contenedor del campo + error */}
  <Box sx={{ display: "flex", flexDirection: "column", minWidth: 220 }}>
    <Tooltip
      title="Ingrese el código de PU (Predio Urbano) que aparece en el PU de la cuponera."
      arrow
    >
      <TextField
        label="Código PU"
        value={codigoPU}
        onChange={(e) => {
          setCodigoPU(e.target.value);
          if (errorCodigoPU) setErrorCodigoPU("");
        }}
        size="small"
        sx={{ width: 220 }}
        error={Boolean(errorCodigoPU)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <InfoOutlinedIcon sx={{ color: "#003366" }} fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>

    {/* Mensaje de error controlado */}
    <Typography
      variant="caption"
      sx={{
        color: "red",
        fontSize: "0.75rem",
        minHeight: 18, // 👈 asegura altura fija del espacio
        mt: 0.3,
        ml: 0.5,
      }}
    >
      {errorCodigoPU || ""}
    </Typography>
  </Box>

  {/* Botones de acción */}
  <Button
    variant="contained"
    color="success"
    startIcon={<SearchIcon />}
    onClick={handleBuscarPU}
    sx={{ height: 40 }}
  >
    Buscar por PU
  </Button>

  <Button
    variant="outlined"
    startIcon={<SearchIcon />}
    onClick={() => setOpenBuscarDireccion(true)}
    sx={{
      borderColor: "#003366",
      color: "#003366",
      height: 40,
      "&:hover": { bgcolor: "rgba(0,51,102,0.05)" },
    }}
  >
    Buscar por Dirección
  </Button>

    <Button
  variant="outlined"
  startIcon={<SearchIcon />}
  onClick={() => setOpenBuscarDNI(true)}
  sx={{
    borderColor: "#003366",
    color: "#003366",
    height: 40,
    "&:hover": { bgcolor: "rgba(0,51,102,0.05)" },
  }}
>
  Buscar por DNI
</Button>


</Box>

      {/* DETALLE VISUAL (solo si ya se buscó/seleccionó) */}
      {mostrarDetallePredio && (
        <>
       
<Paper
  sx={{
    mt: 3,
    p: 3,
    borderRadius: 3,
    backgroundColor: "#fafafa",
    borderLeft: "3px solid #1565c0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: "#1565c0",
      fontWeight: 600,
      mb: 2,
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Box
      component="span"
      sx={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#1565c0",
      }}
    />
    Ubicación del Predio
  </Typography>

  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 3,
    }}
  >
    {/* 🗺️ Columna izquierda: mapa + imagen */}
    <Box sx={{ flex: 1, borderRadius: 2, overflow: "hidden" }}>
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          bgcolor: "#fff",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1950.9719709145008!2d-77.03470702140892!3d-12.047378097912183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c9e3ae9203%3A0x9c33f80e960a0b0!2sJr.%20Caman%C3%A1%20499%2C%20Lima!5e0!3m2!1ses-419!2spe!4v1759029434785!5m2!1ses-419!2spe"
          style={{ border: 0, width: "100%", height: "180px" }}
          title="Visor"
          loading="lazy"
        />
       

        {/* 🖼️ Imagen del predio con overlay interactivo */}
<Box
  sx={{
    position: "relative",
    width: "100%",
    height: "180px",
    borderTop: "1px solid #e0e0e0",
    overflow: "hidden",
    borderRadius: "0 0 8px 8px",
  }}
>
  <Box
    component="img"
    src={formData.imagenPredio || predio1}
    alt="Imagen del predio"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "all 0.3s ease",
      "&:hover": { filter: "brightness(0.9)" },
    }}
    onError={(e: any) => (e.target.src = predio1)}
  />

  {/* 🔍 Overlay: Ver imagen */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      transition: "opacity 0.3s ease",
      bgcolor: "rgba(0,0,0,0.25)",
      cursor: "pointer",
      "&:hover": { opacity: 1 },
    }}
    onClick={() => {
      setImagenPredioModal(formData.imagenPredio || predio1);
      setOpenImagenPredio(true);
    }}
  >
    <Box
      sx={{
        bgcolor: "rgba(255,255,255,0.85)",
        px: 2.5,
        py: 0.8,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        transition: "all 0.2s ease",
        "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "#1565c0", fontWeight: 600, display: "flex", gap: 0.5 }}
      >
        🔍 Ver imagen
      </Typography>
    </Box>
  </Box>
</Box>





      </Box>
    </Box>

    {/* 📋 Columna derecha: datos del predio */}
    <Box sx={{ flex: 1.5 }}>
      {/* Dirección completa */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "#1976d2",
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        Dirección Completa
      </Typography>
      <Box
        sx={{
          bgcolor: "#f3f6fa",
          p: 1,
          px: 1.5,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          mb: 2,
          fontSize: "0.9rem",
          color: "#333",
          fontWeight: 500,
        }}
      >
        {formData.direccionCompletaPredio || "—"}
      </Box>

      {/* Datos principales (4 columnas por fila) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 1,
          mb: 2,
        }}
      >
        {/* Fila 1: Vía y Denominación */}
        {[
          ["Tipo de Vía", formData.tipoViaPredio],
          ["Vía", formData.descViaPredio],
          ["Tipo Denom. Urb.", formData.tipoDenomUrbPredio],
          ["Denom. Urb.", formData.descDenomUrbPredio],
        ].map(([label, value]) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              borderRadius: 1.5,
              bgcolor: "#fff",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#555", fontWeight: 500, fontSize: "0.85rem" }}
            >
              {label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  value && String(value).trim() !== "" ? "#1a1a1a" : "#9e9e9e",
                fontFamily: "monospace",
                fontSize: "0.85rem",
              }}
            >
              {value && String(value).trim() !== "" ? value : "—"}
            </Typography>
          </Box>
        ))}

        {/* Fila 2 y 3: Número, Lote/SubLote, etc */}
        {[
          ["Número", formData.numMun1],
          [
            "Lote / SubLote",
            (formData.lotePredio
              ? formData.lotePredio
              : "—") +
              " / " +
              (formData.subLote ? formData.subLote : "—"),
          ],
          ["Int.", formData.interiorPredio],
          ["Piso", formData.piso],
          ["Edif.", formData.edificioPredio],
          ["Dpto.", formData.dpto],
          ["Ingreso", formData.ingreso],
          ["Letra", formData.letra],
        ].map(([label, value]) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              borderRadius: 1.5,
              bgcolor: "#fff",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#555", fontWeight: 500, fontSize: "0.85rem" }}
            >
              {label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  value && String(value).trim() !== "" ? "#1a1a1a" : "#9e9e9e",
                fontFamily: "monospace",
                fontSize: "0.85rem",
              }}
            >
              {value && String(value).trim() !== "" ? value : "—"}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 🔘 Predio en edificio + Partida registral */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          gap: 2,
          mt: 1,
        }}
      >
     
{/* 🔘 Datos de ubicación y condición del predio */}
<Paper
  variant="outlined"
  sx={{
    mt: 1.5,
    p: 2,
    borderRadius: 2,
    bgcolor: "#f9fafc",
    border: "1px solid #e0e7ef",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    width: "100%",              // 👈 ocupa todo el ancho disponible
    maxWidth: "none",           // 👈 elimina cualquier límite
    alignSelf: "stretch",       // 👈 si está dentro de un Grid o Flex, se estira
  }}
>
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: 700,
      color: "#003366",
      mb: 1.5,
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    <img
      src={require("./../assets/edificio.png")}
      alt="Predio"
      style={{ width: 24, height: 24 }}
    />
    Información registral y condición especial
  </Typography>

  <Box
    sx={{
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      width: "100%",           // 👈 garantiza que las tres columnas se expandan
    }}
  >
    {/* ✅ Predio ubicado en edificio */}
    <Box sx={{ minWidth: 220, flex: "0 0 auto" }}>
      <Typography
        variant="subtitle2"
        sx={{ color: "#1976d2", fontWeight: 600, mb: 0.5 }}
      >
        Predio ubicado en edificio:
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant={
            formData.predioUbicadoEnEdificio === true ? "contained" : "outlined"
          }
          size="small"
          onClick={() =>
            handleChange({
              target: { name: "predioUbicadoEnEdificio", value: true },
            } as any)
          }
          sx={{
            textTransform: "none",
            borderColor: "#90caf9",
            color: "#1565c0",
            "&.MuiButton-contained": {
              backgroundColor: "#1565c0",
              color: "#fff",
            },
          }}
        >
          Sí
        </Button>
        <Button
          variant={
            formData.predioUbicadoEnEdificio === false ||
            formData.predioUbicadoEnEdificio === undefined
              ? "contained"
              : "outlined"
          }
          size="small"
          onClick={() =>
            handleChange({
              target: { name: "predioUbicadoEnEdificio", value: false },
            } as any)
          }
          sx={{
            textTransform: "none",
            borderColor: "#90caf9",
            color: "#1565c0",
            "&.MuiButton-contained": {
              backgroundColor: "#1565c0",
              color: "#fff",
            },
          }}
        >
          No
        </Button>
      </Box>
    </Box>

    {/* 📄 Partida registral */}
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: "#1976d2",
          fontWeight: 600,
          mb: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        Partida registral
        <HelpTooltip text="Ingrese el número de partida registral del predio, según SUNARP." />
      </Typography>
      <TextField
        size="small"
        name="partidaRegistral"
        fullWidth
        value={formData.partidaRegistral || ""}
        onChange={handleChange}
        placeholder="Ingrese N° de partida registral"
      />
    </Box>

    {/* 🏢 Condición especial del predio */}
    <Box
      sx={{
        minWidth: 250,
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "#1976d2", fontWeight: 600, mb: 0.5 }}
      >
        Condición especial del predio:
      </Typography>
      <Box
        sx={{
          px: 1.5,
          py: 0.7,
          borderRadius: 1.5,
          bgcolor: "rgba(25,118,210,0.06)",
          border: "1px solid rgba(25,118,210,0.18)",
          color: "#0b4a8b",
          fontWeight: 700,
          minWidth: 160,
          textAlign: "center",
        }}
      >
        {formData.condicionEspecialPredio || "Ninguno"}
      </Box>
    </Box>
  </Box>
</Paper>
      
        
      </Box>

     


    </Box>
  </Box>
</Paper>


{/* ====================== CONDICIÓN DE PROPIEDAD ====================== */}
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 3,
  }}
>
  <Typography
    variant="h6"
    sx={{ color: "#003366", fontWeight: 600, mb: 3 }}
  >
    <img
      src={condicionPropiedadIcon}
      alt="Valor Adquisicion"
      style={{ width: 30, height: 30, marginRight: 8 }}
    /> 
    Condición de Propiedad
  </Typography>

  {/* === Fila 1: Distribución 50%-50% === */}
 
  {/* === Nueva distribución visual === */}
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 3,
    alignItems: "stretch",
  }}
>
  {/* 🔹 Bloque 1: Tipo de transferencia (izquierda, ancho grande) */}
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: "#f9f9f9",
      border: "1px solid #e0e0e0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    }}
  >
    <TipoTransferencia
      formData={formData}
      handleChange={handleChange}
      errorArchivoAdquisicion={errorArchivoAdquisicion}
      setErrorArchivoAdquisicion={setErrorArchivoAdquisicion}
    />
  </Paper>

  {/* 🔹 Bloque 2: Condición de Propiedad (derecha) */}
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: "#f4f6f8",
      border: "1px solid #e0e0e0",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 2,
    }}
  >
    {/* Condición de la Propiedad */}
    <TextField
      select
      fullWidth
      size="small"
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Condición de la Propiedad
          <HelpTooltip text="Seleccione la condición bajo la cual figura el contribuyente como titular del predio (propietario, condominio, concesionario, etc.)." />
        </Box>
      }
      name="condicionPropiedad"
      value={formData.condicionPropiedad || "Propietario único"}
      onChange={handleChange}
      InputProps={{ sx: { fontSize: "0.85rem" } }}
    >
      <MenuItem value="Propietario único">Propietario único</MenuItem>
      <MenuItem value="Condominio">Condominio</MenuItem>
      <MenuItem value="Concesionario">Concesionario</MenuItem>
      <MenuItem value="Responsable">Responsable</MenuItem>
    </TextField>

    {/* % de Propiedad */}
    <TextField
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          % de Propiedad
          <HelpTooltip text="Indique el porcentaje del predio que le pertenece al contribuyente (por ejemplo, 100 si es propietario único)." />
        </Box>
      }
      name="porcentajePropiedad"
      value={formData.porcentajePropiedad || ""}
      onChange={handleChange}
      size="small"
      placeholder="100"
      fullWidth
      InputProps={{ sx: { fontSize: "0.85rem" } }}
    />

    {/* Fecha de Adquisición */}
    <TextField
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Fecha de Adquisición
          <HelpTooltip text="Seleccione la fecha en que se efectuó la adquisición o inscripción del predio." />
        </Box>
      }
      type="date"
      name="fechaAdquisicion"
      value={formData.fechaAdquisicion || ""}
      onChange={handleChange}
      size="small"
      InputLabelProps={{ shrink: true }}
      fullWidth
      InputProps={{ sx: { fontSize: "0.85rem" } }}
    />
  </Paper>
</Box>
  

  {/* === Fila 2: Valor de adquisición + Condición especial === */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      gap: 3,
      alignItems: "stretch",
      mt: 3,
    }}
  >
    {/* 💰 Valor de adquisición */}
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "#003366",
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        Valor de Adquisición
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {/* Soles */}
        <Box>
          <Typography variant="caption" sx={{ color: "#555", mb: 0.5 }}>
            En Soles (S/)
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={solesIcon}
              alt="Valor Adquisicion"
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <TextField
              name="valorSoles"
              value={formData.valorSoles || ""}
             onChange={(e) => {
                handleChange(e);
                // 🔹 Si el usuario ingresa un valor, limpiar error
                const valSoles = parseFloat(e.target.value || "0");
                const valDolares = parseFloat(formData.valorDolares || "0");
                if (valSoles > 0 || valDolares > 0) {
                  setErrorValorAdq(false);
                }
              }}
              size="small"
              placeholder="0.00"
              sx={{ width: 120 }}
              InputProps={{
                sx: { fontSize: "0.85rem" },
                endAdornment: (
                  <HelpTooltip text="Ingrese el valor de adquisición en soles si la transacción fue en moneda nacional." />
                ),
              }}
            />
          </Box>
        </Box>

        {/* Dólares */}
        <Box>
          <Typography variant="caption" sx={{ color: "#555", mb: 0.5 }}>
            En Dólares (US$)
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={dolaresIcon}
              alt="Valor Adquisicion"
              style={{ width: 30, height: 30, marginRight: 8 }}
            />
            <TextField
              name="valorDolares"
              value={formData.valorDolares || ""}
              onChange={(e) => {
                handleChange(e);
                const valDolares = parseFloat(e.target.value || "0");
                const valSoles = parseFloat(formData.valorSoles || "0");
                if (valSoles > 0 || valDolares > 0) {
                  setErrorValorAdq(false);
                }
              }}
              size="small"
              placeholder="0.00"
              sx={{ width: 120 }}
              InputProps={{
                sx: { fontSize: "0.85rem" },
                endAdornment: (
                  <HelpTooltip text="Ingrese el valor de adquisición en dólares si la transacción fue en moneda extranjera." />
                ),
              }}
            />
          </Box>
        </Box>
      </Box>

      {errorValorAdq && (
  <Typography
    variant="caption"
    sx={{
      color: "red",
      fontSize: "0.75rem",
      mt: 1,
      display: "block",
    }}
  >
    ⚠️ Debe ingresar el valor de adquisición (en soles o en dólares).
  </Typography>
)}
    </Paper>

    

  {/* ▶️ Panel derecho: USO DEL PREDIO (solo lectura) */}
<Paper
  variant="outlined"
  sx={{
    p: 2,
    borderRadius: 2,
    bgcolor: "#f4f7fb",
    border: "1px solid #e0e0e0",
  }}
>
  <Typography variant="subtitle1" sx={{ color: "#003366", fontWeight: 700, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
    <img src={usoPredioIcon} alt="Uso del predio" style={{ width: 22, height: 22 }} />
    Uso del Predio
  </Typography>

  <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 1.2,
    flexWrap: "nowrap",
  }}
>
  {[
    ["Clase de uso", formData.claseUso],
    ["Subclase de uso", formData.subClaseUso],
    ["Uso", formData.uso],
    ["Inicio de uso", formData.fechaInicioUso],
  ].map(([label, value]) => (
    <Box
      key={label as string}
      sx={{
        flex: "1 1 0",
        p: 1,
        borderRadius: 1.5,
        bgcolor: "#fff",
        border: "1px solid #e6ebf2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="caption" sx={{ color: "#6b778c" }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 0.3,
          fontWeight: 600,
          color: value ? "#1a1f36" : "#9ea7b3",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
        }}
      >
        {value && String(value).trim() !== "" ? String(value) : "—"}
      </Typography>
    </Box>
  ))}
</Box>

  <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#7a8aa0" }}>
    * Este resumen es informativo. Puedes actualizar el uso de tu predio acercándote presencialmente al SAT.
  </Typography>
</Paper>







  </Box>
</Paper>



{/* ====================== 🏢 USO DEL PREDIO ====================== */}

{/*
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 3,
    border: "1px solid #e0e0e0",
    bgcolor: "#ffffff",
    "& .MuiInputBase-input": { fontSize: "1rem", py: 0.7 },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
    "& .MuiSelect-select": { fontSize: "0.85rem", py: "7px" },
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: "#003366",
      fontWeight: 600,
      mb: 3,
      display: "flex",
      alignItems: "center",
    }}
  >
    <img
      src={usoPredioIcon}
      alt="Uso del predio"
      style={{ width: 30, height: 30, marginRight: 8 }}
    />
    Uso del Predio
  </Typography>


  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      },
      gap: 2,
    }}
  >

    <FormControl size="small" fullWidth>
      <InputLabel>Clase de Uso</InputLabel>
      <Select
        label="Clase de Uso"
        name="claseUso"
        value={formData.claseUso || ""}
        onChange={handleChange}
        endAdornment={
          <HelpTooltip
            text="Seleccione la clase general del uso del predio: Vivienda, Comercio, Industria, etc."
            placement="top"
          />
        }
      >
        <MenuItem value="">--Seleccione--</MenuItem>
        <MenuItem value="Residencial">Residencial</MenuItem>
        <MenuItem value="Comercial">Comercial</MenuItem>
        <MenuItem value="Recreacional">Recreacional</MenuItem>
        <MenuItem value="Industrial">Industrial</MenuItem>
        <MenuItem value="Educación">Educación</MenuItem>
        <MenuItem value="Salud">Salud</MenuItem>
        <MenuItem value="Otros">Salud</MenuItem>
      </Select>
    </FormControl>

    <FormControl size="small" fullWidth>
      <InputLabel>Subclase de Uso</InputLabel>
      <Select
        label="Subclase de Uso"
        name="subClaseUso"
        value={formData.subClaseUso || ""}
        onChange={handleChange}
        endAdornment={
          <HelpTooltip
            text="Seleccione una subcategoría según el tipo de actividad o servicio (por ejemplo: Departamento, Tienda, Taller, Consultorio, etc.)."
            placement="top"
          />
        }
      >
        <MenuItem value="">--Seleccione--</MenuItem>
        <MenuItem value="Vivienda">Vivienda</MenuItem>
        <MenuItem value="Cochera">Cochera</MenuItem>
        <MenuItem value="Comercial Bienes">Comercial Bienes</MenuItem>
        <MenuItem value="Comercial Servicios">Comercial Servicios</MenuItem>
        <MenuItem value="Comercial Bienes o Servicios">Comercial Bienes o servicios</MenuItem>
        <MenuItem value="Otros">Otros</MenuItem>
      </Select>
    </FormControl>


    <FormControl size="small" fullWidth>
      <InputLabel>Uso</InputLabel>
      <Select
        label="Uso"
        name="uso"
        value={formData.uso || ""}
        onChange={handleChange}
        endAdornment={
          <HelpTooltip
            text="Indique el uso específico actual del predio (por ejemplo: Vivienda familiar, Restaurante, Almacén, Centro médico, etc.)."
            placement="top"
          />
        }
      >
        <MenuItem value="">--Seleccione--</MenuItem>
        <MenuItem value="Vivienda">Vivienda</MenuItem>
        <MenuItem value="Depósito de Vivienda">Depósito de Vivienda</MenuItem>
        <MenuItem value="Cochera">Cochera</MenuItem>
        <MenuItem value="Tienda / Supermercado">Tienda / Supermercado</MenuItem>
        <MenuItem value="Otros">Otros</MenuItem>
      </Select>
    </FormControl>

    <TextField
      label="Fecha de Inicio de Uso"
      type="date"
      name="fechaInicioUso"
      value={formData.fechaInicioUso || ""}
      onChange={handleChange}
      size="small"
      InputLabelProps={{ shrink: true }}
      fullWidth
      InputProps={{
        endAdornment: (
          <HelpTooltip
            text="Indique la fecha en que se inició el uso actual del predio. Si no la recuerda, coloque una fecha aproximada."
            placement="top"
          />
        ),
      }}
    />
  </Box>
</Paper>
*/}

</>
)}

{/* MODAL DE BÚSQUEDA POR DIRECCIÓN */}
{/* MODAL DE BÚSQUEDA POR DIRECCIÓN */}
<Dialog
  open={openBuscarDireccion}
  onClose={() => setOpenBuscarDireccion(false)}
  fullWidth
  maxWidth="lg"
>
  <DialogTitle sx={{ fontWeight: 600, color: "#003366" }}>
    Búsqueda de Predio por Dirección
  </DialogTitle>

  <DialogContent dividers>
    {/* Estados de error para validación */}
    {/** Añadir arriba del return del componente:
     const [errorTipoVia, setErrorTipoVia] = useState("");
     const [errorNombreCalle, setErrorNombreCalle] = useState("");
     const [paginaActual, setPaginaActual] = useState(1);
     const resultadosPorPagina = 5;
     const totalPaginas = Math.ceil(resultadosBusqueda.length / resultadosPorPagina);
     const inicio = (paginaActual - 1) * resultadosPorPagina;
     const fin = inicio + resultadosPorPagina;
     const resultadosPagina = resultadosBusqueda.slice(inicio, fin);
    */}

    {/* FILA DE FILTROS */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
      }}
    >
      <TextField
        label="Distrito"
        value="Cercado de Lima"
        size="small"
        disabled
        sx={{ width: 200 }}
      />

      {/* Tipo de vía */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Tipo de Vía</InputLabel>
          <Select
            value={tipoViaBusqueda}
            onChange={(e) => {
              setTipoViaBusqueda(e.target.value);
              setErrorTipoVia("");
            }}
            label="Tipo de Vía"
          >
            <MenuItem value="">--Seleccione--</MenuItem>
            <MenuItem value="Avenida">Avenida</MenuItem>
            <MenuItem value="Jirón">Jirón</MenuItem>
            <MenuItem value="Calle">Calle</MenuItem>
            <MenuItem value="Pasaje">Pasaje</MenuItem>
            <MenuItem value="Parque">Parque</MenuItem>
          </Select>
        </FormControl>
        {errorTipoVia && (
          <Typography variant="caption" sx={{ color: "red", mt: 0.3, fontSize: "0.75rem" }}>
            {errorTipoVia}
          </Typography>
        )}
      </Box>

      {/* Nombre de calle */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Nombre de Calle</InputLabel>
          <Select
            value={nombreCalle}
            onChange={(e) => {
              setNombreCalle(e.target.value);
              setErrorNombreCalle("");
            }}
            label="Nombre de Calle"
          >
            <MenuItem value="">--Seleccione--</MenuItem>
            {[
              "Camaná",
              "Arequipa",
              "Tacna",
              "Colonial",
              "Brasil",
              "Salaverry",
              "La Mar",
              "Sucre",
              "Bolívar",
              "Junín",
              "Angamos",
              "Pardo",
              "Petit Thouars",
              "Abancay",
              "Prolongación Iquitos",
              "Santa Rosa",
            ].map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errorNombreCalle && (
          <Typography variant="caption" sx={{ color: "red", mt: 0.3, fontSize: "0.75rem" }}>
            {errorNombreCalle}
          </Typography>
        )}
      </Box>

      <TextField
        label="Número de Puerta"
        value={numeroPuerta}
        onChange={(e) => setNumeroPuerta(e.target.value)}
        size="small"
        sx={{ width: 160 }}
      />

      <Button
        variant="contained"
        color="success"
        startIcon={<SearchIcon />}
        onClick={() => {
          let valido = true;
          if (!tipoViaBusqueda) {
            setErrorTipoVia("Debe seleccionar un tipo de vía.");
            valido = false;
          }
          if (!nombreCalle) {
            setErrorNombreCalle("Debe seleccionar un nombre de calle.");
            valido = false;
          }
          if (!valido) return;
          handleBuscarDireccion();
          setPaginaActual(1);
        }}
        disabled={loadingBusqueda}
        sx={{ height: 40 }}
      >
        {loadingBusqueda ? "Buscando..." : "Buscar"}
      </Button>
    </Box>

    {/* RESULTADOS */}
    {loadingBusqueda ? (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    ) : resultadosBusqueda.length > 0 ? (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Propietario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultadosPagina.map((r, i) => (
              <TableRow
                key={i}
                hover
                sx={{
                  cursor: "pointer",
                  "& td": { py: 0.3, px: 1.5 },
                }}
                onClick={() => {
                  handleChange({ target: { name: "codigoPredio", value: r.codigo } } as any);
                  handleChange({ target: { name: "direccionCompletaPredio", value: r.direccion } } as any);
                  handleChange({ target: { name: "tipoViaPredio", value: r.tipoVia } } as any);
                  handleChange({ target: { name: "descViaPredio", value: r.descripcionVia } } as any);
                  handleChange({ target: { name: "numMun1", value: r.numero } } as any);
                  handleChange({ target: { name: "imagenPredio", value: r.imagen } } as any); // 👈 agrega imagen
                  setCodigoPU(r.codigo);
                  setMostrarDetallePredio(true);
                  setOpenBuscarDireccion(false);
                }}
              >
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPredio(r);
                      setOpenImagen(true);
                    }}
                  >
                    <Box
                      component="img"
                      src={r.imagen}
                      alt="Predio"
                      sx={{
                        width: 80, // doble tamaño
                        height: 60,
                        borderRadius: 1,
                        border: "1px solid #ddd",
                        objectFit: "cover",
                      }}
                      onError={(e: any) => {
                        e.target.src = predio1;
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell>{r.codigo}</TableCell>
                <TableCell>{r.direccion}</TableCell>
                <TableCell>{r.propietario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              Anterior
            </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Página {paginaActual} de {totalPaginas}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              Siguiente
            </Button>
          </Box>
        )}
      </>
    ) : (
      <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
        No hay resultados para mostrar.
      </Typography>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenBuscarDireccion(false)}>Cerrar</Button>
  </DialogActions>
</Dialog>
  
<Dialog open={openImagen} onClose={() => setOpenImagen(false)}>
  <DialogTitle sx={{ fontWeight: 600, color: "#003366" }}>
    Imagen del Predio {selectedPredio?.codigo}
  </DialogTitle>
  <DialogContent>
    {selectedPredio && (
      <Box>
        <Box
          component="img"
          src={selectedPredio.imagen}
          alt="Predio"
          sx={{ width: "100%", borderRadius: 2, mb: 2 }}
        />
        <Typography variant="body2" sx={{ color: "#333" }}>
          <strong>Dirección:</strong> {selectedPredio.direccion}
        </Typography>
        <Typography variant="body2" sx={{ color: "#333" }}>
          <strong>Propietario:</strong> {selectedPredio.propietario}
        </Typography>
      </Box>
    )}
  </DialogContent>
</Dialog>



    {/* ====================== MODAL IMAGEN DEL PREDIO ====================== */}
<Dialog
  open={openImagenPredio}
  onClose={() => setOpenImagenPredio(false)}
  maxWidth="md"
  fullWidth
  sx={{
    "& .MuiDialog-paper": {
      borderRadius: 3,
      bgcolor: "#5379acff",
      color: "#fff",
      boxShadow: "0 8px 20px rgba(230, 227, 227, 0.5)",
    },
  }}
>
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      borderBottom: "1px solid rgba(231, 227, 227, 0.1)",
      pb: 1,
    }}
  >
    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
      Imagen del Predio
    </Typography>
    <IconButton
      onClick={() => setOpenImagenPredio(false)}
      sx={{ color: "#fff" }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 0,
      backgroundColor: "#000",
    }}
  >
    {imagenPredioModal ? (
      <Box
        component="img"
        src={imagenPredioModal}
        alt="Imagen del predio"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "80vh",
          objectFit: "contain",
        }}
        onError={(e: any) => (e.target.src = predio1)}
      />
    ) : (
      <Typography
        variant="body2"
        sx={{ color: "#ccc", textAlign: "center", py: 5 }}
      >
        No se encontró imagen para este predio.
      </Typography>
    )}
  </DialogContent>
</Dialog>


    <Dialog
  open={openBuscarDNI}
  onClose={() => setOpenBuscarDNI(false)}
  fullWidth
  maxWidth="lg"
>
  <DialogTitle sx={{ fontWeight: 600, color: "#003366" }}>
    Búsqueda de Predio por DNI / CE
  </DialogTitle>

  <DialogContent dividers>
    {/* Filtros */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Tipo de Documento</InputLabel>
          <Select
            label="Tipo de Documento"
            value={tipoDocDNI}
            onChange={(e) => {
              setTipoDocDNI(e.target.value as any);
              setErrorTipoDocDNI("");
            }}
          >
            <MenuItem value="">--Seleccione--</MenuItem>
            <MenuItem value="DNI">DNI</MenuItem>
            <MenuItem value="CE">Carné de Extranjería</MenuItem>
          </Select>
        </FormControl>
        {errorTipoDocDNI && (
          <Typography variant="caption" sx={{ color: "red", mt: 0.3, fontSize: "0.75rem" }}>
            {errorTipoDocDNI}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="N° Documento"
          size="small"
          value={numDocDNI}
          onChange={(e) => {
            setNumDocDNI(e.target.value);
            setErrorNumDocDNI("");
          }}
          sx={{ minWidth: 220 }}
        />
        {errorNumDocDNI && (
          <Typography variant="caption" sx={{ color: "red", mt: 0.3, fontSize: "0.75rem" }}>
            {errorNumDocDNI}
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="success"
        startIcon={<SearchIcon />}
        onClick={handleBuscarPorDNI}
        disabled={loadingBusquedaDNI}
        sx={{ height: 40 }}
      >
        {loadingBusquedaDNI ? "Buscando..." : "Buscar"}
      </Button>
    </Box>

    {/* Resultados: SIEMPRE 3 */}
    {loadingBusquedaDNI ? (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    ) : resultadosBusquedaDNI.length > 0 ? (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Uso</TableCell>
              <TableCell>Dueño</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultadosBusquedaDNI.map((r, i) => (
              <TableRow
                key={i}
                hover
                sx={{ cursor: "pointer", "& td": { py: 0.3, px: 1.5 } }}
                onClick={() => {
                  // Setear selección al formulario (igual que por dirección)
                  handleChange({ target: { name: "codigoPredio", value: r.codigo } } as any);
                  handleChange({ target: { name: "direccionCompletaPredio", value: r.direccion } } as any);
                  handleChange({ target: { name: "tipoViaPredio", value: r.tipoVia } } as any);
                  handleChange({ target: { name: "descViaPredio", value: r.descripcionVia } } as any);
                  handleChange({ target: { name: "numMun1", value: r.numero } } as any);
                  handleChange({ target: { name: "imagenPredio", value: r.imagen } } as any);

                  setCodigoPU(r.codigo);
                  setMostrarDetallePredio(true);
                  setOpenBuscarDNI(false);
                }}
              >
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPredio(r);
                      setOpenImagen(true);
                    }}
                  >
                    <Box
                      component="img"
                      src={r.imagen}
                      alt="Predio"
                      sx={{
                        width: 80,
                        height: 60,
                        borderRadius: 1,
                        border: "1px solid #ddd",
                        objectFit: "cover",
                      }}
                      onError={(e: any) => (e.target.src = predio1)}
                    />
                  </IconButton>
                </TableCell>
                <TableCell>{r.codigo}</TableCell>
                <TableCell>{r.direccion}</TableCell>
                <TableCell>{r.uso}</TableCell>
                <TableCell>{r.propietario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1 }}>
          *Se muestran 3 predios representativos del titular.
        </Typography>
      </>
    ) : (
      <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
        Ingrese el documento y presione Buscar.
      </Typography>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenBuscarDNI(false)}>Cerrar</Button>
  </DialogActions>
</Dialog>



    </Box>
  );
});


export default Paso2Predio;