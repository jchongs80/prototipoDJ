import React from "react";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface InfoCalloutProps {
  title: string;
  body: string;
}

const InfoCallout: React.FC<InfoCalloutProps> = ({ title, body }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        p: 1,
        mb: 3,
        bgcolor: "#E3F2FD", // azul claro SAT
        border: "1px solid #BBDEFB",
        borderRadius: 2,
        alignItems: "flex-start",
      }}
    >
      <InfoOutlinedIcon sx={{ color: "#1976d2", fontSize: 28, flexShrink: 0 }} />
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#0D47A1", mb: 0.1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#174A72", lineHeight: 1.3 }}>
          {body}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoCallout;