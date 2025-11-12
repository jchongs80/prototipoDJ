import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  WarningAmber as WarningAmberIcon,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TributitoBubble from "./tributitoBubble";

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
        flex: "1 1 0",              // distribuye equitativamente el espacio disponible
        width: { xs: "100%", sm: "auto" },
        minWidth: { xs: 240, md: 260 },
        maxWidth: { md: 310 },
        height: 85,
        display: "flex",            // asegura que el inner Box ocupe todo el espacio
        alignItems: "center",
      }}
    >
      <Box
       sx={{
          width: "100%",
          height: "100%",
          backgroundColor: color,
          color: "white",
          borderRadius: "10px",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 2.5 },
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
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.9rem", md: "1rem" },
            mx: 1,
            lineHeight: 1.3,
            textAlign: "center",
            whiteSpace: "normal",
          }}
        >
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
            zIndex: 2000,
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
  const drawerWidth = 80;
  const navigate = useNavigate();
  const location = useLocation();

  const nuevosPredios = location.state?.nuevosPredios || 0;

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numPredios, setNumPredios] = useState<number | "">("");
  const [tipoPersona, setTipoPersona] = useState("");

  const [errorNumPredios, setErrorNumPredios] = useState("");
  const [errorTipoPersona, setErrorTipoPersona] = useState("");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Fecha y hora en vivo
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

  const sidebarItems = [
    { icon: <HomeIcon />, label: "Inicio", active: true },
    { icon: <AssignmentIcon />, label: "Trámites", active: false },
    { icon: <DescriptionIcon />, label: "Consultas", active: false },
    { icon: <AccountCircleIcon />, label: "Mi Perfil", active: false },
    { icon: <HelpOutlineIcon />, label: "Ayuda", active: false },
  ];

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

  const handleDescargarPDF = (codigo: string) => {
    const fileURL = `${process.env.PUBLIC_URL}/PU.pdf`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `DJ_${codigo}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* APPBAR */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "#1e5ba8" }}>
        <Toolbar sx={{ minHeight: "64px!important" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.5rem", mr: 3 }} translate="no">
            SAT
          </Typography>

          {/* Fecha y hora */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant="body2" sx={{ fontSize: "0.875rem", textTransform: "capitalize" }} translate="no">
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

            <Button startIcon={<NotificationsIcon />} sx={{ color: "white", textTransform: "none", fontSize: "0.875rem" }}>
              Alertas y notificaciones
            </Button>

            <Button endIcon={<ArrowDropDownIcon />} sx={{ color: "white", textTransform: "none", fontSize: "0.875rem" }}>
              Usuario: Victor Gonzales
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
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
                <ListItemIcon sx={{ minWidth: "auto", color: "white", mb: 0.5 }}>{item.icon}</ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: "0.65rem", textAlign: "center" }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Logout button at bottom */}
        <Box sx={{ mb: 2 }}>
          <ListItemButton
            onClick={onLogout}
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

      {/* CONTENIDO PRINCIPAL */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: "64px",
          p: 4,
          bgcolor: "#f5f7fa",
        }}
      >
        {/* Contenedor central que controla ancho y alineación (todas las cajas dentro usan width: 100%) */}
        <Box sx={{ maxWidth: 1100, width: "100%", mx: "auto", px: { xs: 2, md: 0 }, overflow: "visible" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#003366", mb: 3 }}>
            Antes de iniciar el registro de tu Declaración Jurada de Impuesto Predial, ten en cuenta lo siguiente:
          </Typography>

          {/* FILA 1: Solo los 3 botones InfoButton */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, md: 2 },
              mb: { xs: 3, md: 4 },
              flexWrap: { xs: "wrap", md: "nowrap" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <InfoButton
              title="¿Qué puedes declarar?"
              color="#1e88e5"
              items={[
                "Cualquier predio del Cercado de Lima, adquirido como persona natural titular",
              ]}
            />
            <InfoButton
              title="¿Qué documentos debes tener a mano?"
              color="#0d47a1"
              items={[
                "Minuta, contrato privado o Escritura Pública",
                "Recibo de servicios del domicilio fiscal, de cualquiera de los 3 últimos meses de la fecha del registro",
                "PU del predio adquirido",
              ]}
            />
            <InfoButton
              title="¿Cuándo puedes registrarla?"
              color="#ffb300"
              items={[
                "Puedes declarar hasta el último día hábil del mes de febrero, del año siguiente a la adquisición del bien.",
                "Puedes realizar el registro virtual, las 24 horas de los 7 días de la semana",
              ]}
            />
          </Box>

          {/* FILA 2: AMBAS TABLAS + TRIBUTITO flotando */}
          <Box
            sx={{
              position: "relative",
              mb: 3,
              width: "100%",
            }}
          >
            {/* Contenedor de ambas tablas (vertical) - ocupa 100% del ancho */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              {/* TABLA 1 - Predios que ya tiene declarados */}
              <Fade in timeout={700}>
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#1e5ba8", mb: 2, fontWeight: 600 }}>
                    🏠 Predios que ya tiene declarados
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

              {/* TABLA 2 - Declaraciones Juradas Registradas Recientemente */}
              <Fade in timeout={900}>
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#1e5ba8", mb: 2, fontWeight: 600 }}>
                    📄 Declaraciones Juradas Registradas Recientemente
                  </Typography>

                  {prediosRecientes.length === 0 ? (
                    <Typography sx={{ color: "#888", py: 1 }}>No tiene predios declarados recientemente.</Typography>
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
                                onClick={() => handleDescargarPDF("10001")}
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
            </Box>

            {/* Tributito flotando absolutamente en el lado derecho */}
            <Box 
              sx={{ 
                position: "absolute",
                top: 20,
                right: -40,
                display: { xs: "none", lg: "block" },
                zIndex: 10,
                pointerEvents: "none", // Permite que los clics pasen a través
              }}
            >
              <Box sx={{ position: "relative", width: 180 }}>
                <img src={require("../assets/tributito2.png")} alt="Tributito" style={{ width: "100%", height: "auto", display: "block" }} />
                {/* Globo a la izquierda de Tributito con flecha apuntando a la derecha */}
                <Box sx={{ position: "absolute", left: 60, bottom: 180 }}>
                  <TributitoBubble anchorLeft={-300} anchorBottom={0} maxWidth={280} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* MENSAJE INFORMATIVO (ahora 100% ancho del contenedor) */}
          <Typography
            sx={{
              mt: 2,
              color: "#003366",
              bgcolor: "#e8f0fe",
              borderRadius: 1,
              p: 1.5,
              width: "100%",
            }}
          >
            ℹ️ La confirmación de su registro se enviará al correo registrado en Agencia Virtual y casilla electrónica SICESAT.
          </Typography>

          {/* MENSAJE ADVERTENCIA (alineado) */}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: "#fff3cd",
              border: "1px solid #ffeeba",
              color: "#856404",
              borderRadius: 1,
              p: 1.5,
              width: "100%",
            }}
          >

            <Typography sx={{ fontSize: "0.95rem" }}>
              ⚠️ Este formulario está disponible únicamente en la versión web del SAT Lima. Actualmente no se encuentra optimizado para dispositivos móviles. Le recomendamos utilizar una computadora o laptop para completar el registro sin inconvenientes.
            </Typography>
          </Box>

          {/* BOTONES */}
          <Box sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "center" }}>
            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
              Volver a menú principal
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Iniciar Proceso de Declaración Jurada
            </Button>
          </Box>

          {/* FAQ - ancho 100% del contenedor */}
          <Box
            sx={{
              mt: 6,
              mb: 8,
              width: "100%",
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold", mb: 2 }}>
              ❓ Preguntas Frecuentes sobre el Registro de Declaración Jurada
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>¿Qué es una Declaración Jurada de Impuesto Predial?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Es el documento mediante el cual el contribuyente informa al SAT los datos actualizados de sus predios,
                  permitiendo calcular correctamente el impuesto predial correspondiente al año fiscal.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>¿Quiénes deben presentar la Declaración Jurada?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Todas las personas naturales o jurídicas que hayan adquirido, transferido o modificado las características
                  físicas o legales de un predio ubicado en el Cercado de Lima durante el año anterior.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>¿Puedo registrar más de un predio?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Sí. El sistema permite declarar uno o varios predios en una misma sesión. Solo debe indicar el número total
                  de predios que desea registrar al inicio del proceso.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>¿Qué sucede si presento la Declaración fuera de plazo?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  La presentación fuera del plazo legal constituye una infracción tributaria, sujeta a la aplicación de una multa.
                  Se recomienda registrar su DJ dentro de los plazos establecidos para evitar sanciones.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>¿Dónde puedo obtener más ayuda o asistencia?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Puede comunicarse con nuestro canal de atención SAT en Línea o visitar cualquiera de nuestras agencias de atención.
                  También puede consultar la guía del usuario disponible en la parte superior de esta página.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>

        {/* MODAL */}
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
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setNumPredios(value);
                    if (value > 0) setErrorNumPredios("");
                    else setErrorNumPredios("El número debe ser mayor a 0");
                  }}
                  error={!!errorNumPredios}
                  helperText={errorNumPredios}
                  sx={{
                    mb: 2,
                    "& .MuiFormHelperText-root": {
                      color: "#e53935",
                      fontSize: "0.8rem",
                      mt: 0.5,
                    },
                  }}
                />

                <TextField
                  select
                  fullWidth
                  label="Tipo de Persona"
                  value={tipoPersona}
                  onChange={(e) => {
                    setTipoPersona(e.target.value);
                    if (e.target.value) setErrorTipoPersona("");
                  }}
                  error={!!errorTipoPersona}
                  helperText={errorTipoPersona}
                  sx={{
                    mb: 3,
                    "& .MuiFormHelperText-root": {
                      color: "#e53935",
                      fontSize: "0.8rem",
                      mt: 0.5,
                    },
                  }}
                >
                  <MenuItem value="Persona Natural">Persona Natural</MenuItem>
                  <MenuItem value="Sociedad Conyugal">Sociedad Conyugal</MenuItem>
                </TextField>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      let valid = true;
                      if (!numPredios || numPredios <= 0) {
                        setErrorNumPredios("Debe ingresar un número mayor a 0");
                        valid = false;
                      }
                      if (!tipoPersona) {
                        setErrorTipoPersona("Debe seleccionar un tipo de persona");
                        valid = false;
                      }

                      if (!valid) return;

                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        setOpenModal(false);
                        navigate("/registrar-dj", { state: { numPredios, tipoPersona } });
                      }, 2500);
                    }}
                  >
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

      {/* FOOTER */}
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
        <Typography variant="caption" sx={{ color: "#666", ml: 2 }} translate="no">
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