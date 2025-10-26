import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import terrenoIcon from "./../assets/medicion_casa.png";
import medicionIcon from "./../assets/medida.png";
import areaIcon from "./../assets/construccion-de-edificio.png";
import valorIcon from "./../assets/sol-peruano.png";
import InfoCallout from "./InfoCallout";
import HelpTooltip from "./helpTooltip";

interface Paso3TerrenoProps {
  formData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | import("@mui/material/Select").SelectChangeEvent
  ) => void;
}

const Paso3Terreno: React.FC<Paso3TerrenoProps> = ({ formData, handleChange }) => {
  const [errorArea, setErrorArea] = useState(false);

  useEffect(() => {
    const areaMatriz = parseFloat(formData.areaMatriz) || 0;
    const areaPropia = parseFloat(formData.areaPropia) || 0;
    const areaComun = parseFloat(formData.areaComun) || 0;
    const valorArancelario = parseFloat(formData.valorArancelario) || 0;
    const areaTotal = areaPropia + areaComun;

    setErrorArea(areaTotal > areaMatriz && areaMatriz > 0);
    const valorTotal = areaTotal * valorArancelario;

    handleChange({ target: { name: "areaTotal", value: areaTotal.toFixed(2) } } as any);
    handleChange({ target: { name: "valorTotalTerreno", value: valorTotal.toFixed(2) } } as any);
  }, [formData.areaMatriz, formData.areaPropia, formData.areaComun, formData.valorArancelario]);

  return (
    <Box sx={{ p: 1 }}>
      <InfoCallout
        title="¿Qué registrarás aquí?"
        body="Ingresa las áreas, el porcentaje de bien común y el frontis. El valor del terreno se calculará automáticamente según el arancel vigente."
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#003366",
          mb: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={terrenoIcon} alt="Terreno" style={{ width: 32, height: 32, marginRight: 8 }} />
        Valorización del Terreno
      </Typography>

      {/* 🔹 CONTENEDOR PRINCIPAL FLEXIBLE */}
<Box
  sx={{
   display: "flex",
    flexDirection: { xs: "column", md: "row" }, // 🔹 en tablet se apilan, en laptop se alinean
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 2,
    flexWrap: "nowrap", // 🔹 evita que la caja derecha se baje
    width: "100%",
  }}
>
  {/* IZQUIERDA */}
    <Box
        sx={{
        flex: { xs: "1 1 100%", md: "1 1 68%" },
        minWidth: 0, // 🔹 evita overflow horizontal
        display: "flex",
        flexDirection: "column",
        gap: 1,
        }}
        >
          {/* Terreno Matriz */}
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              bgcolor: "#fff",
              px: 3,
              py: 2.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
                color: "#003366",
                mb: 2,
              }}
            >
              <img src={medicionIcon} alt="Área matriz" style={{ width: 25, height: 25, marginRight: 8 }} />
              Datos del Terreno Matriz
            </Typography>

           {/* === DATOS DEL TERRENO MATRIZ === */}
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    flexWrap: "nowrap",
    justifyContent: "space-between",
    gap: 1.5,
  }}
>
  {/* Área del terreno matriz */}
  <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
    <TextField
      fullWidth
      label="Área del terreno matriz (m²)"
      name="areaMatriz"
      size="small"
      value={formData.areaMatriz}
      onChange={handleChange}
      error={!!formData.errors?.areaMatriz}
      helperText={formData.errors?.areaMatriz}
      InputProps={{
        endAdornment: (
          <HelpTooltip text="Área total del terreno matriz expresada en metros cuadrados." />
        ),
      }}
    />
  </Box>

  {/* % de bien común */}
  <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
    <TextField
      fullWidth
      label="% de bien común"
      name="porcBienComun"
      size="small"
      value={formData.porcBienComun}
      onChange={handleChange}
      error={!!formData.errors?.porcBienComun}
      helperText={formData.errors?.porcBienComun}
      InputProps={{
        endAdornment: (
          <HelpTooltip text="Porcentaje de participación de áreas comunes." />
        ),
      }}
    />
  </Box>

  {/* Frontis del predio */}
  <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
    <TextField
      fullWidth
      label="Frontis del predio (m)"
      name="frontis"
      size="small"
      value={formData.frontis}
      onChange={handleChange}
      error={!!formData.errors?.frontis}
      helperText={formData.errors?.frontis}
      InputProps={{
        endAdornment: (
          <HelpTooltip text="Longitud del frente del predio expresada en metros lineales." />
        ),
      }}
    />
  </Box>
