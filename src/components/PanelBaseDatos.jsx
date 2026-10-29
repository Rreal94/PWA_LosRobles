import React, { useEffect, useState } from "react";
import { api } from "../api/cliente.js";

const ENDPOINTS = [
  { metodo: "GET", ruta: "/api/salud", detalle: "Verifica la conexión con MySQL" },
  { metodo: "POST", ruta: "/api/auth/login", detalle: "Valida la contraseña con bcrypt" },
  { metodo: "GET", ruta: "/api/avisos", detalle: "Tablón desde aviso_comunicado" },
  { metodo: "GET", ruta: "/api/cuotas/adeudos", detalle: "Lee la vista vista_adeudos_vecinos" },
  { metodo: "GET", ruta: "/api/reportes", detalle: "Incidencias con datos del vecino" },
  { metodo: "PATCH", ruta: "/api/reportes/:id/estado", detalle: "Actualiza estado_reporte" }
];

export default function PanelBaseDatos() {
  const [estado, setEstado] = useState("conectando");
  const [info, setInfo] = useState(null);
  const [adeudos, setAdeudos] = useState([]);
  const [error, setError] = useState("");

  const consultar = async () => {
    setEstado("conectando");
    setError("");
    try {
      const salud = await api.salud();
      const vista = await api.adeudos();
      setInfo(salud);
      setAdeudos(vista);
      setEstado("conectado");
    } catch (e) {
      setEstado("sin-conexion");
      setError(e.message);
    }
  };

  useEffect(() => {
    consultar();
  }, []);

  const color =
    estado === "conectado" ? "#166534" : estado === "conectando" ? "#92400E" : "#991B1B";

  return (
    <div className="panel-bd" style={{ padding: "4px 0" }}>
      <div className="tarjeta-bienvenida" style={{ padding: "18px", borderRadius: "10px", background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0 }}>Conexión con MySQL</h2>
            <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#475569" }}>
              Los datos de esta pantalla se consultan en vivo a la base los_robles_db.
            </p>
          </div>
          <span style={{ background: "#FFFFFF", border: `1px solid ${color}`, color, padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "bold" }}>
            {estado === "conectado" ? "● Conectado" : estado === "conectando" ? "◌ Conectando" : "● Sin conexión"}
          </span>
        </div>

        {info && (
          <p style={{ margin: "12px 0 0", fontSize: "13px", color: "#334155" }}>
            Base: <strong>{info.base}</strong> · MySQL <strong>{info.version}</strong> · Servidor {info.ahora}
          </p>
        )}

        {error && (
          <p style={{ margin: "12px 0 0", fontSize: "13px", color: "#991B1B" }}>
            {error}. Verifica que la API esté corriendo en el puerto 4000.
          </p>
        )}

        <button
          onClick={consultar}
          style={{ marginTop: "14px", padding: "8px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer", fontSize: "13px" }}
        >
          ↻ Volver a consultar
        </button>
      </div>

      <h3 style={{ margin: "22px 0 10px", fontSize: "16px" }}>Vista vista_adeudos_vecinos</h3>
      <div style={{ overflowX: "auto", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#F1F5F9", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Colono</th>
              <th style={{ padding: "10px" }}>Casa</th>
              <th style={{ padding: "10px" }}>Periodo</th>
              <th style={{ padding: "10px" }}>Cuota</th>
              <th style={{ padding: "10px" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {adeudos.map((a, i) => (
              <tr key={`${a.Casa}-${a.Periodo}-${i}`} style={{ borderTop: "1px solid #E2E8F0" }}>
                <td style={{ padding: "9px 10px" }}>{a.Colono}</td>
                <td style={{ padding: "9px 10px" }}>{a.Casa}</td>
                <td style={{ padding: "9px 10px" }}>{a.Periodo}</td>
                <td style={{ padding: "9px 10px" }}>${Number(a.Cuota).toFixed(2)}</td>
                <td style={{ padding: "9px 10px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "11px", background: a.Estado === "Pagada" ? "#DCFCE7" : a.Estado === "Vencida" ? "#FEE2E2" : "#FEF3C7", color: a.Estado === "Pagada" ? "#166534" : a.Estado === "Vencida" ? "#991B1B" : "#92400E" }}>
                    {a.Estado}
                  </span>
                </td>
              </tr>
            ))}
            {adeudos.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "14px", color: "#64748B" }}>
                  Sin registros disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 style={{ margin: "22px 0 10px", fontSize: "16px" }}>Endpoints consumidos por la PWA</h3>
      <div style={{ background: "#0F172A", color: "#E2E8F0", borderRadius: "10px", padding: "14px 16px", fontFamily: "monospace", fontSize: "12.5px", lineHeight: 1.8 }}>
        {ENDPOINTS.map((e) => (
          <div key={e.ruta}>
            <span style={{ color: e.metodo === "GET" ? "#7DD3FC" : e.metodo === "POST" ? "#86EFAC" : "#FCD34D" }}>{e.metodo.padEnd(6)}</span>
            {e.ruta}
            <span style={{ color: "#94A3B8" }}> · {e.detalle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
