import React, { useRef } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Link,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";

interface DireccionCompletaProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleReciboChange: (file: File | null) => void;
  onEditarDireccion?: () => void;
  mostrarDireccionDetallada: boolean;
  setMostrarDireccionDetallada: React.Dispatch<React.SetStateAction<boolean>>;
  errorReciboFile?: string;
}

const DireccionCompleta: React.FC<DireccionCompletaProps> = ({
  formData,
  handleChange,
  handleReciboChange,
  onEditarDireccion,
  mostrarDireccionDetallada,
  setMostrarDireccionDetallada,
  errorReciboFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🧠 Simulación IA ultra estable (idéntica a la versión funcional)
  const simulateAIValidation = (file: File) => {
    handleChange({ target: { name: "loadingRecibo", value: true } } as any);
    handleChange({ target: { name: "aiVisibleRecibo", value: true } } as any);
    handleChange({ target: { name: "aiProgressRecibo", value: 0 } } as any);

    const steps = [
      "Inicializando motor de validación...",
      "Analizando autenticidad del recibo...",
      "Verificando nombre y dirección declarada...",
      "Reconociendo texto, sellos y códigos QR...",
      "Comprobando coincidencia con registros oficiales...",
      "Aplicando modelos de inteligencia artificial...",
      "Evaluando integridad del archivo PDF...",
      "Finalizando validación con inteligencia artificial...",
    ];

    const duration = 12000; // 12 segundos
    let start: number | null = null;
    let currentStep = 0;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min((elapsed / duration) * 100, 100);

      const stepIndex = Math.min(
        Math.floor((progress / 100) * steps.length),
        steps.length - 1
      );
      if (stepIndex !== currentStep) {
        currentStep = stepIndex;
        handleChange({
          target: { name: "aiMessageRecibo", value: steps[currentStep] },
        } as any);
      }

      handleChange({
        target: { name: "aiProgressRecibo", value: progress },
      } as any);

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Mantener visible 2 segundos al 100%
        handleChange({
          target: {
            name: "aiMessageRecibo",
            value: "Completando análisis con inteligencia artificial...",
          },
        } as any);
        handleChange({
          target: { name: "aiProgressRecibo", value: 100 },
        } as any);

        setTimeout(() => {
          const isValid = Math.random() > 0.05;
          handleChange({ target: { name: "loadingRecibo", value: false } } as any);
          handleChange({
            target: { name: "aiResultRecibo", value: isValid ? "valid" : "invalid" },
          } as any);

          // Mantener visible 1.5 s más antes de ocultar
          setTimeout(() => {
            handleChange({
              target: { name: "aiVisibleRecibo", value: false },
            } as any);
          }, 1500);
        }, 2000);
      }
    };

    handleChange({
      target: { name: "aiMessageRecibo", value: steps[0] },
    } as any);

    requestAnimationFrame(animate);
  };

  // 📤 Subida de archivo
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    handleReciboChange(uploaded);

    if (uploaded && uploaded.type === "application/pdf") {

      handleChange({ target: { name: "aiResultRecibo", value: "" } } as any);
      handleChange({ target: { name: "aiMessageRecibo", value: "" } } as any);
      handleChange({ target: { name: "aiProgressRecibo", value: 0 } } as any);
      handleChange({ target: { name: "aiVisibleRecibo", value: false } } as any);

      simulateAIValidation(uploaded);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        size="small"
        label="Dirección Completa"
        name="direccionCompleta"
        value={formData.direccionCompleta || ""}
        onChange={handleChange}
        placeholder="Ej. Av. Los Próceres 123, San Isidro"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ gap: 1 }}>
              {/* ✏️ Editar dirección */}
              <Tooltip title="Editar dirección" arrow>
                <IconButton
                  color="primary"
                  onClick={() => setMostrarDireccionDetallada((prev) => !prev)}
                  edge="end"
                  sx={{
                    color: mostrarDireccionDetallada ? "#1976d2" : "default",
                    "&:hover": { color: "#004c99" },
                    width: 36,
                    height: 36,
                  }}
                >
                  <EditIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>

              {/* 📄 Subir archivo */}
              <Tooltip title="Debe subir el PDF de un recibo de agua o luz que acredite la dirección fiscal." arrow>
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
        disabled
      />

      {/* ❌ Error */}
      {errorReciboFile && (
        <Typography
          variant="caption"
          sx={{ color: "red", fontSize: "0.75rem", mt: 0.5 }}
        >
          {errorReciboFile}
        </Typography>
      )}

      {/* 🤖 Proceso de validación IA */}
    {formData.aiVisibleRecibo && (
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
      🤖 {formData.aiMessageRecibo || "Analizando autenticidad del documento..."}
    </Typography>

    <LinearProgress
      variant="determinate"
      value={formData.aiProgressRecibo || 0}
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
      {Math.min(formData.aiProgressRecibo?.toFixed(0) || 0, 100)} % completado
    </Typography>
  </Box>
)}
      {/* ✅ Archivo válido */}
      {!formData.loadingRecibo &&
        formData.aiResultRecibo === "valid" &&
        (formData.reciboServicio || formData.urlRecibo) && (
          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#2e7d32", fontWeight: 500 }}
            >
              ✅ Archivo válido — <span style={{ color: "#555", fontStyle: "italic", marginLeft: 4 }}>
              (Autenticado con inteligencia artificial)
            </span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  {formData.urlRecibo && (
    <>
      <Link
        href={formData.urlRecibo}
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

      <Link
        component="button"
        onClick={() => {
          handleChange({ target: { name: "docRecibo", value: "" } } as any);
          handleChange({ target: { name: "urlRecibo", value: "" } } as any);
          handleChange({ target: { name: "aiResultRecibo", value: "" } } as any);
          handleChange({ target: { name: "aiVisibleRecibo", value: false } } as any);
          handleChange({ target: { name: "aiMessageRecibo", value: "" } } as any);
          handleChange({ target: { name: "aiProgressRecibo", value: 0 } } as any);
          handleChange({ target: { name: "loadingRecibo", value: false } } as any);
        }}
        sx={{
          fontSize: "0.75rem",
          color: "#c62828",
          textDecoration: "none",
          fontWeight: 400,
          "&:hover": { textDecoration: "underline", color: "#b71c1c" },
        }}
      >
        ❌ Quitar archivo
      </Link>
    </>
  )}
</Box>
          </Box>
        )}
    </Box>
  );
};

export default DireccionCompleta;