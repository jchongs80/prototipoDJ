import React from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  MenuItem,
  FormControl, Select, InputLabel
} from "@mui/material";

import contribuyenteIcon from './../assets/contribuyente.png';
import conyugeIcon from './../assets/conyuge.png';
import condicionEspecialIcon from './../assets/anciano.png';
import direccionCompletaIcon from './../assets/localizacion.png';
import direccionDetalladaIcon from './../assets/direccion-de-casa.png';
import CondicionEspecial from "./condicionEspecial";
import DireccionCompleta from "./direccionCompleta";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

interface Paso1ContribuyenteProps {
  formData: any;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | import("@mui/material/Select").SelectChangeEvent
  ) => void;
  tipoPersona: string;
  setMostrarDireccionDetallada: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarDireccionDetallada: boolean;
  handleFileChange: (file: File | null) => void;
  handleReciboChange: (file: File | null) => void;
  errorCondicionFile?: string; // ✅ nuevo
  errorReciboFile?: string;    // ✅ nuevo
}

const Paso1Contribuyente: React.FC<Paso1ContribuyenteProps> = ({
  tipoPersona,
  formData,
  handleChange,
  mostrarDireccionDetallada,
  setMostrarDireccionDetallada,
  handleFileChange,
  handleReciboChange,
  errorCondicionFile,
  errorReciboFile,

}) => {


const [errorTipoDocConyuge, setErrorTipoDocConyuge] = React.useState(false);
const [errorNroDocConyuge, setErrorNroDocConyuge] = React.useState(false);
const [errorMsgTipoDoc, setErrorMsgTipoDoc] = React.useState("");
const [errorMsgNroDoc, setErrorMsgNroDoc] = React.useState("");

// === Estado del modal de búsqueda ===
const [openBuscarReniec, setOpenBuscarReniec] = React.useState(false);

// === Función de búsqueda del cónyuge ===
const handleBuscarConyuge = () => {
  let hasError = false;

  if (!formData.tipoDocConyuge) {
    setErrorTipoDocConyuge(true);
    setErrorMsgTipoDoc("Seleccione un tipo de documento.");
    hasError = true;
  }

  if (!formData.nroDocConyuge.trim()) {
    setErrorNroDocConyuge(true);
    setErrorMsgNroDoc("Ingrese el número de documento.");
    hasError = true;
  }

  if (hasError) return;

  // Limpia errores previos
  setErrorTipoDocConyuge(false);
  setErrorNroDocConyuge(false);
  setErrorMsgTipoDoc("");
  setErrorMsgNroDoc("");

  // 🔄 Mostrar modal de búsqueda
  setOpenBuscarReniec(true);

  // Simular consulta a RENIEC (2.5 segundos)
  setTimeout(() => {
    setOpenBuscarReniec(false);

    handleChange({
      target: { name: "apellidosConyuge", value: "MARIA LOPEZ TORRES" },
    } as any);
    handleChange({
      target: { name: "fechaNacimientoConyuge", value: "1980-11-23" },
    } as any);
  }, 2500);
};

  return (
    <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      {/* Título principal */}
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#003366", mb: 2 }}>
        <img src={contribuyenteIcon} alt="Contribuyente"  style={{ width: "30px", height: "30px", marginRight: "8px" }}/>
        Datos del Contribuyente
      </Typography>

      {/* Primera fila */}
      <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            mb: 2,
        }}
      >
        <TextField
          label="Tipo de documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          fullWidth
           size="small"
        />
        <TextField
          label="N° documento"
          name="nroDocumento"
          value={formData.nroDocumento}
          onChange={handleChange}
          fullWidth
           size="small"
        />
        <TextField
          label="Apellidos y Nombres"
          name="apellidosNombres"
          value={formData.apellidosNombres}
          onChange={handleChange}
          fullWidth
           size="small"
        />
        <TextField
          label="Fecha de nacimiento"
          name="fechaNacimiento"
          type="date"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
        />
      </Box>

    

      {/* Tercera fila */}
      <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            mb: 2,
        }}>
        <TextField
          label="Teléfono fijo"
          name="telefonoFijo"
          value={formData.telefonoFijo}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Celular"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Correo electrónico"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Teléfono de referencia"
          name="telefonoReferencia"
          value={formData.telefonoReferencia}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Box>



      {/* Datos del cónyuge */}
      
