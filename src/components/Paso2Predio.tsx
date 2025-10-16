import React, { useState, useEffect } from "react";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";

import datosPredioIcon from './../assets/casa.png';
import condicionPropiedadIcon from './../assets/contrato.png';
import valorAdquisicionIcon from './../assets/comprar-casa.png';
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

interface Paso2PredioProps {
  formData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | import("@mui/material/Select").SelectChangeEvent
  ) => void;
  registerValidator?: (fn: () => boolean) => void; 
}

const Paso2Predio: React.FC<Paso2PredioProps> = ({ formData, handleChange, registerValidator, }) => {
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
  const [loadingArchivoAdquisicion, setLoadingArchivoAdquisicion] = useState(false);
  const [debeValidar, setDebeValidar] = useState(false); // ✅ controla si se debe mostrar error


  // Util para mostrar "—" cuando no hay valor
  const view = (v?: string) => (v && `${v}`.trim() !== "" ? v : "—");

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

useEffect(() => {
  if (registerValidator) {
    registerValidator(() => {
      setDebeValidar(true); // 🔹 activa validación visual solo al presionar Siguiente

      if (!formData.docAdquisicion || formData.docAdquisicion.trim() === "") {
        setErrorArchivoAdquisicion(
          "No se ha seleccionado el archivo que acredite la transferencia del predio."
        );
        return false;
      }

      setErrorArchivoAdquisicion("");
      return true;
    });
  }
}, [registerValidator, formData.docAdquisicion]);

// Limpia errores al buscar predio o cargar datos automáticos
const resetValidacionArchivo = () => {
  setDebeValidar(false);
  setErrorArchivoAdquisicion("");
};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#003366", mb: 2 }}>
        <img
        src={datosPredioIcon}
        alt="Valor Adquisicion"
        style={{ width: 30, height: 30, marginRight: 8 }}
    />  
        Datos del Predio
      </Typography>

      {/* CABECERA DE BÚSQUEDA */}
      <Box sx={{ border: "1px solid #e0e0e0", bgcolor: "#fff",display: "flex", p: 2.5,alignItems: "center", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Tooltip
          title="Ingrese el código de PU (Predio Urbano) que aparece en el PU de la cuponera."
          arrow
        >
          <TextField
            label="Código PU"
            value={codigoPU}
            onChange={(e) => {
              setCodigoPU(e.target.value);
              if (errorCodigoPU) setErrorCodigoPU(""); // limpiar mensaje mientras escribe
            }}
            size="small"
            sx={{ width: 220 }}
            error={Boolean(errorCodigoPU)} // 🔴 activa color rojo en el borde
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <InfoOutlinedIcon sx={{ color: "#003366" }} fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        {errorCodigoPU && (
          <Typography
            variant="caption"
            sx={{ color: "red", fontSize: "0.75rem", mt: 0.3, ml: 0.5 }}
          >
            {errorCodigoPU}
          </Typography>
        )}
      </Box>
        
        <Button variant="contained" color="success" startIcon={<SearchIcon />} onClick={handleBuscarPU}>
          Buscar por PU
        </Button>

        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={() => setOpenBuscarDireccion(true)}
          sx={{ borderColor: "#003366", color: "#003366", "&:hover": { bgcolor: "rgba(0,51,102,0.05)" } }}
        >
          Buscar por Dirección
        </Button>
      </Box>

      {/* DETALLE VISUAL (solo si ya se buscó/seleccionó) */}
      {mostrarDetallePredio && (
        <>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            //boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            //borderLeft: "6px solid #003366",
            mt: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#003366", fontWeight: 600, mb: 2 }}>
            📍 Ubicación del Predio
          </Typography>

          {/* Layout principal con Box (sin Grid) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {/* Columna IZQUIERDA */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Dirección completa */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "#555", mb: 0.5 }}>
                  Dirección Completa:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    bgcolor: "#f4f6f8",
                    p: 0.5,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {view(formData.direccionCompletaPredio) || "Cercado de Lima, Jr. Camaná, 499, Lima"}
                </Typography>
              </Box>

              {/* Detalle en dos columnas (ordenado y limpio) */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.25,
                }}
              >
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Tipo de Vía:</strong> {view(formData.tipoViaPredio) || "Jirón"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Descripción vía:</strong> {view(formData.descViaPredio) || "Camaná"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Tipo de Denominación Urbana:</strong> {view(formData.tipoDenomUrbPredio)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Nombre Denominación Urbana:</strong> {view(formData.descDenomUrbPredio)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Número:</strong> {view(formData.numMun1) || "499"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Lote:</strong> {view(formData.lotePredio)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Int:</strong> {view(formData.interiorPredio)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Piso:</strong> {view(formData.piso)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Edif.:</strong> {view(formData.edificioPredio)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Tda.:</strong> {view(formData.tda)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Dpto.:</strong> {view(formData.dpto)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Oficina:</strong> {view(formData.ofic)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Ingreso:</strong> {view(formData.ingreso)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Letra:</strong> {view(formData.letra)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>SubLote:</strong> {view(formData.subLote)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

             {/* Sección: ¿Predio ubicado en edificio? + Partida Registral */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 3,
    flexWrap: "wrap",
    mt: 2,
  }}
>
  <Box sx={{ flex: 1 }}>
    <Typography variant="subtitle2" sx={{ color: "#555", mb: 0.5 }}>
      ¿Predio ubicado en edificio?
    </Typography>
    <RadioGroup
      row
      name="predioEdificio"
      value={formData.predioEdificio || "No"}
      onChange={handleChange}
    >
      <FormControlLabel value="Si" control={<Radio color="primary" />} label="Sí" />
      <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
    </RadioGroup>
  </Box>

  <Box sx={{ flex: 1 }}>
    <Typography variant="subtitle2" sx={{ color: "#555", mb: 0.5 }}>
      Partida Registral N°
    </Typography>
    <TextField
      fullWidth
      size="small"
      placeholder="Ingrese N° de partida registral"
      name="partidaRegistral"
      value={formData.partidaRegistral || ""}
      onChange={handleChange}
      sx={{
        maxWidth: 280,
      }}
    />
  </Box>
</Box>
            </Box>

            {/* Columna DERECHA (Mapa + Imagen) */}
            <Box sx={{ flexBasis: { md: "420px" }, flexShrink: 0 }}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  mb: 2,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1950.9719709145008!2d-77.03470702140892!3d-12.047378097912183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c9e3ae9203%3A0x9c33f80e960a0b0!2sJr.%20Caman%C3%A1%20499%2C%20Lima%2015001!5e0!3m2!1ses-419!2spe!4v1759029434785!5m2!1ses-419!2spe"
                  style={{ border: 0, width: "100%", height: "160px" }}
                  allowFullScreen
                  loading="lazy"
                />
              </Box>

              <Box
                component="img"
                src={predio1}
                alt="Imagen del predio"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Paper>

                
{/* ====================== CONDICIÓN DE PROPIEDAD ====================== */}
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 3,
    //boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    //borderLeft: "6px solid #3ba935",
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

  {/* === Fila 1: 4 columnas === */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      },
      gap: 2,
      mb: 3,
    }}
  >
    {/* 1️⃣ Tipo de Transferencia con PDF embebido */}
    <Box>
     <TextField
    select
    fullWidth
    size="small"
    label="Tipo de Transferencia"
    name="tipoTransferencia"
    value={formData.tipoTransferencia || ""}
    onChange={handleChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Tooltip
            title="Si escoge un tipo de transferencia debe adjuntar el PDF que acredite la transferencia del predio."
            arrow
          >
            <IconButton
              color="success"
              onClick={() => document.getElementById("fileAdquisicion")?.click()}
              sx={{
                bgcolor: "rgba(76,175,80,0.08)",
                "&:hover": { bgcolor: "rgba(76,175,80,0.2)" },
                width: 36,
                height: 36,
              }}
            >
              <UploadFileIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>
          <input
            id="fileAdquisicion"
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file && file.type === "application/pdf") {
                // ✅ limpia error y simula validación
                setErrorArchivoAdquisicion("");
                setLoadingArchivoAdquisicion(true);
                setDebeValidar(false); // 🔹 evita mostrar error tras selección
                setTimeout(() => {
                  const url = URL.createObjectURL(file);
                  handleChange({
                    target: { name: "docAdquisicion", value: file.name },
                  } as any);
                  handleChange({
                    target: { name: "urlAdquisicion", value: url },
                  } as any);
                  setLoadingArchivoAdquisicion(false);
                }, 3000);
              } else {
                setErrorArchivoAdquisicion(
                  "No se ha seleccionado el archivo que acredite la transferencia del predio."
                );
                handleChange({
                  target: { name: "docAdquisicion", value: "" },
                } as any);
                handleChange({
                  target: { name: "urlAdquisicion", value: "" },
                } as any);
              }
            }}
          />
        </InputAdornment>
      ),
    }}
  >
    <MenuItem value="">--Seleccione--</MenuItem>
    <MenuItem value="Compra">Compra</MenuItem>
    <MenuItem value="Sucesión">Sucesión</MenuItem>
    <MenuItem value="Anticipo de Legítima">Anticipo de Legítima</MenuItem>
    <MenuItem value="Adjudicación">Adjudicación</MenuItem>
    <MenuItem value="Otros">Otros</MenuItem>
  </TextField>

  {/* ❌ Error rojo */}
  {debeValidar && errorArchivoAdquisicion && !loadingArchivoAdquisicion && (
    <Typography
      variant="caption"
      sx={{ color: "red", fontSize: "0.75rem", mt: 0.5, display: "block" }}
    >
      {errorArchivoAdquisicion}
    </Typography>
  )}

  {/* 🕒 Estado de carga */}
  {loadingArchivoAdquisicion && (
    <Typography
      variant="caption"
      sx={{
        color: "#1976d2",
        fontStyle: "italic",
        mt: 0.8,
        display: "block",
      }}
    >
      ⏳ Procesando validación de PDF…
    </Typography>
  )}

  {/* ✅ Archivo válido */}
  {!loadingArchivoAdquisicion &&
    !errorArchivoAdquisicion &&
    (formData.docAdquisicion || formData.urlAdquisicion) && (
      <Box
        sx={{
          mt: 0.8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="caption" sx={{ color: "#2e7d32", fontWeight: 500 }}>
          ✅ Archivo válido — Nro Folios: 4
        </Typography>
        {formData.urlAdquisicion && (
          <Typography
            component="a"
            href={formData.urlAdquisicion}
            target="_blank"
            rel="noopener"
            sx={{
              fontSize: "0.75rem",
              color: "#1e88e5",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Ver archivo
          </Typography>
        )}
      </Box>
    )}
    </Box>

    {/* 2️⃣ Condición de la Propiedad */}
    <FormControl size="small" fullWidth>
      <InputLabel>Condición de la Propiedad</InputLabel>
      <Select
        label="Condición de la Propiedad"
        name="condicionPropiedad"
        value={formData.condicionPropiedad || "Propietario único"}
        onChange={handleChange}
      >
        <MenuItem value="Propietario único">Propietario único</MenuItem>
        <MenuItem value="Condominio">Condominio</MenuItem>
        <MenuItem value="Concesionario">Concesionario</MenuItem>
        <MenuItem value="Responsable">Responsable</MenuItem>
      </Select>
    </FormControl>

    {/* 3️⃣ % Propiedad */}
    <TextField
      label="% de Propiedad"
      name="porcentajePropiedad"
      value={formData.porcentajePropiedad || ""}
      onChange={handleChange}
      size="small"
      placeholder="100"
      fullWidth
    />

    {/* 4️⃣ Fecha de Adquisición */}
    <TextField
      label="Fecha de Adquisición"
      type="date"
      name="fechaAdquisicion"
      value={formData.fechaAdquisicion || ""}
      onChange={handleChange}
      size="small"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  </Box>

  {/* === Fila 2: 2 columnas (Valor + Condición especial) === */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      gap: 3,
      alignItems: "stretch",
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
              onChange={handleChange}
              size="small"
              placeholder="0.00"
              sx={{ width: 120 }}
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
              onChange={handleChange}
              size="small"
              placeholder="0.00"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>

    {/* 🏢 Condición Especial del Predio */}
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "#f4f6f8",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: "#003366", fontWeight: 600, mb: 1 }}
      >
        🏢 Condición Especial del Predio
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: 700, color: "#000" }}
      >
        Ninguno
      </Typography>
    </Paper>
  </Box>
</Paper>

{/* ====================== USO DEL PREDIO ====================== */}
<Paper
  sx={{
    p: 3,
    mt: 3,
    borderRadius: 3,
    //boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    //borderLeft: "6px solid #003366",
  }}
>
  <Typography
    variant="h6"
    sx={{ color: "#003366", fontWeight: 600, mb: 3 }}
  >
     <img
        src={usoPredioIcon}
        alt="Valor Adquisicion"
        style={{ width: 30, height: 30, marginRight: 8 }}
    /> Uso del Predio
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
      alignItems: "center",
    }}
  >
    {/* 1️⃣ Clase de uso */}
    <TextField
      select
      fullWidth
      size="small"
      label="Clase de Uso"
      name="claseUso"
      value={formData.claseUso || ""}
      onChange={handleChange}
    >
      <MenuItem value="">--Seleccione--</MenuItem>
      <MenuItem value="Residencial">Residencial</MenuItem>
      <MenuItem value="Comercial">Comercial</MenuItem>
      <MenuItem value="Recreacional">Recreacional</MenuItem>
      <MenuItem value="Industrial">Industrial</MenuItem>
      <MenuItem value="Otros">Otros</MenuItem>
    </TextField>

    {/* 2️⃣ Subclase */}
    <TextField
      select
      fullWidth
      size="small"
      label="Subclase de Uso"
      name="subClaseUso"
      value={formData.subClaseUso || ""}
      onChange={handleChange}
    >
      <MenuItem value="">--Seleccione--</MenuItem>
      <MenuItem value="Vivienda">Vivienda</MenuItem>
      <MenuItem value="Cochera">Cochera</MenuItem>
      <MenuItem value="Comercial Bienes">Comercial Bienes</MenuItem>
      <MenuItem value="Comercial Servicios">Comercial Servicios</MenuItem>
      <MenuItem value="Comercial Bienes o Servicios">
        Comercial Bienes o Servicios
      </MenuItem>
      <MenuItem value="Otros">Otros</MenuItem>
    </TextField>

    {/* 3️⃣ Uso */}
    <TextField
      select
      fullWidth
      size="small"
      label="Uso"
      name="uso"
      value={formData.uso || ""}
      onChange={handleChange}
    >
      <MenuItem value="">--Seleccione--</MenuItem>
      <MenuItem value="Vivienda">Vivienda</MenuItem>
      <MenuItem value="Depósito de Vivienda">Depósito de Vivienda</MenuItem>
      <MenuItem value="Cochera">Cochera</MenuItem>
      <MenuItem value="Tienda / Supermercado">Tienda / Supermercado</MenuItem>
      <MenuItem value="Otros">Otros</MenuItem>
    </TextField>

    {/* 4️⃣ Fecha inicio de uso */}
    <TextField
      label="Fecha de Inicio de Uso"
      type="date"
      name="fechaInicioUso"
      value={formData.fechaInicioUso || ""}
      onChange={handleChange}
      size="small"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  </Box>
</Paper>

</>
)}

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
    {/* Fila única de filtros */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: 1.5,
        mb: 3,
      }}
    >
      <TextField
        label="Distrito"
        value="Cercado de Lima"
        size="small"
        disabled
        sx={{ width: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Tipo de Vía</InputLabel>
        <Select
          value={tipoViaBusqueda}
          onChange={(e) => setTipoViaBusqueda(e.target.value)}
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

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Nombre de Calle</InputLabel>
        <Select
          value={nombreCalle}
          onChange={(e) => setNombreCalle(e.target.value)}
          label="Nombre de Calle"
        >
          <MenuItem value="">--Seleccione--</MenuItem>
          {[
            "Camaná", "Arequipa", "Tacna", "Colonial", "Brasil",
            "Salaverry", "La Mar", "Sucre", "Bolívar", "Junín",
            "Angamos", "Pardo", "Petit Thouars", "Abancay",
            "Prolongación Iquitos", "Santa Rosa"
          ].map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>

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
        onClick={handleBuscarDireccion}
        disabled={loadingBusqueda}
        sx={{ height: 40 }}
      >
        {loadingBusqueda ? "Buscando..." : "Buscar"}
      </Button>
    </Box>

    {loadingBusqueda ? (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    ) : resultadosBusqueda.length > 0 ? (
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
  {resultadosBusqueda.map((r, i) => (
    <TableRow
      key={i}
      hover
      sx={{
        cursor: "pointer",
        "& td": { py: 0.1, px: 1.5 }, // 👈 reduce espacio vertical (py) y horizontal (px)
      }}
      onClick={() => {
        handleChange({ target: { name: "codigoPredio", value: r.codigo } } as any);
        handleChange({ target: { name: "direccionCompletaPredio", value: r.direccion } } as any);
        handleChange({ target: { name: "tipoViaPredio", value: r.tipoVia } } as any);
        handleChange({ target: { name: "descViaPredio", value: r.descripcionVia } } as any);
        handleChange({ target: { name: "numMun1", value: r.numero } } as any);
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
              width: 40,
              height: 40,
              borderRadius: 1,
              border: "1px solid #ddd",
              objectFit: "cover",
            }}
            onError={(e: any) => {
              e.target.src = predio1; // fallback si no carga
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


    </Box>
  );
};

export default Paso2Predio;