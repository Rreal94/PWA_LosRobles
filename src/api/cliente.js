// ========================================================
// PWA Los Robles – Cliente de la API REST
// Conecta la interfaz de React 18 con la base los_robles_db
// ========================================================

const BASE = (typeof window !== "undefined" && window.LR_API_URL) || "/api";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

async function pedir(ruta, opciones = {}) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), 5000);

  try {
    const respuesta = await fetch(`${BASE}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      signal: controlador.signal,
      ...opciones
    });

    if (!respuesta.ok) {
      const cuerpo = await respuesta.json().catch(() => ({}));
      throw new Error(cuerpo.error || `HTTP ${respuesta.status}`);
    }

    return await respuesta.json();
  } finally {
    clearTimeout(temporizador);
  }
}

function periodoALegible(periodo) {
  const [anio, mes] = String(periodo).split("-");
  const indice = Number(mes) - 1;
  return `${MESES[indice] || mes} ${anio}`;
}

export const api = {
  salud: () => pedir("/salud"),
  login: (correo, password) =>
    pedir("/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo, password })
    }),
  vecinos: () => pedir("/auth/vecinos"),
  avisos: () => pedir("/avisos"),
  adeudos: () => pedir("/cuotas/adeudos"),
  cuotas: (idUsuario) => pedir(`/cuotas/usuario/${idUsuario}`),
  pagos: (idUsuario) => pedir(`/pagos/usuario/${idUsuario}`),
  reportes: () => pedir("/reportes"),
  crearReporte: (datos) =>
    pedir("/reportes", { method: "POST", body: JSON.stringify(datos) }),
  cambiarEstado: (idReporte, estado) =>
    pedir(`/reportes/${idReporte}/estado`, {
      method: "PATCH",
      body: JSON.stringify({ estado_reporte: estado })
    })
};

export async function cargarDatos() {
  const [usuarios, avisos, reportes, adeudos] = await Promise.all([
    api.vecinos(),
    api.avisos(),
    api.reportes(),
    api.adeudos()
  ]);

  const pagos = adeudos
    .filter((a) => a.Estado === "Pagada")
    .map((a, indice) => {
      const vecino = usuarios.find((u) => u.nombre === a.Colono);
      return { vecino, indice, adeudo: a };
    })
    .map(({ vecino, indice, adeudo: a }) => {
      return {
        id: indice + 1,
        usuarioId: vecino ? vecino.id : null,
        nombre: a.Colono,
        vivienda: a.Casa,
        monto: Number(a.Cuota),
        fecha: "",
        mes: periodoALegible(a.Periodo),
        referencia: `MYSQL-${a.Periodo}`,
        metodo: "Conciliado en base de datos"
      };
    });

  const fallas = reportes.map((r) => ({
    id: r.id,
    titulo: r.titulo,
    reportante: r.reportante,
    fecha: r.fecha,
    categoria: r.categoria,
    estatus:
      r.estatus === "Registrado"
        ? "Reportado"
        : r.estatus === "En Proceso"
          ? "En proceso"
          : r.estatus,
    descripcion: r.descripcion
  }));

  return { usuarios, avisos, fallas, pagos, adeudos };
}
