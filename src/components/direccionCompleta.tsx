import React, { useRef } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Link,
  Tooltip,
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
  errorReciboFile?: string; // ✅ nuevo prop opcional
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

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    handleReciboChange(uploaded);
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
              <Tooltip title="Debe agregar el archivo de un recibo de servicio de agua o luz que acredite la dirección fiscal" arrow>
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
      />

      {/* ❌ Error rojo */}
      {errorReciboFile && (
        <Typography
          variant="caption"
          sx={{ color: "red", fontSize: "0.75rem", mt: 0.5 }}
        >
          {errorReciboFile}
        </Typography>
      )}

      {/* 🕒 Estado de carga */}
      {formData.loadingRecibo && (
        <Typography
          variant="caption"
          sx={{ color: "#1976d2", fontStyle: "italic", mt: 0.8, display: "block" }}
        >
          ⏳ Procesando validación de PDF…
        </Typography>
      )}

      {/* ✅ Archivo válido */}
      {!formData.loadingRecibo && (formData.reciboServicio || formData.urlRecibo) && (
        <Box
          sx={{
            mt: 0.8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="caption" sx={{ color: "#2e7d32", fontWeight: 500 }}>
            ✅ Archivo válido — Nro Folios: 1
          </Typography>
          {formData.urlRecibo && (
            <Link
              href={formData.urlRecibo}
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
          )}
        </Box>
      )}
      
    </Box>
  );
};

export default DireccionCompleta;