// src/theme/responsiveTheme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontSize: 13,                  // base un poco menor (≈ 0.8125rem)
    h6: { fontWeight: 700 },
    body1: { fontSize: "0.92rem" },
    body2: { fontSize: "0.84rem" },
  },
  components: {
    MuiContainer: {
      defaultProps: { maxWidth: "lg" }, // 1200px aprox
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "6px 10px",
          fontSize: "0.85rem",
          "@media (max-width:1200px)": {
            padding: "4px 8px",
            fontSize: "0.80rem",
          },
        },
        head: {
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small", // densidad global
      },
    },
    MuiButton: {
      defaultProps: { size: "small" },
    },
  },
});

theme = responsiveFontSizes(theme); // ajusta títulos por breakpoint automáticamente
export default theme;