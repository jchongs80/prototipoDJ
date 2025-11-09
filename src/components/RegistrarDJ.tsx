// src/components/Dashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  Fade,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
  Stack
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
import SendIcon from "@mui/icons-material/Send";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Paso1Contribuyente from './Paso1Contribuyente';
import Paso2Predio from "./Paso2Predio";
import Paso3Terreno from './Paso3Terreno';
import Paso4Construccion from './Paso4Construccion';
import Paso5Resumen from './Paso5Resumen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from "@mui/icons-material/Person";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import StraightenIcon from "@mui/icons-material/Straighten";
import ConstructionIcon from "@mui/icons-material/Construction";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import sonidoMensaje from "../assets/sonidoMensaje.mp3";
import audioTributito from "../assets/audio-tributito.mp3";
import usuario from './../assets/usuario.png';


interface Props {
  onLogout?: () => void;
}




const wizardTheme = createTheme({
components: {
      MuiStepConnector: {
        styleOverrides: {
          line: {
            borderColor: "#b0bec5",
            borderTopWidth: 3,
            borderRadius: 1,
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#546e7a",
            marginTop: 2,
            "&.Mui-active": { color: "#1565c0", fontWeight: 700 },
            "&.Mui-completed": { color: "#2e7d32" },
          },
        },
      },
    },
});



/* ======================
   COMPONENTE PRINCIPAL
====================== */
const RegistrarDJ: React.FC<Props> = ({ onLogout }) => {

  const paso2Ref = useRef<any>(null);

  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const drawerWidth = 80;

  
// 🎧 Estados y referencias para sonido y efecto de carga
const [isThinking, setIsThinking] = useState(false);
//const [puedeReproducir, setPuedeReproducir] = useState(false);
const [puedeReproducirSonido, setPuedeReproducirSonido] = useState(false);
const [mensajeInicialEscrito, setMensajeInicialEscrito] = useState(false); // ✅ nuevo

const typingIntervalRef = useRef<NodeJS.Timeout | null>(null); // ✅ nuevo

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
}, [declaradosDesdeRuta, prediosDeclarados]);
  

  const sidebarItems = [
    { icon: <HomeIcon />, label: 'Inicio', active: false },
    { icon: <AssignmentIcon />, label: 'Trámites', active: true },
    { icon: <DescriptionIcon />, label: 'Consultas', active: false },
    { icon: <AccountCircleIcon />, label: 'Mi Perfil', active: false },
    { icon: <HelpOutlineIcon />, label: 'Ayuda', active: false },
  ];


  const [activeStep, setActiveStep] = useState(0);

  //const [usuarioInteraccion, setUsuarioInteraccion] = useState(false);

  //useEffect(() => {
  //  const activar = () => setUsuarioInteraccion(true);
  //  window.addEventListener("click", activar, { once: true });
  //  window.addEventListener("keydown", activar, { once: true });
  //  window.addEventListener("scroll", activar, { once: true });

  //  return () => {
  //    window.removeEventListener("click", activar);
  //    window.removeEventListener("keydown", activar);
  //    window.removeEventListener("scroll", activar);
  //  };
  //}, []);

// Mensajes automáticos del asistente por paso
const mensajesPorPaso = React.useMemo(() => ([
  {
    descripcion: "¡Hola! Soy Tributito, tu asistente virtual. Te guiaré en el proceso de tu Declaración Jurada.. En este paso debes registrar tus datos personales y, si corresponde, los de tu cónyuge. Además, adjunta los documentos solicitados como el recibo de servicio y tu condición especial si aplica."
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
]), []);


const escribirMensajeTributito = React.useCallback((texto: string) => {
  // 🧹 Limpieza absoluta de intervalos anteriores
  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = null;
  }

  // Reinicia estados
  setIsThinking(false);
  setIsTyping(false);
  setTypedText("");

  let cancelado = false; // ⚠️ bandera para prevenir loops infinitos

  // Delay breve antes de comenzar a escribir
  setTimeout(() => {
    if (cancelado) return;
    setIsTyping(true);

    const letras = texto.split("");
    let currentIndex = 0;

    typingIntervalRef.current = setInterval(() => {
      if (cancelado) return;

      // Cuando termina de escribir
      if (currentIndex >= letras.length) {
        clearInterval(typingIntervalRef.current!);
        typingIntervalRef.current = null;
        setIsTyping(false);
        setMessages((prev) => [...prev, `Tributito: ${texto}`]);

        // Reproducir sonido una sola vez
        const audio = new Audio(sonidoMensaje);
        audio.play().catch(() => {});
        return;
      }

      // Escribir letra por letra
      setTypedText(letras.slice(0, currentIndex + 1).join(""));
      currentIndex++;
    }, 50);
  }, 100);

  // 🧹 Asegurar que si el usuario cambia de paso o desmonta, se cancela
  return () => {
    cancelado = true;
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  };
}, []);

