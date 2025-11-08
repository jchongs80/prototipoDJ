import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import InscripcionDJ from "./components/InscripcionDJ";
import RegistrarDJ from "./components/RegistrarDJ";
import DeclaracionExitosa from './components/declaracionExitosa';
import ResumenPredios from './components/resumenPredio';
import './App.css';

function App() {

  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Temporalmente, puedes cambiar esto a true para ver el Dashboard
  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  //const handleLogin = () => {
   // setIsAuthenticated(true);
  //};

  //const handleLogout = () => {
   // setIsAuthenticated(false);
  //};

  return (
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/inscripcion-predial" element={<InscripcionDJ />} />
    <Route path="/registrar-dj" element={<RegistrarDJ />} />
    <Route path="/declaracion-exitosa" element={<DeclaracionExitosa />} />
    <Route path="/resumen-predios" element={<ResumenPredios />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;
