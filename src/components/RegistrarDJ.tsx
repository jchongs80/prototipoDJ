// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
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
  Button,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Fade,
  TextField
} from '@mui/material';

import { Snackbar, Alert } from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";

// Dentro de imports
import { useNavigate } from "react-router-dom";

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
} from '@mui/icons-material';

import { useLocation } from "react-router-dom";

import tributito from './../assets/tributito.png';
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Paso1Contribuyente from './Paso1Contribuyente';
import Paso2Predio from "./Paso2Predio";
import Paso3Terreno from './Paso3Terreno';
import Paso4Construccion from './Paso4Construccion';
import Paso5Resumen from './Paso5Resumen';

interface Props {
  onLogout?: () => void;
}

/* ======================
   COMPONENTE PRINCIPAL
====================== */
const RegistrarDJ: React.FC<Props> = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 80;

const [validarPaso2, setValidarPaso2] = useState<(() => boolean) | null>(null);
  


  const location = useLocation();
  const navigate = useNavigate();

  const { numPredios, tipoPersona, predioDeclarados: declaradosDesdeRuta = 0, tipoDocConyuge,
  nroDocConyuge,
  apellidosConyuge, fechaNacimientoConyuge} = location.state || {};

// ✅ Cargar desde sessionStorage o desde la ruta
const [prediosDeclarados, setPrediosDeclarados] = useState<number>(() => {
  const guardado = sessionStorage.getItem("prediosDeclarados");
  if (guardado) return parseInt(guardado);
  return declaradosDesdeRuta ?? 0;
});

// ✅ Sincronizar cuando venga algo nuevo por ruta
useEffect(() => {
  if (typeof declaradosDesdeRuta === "number" && declaradosDesdeRuta > prediosDeclarados) {
    setPrediosDeclarados(declaradosDesdeRuta);
    sessionStorage.setItem("prediosDeclarados", declaradosDesdeRuta.toString());
  }
}, [declaradosDesdeRuta]);
  

  const sidebarItems = [
    { icon: <HomeIcon />, label: 'Inicio', active: true },
    { icon: <AssignmentIcon />, label: 'Trámites', active: false },
    { icon: <DescriptionIcon />, label: 'Consultas', active: false },
    { icon: <AccountCircleIcon />, label: 'Mi Perfil', active: false },
    { icon: <HelpOutlineIcon />, label: 'Ayuda', active: false },
  ];


  const [activeStep, setActiveStep] = useState(0);


  // Cambia los mensajes cuando cambia el paso activo