</Box>
          </Box>

          {/* Área del Terreno */}
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              bgcolor: "#fff",
              px: 3,
              py: 2.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
                color: "#003366",
                mb: 2,
              }}
            >
              <img src={areaIcon} alt="Área Propia" style={{ width: 28, height: 28, marginRight: 8 }} />
              Área del Terreno
            </Typography>

           <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    flexWrap: "nowrap",
    justifyContent: "space-between",
    gap: 1.5,
  }}
>
  {/* Área Propia */}
  <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
    <TextField
      fullWidth
      label="Área Propia (m²)"
      name="areaPropia"
      size="small"
      value={formData.areaPropia}
      onChange={handleChange}
      error={!!formData.errors?.areaPropia}
      helperText={formData.errors?.areaPropia}
      InputProps={{
        endAdornment: (
          <HelpTooltip text="Área propia del terreno según el título de propiedad." />
        ),
      }}
    />
  </Box>

  {/* Área Común */}
  <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
    <TextField
      fullWidth
      label="Área Común (m²)"
      name="areaComun"
      size="small"
      value={formData.areaComun}
      onChange={handleChange}
      error={!!formData.errors?.areaComun}
      helperText={formData.errors?.areaComun}
      InputProps={{
        endAdornment: (
          <HelpTooltip text="Área compartida con otros copropietarios (m²)." />
        ),
      }}
    />
  </Box>

  {/* Área Total */}
  <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
    <TextField
      fullWidth
      label="Área Total (m²)"
      name="areaTotal"
      size="small"
      value={formData.areaTotal}
      disabled
      error={!!formData.errors?.areaTotal}
      helperText={formData.errors?.areaTotal}
      InputProps={{
        endAdornment: (
          <HelpTooltip text="Suma de área propia y común. Calculada automáticamente." />
        ),
      }}
    />
  </Box>
</Box>

            {errorArea && (
              <Typography
                variant="caption"
                sx={{
                  color: "#d32f2f",
                  mt: 1.5,
                  display: "block",
                  fontSize: "0.8rem",
                }}
              >
                El área total no puede ser mayor que el área del terreno matriz.
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                textAlign: "right",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              El área total corresponde a la suma del área propia y el área común.
            </Typography>
          </Box>
        </Box>

       {/* DERECHA */}
  <Box
    sx={{
      flex: { xs: "1 1 100%", md: "1 1 32%" }, // 🔹 ocupa el resto del espacio
    minWidth: { xs: "100%", md: "300px" },   // 🔹 tamaño mínimo para estabilidad
    maxWidth: { md: "360px", lg: "380px" },
    border: "1px solid #c5d9f5",
    borderLeft: "6px solid #1a73e8",
    borderRadius: 2,
    bgcolor: "#f9fafc",
    px: { xs: 2, md: 3 },
    py: { xs: 2, md: 3 },
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        color: "#003366",
        mb: 2,
      }}
    >
      <img
        src={valorIcon}
        alt="Valor del Terreno"
        style={{ width: 28, height: 28, marginRight: 8 }}
      />
      Valor del Terreno
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Valor arancelario (S/.)"
        name="valorArancelario"
        value={formData.valorArancelario}
        onChange={handleChange}
        size="small"
        fullWidth
        disabled
        InputProps={{
          endAdornment: (
            <HelpTooltip text="Valor unitario del terreno según el arancel vigente publicado por el SAT." />
          ),
          sx: { fontSize: "0.85rem" },
        }}
      />
      <TextField
        label="Valor total del terreno (S/.)"
        name="valorTotalTerreno"
        value={formData.valorTotalTerreno}
        size="small"
        fullWidth
        disabled
        InputProps={{
          endAdornment: (
            <HelpTooltip text="Valor total calculado automáticamente: área total × valor arancelario." />
          ),
          sx: { fontSize: "0.85rem" },
        }}
      />
    </Box>

    <Divider sx={{ my: 2 }} />
    <Typography
      variant="body2"
      sx={{ color: "#555", textAlign: "right", fontStyle: "italic" }}
    >
      Los valores se calculan automáticamente según el arancel vigente.
    </Typography>
  </Box>
</Box>
    </Box>
  );
};

export default Paso3Terreno;