// src/components/Paso1/CondicionEspecial.tsx
import React, { useRef } from "react";
import {
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Link,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { SelectChangeEvent } from "@mui/material/Select";

interface CondicionEspecialProps {
  formData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SelectChangeEvent<string>
  ) => void;
  handleFileChange: (file: File | null) => void;
  errorCondicionFile?: string;
}

const CondicionEspecial: React.FC<CondicionEspecialProps> = ({
  formData,
  handleChange,
  handleFileChange,
  errorCondicionFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

// 🧠 Simulación IA ultra estable con 100% visible y transiciones suaves (~12 s)
const simulateAIValidation = (file: File, tipo: "Condicion" | "Recibo") => {
  handleChange({ target: { name: `loading${tipo}`, value: true } } as any);
  handleChange({ target: { name: `aiVisible${tipo}`, value: true } } as any); // 👈 fuerza visibilidad
  handleChange({ target: { name: `aiProgress${tipo}`, value: 0 } } as any);

  const steps =
    tipo === "Condicion"
      ? [
          "Inicializando motor de validación...",
          "Analizando autenticidad del documento...",
          "Verificando consistencia de los datos declarados...",
          "Reconociendo texto y sellos digitales...",
          "Comprobando coincidencia con registros oficiales...",
          "Aplicando modelos de inteligencia artificial...",
          "Evaluando integridad del archivo PDF...",
          "Finalizando validación con inteligencia artificial...",
        ]
      : [
          "Inicializando motor de validación...",
          "Analizando autenticidad del recibo...",
          "Verificando nombre y dirección declarada...",
          "Reconociendo texto, sellos y códigos QR...",
          "Comprobando coincidencia con registros oficiales...",
          "Aplicando modelos de inteligencia artificial...",
          "Evaluando integridad del archivo PDF...",
          "Finalizando validación con inteligencia artificial...",
        ];

  const duration = 12000;
  let start: number | null = null;
  let currentStep = 0;

  const animate = (timestamp: number) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min((elapsed / duration) * 100, 100);

    // Actualiza mensaje progresivamente
    const stepIndex = Math.min(
      Math.floor((progress / 100) * steps.length),
      steps.length - 1
    );
    if (stepIndex !== currentStep) {
      currentStep = stepIndex;
      handleChange({
        target: { name: `aiMessage${tipo}`, value: steps[currentStep] },
      } as any);
    }

    // Actualiza progreso
    handleChange({
      target: { name: `aiProgress${tipo}`, value: progress },
    } as any);

    if (progress < 100) {
      requestAnimationFrame(animate);
    } else {
      // Muestra el 100% durante 2 segundos antes del resultado final
      handleChange({
        target: {
          name: `aiMessage${tipo}`,
          value: "Completando análisis con inteligencia artificial...",
        },
      } as any);
      handleChange({
        target: { name: `aiProgress${tipo}`, value: 100 },
      } as any);

      setTimeout(() => {
        const isValid = Math.random() > 0.05; // 95% éxito
        handleChange({
          target: { name: `loading${tipo}`, value: false },
        } as any);
        handleChange({
          target: { name: `aiResult${tipo}`, value: isValid ? "valid" : "invalid" },
        } as any);

        // 👇 Mantiene visible el recuadro 1.5 s más
        setTimeout(() => {
          handleChange({
            target: { name: `aiVisible${tipo}`, value: false },
          } as any);
        }, 1500);
      }, 2000);
    }
  };

  // Estado inicial
  handleChange({
    target: { name: `aiMessage${tipo}`, value: steps[0] },
  } as any);
  requestAnimationFrame(animate);
};


  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    handleFileChange(uploaded);
    if (uploaded && uploaded.type === "application/pdf") {

      handleChange({ target: { name: "aiResultCondicion", value: "" } } as any);
      handleChange({ target: { name: "aiMessageCondicion", value: "" } } as any);
      handleChange({ target: { name: "aiProgressCondicion", value: 0 } } as any);
      handleChange({ target: { name: "aiVisibleCondicion", value: false } } as any);


      simulateAIValidation(uploaded, "Condicion");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* ======= Campo principal ======= */}
      <TextField
        select
        fullWidth
        size="small"
        label="Condición especial del contribuyente"
        name="tipoCondicion"
        value={formData.tipoCondicion || ""}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title="Si escoge una condición especial debe adjuntar el PDF que acredite la condición del contribuyente."
                arrow
              >
                <IconButton
                  color="success"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    bgcolor: "rgba(76,175,80,0.08)",
                    "&:hover": { bgcolor: "rgba(76,175,80,0.2)" },
                    width: 36,
                    height: 36,
                  }}
                >
                  <UploadFileIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </Tooltip>
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={onUpload}
                hidden
              />
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value="">Ninguno</MenuItem>
        <MenuItem value="conadis">CONADIS</MenuItem>
        <MenuItem value="pensionista">Pensionista</MenuItem>
        <MenuItem value="adultoMayor">Adulto Mayor No Pensionista</MenuItem>
      </TextField>

      {/* ======= Error ======= */}
      {errorCondicionFile && (
        <Typography
          variant="caption"
          sx={{ color: "red", fontSize: "0.75rem", mt: 0.5 }}
        >
          {errorCondicionFile}
        </Typography>
      )}

