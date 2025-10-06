// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
  Card,
  CardContent,
  Modal,
  TextField,
  MenuItem,
  CircularProgress,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';

import Grid from '@mui/material/Grid';

import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon,
  HelpOutline as HelpOutlineIcon,
  ExitToApp as ExitToAppIcon,
  Schedule as ScheduleIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  NotificationsNone as NotificationsIcon,
  Language as LanguageIcon,
  ArrowDropDown as ArrowDropDownIcon,
  EditNote as EditNoteIcon
} from '@mui/icons-material';


/* ======================
   COMPONENTE INFOBUTTON (BOTONES INTERACTIVOS)
====================== */
interface InfoButtonProps {
  title: string;
  color: string;
  content: React.ReactNode;
}


const InfoButton: React.FC<InfoButtonProps> = ({ title, color, content }) => {
  const [open, setOpen] = useState(false);

  return (
    // @ts-ignore
    <Grid item xs={12} sm={6} md={4}>
      <Box
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sx={{
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            backgroundColor: color,
            color: 'white',
            borderRadius: '10px',
            p: 3,
            minWidth: '280px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.03)' },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>

        {open && (
          <Box
            sx={{
              position: 'absolute',
              top: '110%',
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'white',
              color: '#333',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              p: 2,
              minWidth: '320px',
              textAlign: 'left',
              zIndex: 100,
            }}
          >
            {content}
          </Box>
        )}
      </Box>
    </Grid>
  );
};



const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


interface Props {
  onLogout?: () => void;
}
/* ======================
   COMPONENTE PRINCIPAL
====================== */
const InscripcionDJ: React.FC<Props> = ({onLogout}) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 80;

  const sidebarItems = [
    { icon: <HomeIcon />, label: 'Inicio', active: true },
    { icon: <AssignmentIcon />, label: 'Trámites', active: false },
    { icon: <DescriptionIcon />, label: 'Consultas', active: false },
    { icon: <AccountCircleIcon />, label: 'Mi Perfil', active: false },
    { icon: <HelpOutlineIcon />, label: 'Ayuda', active: false },
  ];

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numPredios, setNumPredios] = useState<number | "">("");
  const [tipoPersona, setTipoPersona] = useState("");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleAceptar = () => {
    if (!numPredios || !tipoPersona) return alert("Completa todos los campos.");

    setLoading(true);

    // Simula 3 segundos de "Preparando..."
    setTimeout(() => {
      setLoading(false);
      setOpenModal(false);

      // 🔹 Envía datos a RegistrarDJ
      navigate("/registrar-dj", {
        state: {
          numPredios,
          tipoPersona,
        },
      });
    }, 3000);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* ======= APPBAR ======= */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#1e5ba8',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ minHeight: '64px!important' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem', mr: 3 }}>
            SAT
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              11/06/2024 02:57 p.m.
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small" sx={{ color: 'white' }} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <Button
              startIcon={<LanguageIcon />}
              sx={{ color: 'white', textTransform: 'none', fontSize: '0.875rem' }}
            >
              Mejora la visualización de esta página
            </Button>

            <Button
              startIcon={<HelpOutlineIcon />}
              sx={{ color: 'white', textTransform: 'none', fontSize: '0.875rem' }}
            >
              Guía de usuario
            </Button>

            <Button
              startIcon={<NotificationsIcon />}
              sx={{ color: 'white', textTransform: 'none', fontSize: '0.875rem' }}
            >
              Alertas y notificaciones
            </Button>

            <Button
              endIcon={<ArrowDropDownIcon />}
              sx={{ color: 'white', textTransform: 'none', fontSize: '0.875rem' }}
            >
              Usuario: Victor Gonzales
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ======= SIDEBAR ======= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#003d7a',
            border: 'none',
            mt: '64px',
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <List sx={{ p: 0 }}>
          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  flexDirection: 'column',
                  py: 2,
                  color: 'white',
                  bgcolor: item.active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderLeft: item.active ? '3px solid #40e0d0' : '3px solid transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'white', mb: 0.5 }}>
                  {item.icon}
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', textAlign: 'center' }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mb: 2 }}>
          <ListItemButton
          onClick={onLogout} // 👈 acá cerrará sesión
            sx={{
              flexDirection: 'column',
              py: 2,
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            <ExitToAppIcon sx={{ mb: 0.5 }} />
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
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
          mt: '64px',
          p: 4,
          bgcolor: '#f5f7fa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#003366', mb: 3 }}>
          Antes de iniciar el registro de tu Declaración Jurada de Impuesto Predial, ten en cuenta lo
          siguiente:
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          <InfoButton
            title="¿Qué puedes declarar?"
            color="#1e88e5"
            content={
              <ul style={{ textAlign: 'left', margin: 0, paddingLeft: '1.2rem' }}>
                <li>Compra</li>
                <li>Sucesión Anticipo de Legítima</li>
                <li>Adjudicación Fideicomiso Mutuo</li>
                <li>Prescripción Adquisitiva</li>
                <li>Donación</li>
                <li>Aumento de Capital</li>
                <li>Cesión de Derechos y Acciones</li>
                <li>Posesión</li>
              </ul>
            }
          />
          <InfoButton
            title="¿Qué documentos debes tener a mano?"
            color="#0d47a1"
            content={
              <ul style={{ textAlign: 'left', margin: 0, paddingLeft: '1.2rem' }}>
                <li>DNI o RUC del propietario</li>
                <li>Documento que sustente la adquisición</li>
                <li>Autovalúo del año anterior</li>
                <li>Constancia de pago de alcabala (si aplica)</li>
              </ul>
            }
          />
          <InfoButton
            title="¿Cuándo puedes registrarla?"
            color="#ffb300"
            content={
              <ul style={{ textAlign: 'left', margin: 0, paddingLeft: '1.2rem' }}>
                <li>Dentro de los 30 días hábiles siguientes a la adquisición</li>
                <li>Durante el año fiscal vigente</li>
              </ul>
            }
          />
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', width: '100%' }}>
          <img
            src={require('../assets/tributito2.png')}
            alt="Tributito"
            style={{ height: '260px', marginLeft: '40px' }}
          />
        </Box>

        <Box
          sx={{
            mt: 2,
            bgcolor: '#e8f0fe',
            borderRadius: '8px',
            p: 1.5,
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#003366' }}>
            ℹ️ Recuerda que la confirmación de tu registro y cualquier notificación relacionada a tu
            trámite se te enviará al correo electrónico que tienes registrado en la Agencia Virtual y
            tu Casilla Electrónica.
          </Typography>
        </Box>


          {/* Botones inferiores */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/dashboard")}
        >
          Volver a menú principal
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Iniciar Proceso de Declaración Jurada
        </Button>
      </Box>

      {/* Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={modalStyle}>
          {!loading ? (
            <>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#003366", fontWeight: 600 }}
              >
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
                <Button
                  variant="contained"
                  onClick={handleAceptar}
                  disabled={!numPredios || !tipoPersona}
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
              <Typography
                variant="body1"
                sx={{ mt: 2, color: "#003366", fontWeight: 500 }}
              >
                Preparando el registro de la Declaración Jurada...
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>




      </Box>

      {/* ======= FOOTER ======= */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: drawerWidth,
          right: 0,
          bgcolor: 'white',
          borderTop: '1px solid #e0e0e0',
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <Typography variant="caption" sx={{ color: '#666', ml: 2 }}>
          Copyright © 2025 SAT Lima — Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ color: '#666', mr: 2 }}>
          Versión 1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default InscripcionDJ;