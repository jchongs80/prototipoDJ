import React, { useState } from "react";
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
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ConstructionIcon from "@mui/icons-material/Construction";
import BuildIcon from "@mui/icons-material/Build";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import predio1 from "./../assets/predio1.png";
import InfoCallout from "./InfoCallout";

const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    secondary: { main: "#3ba935" },
  },
  typography: { fontFamily: "Roboto, 'Segoe UI', sans-serif" },
});

export default function Paso5Resumen({ formData }: { formData: any }) {
  const { state } = useLocation() || {};
  const imagenDelPredio = formData?.imagenPredio || predio1;

  const resumenPredio = {
    codigo: "PU-00014567",
    direccion: "Jr. Camaná Nro. 499 – Cercado de Lima",
    condicionPropiedad: 100,
    valorTotalTerreno: 60000.0,
    areaTotal: 120,
    uso: "Vivienda",
    imagen: imagenDelPredio,
  };

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
      valorFinal: "90.00",
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
      valorFinal: "85.50",
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
      valorTotalObras: "57.80",
    },
  ];

  const totalTerreno = 60000;
  const totalConstruccion = 270;
  const totalObrasComplementarias = 170;
  const totalAutovaluo =
    totalTerreno + totalConstruccion + totalObrasComplementarias;

  const [openImg, setOpenImg] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <InfoCallout
          title="Revisión final de la DJ"
          body="Verifica que toda la información sea correcta antes de presentar tu Declaración Jurada."
        />

        <Typography
          variant="h5"
          fontWeight={600}
          gutterBottom
          color="primary"
          sx={{ mb: 3 }}
        >
          📑 Resumen de Autovalúo del Predio
        </Typography>

        {/* 🔹 Datos del Predio */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#f9fafb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <HomeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Datos del Predio
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            {/* 🧾 Datos */}
            <Box sx={{ flex: 1 }}>
              <Typography>
                <b>Código PU:</b> {resumenPredio.codigo}
              </Typography>
              <Typography>
                <b>Dirección:</b> {resumenPredio.direccion}
              </Typography>
              <Typography>
                <b>Uso:</b> {resumenPredio.uso}
              </Typography>
              <Typography>
                <b>Condición Propiedad:</b> {resumenPredio.condicionPropiedad}%
              </Typography>
              <Typography>
                <b>Área Total:</b> {resumenPredio.areaTotal.toFixed(2)} m²
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  fontWeight: 600,
                  color: "primary.main",
                  fontSize: "1.1rem",
                }}
              >
                Valor del Terreno: S/{" "}
                {resumenPredio.valorTotalTerreno.toFixed(2)}
              </Typography>
            </Box>

            {/* 🖼️ Imagen con overlay */}
            <Box
              sx={{
                flexBasis: 340,
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                "&:hover .overlay": { opacity: 1 },
              }}
            >
              <Box
                component="img"
                src={resumenPredio.imagen}
                alt="Predio"
                sx={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.4)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => setOpenImg(true)}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.8)",
                    color: "#003366",
                    px: 2,
                    py: 0.6,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <ZoomInIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    Ver imagen
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* 🔹 Construcción */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ConstructionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Características de la Construcción
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Table size="small" sx={{ borderRadius: 2, overflow: "hidden" }}>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #003366 0%, #005fa3 100%)",
                }}
              >
                {[
                  "Tipo Nivel",
                  "N° Piso",
                  "Fecha Construcción",
                  "Área Propia (m²)",
                  "Material",
                  "Estado",
                  "Muros",
                  "Techos",
                  "Puertas/Ventanas",
                  "Valor Total (S/)",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontWeight: 700,
                      color: "#fff",
                      fontSize: "0.85rem",
                      borderRight: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pisos.map((p, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#f9fbfd" },
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                      transform: "scale(1.01)",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  <TableCell>{p.tipoNivel}</TableCell>
                  <TableCell>{p.nroPiso}</TableCell>
                  <TableCell>{p.fechaConstruccion}</TableCell>
                  <TableCell>{p.areaPropia}</TableCell>
                  <TableCell>{p.material}</TableCell>
                  <TableCell>{p.estadoConserv}</TableCell>
                  <TableCell>{p.muros}</TableCell>
                  <TableCell>{p.techos}</TableCell>
                  <TableCell>{p.puertasVentanas}</TableCell>
                  <TableCell align="right">
                    {parseFloat(p.valorFinal).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "#f0f4ff" }}>
                <TableCell colSpan={9} align="right" sx={{ fontWeight: 700 }}>
                  Total Construcción
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  S/ {totalConstruccion.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* 🔹 Obras Complementarias */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <BuildIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Obras Complementarias
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Table size="small" sx={{ borderRadius: 2 }}>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #003366 0%, #005fa3 100%)",
                }}
              >
                {[
                  "Descripción",
                  "Categoría",
                  "Unidad",
                  "Metrado",
                  "Material",
                  "Estado",
                  "Valor Total (S/)",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontWeight: 700,
                      color: "#fff",
                      fontSize: "0.85rem",
                      borderRight: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {obras.map((o, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#f9fbfd" },
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                      transform: "scale(1.01)",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  <TableCell>{o.descripcion}</TableCell>
                  <TableCell>{o.categoria}</TableCell>
                  <TableCell>{o.unidadMedida}</TableCell>
                  <TableCell>{o.metrado}</TableCell>
                  <TableCell>{o.material}</TableCell>
                  <TableCell>{o.estadoConserv}</TableCell>
                  <TableCell align="right">
                    {parseFloat(o.valorTotalObras).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "#f0f4ff" }}>
                <TableCell colSpan={6} align="right" sx={{ fontWeight: 700 }}>
                  Total Obras Complementarias
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  S/ {totalObrasComplementarias.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* 🔹 Totales Finales */}
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
              sx={{
                flex: 1,
                minWidth: 230,
                p: 2,
                textAlign: "center",
                borderRadius: 2,
                background: "linear-gradient(145deg, #f0f4ff, #e9f1ff)",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {item.icon} {item.label}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
                sx={{ mt: 1 }}
              >
                S/ {item.value.toFixed(2)}
              </Typography>
            </Paper>
          ))}

          <Paper
            sx={{
              flex: 1,
              minWidth: 230,
              p: 2,
              textAlign: "center",
              borderRadius: 2,
              background: "linear-gradient(135deg, #003366, #00509d)",
              color: "#fff",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              🪙 Autovalúo Total
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              S/ {totalAutovaluo.toFixed(2)}
            </Typography>
          </Paper>
        </Box>

        {/* 🖼️ Modal imagen */}
        <Dialog open={openImg} onClose={() => setOpenImg(false)} maxWidth="md">
          <DialogContent sx={{ p: 0, bgcolor: "#000" }}>
            <IconButton
              onClick={() => setOpenImg(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff",
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={resumenPredio.imagen}
              alt="Predio grande"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                maxHeight: "85vh",
              }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}