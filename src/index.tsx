import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, CssBaseline, createTheme  } from "@mui/material";
import theme from "./theme/responsiveTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const RootContainer = () => {
  const theme = createTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("lg")); // >=1200px

  return (
    <div
      style={{
        zoom: isLaptop ? 0.85 : 1,           // Escalado global solo en laptops
        transformOrigin: "top center",
        overflowX: "hidden",
        backgroundColor: "#f5f7fa",
        height: "calc(100vh / 0.85)",        // 👈 compensa el espacio del zoom
        minHeight: "100vh",
      }}
      translate='no'
    >
      <App />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