useEffect(() => {
  const paso = mensajesPorPaso[activeStep];

  if (!paso) return; // seguridad

  // 👇 Construimos los mensajes dinámicamente
  const nuevosMensajes: string[] = [];

  if (paso.intro) {
    nuevosMensajes.push(paso.intro);
  }

  if (paso.descripcion) {
    nuevosMensajes.push(`🤖 Tributito: ${paso.descripcion}`);
  }

  setMessages(nuevosMensajes);
}, [activeStep]);




  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState<string[]>([
    "👋 ¡Hola! Soy Tributito, tu asistente virtual. Te guiaré en el proceso de tu Declaración Jurada.",
  ]);
  const [inputValue, setInputValue] = useState("");

  const steps = [
    "Datos del Contribuyente",
    "Datos del Predio",
    "Valor del Terreno",
    "Construcción y Obras Complementarias",
    "Resumen",
  ];

  const handleNext = () => {
  // 🔸 Validación del Paso 1 (Datos del Contribuyente)
  if (activeStep === 0) {
    // Si es sociedad conyugal
    if (tipoPersona === "Sociedad Conyugal") {
      if (!formData.tipoDocConyuge || !formData.nroDocConyuge.trim()) {
        setMensajeSnackbar("⚠️ Complete los datos del cónyuge antes de continuar.");
        setOpenSnackbar(true);
        return;
      }
    }

    let valid = true;

    // Validar PDF de recibo de servicio
    if (!formData.reciboServicio) {
      setErrorReciboFile("Debe adjuntar el PDF de un recibo de servicio (agua o luz).");
      valid = false;
    } else {
      setErrorReciboFile("");
    }

    // Validar PDF de condición especial
    if (formData.tipoCondicion && formData.tipoCondicion !== "" && !formData.docCondicion) {
      setErrorCondicionFile("No ha seleccionado el archivo que acredite la condición especial.");
      valid = false;
    } else {
      setErrorCondicionFile("");
    }

    if (!valid) {
      setSeveritySnackbar("error");
      setMensajeSnackbar("⚠️ Corrige los errores antes de continuar.");
      setOpenSnackbar(true);
      return;
    }
  }

  // 🔸 Validación del Paso 2
  if (activeStep === 1 && (!formData.codigoPredio || formData.codigoPredio.trim() === "")) {
    setSeveritySnackbar("error");
  setMensajeSnackbar("⚠️ Debe seleccionar un predio antes de continuar.");
  setOpenSnackbar(true);
  return;
  }

  if (activeStep === 1) { // Paso 2 (recordando que paso 0 es el contribuyente)

      if (validarPaso2 && !validarPaso2()) {
    if (!formData.docAdquisicion) {
       setSeveritySnackbar("error");
      setMensajeSnackbar("⚠️ Debe adjuntar el documento PDF del tipo de transferencia");
      setOpenSnackbar(true);
    }
    return; // 🚫 Detiene el avance
  }
  
}

  // ✅ Si todo bien, avanzar
  setActiveStep((prev) => prev + 1);
setSeveritySnackbar("success");
setMensajeSnackbar("✅ Se guardaron los datos del paso anterior correctamente.");
setOpenSnackbar(true);
};



  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleGuardar = () =>
    alert("✅ Tu progreso ha sido guardado para continuar después.");
  
  const handleSendMessage = () => {
  if (!inputValue.trim()) return;

  // Mostrar mensaje del usuario
  setMessages((prev) => [...prev, `🧾 Tú: ${inputValue}`]);
  const currentStep = activeStep;

  // Limpiar input
  setInputValue("");

  // Mostrar respuesta automática
  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      `🤖 Tributito: ${respuestasDemo[currentStep] || "Gracias por tu mensaje. Estoy procesando tu consulta..."}`,
    ]);
  }, 1000);
};

  // 🕒 Estado para mostrar la fecha y hora en tiempo real
const [dateTime, setDateTime] = useState(new Date());

// Actualiza la hora cada segundo
React.useEffect(() => {
  const interval = setInterval(() => {
    setDateTime(new Date());
  }, 1000);
  return () => clearInterval(interval);
}, []);

// Formato de hora en español
const formattedDateTime = dateTime.toLocaleString("es-PE", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});



// Mensajes automáticos del asistente por paso
const mensajesPorPaso = [
  {
    intro: "👋 ¡Hola! Soy Tributito, tu asistente virtual. Te guiaré en el proceso de tu Declaración Jurada.",
    descripcion: "En este paso debes registrar tus datos personales y, si corresponde, los de tu cónyuge. Además, adjunta los documentos solicitados como el recibo de servicio y tu condición especial si aplica."
  },
  {
    descripcion: "Aquí registrarás la información de tu predio: su código, dirección, tipo de transferencia y documento de adquisición (PDF)."
  },
  {
    descripcion: "En este paso ingresa los valores y características del terreno: área, frontis y valor arancelario del predio."
  },
  {
    descripcion: "Registra las características de construcción y obras complementarias como pisos, materiales, y detalles de edificación."
  },
  {
    descripcion: "Aquí podrás revisar toda la información registrada antes de presentar tu Declaración Jurada."
  }
];


// Respuestas breves del bot (demo)
const respuestasDemo = [
  "😊 ¡Muy bien! Si necesitas ayuda con tus datos personales, revisa los campos obligatorios antes de avanzar.",
  "🏠 Recuerda adjuntar el documento de transferencia para continuar correctamente.",
  "📏 Asegúrate de ingresar correctamente el área y el valor arancelario del terreno.",
  "🔨 No olvides agregar al menos un piso o una obra complementaria si aplica.",
  "✅ Todo listo. Revisa tus datos y presenta la declaración."
];



const [errorCondicionFile, setErrorCondicionFile] = useState("");
const [errorReciboFile, setErrorReciboFile] = useState("");

const [openSnackbar, setOpenSnackbar] = useState(false);
const [severitySnackbar, setSeveritySnackbar] = useState<"success" | "error" | "warning" | "info">("info");
const [mensajeSnackbar, setMensajeSnackbar] = useState("");

