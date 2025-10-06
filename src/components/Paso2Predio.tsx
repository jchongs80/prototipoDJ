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

interface Paso2PredioProps {
  formData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | import("@mui/material/Select").SelectChangeEvent
  ) => void;
}

const Paso2Predio: React.FC<Paso2PredioProps> = ({ formData, handleChange }) => {
  const [codigoPU, setCodigoPU] = useState("");
  const [openBuscarDireccion, setOpenBuscarDireccion] = useState(false);
  const [tipoViaBusqueda, setTipoViaBusqueda] = useState("");
  const [nombreCalle, setNombreCalle] = useState("");
  const [numeroPuerta, setNumeroPuerta] = useState("");
  const [distritoBusqueda, setDistritoBusqueda] = useState("");
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);
  const [mostrarDetallePredio, setMostrarDetallePredio] = useState(false);
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


  // 🔍 Buscar por Dirección (demo)
  const handleBuscarDireccion = () => {
    setLoadingBusqueda(true);
    setTimeout(() => {
      const datosDemo = Array.from({ length: 10 }).map((_, i) => ({
        codigo: `PU-${1000 + i}`,
        direccion: "Cercado de Lima, Jr. Camaná, 499, Lima",
        tipoVia: "Jirón",
        descripcionVia: "Camaná",
        tipoDenomUrbana: "",            // vacío a propósito (demo)
        nombreDenomUrbana: "",          // vacío a propósito (demo)
        numero: "499",
        propietario: `Juan Pérez ${i + 1}`,
      }));
      setResultadosBusqueda(datosDemo);
      setLoadingBusqueda(false);
    }, 1200);
  };

  // 🔍 Buscar por PU (demo)
  const handleBuscarPU = () => {
    if (!codigoPU.trim()) {
      alert("Ingrese un código de PU válido.");
      return;
    }
    // Setea valores demo y muestra detalle
    handleChange({ target: { name: "codigoPredio", value: codigoPU } } as any);
    handleChange({ target: { name: "direccionCompletaPredio", value: "Cercado de Lima, Jr. Camaná, 499, Lima" } } as any);
    handleChange({ target: { name: "tipoViaPredio", value: "Jirón" } } as any);
    handleChange({ target: { name: "descViaPredio", value: "Camaná" } } as any);
    handleChange({ target: { name: "tipoDenomUrbPredio", value: "" } } as any);
    handleChange({ target: { name: "descDenomUrbPredio", value: "" } } as any);
    handleChange({ target: { name: "numMun1", value: "499" } } as any);
    setMostrarDetallePredio(true);
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
        <Tooltip title="Ingrese el código de PU (Predio Urbano) que aparece en el PU de la cuponera." arrow>
          <TextField
            label="Código PU"
            value={codigoPU}
            onChange={(e) => setCodigoPU(e.target.value)}
            size="small"
            sx={{ width: 220 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <InfoOutlinedIcon sx={{ color: "#003366" }} fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>

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
              <IconButton
                color="success"
                onClick={() => document.getElementById("fileAdquisicion")?.click()}
                sx={{
                  bgcolor: formData.docAdquisicion
                    ? "rgba(46,125,50,0.15)"
                    : "rgba(76,175,80,0.08)",
                  "&:hover": { bgcolor: "rgba(76,175,80,0.2)" },
                }}
              >
                <UploadFileIcon />
              </IconButton>
              <input
                id="fileAdquisicion"
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    handleChange({
                      target: { name: "docAdquisicion", value: file.name },
                    } as any);
                    handleChange({
                      target: { name: "urlAdquisicion", value: url },
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

      {/* ✅ Mensaje verde y link PDF */}
      {(formData.docAdquisicion || formData.urlAdquisicion) && (
        <Box
          sx={{
            mt: 0.8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#2e7d32", fontWeight: 500 }}
          >
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
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: 600, color: "#003366" }}>
          Búsqueda de Predio por Dirección
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 2,
              mb: 3,
            }}
          >
            <FormControl size="small" fullWidth>
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

            <FormControl size="small" fullWidth>
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
                  "Angamos", "Pardo", "Petit Thouars", "Abancay", "Prolongación Iquitos",
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
              fullWidth
            />

            <TextField
              label="Distrito"
              value={distritoBusqueda}
              onChange={(e) => setDistritoBusqueda(e.target.value)}
              size="small"
              fullWidth
            />
          </Box>

          <Button
            variant="contained"
            color="success"
            startIcon={<SearchIcon />}
            onClick={handleBuscarDireccion}
            disabled={loadingBusqueda}
            sx={{ mb: 2 }}
          >
            {loadingBusqueda ? "Buscando..." : "Buscar"}
          </Button>

          {loadingBusqueda ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : resultadosBusqueda.length > 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Código PU</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Propietario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultadosBusqueda.map((r, i) => (
                  <TableRow
                    key={i}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      // Setea todo lo necesario en formData
                      handleChange({ target: { name: "codigoPredio", value: r.codigo } } as any);
                      handleChange({ target: { name: "direccionCompletaPredio", value: r.direccion } } as any);
                      handleChange({ target: { name: "tipoViaPredio", value: r.tipoVia } } as any);
                      handleChange({ target: { name: "descViaPredio", value: r.descripcionVia } } as any);
                      handleChange({ target: { name: "tipoDenomUrbPredio", value: r.tipoDenomUrbana } } as any);
                      handleChange({ target: { name: "descDenomUrbPredio", value: r.nombreDenomUrbana } } as any);
                      handleChange({ target: { name: "numMun1", value: r.numero } } as any);

                      setCodigoPU(r.codigo);
                      setMostrarDetallePredio(true);
                      setOpenBuscarDireccion(false);
                    }}
                  >
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
    </Box>
  );
};

export default Paso2Predio;