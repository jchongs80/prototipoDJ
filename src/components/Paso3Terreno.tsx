import React from "react";
import { Box, Paper, Typography, TextField, InputAdornment } from "@mui/material";
import HelpTooltip from "../components/helpTooltip";

// ⬇️ Ajusta las rutas a tus íconos anteriores
import iconDatos from "./../assets/medicion_casa.png";
import iconArea  from "./../assets/medida.png";
import iconValor from "./../assets/comprar-casa.png";
import InfoCallout from "../components/InfoCallout"; // ✅ se mantiene el InfoCallout

type Props = {
  formData: {
    areaMatriz?: number | string | null;
    porcentajeBienComun?: number | string | null;
    frontis?: number | string | null;
    areaPropia?: number | string | null;
    areaComun?: number | string | null;
    areaTotal?: number | string | null;
    valorArancelario?: number | string | null;
    valorTotalTerreno?: number | string | null;
  };
  handleChange?: (e: any) => void; // <- opcional
};

// === Paleta / estilos consistentes ===
const COLOR_LABEL = "#1976d2";      // Azul SAT para títulos/labels
const COLOR_VALUE = "#0a0a0a";      // Texto de valor (alto contraste)
const COLOR_BORDER = "#b0c8e8";     // Borde base
const COLOR_BORDER_HOVER = "#1a73e8";
const BG_PANEL = "#f9fbff";         // Fondo paneles
const BG_CARD = "#ffffff";

// Fuerza lectura nítida en TextField disabled
const valueInputSx = {
  fontSize: "1rem",
  fontWeight: 700,
  color: COLOR_VALUE,
  backgroundColor: BG_CARD,
  borderRadius: 1,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: COLOR_BORDER },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: COLOR_BORDER_HOVER },
  "& input.Mui-disabled": { WebkitTextFillColor: COLOR_VALUE as any },
};

const labelSx = {
  color: COLOR_LABEL,
  fontWeight: 700,
  mb: 1,
  display: "flex",
  alignItems: "center",
  gap: 1,
} as const;

// Devuelve string con decimales visibles. Si no hay dato -> "0.00"
const toFixedStr = (v: any, decimals = 2) => {
  if (v === null || v === undefined || v === "") return (0).toFixed(decimals);
  const n = Number(v);
  if (!Number.isFinite(n)) return (0).toFixed(decimals);
  return n.toFixed(decimals);
};

const Paso3Terreno: React.FC<Props> = ({ formData }) => {
  return (
    <Box sx={{ mt: 1 }}>

      {/* 🟦 Info superior */}
      <InfoCallout
        title="Qué harás en esta sección"
        body="Los datos cargados en esta sección no pueden modificarse. Cualquier modificación debe ser realizado de forma presencial."
      />

      {/* CONTENEDOR HORIZONTAL: tres columnas en una sola fila */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {/* 1) DATOS DEL TERRENO MATRIZ (solo lectura) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: BG_PANEL,
              border: "1px solid #e0e7ef",
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={labelSx}>
              <img src={iconDatos} alt="Datos del terreno matriz" width={22} height={22} />
              Datos del Terreno Matriz
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                size="small"
                fullWidth
                label="Área del terreno matriz (m²)"
                value={toFixedStr(formData.areaMatriz, 2)}
                disabled
                InputProps={{
                  readOnly: true,
                  sx: valueInputSx,
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpTooltip text="Área del terreno matriz registrada para el predio (m²)." />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                size="small"
                fullWidth
                label="% de bien común"
                value={toFixedStr(formData.porcentajeBienComun, 2)}
                disabled
                InputProps={{
                  readOnly: true,
                  sx: valueInputSx,
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpTooltip text="Porcentaje de alícuota de bien común asociado al predio." />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                size="small"
                fullWidth
                label="Frontis del predio (m)"
                value={toFixedStr(formData.frontis, 2)}
                disabled
                InputProps={{
                  readOnly: true,
                  sx: valueInputSx,
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpTooltip text="Longitud del frente del predio (m)." />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Box>

        {/* 2) ÁREA DEL TERRENO (solo lectura) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: BG_PANEL,
              border: "1px solid #e0e7ef",
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={labelSx}>
              <img src={iconArea} alt="Área del terreno" width={22} height={22} />
              Área del Terreno
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                size="small"
                fullWidth
                label="Área Propia (m²)"
                value={toFixedStr(formData.areaPropia, 2)}
                disabled
                InputProps={{
                  readOnly: true,
                  sx: valueInputSx,
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpTooltip text="Área propia del predio (m²)." />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                size="small"
                fullWidth
                label="Área Común (m²)"
                value={toFixedStr(formData.areaComun, 2)}
                disabled
                InputProps={{
                  readOnly: true,
                  sx: valueInputSx,
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpTooltip text="Área de bien común computable (m²)." />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                size="small"
                fullWidth
                label="Área Total (m²)"
                value={toFixedStr(formData.areaTotal, 2)}
                disabled
                InputProps={{
                  readOnly: true,
                  sx: valueInputSx,
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpTooltip text="Suma de área propia + área común (m²)." />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ mt: 1, color: "#6b778c" }}>
              El área total corresponde a la suma del área propia y el área común.
            </Typography>
          </Paper>
        </Box>

        {/* 3) VALOR DEL TERRENO (solo lectura) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: BG_PANEL,
              border: "1px solid #c5d9f5",
              borderLeft: "6px solid #1a73e8",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={labelSx}>
                <img src={iconValor} alt="Valor del terreno" width={22} height={22} />
                Valor del Terreno
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Valor arancelario (S/.)"
                  value={toFixedStr(formData.valorArancelario, 2)}
                  size="small"
                  fullWidth
                  disabled
                  InputProps={{
                    readOnly: true,
                    sx: valueInputSx,
                    endAdornment: (
                      <InputAdornment position="end">
                        <HelpTooltip text="Valor unitario del terreno según el arancel vigente." />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Valor total del terreno (S/.)"
                  value={toFixedStr(formData.valorTotalTerreno, 2)}
                  size="small"
                  fullWidth
                  disabled
                  InputProps={{
                    readOnly: true,
                    sx: valueInputSx,
                    endAdornment: (
                      <InputAdornment position="end">
                        <HelpTooltip text="Cálculo: área total × valor arancelario." />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "#003366",
                textAlign: "right",
                fontStyle: "italic",
                fontSize: "0.85rem",
                mt: 3,
              }}
            >
              Los valores se calculan automáticamente según el arancel vigente.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Paso3Terreno;