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
import HelpTooltip from "./helpTooltip";

interface TipoTransferenciaProps {
  formData: any;
  handleChange: (e: any) => void;
  errorArchivoAdquisicion?: string;
  setErrorArchivoAdquisicion?: (msg: string) => void;
}

const TipoTransferencia: React.FC<TipoTransferenciaProps> = ({
  formData,
  handleChange,
  errorArchivoAdquisicion,
  setErrorArchivoAdquisicion,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Simulación IA
  const simulateAIValidation = (file: File) => {
    handleChange({ target: { name: "loadingAdquisicion", value: true } } as any);
    handleChange({ target: { name: "aiVisibleAdquisicion", value: true } } as any);
    handleChange({ target: { name: "aiProgressAdquisicion", value: 0 } } as any);

    const steps = [
      "Inicializando motor de validación...",
      "Analizando autenticidad del documento...",
      "Verificando datos del tipo de transferencia...",
      "Reconociendo texto y sellos digitales...",
      "Comprobando consistencia con registros oficiales...",
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

      const stepIndex = Math.min(
        Math.floor((progress / 100) * steps.length),
        steps.length - 1
      );
      if (stepIndex !== currentStep) {
        currentStep = stepIndex;
        handleChange({
          target: { name: "aiMessageAdquisicion", value: steps[currentStep] },
        } as any);
      }

      handleChange({
        target: { name: "aiProgressAdquisicion", value: progress },
      } as any);

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        handleChange({
          target: {
            name: "aiMessageAdquisicion",
            value: "Completando análisis con inteligencia artificial...",
          },
        } as any);
        handleChange({
          target: { name: "aiProgressAdquisicion", value: 100 },
        } as any);

        setTimeout(() => {
          const isValid = Math.random() > 0.05;
          handleChange({ target: { name: "loadingAdquisicion", value: false } } as any);
          handleChange({
            target: { name: "aiResultAdquisicion", value: isValid ? "valid" : "invalid" },
          } as any);
          setTimeout(() => {
            handleChange({
              target: { name: "aiVisibleAdquisicion", value: false },
            } as any);
          }, 1500);
        }, 2000);
      }
    };

    handleChange({
      target: { name: "aiMessageAdquisicion", value: steps[0] },
    } as any);
    requestAnimationFrame(animate);
  };

  // ✅ Limpia todo el archivo y estados IA
  const clearFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    handleChange({ target: { name: "docAdquisicion", value: "" } } as any);
    handleChange({ target: { name: "urlAdquisicion", value: "" } } as any);
    handleChange({ target: { name: "aiResultAdquisicion", value: "" } } as any);
    handleChange({ target: { name: "aiVisibleAdquisicion", value: false } } as any);
    handleChange({ target: { name: "aiMessageAdquisicion", value: "" } } as any);
    handleChange({ target: { name: "aiProgressAdquisicion", value: 0 } } as any);
    handleChange({ target: { name: "loadingAdquisicion", value: false } } as any);
    setErrorArchivoAdquisicion?.("");
  };

  // ✅ onChange del SELECT: si se elige vacío, borra PDF
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange(e);
    if (!value) {
      clearFile();
    }
  };

  // ✅ Manejo de carga de archivo
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorArchivoAdquisicion?.("Debe seleccionar un archivo PDF válido.");
      return;
    }

    setErrorArchivoAdquisicion?.("");
    const url = URL.createObjectURL(file);
    handleChange({ target: { name: "docAdquisicion", value: file.name } } as any);
    handleChange({ target: { name: "urlAdquisicion", value: url } } as any);
    simulateAIValidation(file);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        select
        fullWidth
        size="small"
        label={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Tipo de Transferencia
            <HelpTooltip
              text="Seleccione el tipo de transferencia realizada. Es obligatorio adjuntar el PDF que acredita el documento de transferencia."
              placement="top"
            />
          </Box>
        }
        name="tipoTransferencia"
        value={formData.tipoTransferencia || ""}
        onChange={handleSelectChange}
        InputProps={{
          endAdornment:
            formData.tipoTransferencia ? (
              <InputAdornment position="end" sx={{ mr: 1.5 }}>
                <Tooltip
                  title="Adjunte el PDF que acredita la transferencia del predio"
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
                      ml: -0.5,
                      mr: 0.5,
                    }}
                  >
                    <UploadFileIcon sx={{ fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  hidden
                />
              </InputAdornment>
            ) : undefined,
        }}
      >
        <MenuItem value="">--Seleccione--</MenuItem>
        <MenuItem value="Compra">Compra</MenuItem>
        <MenuItem value="Sucesión">Sucesión</MenuItem>
        <MenuItem value="Anticipo de Legítima">Anticipo de Legítima</MenuItem>
        <MenuItem value="Adjudicación">Adjudicación</MenuItem>
        <MenuItem value="Otros">Otros</MenuItem>
      </TextField>

      {/* Error */}
      {errorArchivoAdquisicion && (
        <Typography
          variant="caption"
          sx={{ color: "red", fontSize: "0.75rem", mt: 0.5, display: "block" }}
        >
          {errorArchivoAdquisicion}
        </Typography>
      )}

      {/* 🧠 IA */}
      {formData.aiVisibleAdquisicion && (
        <Box
          sx={{
            mt: 1,
            p: 1,
            borderRadius: 1,
            bgcolor: "#f0f8ff",
            border: "1px solid #bbdefb",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#1976d2", fontWeight: 500, display: "block", mb: 0.5 }}
          >
            🤖 {formData.aiMessageAdquisicion || "Analizando documento..."}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={formData.aiProgressAdquisicion || 0}
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
            {Math.min(formData.aiProgressAdquisicion?.toFixed(0) || 0, 100)} % completado
          </Typography>
        </Box>
      )}

      {/* ✅ Resultado */}
      {!formData.loadingAdquisicion && formData.aiResultAdquisicion === "valid" && (
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
            ✅ Archivo válido — Autenticado con inteligencia artificial
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {formData.urlAdquisicion && (
              <>
                <Link
                  href={formData.urlAdquisicion}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontSize: "0.75rem",
                    color: "#1e88e5",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Ver archivo
                </Link>
                <Link
                  component="button"
                  onClick={clearFile}
                  sx={{
                    fontSize: "0.75rem",
                    color: "#c62828",
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

      {!formData.loadingAdquisicion && formData.aiResultAdquisicion === "invalid" && (
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

export default TipoTransferencia;