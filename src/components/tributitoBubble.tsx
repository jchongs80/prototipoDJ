import React, { useEffect, useRef, useState } from "react";
import { Box, Fade, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  anchorRight?: number;
  anchorBottom?: number;
  maxWidth?: number;
};

const TEXT =
  "Hola, soy Tributito. Durante el proceso de tu Declaración Jurada puedo guiarte para que lo hagas fácilmente. " +
  "Solo pregúntame lo que no entiendes y yo te diré qué hacer.";

export default function TributitoBubble({
  anchorRight = 110,
  anchorBottom = 140,
  maxWidth = 520,
}: Props) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const fullText = useRef(TEXT);

  // Mostrar con pequeña demora (fade-in)
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

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

  // 🔥 Auto-ocultar después de 5 s
  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <Fade in={open} timeout={2000} unmountOnExit>
      <Box
        sx={{
          position: "absolute",
          right: { xs: 12, md: anchorRight },
          bottom: { xs: 110, md: anchorBottom },
          width: maxWidth,
          p: 2,
          pr: 5.5,
          color: "#083b6e",
          zIndex: 10,
          backdropFilter: "blur(6px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(250,250,255,0.92) 100%)",
          borderRadius: 12,
          border: "1px solid rgba(0,76,175,0.12)",
          boxShadow: "0 12px 32px rgba(2,36,74,0.18)",
          // Flecha doble capa sin línea
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
        }}
      >
        <IconButton
          size="small"
          aria-label="Cerrar"
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: 4, right: 4 }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 0.5, color: "#0b4a8b", letterSpacing: 0.2 }}
        >
          👋 ¡Hola!
        </Typography>

        <Typography variant="body2" sx={{ lineHeight: 1.45 }}>
          {typed}
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