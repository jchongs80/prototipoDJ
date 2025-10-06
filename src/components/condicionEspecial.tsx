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
}

const CondicionEspecial: React.FC<CondicionEspecialProps> = ({
  formData,
  handleChange,
  handleFileChange,
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
              <IconButton
                color="success"
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  bgcolor: "rgba(76,175,80,0.08)",
                  "&:hover": { bgcolor: "rgba(76,175,80,0.2)" },
                }}
              >
                <UploadFileIcon />
              </IconButton>
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

      {(formData.docCondicion || formData.urlCondicion) && (
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