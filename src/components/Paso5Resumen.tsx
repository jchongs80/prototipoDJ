import React,{useState} from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ConstructionIcon from "@mui/icons-material/Construction";
import BuildIcon from "@mui/icons-material/Build";
import { Theme } from "@mui/material/styles";

import { Tooltip } from "@mui/material";

// ✅ Importa tus listas oficiales
import { ListaMuros } from "./../components/ListaMuros";
import { ListaTechos } from "./../components/ListaTechos";
import { ListaPuertasVentanas } from "./../components/ListaPuertasVentanas";
import { ListaobrasCatalogo } from "./../components/ListaObrasCatalogo";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/* ------------ Tipos (ajústalos si tienes modelos propios) ------------- */
interface ResumenPredio {
  
  codigo?: string;
  direccion?: string;
  uso?: string;
  claseUso?: string;
  subClaseUso?: string;
  condicionPropiedad?: string;
  porcentajePropiedad?: number;
  fechaAdquisicion?: string;
  imagen?: string;

  // Datos del contribuyente
  tipoPersona?: string;
  nombreCompleto?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;

  // Datos del cónyuge
  tipoDocumentoConyuge?: string;
  numeroDocumentoConyuge?: string;
  nombreConyuge?: string;

  areaTotal?: number;
  valorTotalTerreno?: number;

}

interface Piso {
  tipoNivel: string;
  nroPiso: string | number;
  fechaConstruccion: string;
  areaPropia: number | string;
  material: string;
  estadoConserv: string;
  muros: string;
  techos: string;
  puertasVentanas: string;
  valorFinal: number | string;
}

interface Obra {
  descripcion: string;
  categoria: string;
  material: string;
  estadoConserv: string;
  unidadMedida: string;
  metrado: number | string;
  valorTotalObras: number | string;
}

interface Paso5ResumenProps {
  resumenPredio?: ResumenPredio;
  pisos?: Piso[];
  obras?: Obra[];
  totalConstruccion?: number;
  totalObrasComplementarias?: number;
  theme: Theme;
}


const obtenerDescripcion = (lista: any[], valor: string) =>
  lista.find((item) => item.value === valor)?.label || "Sin descripción";

const colorPorLetra = (letra: string) => {
  switch (letra?.toUpperCase()) {
    case "A": return "#1565c0"; // azul fuerte
    case "B": return "#2e7d32"; // verde
    case "C": return "#f9a825"; // amarillo
    case "D": return "#ef6c00"; // naranja
    case "E": return "#6a1b9a"; // morado
    case "F": return "#00838f"; // Turquesa
    case "G": return "#757575"; // Gris
    case "H": return "#616161"; // Gris oscuro
    default: return "#9e9e9e";
  }
};

