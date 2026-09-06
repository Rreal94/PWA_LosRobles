/* ============================================
   PWA Los Robles – Sistema de Gestión Vecinal
   Archivo: js/vecino.js
   Lógica del panel del vecino
   Equipo 1 · Sprint 1 · Mayo 2026
   ============================================ */

// ─────────────────────────────────────────────
// NAVEGACIÓN ENTRE SECCIONES
// ─────────────────────────────────────────────

function mostrarSeccion(id) {
  // Ocultar todas las secciones
  var secciones = document.querySelectorAll(".seccion");
  secciones.forEach(function(s) { s.style.display = "none"; });

  // Mostrar la sección pedida
  var seccion = document.getElementById("sec-" + id);
  if (seccion) seccion.style.display = "block";

  // Marcar el botón activo en el menú
  var botones = document.querySelectorAll(".nav-btn");
  botones.forEach(function(b) { b.classList.remove("activo"); });
  var btnActivo = document.getElementById("btn-" + id);
  if (btnActivo) btnActivo.classList.add("activo");
}

// ─────────────────────────────────────────────
// SECCIÓN: INICIO (resumen del vecino)
// ─────────────────────────────────────────────

function cargarInicio(usuario) {
  var mesActual = obtenerMesActual();
  var yaPago    = yaPageoEsteMes(usuario.id);
  var pagosVecino = obtenerPagosDeVecino(usuario.id);

  var estadoBadge = yaPago
    ? '<span class="badge badge-verde">✅ Al corriente</span>'
    : '<span class="badge badge-rojo">⚠️ Cuota pendiente</span>';

  var contenedor = document.getElementById("sec-inicio");
  contenedor.innerHTML = `
    <h2>Bienvenido, ${usuario.nombre.split(" ")[0]} 👋</h2>
    <p class="subtitulo">${usuario.vivienda} · Residencial Los Robles</p>

    <div class="tarjetas-grid">

      <div class="tarjeta">
        <div class="tarjeta-icono">🏠</div>
        <div class="tarjeta-info">
          <h3>Mi vivienda</h3>
          <p class="tarjeta-valor">${usuario.vivienda}</p>
        </div>
      </div>

      <div class="tarjeta">
        <div class="tarjeta-icono">💰</div>
        <div class="tarjeta-info">
          <h3>Cuota mensual</h3>
          <p class="tarjeta-valor">$500.00 MXN</p>
        </div>
      </div>

      <div class="tarjeta ${yaPago ? "tarjeta-verde" : "tarjeta-roja"}">
        <div class="tarjeta-icono">${yaPago ? "✅" : "📅"}</div>
        <div class="tarjeta-info">
          <h3>Estado · ${mesActual}</h3>
          <p class="tarjeta-valor">${estadoBadge}</p>
        </div>
      </div>

      <div class="tarjeta">
        <div class="tarjeta-icono">📋</div>
        <div class="tarjeta-info">
          <h3>Total de pagos</h3>
          <p class="tarjeta-valor">${pagosVecino.length} pago${pagosVecino.length !== 1 ? "s" : ""} registrado${pagosVecino.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

    </div>

    ${!yaPago ? `
    <div class="aviso aviso-naranja">
      <strong>📢 Recuerda:</strong> Tu cuota de ${mesActual} está pendiente.
      <button class="btn-link" onclick="mostrarSeccion('pago')">Ir a pagar →</button>
    </div>` : `
    <div class="aviso aviso-verde">
      <strong>🎉 ¡Gracias!</strong> Tu cuota de ${mesActual} ya está pagada.
    </div>`}
  `;
}

// ─────────────────────────────────────────────
// SECCIÓN: PAGAR CUOTA (US-003)
// ─────────────────────────────────────────────

