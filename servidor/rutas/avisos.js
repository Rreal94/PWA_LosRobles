import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

const MAPA_PRIORIDAD = {
  Informativa: "Baja",
  Urgente: "Media",
  Emergencia: "Alta"
};

router.get("/", async (req, res, next) => {
  try {
    const [filas] = await pool.query(
      `SELECT a.id_aviso, a.titulo, a.contenido, a.fecha_publicacion, a.prioridad,
              u.nombre_completo AS autor, u.rol AS rol_autor
         FROM aviso_comunicado a
         JOIN usuario u ON u.id_usuario = a.id_usuario
        ORDER BY a.fecha_publicacion DESC`
    );

    res.json(
      filas.map((f) => ({
        id: f.id_aviso,
        titulo: f.titulo,
        contenido: f.contenido,
        fecha: String(f.fecha_publicacion).slice(0, 10),
        prioridad: MAPA_PRIORIDAD[f.prioridad] || "Baja",
        prioridad_bd: f.prioridad,
        autor: `${f.autor} (${f.rol_autor})`
      }))
    );
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { titulo, contenido, prioridad, id_usuario } = req.body || {};
    if (!titulo || !contenido || !id_usuario) {
      return res.status(400).json({ error: "Faltan titulo, contenido o id_usuario." });
    }

    const prioridadBD = ["Informativa", "Urgente", "Emergencia"].includes(prioridad)
      ? prioridad
      : "Informativa";

    const [resultado] = await pool.query(
      `INSERT INTO aviso_comunicado (titulo, contenido, fecha_publicacion, prioridad, id_usuario)
       VALUES (?, ?, NOW(), ?, ?)`,
      [titulo, contenido, prioridadBD, id_usuario]
    );

    res.status(201).json({ id_aviso: resultado.insertId, mensaje: "Aviso publicado." });
  } catch (error) {
    next(error);
  }
});

export default router;
