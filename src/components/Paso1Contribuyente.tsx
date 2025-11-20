import React from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Divider,
  MenuItem,
} from "@mui/material";

import {
  AccountCircleOutlined,
  DescriptionOutlined,
  TodayOutlined,
  PhoneIphoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";

import conyugeIcon from "./../assets/conyuge.png";
import condicionEspecialIcon from "./../assets/anciano.png";
import direccionCompletaIcon from "./../assets/localizacion.png";

import CondicionEspecial from "./condicionEspecial";

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
  setMostrarDireccionDetallada: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  mostrarDireccionDetallada: boolean;
  handleFileChange: (file: File | null) => void;
  handleReciboChange: (file: File | null) => void;
  errorCondicionFile?: string;
  errorReciboFile?: string;
}

const Paso1Contribuyente: React.FC<Paso1ContribuyenteProps> = ({
  tipoPersona,
  formData,
  handleChange,
  setMostrarDireccionDetallada, // eslint-disable-line @typescript-eslint/no-unused-vars
  mostrarDireccionDetallada, // eslint-disable-line @typescript-eslint/no-unused-vars
  handleFileChange,
  handleReciboChange, // eslint-disable-line @typescript-eslint/no-unused-vars
  errorCondicionFile,
  errorReciboFile, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  const [errorTipoDocConyuge, setErrorTipoDocConyuge] =
    React.useState(false);
  const [errorNroDocConyuge, setErrorNroDocConyuge] = React.useState(false);
  const [errorMsgTipoDoc, setErrorMsgTipoDoc] = React.useState("");
  const [errorMsgNroDoc, setErrorMsgNroDoc] = React.useState("");

  const [openBuscarReniec, setOpenBuscarReniec] = React.useState(false);

  const handleBuscarConyuge = () => {
    let hasError = false;

    if (!formData.tipoDocConyuge) {
      setErrorTipoDocConyuge(true);
      setErrorMsgTipoDoc("Seleccione un tipo de documento.");
      hasError = true;
    }

    if (!formData.nroDocConyuge?.trim()) {
      setErrorNroDocConyuge(true);
      setErrorMsgNroDoc("Ingrese el número de documento.");
      hasError = true;
    }

    if (hasError) return;

    setErrorTipoDocConyuge(false);
    setErrorNroDocConyuge(false);
    setErrorMsgTipoDoc("");
    setErrorMsgNroDoc("");

    setOpenBuscarReniec(true);

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

  const CampoDireccion: React.FC<{ label: string; value?: string }> = ({
    label,
    value,
  }) => {
    if (!value) return null;
    return (
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontSize: "0.75rem" }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#222",
            fontSize: "0.85rem",
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 1, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <InfoCallout
        title="¿Qué registrarás aquí?"
        body="Revisa tus datos personales y, si corresponde, los de tu cónyuge. También podrás indicar si solicitas un beneficio como pensionista o adulto mayor. Tu dirección fiscal se muestra solo como información y no puede modificarse en este paso."
      />

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

      {/* Datos contribuyente + teléfonos */}
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
        {/* Datos informativos */}
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
          {/* Fila 1 */}
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
              <AccountCircleOutlined
                sx={{ color: "#0056b3", fontSize: 18 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.1,
                    mb: 0.2,
                  }}
                >
                  Apellidos y Nombres
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#222",
                    fontSize: { xs: "0.85rem", md: "0.9rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {formData.apellidosNombres}
                </Typography>
              </Box>
            </Box>

            {/* Tipo Documento */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <DescriptionOutlined
                sx={{ color: "#0056b3", fontSize: 18 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.1,
                    mb: 0.2,
                  }}
                >
                  Tipo de Documento
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#222",
                    fontSize: { xs: "0.85rem", md: "0.9rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {formData.tipoDocumento}
                </Typography>
              </Box>
            </Box>

            {/* N° Documento */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <DescriptionOutlined
                sx={{ color: "#0056b3", fontSize: 18 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.1,
                    mb: 0.2,
                  }}
                >
                  N° Documento
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#222",
                    fontSize: { xs: "0.85rem", md: "0.9rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {formData.nroDocumento}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Fila 2 */}
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
              <TodayOutlined
                sx={{ color: "#0056b3", fontSize: 18 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.1,
                    mb: 0.2,
                  }}
                >
                  Fecha de Nacimiento
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#222",
                    fontSize: { xs: "0.85rem", md: "0.9rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {formData.fechaNacimiento}
                </Typography>
              </Box>
            </Box>

            {/* Celular */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <PhoneIphoneOutlined
                sx={{ color: "#0056b3", fontSize: 18 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.1,
                    mb: 0.2,
                  }}
                >
                  Celular
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#222",
                    fontSize: { xs: "0.85rem", md: "0.9rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {formData.celular}
                </Typography>
              </Box>
            </Box>

            {/* Correo Electrónico */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <EmailOutlined
                sx={{ color: "#0056b3", fontSize: 18 }}
              />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.1,
                    mb: 0.2,
                  }}
                >
                  Correo Electrónico
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.85rem", md: "0.9rem" },
                    fontWeight: 600,
                    color: "#222",
                    wordBreak: "break-word",
                    lineHeight: 1.2,
                  }}
                >
                  {formData.correo}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Teléfonos editables */}
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
              fontSize: "1rem",
              py: 0.7,
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
            },
          }}
        >
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
              "& .MuiSelect-select": {
                fontSize: "0.85rem !important",
                paddingY: "7px !important",
                minHeight: "18px !important",
                display: "flex",
                alignItems: "center",
              },
            }}
          >
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
                <MenuItem value="DNI/Libreta Electoral">
                  DNI / Libreta Electoral
                </MenuItem>
                <MenuItem value="Carnet de Identidad">
                  Carnet de Identidad
                </MenuItem>
                <MenuItem value="Carnet de Extranjería">
                  Carnet de Extranjería
                </MenuItem>
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

            <TextField
              label="Apellidos y Nombres"
              name="apellidosConyuge"
              value={formData.apellidosConyuge}
              onChange={handleChange}
              fullWidth
              size="small"
            />

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

      {/* Dirección fiscal a la IZQUIERDA / Condición especial a la DERECHA */}
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
        {/* 🏠 Dirección Fiscal IZQUIERDA */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "48%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#003366",
              mb: 1,
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
              text="Esta es la dirección fiscal registrada en el SAT. Se muestra solo como información y no puede modificarse en este trámite."
              placement="top"
            />
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
              mb: 1,
            }}
          >
            Verifica que esta dirección corresponda al predio donde resides.
            Si existe alguna inconsistencia, podrás solicitar su actualización
            por los canales de atención del SAT.
          </Typography>

        <Paper
  elevation={0}
  sx={{
    mt: 1,
    p: 2.5,
    borderRadius: 2,
    border: "1px solid #d0d7de",
    bgcolor: "#fafafa",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  }}
>
  {/* Título dentro de la tarjeta */}
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: 700,
      color: "#1a2b49",
      mb: 2,
      display: "flex",
      alignItems: "center",
      gap: 1,
      letterSpacing: "0.3px",
    }}
  >
    Dirección fiscal registrada
  </Typography>

  {/* GRID Premium — totalmente unificado */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
        md: "repeat(3,1fr)",
      },
      columnGap: 3,
      rowGap: 1.5,
    }}
  >
    <CampoDireccion label="Distrito" value={formData.distrito} />
    <CampoDireccion label="Tipo de vía" value={formData.tipoVia} />
    <CampoDireccion label="Nombre de la vía" value={formData.descVia} />
    <CampoDireccion label="Número" value={formData.numeroPuerta} />
    <CampoDireccion label="Interior" value={formData.interior} />
    <CampoDireccion label="Manzana" value={formData.manzana} />
    <CampoDireccion label="Lote" value={formData.lote} />
    <CampoDireccion label="Sección" value={formData.seccion} />
    <CampoDireccion label="Block" value={formData.block} />
    <CampoDireccion label="Edificio" value={formData.edificio} />
    <CampoDireccion label="UCV" value={formData.ucv} />
    <CampoDireccion
      label="Departamento / Oficina"
      value={
        formData.departamento || formData.oficina
          ? `${formData.departamento || ""}${
              formData.departamento && formData.oficina ? " / " : ""
            }${formData.oficina || ""}`
          : ""
      }
    />
    <CampoDireccion label="Tipo denom. urbana" value={formData.tipoDenomUrbana} />
    <CampoDireccion label="Nombre denom. urbana" value={formData.descDenomUrbana} />
    <CampoDireccion label="Referencia" value={formData.referencia} />
  </Box>

  {/* Línea inferior */}
  <Typography
    variant="caption"
    sx={{
      display: "block",
      mt: 2,
      color: "text.secondary",
      fontStyle: "italic",
    }}
  >
    Esta dirección es proporcionada por el sistema y no puede ser modificada en este trámite.
  </Typography>
</Paper>
        </Box>

        {/* 📄 Condición especial DERECHA */}
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
              text="Si seleccionas 'Soy Pensionista', deberás adjuntar el archivo PDF que acredite tu condición. Si eres adulto mayor no pensionista, solo se validarán los requisitos declarados."
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
      </Box>

      {/* Modal búsqueda RENIEC */}
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