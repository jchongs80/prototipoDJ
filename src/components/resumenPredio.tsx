// src/components/ResumenPredios.tsx
import React, { useState, useEffect } from "react";
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
  Tooltip,
  Snackbar,
  Alert,
  Fade,
  Slide,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
import { useLocation, useNavigate } from "react-router-dom";
import formapago from './../assets/formapago.png'; 

const ResumenPredios: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalDeclarados = state?.totalDeclarados || 2;
  const drawerWidth = 80;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "info",
  });

  // 🕒 Fecha y hora actualizadas
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
    { icon: <HomeIcon />, label: "Inicio", active: false },
    { icon: <AssignmentIcon />, label: "Trámites", active: false },
    { icon: <DescriptionIcon />, label: "Consultas", active: true },
    { icon: <AccountCircleIcon />, label: "Mi Perfil", active: false },
    { icon: <HelpOutlineIcon />, label: "Ayuda", active: false },
  ];

  const predios = [
    {
      codigoDJ: "EX-0001",
      direccion: "Jr. Puno 421",
      uso: "VIVIENDA",
      condicion: "Predio existente",
      descargable: false,
    },
    ...Array.from({ length: totalDeclarados }, (_, i) => ({
      codigoDJ: (10000 + i).toString(),
      direccion: "Jr. Camaná 499",
      uso: "VIVIENDA",
      condicion: "Predio nuevo",
      descargable: true,
    })),
  ];

  const handleDescargarPDF = (codigo: string) => {
    setSnackbar({
      open: true,
      message: `📄 Descargando DJ ${codigo}...`,
      type: "info",
    });
    const fileURL = `${process.env.PUBLIC_URL}/PU.pdf`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `DJ_${codigo}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDescargarLiqPredial = (codigo: string) => {
    setSnackbar({
      open: true,
      message: `📄 Descargando LP ${codigo}...`,
      type: "info",
    });
    const fileURL = `${process.env.PUBLIC_URL}/LiquidacionPredial.pdf`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `LP_${codigo}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDescargarLiqArb = (codigo: string) => {
    setSnackbar({
      open: true,
      message: `📄 Descargando LP ${codigo}...`,
      type: "info",
    });
    const fileURL = `${process.env.PUBLIC_URL}/LiquidacionArbitrios2025.pdf`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `LA_${codigo}.pdf`);
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
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
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

          {/* Botones institucionales */}
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
          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  flexDirection: "column",
                  py: 2,
                  color: "white",
                  bgcolor: item.active ? "rgba(255,255,255,0.1)" : "transparent",
                  borderLeft: item.active ? "3px solid #40e0d0" : "3px solid transparent",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
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
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px`, mt: "64px", p: 4 }}>
        {/* ✅ ENCABEZADO DE ÉXITO */}
        <Fade in timeout={700}>
          <Slide direction="down" in timeout={800}>
            <Box
              sx={{
                textAlign: "center",
                mb: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: "#e6f4ea",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: "#2e7d32", fontSize: 40 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#2e7d32", mt: 1 }}>
                Declaración Jurada registrada con éxito
              </Typography>
              <Typography variant="body1" sx={{ color: "#333", mt: 1 }}>
                A continuación, revisa el resumen de tus predios y los montos calculados.
              </Typography>
            </Box>
          </Slide>
        </Fade>

        {/* 🏠 PREDIOS DEL CONTRIBUYENTE */}
        <Fade in timeout={1000}>
          <Paper elevation={2} sx={{ mx: "auto", width: "90%", p: 3, borderRadius: 2, mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#1e5ba8",
                mb: 2,
                fontWeight: 600,
                borderBottom: "2px solid #e0e0e0",
                pb: 1,
              }}
            >
              🏠 Predios del Contribuyente
            </Typography>

            <Table
              sx={{
                border: "1px solid #dcdcdc",
                "& th": {
                  backgroundColor: "#e8f1fb",
                  color: "#003366",
                  fontWeight: 600,
                  textAlign: "center",
                },
                "& td": {
                  fontSize: "0.85rem",
                  textAlign: "center",
                  borderBottom: "1px solid #eee",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Código DJ</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Uso</TableCell>
                  <TableCell>Condición</TableCell>
                  <TableCell>Descargar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predios.map((p, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      backgroundColor: p.condicion === "Predio existente" ? "#f3faff" : "#f4fbf6",
                      "&:hover": { backgroundColor: "#edf6ff" },
                    }}
                  >
                    <TableCell>{p.codigoDJ}</TableCell>
                    <TableCell>{p.direccion}</TableCell>
                    <TableCell>{p.uso}</TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          p.condicion === "Predio nuevo"
                            ? "Nuevo inmueble declarado"
                            : "Ya registrado en años anteriores"
                        }
                      >
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.4,
                            py: 0.4,
                            borderRadius: "12px",
                            backgroundColor:
                              p.condicion === "Predio existente" ? "#b3e0ff" : "#a7e8c2",
                            color:
                              p.condicion === "Predio existente" ? "#004a7c" : "#0c5e32",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        >
                          {p.condicion}
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {p.descargable ? (
                        <Button
                          variant="outlined"
                          startIcon={<PictureAsPdfIcon />}
                          sx={{
                            textTransform: "none",
                            fontSize: "0.75rem",
                            borderColor: "#1e5ba8",
                          }}
                          onClick={() => handleDescargarPDF(p.codigoDJ)}
                        >
                          Visualizar DJ
                        </Button>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No aplica
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Fade>

        {/* 💰 LIQUIDACIÓN DEL IMPUESTO PREDIAL */}
        <Fade in timeout={1300}>
          <Paper elevation={2} sx={{ mx: "auto", width: "90%", mt: 5, p: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#1e5ba8",
                mb: 2,
                fontWeight: 600,
                borderBottom: "2px solid #e0e0e0",
                pb: 1,
              }}
            >
              💰 Liquidación del Impuesto Predial
            </Typography>

            <Table
              sx={{
                border: "1px solid #e0e0e0",
                "& th": {
                  backgroundColor: "#e8f1fb",
                  color: "#003366",
                  fontWeight: 600,
                  textAlign: "center",
                },
                "& td": {
                  textAlign: "center",
                  fontSize: "0.85rem",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Total Predios</TableCell>
                  <TableCell>Predios Afectos</TableCell>
                  <TableCell>Base Imponible (S/)</TableCell>
                  <TableCell>Base Afecta (S/)</TableCell>
                  <TableCell>Tramo</TableCell>
                  <TableCell>%</TableCell>
                  <TableCell>Monto (S/)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{predios.length}</TableCell>
                  <TableCell>{predios.length}</TableCell>
                  <TableCell>407,071.50</TableCell>
                  <TableCell>407,071.50</TableCell>
                  <TableCell>Hasta 15 UIT</TableCell>
                  <TableCell>0.2%</TableCell>
                  <TableCell>160.50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}></TableCell>
                  <TableCell>15–60 UIT</TableCell>
                  <TableCell>0.6%</TableCell>
                  <TableCell>1,444.50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}></TableCell>
                  <TableCell>Más de 60 UIT</TableCell>
                  <TableCell>1.0%</TableCell>
                  <TableCell>860.72</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#e8f1fb" }}>
                  <TableCell colSpan={6} align="right" sx={{ fontWeight: 700 }}>
                    IMPUESTO ANUAL TOTAL (S/)
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>2,465.72</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Tooltip title="Valor oficial de referencia anual">
                <Typography sx={{ fontSize: "0.9rem" }}>
                  <InfoIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                  UIT 2025: <strong>S/ 5,350</strong>
                </Typography>
              </Tooltip>

              <Button
                variant="contained"
                color="success"
                startIcon={<PictureAsPdfIcon />}
                sx={{ textTransform: "none", fontWeight: 600 }}
               onClick={() => handleDescargarLiqPredial("10001")}
              >
                Liquidación Predial
              </Button>
            </Box>
          </Paper>
        </Fade>

{/* 🧾 MONTOS A PAGAR A LA FECHA DE EMISIÓN */}
<Paper
  elevation={2}
  sx={{
    mx: "auto",
    width: "90%",
    mt: 5,
    p: 3,
    borderRadius: 2,
    overflowX: "auto",
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: "#1e5ba8",
      mb: 2,
      fontWeight: 600,
      borderBottom: "2px solid #e0e0e0",
      pb: 1,
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    📄 Montos a Pagar a la Fecha de Emisión de Impuesto Predial
  </Typography>

  <Table
    sx={{
      border: "1px solid #e0e0e0",
      "& th": {
        backgroundColor: "#e8f1fb",
        color: "#003366",
        fontWeight: 600,
        fontSize: "0.85rem",
        py: 0.7,
        px: 1.2,
        textAlign: "center",
      },
      "& td": {
        fontSize: "0.85rem",
        py: 0.6,
        px: 1.2,
        borderBottom: "1px solid #eaeaea",
        textAlign: "center",
      },
      "& tr:hover": { backgroundColor: "#f9fcff" },
    }}
  >
    <TableHead>
      <TableRow>
        <TableCell>Cuota</TableCell>
        <TableCell>Fecha de Vencimiento</TableCell>
        <TableCell>Monto Insoluto Trimestral (S/)</TableCell>
        <TableCell>Derecho de Emisión (S/)</TableCell>
        <TableCell>Cuota Trimestral (S/)</TableCell>
        <TableCell>Código de Pago</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {[
        { cuota: "1ra", fecha: "28/02/2025", insoluto: "616.43", derecho: "2.30", total: "618.73", codigo: "12500316216" },
        { cuota: "2da", fecha: "30/05/2025", insoluto: "616.43", derecho: "0.00", total: "616.43", codigo: "12501381459" },
        { cuota: "3ra", fecha: "29/08/2025", insoluto: "616.43", derecho: "0.00", total: "616.43", codigo: "12502395571" },
        { cuota: "4ta", fecha: "28/11/2025", insoluto: "616.43", derecho: "0.00", total: "616.43", codigo: "12503409692" },
      ].map((fila, i) => (
        <TableRow key={i}>
          <TableCell>{fila.cuota}</TableCell>
          <TableCell>{fila.fecha}</TableCell>
          <TableCell align="right">{fila.insoluto}</TableCell>
          <TableCell align="right">{fila.derecho}</TableCell>
          <TableCell align="right">{fila.total}</TableCell>
          <TableCell>{fila.codigo}</TableCell>
        </TableRow>
      ))}

      <TableRow sx={{ backgroundColor: "#f0f6ff" }}>
        <TableCell colSpan={4}></TableCell>
        <TableCell align="right" sx={{ fontWeight: "bold" }}>
          TOTAL ANUAL
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: "bold" }}>
          2,468.02
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Paper>


{/* 🧹 DETERMINACIÓN MENSUAL DE ARBITRIOS */}
<Paper
  elevation={2}
  sx={{
    mx: "auto",
    width: "90%",
    mt: 5,
    p: 3,
    borderRadius: 2,
    overflowX: "auto",
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: "#1e5ba8",
      mb: 2,
      fontWeight: 600,
      borderBottom: "2px solid #e0e0e0",
      pb: 1,
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    🧹 Determinación Mensual de Arbitrios 2025 (S/)
  </Typography>

  <Table
    sx={{
      border: "1px solid #dcdcdc",
      tableLayout: "fixed",
      "& th": {
        backgroundColor: "#e8f1fb",
        color: "#003366",
        fontWeight: 600,
        fontSize: "0.85rem",
        py: 0.8,
        px: 1,
        whiteSpace: "normal",
        wordWrap: "break-word",
        lineHeight: 1.2,
        verticalAlign: "middle",
      },
      "& td": {
        fontSize: "0.85rem",
        py: 0.6,
        px: 1,
        borderBottom: "1px solid #eaeaea",
        verticalAlign: "middle",
      },
      "& tr:hover": {
        backgroundColor: "#f9fcff",
      },
    }}
  >
    <colgroup>
      <col style={{ width: "8%" }} />
      <col style={{ width: "17%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "11%" }} />
      <col style={{ width: "11%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "15%" }} />
    </colgroup>

    <TableHead>
      <TableRow>
        <TableCell align="center">Código DJ</TableCell>
        <TableCell align="left">Dirección</TableCell>
        <TableCell align="center">Uso</TableCell>
        <TableCell align="center">
          Barrido<br />de Calles<br />(a)
        </TableCell>
        <TableCell align="center">
          Recolección<br />de Residuos<br />Sólidos (b)
        </TableCell>
        <TableCell align="center">
          Mantenimiento<br />de Parques<br />y Jardines (c)
        </TableCell>
        <TableCell align="center">Serenazgo<br />(d)</TableCell>
        <TableCell align="center">
          Tasa Mensual<br />(e = a + b + c + d)
        </TableCell>
        <TableCell align="center">Descargar</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {predios.map((p, i) => (
        <TableRow
          key={i}
          sx={{
            backgroundColor:
              p.condicion === "Predio existente" ? "#e9f5ff" : "#eafaf1",
            "&:hover": {
              backgroundColor:
                p.condicion === "Predio existente"
                  ? "#d8efff"
                  : "#d3f5e3",
            },
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          <TableCell align="center">{p.codigoDJ}</TableCell>
          <TableCell align="left">{p.direccion}</TableCell>
          <TableCell align="center">{p.uso}</TableCell>

          {/* Valores de arbitrios */}
          <TableCell align="center">95.88</TableCell>
          <TableCell align="center">135.56</TableCell>
          <TableCell align="center">11.23</TableCell>
          <TableCell align="center">12.45</TableCell>
          <TableCell align="center">255.12</TableCell>

          <TableCell align="center">
            {p.descargable ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<PictureAsPdfIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  backgroundColor: "#2e7d32",
                  "&:hover": { backgroundColor: "#256528" },
                }}
                onClick={() => handleDescargarLiqArb("10001")}
              >
                Liquidación Arbitrios
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No aplica
              </Typography>
            )}
          </TableCell>
        </TableRow>
      ))}
        {/* Fila total general */}
        <TableRow
        sx={{
            backgroundColor: "#f0f6ff",
            "& td": { fontWeight: "bold", py: 0.5 },
        }}
        >
        <TableCell colSpan={6}></TableCell>
        <TableCell align="center">TOTAL MENSUAL GENERAL (S/)</TableCell>
        <TableCell align="center">510.24</TableCell>
        <TableCell></TableCell>
        </TableRow>
    </TableBody>
  </Table>
</Paper>



{/* 💳 BLOQUE FINAL DE PAGO Y ACCIÓN PRINCIPAL */}
<Box
  sx={{
    mt: 6,
    mb: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: "#1e5ba8",
      fontWeight: 700,
      mb: 1,
    }}
  >
    💳 ¡Paga tus tributos de forma fácil, segura y desde cualquier lugar!
  </Typography>

  <Typography
    variant="body1"
    sx={{
      color: "#444",
      maxWidth: 700,
      lineHeight: 1.6,
      mb: 2,
    }}
  >
    El SAT Lima pone a tu disposición diversas opciones digitales para realizar tus pagos al instante: 
    tarjetas, billeteras móviles y bancos afiliados. Evita colas y mantente al día con tus obligaciones tributarias.
  </Typography>

  {/* Imagen de medios de pago */}
  <Box
    component="img"
    src={formapago}
    alt="Formas de pago disponibles SAT Lima"
    sx={{
      width: "90%",
      maxWidth: 950,
      borderRadius: 2,
      boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
      p: 1,
      bgcolor: "#fff",
    }}
  />

  {/* BOTONES DE ACCIÓN */}
  <Box
    sx={{
      mt: 4,
      display: "flex",
      justifyContent: "center",
      gap: 3,
      flexWrap: "wrap",
    }}
  >
    {/* Botón principal - Pasarela de pagos */}
    <Button
      variant="contained"
      color="success"
      startIcon={<CreditCardIcon />}
      sx={{
        px: 5,
        py: 1.4,
        fontWeight: 700,
        fontSize: "1rem",
        backgroundColor: "#2e7d32",
        "&:hover": { backgroundColor: "#256528" },
        boxShadow: "0 4px 10px rgba(46,125,50,0.3)",
      }}
      onClick={() =>
        setSnackbar({
          open: true,
          message: "💳 Redirigiendo a la pasarela de pagos...",
          type: "info",
        })
      }
    >
      Ir a la Pasarela de Pagos
    </Button>

    {/* Botón secundario - Menú principal */}
    <Button
      variant="contained"
      startIcon={<HomeIcon />}
      sx={{
        px: 5,
        py: 1.4,
        fontWeight: 700,
        fontSize: "1rem",
        backgroundColor: "#1e5ba8",
        "&:hover": { backgroundColor: "#17467f" },
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
      onClick={() =>
        navigate("/dashboard", { state: { nuevosPredios: totalDeclarados } })
      }
    >
      Ir al Menú Principal
    </Button>
  </Box>

  {/* 🧩 Mensaje institucional mejorado */}
  <Typography
    variant="body2"
    sx={{
      mt: 5,
      textAlign: "center",
      color: "#004a7c",
      fontSize: "0.95rem",
      lineHeight: 1.7,
      maxWidth: 800,
      px: 2,
    }}
  >
    También puedes pagar desde nuestro{" "}
    <strong>Aplicativo Móvil SAT Lima – Pago de Servicios</strong>.<br />
    Tu declaración jurada ha sido registrada exitosamente. 
    <strong> ¡Mantén tus tributos al día y contribuye con el desarrollo de tu ciudad!</strong>
  </Typography>
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
        }}
      >
        <Typography variant="caption" sx={{ color: "#666", ml: 2 }}>
          Copyright © 2025 SAT Lima — Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ color: "#666", mr: 2 }}>
          Versión 1.0.0
        </Typography>
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.type}
          sx={{ width: "100%", fontSize: "0.9rem" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResumenPredios;