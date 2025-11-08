import React from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Autocomplete
} from "@mui/material";

import {
  AccountCircleOutlined,
  DescriptionOutlined,
  TodayOutlined,
  PhoneIphoneOutlined,
  EmailOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

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
import InfoCallout from "./InfoCallout";
import HelpTooltip from "../components/helpTooltip";

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


// ✅ Función auxiliar para manejar Autocomplete
const handleAutoCompleteChange = (name: string, value: any) => {
  handleChange({
    target: {
      name,
      value,
    },
  } as React.ChangeEvent<HTMLInputElement>);
};



  return (
    <Box sx={{ p: 1, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
  
      <InfoCallout
    title="¿Qué registrarás aquí?"
    body="Completa tus datos personales y, si corresponde, los de tu cónyuge. Adjunta los documentos solicitados, como el recibo de servicio o la constancia de condición especial."
  />

{/* 🔹 Encabezado */}
<Typography
  variant="h6"
  sx={{
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    color: "#003366",
    mb: 2,
    gap: 1,
  }}
>
  <AccountCircleOutlined sx={{ color: "#0056b3" }} />
  Datos del Contribuyente
</Typography>

{/* 🩵 CONTENEDOR PRINCIPAL: Datos personales + Teléfonos */}
    <Paper
      elevation={0}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
        gap: { xs: 1.5, md: 2 },
        p: { xs: 1.5, md: 2 },
        mb: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
  {/* 🩵 Caja izquierda: datos informativos */}
  <Box
    sx={{
      bgcolor: "#f9f9f9",
      p: { xs: 1.5, md: 1.8 },
      borderRadius: 2,
      border: "1px solid #e0e0e0",
      display: "flex",
      flexDirection: "column",
      gap: 1,
    }}
  >
    {/* 🔹 Fila 1 */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1.5fr 1fr 1fr" },
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* Apellidos y Nombres */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <AccountCircleOutlined sx={{ color: "#0056b3", fontSize: 18 }} />
        <Box>
          <Typography variant="subtitle2" sx={{
    color: "text.secondary",
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    lineHeight: 1.1, // 🔹 más compacto
    mb: 0.2,         // 🔹 separa solo un poquito del valor
  }}>
            Apellidos y Nombres
          </Typography>
          <Typography variant="body2" sx={{
    fontWeight: 600,
    color: "#222",
    fontSize: { xs: "0.85rem", md: "0.9rem" },
    lineHeight: 1.2, // 🔹 más ajustado
  }}
          >
            {formData.apellidosNombres}
          </Typography>
        </Box>
      </Box>

      {/* Tipo Documento */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <DescriptionOutlined sx={{ color: "#0056b3", fontSize: 18 }} />
        <Box>
          <Typography variant="subtitle2" sx={{
    color: "text.secondary",
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    lineHeight: 1.1, // 🔹 más compacto
    mb: 0.2,         // 🔹 separa solo un poquito del valor
  }}>
            Tipo de Documento
          </Typography>
          <Typography variant="body2" sx={{
    fontWeight: 600,
    color: "#222",
    fontSize: { xs: "0.85rem", md: "0.9rem" },
    lineHeight: 1.2, // 🔹 más ajustado
  }}>
            {formData.tipoDocumento}
          </Typography>
        </Box>
      </Box>

      {/* N° Documento */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <DescriptionOutlined sx={{ color: "#0056b3", fontSize: 18 }} />
        <Box>
          <Typography variant="subtitle2" sx={{
    color: "text.secondary",
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    lineHeight: 1.1, // 🔹 más compacto
    mb: 0.2,         // 🔹 separa solo un poquito del valor
  }}>
            N° Documento
          </Typography>
          <Typography variant="body2" sx={{
    fontWeight: 600,
    color: "#222",
    fontSize: { xs: "0.85rem", md: "0.9rem" },
    lineHeight: 1.2, // 🔹 más ajustado
  }}>
            {formData.nroDocumento}
          </Typography>
        </Box>
      </Box>
    </Box>

    <Divider sx={{ my: 1 }} />

    {/* 🔹 Fila 2 */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1.5fr 1fr 1fr" },
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* Fecha de Nacimiento */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <TodayOutlined sx={{ color: "#0056b3", fontSize: 18 }} />
        <Box>
          <Typography variant="subtitle2" sx={{
    color: "text.secondary",
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    lineHeight: 1.1, // 🔹 más compacto
    mb: 0.2,         // 🔹 separa solo un poquito del valor
  }}>
            Fecha de Nacimiento
          </Typography>
          <Typography variant="body2" sx={{
    fontWeight: 600,
    color: "#222",
    fontSize: { xs: "0.85rem", md: "0.9rem" },
    lineHeight: 1.2, // 🔹 más ajustado
  }}>
            {formData.fechaNacimiento}
          </Typography>
        </Box>
      </Box>

      {/* Celular */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <PhoneIphoneOutlined sx={{ color: "#0056b3", fontSize: 18 }} />
        <Box>
          <Typography variant="subtitle2" sx={{
    color: "text.secondary",
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    lineHeight: 1.1, // 🔹 más compacto
    mb: 0.2,         // 🔹 separa solo un poquito del valor
  }}>
            Celular
          </Typography>
          <Typography variant="body2" sx={{
    fontWeight: 600,
    color: "#222",
    fontSize: { xs: "0.85rem", md: "0.9rem" },
    lineHeight: 1.2, // 🔹 más ajustado
  }}>
            {formData.celular}
          </Typography>
        </Box>
      </Box>

      {/* Correo Electrónico */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <EmailOutlined sx={{ color: "#0056b3", fontSize: 18 }} />
        <Box>
          <Typography variant="subtitle2" sx={{
    color: "text.secondary",
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    lineHeight: 1.1, // 🔹 más compacto
    mb: 0.2,         // 🔹 separa solo un poquito del valor
  }}>
            Correo Electrónico
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: "0.85rem", md: "0.9rem" }, fontWeight: 600, color: "#222", wordBreak: "break-word", lineHeight: 1.2,  }}>
            {formData.correo}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>

  {/* 🩶 Caja derecha: teléfonos editables */}
  {/* 🩶 Caja derecha: teléfonos editables */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 1.2,
    p: 2,
    bgcolor: "#fafafa",
    borderRadius: 2,
    border: "1px solid #e0e0e0",
    "& .MuiInputBase-input": {
      fontSize: "1rem", // 👈 tamaño del texto dentro del input
      py: 0.7,
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.9rem", // 👈 tamaño del label flotante
    },
  }}
>
  {/* Teléfono fijo */}
  <TextField
    name="telefonoFijo"
    label="Teléfono Fijo"
    value={formData.telefonoFijo}
    onChange={handleChange}
    fullWidth
    size="small"
    autoComplete="off"
    InputProps={{
      endAdornment: (
        <HelpTooltip
          text="Ingrese su teléfono fijo principal. Este número podrá ser usado para validaciones o contacto administrativo."
          placement="top"
        />
      ),
    }}
  />

  {/* Teléfono de referencia */}
  <TextField
    name="telefonoReferencia"
    label="Teléfono de Referencia"
    value={formData.telefonoReferencia}
    onChange={handleChange}
    fullWidth
    size="small"
    autoComplete="off"
    InputProps={{
      endAdornment: (
        <HelpTooltip
          text="Registre un teléfono adicional de contacto, puede ser de un familiar o persona de referencia."
          placement="top"
        />
      ),
    }}
  />
</Box>
</Paper>

     {/* Datos del cónyuge */}
{tipoPersona === "Sociedad Conyugal" && (
  <>
    <Divider sx={{ my: 3 }} />
    <Typography
      variant="h6"
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        color: "#003366",
        mb: 2,
      }}
    >
      <img
        src={conyugeIcon}
        alt="Conyuge"
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      Datos del Cónyuge
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 2,
        mb: 2,
        bgcolor: "#ffffff",
        p: 2,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        "& .MuiInputBase-input": {
          fontSize: "1rem",
          py: 0.7,
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.9rem",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "0.75rem",
        },
        // 🔹 Ajuste para SELECT (asegura mismo alto)
        "& .MuiSelect-select": {
          fontSize: "0.85rem !important",
          paddingY: "7px !important",
          minHeight: "18px !important",
          display: "flex",
          alignItems: "center",
        },
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
                <IconButton
                  color="primary"
                  onClick={handleBuscarConyuge}
                  sx={{
                    "&:hover": { bgcolor: "rgba(21,101,192,0.08)" },
                    p: 0.5,
                  }}
                >
                  <SearchIcon fontSize="small" />
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

      {/* Apellidos y Nombres */}
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
  <HelpTooltip
    text="Si selecciona una condición especial (ej. CONADIS u otra), deberá subir el archivo PDF que acredite dicha condición."
    placement="top"
  />
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
  <HelpTooltip
    text="Debe subir el PDF escaneado de su recibo de agua o luz. Este documento se utiliza para validar su dirección fiscal registrada."
    placement="top"
  />
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
      mt: 2,
      p: 3,
      bgcolor: "#ffffff",
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      border: "1px solid #e0e0e0",
      transition: "all 0.3s ease",
      "& .MuiInputBase-input": {
        fontSize: "1rem", // 👈 tamaño del texto dentro del input
        py: 0.7,
      },
      "& .MuiInputLabel-root": {
        fontSize: "0.9rem", // 👈 tamaño del label flotante
      },
      "& .MuiFormHelperText-root": {
        fontSize: "0.75rem", // 👈 si hay helperText
      },
          // 👇 Ajuste adicional para Autocomplete
    "& .MuiAutocomplete-input": {
      fontSize: "1rem",
      padding: "6px 0 !important",
    },
    "& .MuiAutocomplete-inputRoot": {
      minHeight: "30px !important", // iguala el alto de TextField
      paddingY: "0 !important",
    },
    }}
  >
    <Typography
      variant="h6"
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        color: "#003366",
        mb: 1,
      }}
    >
      <img
        src={direccionDetalladaIcon}
        alt="Dirección detallada"
        style={{ width: 30, height: 30, marginRight: 8 }}
      />
      Detalle de Dirección Fiscal
      <HelpTooltip
        text="Complete los datos de su dirección fiscal tal como figura en su recibo de servicio o documento oficial."
        placement="top"
      />
    </Typography>

    {/* ✅ Función auxiliar para Autocomplete */}
    {/** 
      const handleAutoCompleteChange = (name: string, value: any) => {
        handleChange({
          target: { name, value },
        } as React.ChangeEvent<HTMLInputElement>);
      };
    */}

    {/* PRIMERA FILA */}


    <Typography
      variant="body2"
      sx={{ color: "#666", textAlign: "right", fontStyle: "italic", marginTop:0, marginBottom:2 }}
    >
      ✎ Actualiza solo si la dirección fiscal del contribuyente ha cambiado.
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      {/* Distrito */}
      <Autocomplete
        options={[
          "Cercado de Lima",
          "San Isidro",
          "Miraflores",
          "Surco",
          "La Molina",
          "Los Olivos",
        ]}
        value={formData.distrito || ""}
        onChange={(e, newValue) =>
          handleAutoCompleteChange("distrito", newValue || "")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Distrito
                <HelpTooltip
                  text="Seleccione el distrito donde se ubica la dirección fiscal."
                  placement="top"
                />
              </Box>
            }
            size="small"
            
          />
        )}
      />

      {/* Tipo de vía */}
      <Autocomplete
        options={[
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
        ]}
        value={formData.tipoVia || ""}
        onChange={(e, newValue) =>
          handleAutoCompleteChange("tipoVia", newValue || "")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Tipo de Via
                <HelpTooltip
                  text="Seleccione el tipo de vía: calle, jirón, avenida, etc."
                  placement="top"
                />
              </Box>
            }
            size="small"
          />
        )}
      />

      {/* Descripción de la vía */}
      <TextField
        name="descVia"
        label="Descripción de la vía"
        value={formData.descVia}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <HelpTooltip
              text="Ingrese el nombre de la vía (ejemplo: Av. Arequipa, Jr. Camaná, etc.)."
              placement="top"
            />
          ),
        }}
      />

      {/* Número */}
      <TextField
        name="numeroPuerta"
        label="Número"
        value={formData.numeroPuerta}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <HelpTooltip
              text="Ingrese el número de la puerta según su recibo o documento de dirección."
              placement="top"
            />
          ),
        }}
      />
    </Box>

    {/* SEGUNDA FILA */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
        mt: 2,
      }}
    >
      {/* Tipo denom. urbana */}
      <Autocomplete
        options={[
          "Ninguno",
          "Urbanización",
          "Asentamiento Humano",
          "Conj. Habitacional",
          "Residencial",
          "Cooperativa de vivienda",
          "Pueblo Joven",
          "Agrupación",
        ]}
        value={formData.tipoDenomUrbana || ""}
        onChange={(e, newValue) =>
          handleAutoCompleteChange("tipoDenomUrbana", newValue || "")
        }
        renderInput={(params) => (
          <TextField
            {...params}
             label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Tipo Denom. Urbana
                <HelpTooltip
                  text="Seleccione el tipo de agrupación urbana o residencial (ejemplo: Urbanización, Residencial, etc.)."
                  placement="top"
                />
              </Box>
            }
            size="small"
            
          />
        )}
      />

      {/* Descripción denom. urbana */}
      <TextField
        name="descDenomUrbana"
        label="Descripción denom. urbana"
        value={formData.descDenomUrbana}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <HelpTooltip
              text="Ingrese el nombre de la urbanización o conjunto habitacional si aplica."
              placement="top"
            />
          ),
        }}
      />

      {/* Departamento */}
      <TextField
        name="departamento"
        label="Departamento"
        value={formData.departamento}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <HelpTooltip
              text="Ingrese el número o nombre de departamento (ejemplo: Dpto. 302)."
              placement="top"
            />
          ),
        }}
      />

      {/* Oficina */}
      <TextField
        name="oficina"
        label="Oficina"
        value={formData.oficina}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <HelpTooltip
              text="Indique la oficina o local si se trata de una propiedad comercial o administrativa."
              placement="top"
            />
          ),
        }}
      />
    </Box>

    {/* TERCERA FILA */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
        mt: 2,
      }}
    >
      {[
        ["interior", "Interior", "Ingrese el número o letra del interior si aplica."],
        ["manzana", "Manzana", "Ingrese la manzana según figura en su dirección."],
        ["lote", "Lote", "Ingrese el número de lote correspondiente."],
        ["seccion", "Sección", "Ingrese la sección o bloque si corresponde."],
        ["block", "Block", "Ingrese el bloque o torre si aplica."],
        ["ucv", "UCV", "Unidad Catastral de Vivienda (solo si corresponde)."],
        ["edificio", "Edificio", "Ingrese el nombre del edificio si aplica."],
        ["referencia", "Referencia", "Agregue una referencia adicional para ubicar su dirección."],
      ].map(([name, label, help]) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={formData[name as keyof typeof formData] || ""}
          onChange={handleChange}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: <HelpTooltip text={help} placement="top" />,
          }}
        />
      ))}
    </Box>

   
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