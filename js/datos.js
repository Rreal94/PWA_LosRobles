/* ============================================
   PWA Los Robles – Sistema de Gestión Vecinal
   Archivo: js/datos.js
   Datos del sistema y funciones de localStorage
   Equipo 1 · Sprint 1 · Mayo 2026
   ============================================ */

// ── Datos de ejemplo para inicializar el sistema ──
const DATOS_DEMO = {

  usuarios: [
    // Administradores (Mesa Directiva)
    { id: 1, nombre: "Don Pedro García",   correo: "pedro@losrobles.mx",   password: "losrobles123", tipo: "admin",  cargo: "Presidente",  vivienda: null, cuotaMensual: null },
    { id: 2, nombre: "Doña Laura Sánchez", correo: "laura@losrobles.mx",   password: "losrobles123", tipo: "admin",  cargo: "Tesorera",    vivienda: null, cuotaMensual: null },
    // Vecinos
    { id: 3,  nombre: "Rosa Martínez",     correo: "rosa@losrobles.mx",    password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 01", cuotaMensual: 500 },
    { id: 4,  nombre: "José González",     correo: "jose@losrobles.mx",    password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 02", cuotaMensual: 500 },
    { id: 5,  nombre: "Marta Pérez",       correo: "marta@losrobles.mx",   password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 03", cuotaMensual: 500 },
    { id: 6,  nombre: "Carlos López",      correo: "carlos@losrobles.mx",  password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 04", cuotaMensual: 500 },
    { id: 7,  nombre: "Sofía Ramírez",     correo: "sofia@losrobles.mx",   password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 05", cuotaMensual: 500 },
    { id: 8,  nombre: "Miguel Torres",     correo: "miguel@losrobles.mx",  password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 06", cuotaMensual: 500 },
    { id: 9,  nombre: "Ana Gutiérrez",     correo: "ana@losrobles.mx",     password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 07", cuotaMensual: 500 },
    { id: 10, nombre: "Roberto Jiménez",   correo: "roberto@losrobles.mx", password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 08", cuotaMensual: 500 },
    { id: 11, nombre: "María Hernández",   correo: "maria@losrobles.mx",   password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 09", cuotaMensual: 500 },
    { id: 12, nombre: "Juan Díaz",         correo: "juan@losrobles.mx",    password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 10", cuotaMensual: 500 }
  ],

  pagos: [
    // Pagos del mes anterior
    { id: 1, usuarioId: 3,  nombre: "Rosa Martínez",   monto: 500, fecha: "2026-04-01", mes: "Abril 2026",  referencia: "REF-ABR-001", metodo: "Transferencia" },
    { id: 2, usuarioId: 5,  nombre: "Marta Pérez",     monto: 500, fecha: "2026-04-03", mes: "Abril 2026",  referencia: "REF-ABR-002", metodo: "Efectivo" },
    { id: 3, usuarioId: 7,  nombre: "Sofía Ramírez",   monto: 500, fecha: "2026-04-05", mes: "Abril 2026",  referencia: "REF-ABR-003", metodo: "Transferencia" },
    { id: 4, usuarioId: 9,  nombre: "Ana Gutiérrez",   monto: 500, fecha: "2026-04-10", mes: "Abril 2026",  referencia: "REF-ABR-004", metodo: "Efectivo" },
    { id: 5, usuarioId: 11, nombre: "María Hernández", monto: 500, fecha: "2026-04-12", mes: "Abril 2026",  referencia: "REF-ABR-005", metodo: "Transferencia" },
    // Pagos del mes actual (algunos ya pagaron)
    { id: 6, usuarioId: 3,  nombre: "Rosa Martínez",   monto: 500, fecha: "2026-05-02", mes: "Mayo 2026",   referencia: "REF-MAY-001", metodo: "Transferencia" },
    { id: 7, usuarioId: 9,  nombre: "Ana Gutiérrez",   monto: 500, fecha: "2026-05-05", mes: "Mayo 2026",   referencia: "REF-MAY-002", metodo: "Efectivo" },
    { id: 8, usuarioId: 11, nombre: "María Hernández", monto: 500, fecha: "2026-05-08", mes: "Mayo 2026",   referencia: "REF-MAY-003", metodo: "Transferencia" }
  ],

  emergencias: [
    { id: 1, nombre: "Policía Municipal",    telefono: "066",              tipo: "Seguridad",  icono: "🚔" },
    { id: 2, nombre: "Bomberos",             telefono: "068",              tipo: "Emergencia", icono: "🚒" },
    { id: 3, nombre: "Cruz Roja",            telefono: "065",              tipo: "Salud",      icono: "🚑" },
    { id: 4, nombre: "Hospital Civil",       telefono: "(33) 3614-5501",   tipo: "Salud",      icono: "🏥" },
    { id: 5, nombre: "Seguridad colonia",    telefono: "(33) 8800-1234",   tipo: "Seguridad",  icono: "💂" },
    { id: 6, nombre: "Agua y Drenaje",       telefono: "(33) 3688-5000",   tipo: "Servicios",  icono: "💧" },
    { id: 7, nombre: "CFE (Luz)",            telefono: "071",              tipo: "Servicios",  icono: "⚡" },
    { id: 8, nombre: "Gas Natural",          telefono: "800-000-7070",     tipo: "Servicios",  icono: "🔥" }
  ]
};

// ─────────────────────────────────────────────
// INICIALIZACIÓN DEL SISTEMA
// ─────────────────────────────────────────────

// Carga los datos de ejemplo si el sistema arranca por primera vez
function inicializarSistema() {
  if (!localStorage.getItem("lr_inicializado")) {
    localStorage.setItem("lr_usuarios",    JSON.stringify(DATOS_DEMO.usuarios));
    localStorage.setItem("lr_pagos",       JSON.stringify(DATOS_DEMO.pagos));
    localStorage.setItem("lr_emergencias", JSON.stringify(DATOS_DEMO.emergencias));
    localStorage.setItem("lr_inicializado", "true");
    console.log("✅ Sistema inicializado con datos de ejemplo.");
  }
}

// ─────────────────────────────────────────────
// FUNCIONES PARA OBTENER DATOS
// ─────────────────────────────────────────────

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("lr_usuarios")) || [];
}

function obtenerPagos() {
  return JSON.parse(localStorage.getItem("lr_pagos")) || [];
}

function obtenerEmergencias() {
  return JSON.parse(localStorage.getItem("lr_emergencias")) || [];
}

// Busca un usuario por su correo electrónico
function obtenerUsuarioPorCorreo(correo) {
  var usuarios = obtenerUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo.toLowerCase() === correo.toLowerCase()) {
      return usuarios[i];
    }
  }
  return null;
}

// Busca un usuario por su ID
function obtenerUsuarioPorId(id) {
  var usuarios = obtenerUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      return usuarios[i];
    }
  }
  return null;
}

// Devuelve solo los vecinos (no los admins)
function obtenerVecinos() {
  var usuarios = obtenerUsuarios();
  return usuarios.filter(function(u) { return u.tipo === "vecino"; });
}

// Devuelve los pagos de un vecino específico
function obtenerPagosDeVecino(usuarioId) {
  var pagos = obtenerPagos();
  return pagos.filter(function(p) { return p.usuarioId === usuarioId; });
}

// ─────────────────────────────────────────────
// FUNCIONES PARA GUARDAR DATOS
// ─────────────────────────────────────────────

// Guarda un nuevo usuario en el sistema
function guardarUsuario(usuario) {
  var usuarios = obtenerUsuarios();
  // Genera un ID nuevo basado en el tamaño del arreglo
  usuario.id = usuarios.length + 1;
  usuarios.push(usuario);
  localStorage.setItem("lr_usuarios", JSON.stringify(usuarios));
  return usuario;
}

// Registra un nuevo pago en el sistema
function guardarPago(pago) {
  var pagos = obtenerPagos();
  pago.id = pagos.length + 1;
  pagos.push(pago);
  localStorage.setItem("lr_pagos", JSON.stringify(pagos));
  return pago;
}

// ─────────────────────────────────────────────
// FUNCIONES DE FECHAS Y MESES
// ─────────────────────────────────────────────

var MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Devuelve el mes y año actuales como texto: "Mayo 2026"
function obtenerMesActual() {
  var ahora = new Date();
  return MESES[ahora.getMonth()] + " " + ahora.getFullYear();
}

// Devuelve la fecha de hoy en formato AAAA-MM-DD
function obtenerFechaHoy() {
  var ahora = new Date();
  var año   = ahora.getFullYear();
  var mes   = String(ahora.getMonth() + 1).padStart(2, "0");
  var dia   = String(ahora.getDate()).padStart(2, "0");
  return año + "-" + mes + "-" + dia;
}

// Verifica si un vecino ya pagó en el mes actual
function yaPageoEsteMes(usuarioId) {
  var mesActual = obtenerMesActual();
  var pagos = obtenerPagos();
  for (var i = 0; i < pagos.length; i++) {
    if (pagos[i].usuarioId === usuarioId && pagos[i].mes === mesActual) {
      return true;
    }
  }
  return false;
}

// Genera un número de referencia único para cada pago
function generarReferencia() {
  var ahora  = new Date();
  var mes    = MESES[ahora.getMonth()].substring(0, 3).toUpperCase();
  var random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return "REF-" + mes + "-" + random;
}

// ─────────────────────────────────────────────
// INICIAR SISTEMA AL CARGAR CUALQUIER PÁGINA
// ─────────────────────────────────────────────
inicializarSistema();