{tipoPersona === "Sociedad Conyugal" && (
  <>
    <Divider sx={{ my: 3 }} />
    <Typography
      variant="h6"
      sx={{ fontWeight: 600, color: "#003366", mb: 2 }}
    >
      <img
        src={conyugeIcon}
        alt="Conyuge"
        style={{ width: "30px", height: "30px", marginRight: "8px" }}
      />
      Datos del Cónyuge
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        mb: 2,
      }}
    >
      {/* Tipo de documento */}
      <Box>
        <TextField
          select
          label="Tipo de documento"
          name="tipoDocConyuge"
          value={formData.tipoDocConyuge}
          onChange={(e) => {
            setErrorTipoDocConyuge(false);
            setErrorMsgTipoDoc("");
            handleChange(e);
          }}
          fullWidth
          size="small"
          error={errorTipoDocConyuge}
        >
          <MenuItem value="">--Seleccione--</MenuItem>
          <MenuItem value="DNI/Libreta Electoral">DNI / Libreta Electoral</MenuItem>
          <MenuItem value="Carnet de Identidad">Carnet de Identidad</MenuItem>
          <MenuItem value="Carnet de Extranjería">Carnet de Extranjería</MenuItem>
          <MenuItem value="Pasaporte">Pasaporte</MenuItem>
          <MenuItem value="Otros">Otros</MenuItem>
        </TextField>
        {errorTipoDocConyuge && (
          <Typography
            variant="caption"
            sx={{ color: "#d32f2f", fontSize: "0.75rem", mt: 0.5 }}
          >
            {errorMsgTipoDoc}
          </Typography>
        )}
      </Box>

      {/* N° documento + botón Buscar */}
      <Box>
        <TextField
          label="N° documento"
          name="nroDocConyuge"
          value={formData.nroDocConyuge}
          onChange={(e) => {
            setErrorNroDocConyuge(false);
            setErrorMsgNroDoc("");
            handleChange(e);
          }}
          fullWidth
          size="small"
          error={errorNroDocConyuge}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" onClick={handleBuscarConyuge}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorNroDocConyuge && (
          <Typography
            variant="caption"
            sx={{ color: "#d32f2f", fontSize: "0.75rem", mt: 0.5 }}
          >
            {errorMsgNroDoc}
          </Typography>
        )}
      </Box>

      {/* Nombre */}
      <TextField
        label="Apellidos y Nombres"
        name="apellidosConyuge"
        value={formData.apellidosConyuge}
        onChange={handleChange}
        fullWidth
        size="small"
      />

      {/* Fecha de nacimiento */}
      <TextField
        label="Fecha de nacimiento"
        name="fechaNacimientoConyuge"
        type="date"
        value={formData.fechaNacimientoConyuge}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"
      />
    </Box>
  </>
)}
 
      <Divider sx={{ my: 3 }} />

<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 2,
    alignItems: "flex-start",
    justifyContent: "space-between",
    mb: 3,
    width: "100%",
  }}
