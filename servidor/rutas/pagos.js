import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/usuario/:idUsuario", async (req, res, next) => {
  try {
    const [filas] = await pool.query(
      `SELECT p.id_pago, p.monto_pagado, p.fecha_pago, p.metodo_pago,
              p.folio_comprobante, p.estado_pago, c.periodo, v.numero_casa
         FROM pago p
         JOIN cuota_mantenimiento c ON c.id_cuota = p.id_cuota
         JOIN vivienda v ON v.id_vivienda = c.id_vivienda
        WHERE p.id_usuario = ?
        ORDER BY p.fecha_pago DESC`,
      [req.params.idUsuario]
    );
    res.json(filas);
  } catch (error) {
    next(error);
  }
});

export default router;
