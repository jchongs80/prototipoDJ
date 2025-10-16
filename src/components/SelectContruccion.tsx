import React from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";

interface OpcionMaterial {
  value: string;
  label: string;
}

interface SelectConstruccionProps {
  label: string;
  value: string;
  opciones: OpcionMaterial[];
  onChange: (value: string) => void;
  error?: boolean; // ✅ Nuevo: estado de error
  helperText?: string; // ✅ Nuevo: texto de ayuda o error
}

const SelectConstruccion: React.FC<SelectConstruccionProps> = ({
  label,
  value,
  opciones,
  onChange,
  error = false,
  helperText = "",
}) => {
  const theme = useTheme();
  const selected = opciones.find((o) => o.value === value) || null;

  return (
    <Box>
      <Tooltip
        title={selected ? selected.label : ""}
        placement="top-start"
        arrow
        disableInteractive
      >
        <Autocomplete
          options={opciones}
          value={selected}
          onChange={(_, newValue) => onChange(newValue ? newValue.value : "")}
          getOptionLabel={(option) =>
            option ? `${option.value} - ${option.label}` : ""
          }
          isOptionEqualToValue={(option, val) => option.value === val.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              size="small"
              fullWidth
              variant="outlined"
              error={error} // ✅ Aplica el error visual
              helperText={error ? helperText : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: error ? "#d32f2f" : "" },
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                flexDirection: "row", // ✅ Muestra valor y descripción en una fila
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1.5,
                p: "6px 10px",
                borderBottom: "1px solid #f0f0f0",
                "&:hover": { bgcolor: "#f9f9f9" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: theme.palette.primary.main,
                  width: "24px",
                  textAlign: "left", // ✅ Alineado a la izquierda
                }}
              >
                {option.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.8rem",
                  color: "#333",
                  lineHeight: 1.4,
                  whiteSpace: "normal",
                  textAlign: "left",
                }}
              >
                {option.label}
              </Typography>
            </Box>
          )}
          sx={{
            "& .MuiAutocomplete-inputRoot": { fontSize: "0.85rem" },
            "& .MuiInputLabel-root": { fontSize: "0.85rem" },
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default SelectConstruccion;