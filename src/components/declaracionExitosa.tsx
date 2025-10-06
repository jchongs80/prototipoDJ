import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon,
  HelpOutline as HelpOutlineIcon,
  ExitToApp as ExitToAppIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";

interface Props {
  onLogout?: () => void;
}

const DeclaracionExitosa: React.FC<Props> = ({onLogout}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
  numPredios = 1,
  prediosDeclarados = 0,
  tipoPersona,
  tipoDocConyuge,
  nroDocConyuge,
  apellidosConyuge,
  fechaNacimientoConyuge
} = state || {};
  const drawerWidth = 80;

const total = Number(numPredios);
const declarados = Number(prediosDeclarados);
const quedanPorDeclarar = Math.max(total - declarados, 0);

console.log("📊 Predios:", { total, declarados, quedanPorDeclarar });

  const sidebarItems = [
    { icon: <HomeIcon />, label: "Inicio", active: true },
    { icon: <AssignmentIcon />, label: "Trámites", active: false },
    { icon: <DescriptionIcon />, label: "Consultas", active: false },
    { icon: <AccountCircleIcon />, label: "Mi Perfil", active: false },
    { icon: <HelpOutlineIcon />, label: "Ayuda", active: false },
  ];

  // 🔹 Función para descargar el PDF desde la carpeta public
  const handleDescargarPDF = () => {
    const fileName = "DJ_prop02.pdf"; // nombre del archivo en /public
    const fileURL = `${process.env.PUBLIC_URL}/${fileName}`;

    // Crear un enlace invisible para forzar descarga
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* ======= HEADER ======= */}
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

      {/* ======= SIDEBAR ======= */}
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
          <ListItemButton onClick={onLogout} 
          sx={{ flexDirection: "column", py: 2, color: "white" }}>
            
            <ExitToAppIcon sx={{ mb: 0.5 }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
              Salir
            </Typography>
          </ListItemButton>
        </Box>
      </Drawer>

      {/* ======= CONTENIDO PRINCIPAL ======= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: "64px",
          p: 4,
          bgcolor: "#f5f7fa",
          textAlign: "center",
        }}
      >
        <CheckCircleOutlineIcon sx={{ color: "#3ba935", fontSize: 80, mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#003366", mb: 2 }}>
          Declaración Jurada declarada satisfactoriamente
        </Typography>

        <Typography variant="body1" sx={{ color: "#444", mb: 4 }}>
          Victor, has culminado con éxito el registro de tu Declaración Jurada predial{" "}
          <b>N.° 2025678010</b>, la cual ha sido notificada en línea a tu casilla electrónica
          y correo.
        </Typography>

        <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
        {quedanPorDeclarar > 0
            ? `Te quedan ${quedanPorDeclarar} predio(s) por declarar.`
            : "Has completado todas tus declaraciones juradas."}
        </Typography>

        {/* BOTONES */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleDescargarPDF}
          >
            Descargar DJ
          </Button>

          {quedanPorDeclarar > 0 ? (
            <Button
                variant="contained"
                color="warning"
                onClick={() =>
                    navigate("/registrar-dj", {
                    state: {
                        numPredios: total,
                        tipoPersona,
                        prediosDeclarados: declarados, // 👈 mantener el conteo actual
                        // 👇 reenviamos los datos del cónyuge
                        tipoDocConyuge,
                        nroDocConyuge,
                        apellidosConyuge,
                        fechaNacimientoConyuge
                    },
                    })
                }
                >
                Declarar Nuevo Predio ({quedanPorDeclarar} restante)
                </Button>
          ) : (
            <Button variant="contained" color="success" 
            onClick={() => {
    const totalDeclarados = Number(prediosDeclarados);
    sessionStorage.removeItem("prediosDeclarados");

    navigate("/resumen-predios", { state: { totalDeclarados } });
  }}
  >
              Terminar Proceso
            </Button>
          )}
        </Box>
      </Box>

      {/* ======= FOOTER ======= */}
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

export default DeclaracionExitosa;