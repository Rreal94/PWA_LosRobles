import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

const router = Router();

const ROLES_ADMIN = ["Administrador", "Tesorero", "Secretario"];

function aFormatoApp(fila) {
  return {
    id: fila.id_usuario,
    nombre: fila.nombre_completo,
    correo: fila.correo,
    telefono: fila.telefono,
    tipo: ROLES_ADMIN.includes(fila.rol) ? "admin" : "vecino",
    cargo: fila.rol,
    vivienda: fila.numero_casa
      ? (String(fila.numero_casa).startsWith("Casa")
          ? fila.numero_casa
          : `Casa ${fila.numero_casa}`)
      : null,
    cuotaMensual: 500
  };
}

router.post("/login", async (req, res, next) => {
  try {
    const { correo, password } = req.body || {};
    if (!correo || !password) {
      return res.status(400).json({ error: "Correo y contraseña son obligatorios." });
    }

    const [filas] = await pool.query(
      `SELECT u.id_usuario, u.nombre_completo, u.correo, u.password_hash,
              u.telefono, u.rol, v.numero_casa
         FROM usuario u
         JOIN vivienda v ON v.id_vivienda = u.id_vivienda
        WHERE u.correo = ?
        LIMIT 1`,
      [correo.trim().toLowerCase()]
    );

    if (filas.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const fila = filas[0];
    const coincide = await bcrypt.compare(password, fila.password_hash);
    if (!coincide) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    res.json({ usuario: aFormatoApp(fila) });
  } catch (error) {
    next(error);
  }
});

router.get("/vecinos", async (req, res, next) => {
  try {
    const [filas] = await pool.query(
      `SELECT u.id_usuario, u.nombre_completo, u.correo, u.telefono, u.rol,
              v.numero_casa, v.calle
         FROM usuario u
         JOIN vivienda v ON v.id_vivienda = u.id_vivienda
        ORDER BY v.numero_casa`
    );
    res.json(filas.map(aFormatoApp));
  } catch (error) {
    next(error);
  }
});

export default router;
