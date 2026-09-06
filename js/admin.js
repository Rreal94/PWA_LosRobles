/* ============================================
   PWA Los Robles – Sistema de Gestión Vecinal
   Archivo: js/admin.js
   Lógica del panel del administrador
   Equipo 1 · Sprint 1 · Mayo 2026
   ============================================ */

// ─────────────────────────────────────────────
// NAVEGACIÓN ENTRE SECCIONES
// ─────────────────────────────────────────────

function mostrarSeccion(id) {
  var secciones = document.querySelectorAll(".seccion");
  secciones.forEach(function(s) { s.style.display = "none"; });

  var seccion = document.getElementById("sec-" + id);
  if (seccion) seccion.style.display = "block";

  var botones = document.querySelectorAll(".nav-btn");
  botones.forEach(function(b) { b.classList.remove("activo"); });
  var btnActivo = document.getElementById("btn-" + id);
  if (btnActivo) btnActivo.classList.add("activo");
}

// ─────────────────────────────────────────────
// SECCIÓN: RESUMEN FINANCIERO (US-004)
// ─────────────────────────────────────────────

function cargarResumen(usuario) {
  var vecinos    = obtenerVecinos();
  var pagos      = obtenerPagos();
  var mesActual  = obtenerMesActual();
  var contenedor = document.getElementById("sec-resumen");

  // Calcular estadísticas del mes actual
  var pagosDelMes = pagos.filter(function(p) { return p.mes === mesActual; });
  var vecinisPagados = vecinos.filter(function(v) {
    return pagosDelMes.some(function(p) { return p.usuarioId === v.id; });
  });

  var totalVecinos    = vecinos.length;
  var totalPagados    = vecinisPagados.length;
  var totalAdeudos    = totalVecinos - totalPagados;
  var montoRecaudado  = pagosDelMes.reduce(function(s, p) { return s + p.monto; }, 0);
  var montoPendiente  = totalAdeudos * 500;
  var pctRecaudado    = totalVecinos > 0 ? Math.round((totalPagados / totalVecinos) * 100) : 0;

  // Todos los pagos históricos
  var totalHistorico = pagos.reduce(function(s, p) { return s + p.monto; }, 0);

  contenedor.innerHTML = `
    <h2>📊 Resumen Financiero</h2>
    <p class="subtitulo">Mes actual: <strong>${mesActual}</strong></p>

    <!-- Tarjetas de estadísticas -->
    <div class="tarjetas-grid">
      <div class="tarjeta tarjeta-azul">
        <div class="tarjeta-icono">🏘️</div>
        <div class="tarjeta-info">
          <h3>Total de vecinos</h3>
          <p class="tarjeta-valor-grande">${totalVecinos}</p>
          <p class="tarjeta-sub">viviendas registradas</p>
        </div>
      </div>

      <div class="tarjeta tarjeta-verde">
        <div class="tarjeta-icono">✅</div>
        <div class="tarjeta-info">
          <h3>Al corriente</h3>
          <p class="tarjeta-valor-grande">${totalPagados}</p>
          <p class="tarjeta-sub">vecinos pagados este mes</p>
        </div>
      </div>

      <div class="tarjeta tarjeta-roja">
        <div class="tarjeta-icono">⚠️</div>
        <div class="tarjeta-info">
          <h3>Con adeudo</h3>
          <p class="tarjeta-valor-grande">${totalAdeudos}</p>
          <p class="tarjeta-sub">vecinos con cuota pendiente</p>
        </div>
      </div>

      <div class="tarjeta tarjeta-verde">
        <div class="tarjeta-icono">💵</div>
        <div class="tarjeta-info">
          <h3>Recaudado (mes)</h3>
          <p class="tarjeta-valor-grande">$${montoRecaudado.toLocaleString()}</p>
          <p class="tarjeta-sub">MXN cobrados</p>
        </div>
      </div>

      <div class="tarjeta tarjeta-roja">
        <div class="tarjeta-icono">📉</div>
        <div class="tarjeta-info">
          <h3>Pendiente por cobrar</h3>
          <p class="tarjeta-valor-grande">$${montoPendiente.toLocaleString()}</p>
          <p class="tarjeta-sub">MXN en adeudos</p>
        </div>
      </div>

      <div class="tarjeta tarjeta-azul">
        <div class="tarjeta-icono">📈</div>
        <div class="tarjeta-info">
          <h3>Total histórico</h3>
          <p class="tarjeta-valor-grande">$${totalHistorico.toLocaleString()}</p>
          <p class="tarjeta-sub">MXN acumulados (todos los meses)</p>
        </div>
      </div>
    </div>

    <!-- Barra de progreso de recaudación -->
    <div class="barra-seccion">
      <h3>Avance de recaudación · ${mesActual}</h3>
      <div class="barra-info">
        <span>${totalPagados} de ${totalVecinos} vecinos pagaron</span>
        <span class="barra-pct">${pctRecaudado}%</span>
      </div>
      <div class="barra-contenedor">
        <div class="barra-relleno" style="width: ${pctRecaudado}%;">
          ${pctRecaudado}%
        </div>
      </div>
      <div class="barra-leyenda">
        <span class="leyenda-verde">■ Recaudado: $${montoRecaudado.toLocaleString()} MXN</span>
        <span class="leyenda-roja">■ Pendiente: $${montoPendiente.toLocaleString()} MXN</span>
      </div>
    </div>

    <!-- Pagos recientes del mes -->
    <div class="pagos-recientes">
      <h3>Pagos recibidos este mes</h3>
      ${pagosDelMes.length === 0
        ? `<p class="sin-datos">Aún no se han registrado pagos este mes.</p>`
        : `<div class="tabla-contenedor">
            <table class="tabla">
              <thead>
                <tr><th>Vecino</th><th>Monto</th><th>Fecha</th><th>Método</th><th>Referencia</th></tr>
              </thead>
              <tbody>
                ${pagosDelMes.map(function(p) {
                  return `<tr>
                    <td><strong>${p.nombre}</strong></td>
                    <td>$${p.monto}.00 MXN</td>
                    <td>${p.fecha}</td>
                    <td>${p.metodo}</td>
                    <td><code>${p.referencia}</code></td>
                  </tr>`;
                }).join("")}
              </tbody>
            </table>
           </div>`
      }
    </div>
  `;
}

