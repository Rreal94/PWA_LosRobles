import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/adeudos", async (req, res, next) => {
  try {
    const [filas] = await pool.query(
      `SELECT * FROM vista_adeudos_vecinos ORDER BY Casa, Periodo`
    );
    res.json(filas);
  } catch (error) {
    next(error);
  }
});

router.get("/usuario/:idUsuario", async (req, res, next) => {
  try {
    const [filas] = await pool.query(
      `SELECT c.id_cuota, c.periodo, c.monto_fijado, c.fecha_vencimiento,
              c.estado_cuota, v.numero_casa,
              (SELECT COALESCE(SUM(p.monto_pagado), 0)
                 FROM pago p
                WHERE p.id_cuota = c.id_cuota AND p.estado_pago = 'Aprobado') AS pagado
         FROM cuota_mantenimiento c
         JOIN vivienda v ON v.id_vivienda = c.id_vivienda
         JOIN usuario u ON u.id_vivienda = v.id_vivienda
        WHERE u.id_usuario = ?
        ORDER BY c.periodo DESC`,
      [req.params.idUsuario]
    );
    res.json(filas);
  } catch (error) {
    next(error);
  }
});

export default router;
