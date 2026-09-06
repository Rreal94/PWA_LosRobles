/* ============================================
   PWA Los Robles – Sistema de Gestión Vecinal
   Archivo: js/auth.js
   Manejo de sesión: login, registro, logout
   Equipo 1 · Sprint 1 · Mayo 2026
   ============================================ */

// ─────────────────────────────────────────────
// SESIÓN DE USUARIO
// ─────────────────────────────────────────────

// Guarda el usuario que inició sesión en sessionStorage
// sessionStorage se borra al cerrar el navegador (más seguro)
function guardarSesion(usuario) {
  // No guardamos la contraseña en la sesión
  var sesion = {
    id:       usuario.id,
    nombre:   usuario.nombre,
    correo:   usuario.correo,
    tipo:     usuario.tipo,
    cargo:    usuario.cargo,
    vivienda: usuario.vivienda
  };
  sessionStorage.setItem("lr_sesion", JSON.stringify(sesion));
}

// Devuelve el usuario que tiene la sesión activa
function obtenerUsuarioActual() {
  var sesion = sessionStorage.getItem("lr_sesion");
  if (sesion) {
    return JSON.parse(sesion);
  }
  return null;
}

// Verifica si hay sesión activa y redirige si no la hay
// tipo: "admin" o "vecino" (el tipo que se requiere para esa página)
function verificarAcceso(tipo) {
  var usuario = obtenerUsuarioActual();

  if (!usuario) {
    // No hay sesión → regresar al login
    window.location.href = "index.html";
    return false;
  }

  if (usuario.tipo !== tipo) {
    // El tipo de usuario no coincide → redirigir al dashboard correcto
    if (usuario.tipo === "admin") {
      window.location.href = "dashboard-admin.html";
    } else {
      window.location.href = "dashboard-vecino.html";
    }
    return false;
  }

  return true;
}

// Cierra la sesión y regresa al login
function cerrarSesion() {
  sessionStorage.removeItem("lr_sesion");
  window.location.href = "index.html";
}

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────

// Intenta iniciar sesión con correo y contraseña
// Devuelve el usuario si es correcto, o null si falla
function iniciarSesion(correo, password) {
  var usuario = obtenerUsuarioPorCorreo(correo);

  if (!usuario) {
    return { error: "No existe una cuenta con ese correo electrónico." };
  }

  if (usuario.password !== password) {
    return { error: "La contraseña es incorrecta. Intenta de nuevo." };
  }

  // Credenciales correctas → guardar sesión
  guardarSesion(usuario);
  return { usuario: usuario };
}

// ─────────────────────────────────────────────
// REGISTRO
// ─────────────────────────────────────────────

// Registra un nuevo vecino en el sistema
function registrarVecino(nombre, correo, password, vivienda) {

  // Verificar que los campos no estén vacíos
  if (!nombre || !correo || !password || !vivienda) {
    return { error: "Todos los campos son obligatorios." };
  }

  // Verificar que el correo no esté ya registrado
  var existente = obtenerUsuarioPorCorreo(correo);
  if (existente) {
    return { error: "Ya existe una cuenta con ese correo electrónico." };
  }

  // Verificar que la contraseña tenga al menos 6 caracteres
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  // Crear el nuevo usuario
  var nuevoVecino = {
    nombre:       nombre,
    correo:       correo.toLowerCase(),
    password:     password,
    tipo:         "vecino",
    cargo:        null,
    vivienda:     vivienda,
    cuotaMensual: 500
  };

  // Guardarlo en el sistema
  var guardado = guardarUsuario(nuevoVecino);
  guardarSesion(guardado);

  return { usuario: guardado };
}

// ─────────────────────────────────────────────
// EVENTOS DEL FORMULARIO DE LOGIN (index.html)
// ─────────────────────────────────────────────

// Esta función se llama cuando existe el formulario de login en la página
function inicializarFormularioLogin() {

  // Si ya hay sesión activa, redirigir directo al dashboard
  var usuario = obtenerUsuarioActual();
  if (usuario) {
    if (usuario.tipo === "admin") {
      window.location.href = "dashboard-admin.html";
    } else {
      window.location.href = "dashboard-vecino.html";
    }
    return;
  }

  // ── Formulario de login ──
  var formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", function(evento) {
      evento.preventDefault(); // Evitar que la página se recargue

      var correo   = document.getElementById("loginCorreo").value;
      var password = document.getElementById("loginPassword").value;
      var resultado = iniciarSesion(correo, password);

      if (resultado.error) {
        mostrarError("errorLogin", resultado.error);
      } else {
        // Redirigir según el tipo de usuario
        if (resultado.usuario.tipo === "admin") {
          window.location.href = "dashboard-admin.html";
        } else {
          window.location.href = "dashboard-vecino.html";
        }
      }
    });
  }

  // ── Formulario de registro ──
  var formRegistro = document.getElementById("formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", function(evento) {
      evento.preventDefault();

      var nombre   = document.getElementById("regNombre").value;
      var correo   = document.getElementById("regCorreo").value;
      var password = document.getElementById("regPassword").value;
      var vivienda = document.getElementById("regVivienda").value;

      var resultado = registrarVecino(nombre, correo, password, vivienda);

      if (resultado.error) {
        mostrarError("errorRegistro", resultado.error);
      } else {
        window.location.href = "dashboard-vecino.html";
      }
    });
  }

  // ── Botón alternar entre login y registro ──
  var btnMostrarRegistro = document.getElementById("btnMostrarRegistro");
  var btnMostrarLogin    = document.getElementById("btnMostrarLogin");
  var panelLogin    = document.getElementById("panelLogin");
  var panelRegistro = document.getElementById("panelRegistro");

  if (btnMostrarRegistro) {
    btnMostrarRegistro.addEventListener("click", function() {
      panelLogin.style.display    = "none";
      panelRegistro.style.display = "block";
    });
  }

  if (btnMostrarLogin) {
    btnMostrarLogin.addEventListener("click", function() {
      panelRegistro.style.display = "none";
      panelLogin.style.display    = "block";
    });
  }
}

// Muestra un mensaje de error en el formulario
function mostrarError(idElemento, mensaje) {
  var elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
    // Ocultarlo después de 4 segundos
    setTimeout(function() {
      elemento.style.display = "none";
    }, 4000);
  }
}

// Inicializar cuando carga la página de login
document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("formLogin") || document.getElementById("formRegistro")) {
    inicializarFormularioLogin();
  }
});
