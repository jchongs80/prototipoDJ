import React, { useRef } from "react";
import {
  TextField,
  MenuItem,
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

  // ✅ Simulación IA (igual que antes)
  const simulateAIValidation = (file: File) => {
    handleChange({
      target: { name: "loadingAdquisicion", value: true },
    } as any);
    handleChange({
      target: { name: "aiVisibleAdquisicion", value: true },
    } as any);
    handleChange({
      target: { name: "aiProgressAdquisicion", value: 0 },
    } as any);

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
          target: {
            name: "aiMessageAdquisicion",
            value: steps[currentStep],
          },
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
          handleChange({
            target: { name: "loadingAdquisicion", value: false },
          } as any);
          handleChange({
            target: {
              name: "aiResultAdquisicion",
              value: isValid ? "valid" : "invalid",
            },
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
    handleChange({
      target: { name: "aiResultAdquisicion", value: "" },
    } as any);
    handleChange({
      target: { name: "aiVisibleAdquisicion", value: false },
    } as any);
    handleChange({
      target: { name: "aiMessageAdquisicion", value: "" },
    } as any);
    handleChange({
      target: { name: "aiProgressAdquisicion", value: 0 },
    } as any);
    handleChange({
      target: { name: "loadingAdquisicion", value: false },
    } as any);
    setErrorArchivoAdquisicion?.("");
  };

  // ✅ onChange del SELECT
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange(e);

    // Si se deja vacío, limpiar todo
    if (!value) {
      clearFile();
    }
  };

  // ✅ Manejo de carga de archivo (igual que antes, pero activado desde la caja)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorArchivoAdquisicion?.("Debe seleccionar un archivo PDF válido.");
      return;
    }

    setErrorArchivoAdquisicion?.("");
    const url = URL.createObjectURL(file);
    handleChange({
      target: { name: "docAdquisicion", value: file.name },
    } as any);
    handleChange({
      target: { name: "urlAdquisicion", value: url },
    } as any);
    simulateAIValidation(file);
  };

  const tieneTipoTransferencia = !!formData.tipoTransferencia;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Texto superior de ayuda */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: "#003366",
          mb: 0.3,
        }}
      >
        ¿Qué tipo de transferencia realizaste para adquirir este predio?
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mb: 1.2,
        }}
      >
        Selecciona la opción según tu documento (compra, sucesión, anticipo, etc.).
        Es obligatorio adjuntar el PDF que acredita la transferencia.
      </Typography>

      {/* SELECT principal (sin botón incrustado) */}
      <TextField
        select
        fullWidth
        size="small"
        label={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Tipo de Transferencia
            <HelpTooltip
              text="Seleccione el tipo de transferencia realizada. Deberá adjuntar el PDF del documento (escritura, minuta, sucesión, adjudicación, etc.)"
              placement="top"
            />
          </Box>
        }
        name="tipoTransferencia"
        value={formData.tipoTransferencia || ""} // ⬅️ si no hay valor, queda vacío (no hay opción por defecto)
        onChange={handleSelectChange}
      >
        <MenuItem value="">--Seleccione--</MenuItem>
        <MenuItem value="Compra">Compra</MenuItem>
        <MenuItem value="Sucesión">Sucesión</MenuItem>
        <MenuItem value="Anticipo de Legítima">Anticipo de Legítima</MenuItem>
        <MenuItem value="Adjudicación">Adjudicación</MenuItem>
        <MenuItem value="Otros">Otros</MenuItem>
      </TextField>

      {/* Caja de carga de archivo — solo cuando ya se seleccionó tipo de transferencia */}
      {tieneTipoTransferencia && (
        <>
          <Box
            sx={{
              mt: 2,
              p: 1.8,
              borderRadius: 2,
              border: "1px dashed #90caf9",
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#bbdefb",
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <UploadFileIcon sx={{ fontSize: 28, color: "#1976d2" }} />
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#0d47a1" }}
                >
                  Adjuntar documento de transferencia (PDF)
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                >
                  Haz clic aquí para seleccionar el archivo desde tu computadora.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{
                  color: formData.docAdquisicion ? "#2e7d32" : "#666",
                  fontWeight: formData.docAdquisicion ? 500 : 400,
                  maxWidth: 220,
                  display: "block",
                  wordBreak: "break-all",
                }}
              >
                {formData.docAdquisicion
                  ? formData.docAdquisicion
                  : "Ningún archivo seleccionado"}
              </Typography>
            </Box>
          </Box>

          {/* input file oculto */}
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleUpload}
            hidden
          />

          {/* Error de archivo */}
          {errorArchivoAdquisicion && (
            <Typography
              variant="caption"
              sx={{
                color: "red",
                fontSize: "0.75rem",
                mt: 0.5,
                display: "block",
              }}
            >
              {errorArchivoAdquisicion}
            </Typography>
          )}

          {/* Requisitos / explicación */}
          <Box
            sx={{
              mt: 1.5,
              p: 1.2,
              borderRadius: 1.5,
              bgcolor: "#fffde7",
              border: "1px solid #fff59d",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#795548", fontWeight: 500, display: "block" }}
            >
              Requisitos del documento de transferencia:
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#5d4037", display: "block", mt: 0.5 }}
            >
              • Debe ser un documento que acredite la transferencia del predio
              (escritura, minuta, sucesión, adjudicación, etc.). <br />
              • El archivo debe estar en formato PDF y ser legible. <br />
              • Los datos del documento deben coincidir con lo declarado en la
              declaración jurada.
            </Typography>
          </Box>
        </>
      )}

      {/* 🧠 IA */}
      {formData.aiVisibleAdquisicion && (
        <Box
          sx={{
            mt: 1.5,
            p: 1,
            borderRadius: 1,
            bgcolor: "#f0f8ff",
            border: "1px solid #bbdefb",
            textAlign: "center",
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
            🤖{" "}
            {formData.aiMessageAdquisicion ||
              "Analizando autenticidad del documento..."}
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
            {Math.min(
              Number(formData.aiProgressAdquisicion?.toFixed?.(0) || 0),
              100
            )}{" "}
            % completado
          </Typography>
        </Box>
      )}

      {/* ✅ Resultado válido */}
      {!formData.loadingAdquisicion &&
        formData.aiResultAdquisicion === "valid" && (
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
              sx={{
                color: "#2e7d32",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
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
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#b71c1c",
                      },
                    }}
                  >
                    ❌ Quitar archivo
                  </Link>
                </>
              )}
            </Box>
          </Box>
        )}

      {/* ❌ Resultado inválido */}
      {!formData.loadingAdquisicion &&
        formData.aiResultAdquisicion === "invalid" && (
          <Typography
            variant="caption"
            sx={{
              color: "#d32f2f",
              fontWeight: 500,
              display: "block",
              mt: 1,
            }}
          >
            ❌ Documento rechazado — No coincide con los datos declarados.
          </Typography>
        )}
    </Box>
  );
};

export default TipoTransferencia;