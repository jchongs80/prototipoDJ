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
  error?: boolean;
  helperText?: string;
}

/** 💬 Explicaciones ciudadanas (sin tecnicismos) */
const getDescripcionCiudadana = (labelCampo: string, value: string): string => {
  const tipo = labelCampo.toLowerCase();

  if (tipo.includes("muros")) {
    switch (value) {
      case "A":
        return "Tu vivienda tiene paredes firmes de concreto o ladrillo bien reforzado, seguras ante sismos y de larga duración.";
      case "B":
        return "Paredes de ladrillo o bloque, sólidas y comunes en viviendas familiares.";
      case "C":
        return "Paredes de adobe grueso o ladrillo con refuerzo básico, estables pero requieren mantenimiento.";
      case "D":
        return "Paredes de madera o quincha, más livianas y económicas, pero menos resistentes.";
      case "E":
        return "Paredes de adobe o materiales antiguos que pueden agrietarse con el tiempo.";
      case "F":
        return "Paredes rústicas hechas con caña o estera, sin base sólida.";
      case "G":
        return "No tiene muros firmes ni columnas definidas, es una estructura muy básica.";
      default:
        return "Selecciona el tipo de muro o columna que mejor describa tu vivienda.";
    }
  }

  if (tipo.includes("techo")) {
    switch (value) {
      case "A":
        return "Techo de concreto fuerte y seguro, ideal para colocar otro piso encima.";
      case "B":
        return "Techo de concreto con ligera inclinación para que el agua escurra mejor.";
      case "C":
        return "Techo plano y firme de concreto, común en casas familiares.";
      case "D":
        return "Techo de calamina o planchas livianas sobre estructura metálica o de madera.";
      case "E":
        return "Techo de policarbonato o madera liviana, usado en patios o zonas ventiladas.";
      case "F":
        return "Techo con tejas o calamina sobre madera, clásico en viviendas tradicionales.";
      case "G":
        return "Techo rústico de caña, madera o barro que requiere cuidado frecuente.";
      case "H":
        return "La construcción no cuenta con techo o está en proceso de colocarlo.";
      default:
        return "Selecciona el tipo de techo que mejor describa tu vivienda.";
    }
  }

  if (tipo.includes("puerta") || tipo.includes("ventana")) {
    switch (value) {
      case "A":
        return "Puertas y ventanas de buena calidad, de madera o metal con acabados finos.";
      case "B":
        return "Puertas y ventanas comunes, seguras y en buen estado.";
      case "C":
        return "Puertas o ventanas básicas, de triplay o material liviano.";
      case "D":
        return "Puertas o ventanas incompletas o deterioradas, pero aún funcionales.";
      case "E":
        return "La vivienda no tiene puertas ni ventanas instaladas todavía.";
      default:
        return "Selecciona el tipo de puertas y ventanas que tiene tu vivienda.";
    }
  }

  return "Selecciona una opción para ver su explicación.";
};

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
  const descripcionTooltip = selected
    ? getDescripcionCiudadana(label, selected.value)
    : "Selecciona un valor para conocer su explicación.";

  return (
    <Box>
      <Tooltip
        title={descripcionTooltip}
        arrow
        placement="top-start"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#1565c0", // Azul SAT institucional
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 400,
              p: 1,
              borderRadius: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              maxWidth: 280,
              lineHeight: 1.4,
            },
          },
          arrow: {
            sx: { color: "#1565c0" },
          },
        }}
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
              error={error}
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
                flexDirection: "row",
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
                  textAlign: "left",
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
            "& .MuiInputLabel-root": { fontSize: "1rem" },
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default SelectConstruccion;