import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";   // 👈 agregado
import { useTheme, useMediaQuery } from "@mui/material";

interface LoginPageProps {
  onLogin?: () => void;
}

interface FormData {
  tipoDocumento: string;
  numeroDocumento: string;
  contrasena: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    tipoDocumento: '',
    numeroDocumento: '',
    contrasena: ''
  });

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg")); // 600–1200 px
  const isLaptop = useMediaQuery(theme.breakpoints.up("lg")); // ≥1200 px
  const isPhone = useMediaQuery(theme.breakpoints.down("sm")); // ≤600 px

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); // 👈 agregado

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setFormData({
      ...formData,
      tipoDocumento: event.target.value
    });
  };

  const handleInputChange = (field: keyof FormData) => (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault();

  const { tipoDocumento, numeroDocumento, contrasena } = formData;

  if (!tipoDocumento || !numeroDocumento.trim() || !contrasena.trim()) {
    alert("⚠️ Debes seleccionar un tipo de documento, ingresar el número y la contraseña.");
    return;
  }

  console.log("✅ Ingreso simulado:", formData);

  // 👉 Redirigir directamente al Dashboard
  navigate("/dashboard");
};

  const handleForgotPassword = (event: React.MouseEvent): void => {
    event.preventDefault();
    console.log('Olvidé mi contraseña');
    // TODO: Implementar navegación a recuperar contraseña

    // Simular login exitoso
    if (formData.numeroDocumento && formData.contrasena) {
      if (onLogin) {
        onLogin();
      }
    } else {
      alert('Por favor completa todos los campos');
    }

  };

  const handleFirstTime = (event: React.MouseEvent): void => {
    event.preventDefault();
    console.log('Primera vez - crear usuario');
    // TODO: Implementar navegación a registro
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: "column", md: "row" }, // 🔹 stack en móvil
      minHeight: '100vh',
      bgcolor: '#f0f2f5'
    }}>
      {/* Panel Izquierdo - Azul */}
      <Box
        sx={{
          width: isTablet ? "35%" : isLaptop ? "40%" : "100%",
          display: { xs: "none", sm: "none", md: "flex" },
          bgcolor: '#1e5ba8',
          color: 'white',
          flexDirection: 'column',
          p: { xs: 2, md: 4, lg: 5 },
          position: 'relative'
        }}
      >
        {/* Logo y texto SAT */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.3rem', lg: '2.5rem' } }} translate="no">
              SAT
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '0.6rem', md: '0.7rem' },
              letterSpacing: '0.3px',
              lineHeight: 1.3,
              opacity: 0.95
            }}
          >
            SERVICIO DE<br />
            ADMINISTRACIÓN<br />
            TRIBUTARIA
          </Typography>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: -8 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontWeight: 400,
              fontSize: '1.75rem',
              lineHeight: 1.3
            }}
          >
            Gestiona tus trámites y<br />
            consultas de forma sencilla:
          </Typography>
          
          <Typography 
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              mb: 1
            }}
          >
            inscribe tu vehículo o inmueble,<br />
            solicita facilidades de pago,<br />
            obtén constancias o resuelve<br />
            prescripciones de papeletas,<br />
            todo desde la comodidad de<br />
            nuestra <span style={{ color: '#40e0d0', fontWeight: 600 }}>Agencia Virtual SAT</span>
          </Typography>

          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            sx={{
              color: '#40e0d0',
              mt: 5,
              fontSize: '0.95rem',
              textDecorationColor: '#40e0d0',
              '&:hover': {
                color: '#60f0e0'
              }
            }}
          >
            Descubre cómo en nuestra Guía de Usuario
          </Link>
        </Box>

        {/* Footer con candado */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 4 }}>
          <Box 
            sx={{ 
              border: '2px solid white',
              borderRadius: '50%',
              p: 0.5,
              mr: 2,
              mt: 0.3
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: '1rem' }} />
          </Box>
          <Typography 
            sx={{ 
              fontSize: '0.75rem',
              lineHeight: 1.5,
              opacity: 0.9
            }}
          >
            Recuerda que este es un espacio seguro, por lo que<br />
            tus datos están debidamente protegidos por nuestros<br />
            sistemas de seguridad digital.
          </Typography>
        </Box>
      </Box>

      {/* Panel Derecho - Formulario */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 4 },
          bgcolor: '#f0f2f5'
        }}
      >
        <Container maxWidth="sm">
          <Paper 
            elevation={1}
            sx={{ 
              p: 5,
              borderRadius: 2,
              width: '100%',
              maxWidth: { xs: "100%", sm: "420px", md: "480px" },
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ 
                mb: 1,
                color: '#1e5ba8',
                fontWeight: 600,
                fontSize: '1.5rem'
              }}
            >
              Bienvenido a nuestra Agencia Virtual
            </Typography>

            <Typography 
              align="center" 
              sx={{ 
                mb: 4,
                color: '#666',
                fontSize: '0.95rem'
              }}
            >
              Ingresa tus datos para iniciar sesión
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Tipo de documento */}
              <Typography 
                sx={{ 
                  mb: 1,
                  color: '#444',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                Tipo de documento
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Select
                  value={formData.tipoDocumento}
                  onChange={handleSelectChange}
                  displayEmpty
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    '& .MuiSelect-select': {
                      py: 1.5,
                      color: formData.tipoDocumento ? 'inherit' : '#999',
                      fontSize: '0.95rem'
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar tipo de documento
                  </MenuItem>
                  <MenuItem value="dni">DNI</MenuItem>
                  <MenuItem value="ruc">RUC</MenuItem>
                  <MenuItem value="ce">Carnet de Extranjería</MenuItem>
                  <MenuItem value="pasaporte">Pasaporte</MenuItem>
                </Select>
              </FormControl>

              {/* Número de documento */}
              <Typography 
                sx={{ 
                  mb: 1,
                  color: '#444',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                Número de documento
              </Typography>
              <TextField
                fullWidth
                placeholder="Ingresar número de documento"
                variant="outlined"
                size="small"
                value={formData.numeroDocumento}
                onChange={handleInputChange('numeroDocumento')}
                sx={{ 
                  mb: 3,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& input': {
                      py: 1.5,
                      fontSize: '0.95rem'
                    }
                  }
                }}
              />

              {/* Contraseña */}
              <Typography 
                sx={{ 
                  mb: 1,
                  color: '#444',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                Contraseña
              </Typography>
              <TextField
                fullWidth
                placeholder="Ingresar tu contraseña"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                size="small"
                value={formData.contrasena}
                onChange={handleInputChange('contrasena')}
                sx={{ 
                  mb: 4,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& input': {
                      py: 1.5,
                      fontSize: '0.95rem'
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                        sx={{ mr: -0.5 }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: '1.2rem', color: '#666' }} />
                        ) : (
                          <Visibility sx={{ fontSize: '1.2rem', color: '#666' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Botón Consultar */}
             <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mb: 2,
                  py: { xs: 1.2, md: 1.5 },
                  bgcolor: '#003d7a',
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 1,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#002a56',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Ingresar
              </Button>

              {/* Link Olvidé mi contraseña */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Link
                  href="#"
                  onClick={handleForgotPassword}
                  sx={{
                    color: '#1e5ba8',
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Olvidé mi contraseña
                </Link>
              </Box>
            </form>

            {/* Alerta Primera vez */}
            <Alert 
              severity="info"
              icon={false}
              sx={{ 
                bgcolor: '#e8f4fd',
                border: '1px solid #b3d9f2',
                borderRadius: 1,
                py: 1.5,
                '& .MuiAlert-message': {
                  width: '100%',
                  textAlign: 'center',
                  p: 0
                }
              }}
            >
              <Link
                href="#"
                onClick={handleFirstTime}
                sx={{
                  color: '#1e5ba8',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                ¿Primera vez?, crea tu usuario y contraseña aquí
              </Link>
            </Alert>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;