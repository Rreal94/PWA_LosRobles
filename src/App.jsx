import React, { useState, useEffect } from 'react';
import { DATOS_INICIALES } from './data/datosIniciales.js';
import Login from './components/Login.jsx';
import DashboardVecino from './components/DashboardVecino.jsx';
import DashboardAdmin from './components/DashboardAdmin.jsx';
import PagoCuotas from './components/PagoCuotas.jsx';
import TablonAvisos from './components/TablonAvisos.jsx';
import ReporteFallas from './components/ReporteFallas.jsx';
import DirectorioSOS from './components/DirectorioSOS.jsx';
import PanelBaseDatos from './components/PanelBaseDatos.jsx';
import { cargarDatos } from './api/cliente.js';

export default function App() {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('lr_usuarios_v2');
    return guardados ? JSON.parse(guardados) : DATOS_INICIALES.usuarios;
  });

  const [pagos, setPagos] = useState(() => {
    const guardados = localStorage.getItem('lr_pagos_v2');
    return guardados ? JSON.parse(guardados) : DATOS_INICIALES.pagos;
  });

  const [avisos, setAvisos] = useState(() => {
    const guardados = localStorage.getItem('lr_avisos_v2');
    return guardados ? JSON.parse(guardados) : DATOS_INICIALES.avisos;
  });

  const [fallas, setFallas] = useState(() => {
    const guardados = localStorage.getItem('lr_fallas_v2');
    return guardados ? JSON.parse(guardados) : DATOS_INICIALES.fallas;
  });

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const sesion = sessionStorage.getItem('lr_sesion_v2');
    return sesion ? JSON.parse(sesion) : null;
  });

  const [vista, setVista] = useState('inicio');
  const [origenDatos, setOrigenDatos] = useState('local');
  const [cargandoBD, setCargandoBD] = useState(true);

  // Sincronización en localStorage
  useEffect(() => {
    localStorage.setItem('lr_usuarios_v2', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('lr_pagos_v2', JSON.stringify(pagos));
  }, [pagos]);

  useEffect(() => {
    localStorage.setItem('lr_avisos_v2', JSON.stringify(avisos));
  }, [avisos]);

  useEffect(() => {
    localStorage.setItem('lr_fallas_v2', JSON.stringify(fallas));
  }, [fallas]);

  // Hidratación desde MySQL: si la API responde, la app deja de usar datos locales
  useEffect(() => {
    let activo = true;

    cargarDatos()
      .then((datos) => {
        if (!activo) return;
        if (datos.usuarios.length) setUsuarios(datos.usuarios);
        if (datos.avisos.length) setAvisos(datos.avisos);
        if (datos.fallas.length) setFallas(datos.fallas);
        if (datos.pagos.length) setPagos(datos.pagos);
        setOrigenDatos('mysql');
      })
      .catch(() => {
        if (activo) setOrigenDatos('local');
      })
      .finally(() => {
        if (activo) setCargandoBD(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const handleLogin = (user) => {
    setUsuarioActual(user);
    sessionStorage.setItem('lr_sesion_v2', JSON.stringify(user));
    setVista('inicio');
  };

  const handleLogout = () => {
    setUsuarioActual(null);
    sessionStorage.removeItem('lr_sesion_v2');
    setVista('inicio');
  };

  const handleRegistro = (nuevoUsuario) => {
    setUsuarios(prev => [...prev, nuevoUsuario]);
    handleLogin(nuevoUsuario);
  };

  const handleRegistrarPago = (nuevoPago) => {
    setPagos(prev => [nuevoPago, ...prev]);
  };

  const handlePublicarAviso = (nuevoAviso) => {
    setAvisos(prev => [nuevoAviso, ...prev]);
  };

  const handleRegistrarFalla = (nuevaFalla) => {
    setFallas(prev => [nuevaFalla, ...prev]);
  };

  const handleActualizarEstatusFalla = (id, nuevoEstatus) => {
    setFallas(prev => prev.map(f => f.id === id ? { ...f, estatus: nuevoEstatus } : f));
  };

  if (!usuarioActual) {
    return (
      <Login
        usuarios={usuarios}
        onLogin={handleLogin}
        onRegistro={handleRegistro}
      />
    );
  }

  const esAdmin = usuarioActual.tipo === 'admin';

  return (
    <div className="app-container">
      {/* Barra de Navegación Superior */}
      <header className="navbar-superior">
        <div className="navbar-brand">
          <span className="logo-icono">🏘️</span>
          <div>
            <h1>Residencial Los Robles</h1>
            <span className="subtitulo-navbar">Zapopan, Jalisco · PWA React 18</span>
          </div>
        </div>

        <div className="navbar-usuario">
          <span
            className="rol-tag"
            style={{
              background: origenDatos === 'mysql' ? '#DCFCE7' : '#FEE2E2',
              color: origenDatos === 'mysql' ? '#166534' : '#991B1B',
              fontWeight: 'bold'
            }}
          >
            {cargandoBD ? '◌ Consultando MySQL' : origenDatos === 'mysql' ? '● MySQL conectado' : '● Modo local'}
          </span>
          <div className="badge-usuario">
            <strong>{usuarioActual.nombre}</strong>
            <span className="rol-tag">
              {esAdmin ? usuarioActual.cargo : usuarioActual.vivienda}
            </span>
          </div>
          <button className="btn-logout" onClick={handleLogout} title="Cerrar sesión">
            Salir
          </button>
        </div>
      </header>

      {/* Menú de Navegación Reactivo */}
      <nav className="menu-navegacion">
        <button
          className={`nav-tab ${vista === 'inicio' ? 'activo' : ''}`}
          onClick={() => setVista('inicio')}
        >
          {esAdmin ? '📊 Panel Financiero' : '🏠 Inicio'}
        </button>

        {!esAdmin && (
          <button
            className={`nav-tab ${vista === 'pagos' ? 'activo' : ''}`}
            onClick={() => setVista('pagos')}
          >
            💳 Pagar Cuota (US-003)
          </button>
        )}

        <button
          className={`nav-tab ${vista === 'avisos' ? 'activo' : ''}`}
          onClick={() => setVista('avisos')}
        >
          📢 Tablón de Avisos (US-006)
        </button>

        <button
          className={`nav-tab ${vista === 'fallas' ? 'activo' : ''}`}
          onClick={() => setVista('fallas')}
        >
          🛠️ Reportes de Fallas (US-008)
        </button>

        <button
          className={`nav-tab ${vista === 'sos' ? 'activo' : ''}`}
          onClick={() => setVista('sos')}
        >
          🚨 Directorio SOS
        </button>

        <button
          className={`nav-tab ${vista === 'bd' ? 'activo' : ''}`}
          onClick={() => setVista('bd')}
        >
          Base de Datos
        </button>
      </nav>

      {/* Contenido Principal según la vista activa */}
      <main className="main-content">
        {vista === 'inicio' && (
          esAdmin ? (
            <DashboardAdmin
              usuario={usuarioActual}
              usuarios={usuarios}
              pagos={pagos}
              onNavegar={setVista}
            />
          ) : (
            <DashboardVecino
              usuario={usuarioActual}
              pagos={pagos}
              avisos={avisos}
              fallas={fallas}
              onNavegar={setVista}
            />
          )
        )}

        {vista === 'pagos' && !esAdmin && (
          <PagoCuotas
            usuario={usuarioActual}
            pagos={pagos}
            onRegistrarPago={handleRegistrarPago}
          />
        )}

        {vista === 'avisos' && (
          <TablonAvisos
            usuario={usuarioActual}
            avisos={avisos}
            onPublicarAviso={handlePublicarAviso}
          />
        )}

        {vista === 'fallas' && (
          <ReporteFallas
            usuario={usuarioActual}
            fallas={fallas}
            onRegistrarFalla={handleRegistrarFalla}
            onActualizarEstatus={handleActualizarEstatusFalla}
          />
        )}

        {vista === 'sos' && (
          <DirectorioSOS emergencias={DATOS_INICIALES.emergencias} />
        )}

        {vista === 'bd' && <PanelBaseDatos />}
      </main>

      <footer className="footer-app">
        <p>
          Residencial Los Robles PWA · Sprint 4 (React 18 + MySQL) · Universidad de Guadalajara
        </p>
      </footer>
    </div>
  );
}
