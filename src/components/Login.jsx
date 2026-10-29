import React, { useState } from 'react';
import { api } from '../api/cliente.js';

export default function Login({ usuarios, onLogin, onRegistro }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [vivienda, setVivienda] = useState('');
  const [error, setError] = useState('');

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Primero se valida contra la base de datos con bcrypt
    try {
      const { usuario } = await api.login(correo.trim(), password);
      onLogin(usuario);
      return;
    } catch (err) {
      if (err.message !== 'Credenciales incorrectas.') {
        // Si la API no responde, se conserva el modo local de la demo
        const local = usuarios.find(
          u => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password
        );
        if (local) {
          onLogin(local);
          return;
        }
      }
    }

    setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
  };

  const handleSubmitRegistro = (e) => {
    e.preventDefault();
    setError('');
    if (!nombre.trim() || !correo.trim() || !vivienda || password.length < 6) {
      setError('Por favor completa todos los campos (contraseña mínimo 6 caracteres).');
      return;
    }
    const existe = usuarios.some(u => u.correo.toLowerCase() === correo.trim().toLowerCase());
    if (existe) {
      setError('Ya existe una cuenta registrada con este correo.');
      return;
    }
    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre.trim(),
      correo: correo.trim(),
      password,
      tipo: 'vecino',
      cargo: null,
      vivienda,
      cuotaMensual: 500
    };
    onRegistro(nuevoUsuario);
  };

  const handleDemoLogin = async (correoDemo, passDemo) => {
    setCorreo(correoDemo);
    setPassword(passDemo);
    setError('');
    try {
      const { usuario } = await api.login(correoDemo, passDemo);
      onLogin(usuario);
      return;
    } catch (err) {
      const local = usuarios.find(u => u.correo === correoDemo);
      if (local) onLogin(local);
      else setError('No se pudo iniciar sesión con la cuenta de demostración.');
    }
  };

  return (
    <div className="login-pagina">
      <div className="login-card">
        <div className="login-header">
          <span className="icono-app">🏘️</span>
          <h1>Residencial Los Robles</h1>
          <p>Sistema de Gestión Vecinal · Sprint 4 (React 18 + MySQL)</p>
        </div>

        {!esRegistro ? (
          <div className="login-body">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmitLogin}>
              <div className="campo">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@correo.mx"
                  required
                />
              </div>

              <div className="campo">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                />
              </div>

              {error && <div className="mensaje-error">{error}</div>}

              <button type="submit" className="btn-primario">
                Entrar al Sistema →
              </button>
            </form>

            <div className="toggle-form">
              ¿No tienes cuenta?{' '}
              <button onClick={() => { setEsRegistro(true); setError(''); }} className="btn-link">
                Regístrate aquí
              </button>
            </div>
          </div>
        ) : (
          <div className="login-body">
            <h2>Crear cuenta de vecino</h2>
            <form onSubmit={handleSubmitRegistro}>
              <div className="campo">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="campo">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@correo.mx"
                  required
                />
              </div>

              <div className="campo">
                <label>Número de vivienda</label>
                <select value={vivienda} onChange={(e) => setVivienda(e.target.value)} required>
                  <option value="">-- Selecciona tu casa --</option>
                  <option value="Casa 101">Casa 101</option>
                  <option value="Casa 102">Casa 102</option>
                  <option value="Casa 205">Casa 205</option>
                  <option value="Casa 312">Casa 312</option>
                  <option value="Casa 418">Casa 418</option>
                </select>
              </div>

              <div className="campo">
                <label>Contraseña (mínimo 6 caracteres)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              {error && <div className="mensaje-error">{error}</div>}

              <button type="submit" className="btn-primario">
                Crear mi cuenta →
              </button>
            </form>

            <div className="toggle-form">
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => { setEsRegistro(false); setError(''); }} className="btn-link">
                Iniciar sesión
              </button>
            </div>
          </div>
        )}

        <div className="login-footer">
          <strong>🔑 Acceso Rápido de Demostración (Roles Scrum)</strong>
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('pedro.gonzalez@losrobles.mx', 'losrobles123')}
            >
              👔 Entrar como Don Pedro (Presidente / Admin)
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('laura.gomez@losrobles.mx', 'losrobles123')}
            >
              💼 Entrar como Doña Laura (Tesorera / Admin)
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('jorge.navarro@losrobles.mx', 'losrobles123')}
            >
              🏠 Entrar como Jorge Navarro (Vecino / Casa 312)
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('mariana.ochoa@losrobles.mx', 'losrobles123')}
            >
              🏠 Entrar como Mariana Ochoa (Vecina / Casa 418)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