useEffect(() => {
  // Si es el primer paso y aún no se ha mostrado el mensaje inicial
  if (activeStep === 0 && !mensajeInicialEscrito) {
    const timer = setTimeout(() => {
      const paso = mensajesPorPaso[0];
      if (paso?.descripcion) {
        escribirMensajeTributito(paso.descripcion);
        setMensajeInicialEscrito(true);
        ultimoPasoMostradoRef.current = 0; // Guarda paso actual
      }
    }, 1000);
    return () => clearTimeout(timer);
  }

  // Si cambia a otro paso y no se ha mostrado mensaje en este paso
  if (activeStep !== ultimoPasoMostradoRef.current) {
    const paso = mensajesPorPaso[activeStep];
    if (paso?.descripcion) {
      escribirMensajeTributito(paso.descripcion);
      ultimoPasoMostradoRef.current = activeStep; // Marca que ya se mostró
    }
  }
}, [activeStep, mensajeInicialEscrito, mensajesPorPaso, escribirMensajeTributito]);




  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const steps = [
    "Datos del Contribuyente",
    "Datos del Predio",
    "Valor del Terreno",
    "Construcción y Obras",
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
      setSeveritySnackbar("info");
      setMensajeSnackbar("⚠️ Por favor, revisar los mensajes de error en el formulario");
      setOpenSnackbar(true);
      return;
    }
  }

  // 🔸 Validación del Paso 2
  if (activeStep === 1 && (!formData.codigoPredio || formData.codigoPredio.trim() === "")) {
    setSeveritySnackbar("info");
  setMensajeSnackbar("⚠️ Debe seleccionar un predio antes de continuar.");
  setOpenSnackbar(true);
  return;
  }

if (activeStep === 1) {
  const valido = paso2Ref.current?.validarPaso2();

  if (!valido) {
    // ⚠️ Mensaje unificado y claro
    setSeveritySnackbar("info");
    setMensajeSnackbar(
      "⚠️ Revise los datos del paso: debe adjuntar el documento PDF y registrar el valor de adquisición (en soles o dólares)."
    );
    setOpenSnackbar(true);
    return;
  }
}


  // ✅ Si todo bien, avanzar
  setActiveStep((prev) => prev + 1);
setSeveritySnackbar("success");
setMensajeSnackbar("✅ Se guardaron los datos del paso anterior correctamente.");
setOpenSnackbar(true);
};

const ultimoPasoMostradoRef = useRef<number | null>(null);

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleGuardar = () =>
    alert("✅ Tu progreso ha sido guardado para continuar después.");
  
  

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


//useEffect(() => {
//  const habilitarSonido = () => setPuedeReproducir(true);
//  document.addEventListener("click", habilitarSonido, { once: true });
//  return () => document.removeEventListener("click", habilitarSonido);
//}, []);

// 🟢 Reproduce el sonido del primer mensaje en cuanto el usuario habilite audio
useEffect(() => {
  if (puedeReproducirSonido && activeStep === 0 && messages.length > 0) {
    const audio = new Audio(sonidoMensaje);
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 300); // ligero retardo para sincronizar con el texto
  }
}, [puedeReproducirSonido, activeStep, messages.length]);




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
    apellidosNombres: "JUAN VICTOR GARCIA PEREZ",
    telefonoFijo: "",
    celular: "995862532",
    correo: "vperezg@gmail.com",
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

    imagenPredio: "./../assets/predio1.png",

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

const [posicionTributito, setPosicionTributito] = useState<"abajo" | "arriba">("abajo");


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



useEffect(() => {
  const habilitarSonido = () => {
    setPuedeReproducirSonido(true);
    // Reproduce un sonido silencioso para desbloquear el contexto de audio
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  };

  document.addEventListener("click", habilitarSonido, { once: true });
  document.addEventListener("keydown", habilitarSonido, { once: true });
  document.addEventListener("scroll", habilitarSonido, { once: true });

  return () => {
    document.removeEventListener("click", habilitarSonido);
    document.removeEventListener("keydown", habilitarSonido);
    document.removeEventListener("scroll", habilitarSonido);
  };
}, []);




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


