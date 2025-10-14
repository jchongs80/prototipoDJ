import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Tooltip,
  Divider,
} from "@mui/material";

import terrenoIcon from "./../assets/medicion_casa.png";
import medicionIcon from "./../assets/medida.png";
import areaIcon from "./../assets/construccion-de-edificio.png";
import valorIcon from "./../assets/sol-peruano.png";

interface Paso3TerrenoProps {
  formData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | import("@mui/material/Select").SelectChangeEvent
  ) => void;
}

const Paso3Terreno: React.FC<Paso3TerrenoProps> = ({
  formData,
  handleChange,
}) => {
  const [errorArea, setErrorArea] = useState(false);

  // 🔹 Cálculos automáticos y validaciones
  useEffect(() => {
    const areaMatriz = parseFloat(formData.areaMatriz) || 0;
    const areaPropia = parseFloat(formData.areaPropia) || 0;
    const areaComun = parseFloat(formData.areaComun) || 0;
    const valorArancelario = parseFloat(formData.valorArancelario) || 0;

    const areaTotal = areaPropia + areaComun;

    if (areaTotal > areaMatriz && areaMatriz > 0) {
      setErrorArea(true);
    } else {
      setErrorArea(false);
    }

    const valorTotal = areaTotal * valorArancelario;

    handleChange({
      target: { name: "areaTotal", value: areaTotal.toFixed(2) },
    } as any);

    handleChange({
      target: { name: "valorTotalTerreno", value: valorTotal.toFixed(2) },
    } as any);
  }, [
    formData.areaMatriz,
    formData.areaPropia,
    formData.areaComun,
    formData.valorArancelario,
  ]);

  return (
    <Box sx={{ p: 3 }}>
      {/* ====== TÍTULO PRINCIPAL ====== */}
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
        <img
          src={terrenoIcon}
          alt="Terreno"
          style={{ width: 32, height: 32, marginRight: 8 }}
        />
        Valorización del Terreno
      </Typography>

      {/* ====== CONTENEDOR PRINCIPAL 60/40 ====== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {/* ====== BLOQUE IZQUIERDO (60%) ====== */}
        <Box
          sx={{
            flex: "0 0 60%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* --- Datos del terreno matriz --- */}
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              bgcolor: "#fff",
              p: 3,
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
                src={medicionIcon}
                alt="Área matriz"
                style={{ width: 25, height: 25, marginRight: 8 }}
              />
              Datos del Terreno Matriz
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 2,
              }}
            >
              <Tooltip
                title="Área del terreno según la partida matriz (m²)"
                arrow
              >
                <TextField
                  label="Área del terreno matriz (m²)"
                  name="areaMatriz"
                  value={formData.areaMatriz}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  placeholder="0.00"
                />
              </Tooltip>

              <Tooltip
                title="Porcentaje de área común que le corresponde al predio"
                arrow
              >
                <TextField
                  label="% de bien común"
                  name="porcentajeBienComun"
                  value={formData.porcentajeBienComun}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  placeholder="0%"
                />
              </Tooltip>

              <Tooltip
                title="Medida del frente del predio hacia la vía pública"
                arrow
              >
                <TextField
                  label="Frontis del predio (m)"
                  name="frontis"
                  value={formData.frontis}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  placeholder="0.00"
                />
              </Tooltip>
            </Box>
          </Box>

          {/* --- Área del terreno --- */}
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              bgcolor: "#fff",
              p: 3,
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
                src={areaIcon}
                alt="Área Propia"
                style={{ width: 30, height: 30, marginRight: 8 }}
              />
              Área del Terreno
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 2,
              }}
            >
              <TextField
                label="Área Propia (m²)"
                name="areaPropia"
                value={formData.areaPropia}
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder="0.00"
              />
              <TextField
                label="Área Común (m²)"
                name="areaComun"
                value={formData.areaComun}
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder="0.00"
              />
              <TextField
                label="Área Total (m²)"
                name="areaTotal"
                value={formData.areaTotal}
                size="small"
                fullWidth
                disabled
              />
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

        {/* ====== BLOQUE DERECHO (40%) ====== */}
        <Box
          sx={{
            flex: "0 0 40%",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            bgcolor: "#f7f7f7",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
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
                alt="Valor"
                style={{ width: 35, height: 35, marginRight: 8 }}
              />
              Valor del Terreno
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Valor arancelario (S/.)"
                name="valorArancelario"
                value={formData.valorArancelario}
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder="0.00"
                disabled
              />
              <TextField
                label="Valor total del terreno (S/.)"
                name="valorTotalTerreno"
                value={formData.valorTotalTerreno}
                size="small"
                fullWidth
                disabled
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body2"
            sx={{
              color: "#666",
              textAlign: "right",
              fontStyle: "italic",
            }}
          >
            Los valores se calculan automáticamente según el arancel vigente.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Paso3Terreno;