function cargarPago(usuario) {
  var mesActual = obtenerMesActual();
  var yaPago    = yaPageoEsteMes(usuario.id);
  var contenedor = document.getElementById("sec-pago");

  if (yaPago) {
    // Ya pagó este mes → mostrar mensaje de confirmación
    contenedor.innerHTML = `
      <h2>💰 Pago de Cuota</h2>
      <div class="card-pago confirmado">
        <div class="confirmado-icono">✅</div>
        <h3>¡Cuota de ${mesActual} pagada!</h3>
        <p>Tu cuota de este mes ya está registrada. Gracias por estar al corriente.</p>
        <button class="btn-primario" onclick="mostrarSeccion('historial')">
          Ver mis pagos
        </button>
      </div>
    `;
    return;
  }

  // No ha pagado → mostrar formulario de pago
  contenedor.innerHTML = `
    <h2>💰 Pagar Cuota Mensual</h2>
    <p class="subtitulo">Cuota correspondiente a ${mesActual}</p>

    <div class="card-pago">
      <div class="detalle-pago">
        <div class="detalle-fila">
          <span>Concepto:</span>
          <span>Cuota de mantenimiento ${mesActual}</span>
        </div>
        <div class="detalle-fila">
          <span>Vivienda:</span>
          <span>${usuario.vivienda}</span>
        </div>
        <div class="detalle-fila detalle-total">
          <span>Total a pagar:</span>
          <span>$500.00 MXN</span>
        </div>
      </div>

      <form id="formPago">
        <div class="campo">
          <label for="metodoPago">Método de pago</label>
          <select id="metodoPago" required>
            <option value="">-- Selecciona un método --</option>
            <option value="Transferencia">Transferencia bancaria</option>
            <option value="Efectivo">Pago en efectivo (oficina)</option>
            <option value="Tarjeta">Tarjeta de crédito / débito</option>
          </select>
        </div>

        <div class="campo" id="campoTarjeta" style="display:none;">
          <label for="numTarjeta">Número de tarjeta (últimos 4 dígitos)</label>
          <input type="text" id="numTarjeta" maxlength="4" placeholder="0000">
        </div>

        <div class="campo">
          <label for="nombreTitular">Nombre del titular</label>
          <input type="text" id="nombreTitular" value="${usuario.nombre}" required>
        </div>

        <div id="errorPago" class="mensaje-error" style="display:none;"></div>

        <button type="submit" class="btn-primario btn-grande">
          💳 Confirmar pago de $500.00 MXN
        </button>
      </form>

      <p class="nota-seguridad">
        🔒 Este pago es simulado. Ningún dato real de tarjeta es requerido.
      </p>
    </div>
  `;

  // Mostrar/ocultar el campo de tarjeta según el método seleccionado
  document.getElementById("metodoPago").addEventListener("change", function() {
    var campoTarjeta = document.getElementById("campoTarjeta");
    campoTarjeta.style.display = this.value === "Tarjeta" ? "block" : "none";
  });

  // Manejar el envío del formulario
  document.getElementById("formPago").addEventListener("submit", function(evento) {
    evento.preventDefault();
    procesarPago(usuario);
  });
}

// Procesa el pago y guarda el registro
function procesarPago(usuario) {
  var metodo = document.getElementById("metodoPago").value;

  if (!metodo) {
    document.getElementById("errorPago").textContent = "Por favor selecciona un método de pago.";
    document.getElementById("errorPago").style.display = "block";
    return;
  }

  // Crear el registro del pago
  var nuevoPago = {
    usuarioId:  usuario.id,
    nombre:     usuario.nombre,
    monto:      500,
    fecha:      obtenerFechaHoy(),
    mes:        obtenerMesActual(),
    referencia: generarReferencia(),
    metodo:     metodo,
    vivienda:   usuario.vivienda
  };

  // Guardar en localStorage
  var pagoGuardado = guardarPago(nuevoPago);

  // Mostrar pantalla de éxito
  mostrarConfirmacionPago(pagoGuardado, usuario);
}

// Muestra la pantalla de confirmación después del pago
function mostrarConfirmacionPago(pago, usuario) {
  var contenedor = document.getElementById("sec-pago");
  contenedor.innerHTML = `
    <h2>💰 Pago de Cuota</h2>
    <div class="card-pago confirmado">
      <div class="confirmado-icono">✅</div>
      <h3>¡Pago realizado con éxito!</h3>
      <p>Tu cuota de <strong>${pago.mes}</strong> ha sido registrada correctamente.</p>

      <div class="recibo">
        <h4>🧾 Comprobante de pago</h4>
        <div class="detalle-fila"><span>Referencia:</span>     <strong>${pago.referencia}</strong></div>
        <div class="detalle-fila"><span>Fecha:</span>          <span>${pago.fecha}</span></div>
        <div class="detalle-fila"><span>Monto:</span>          <span>$${pago.monto}.00 MXN</span></div>
        <div class="detalle-fila"><span>Método:</span>         <span>${pago.metodo}</span></div>
        <div class="detalle-fila"><span>Vivienda:</span>       <span>${usuario.vivienda}</span></div>
        <div class="detalle-fila detalle-total"><span>Estado:</span> <span class="badge badge-verde">Pagado</span></div>
      </div>

      <button class="btn-primario" onclick="mostrarSeccion('historial')">
        Ver historial de pagos
      </button>
      <button class="btn-secundario" onclick="mostrarSeccion('inicio')">
        Regresar al inicio
      </button>
    </div>
  `;
}

// ─────────────────────────────────────────────
// SECCIÓN: HISTORIAL DE PAGOS (US-003 / US-009)
// ─────────────────────────────────────────────