/* ----------------------- Componente tipado ----------------------------- */
function Paso5Resumen(props: Paso5ResumenProps) {
  const {
    resumenPredio = {},
    pisos = [],
    obras = [],
    totalConstruccion = 0,
    totalObrasComplementarias = 0,
    theme,
  } = props;

  const totalTerreno = Number(resumenPredio.valorTotalTerreno || 0);
  const autovaluoTotal =
    totalTerreno + Number(totalConstruccion) + Number(totalObrasComplementarias);

  const baseImponible = autovaluoTotal;

  const [openImagenPredio, setOpenImagenPredio] = useState(false);
  const [imagenPredioModal, setImagenPredioModal] = useState<string | null>(null);

 

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
          color="primary"
          sx={{ mb: 2 }}
        >
          📑 Resumen de Autovalúo del Predio
        </Typography>


        {/* 🧾 DATOS DEL CONTRIBUYENTE */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AccountCircleIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Datos del Contribuyente
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography><b>Tipo de Persona:</b> {resumenPredio.tipoPersona || "-"}</Typography>
            <Typography><b>Nombre / Razón Social:</b> {resumenPredio.nombreCompleto || "-"}</Typography>
            <Typography><b>Tipo de Documento:</b> {resumenPredio.tipoDocumento || "-"}</Typography>
            <Typography><b>N° Documento:</b> {resumenPredio.numeroDocumento || "-"}</Typography>
          </Box>

          {/* 👩‍❤️‍👨 Bloque adicional si es sociedad conyugal */}
          {resumenPredio.tipoPersona?.toLowerCase() === "sociedad conyugal" && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
                Datos del Cónyuge
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography><b>Nombre del Cónyuge:</b> {resumenPredio.nombreConyuge || "-"}</Typography>
                <Typography><b>Tipo de Documento:</b> {resumenPredio.tipoDocumentoConyuge || "-"}</Typography>
                <Typography><b>N° Documento:</b> {resumenPredio.numeroDocumentoConyuge || "-"}</Typography>
              </Box>
            </>
          )}
        </Paper>

        {/* 🏠 DATOS DEL PREDIO */}
<Paper
  sx={{
    p: { xs: 2, md: 3 },
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <HomeIcon color="primary" sx={{ mr: 1 }} />
    <Typography variant="h6" fontWeight={600}>
      Datos del Predio
    </Typography>
  </Box>
  <Divider sx={{ mb: 2 }} />

  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 2,
      alignItems: "flex-start",
    }}
  >
    <Box sx={{ flex: 1 }}>
      <Typography><b>Código PU:</b> {resumenPredio.codigo}</Typography>
      <Typography><b>Dirección:</b> {resumenPredio.direccion}</Typography>
      <Typography><b>Clase de Uso:</b> {resumenPredio.claseUso}</Typography>
      <Typography><b>Subclase de Uso:</b> {resumenPredio.subClaseUso}</Typography>
      <Typography><b>Condición de Propiedad:</b> {resumenPredio.condicionPropiedad}</Typography>
      <Typography><b>% Propiedad:</b> {resumenPredio.porcentajePropiedad}%</Typography>
      <Typography><b>Fecha de Adquisición:</b> {resumenPredio.fechaAdquisicion}</Typography>
      <Typography><b>Área Total:</b> {resumenPredio.areaTotal?.toFixed(2)} m²</Typography>
      <Typography sx={{ mt: 1.5, fontWeight: 600, color: "primary.main" }}>
        Valor del Terreno: S/ {Number(resumenPredio.valorTotalTerreno).toFixed(2)}
      </Typography>
    </Box>


            {/* 🖼️ Imagen del Predio con visor */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: 340 },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={resumenPredio.imagen || "/assets/predio_ejemplo.jpg"}
                alt="Imagen del predio"
                sx={{
                  width: "100%",
                  height: { xs: 180, md: 200 },
                  objectFit: "cover",
                  borderRadius: 2,
                }}
                onError={(e: any) => (e.target.src = "/assets/predio_ejemplo.jpg")}
              />

              {/* 🔍 Overlay para ver imagen */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  bgcolor: "rgba(0,0,0,0.25)",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => {
                  setImagenPredioModal(resumenPredio.imagen || "/assets/predio_ejemplo.jpg");
                  setOpenImagenPredio(true);
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.85)",
                    px: 2.5,
                    py: 0.8,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    transition: "all 0.2s ease",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#1565c0", fontWeight: 600, display: "flex", gap: 0.5 }}
                  >
                    🔍 Ver imagen
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* 🔹 Construcción */}
        <Paper
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ConstructionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Características de la Construcción
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Table size="small">
            <TableHead>
              <TableRow
                sx={{ background: "linear-gradient(90deg,#003366,#0064c8)" }}
              >
                {[
                  "Nivel",
                  "N° Piso",
                  "Fecha",
                  "Área (m²)",
                  "Material",
                  "Estado",
                  "Muros y Columnas",
                  "Techos",
                  "Puertas/Ventanas",
                  "Valor Total (S/)",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pisos.map((p, i) => (
                <TableRow
                  key={i}
                  hover
                  sx={{ "&:nth-of-type(odd)": { bgcolor: "#f9fafc" } }}
                >
                  <TableCell>{p.tipoNivel}</TableCell>
                  <TableCell>{p.nroPiso}</TableCell>
                  <TableCell>{p.fechaConstruccion}</TableCell>
                  <TableCell>{p.areaPropia}</TableCell>
                  <TableCell>{p.material}</TableCell>
                  <TableCell>{p.estadoConserv}</TableCell>

                  {/* 🔹 Traducción de códigos */}
                 {/* 🧱 MUROS */}
<TableCell align="center">
  <Tooltip
    title={<Typography sx={{ fontSize: "0.85rem", textAlign: "center" }}>{obtenerDescripcion(ListaMuros, p.muros)}</Typography>}
    arrow
    placement="top"
  >
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: colorPorLetra(p.muros),
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        mx: "auto",
        fontSize: "0.8rem",
        cursor: "help",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {p.muros}
    </Box>
  </Tooltip>
</TableCell>

{/* 🏗️ TECHOS */}
<TableCell align="center">
  <Tooltip
    title={<Typography sx={{ fontSize: "0.85rem", textAlign: "center" }}>{obtenerDescripcion(ListaTechos, p.techos)}</Typography>}
    arrow
    placement="top"
  >
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: colorPorLetra(p.techos),
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        mx: "auto",
        fontSize: "0.8rem",
        cursor: "help",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {p.techos}
    </Box>
  </Tooltip>
</TableCell>

{/* 🚪 PUERTAS Y VENTANAS */}
<TableCell align="center">
  <Tooltip
    title={<Typography sx={{ fontSize: "0.85rem", textAlign: "center" }}>{obtenerDescripcion(ListaPuertasVentanas, p.puertasVentanas)}</Typography>}
    arrow
    placement="top"
  >
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: colorPorLetra(p.puertasVentanas),
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        mx: "auto",
        fontSize: "0.8rem",
        cursor: "help",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {p.puertasVentanas}
    </Box>
  </Tooltip>
</TableCell>

                  <TableCell align="right">{Number(p.valorFinal).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: "#edf3ff" }}>
                <TableCell colSpan={9} align="right" sx={{ fontWeight: 700 }}>
                  Total Construcción
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  S/ {Number(totalConstruccion).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* 🔹 Obras Complementarias */}
{/* 🔹 Obras Complementarias */}
<Paper
  sx={{
    p: 2.5,
    mb: 3,
    borderRadius: 3,
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <BuildIcon color="primary" sx={{ mr: 1 }} />
    <Typography variant="h6" fontWeight={600}>
      Obras Complementarias
    </Typography>
  </Box>
  <Divider sx={{ mb: 2 }} />

  <Table size="small">
    <TableHead>
      <TableRow
        sx={{ background: "linear-gradient(90deg,#003366,#0064c8)" }}
      >
        {[
          "Descripción",
          "Categoría",
          "Unidad",
          "Metrado",
          "Valor Unitario (S/)",
          "Valor Total (S/)",
        ].map((h) => (
          <TableCell
            key={h}
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            {h}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {obras.map((o, i) => {
        // Buscar la obra exacta en el catálogo (por descripción)
        const obraInfo = ListaobrasCatalogo.find(
          (cat) => cat.descripcion.trim().toLowerCase() === o.descripcion.trim().toLowerCase()
        );

        const unidad = obraInfo?.unidad || o.unidadMedida || "-";
        const valorUnitario = obraInfo?.valor || o.valorTotalObras || 0;
        const valorTotal = Number(valorUnitario) * Number(o.metrado || 0);

        return (
          <TableRow
            key={i}
            hover
            sx={{ "&:nth-of-type(odd)": { bgcolor: "#f9fafc" } }}
          >
            <TableCell>{o.descripcion}</TableCell>
            <TableCell>{obraInfo?.categoria || o.categoria || "-"}</TableCell>
            <TableCell>{unidad}</TableCell>
            <TableCell>{o.metrado}</TableCell>
            <TableCell align="right">
              {valorUnitario ? valorUnitario : "-"}
            </TableCell>
            <TableCell align="right">
              {valorTotal ? valorTotal.toFixed(2) : "-"}
            </TableCell>
          </TableRow>
        );
      })}

      <TableRow sx={{ bgcolor: "#edf3ff" }}>
        <TableCell colSpan={5} align="right" sx={{ fontWeight: 700 }}>
          Total Obras Complementarias
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 700 }}>
          S/ {Number(totalObrasComplementarias).toFixed(2)}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Paper>

        {/* 🔹 Totales Finales */}
        <Paper
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            bgcolor: "#f4f8ff",
            border: "1px solid #cfe0fa",
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
            Total Terreno:
            <span style={{ float: "right" }}>
              S/ {totalTerreno.toFixed(2)}
            </span>
          </Typography>

          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
            Total Construcción:
            <span style={{ float: "right" }}>
              S/ {Number(totalConstruccion).toFixed(2)}
            </span>
          </Typography>

          <Typography sx={{ fontWeight: 700, mb: 1 }}>
            Total Obras Complementarias:
            <span style={{ float: "right" }}>
              S/ {Number(totalObrasComplementarias).toFixed(2)}
            </span>
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "primary.main",
            }}
          >
            Autovalúo Total:
            <span style={{ float: "right" }}>
              S/ {autovaluoTotal.toFixed(2)}
            </span>
          </Typography>

          {/* 🆕 BASE IMPONIBLE (por ahora igual al autovalúo total) */}
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "#37474f",
              mt: 0.5,
            }}
          >
            Base Imponible:
            <span style={{ float: "right" }}>
              S/ {baseImponible.toFixed(2)}
            </span>
          </Typography>
        </Paper>
      </Box>


      {/* ====================== MODAL IMAGEN DEL PREDIO ====================== */}
      <Dialog
        open={openImagenPredio}
        onClose={() => setOpenImagenPredio(false)}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            bgcolor: "#5379acff",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(230, 227, 227, 0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
            borderBottom: "1px solid rgba(231, 227, 227, 0.1)",
            pb: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Imagen del Predio
          </Typography>
          <IconButton onClick={() => setOpenImagenPredio(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            backgroundColor: "#000",
          }}
        >
          {imagenPredioModal ? (
            <Box
              component="img"
              src={imagenPredioModal}
              alt="Imagen del predio"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
              onError={(e: any) => (e.target.src = "/assets/predio_ejemplo.jpg")}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#ccc", textAlign: "center", py: 5 }}
            >
              No se encontró imagen para este predio.
            </Typography>
          )}
        </DialogContent>
      </Dialog>




    </ThemeProvider>
  );
}

export default Paso5Resumen;
