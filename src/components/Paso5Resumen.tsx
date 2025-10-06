import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ConstructionIcon from "@mui/icons-material/Construction";
import BuildIcon from "@mui/icons-material/Build";
import predio1 from './../assets/predio1.png';

const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    secondary: { main: "#3ba935" },
  },
  typography: { fontFamily: "Roboto, sans-serif" },
});

export default function Paso5Resumen() {
  // 🔹 Tipo de persona: cambia esto para probar
  const tipoPersona = "Persona Natural"; // o "Sociedad Conyugal"

  // 🔹 Datos de ejemplo
  const resumenContribuyente = {
    nombres: "JUAN VICTOR PÉREZ GARCÍA",
    tipoDocumento: "DNI",
    nroDocumento: "12345678",
    direccionFiscal: "Jr. Camaná 499 – Cercado de Lima",
  };

  const resumenConyuge =
    tipoPersona === "Persona Natural"
      ? null
      : {
          nombres: "MARÍA LÓPEZ TORRES",
          tipoDocumento: "DNI",
          nroDocumento: "87654321",
        };

  const resumenPredio = {
    codigo: "PU-00014567",
    direccion: "Jr. Camaná Nro. 499 – Cercado de Lima",
    condicionPropiedad: 100,
    valorTotalTerreno: 60000.0,
    areaTotal: 120,
    uso: "Vivienda",
    imagen1: "https://via.placeholder.com/150x100",
    imagen2: "https://via.placeholder.com/150x100",
  };

  // 🔹 Tres registros fijos de construcción
  const pisos = [
    {
      tipoNivel: "Piso",
      nroPiso: "1",
      fechaConstruccion: "2022-11",
      areaPropia: "30",
      material: "Concreto",
      estadoConserv: "Muy bueno",
      muros: "A",
      techos: "B",
      puertasVentanas: "C",
      valorFinal: "90",
    },
    {
      tipoNivel: "Piso",
      nroPiso: "2",
      fechaConstruccion: "2023-02",
      areaPropia: "25",
      material: "Ladrillo",
      estadoConserv: "Bueno",
      muros: "B",
      techos: "C",
      puertasVentanas: "D",
      valorFinal: "85",
    },
    {
      tipoNivel: "Piso",
      nroPiso: "3",
      fechaConstruccion: "2024-05",
      areaPropia: "20",
      material: "Concreto",
      estadoConserv: "Regular",
      muros: "C",
      techos: "D",
      puertasVentanas: "E",
      valorFinal: "75",
    },
  ];

  const obras = [
    {
      descripcion: "Muro de concreto armado",
      categoria: "Muros perimétricos o cercos",
      unidadMedida: "m²",
      metrado: "10",
      material: "Concreto",
      estadoConserv: "Bueno",
      valorTotalObras: "57.8",
    },
  ];

  const totalTerreno = 60000;
  const totalConstruccion = 270;
  const totalObrasComplementarias = 170;
  const totalAutovaluo =
    totalTerreno + totalConstruccion + totalObrasComplementarias;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom color="primary">
          📑 Resumen de Autovalúo del Predio
        </Typography>

        {/* 🔹 Contribuyente */}
        <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PersonIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Contribuyente</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography>
                <b>Nombres:</b> {resumenContribuyente.nombres}
              </Typography>
              <Typography>
                <b>Tipo Documento:</b> {resumenContribuyente.tipoDocumento}
              </Typography>
              <Typography>
                <b>N° Documento:</b> {resumenContribuyente.nroDocumento}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography>
                <b>Dirección Fiscal:</b> {resumenContribuyente.direccionFiscal}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 🔹 Cónyuge (solo si aplica) */}
        {tipoPersona !== "Persona Natural" && resumenConyuge && (
          <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <FavoriteIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Cónyuge</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: 1, minWidth: 280 }}>
                <Typography>
                  <b>Nombres:</b> {resumenConyuge.nombres}
                </Typography>
                <Typography>
                  <b>Tipo Documento:</b> {resumenConyuge.tipoDocumento}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 280 }}>
                <Typography>
                  <b>N° Documento:</b> {resumenConyuge.nroDocumento}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* 🔹 Predio */}
        <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HomeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Datos del Predio</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography>
                <b>Código PU:</b> {resumenPredio.codigo}
              </Typography>
              <Typography>
                <b>Dirección:</b> {resumenPredio.direccion}
              </Typography>
              <Typography>
                <b>Uso:</b> {resumenPredio.uso}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography>
                <b>Condición Propiedad:</b>{" "}
                {resumenPredio.condicionPropiedad}%
              </Typography>
              <Typography>
                <b>Valor Terreno:</b> S/ {resumenPredio.valorTotalTerreno}
              </Typography>
              <Typography>
                <b>Área Total:</b> {resumenPredio.areaTotal} m²
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <img
              src={predio1}
              alt="Predio"
              width="290"
              height="210"
              style={{ borderRadius: 6 }}
            />
           
          </Box>
        </Paper>

        {/* 🔹 Construcción (3 registros) */}
        <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <ConstructionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Características de la Construcción
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>Tipo Nivel</TableCell>
                <TableCell>N° Piso</TableCell>
                <TableCell>Fecha Construc.</TableCell>
                <TableCell>Área Propia (m²)</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Muros</TableCell>
                <TableCell>Techos</TableCell>
                <TableCell>Puertas y Ventanas</TableCell>
                <TableCell align="right">Valor Total (S/)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pisos.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.tipoNivel}</TableCell>
                  <TableCell>{p.nroPiso}</TableCell>
                  <TableCell>{p.fechaConstruccion}</TableCell>
                  <TableCell>{p.areaPropia}</TableCell>
                  <TableCell>{p.material}</TableCell>
                  <TableCell>{p.estadoConserv}</TableCell>
                  <TableCell>{p.muros}</TableCell>
                  <TableCell>{p.techos}</TableCell>
                  <TableCell>{p.puertasVentanas}</TableCell>
                  <TableCell align="right">{p.valorFinal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography align="right" sx={{ mt: 2, fontWeight: 600 }}>
            Total Construcción: S/ {totalConstruccion.toFixed(2)}
          </Typography>
        </Paper>

        {/* 🔹 Obras */}
        <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <BuildIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Obras Complementarias</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>Descripción</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Unidad</TableCell>
                <TableCell>Metrado</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Valor Total (S/)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obras.map((o, i) => (
                <TableRow key={i}>
                  <TableCell>{o.descripcion}</TableCell>
                  <TableCell>{o.categoria}</TableCell>
                  <TableCell>{o.unidadMedida}</TableCell>
                  <TableCell>{o.metrado}</TableCell>
                  <TableCell>{o.material}</TableCell>
                  <TableCell>{o.estadoConserv}</TableCell>
                  <TableCell align="right">{o.valorTotalObras}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography align="right" sx={{ mt: 2, fontWeight: 600 }}>
            Total Obras Complementarias: S/{" "}
            {totalObrasComplementarias.toFixed(2)}
          </Typography>
        </Paper>

        {/* 🔹 Totales finales */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          {[
            { label: "Terreno", value: totalTerreno, icon: "🏞️" },
            { label: "Construcción", value: totalConstruccion, icon: "🏗️" },
            { label: "Obras", value: totalObrasComplementarias, icon: "🔨" },
          ].map((item) => (
            <Paper
              key={item.label}
              sx={{ flex: 1, minWidth: 230, p: 2, textAlign: "center" }}
            >
              <Typography variant="h6" fontWeight={600}>
                {item.icon} {item.label}
              </Typography>
              <Typography variant="h5" color="secondary">
                S/ {item.value.toLocaleString("es-PE")}
              </Typography>
            </Paper>
          ))}

          <Paper
            sx={{
              flex: 1,
              minWidth: 230,
              p: 2,
              textAlign: "center",
              background: "#003366",
              color: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              🪙 Autovalúo Total
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              S/ {totalAutovaluo.toLocaleString("es-PE")}
            </Typography>
          </Paper>
        </Box>

       
      </Box>
    </ThemeProvider>
  );
}
