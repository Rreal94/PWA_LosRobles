// ========================================================
// PWA Los Robles – Sistema de Gestión Vecinal
// Archivo: src/data/datosIniciales.js
// Datos base para inicialización del sistema en React 18
// Equipo 1 · Sprint 2 · Octubre 2026
// ========================================================

export const DATOS_INICIALES = {
  usuarios: [
    { id: 1, nombre: "Don Pedro García", correo: "pedro@losrobles.mx", password: "losrobles123", tipo: "admin", cargo: "Presidente", vivienda: null, cuotaMensual: null },
    { id: 2, nombre: "Doña Laura Sánchez", correo: "laura@losrobles.mx", password: "losrobles123", tipo: "admin", cargo: "Tesorera", vivienda: null, cuotaMensual: null },
    { id: 3, nombre: "Rosa Martínez", correo: "rosa@losrobles.mx", password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 01", cuotaMensual: 500 },
    { id: 4, nombre: "José González", correo: "jose@losrobles.mx", password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 02", cuotaMensual: 500 },
    { id: 5, nombre: "Marta Pérez", correo: "marta@losrobles.mx", password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 03", cuotaMensual: 500 },
    { id: 6, nombre: "Carlos López", correo: "carlos@losrobles.mx", password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 04", cuotaMensual: 500 },
    { id: 7, nombre: "Sofía Ramírez", correo: "sofia@losrobles.mx", password: "losrobles123", tipo: "vecino", cargo: null, vivienda: "Casa 05", cuotaMensual: 500 }
  ],
  pagos: [
    { id: 1, usuarioId: 3, nombre: "Rosa Martínez", vivienda: "Casa 01", monto: 500, fecha: "2026-09-02", mes: "Septiembre 2026", referencia: "REF-SEP-001", metodo: "Transferencia SPEI" },
    { id: 2, usuarioId: 5, nombre: "Marta Pérez", vivienda: "Casa 03", monto: 500, fecha: "2026-09-05", mes: "Septiembre 2026", referencia: "REF-SEP-002", metodo: "Efectivo" },
    { id: 3, usuarioId: 7, nombre: "Sofía Ramírez", vivienda: "Casa 05", monto: 500, fecha: "2026-09-08", mes: "Septiembre 2026", referencia: "REF-SEP-003", metodo: "Transferencia SPEI" }
  ],
  avisos: [
    {
      id: 1,
      titulo: "Mantenimiento general del sistema de bombeo de agua",
      autor: "Don Pedro García (Presidente)",
      fecha: "2026-10-06",
      prioridad: "Alta",
      contenido: "Estimados vecinos, este jueves 08 de octubre se realizará servicio preventivo a la cisterna y bombas de 09:00 a 14:00 hrs. Se recomienda tomar precauciones con el suministro."
    },
    {
      id: 2,
      titulo: "Convocatoria a Asamblea General Ordinaria",
      autor: "Mesa Directiva Los Robles",
      fecha: "2026-10-04",
      prioridad: "Media",
      contenido: "Se convoca a todos los colonos a la asamblea mensual el próximo sábado a las 18:00 hrs en la terraza comunitaria para revisar el corte financiero presentado por Doña Laura."
    },
    {
      id: 3,
      titulo: "Poda preventiva de árboles y alumbrado en circuito norte",
      autor: "Comité de Mantenimiento",
      fecha: "2026-10-01",
      prioridad: "Baja",
      contenido: "Cuadrillas del Ayuntamiento de Zapopan realizarán poda de ramas cercanas al cableado eléctrico para evitar interrupciones."
    }
  ],
  fallas: [
    {
      id: 1,
      titulo: "Luminaria apagada en poste 14 frente a parque",
      reportante: "Rosa Martínez (Casa 01)",
      fecha: "2026-10-05",
      categoria: "Alumbrado público",
      estatus: "En proceso",
      descripcion: "La lámpara solar no enciende desde el fin de semana, dejando obscura la esquina de juegos infantiles."
    },
    {
      id: 2,
      titulo: "Falla intermitente en sensor del portón vehicular principal",
      reportante: "José González (Casa 02)",
      fecha: "2026-10-07",
      categoria: "Acceso y Seguridad",
      estatus: "Reportado",
      descripcion: "El sensor de proximidad no detecta los tags de algunos residentes al entrar por el carril derecho."
    }
  ],
  emergencias: [
    { id: 1, nombre: "Policía Municipal Zapopan", telefono: "33-3836-3600", tipo: "Seguridad", icono: "🚔" },
    { id: 2, nombre: "Bomberos y Protección Civil", telefono: "33-3618-3411", tipo: "Emergencia", icono: "🚒" },
    { id: 3, nombre: "Cruz Roja Delegación Zapopan", telefono: "33-3634-4444", tipo: "Salud", icono: "🚑" },
    { id: 4, nombre: "Caseta de Vigilancia Los Robles", telefono: "33-8800-1234", tipo: "Seguridad Privada", icono: "💂" },
    { id: 5, nombre: "SIAPA (Agua y Alcantarillado)", telefono: "33-3668-2482", tipo: "Servicios", icono: "💧" },
    { id: 6, nombre: "CFE Reportes de Falla", telefono: "071", tipo: "Servicios", icono: "⚡" }
  ]
};
