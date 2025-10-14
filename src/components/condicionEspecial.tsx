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
  errorCondicionFile?: string; // ✅ nuevo prop opcional
}

const CondicionEspecial: React.FC<CondicionEspecialProps> = ({
  formData,
  handleChange,
  handleFileChange,
  errorCondicionFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    handleFileChange(uploaded);
  };

  return (
    <Box sx={{ width: "100%" }}>
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

      {/* ✅ Mensaje de error rojo */}
      {errorCondicionFile && (
        <Typography
          variant="caption"
          sx={{ color: "red", fontSize: "0.75rem", mt: 0.5 }}
        >
          {errorCondicionFile}
        </Typography>
      )}

      {/* 🕒 Estado de carga */}
      {formData.loadingCondicion && (
        <Typography
          variant="caption"
          sx={{ color: "#1976d2", fontStyle: "italic", mt: 0.8, display: "block" }}
        >
          ⏳ Procesando validación de PDF…
        </Typography>
      )}

    {/* ✅ Archivo válido */}
    {!formData.loadingCondicion && (formData.docCondicion || formData.urlCondicion) && (
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
          ✅ Archivo válido — Nro Folios: 2
        </Typography>
        {formData.urlCondicion && (
          <Link
            href={formData.urlCondicion}
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

export default CondicionEspecial;