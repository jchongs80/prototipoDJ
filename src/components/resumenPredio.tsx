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
  Divider,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
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
  const totalDeclarados = state?.totalDeclarados || 2;
  const drawerWidth = 80;

  const sidebarItems = [
    { icon: <HomeIcon />, label: "Inicio", active: true },
    { icon: <AssignmentIcon />, label: "Trámites", active: false },
    { icon: <DescriptionIcon />, label: "Consultas", active: false },
    { icon: <AccountCircleIcon />, label: "Mi Perfil", active: false },
    { icon: <HelpOutlineIcon />, label: "Ayuda", active: false },
  ];

  // 🏠 Predios
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
    const fileURL = `${process.env.PUBLIC_URL}/DJ_${codigo}.pdf`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `DJ_${codigo}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* ===== HEADER ===== */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#1e5ba8" }}>
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
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px`, mt: "64px", p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#003366", mb: 3, textAlign: "center" }}
        >
          Resumen de Predios Declarados
        </Typography>

        {/* 🏠 TABLA DE PREDIOS DEL CONTRIBUYENTE */}
<Paper
  elevation={2}
  sx={{
    mx: "auto",
    width: "90%",
    p: 3,
    borderRadius: 2,
    mt: 3,
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
        fontSize: "0.9rem",
        py: 0.6,
      },
      "& td": {
        fontSize: "0.85rem",
        py: 0.5,
        px: 1.2,
        borderBottom: "1px solid #eaeaea",
      },
    }}
  >
    <TableHead>
      <TableRow>
        <TableCell>Código DJ</TableCell>
        <TableCell>Dirección</TableCell>
        <TableCell>Uso</TableCell>
        <TableCell>Condición</TableCell>
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
          <TableCell>{p.codigoDJ}</TableCell>
          <TableCell>{p.direccion}</TableCell>
          <TableCell>{p.uso}</TableCell>
          <TableCell>
            <Box
              sx={{
                display: "inline-block",
                px: 1.2,
                py: 0.3,
                borderRadius: "12px",
                backgroundColor:
                  p.condicion === "Predio existente" ? "#b3e0ff" : "#a7e8c2",
                color:
                  p.condicion === "Predio existente"
                    ? "#004a7c"
                    : "#0c5e32",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              {p.condicion}
            </Box>
          </TableCell>
          <TableCell align="center">
            {p.descargable ? (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<PictureAsPdfIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  borderColor: "#1e5ba8",
                  "&:hover": {
                    backgroundColor: "#eaf1fb",
                    borderColor: "#003366",
                  },
                }}
                onClick={() => handleDescargarPDF(p.codigoDJ)}
              >
                DJ
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

{/* 💰 LIQUIDACIÓN DEL IMPUESTO PREDIAL */}
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
    💰 Liquidación del Impuesto Predial
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
        verticalAlign: "middle",
      },
      "& tr:hover": { backgroundColor: "#f9fcff" },
    }}
  >
    <TableHead>
      <TableRow>
        <TableCell>TOTAL DE PREDIOS</TableCell>
        <TableCell>PREDIOS AFECTOS</TableCell>
        <TableCell>BASE IMP. (S/)</TableCell>
        <TableCell>BASE IMP. AFECTA (S/)</TableCell>
        <TableCell>CANTIDAD DE UIT POR TRAMO</TableCell>
        <TableCell>BASE IMPONIBLE POR TRAMOS (a)</TableCell>
        <TableCell>PORCENTAJE POR TRAMO (b)</TableCell>
        <TableCell>MONTO POR TRAMO (a × b)</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      <TableRow>
        <TableCell align="center">{predios.length}</TableCell>
        <TableCell align="center">{predios.length}</TableCell>
        <TableCell align="right">407,071.50</TableCell>
        <TableCell align="right">407,071.50</TableCell>
        <TableCell align="center">Hasta 15</TableCell>
        <TableCell align="right">80,250.00</TableCell>
        <TableCell align="center">0.2%</TableCell>
        <TableCell align="right">160.50</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell align="center">Más de 15 a 60</TableCell>
        <TableCell align="right">240,750.00</TableCell>
        <TableCell align="center">0.6%</TableCell>
        <TableCell align="right">1,444.50</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell align="center">Más de 60</TableCell>
        <TableCell align="right">86,071.50</TableCell>
        <TableCell align="center">1.0%</TableCell>
        <TableCell align="right">860.72</TableCell>
      </TableRow>

      <TableRow sx={{ backgroundColor: "#f0f6ff" }}>
        <TableCell colSpan={7} align="right" sx={{ fontWeight: "bold" }}>
          IMPUESTO ANUAL (S/)
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: "bold" }}>
          2,465.72
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mt: 2,
      px: 1,
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
      Unidad Impositiva Tributaria (UIT) para el 2025:{" "}
      <strong>S/ 5,350</strong>
    </Typography>

    <Typography
      sx={{
        fontSize: "0.95rem",
        fontWeight: "bold",
        color: "#003366",
      }}
    >
      IMPUESTO ANUAL TOTAL: S/ 2,465.72
    </Typography>
  </Box>

  {/* 🔽 Botón para descargar Liquidación Predial */}
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    mt: 2,
    pr: 1,
  }}
>
  <Button
    variant="contained"
    color="success"
    startIcon={<PictureAsPdfIcon />}
    sx={{
      textTransform: "none",
      fontWeight: 600,
      backgroundColor: "#2e7d32",
      "&:hover": { backgroundColor: "#256528" },
    }}
    onClick={() => alert("Descargando hoja de Liquidación del Impuesto Predial...")}
  >
    Descargar Liquidación Predial
  </Button>
</Box>


</Paper>

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
    📄 Montos a Pagar a la Fecha de Emisión
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
      <col style={{ width: "22%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "11%" }} />
      <col style={{ width: "11%" }} />
      <col style={{ width: "9%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} />
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
                onClick={() =>
                  alert(`Descargando arbitrios del predio ${p.codigoDJ}`)
                }
              >
                Liquidación
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



{/* 🔹 BOTONES DE ACCIÓN */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 2,
    mt: 4,
  }}
>
  <Button
    variant="contained"
    color="success"
    sx={{
      px: 4,
      py: 1.2,
      fontWeight: 600,
      backgroundColor: "#2e7d32",
      "&:hover": { backgroundColor: "#256528" },
    }}
    onClick={() => navigate("/dashboard")}
  >
    IR AL MENÚ PRINCIPAL
  </Button>

  <Button
    variant="contained"
    startIcon={<CreditCardIcon />}
    sx={{
      px: 4,
      py: 1.2,
      fontWeight: 600,
      backgroundColor: "#1e5ba8",
      "&:hover": { backgroundColor: "#174a8a" },
    }}
    onClick={() => alert("Redirigiendo a la pasarela de pagos...")}
  >
    REALIZAR PAGO
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