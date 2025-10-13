// src/components/InscripcionPredial.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  TextField,
  MenuItem,
  CircularProgress,
  Button,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon,
  HelpOutline as HelpOutlineIcon,
  ExitToApp as ExitToAppIcon,
  PictureAsPdf as PictureAsPdfIcon,
  InfoOutlined as InfoIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  NotificationsNone as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

/* ======================
   COMPONENTE INFOBUTTON
====================== */
interface InfoButtonProps {
  title: string;
  color: string;
  items: string[];
}

const InfoButton: React.FC<InfoButtonProps> = ({ title, color, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: 310,
        height: 85,
      }}
    >
      <Box
        sx={{
          backgroundColor: color,
          color: "white",
          borderRadius: "10px",
          px: 3,
          py: 2.5,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.04)" },
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem", whiteSpace: "nowrap" }}>
          {title}
        </Typography>
      </Box>

      <Fade in={open} timeout={250}>
        <Box
          sx={{
            position: "absolute",
            top: "115%",
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            p: 2,
            minWidth: "300px",
            textAlign: "left",
            zIndex: 100,
          }}
        >
          {items.map((item, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.8 }}>
              <InfoIcon sx={{ color, fontSize: "1rem", mt: "2px" }} />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Fade>
    </Box>
  );
};

/* ======================
   COMPONENTE PRINCIPAL
====================== */
const InscripcionPredial: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const theme = useTheme();
  const drawerWidth = 80;
  const navigate = useNavigate();
  const location = useLocation();

  const nuevosPredios = location.state?.nuevosPredios || 0;

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numPredios, setNumPredios] = useState<number | "">("");
  const [tipoPersona, setTipoPersona] = useState("");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleAceptar = () => {
    if (!numPredios || !tipoPersona) return alert("Completa todos los campos.");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpenModal(false);
      navigate("/registrar-dj", { state: { numPredios, tipoPersona } });
    }, 2500);
  };

  // 🕒 Fecha y hora en vivo
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedDateTime = dateTime.toLocaleString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const prediosAnteriores = [
    { codigo: "DJ-2023-0001", direccion: "Jr. Puno 421", uso: "VIVIENDA", anio: "2023" },
  ];

  const prediosRecientes =
    nuevosPredios > 0
      ? Array.from({ length: nuevosPredios }, (_, i) => ({
          codigo: `DJ-2025-${(i + 12).toString().padStart(4, "0")}`,
          direccion: "Jr. Camaná 499",
          uso: "VIVIENDA",
          anio: "2025",
        }))
      : [];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* ===== APPBAR ===== */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "#1e5ba8" }}>
        <Toolbar sx={{ minHeight: "64px!important" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.5rem", mr: 3 }}>
            SAT
          </Typography>

          {/* Fecha y hora */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant="body2" sx={{ fontSize: "0.875rem", textTransform: "capitalize" }}>
              {formattedDateTime}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Botones derechos */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button startIcon={<LanguageIcon />} sx={{ color: "white", textTransform: "none", fontSize: "0.875rem" }}>
              Mejora la visualización de esta página
            </Button>

            <Button startIcon={<HelpOutlineIcon />} sx={{ color: "white", textTransform: "none", fontSize: "0.875rem" }}>
              Guía de usuario
            </Button>

            <Button
              startIcon={<NotificationsIcon />}
              sx={{ color: "white", textTransform: "none", fontSize: "0.875rem" }}
            >
              Alertas y notificaciones
            </Button>

            <Button
              endIcon={<ArrowDropDownIcon />}
              sx={{ color: "white", textTransform: "none", fontSize: "0.875rem" }}
            >
              Usuario: Victor Gonzales
            </Button>
          </Box>
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
          {[HomeIcon, AssignmentIcon, DescriptionIcon, AccountCircleIcon, HelpOutlineIcon].map(
            (Icon, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton sx={{ flexDirection: "column", py: 2, color: "white" }}>
                  <ListItemIcon sx={{ minWidth: "auto", color: "white", mb: 0.5 }}>
                    <Icon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>

        <Box sx={{ mb: 2 }}>
                  <ListItemButton
                    onClick={() => navigate("/")}
                    sx={{
                      flexDirection: "column",
                      py: 2,
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                    }}
                  >
                    <ExitToAppIcon sx={{ mb: 0.5 }} />
                    <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
                      Salir
                    </Typography>
                  </ListItemButton>
                </Box>
      </Drawer>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: "64px",
          p: 4,
          textAlign: "center",
          overflowX: "hidden",
          pb: 10,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#003366", mb: 3 }}>
          Antes de iniciar el registro de tu Declaración Jurada de Impuesto Predial, ten en cuenta lo siguiente:
        </Typography>

        {/* ==== BOTONES ==== */}
        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", gap: 3, mb: 6, flexWrap: "wrap" }}>
          <InfoButton
            title="¿Qué puedes declarar?"
            color="#1e88e5"
            items={["Cualquier predio del Cercado de Lima, adquirido como persona natural titular"]}
          />
          <InfoButton
            title="¿Qué documentos debes tener a mano?"
            color="#0d47a1"
            items={["Minuta o Escritura Pública", "Recibo de servicios", "PU del predio"]}
          />
          <InfoButton
            title="¿Cuándo puedes registrarla?"
            color="#ffb300"
            items={[
              "Hasta el último día hábil de febrero del año siguiente a la adquisición.",
              "Registro virtual 24/7 disponible.",
            ]}
          />

          {/* Tributito */}
          <Box
            sx={{
              position: "absolute",
              right: { xs: "10px", md: "40px" },
              top: { xs: "120px", md: "20px" },
              animation: "float 3s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            <img src={require("../assets/tributito2.png")} alt="Tributito" style={{ height: "200px" }} />
          </Box>
        </Box>

        {/* ==== TABLAS ==== */}
        <Fade in timeout={700}>
          <Box
            sx={{
              width: "85%",
              bgcolor: "white",
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              mx: "auto",
            }}
          >
            <Typography variant="h6" sx={{ color: "#1e5ba8", mb: 2, fontWeight: 600 }}>
              🏠 Predios Declarados en Años Anteriores
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Código DJ</TableCell>
                  <TableCell align="center">Dirección</TableCell>
                  <TableCell align="center">Uso</TableCell>
                  <TableCell align="center">Año Declaración</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prediosAnteriores.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{p.codigo}</TableCell>
                    <TableCell align="center">{p.direccion}</TableCell>
                    <TableCell align="center">{p.uso}</TableCell>
                    <TableCell align="center">{p.anio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Fade>

        {/* ==== TABLA RECIENTES ==== */}
        <Fade in timeout={900}>
          <Box
            sx={{
              width: "85%",
              bgcolor: "white",
              mt: 4,
              mb: 3,
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              mx: "auto",
            }}
          >
            <Typography variant="h6" sx={{ color: "#1e5ba8", mb: 2, fontWeight: 600 }}>
              📄 Declaraciones Juradas Registradas Recientemente
            </Typography>

            {prediosRecientes.length === 0 ? (
              <Typography sx={{ color: "#888", py: 2 }}>No tiene predios declarados recientemente.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Código DJ</TableCell>
                    <TableCell align="center">Dirección</TableCell>
                    <TableCell align="center">Uso</TableCell>
                    <TableCell align="center">Año Declaración</TableCell>
                    <TableCell align="center">Descargar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prediosRecientes.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{p.codigo}</TableCell>
                      <TableCell align="center">{p.direccion}</TableCell>
                      <TableCell align="center">{p.uso}</TableCell>
                      <TableCell align="center">{p.anio}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PictureAsPdfIcon />}
                          sx={{
                            textTransform: "none",
                            fontSize: "0.75rem",
                            borderColor: "#ff9800",
                            color: "#bf360c",
                            "&:hover": { backgroundColor: "#fff3e0" },
                          }}
                        >
                          Descargar DJ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Fade>

        {/* ==== MENSAJE Y BOTONES ==== */}
        <Typography
          sx={{
            mt: 2,
            color: "#003366",
            bgcolor: "#e8f0fe",
            borderRadius: 1,
            p: 1.5,
            width: "90%",
            mx: "auto",
          }}
        >
          ℹ️ Recuerda que la confirmación de tu registro se enviará a tu correo registrado en la
          Agencia Virtual y Casilla Electrónica.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Volver a menú principal
          </Button>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Iniciar Proceso de Declaración Jurada
          </Button>
        </Box>

        {/* ==== MODAL ==== */}
        <Modal open={openModal} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            {!loading ? (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: "#003366", fontWeight: 600 }}>
                  Datos iniciales
                </Typography>
                <TextField
                  fullWidth
                  label="Nro de Predios a Declarar"
                  type="number"
                  value={numPredios}
                  onChange={(e) => setNumPredios(Number(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Tipo de Persona"
                  value={tipoPersona}
                  onChange={(e) => setTipoPersona(e.target.value)}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="Persona Natural">Persona Natural</MenuItem>
                  <MenuItem value="Sociedad Conyugal">Sociedad Conyugal</MenuItem>
                </TextField>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button variant="contained" onClick={handleAceptar} disabled={!numPredios || !tipoPersona}>
                    Aceptar
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress color="primary" />
                <Typography sx={{ mt: 2, color: "#003366" }}>Preparando el registro...</Typography>
              </Box>
            )}
          </Box>
        </Modal>
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

export default InscripcionPredial;