// 💬 Base de datos simulada de respuestas de Tributito
const respuestasPorPaso: Record<number, string[]> = {
  // 🧍 Paso 1: Datos del contribuyente
  0: [
    "😄 ¡Perfecto! Asegúrate de ingresar correctamente tus nombres y apellidos completos.",
    "📄 Recuerda adjuntar tu recibo de agua o luz, es un requisito esencial para continuar.",
    "🤓 Si eres sociedad conyugal, no olvides completar los datos de tu cónyuge.",
    "💡 Te recomiendo verificar que tu correo y celular estén actualizados para recibir notificaciones.",
    "🧠 Consejo: guarda tu progreso si necesitas pausar el registro, ¡así no perderás datos!",
    "👍 Todo va muy bien, solo revisa los campos obligatorios antes de avanzar.",
    "👀 Si tienes una condición especial, recuerda adjuntar el documento que lo sustente.",
  ],

  // 🏠 Paso 2: Datos del predio
  1: [
    "🏡 No olvides indicar el tipo de transferencia y adjuntar el documento de adquisición (PDF).",
    "📍 Verifica que la dirección del predio esté completa y sin errores de escritura.",
    "🧾 Si no has adjuntado tu documento de adquisición, no podrás continuar al siguiente paso.",
    "📬 Es importante que la dirección fiscal coincida con la del predio declarado.",
    "💬 Consejo: usa nombres cortos y claros para las urbanizaciones o vías.",
    "✅ ¡Todo bien! Recuerda revisar los datos del predio antes de avanzar.",
    "📂 Si el predio tiene varias secciones o interiores, asegúrate de registrar los detalles correctamente.",
  ],

  // 📏 Paso 3: Datos del terreno
  2: [
    "📐 Asegúrate de ingresar correctamente el área total y el frontis del predio.",
    "💰 No olvides el valor arancelario, es clave para calcular el autovalúo.",
    "🌎 Si tienes dudas sobre el valor del terreno, revisa la tabla de valores arancelarios del SAT.",
    "📏 El área total debe incluir tanto área propia como área común.",
    "🧮 Revisa que el valor total del terreno se calcule automáticamente antes de avanzar.",
    "🌱 Excelente, ¡vas avanzando! Recuerda que este paso define el valor base del predio.",
    "🧾 Si tu predio tiene fracciones o subdivisiones, decláralas por separado.",
  ],

  // 🧱 Paso 4: Construcción y obras complementarias
  3: [
    "🏗️ Registra los pisos o edificaciones que tenga tu predio, incluso si son antiguas.",
    "🧱 No olvides detallar los materiales de construcción (muros, techos, pisos, etc.).",
    "💡 Consejo: ingresa correctamente las fechas de construcción para un cálculo exacto.",
    "🪚 Si tienes obras complementarias como cercos, techos o depósitos, inclúyelos también.",
    "🏠 Puedes agregar varios niveles, cada uno con sus propios datos.",
    "🧰 ¡Muy bien! Mientras más precisos sean tus datos, más exacto será el autovalúo.",
    "📸 Guarda planos o documentos por si los necesitas para una inspección.",
  ],

  // 🧾 Paso 5: Resumen final
  4: [
    "📑 ¡Ya casi terminas! Revisa cuidadosamente todos los datos antes de presentar.",
    "✅ Si todo está correcto, puedes hacer clic en 'Presentar Declaración Jurada'.",
    "👀 Consejo: asegúrate de haber adjuntado todos los documentos requeridos.",
    "💬 Puedes volver a cualquier paso si detectas un error, antes de presentar.",
    "🎉 ¡Excelente trabajo! Has completado todos los pasos correctamente.",
    "🧾 Recuerda que podrás descargar la constancia de presentación al finalizar.",
    "🙌 Tributito está orgulloso de ti por completar tu declaración sin errores.",
  ],
};

// 🔁 Función para elegir una respuesta al azar por paso
const obtenerRespuestaAleatoria = (paso: number): string => {
  const lista = respuestasPorPaso[paso] || [];
  if (lista.length === 0) return "🙂 Continúa con tu declaración.";
  const randomIndex = Math.floor(Math.random() * lista.length);
  return `${lista[randomIndex]}`;
};

// Efecto de escritura del mensaje
const [isTyping, setIsTyping] = useState(false);
const [typedText, setTypedText] = useState("");



const handleSendMessage = () => {
  if (!inputValue.trim()) return;

  // Muestra el mensaje del usuario
  setMessages((prev) => [...prev, `Tú: ${inputValue}`]);
  const currentStep = activeStep;
  setInputValue("");

  // Simula que Tributito está pensando
  setIsThinking(true);
  setIsTyping(false);
  setTypedText("");

  setTimeout(() => {
    setIsThinking(false);
    setIsTyping(false);
    setTypedText("");

    const respuestaCompleta = obtenerRespuestaAleatoria(currentStep);

    setTimeout(() => {
      setIsTyping(true);

      const letras = respuestaCompleta.split("");
      let currentIndex = 0; // ✅ Variable local

      typingIntervalRef.current = setInterval(() => {
        // ✅ Verificación estricta
        if (currentIndex >= letras.length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
          setMessages((prev) => [...prev, `Tributito: ${respuestaCompleta}`]);

          const audio = new Audio(sonidoMensaje);
          audio.play().catch(() => {});
          
          return; // ✅ Salir
        }

        // ✅ Usar slice en lugar de concatenación
        setTypedText(letras.slice(0, currentIndex + 1).join(""));
        currentIndex++;
        
      }, 50);
    }, 100);
  }, 2500);
};