>
  {/* 📄 Condición Especial */}
  <Box
    sx={{
      flex: 1,
      minWidth: { xs: "100%", md: "48%" },
      bgcolor: "#fff",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: "#003366",
        mb: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={condicionEspecialIcon}
        alt="Condición especial"
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      Condición Especial del Contribuyente
    </Typography>

    <CondicionEspecial
      formData={formData}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      errorCondicionFile={errorCondicionFile}
    />
  </Box>

  {/* 🏠 Dirección Fiscal */}
  <Box
    sx={{
      flex: 1,
      minWidth: { xs: "100%", md: "48%" },
      bgcolor: "#fff",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: "#003366",
        mb: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={direccionCompletaIcon}
        alt="Dirección fiscal"
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      Dirección Fiscal del Contribuyente
    </Typography>

    <DireccionCompleta
      formData={formData}
      handleChange={handleChange}
      handleReciboChange={handleReciboChange}
      mostrarDireccionDetallada={mostrarDireccionDetallada}
      setMostrarDireccionDetallada={setMostrarDireccionDetallada}
      errorReciboFile={errorReciboFile}
    />
  </Box>
</Box>




{mostrarDireccionDetallada && (
  <Box
    sx={{
      mt: 4,
      p: 3,
      bgcolor: "#ffffff",
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      border: "1px solid #e0e0e0",
      transition: "all 0.3s ease",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        color: "#003366",
        mb: 3,
      }}
    >
      <img
        src={direccionDetalladaIcon}
        alt="Dirección detallada"
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      Detalle de Dirección Fiscal
    </Typography>

    {/* Primera fila */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Distrito</InputLabel>
        <Select
          name="distrito"
          value={formData.distrito}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">--Seleccione--</MenuItem>
          <MenuItem value="Cercado de Lima">Cercado de Lima</MenuItem>
          <MenuItem value="San Isidro">San Isidro</MenuItem>
          <MenuItem value="Miraflores">Miraflores</MenuItem>
          <MenuItem value="Surco">Surco</MenuItem>
          <MenuItem value="La Molina">La Molina</MenuItem>
          <MenuItem value="Los Olivos">Los Olivos</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Tipo de vía</InputLabel>
        <Select
          name="tipoVia"
          value={formData.tipoVia}
          onChange={handleChange}
          size="small"
        >
          {[
            "Avenida",
            "Jirón",
            "Calle",
            "Pasaje",
            "Parque",
            "Urbanización",
            "Prolongación",
            "Malecón",
            "Plaza",
            "Alameda",
          ].map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="descVia"
        label="Descripción de la vía"
        value={formData.descVia}
        onChange={handleChange}
        fullWidth
        size="small"
      />

      <TextField
        name="numeroPuerta"
        label="Número"
        value={formData.numeroPuerta}
        onChange={handleChange}
        fullWidth
        size="small"
      />
    </Box>

    {/* Segunda fila */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
        mt: 2,
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Tipo denom. urbana</InputLabel>
        <Select
          name="tipoDenomUrbana"
          value={formData.tipoDenomUrbana}
          onChange={handleChange}
          size="small"
        >
          {[
            "Ninguno",
            "Urbanización",
            "Asentamiento Humano",
            "Conj. Habitacional",
            "Residencial",
            "Cooperativa de vivienda",
            "Pueblo Joven",
            "Agrupación",
          ].map((op) => (
            <MenuItem key={op} value={op}>
              {op}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="descDenomUrbana"
        label="Descripción denom. urbana"
        value={formData.descDenomUrbana}
        onChange={handleChange}
        fullWidth
        size="small"
      />

      <TextField
        name="departamento"
        label="Departamento"
        value={formData.departamento}
        onChange={handleChange}
        fullWidth
        size="small"
      />

      <TextField
        name="oficina"
        label="Oficina"
        value={formData.oficina}
        onChange={handleChange}
        fullWidth
        size="small"
      />
    </Box>

    {/* Tercera fila */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
        mt: 2,
      }}
    >
      {[
        ["interior", "Interior"],
        ["manzana", "Manzana"],
        ["lote", "Lote"],
        ["seccion", "Sección"],
        ["block", "Block"],
        ["ucv", "UCV"],
        ["edificio", "Edificio"],
        ["referencia", "Referencia"],
      ].map(([name, label]) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={formData[name as keyof typeof formData] || ""}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      ))}
    </Box>

    <Divider sx={{ mt: 3, mb: 2 }} />
    <Typography
      variant="body2"
      sx={{ color: "#666", textAlign: "right", fontStyle: "italic" }}
    >
      ✎ Actualiza solo si la dirección fiscal del contribuyente ha cambiado.
    </Typography>
  </Box>
)}

<Dialog
  open={openBuscarReniec}
  PaperProps={{
    sx: { textAlign: "center", p: 3, borderRadius: 2, minWidth: 300 },
  }}
>
  <CircularProgress color="primary" sx={{ mb: 2 }} />
  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
    Buscando datos en RENIEC…
  </Typography>
  <Typography variant="body2" sx={{ color: "text.secondary" }}>
    Por favor espere un momento.
  </Typography>
</Dialog>
       
    </Box>

  );
  

};


export default Paso1Contribuyente;