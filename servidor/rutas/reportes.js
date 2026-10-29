import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

const ESTADOS_VALIDOS = ["Registrado", "En Proceso", "Resuelto", "Cancelado"];

router.get("/", async (req, res, next) => {
  try {
    const [filas] = await pool.query(
      `SELECT r.id_reporte, r.asunto, r.descripcion, r.fecha_creacion, r.ubicacion,
              r.estado_reporte, u.nombre_completo AS reportante, v.numero_casa
         FROM reporte_incidencia r
         JOIN usuario u ON u.id_usuario = r.id_usuario
         JOIN vivienda v ON v.id_vivienda = u.id_vivienda
        ORDER BY r.fecha_creacion DESC`
    );

    res.json(
      filas.map((f) => ({
        id: f.id_reporte,
        titulo: f.asunto,
        descripcion: f.descripcion,
        fecha: String(f.fecha_creacion).slice(0, 10),
        categoria: "Áreas comunes",
        estatus: f.estado_reporte,
        reportante: `${f.reportante} (${f.numero_casa})`,
        ubicacion: f.ubicacion
      }))
    );
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { asunto, descripcion, ubicacion, id_usuario } = req.body || {};
    if (!asunto || !descripcion || !ubicacion || !id_usuario) {
      return res.status(400).json({
        error: "Faltan asunto, descripcion, ubicacion o id_usuario."
      });
    }

    const [resultado] = await pool.query(
      `INSERT INTO reporte_incidencia
         (asunto, descripcion, fecha_creacion, ubicacion, estado_reporte, id_usuario)
       VALUES (?, ?, NOW(), ?, 'Registrado', ?)`,
      [asunto, descripcion, ubicacion, id_usuario]
    );

    res.status(201).json({ id_reporte: resultado.insertId, mensaje: "Reporte registrado." });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idReporte/estado", async (req, res, next) => {
  try {
    const { estado_reporte } = req.body || {};
    if (!ESTADOS_VALIDOS.includes(estado_reporte)) {
      return res.status(400).json({
        error: `Estado inválido. Use: ${ESTADOS_VALIDOS.join(", ")}.`
      });
    }

    const [resultado] = await pool.query(
      `UPDATE reporte_incidencia SET estado_reporte = ? WHERE id_reporte = ?`,
      [estado_reporte, req.params.idReporte]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Reporte no encontrado." });
    }

    res.json({ id_reporte: Number(req.params.idReporte), estado_reporte });
  } catch (error) {
    next(error);
  }
});

export default router;