// 🔽 Efecto: mantener scroll abajo mientras Tributito escribe
React.useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [typedText, isThinking, isTyping, messages]);

useEffect(() => {
  const chatContainer = chatContainerRef.current;
  if (!chatContainer) return;

  let iniciado = false;
  const actualizarPosicion = () => {
    requestAnimationFrame(() => {
      if (!chatContainer) return;
      const alturaTotal = chatContainer.scrollHeight;
      const alturaVisible = chatContainer.clientHeight;
      const distanciaAlFinal = alturaTotal - chatContainer.scrollTop - alturaVisible;
      if (!iniciado) { iniciado = true; return; }
      setPosicionTributito((prev) => {
        const nueva = alturaTotal > alturaVisible * 1.1 && distanciaAlFinal < 120 ? "arriba" : "abajo";
        return prev === nueva ? prev : nueva;
      });
    });
  };

  const mutationObserver = new MutationObserver(actualizarPosicion);
  mutationObserver.observe(chatContainer, { childList: true, subtree: true });
  chatContainer.addEventListener("scroll", actualizarPosicion);
  const resizeObserver = new ResizeObserver(actualizarPosicion);
  resizeObserver.observe(chatContainer);
  const timer = setTimeout(actualizarPosicion, 500);

  return () => {
    clearTimeout(timer);
    mutationObserver.disconnect();
    resizeObserver.disconnect();
    chatContainer.removeEventListener("scroll", actualizarPosicion);
  };
}, [activeStep, messages.length]);


  // 🧹 Limpieza al desmontar el componente
useEffect(() => {
  return () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  };
}, []);



// ------------------- ESTADOS DE LOS RESÚMENES -------------------
const [resumenPredio, setResumenPredio] = useState<{
  codigo: string;
  direccion: string;
  uso: string;
  claseUso?: string;
  subClaseUso?: string;
  condicionPropiedad: string;
  porcentajePropiedad?: number;
  fechaAdquisicion?: string;
  areaTotal: number;
  valorTotalTerreno: number;
  imagen?: string;
  tipoPersona?: string;
  nombreCompleto?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  tipoDocumentoConyuge?: string;
  numeroDocumentoConyuge?: string;
  nombreConyuge?: string;
}>({
  codigo: "",
  direccion: "",
  uso: "",
  condicionPropiedad: "",
  areaTotal: 0,
  valorTotalTerreno: 0,
});

// Datos de construcción (simulación, puedes reemplazar con los reales del paso 4)
const [pisos, setPisos] = useState<any[]>([]);
const [obras, setObras] = useState<any[]>([]);


// Obras complementarias (también simuladas)


// === Recibir pisos y obras desde Paso4 ===
const handleActualizarConstruccion = (pisosActualizados: any[], obrasActualizadas: any[]) => {
  setPisos(pisosActualizados);
  setObras(obrasActualizadas);
};



// Totales calculados (puedes ajustarlos a tus cálculos reales)
const totalConstruccion = pisos.reduce(
  (acc, p) => acc + Number(p.valorFinal || 0),
  0
);
const totalObrasComplementarias = obras.reduce(
  (acc, o) => acc + Number(o.valorTotalObras || 0),
  0
);



// 🔄 Actualizar resumenPredio cuando cambian los datos del formulario (pasos 2 o 3)
useEffect(() => {
  setResumenPredio({
    codigo: formData.codigoPredio || "",
    direccion: formData.direccionCompletaPredio || formData.direccionCompleta || "",
    uso: formData.uso || formData.subClaseUso || "",
    claseUso: formData.claseUso || "",
    subClaseUso: formData.subClaseUso || "",
    condicionPropiedad: formData.condicionPropiedad || "",
    porcentajePropiedad: Number(formData.porcentajePropiedad) || 100,
    fechaAdquisicion: formData.fechaAdquisicion || "",
    areaTotal: Number(formData.areaTotal) || 0,
    valorTotalTerreno: Number(formData.valorTotalTerreno) || 0,
    imagen: formData.imagenPredio, // puedes reemplazar por el valor real si lo tienes

    // 🔹 Datos del contribuyente
    tipoPersona: formData.tipoPersona || "",
    nombreCompleto: formData.apellidosNombres || "",
    tipoDocumento: formData.tipoDocumento || "",
    numeroDocumento: formData.nroDocumento || "",
    // 🔹 Datos del cónyuge (solo si aplica)
    tipoDocumentoConyuge: formData.tipoDocConyuge || "",
    numeroDocumentoConyuge: formData.nroDocConyuge || "",
    nombreConyuge: formData.apellidosConyuge || "",
  });
}, [formData]);