{formData.aiVisibleCondicion && (
  <Box
    sx={{
      mt: 1,
      p: 1,
      borderRadius: 1,
      bgcolor: "#f0f8ff",
      border: "1px solid #bbdefb",
      textAlign: "center",
      transition: "all 0.3s ease",
      opacity: 1,
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: "#1976d2",
        fontWeight: 500,
        display: "block",
        mb: 0.5,
      }}
    >
      🤖 {formData.aiMessageCondicion || "Analizando autenticidad del documento..."}
    </Typography>

    <LinearProgress
      variant="determinate"
      value={formData.aiProgressCondicion || 0}
      sx={{
        height: 5,
        borderRadius: 3,
        bgcolor: "#e3f2fd",
        "& .MuiLinearProgress-bar": {
          background: "linear-gradient(90deg,#42a5f5,#1e88e5)",
        },
      }}
    />
    <Typography
      variant="caption"
      sx={{
        color: "#0d47a1",
        fontSize: "0.7rem",
        fontWeight: 500,
        mt: 0.3,
      }}
    >
      {Math.min(formData.aiProgressCondicion?.toFixed(0) || 0, 100)} % completado
    </Typography>
  </Box>
)}
      {/* ======= Resultado ======= */}
      {!formData.loadingCondicion && formData.aiResultCondicion === "valid" && (
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#2e7d32", fontWeight: 500, display: "flex", alignItems: "center" }}
          >
            ✅ Archivo válido - {" "}
            <span style={{ color: "#555", fontStyle: "italic", marginLeft: 4 }}>
              (Autenticado con inteligencia artificial)
            </span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  {formData.urlCondicion && (
    <Link
      href={formData.urlCondicion}
      target="_blank"
      rel="noopener"
      sx={{
          fontSize: "0.75rem",
          color: "#1e88e5",
          textDecoration: "none",
          fontWeight: 400,
          "&:hover": { textDecoration: "underline" },
        }}
    >
      Ver archivo
    </Link>
  )}
  <Link
        component="button"
    sx={{
          fontSize: "0.75rem",
          color: "#c62828",
          textDecoration: "none",
          fontWeight: 400,
          "&:hover": { textDecoration: "underline", color: "#b71c1c" },
        }}
    onClick={() => {
      handleChange({ target: { name: "docCondicion", value: "" } } as any);
      handleChange({ target: { name: "urlCondicion", value: "" } } as any);
      handleChange({ target: { name: "aiResultCondicion", value: "" } } as any);
      handleChange({ target: { name: "aiVisibleCondicion", value: false } } as any);
      handleChange({ target: { name: "aiMessageCondicion", value: "" } } as any);
      handleChange({ target: { name: "aiProgressCondicion", value: 0 } } as any);
      handleChange({ target: { name: "loadingCondicion", value: false } } as any);
    }}
  >
    ❌ Quitar archivo
  </Link>
</Box>
        </Box>
      )}

      {!formData.loadingCondicion && formData.aiResultCondicion === "invalid" && (
        <Typography
          variant="caption"
          sx={{ color: "#d32f2f", fontWeight: 500, display: "block", mt: 1 }}
        >
          ❌ Documento rechazado — No coincide con los datos declarados.
        </Typography>
      )}
    </Box>
  );
};

export default CondicionEspecial;