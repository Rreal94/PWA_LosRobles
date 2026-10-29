import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "api_losrobles",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "los_robles_db",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  dateStrings: true,
  charset: "utf8mb4_unicode_ci"
});

export async function probarConexion() {
  const [filas] = await pool.query(
    "SELECT DATABASE() AS base, VERSION() AS version, NOW() AS ahora"
  );
  return filas[0];
}