const [openConfirm, setOpenConfirm] = useState(false);

const formatoMoneda = (n: number) =>
  (Number(n) || 0).toLocaleString("es-PE", { style: "currency", currency: "PEN" });

// Totales ya existentes: totalConstruccion, totalObrasComplementarias
const valorTotalTerrenoNum = Number(2) || 0;
const autovaluo = valorTotalTerrenoNum + totalConstruccion + totalObrasComplementarias;

  return (
    <Box 
      sx={{
   display: 'flex',
    minHeight: '100vh',
    bgcolor: '#f5f7fa',
    overflowX: 'hidden', // evita scroll horizontal

    }}
    >
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
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem', mr: 3 }} translate="no">
            SAT
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <ScheduleIcon sx={{ fontSize: "1.2rem" }} />
  <Typography
    variant="body2"
    sx={{ fontSize: "0.875rem", textTransform: "capitalize" }}
    translate="no"
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
   // ml: `${drawerWidth - 2}px`, // 🔹 más pegado al sidebar
    mt: '64px',
    flexGrow: 1,
    flexWrap: 'nowrap',
    height: 'calc(100vh - 96px)', // 🔹 altura ajustada sin pasar el footer
    overflow: 'auto',
    transition: 'all 0.4s ease',
    pl: 0, // sin padding izquierdo
    pr: showChat ? 0 : 2,
    pt: 0,
    pb: 0,
    //pr: showChat ? 0 : 4,
  }}
>
  {/* ========== WIZARD PRINCIPAL ========== */}
  <Box
   sx={{
     flexGrow: 1,
    minWidth: 0,
    bgcolor: '#fff',
    borderRadius: 2,
    borderTopLeftRadius: 0,
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.4s ease, margin 0.4s ease',
    overflow: 'hidden',
    mr: showChat ? 2 : 0,
    flexBasis: showChat ? 'calc(100% - 360px)' : '100%',
    maxWidth: '100%',
    ml: 0,
    px: 0, // ✅ elimina padding horizontal
    py: 1,
    pt: 0.5, // pequeño respiro arriba
    pb: 1, // pequeño respiro abajo
    maxHeight: '100%',
    }}
  >

  {/* 🔹 ENCABEZADO GENERAL */}
<Box
  sx={{
    background: "linear-gradient(90deg, #fdfdfd 0%, #e6f0fb 100%)",
    borderBottom: "1px solid #d5e3f3",
    py: 0.5, // 🔹 menos altura
    px: 2,
    mb: 0.5,
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 2,
      color: "#1a1a1a",
    }}
  >
    {/* 🏛️ Título principal */}
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontSize: "1.1rem",
        color: "#1e497d",
      }}
    >
      <DescriptionIcon sx={{ fontSize: 22, color: "#1e497d" }} />
      Registro de Declaración Jurada
    </Typography>

    {/* ℹ️ Datos complementarios */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        flexWrap: "wrap",
        fontSize: "0.95rem",
      }}
    >
      {/* 🔹 Número de predios con badge */}
      <Typography sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        🏠 Número de predios a declarar:&nbsp;
        <Box
          component="span"
          sx={{
            backgroundColor: "#1cb457ff",
            color: "#e1f5e5ff",
            fontWeight: 700,
            //borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
          }}
        >
          {numPredios}
        </Box>
      </Typography>

      {/* 🔹 Tipo de persona */}
      <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        👤 Tipo de persona:&nbsp;
        <span
          style={{
            fontWeight: 600,
            color: "#0066cc",
            fontSize: "1rem",
            letterSpacing: "0.2px",
          }}
        >
          {tipoPersona}
        </span>
      </Typography>

      {/* 🔹 Versión */}
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.3,
          fontSize: "0.85rem",
          color: "#777",
          fontWeight: 400,
        }}
      >
        <DescriptionIcon sx={{ fontSize: 16, color: "#aaa" }} />
        v1.0.0
      </Typography>
    </Box>
  </Box>
