import React, { useEffect, useRef, useState } from "react";
import { Box, Fade, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  anchorLeft?: number;   // Posición desde la izquierda (para globo a la izquierda)
  anchorRight?: number;  // Posición desde la derecha (para globo a la derecha)
  anchorBottom?: number; // Posición desde abajo
  maxWidth?: number;     // Ancho máximo del globo
  text?: string;         // Mensaje dinámico
  show?: boolean;        // Control externo de visibilidad (opcional)
  autoHideMs?: number;   // Tiempo de auto-ocultar (opcional)
  restartKey?: any;      // Fuerza re-animar/tipear al cambiar
  posicionTributito?: "izquierda" | "derecha"; // Posición de Tributito relativa al globo
};

const DEFAULT_TEXT =
  "Soy Tributito, tu asistente virtual con Inteligencia Artificial. Durante el proceso de tu Declaración Jurada puedo guiarte para que lo hagas fácilmente. " +
  "Solo pregúntame lo que no entiendes y yo te diré qué hacer.";

export default function TributitoBubble({
  anchorLeft,
  anchorRight = 110,     // Valor por defecto para compatibilidad
  anchorBottom = 140,
  maxWidth = 280,
  text = DEFAULT_TEXT,
  show,
  autoHideMs = 10000,
  restartKey,
  posicionTributito = anchorLeft !== undefined ? "derecha" : "izquierda", // Auto-detectar
}: Props) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const fullText = useRef(text);

  // Determinar si el globo está a la izquierda o derecha de Tributito
  const globoALaIzquierda = posicionTributito === "derecha" || anchorLeft !== undefined;

  // Sincroniza texto y reinicia tipo-escritura cuando cambia restartKey o text
  useEffect(() => {
    fullText.current = text;
    setTyped("");
    if (show === undefined) setOpen(false);
    const t = setTimeout(() => setOpen(show ?? true), 300);
    return () => clearTimeout(t);
  }, [restartKey, text, show]);

  // Si usan show controlado, refleja cambios
  useEffect(() => {
    if (show === undefined) return;
    setOpen(!!show);
  }, [show]);

  // Efecto de tipeo
  useEffect(() => {
    if (!open) return;
    let i = 0;
    const id = setInterval(() => {
      setTyped(fullText.current.slice(0, i));
      i++;
      if (i > fullText.current.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [open]);

  // Auto-ocultar
  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => setOpen(false), autoHideMs);
    return () => clearTimeout(timeout);
  }, [open, autoHideMs]);

  return (
    <Fade in={open} timeout={800} unmountOnExit>
      <Box
        sx={{
          position: "absolute",
          // Usar anchorLeft si está definido, sino usar anchorRight
          ...(anchorLeft !== undefined 
            ? { left: { xs: 12, md: anchorLeft } }
            : { right: { xs: 12, md: anchorRight } }
          ),
          bottom: { xs: 110, md: anchorBottom },
          width: maxWidth,
          maxWidth: { xs: "90vw", md: maxWidth },
          p: 2,
          // Ajustar padding según la posición del globo
          ...(globoALaIzquierda 
            ? { pl: 5.5, pr: 4 }  // Globo a la izquierda: más padding a la izquierda para la flecha
            : { pr: 5.5, pl: 4 }  // Globo a la derecha: más padding a la derecha para la flecha
          ),
          color: "#083b6e",
          zIndex: 10,
          pointerEvents: "auto",
          backdropFilter: "blur(6px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(250,250,255,0.92) 100%)",
          borderRadius: 12,
          border: "1px solid rgba(0,76,175,0.12)",
          boxShadow: "0 12px 32px rgba(2,36,74,0.18)",
          
          // Flecha condicional según la posición
          ...(globoALaIzquierda ? {
            // Flecha apuntando hacia la DERECHA (hacia Tributito a la derecha)
            "&::before": {
              content: '""',
              position: "absolute",
              right: -14,
              bottom: 26,
              borderLeft: "14px solid rgba(0,76,175,0.12)",
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              filter: "drop-shadow(-2px 2px 2px rgba(2,36,74,0.10))",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              right: -12,
              bottom: 28,
              borderLeft: "12px solid rgba(255,255,255,0.94)",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
            },
          } : {
            // Flecha apuntando hacia la IZQUIERDA (hacia Tributito a la izquierda)
            "&::before": {
              content: '""',
              position: "absolute",
              left: -14,
              bottom: 26,
              borderRight: "14px solid rgba(0,76,175,0.12)",
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              filter: "drop-shadow(2px 2px 2px rgba(2,36,74,0.10))",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              left: -12,
              bottom: 28,
              borderRight: "12px solid rgba(255,255,255,0.94)",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
            },
          }),
        }}
      >
        {/* Botón de cerrar */}
        <IconButton
          size="small"
          aria-label="Cerrar"
          onClick={() => setOpen(false)}
          sx={{ 
            position: "absolute", 
            top: 4, 
            right: 4,
            color: "#083b6e",
            "&:hover": {
              bgcolor: "rgba(8, 59, 110, 0.08)",
            }
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>

        {/* Título */}
        <Typography
          variant="subtitle2"
          sx={{ 
            fontWeight: 700, 
            mb: 0.5, 
            color: "#0b4a8b", 
            letterSpacing: 0.2 
          }}
        >
          👋 ¡Hola!
        </Typography>

        {/* Texto con efecto de tipeo */}
        <Typography 
          variant="body2" 
          sx={{ 
            lineHeight: 1.5,
            fontSize: "0.875rem",
          }}
        >
          {typed}
          {/* Cursor parpadeante */}
          <Box
            component="span"
            sx={{
              borderRight: "2px solid #0b4a8b",
              ml: 0.3,
              animation: "blink .8s step-end infinite",
              "@keyframes blink": {
                "0%,100%": { opacity: 0 },
                "50%": { opacity: 1 },
              },
            }}
          />
        </Typography>
      </Box>
    </Fade>
  );
}