const [formData, setFormData] = useState({
    // Paso 1
    tipoPersona: "Natural",
    tipoDocumento: "DNI/Libreta Electoral",
    nroDocumento: "12345678",
    apellidosNombres: "Juan Victor Pérez García",
    telefonoFijo: "0000000",
    celular: "000000000",
    correo: "victorhugo@gmail.com",
    fechaNacimiento: "1975-01-01",

    // Cónyuge
    tipoDocConyuge: tipoDocConyuge || "DNI/Libreta Electoral",
    nroDocConyuge: nroDocConyuge || "",
    apellidosConyuge: apellidosConyuge || "",
    telefonoReferencia: "",
    fechaNacimientoConyuge: fechaNacimientoConyuge || "",

    // Paso 2 – Condición especial
    tipoCondicion: "",
    docCondicion: "",

    // Paso 2 – Domicilio fiscal (detallado)
    distrito: "Cercado de Lima",
    tipoVia: "Jirón",
    descVia: "Camaná",
    numeroPuerta: "499",
    tipoDenomUrbana: "",
    descDenomUrbana: "",
    departamento: "701",
    oficina: "",
    interior: "",
    manzana: "",
    lote: "",
    seccion: "",
    zona: "",
    block: "",
    ucv: "",
    edificio: "",
    referencia: "",

    // Paso 2 – Dirección completa y recibo
    direccionCompleta: "Cercado de Lima, Jr. Camaná 499, Lima",
    reciboServicio: "",

    // Paso 3 – Predio
    codigoPredio: "",
    valorSoles: "",
    valorDolares: "",
    direccionCompletaPredio:"Cercado de Lima, Jr. Camaná 499, Lima",
    tipoViaPredio: "",
    descViaPredio: "",
    tipoDenomUrbPredio: "",
    descDenomUrbPredio: "",
    numMun1: "",
    numMun2: "",
    interiorPredio: "",
    tda: "",
    dpto: "",
    ofic: "",
    mza: "",
    lotePredio: "",
    piso: "",
    edificioPredio: "",
    letra: "",
    ingreso: "",
    subLote: "",
    etapa: "",
    referenciaPredio: "",
    docAdquisicion:"",
    partidaRegistral:"",
    tipoTransferencia:"Compra",
    condicionPropiedad:"Propietario único",
    porcentajePropiedad:"100",
    fechaAdquisicion:"2023-11-17",
    predioEdificio:"No",
    areaMatriz:"78",
    porcentajeBienComun:"0",
    frontis:"10",
    areaPropia:"78",
    areaComun:"0",
    areaTotal:"78",
    valorArancelario:"890.00",
    valorTotalTerreno:"69420.00",
    claseUso:"Residencial",
    subClaseUso:"Vivienda",
    uso:"Vivienda",
    fechaInicioUso:"2023-11-17"

  });





  // Estado para mostrar el bloque de dirección editable
const [mostrarDireccionDetallada, setMostrarDireccionDetallada] = useState(false);


// Manejo de cambios de texto
const handleChange = (
  e:
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    | SelectChangeEvent
) => {
  const target = e.target as HTMLInputElement;
  const name = target.name;
  const value = target.value;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

// Archivo para "Condición especial"
const handleFileChange = (file: File | null) => {
  if (file && file.type === "application/pdf") {
    // ✅ Limpiar error y mostrar loading temporal
    setErrorCondicionFile("");
    setFormData((prev) => ({
      ...prev,
      docCondicion: "",
      urlCondicion: "",
      loadingCondicion: true, // 🔸 nuevo flag temporal
    }));

    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        docCondicion: file.name,
        urlCondicion: url,
        loadingCondicion: false, // 🔸 quitar loading
      }));
    }, 3000);
  } else {
    setFormData((prev) => ({
      ...prev,
      docCondicion: "",
      urlCondicion: "",
      loadingCondicion: false,
    }));
  }
};


// Archivo para "Dirección completa" (recibo)
const handleReciboChange = (file: File | null) => {
  if (file && file.type === "application/pdf") {
    setErrorReciboFile("");
    setFormData((prev) => ({
      ...prev,
      reciboServicio: "",
      urlRecibo: "",
      loadingRecibo: true, // 🔸 nuevo flag temporal
    }));

    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        reciboServicio: file.name,
        urlRecibo: url,
        loadingRecibo: false,
      }));
    }, 3000);
  } else {
    setFormData((prev) => ({
      ...prev,
      reciboServicio: "",
      urlRecibo: "",
      loadingRecibo: false,
    }));
  }
};