</Box>

    {/* 🔹 STEPPER */}
    <ThemeProvider theme={wizardTheme}>
    <Box 
    sx={{
    px: 2,           // 🔹 menos padding horizontal
    pt: 0.5,         // 🔹 reduce altura superior
    pb: 1,
    bgcolor: "#f9fafc",
    borderBottom: "1px solid #e0e0e0",
  }}
    
    >



      {/* ====== STEPPER CON BARRA DE PROGRESO Y ESPACIADO OPTIMIZADO ====== */}
  <Box sx={{ overflowX: "auto", pb: 1,position: "relative"}}>
  {/* 🔹 Stepper principal */}
 <Stepper
  activeStep={activeStep}
  connector={<></>}
  sx={{
    "& .MuiStepLabel-label": {
      mt: 0.5,
      fontSize: { xs: "0.8rem", md: "0.9rem" },
      fontWeight: 500,
      color: "#424242",
      cursor: "pointer",
      transition: "color 0.2s ease",
      "&:hover": { color: "#1565c0" },
    },
    "& .MuiStepLabel-label.Mui-active": {
      color: "#1565c0",
      fontWeight: 600,
    },
    "& .MuiStepLabel-label.Mui-completed": {
      color: "#4caf50",
    },
  }}
>
  {steps.map((label, index) => {
    const icons: Record<number, React.ReactNode> = {
      1: <PersonIcon />,
      2: <HomeWorkIcon />,
      3: <StraightenIcon />,
      4: <ConstructionIcon />,
      5: <DescriptionIcon />,
    };

    const stepNumber = index + 1;
    const clickable = index < activeStep; // ✅ Declaración correcta dentro del map()

    return (
      <Step key={label}>
        <StepLabel
          StepIconComponent={() => (
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  stepNumber < activeStep + 1
                    ? "#ffffff"
                    : stepNumber === activeStep + 1
                    ? "#ffffff"
                    : "#90a4ae",
                backgroundColor:
                  stepNumber < activeStep + 1
                    ? "#4caf50"
                    : stepNumber === activeStep + 1
                    ? "#1565c0"
                    : "#e0e0e0",
                boxShadow:
                  stepNumber === activeStep + 1
                    ? "0 0 0 3px rgba(21,101,192,0.2)" // 🔹 menor grosor
                    : "none",
                transition: "all 0.3s ease",
                cursor: clickable ? "pointer" : "default",
                "&:hover": clickable
                  ? { boxShadow: "0 0 8px rgba(21,101,192,0.3)" }
                  : {},
              }}
              onClick={() => {
                if (clickable) setActiveStep(index);
              }}
            >
              {icons[stepNumber]}
            </Box>
          )}
          onClick={() => {
            if (clickable) setActiveStep(index);
          }}
        >
          {label}
        </StepLabel>
      </Step>
    );
  })}
</Stepper>

  {/* 🔹 Barra de progreso debajo del Stepper */}
  <Box
    sx={{
       position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 4, // 🔹 más delgada
      borderRadius: 2,
      backgroundColor: "#e3f2fd",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        width: `${((activeStep + 1) / steps.length) * 100}%`,
        height: "100%",
        background: "linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)",
        transition: "width 0.4s ease",
      }}
    />
  </Box>

  {/* 🔹 Porcentaje de avance opcional */}
      <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 1.5,
        mr: 1,
      }}
    >
      
        <Typography
  align="right"
  sx={{
      px: 1,
      py: 0.2,
      borderRadius: "999px",
      background:
        "linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      color: "#fff",
      fontSize: "0.80rem",
      fontWeight: 550,
      letterSpacing: "0.5px",
      textShadow: "0 1px 1px rgba(0,0,0,0.2)",
      minWidth: "fit-content",
    }}
>
        {Math.round(((activeStep + 1) / steps.length) * 100)}% completado
        </Typography>
  
    </Box>
</Box>


      
      
    </Box>
</ThemeProvider>

    {/* 🔹 CONTENIDO PRINCIPAL */}
    <Box
      sx={{
        flexGrow: 1,
        //display: 'flex',
        //flexDirection: 'column',
        //justifyContent: 'flex-start', // ✅ CAMBIAR de 'space-between' a 'flex-start'
        overflowY: 'auto', // ✅ CAMBIAR: permitir scroll vertical
        overflowX: 'hidden', // ✅ AGREGAR: evitar scroll horizontal
        //pb: 1,
        p:0.5,
        pt:1,
      }}
    >
   
      {activeStep === 0 && (
          <>
            {/* Paso 1 - Datos del Contribuyente */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0.5 }}>
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
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0.5 }}>
        <Paso2Predio ref={paso2Ref} formData={formData} handleChange={handleChange}  />
        </Box>
      )}
      {activeStep === 2 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0.5 }}>
          <Paso3Terreno formData={formData} handleChange={handleChange} />
        </Box>
      )}
      {activeStep === 3 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0.5 }}>
          <Paso4Construccion pisos={pisos} obras={obras} onChatMessage={(mensaje) => escribirMensajeTributito(mensaje)} onActualizarConstruccion={handleActualizarConstruccion} />
        </Box>
      )}
      {activeStep === 4 && (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0.5 }}>
          <Paso5Resumen
            resumenPredio={resumenPredio}
            pisos={pisos}
            obras={obras}
            totalConstruccion={totalConstruccion}
            totalObrasComplementarias={totalObrasComplementarias}
            theme={theme}
          />
        </Box>
      )}

      
      {/* 🔹 BOTONES */}
      <Box 
        sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: "#fff",
            borderTop: "1px solid #ECEFF1",
            py: 1,
            px: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            flexWrap: "nowrap",            // 👈 no permitir salto
            zIndex: 2,
            "& > *": { whiteSpace: "nowrap" }, // 👈 que el texto largo no rompa fila
          }}
    >
  {/* Botón Anterior */}
  <Button
    disabled={activeStep === 0}
    onClick={handleBack}
    variant="outlined"
    color="inherit"
    sx={{ flexShrink: 0 }}          // 👈 que no se comprima
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
                  flexShrink: 0,               // 👈 que no se comprima
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
      onClick={() => setOpenConfirm(true)}
      sx={{ flexShrink: 0 }}          // 👈 que no se comprima
    >
      Presentar Declaración Jurada
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      sx={{ flexShrink: 0 }}          // 👈 que no se comprima
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
  {/* 🎵 Botones de audio y cerrar */}
