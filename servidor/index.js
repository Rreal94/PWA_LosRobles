import express from "express";
import cors from "cors";
import "dotenv/config";
import { probarConexion } from "./db.js";
import rutasAuth from "./rutas/auth.js";
import rutasAvisos from "./rutas/avisos.js";
import rutasCuotas from "./rutas/cuotas.js";
import rutasPagos from "./rutas/pagos.js";
import rutasReportes from "./rutas/reportes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/salud", async (req, res) => {
  try {
    const info = await probarConexion();
    res.json({ estado: "ok", ...info });
  } catch (error) {
    res.status(500).json({ estado: "error", detalle: error.message });
  }
});

app.use("/api/auth", rutasAuth);
app.use("/api/avisos", rutasAvisos);
app.use("/api/cuotas", rutasCuotas);
app.use("/api/pagos", rutasPagos);
app.use("/api/reportes", rutasReportes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use((error, req, res, next) => {
  console.error("[api] error:", error.message);
  res.status(500).json({
    error: "Error interno del servidor.",
    detalle: error.sqlMessage || error.message
  });
});

const puerto = Number(process.env.PORT || 4000);

app.listen(puerto, async () => {
  console.log(`API Los Robles escuchando en http://localhost:${puerto}`);
  try {
    const info = await probarConexion();
    console.log(`Conectada a la base ${info.base} con MySQL ${info.version}`);
  } catch (error) {
    console.error("No fue posible conectar con MySQL:", error.message);
  }
});