// ─────────────────────────────────────────────
// SECCIÓN: LISTA DE VECINOS (US-002 / US-004)
// ─────────────────────────────────────────────

function cargarVecinos() {
  var vecinos    = obtenerVecinos();
  var mesActual  = obtenerMesActual();
  var contenedor = document.getElementById("sec-vecinos");

  var filas = vecinos.map(function(vecino) {
    var pagado = yaPageoEsteMes(vecino.id);
    var pagosVecino = obtenerPagosDeVecino(vecino.id);
    var ultimoPago  = pagosVecino.length > 0 ? pagosVecino[pagosVecino.length - 1].fecha : "—";

    return `
      <tr>
        <td><strong>${vecino.nombre}</strong></td>
        <td>${vecino.vivienda}</td>
        <td>${vecino.correo}</td>
        <td>
          ${pagado
            ? '<span class="badge badge-verde">✅ Pagado</span>'
            : '<span class="badge badge-rojo">⚠️ Adeudo</span>'}
        </td>
        <td>${ultimoPago}</td>
        <td>${pagosVecino.length}</td>
      </tr>
    `;
  }).join("");

  var pagados  = vecinos.filter(function(v) { return yaPageoEsteMes(v.id); }).length;
  var adeudos  = vecinos.length - pagados;

  contenedor.innerHTML = `
    <h2>👥 Vecinos Registrados</h2>
    <p class="subtitulo">Estado de cuotas · ${mesActual}</p>

    <div class="filtro-vecinos">
      <button class="btn-filtro activo" onclick="filtrarVecinos('todos', this)">
        Todos (${vecinos.length})
      </button>
      <button class="btn-filtro" onclick="filtrarVecinos('pagado', this)">
        ✅ Pagados (${pagados})
      </button>
      <button class="btn-filtro" onclick="filtrarVecinos('adeudo', this)">
        ⚠️ Con adeudo (${adeudos})
      </button>
    </div>

    <div class="tabla-contenedor">
      <table class="tabla" id="tablaVecinos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Vivienda</th>
            <th>Correo</th>
            <th>Estado (${mesActual})</th>
            <th>Último pago</th>
            <th>N° pagos</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
  `;
}