<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <IconButton
    onClick={() => {
      const audio = new Audio(audioTributito);
      audio.play();
    }}
    size="small"
    sx={{
      color: "white",
      bgcolor: "rgba(255,255,255,0.2)",
      "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
      borderRadius: "50%",
      transition: "all 0.2s ease",
    }}
  >
    <VolumeUpIcon fontSize="small" />
  </IconButton>

  <IconButton
    onClick={() => setShowChat(false)}
    size="small"
    sx={{
      color: "white",
      bgcolor: "rgba(255,255,255,0.2)",
      "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
      borderRadius: "50%",
      transition: "all 0.2s ease",
    }}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
</Box>

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
       {/* 🔹 MENSAJES DEL CHAT */}
{messages.map((msg, index) => {
  const esTributito = msg.startsWith("Tributito:");
  
  return (
    <Box
      key={index}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      {/* Avatar a la izquierda */}
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "6px",
          border: "1px solid #ddd",
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 0.5,
          flexShrink: 0,
        }}
      >
        {esTributito ? (
          <Box
            component="img"
            src={tributito}
            alt="Tributito"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
    component="img"
    src={usuario}
    alt="Usuario"
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: "6px",
      objectFit: "cover",
    }}
  />
        )}
      </Box>

      {/* Burbuja de mensaje */}
      <Box
        sx={{
          bgcolor: esTributito ? "#fff" : "#e7f4ff",
          p: 1.2,
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          maxWidth: "80%",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#333",
            whiteSpace: "pre-line",
            lineHeight: 1.4,
          }}
        >
          {esTributito ? (
            <>
              <b style={{ color: "#2e7d32" }}>Tributito:</b>{" "}
              {msg.replace(/^Tributito:\s*/, "")}
            </>
          ) : (
            msg
          )}
        </Typography>
      </Box>
    </Box>
  );
})}

