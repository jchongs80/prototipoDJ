import React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon,
  HelpOutline as HelpOutlineIcon,
  ExitToApp as ExitToAppIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const ResumenPredios: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalDeclarados = state?.totalDeclarados || 0;
  const drawerWidth = 80;

  const sidebarItems = [
    { icon: <HomeIcon />, label: "Inicio", active: true },
    { icon: <AssignmentIcon />, label: "Trámites", active: false },
    { icon: <DescriptionIcon />, label: "Consultas", active: false },
    { icon: <AccountCircleIcon />, label: "Mi Perfil", active: false },
    { icon: <HelpOutlineIcon />, label: "Ayuda", active: false },
  ];

  // Generar lista de predios
  const predios = Array.from({ length: totalDeclarados }, (_, i) => ({
    codigoDJ: (10000 + i).toString(),
    direccion: "Jr. Camaná 499",
    uso: "VIVIENDA",
  }));

  const handleDescargarPDF = () => {
    const fileURL = `${process.env.PUBLIC_URL}/DJ_prop02.pdf`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "DJ_2025678010.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* ===== HEADER ===== */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#1e5ba8",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            SAT
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ===== SIDEBAR ===== */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#003d7a",
            border: "none",
            mt: "64px",
            height: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <List sx={{ p: 0 }}>
          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  flexDirection: "column",
                  py: 2,
                  color: "white",
                  bgcolor: item.active ? "rgba(255,255,255,0.1)" : "transparent",
                  borderLeft: item.active ? "3px solid #40e0d0" : "3px solid transparent",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                <ListItemIcon sx={{ minWidth: "auto", color: "white", mb: 0.5 }}>
                  {item.icon}
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mb: 2 }}>
          <ListItemButton
            onClick={() => navigate("/")}
            sx={{
              flexDirection: "column",
              py: 2,
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            <ExitToAppIcon sx={{ mb: 0.5 }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
              Salir
            </Typography>
          </ListItemButton>
        </Box>
      </Drawer>

      {/* ===== CONTENIDO ===== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: "64px",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#003366", mb: 3 }}
        >
          Resumen de Predios Declarados
        </Typography>

        <Paper
          elevation={2}
          sx={{
            mx: "auto",
            width: "90%",
            p: 3,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e8f1fb" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Código DJ
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Dirección del Predio
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Uso del Predio
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#003366" }}
                >
                  Descargar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predios.map((p, i) => (
                <TableRow key={i} hover>
                  <TableCell>{p.codigoDJ}</TableCell>
                  <TableCell>{p.direccion}</TableCell>
                  <TableCell>{p.uso}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<PictureAsPdfIcon />}
                      onClick={handleDescargarPDF}
                    >
                      Descargar DJ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {predios.length === 0 && (
            <Typography sx={{ mt: 3, color: "#666" }}>
              No se han registrado declaraciones.
            </Typography>
          )}
        </Paper>


        {/* 🔹 Caja informativa SAT */}
<Box
  sx={{
    width: "90%",
    mx: "auto",
    mt: 4,
    p: 3,
    borderRadius: 2,
    backgroundColor: "#e8f4fd",
    border: "1px solid #b3d9f2",
    display: "flex",
    alignItems: "center",
    gap: 2,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  }}
>
  <Box
    sx={{
      width: 42,
      height: 42,
      borderRadius: "50%",
      backgroundColor: "#1e5ba8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Typography
      sx={{
        color: "white",
        fontWeight: "bold",
        fontSize: "1.3rem",
        lineHeight: 1,
      }}
    >
      i
    </Typography>
  </Box>

  <Typography
    sx={{
      color: "#003366",
      fontSize: "0.95rem",
      lineHeight: 1.6,
      textAlign: "justify",
    }}
  >
    Se informa que se ha procedido a realizar el registro de su{" "}
    <strong>Declaración Jurada de Arbitrios</strong>, el cual puede consultar en
    el siguiente enlace en la parte inferior de esta página.
  </Typography>
</Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="info"
            sx={{ px: 4, py: 1.2 }}
            onClick={() => alert("Funcionalidad en desarrollo")}
          >
            Consulta Arbitrios
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ px: 4, py: 1.2 }}
            onClick={() => navigate("/dashboard")}
          >
            Ir al Menú Principal
          </Button>
        </Box>
      </Box>

      {/* ===== FOOTER ===== */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: drawerWidth,
          right: 0,
          bgcolor: "white",
          borderTop: "1px solid #e0e0e0",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <Typography variant="caption" sx={{ color: "#666", ml: 2 }}>
          Copyright © 2025 SAT Lima — Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ color: "#666", mr: 2 }}>
          Versión 1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default ResumenPredios;