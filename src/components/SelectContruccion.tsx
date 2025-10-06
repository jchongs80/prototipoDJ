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
}

const SelectConstruccion: React.FC<SelectConstruccionProps> = ({
  label,
  value,
  opciones,
  onChange,
}) => {
  const theme = useTheme();
  const selected = opciones.find((o) => o.value === value) || null;

  return (
    <Tooltip
      title={selected ? selected.label : ""}
      placement="top-start"
      arrow
      disableInteractive
    >
      <Box>
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
            />
          )}
          renderOption={(props, option) => (
            <Tooltip
              title={option.label}
              placement="right"
              arrow
              disableInteractive
            >
              <Box
                component="li"
                {...props}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: 1,
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
                  }}
                >
                  {option.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.75rem",
                    color: "#555",
                    lineHeight: 1.3,
                    whiteSpace: "normal",
                  }}
                >
                  {option.label}
                </Typography>
              </Box>
            </Tooltip>
          )}
          sx={{
            "& .MuiAutocomplete-inputRoot": { fontSize: "0.85rem" },
            "& .MuiInputLabel-root": { fontSize: "0.85rem" },
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default SelectConstruccion;