{/* 🔹 EFECTO “Tributito está escribiendo…” */}
{isThinking && (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      pl: 0.5,
      mt: 0.5,
    }}
  >
    <Box
      component="img"
      src={tributito}
      alt="Tributito"
      sx={{
        width: 28,
        height: 28,
        borderRadius: "6px",
        border: "1px solid #ddd",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        px: 1.5,
        py: 0.8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {/* Tres puntos animados */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.4,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "#888",
              animation: `blink 1.4s infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  </Box>
)}

{/* 💬 Efecto de escritura palabra por palabra */}
{isTyping && (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 1,
      alignSelf: "flex-start",
      maxWidth: "85%",
      mt: 0.5,
    }}
  >
    <Box
      component="img"
      src={tributito}
      alt="Tributito"
      sx={{
        width: 28,
        height: 28,
        borderRadius: "6px",
        border: "1px solid #ddd",
        objectFit: "cover",
        mt: 0.5,
      }}
    />
    
    <Box
      sx={{
        bgcolor: "#fff",
        p: 1.2,
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        flex: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#333",
          whiteSpace: "pre-line",
          lineHeight: 1.4,
        }}
      >
        <b>Tributito:</b> {typedText}
        <span
          style={{
            opacity: 0.6,
            fontWeight: 400,
            marginLeft: "2px",
            fontSize: "1rem",
          }}
        >
          |
        </span>
      </Typography>
    </Box>
  </Box>
)}

{/* 🔹 Animación CSS para los tres puntos */}
<style>
{`
@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-2px); }
}
`}
</style>



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
      Preguntar a Tributito
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



<Dialog
  open={openConfirm}
  onClose={() => setOpenConfirm(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle sx={{ fontWeight: 700, color: "#1e497d" }}>
    Validar datos antes de presentar
  </DialogTitle>

  <DialogContent dividers>
    <Stack spacing={1.2}>
      <Chip
        label="Resumen del Predio"
        size="small"
        sx={{ alignSelf: "flex-start", bgcolor: "#e6f0fb", color: "#1e497d", fontWeight: 600 }}
      />

      {/* Fila: Tipo Persona */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Tipo de Persona</Typography>
        <Typography sx={{ fontWeight: 700 }}>{resumenPredio.tipoPersona || formData.tipoPersona}</Typography>
      </Box>
      <Divider />

      {/* Dirección */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Dirección del Predio</Typography>
        <Typography sx={{ fontWeight: 700, textAlign: "right" }}>
          {resumenPredio.direccion}
        </Typography>
      </Box>

      {/* Uso */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Uso del Predio</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {resumenPredio.uso || resumenPredio.subClaseUso || ""}
        </Typography>
      </Box>

      {/* Condición / % propiedad */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Condición de Propiedad</Typography>
        <Typography sx={{ fontWeight: 700 }}>{resumenPredio.condicionPropiedad}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>% de Propiedad</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {(resumenPredio.porcentajePropiedad ?? 100).toFixed(2)}%
        </Typography>
      </Box>

      {/* Área total */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Área Total (m²)</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {(Number(resumenPredio.areaTotal) || 0).toFixed(2)}
        </Typography>
      </Box>
      <Divider />

      <Chip
        label="Valores"
        size="small"
        sx={{ alignSelf: "flex-start", bgcolor: "#e6f0fb", color: "#1e497d", fontWeight: 600 }}
      />

      {/* Totales monetarios */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Total Terreno</Typography>
        <Typography sx={{ fontWeight: 700 }}>{formatoMoneda(valorTotalTerrenoNum)}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Total Construcción</Typography>
        <Typography sx={{ fontWeight: 700 }}>{formatoMoneda(totalConstruccion)}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography sx={{ color: "#546e7a" }}>Total Obras Complementarias</Typography>
        <Typography sx={{ fontWeight: 700 }}>{formatoMoneda(totalObrasComplementarias)}</Typography>
      </Box>

      {/* Autovalúo */}
      <Box
        sx={{
          mt: 1,
          p: 1.2,
          borderRadius: 1.5,
          bgcolor: "rgba(25,118,210,0.06)",
          border: "1px solid rgba(25,118,210,0.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#0b4a8b", fontWeight: 700 }}>Autovalúo</Typography>
        <Typography sx={{ color: "#0b4a8b", fontWeight: 800, fontSize: "1.05rem" }}>
          {formatoMoneda(autovaluo)}
        </Typography>
      </Box>
    </Stack>
  </DialogContent>

  <DialogActions sx={{ p: 2 }}>
    <Button
      onClick={() => setOpenConfirm(false)}
      variant="outlined"
      color="inherit"
    >
      Cancelar
    </Button>
    <Button
      onClick={() => {
        setOpenConfirm(false);
        handlePresentarDeclaracion(); // ⬅️ continúa con tu flujo existente
      }}
      variant="contained"
      color="primary"
    >
      Presentar Declaración
    </Button>
  </DialogActions>
</Dialog>





<Snackbar
  open={openSnackbar}
  autoHideDuration={4000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{
    position: "fixed",
    top: "50% !important",
    transform: "translateY(-50%)",
  }}
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



{/* 🔹 Imagen flotante de Tributito (parte superior derecha) */}


<Box
  component="img"
  src={require("../assets/tributito2.png")}
  alt="Tributito"
  sx={{
    position: "fixed",
    right: 10,
    width: 120,
    height: "auto",
    zIndex: 2000,
    cursor: "pointer",
    userSelect: "none",
    animation: "flotar 3s ease-in-out infinite",
    transition: `
      top 1.3s cubic-bezier(0.19, 1, 0.22, 1),
      bottom 1.3s cubic-bezier(0.19, 1, 0.22, 1),
      transform 0.4s ease-in-out
    `,
    // 🔽 Posición inteligente:
    bottom:
      !showChat || posicionTributito === "abajo"
        ? 110 // siempre abajo cuando chat está oculto o abajo
        : "unset",
    top:
      showChat && posicionTributito === "arriba"
        ? 140 // arriba solo cuando chat visible y lleno
        : "unset",
    "@keyframes flotar": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-8px)" },
    },
    "&:hover": {
      transform: "translateY(-10px) scale(1.05)",
    },
  }}
  onClick={() => {
    if (!showChat) setShowChat(true); // 👈 Abre chat si está cerrado
  }}
/>




    </Box>




    
  );
};

export default RegistrarDJ;