function cargarHistorial(usuario) {
  var pagos = obtenerPagosDeVecino(usuario.id);
  var contenedor = document.getElementById("sec-historial");

  // Ordenar de más reciente a más antiguo
  pagos.sort(function(a, b) { return b.id - a.id; });

  var filas = "";
  if (pagos.length === 0) {
    filas = `<tr><td colspan="5" style="text-align:center; color:#888; padding:24px;">
      No tienes pagos registrados todavía.
    </td></tr>`;
  } else {
    pagos.forEach(function(pago) {
      filas += `
        <tr>
          <td><span class="badge badge-azul">${pago.mes}</span></td>
          <td>$${pago.monto}.00 MXN</td>
          <td>${pago.fecha}</td>
          <td>${pago.metodo}</td>
          <td>${pago.referencia}</td>
        </tr>
      `;
    });
  }

  var totalPagado = pagos.reduce(function(suma, p) { return suma + p.monto; }, 0);

  contenedor.innerHTML = `
    <h2>📋 Mi Historial de Pagos</h2>
    <p class="subtitulo">${usuario.vivienda} · ${usuario.nombre}</p>

    <div class="resumen-historial">
      <div class="mini-tarjeta">
        <span class="mini-valor">${pagos.length}</span>
        <span class="mini-label">Pagos totales</span>
      </div>
      <div class="mini-tarjeta">
        <span class="mini-valor">$${totalPagado}</span>
        <span class="mini-label">Total pagado (MXN)</span>
      </div>
      <div class="mini-tarjeta ${yaPageoEsteMes(usuario.id) ? "mini-verde" : "mini-roja"}">
        <span class="mini-valor">${yaPageoEsteMes(usuario.id) ? "✅" : "⚠️"}</span>
        <span class="mini-label">Mes actual: ${obtenerMesActual()}</span>
      </div>
    </div>

    <div class="tabla-contenedor">
      <table class="tabla">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Método</th>
            <th>Referencia</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>

    ${!yaPageoEsteMes(usuario.id) ? `
    <div class="aviso aviso-naranja">
      ⚠️ Tu cuota de ${obtenerMesActual()} está pendiente.
      <button class="btn-link" onclick="mostrarSeccion('pago')">Pagar ahora →</button>
    </div>` : ""}
  `;
}

// ─────────────────────────────────────────────
// SECCIÓN: DIRECTORIO DE EMERGENCIAS (US-005)
// ─────────────────────────────────────────────

function cargarEmergencias() {
  var emergencias = obtenerEmergencias();
  var contenedor  = document.getElementById("sec-emergencias");

  // Agrupar por tipo
  var tipos = {};
  emergencias.forEach(function(e) {
    if (!tipos[e.tipo]) tipos[e.tipo] = [];
    tipos[e.tipo].push(e);
  });

  var html = `<h2>🆘 Directorio de Emergencias</h2>
    <p class="subtitulo">Contactos importantes de la colonia y servicios de emergencia</p>
    <div class="aviso aviso-rojo">
      🚨 En caso de peligro inmediato, llama al <strong>911</strong> (Emergencias Nacional)
    </div>`;

  // Mostrar cada grupo de contactos
  var coloresGrupo = {
    "Seguridad":  "#FFE8E8",
    "Emergencia": "#FFE8E8",
    "Salud":      "#E8F5E9",
    "Servicios":  "#E3F2FD"
  };

  Object.keys(tipos).forEach(function(tipo) {
    html += `<div class="grupo-emergencias">
      <h3 class="grupo-titulo">${tipo}</h3>
      <div class="contactos-grid">`;

    tipos[tipo].forEach(function(contacto) {
      html += `
        <div class="contacto-card" style="border-top-color:${tipo==="Seguridad"||tipo==="Emergencia" ? "#8B1A1A" : tipo==="Salud" ? "#1A5C1A" : "#1F3864"}">
          <div class="contacto-icono">${contacto.icono}</div>
          <div class="contacto-info">
            <h4>${contacto.nombre}</h4>
            <a href="tel:${contacto.telefono}" class="contacto-tel">
              📞 ${contacto.telefono}
            </a>
          </div>
          <a href="tel:${contacto.telefono}" class="btn-llamar">Llamar</a>
        </div>`;
    });

    html += `</div></div>`;
  });

  contenedor.innerHTML = html;
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN DEL DASHBOARD DEL VECINO
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function() {

  // Verificar que el usuario tiene acceso como vecino
  if (!verificarAcceso("vecino")) return;

  var usuario = obtenerUsuarioActual();

  // Mostrar el nombre en el header
  document.getElementById("nombreUsuario").textContent = usuario.nombre;
  document.getElementById("tipoUsuario").textContent   = "Vecino · " + usuario.vivienda;

  // Cargar todas las secciones
  cargarInicio(usuario);
  cargarPago(usuario);
  cargarHistorial(usuario);
  cargarEmergencias();

  // Mostrar la sección de inicio al cargar
  mostrarSeccion("inicio");

  // Botón de cerrar sesión
  document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
});
