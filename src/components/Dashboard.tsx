// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
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
  Button,
  Container,
  Chip,
  Link,
  Divider,
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

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void; // ✅ nuevo
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, onClick, }) => {
 
  return (
    <Card 
      onClick={onClick}
      sx={{
        width: 380,                 // 🔹 ancho fijo (ajustable)
        height: 120,                // 🔹 altura uniforme
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s",
        border: "1px solid #e0e0e0",
        cursor: 'pointer',
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1e5ba8',
                fontWeight: 600,
                fontSize: '1.5rem',
                mb: 0.5
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666',
                fontSize: '0.875rem',
                lineHeight: 1.4
              }}
            >
              {description}
            </Typography>
          </Box>
          <EditNoteIcon sx={{ color: '#1e5ba8', fontSize: '2rem', ml: 2 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

interface Props {
  onLogout?: () => void;
}

const Dashboard: React.FC<Props> = ({onLogout}) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 80;

  const location = useLocation();
  const navigate = useNavigate();

  const nuevosPredios = location.state?.nuevosPredios || 0;

  // 🕒 Estado para fecha y hora
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
    { icon: <HomeIcon />, label: 'Inicio', active: true },
    { icon: <AssignmentIcon />, label: 'Trámites', active: false },
    { icon: <DescriptionIcon />, label: 'Consultas', active: false },
    { icon: <AccountCircleIcon />, label: 'Mi Perfil', active: false },
    { icon: <HelpOutlineIcon />, label: 'Ayuda', active: false }
  ];

  const services = [
    {
      title: 'Inscripción vehicular',
      description: 'Declarar la adquisición de tu vehículo nuevo'
    },
    {
      title: 'Inscripción predial',
      description: 'Registra tu declaración jurada de impuesto predial'
    },
    {
      title: 'Liquidación de alcabala',
      description: 'Solicita la liquidación de tu impuesto de alcabala'
    },
    {
      title: 'Facilidades de pago',
      description: 'Solicita facilidades de pago'
    },
    {
      title: 'Consulta de pagos y deudas',
      description: 'Consulta tu cuadernillo de pago y deudas pendientes'
    },
    {
      title: 'Reserva de citas',
      description: 'Reserva citas para tu atención en nuestra plataforma presencial'
    },
    {
      title: 'Constancia de no adeudo',
      description: 'Solicita tu constancia de no adeudo tributaria'
    },
    {
      title: 'Prescripción de papeletas',
      description: 'Solicita la prescripción de papeletas'
    },
    {
      title: 'Consulta estado de trámites y solicitudes',
      description: ''
    }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#1e5ba8',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar sx={{ minHeight: '64px!important' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.5rem',
              mr: 3
            }}
          >
            SAT
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem', textTransform: "capitalize"  }}>
             {formattedDateTime}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              size="small" 
              sx={{ color: 'white' }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <Button
              startIcon={<LanguageIcon />}
              sx={{ 
                color: 'white',
                textTransform: 'none',
                fontSize: '0.875rem'
              }}
            >
              Mejora la visualización de esta página
            </Button>

            <Button
              startIcon={<HelpOutlineIcon />}
              sx={{ 
                color: 'white',
                textTransform: 'none',
                fontSize: '0.875rem'
              }}
            >
              Guía de usuario
            </Button>

            <Button
              startIcon={<NotificationsIcon />}
              sx={{ 
                color: 'white',
                textTransform: 'none',
                fontSize: '0.875rem'
              }}
            >
              Alertas y notificaciones
            </Button>

            <Button
              endIcon={<ArrowDropDownIcon />}
              sx={{ 
                color: 'white',
                textTransform: 'none',
                fontSize: '0.875rem'
              }}
            >
              Usuario: Victor Gonzales
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 'auto',
                  color: 'white',
                  mb: 0.5
                }}>
                  {item.icon}
                </ListItemIcon>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: '0.65rem',
                    textAlign: 'center'
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        {/* Logout button at bottom */}
        <Box sx={{ mb: 2 }}>
          <ListItemButton
          onClick={onLogout} // 👈 acá cerrará sesión
            sx={{
              flexDirection: 'column',
              py: 2,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            <ExitToAppIcon sx={{ mb: 0.5 }} />
            <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
              Salir
            </Typography>
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: '64px',
          p: 4,
          bgcolor: '#f5f7fa'
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#333',
              mb: 1
            }}
          >
            Hola VICTOR, <Typography 
              component="span" 
              variant="h4"
              sx={{ fontWeight: 400 }}
            >
              realiza trámites y consulta el estado de tus solicitudes
            </Typography>
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Card sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: '#e8f4fd',
                  border: '1px solid #b3d9f2',
                  p: 2,
                  flexWrap: 'wrap',
                  mb: 3,
                }}>
              <CardContent sx={{ py: 1.5, px: 3 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Conoce qué trámites puedes realizar aquí
                </Typography>
              </CardContent>

              <Button 
              variant="contained"
              sx={{ 
                bgcolor: '#1e5ba8',
                textTransform: 'none',
                px: 3,
                py: 1.5,
                alignSelf: 'center',
                '&:hover': {
                  bgcolor: '#164a87'
                }
              }}
            >
              Ingresar a Mesa de Partes Virtual
            </Button>


            </Card>
            
            
          </Box>
          </Box>
          
          {/* Quick Actions */}
          {/*
          <Box sx={{ display: 'flex',  gap: 2, alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
            <Card sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: '#e8f4fd',
                  border: '1px solid #b3d9f2',
                  p: 2,
                  flexWrap: 'wrap',
                  mb: 3,
                }}>
              <CardContent sx={{ py: 1.5, px: 3 }}>
            <Typography sx={{ color: '#666' }}>
              Consulta tus notificaciones y resoluciones
            </Typography>
            </CardContent>
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                backgroundColor:'#fbfdfdff',
                borderColor: '#184a86ff',
                color: '#1e5ba8',
                '&:hover': {
                  borderColor: '#0f3d72ff',
                  bgcolor: 'rgba(30,91,168,0.05)'
                }
              }}
            >
              Ingresar a Casilla electrónica MTC
            </Button>
            
            </Card>
            <Link
              href="#"
              sx={{
                color: '#1e5ba8',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: '1rem' }} />
              ¿Qué es una casilla electrónica?
            </Link>
          </Box>
        */}

        {/* Services Section */}
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 600,
              color: '#333'
            }}
          >
            ¿Qué trámite deseas realizar?
          </Typography>

          <Grid container
            spacing={2}
            columns={{ xs: 12, sm: 12, md: 12 }}
            justifyContent="center"
            alignItems="stretch"
            sx={{
              maxWidth: 1200,         // 🔹 fija ancho máximo
              margin: "0 auto",       // 🔹 centra horizontalmente
              mt: 3,
            }}>
            {services.map((service, index) => (
              // @ts-ignore
              <Grid item xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                <ServiceCard 
                  title={service.title}
                  description={service.description}
                  onClick={() => {
                  if (service.title === "Inscripción predial") {
                    navigate("/inscripcion-predial",{ state: { nuevosPredios } });
                  }
                }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Footer info */}
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 1 }}>
            <HelpOutlineIcon sx={{ color: '#666', fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              Si tienes alguna duda, puedes consultar nuestra{' '}
              <Link href="#" sx={{ color: '#1e5ba8', textDecoration: 'none' }}>
                Guía de usuario SAT
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
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
          zIndex: 1000
        }}
      >
        <Typography variant="caption" sx={{ color: '#666', ml: 2 }}>
          Copyright © 2020 SAT. Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ color: '#666', mr: 2 }}>
          Versión 1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;