// Filtra la tabla de vecinos por estado de pago
function filtrarVecinos(filtro, botonActivo) {
  // Actualizar botones
  document.querySelectorAll(".filtro-vecinos .btn-filtro").forEach(function(b) {
    b.classList.remove("activo");
  });
  botonActivo.classList.add("activo");

  // Filtrar filas de la tabla
  var filas = document.querySelectorAll("#tablaVecinos tbody tr");
  filas.forEach(function(fila) {
    var badge = fila.querySelector(".badge");
    if (!badge) return;
    var esPagado = badge.classList.contains("badge-verde");

    if (filtro === "todos") {
      fila.style.display = "";
    } else if (filtro === "pagado") {
      fila.style.display = esPagado ? "" : "none";
    } else {
      fila.style.display = !esPagado ? "" : "none";
    }
  });
}

// ─────────────────────────────────────────────
// SECCIÓN: DIRECTORIO DE EMERGENCIAS (US-005)
// ─────────────────────────────────────────────

function cargarEmergenciasAdmin() {
  var emergencias = obtenerEmergencias();
  var contenedor  = document.getElementById("sec-emergencias");

  var tipos = {};
  emergencias.forEach(function(e) {
    if (!tipos[e.tipo]) tipos[e.tipo] = [];
    tipos[e.tipo].push(e);
  });

  var html = `
    <h2>🆘 Directorio de Emergencias</h2>
    <p class="subtitulo">Contactos importantes para la administración de la colonia</p>
    <div class="aviso aviso-rojo">
      🚨 Emergencias nacionales: <strong>911</strong> &nbsp;|&nbsp;
      Policía: <strong>066</strong> &nbsp;|&nbsp;
      Cruz Roja: <strong>065</strong>
    </div>`;

  Object.keys(tipos).forEach(function(tipo) {
    html += `<div class="grupo-emergencias">
      <h3 class="grupo-titulo">${tipo}</h3>
      <div class="contactos-grid">`;

    tipos[tipo].forEach(function(contacto) {
      html += `
        <div class="contacto-card">
          <div class="contacto-icono">${contacto.icono}</div>
          <div class="contacto-info">
            <h4>${contacto.nombre}</h4>
            <a href="tel:${contacto.telefono}" class="contacto-tel">📞 ${contacto.telefono}</a>
          </div>
          <a href="tel:${contacto.telefono}" class="btn-llamar">Llamar</a>
        </div>`;
    });

    html += `</div></div>`;
  });

  contenedor.innerHTML = html;
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN DEL DASHBOARD DE ADMIN
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function() {

  // Verificar que el usuario tiene acceso como admin
  if (!verificarAcceso("admin")) return;

  var usuario = obtenerUsuarioActual();

  // Mostrar nombre y cargo en el header
  document.getElementById("nombreUsuario").textContent = usuario.nombre;
  document.getElementById("tipoUsuario").textContent   = "Administrador · " + (usuario.cargo || "Mesa Directiva");

  // Cargar todas las secciones
  cargarResumen(usuario);
  cargarVecinos();
  cargarEmergenciasAdmin();

  // Mostrar el resumen al cargar
  mostrarSeccion("resumen");

  // Botón de cerrar sesión
  document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
});
