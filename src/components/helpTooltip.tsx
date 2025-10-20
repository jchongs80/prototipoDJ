import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface HelpTooltipProps {
  text: string;          // Texto explicativo
  placement?: "top" | "bottom" | "left" | "right"; // Posición opcional
  color?: string;        // Color opcional (por defecto azul SAT)
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  text,
  placement = "top",
  color = "#1565c0", // Azul SAT institucional
}) => {
  return (
    <Tooltip
      title={text}
      arrow
      placement={placement}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#1565c0",
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
      <IconButton
        size="small"
        sx={{
          ml: 0.5,
          mr: 0, // 👈 agrega espacio entre el ícono y la flechita del select
          color,
          "&:hover": { bgcolor: "rgba(21,101,192,0.1)" },
          pointerEvents: "auto", // 👈 importante
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default HelpTooltip;