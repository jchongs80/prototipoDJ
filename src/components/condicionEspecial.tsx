import React, { useRef } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  Box,
  Link,
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

  // ====== Simulación IA (igual lógica que antes, solo para PENSIONISTA) ======
  const simulateAIValidation = (file: File, tipo: "Condicion" | "Recibo") => {
    handleChange({ target: { name: `loading${tipo}`, value: true } } as any);
    handleChange({ target: { name: `aiVisible${tipo}`, value: true } } as any);
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

      handleChange({
        target: { name: `aiProgress${tipo}`, value: progress },
      } as any);

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
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
          const isValid = Math.random() > 0.05;
          handleChange({
            target: { name: `loading${tipo}`, value: false },
          } as any);
          handleChange({
            target: {
              name: `aiResult${tipo}`,
              value: isValid ? "valid" : "invalid",
            },
          } as any);

          setTimeout(() => {
            handleChange({
              target: { name: `aiVisible${tipo}`, value: false },
            } as any);
          }, 1500);
        }, 2000);
      }
    };

    handleChange({
      target: { name: `aiMessage${tipo}`, value: steps[0] },
    } as any);
    requestAnimationFrame(animate);
  };

  // ====== Limpia completamente el archivo y estados IA (para cuando deja de ser Pensionista) ======
  const clearCondicionFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    handleFileChange(null);
    handleChange({ target: { name: "docCondicion", value: "" } } as any);
    handleChange({ target: { name: "urlCondicion", value: "" } } as any);
    handleChange({ target: { name: "aiResultCondicion", value: "" } } as any);
    handleChange({ target: { name: "aiVisibleCondicion", value: false } } as any);
    handleChange({ target: { name: "aiMessageCondicion", value: "" } } as any);
    handleChange({ target: { name: "aiProgressCondicion", value: 0 } } as any);
    handleChange({ target: { name: "loadingCondicion", value: false } } as any);
  };

  // ====== Cambio del SELECT ======
  const handleSelectChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SelectChangeEvent<string>
  ) => {
    const value = (e as SelectChangeEvent<string>).target.value as string;
    handleChange(e as any);

    // Si deja de ser Pensionista, se limpia archivo y IA
    if (value !== "pensionista") {
      clearCondicionFile();
    }
  };

  // ====== Carga del archivo (solo Pensionista) ======
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    handleFileChange(uploaded);

    if (uploaded && uploaded.type === "application/pdf") {
      handleChange({
        target: { name: "docCondicion", value: uploaded.name },
      } as any);
      handleChange({
        target: { name: "aiResultCondicion", value: "" },
      } as any);
      handleChange({
        target: { name: "aiMessageCondicion", value: "" },
      } as any);
      handleChange({
        target: { name: "aiProgressCondicion", value: 0 },
      } as any);
      handleChange({
        target: { name: "aiVisibleCondicion", value: false },
      } as any);
      simulateAIValidation(uploaded, "Condicion");
    }
  };

  const esPensionista = formData.tipoCondicion === "pensionista";
  const esAdultoMayorNoPensionista =
    formData.tipoCondicion === "adultoMayorNoPensionista";

  return (
    <Box sx={{ width: "100%" }}>
      {/* 🔹 TEXTO SUPERIOR DE AYUDA */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: "#003366",
          mb: 0.3,
        }}
      >
        ¿Deseas solicitar un beneficio por condición especial?
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mb: 1.2,
        }}
      >
        Si no te corresponde alguno, deja la opción “Ninguna”.
      </Typography>
      {/* SELECT principal */}
      <TextField
        select
        fullWidth
        size="small"
        label="Condición especial del contribuyente"
        name="tipoCondicion"
        value={formData.tipoCondicion || ""}
        onChange={handleSelectChange}
      >
        <MenuItem value="">
          Ninguna – No solicito beneficio especial
        </MenuItem>
        <MenuItem value="pensionista">
          Soy Pensionista que vive en el predio
        </MenuItem>
        <MenuItem value="adultoMayorNoPensionista">
          Soy Adulto mayor (60+) no pensionista que vive en el predio
        </MenuItem>
      </TextField>

      {/* Requisitos para Pensionista */}
      {esPensionista && (
        <>
          {/* Zona de upload muy visible */}
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
                  Adjuntar constancia de pensionista (PDF)
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
                  color: formData.docCondicion ? "#2e7d32" : "#666",
                  fontWeight: formData.docCondicion ? 500 : 400,
                  maxWidth: 220,
                  display: "block",
                  wordBreak: "break-all",
                }}
              >
                {formData.docCondicion
                  ? formData.docCondicion
                  : "Ningún archivo seleccionado"}
              </Typography>
            </Box>
          </Box>

          {/* input file oculto */}
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={onUpload}
            hidden
          />

          {/* Error solo cuando es Pensionista */}
          {errorCondicionFile && (
            <Typography
              variant="caption"
              sx={{ color: "red", fontSize: "0.75rem", mt: 0.5 }}
            >
              {errorCondicionFile}
            </Typography>
          )}

          {/* Requisitos Pensionista */}
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
              Requisitos para el beneficio como pensionista:
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#5d4037", display: "block", mt: 0.5 }}
            >
              • Tener un documento que acredite tu condición de pensionista.
              <br />
              • Tener solo un predio en todo el Perú.
              <br />
              • Que tus ingresos no superen 1 UIT.
              <br />
              • Vivir en el predio que estás declarando.
            </Typography>
          </Box>
        </>
      )}

      {/* Requisitos Adulto Mayor no pensionista */}
      {esAdultoMayorNoPensionista && (
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
            Requisitos para el beneficio como adulto mayor no pensionista:
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#5d4037", display: "block", mt: 0.5 }}
          >
            • Tener 60 años o más.
            <br />
            • Tener solo un predio en todo el Perú.
            <br />
            • Que tus ingresos no superen 1 UIT.
            <br />
            • Vivir en el predio que estás declarando.
          </Typography>
        </Box>
      )}

      {/* Progreso IA (solo se muestra cuando es Pensionista y está visible) */}
      {esPensionista && formData.aiVisibleCondicion && (
        <Box
          sx={{
            mt: 1.5,
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
            🤖{" "}
            {formData.aiMessageCondicion ||
              "Analizando autenticidad del documento..."}
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
            {Math.min(
              Number(formData.aiProgressCondicion?.toFixed?.(0) || 0),
              100
            )}{" "}
            % completado
          </Typography>
        </Box>
      )}

      {/* Resultado válido */}
      {esPensionista &&
        !formData.loadingCondicion &&
        formData.aiResultCondicion === "valid" && (
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
              ✅ Archivo válido -{" "}
              <span
                style={{
                  color: "#555",
                  fontStyle: "italic",
                  marginLeft: 4,
                }}
              >
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
                onClick={clearCondicionFile}
              >
                ❌ Quitar archivo
              </Link>
            </Box>
          </Box>
        )}

      {/* Resultado inválido */}
      {esPensionista &&
        !formData.loadingCondicion &&
        formData.aiResultCondicion === "invalid" && (
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