const handlePresentarDeclaracion = () => {
  console.log("✅ Declaración jurada presentada correctamente.");
  setMensajeSnackbar("Declaración jurada presentada con éxito.");
  setOpenSnackbar(true);

  const nuevosDeclarados = prediosDeclarados + 1;
  setPrediosDeclarados(nuevosDeclarados);
  sessionStorage.setItem("prediosDeclarados", nuevosDeclarados.toString()); // ✅ persistencia temporal

  console.log("➡️ Declarados actualizados:", nuevosDeclarados, "/", numPredios);

  setTimeout(() => {
    navigate("/declaracion-exitosa", {
      state: {
        numPredios,
        tipoPersona,
        prediosDeclarados: nuevosDeclarados,
        tipoDocConyuge,
        nroDocConyuge,
        apellidosConyuge,
        fechaNacimientoConyuge,
      },
    });
  }, 1500);
};





// ✅ Ref para el contenedor del chat
const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

// ✅ Efecto: hacer scroll automático cuando cambian los mensajes
React.useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [messages]);


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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <ScheduleIcon sx={{ fontSize: "1.2rem" }} />
  <Typography
    variant="body2"
    sx={{ fontSize: "0.875rem", textTransform: "capitalize" }}
  >
    {formattedDateTime}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    bgcolor: '#f5f7fa',
    ml: `${drawerWidth - 2}px`, // 🔹 más pegado al sidebar
    mt: '64px',
    flexGrow: 1,
    flexWrap: 'nowrap',
    height: 'calc(100vh - 96px)', // 🔹 altura ajustada sin pasar el footer
    overflow: 'auto',
    transition: 'all 0.4s ease',
    p: '10px 10px 10px 0px',
    pr: showChat ? 0 : 4,
  }}
>
  {/* ========== WIZARD PRINCIPAL ========== */}
  <Box
   sx={{
      flexGrow: 1,
      minWidth: 0,
      bgcolor: '#fff',
      borderRadius: 2,
      borderTopLeftRadius: 0, // 🔹 pegado visualmente al sidebar
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.4s ease, margin 0.4s ease',
      overflow: 'hidden',
      mr: showChat ? 2 : 0,
      flexBasis: showChat ? 'calc(100% - 360px)' : '100%', // 🔹 expansión automática
      maxHeight: '100%',
    }}
  >
    {/* 🔹 ENCABEZADO */}
    <Box
      sx={{
        bgcolor: '#e3f2fd',
        borderLeft: '5px solid #003366',
        borderRadius: 1,
        mb: 1,
        p: 2.5,
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#003366', mb: 1 }}>
        Registro de Declaración Jurada
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
          🏠 Número de predios:{' '}
          <Typography component="span" sx={{ color: '#1e5ba8', fontWeight: 600 }}>
            {numPredios}
          </Typography>
        </Typography>
        <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
          👤 Tipo de persona:{' '}
          <Typography component="span" sx={{ color: '#1e5ba8', fontWeight: 600 }}>
            {tipoPersona}
          </Typography>
        </Typography>
      </Box>
    </Box>

    {/* 🔹 STEPPER */}
    <Box sx={{ mt: '-8px', mb: 1, px: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '& .MuiStepLabel-label': { mt: '-6px', color: '#555' },
          '& .MuiStepIcon-root': { fontSize: '1.8rem', transition: 'all 0.3s ease' },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color:
                    index === activeStep
                      ? '#4caf50 !important'
                      : index < activeStep
                      ? '#4caf50 !important'
                      : '#cfd8dc !important',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>

    {/* 🔹 CONTENIDO PRINCIPAL */}
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // ✅ CAMBIAR de 'space-between' a 'flex-start'
        overflowY: 'auto', // ✅ CAMBIAR: permitir scroll vertical
        overflowX: 'hidden', // ✅ AGREGAR: evitar scroll horizontal
        pb: 1,
      }}
    >
   
      {activeStep === 0 && (
          <>
            {/* Paso 1 - Datos del Contribuyente */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            <Paso1Contribuyente
              formData={formData}
              handleChange={handleChange}
              tipoPersona={tipoPersona}
              setMostrarDireccionDetallada={setMostrarDireccionDetallada}
              mostrarDireccionDetallada={mostrarDireccionDetallada}
              handleFileChange={handleFileChange}
              handleReciboChange={handleReciboChange}
              errorCondicionFile={errorCondicionFile}      // ✅ nuevo
              errorReciboFile={errorReciboFile}            // ✅ nuevo
            />
            </Box>
          </>
        )}

      {activeStep === 1 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        <Paso2Predio formData={formData} handleChange={handleChange} registerValidator={(fn) => setValidarPaso2(() => fn)} />
        </Box>
      )}
      {activeStep === 2 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          <Paso3Terreno formData={formData} handleChange={handleChange} />
        </Box>
      )}
      {activeStep === 3 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          <Paso4Construccion onChatMessage={(mensaje) => setMessages((prev) => [...prev, `🤖 Tributito: ${mensaje}`])} />
        </Box>
      )}
      {activeStep === 4 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          <Paso5Resumen />
        </Box>
      )}

      









      {/* 🔹 BOTONES */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
  {/* Botón Anterior */}
  <Button
    disabled={activeStep === 0}
    onClick={handleBack}
    variant="outlined"
    color="inherit"
  >
    Anterior
  </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep < steps.length - 1 && (
            <Button
              variant="outlined"
              onClick={handleGuardar}
              sx={{
                borderColor: '#4caf50',
                color: '#4caf50',
                '&:hover': {
                  borderColor: '#43a047',
                  bgcolor: 'rgba(76,175,80,0.08)',
                },
              }}
            >
              Guardar para continuar después
            </Button>
          )}

          {/* Botón Siguiente o Presentar Declaración */}
  {activeStep === steps.length - 1 ? (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{ px: 4, py: 1.2, fontSize: "1rem" }}
      onClick={handlePresentarDeclaracion}
    >
      Presentar Declaración Jurada
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
    >
      Siguiente
    </Button>
  )}
</Box>
      </Box>
    </Box>
  </Box>

  {/* ========== CHAT TRIBUTITO ========== */}
  <Fade in={showChat} unmountOnExit timeout={300}>
    <Box
      sx={{
        width: 340,
        minWidth: 340,
        flexShrink: 0,
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    bgcolor: '#4caf50', // Verde SAT
    color: '#fff',
    p: 1.5,
    flexShrink: 0,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <Box
      component="img"
      src={tributito} // 👈 importa tu imagen al inicio del archivo
      alt="Tributito"
      sx={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        bgcolor: '#fff',
        border: '2px solid rgba(255,255,255,0.7)',
      }}
    />
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
        Tributito
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
        tu asistente virtual en DJ
      </Typography>
    </Box>
  </Box>

  {/* Botón cerrar UX */}
  <IconButton
    onClick={() => setShowChat(false)}
    size="small"
    sx={{
      color: 'white',
      bgcolor: 'rgba(255,255,255,0.2)',
      '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
      borderRadius: '50%',
      transition: 'all 0.2s ease',
    }}
  >
    <CloseIcon fontSize="small" />
  </IconButton>

      </Box>

      {/* Mensajes */}
      <Box
        ref={chatContainerRef} // 👈 aquí
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.startsWith('🧾') ? 'flex-end' : 'flex-start',
              bgcolor: msg.startsWith('🧾') ? '#e1f5e1' : '#fff',
              p: 1.2,
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              maxWidth: '80%',
            }}
          >
            <Typography variant="body2" sx={{ color: '#333', whiteSpace: 'pre-line' }}>
              {msg}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
       <TextField
          fullWidth
          placeholder="Escribe tu mensaje..."
          size="small"
          multiline
          minRows={1}
          maxRows={3}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // evita salto de línea
              handleSendMessage(); // envía el mensaje
            }
          }}
        />
        <Button variant="contained" color="success" onClick={handleSendMessage}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  </Fade>

  {/* Botón para reabrir el chat */}
  {!showChat && (
    <Button
      variant="contained"
      color="success"
      startIcon={<ExpandLessIcon />}
      onClick={() => setShowChat(true)}
      sx={{
        position: 'fixed',
        bottom: 90,
        right: 40,
        borderRadius: 5,
        px: 3,
        fontWeight: 600,
        bgcolor: '#4caf50',
        boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
        '&:hover': { bgcolor: '#43a047' },
        zIndex: 1500,
      }}
    >
      Ver Chat
    </Button>
  )}
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


<Snackbar
  open={openSnackbar}
  autoHideDuration={4000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setOpenSnackbar(false)}
    severity={severitySnackbar}
    variant="filled"
    sx={{
      width: "100%",
      fontSize: "0.95rem",
      fontWeight: 500,
      letterSpacing: "0.3px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
    }}
  >
    {mensajeSnackbar}
  </Alert>
</Snackbar>

    </Box>
    
  );
};

export default RegistrarDJ;