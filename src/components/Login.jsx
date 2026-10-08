import React, { useState } from 'react';

export default function Login({ usuarios, onLogin, onRegistro }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [vivienda, setVivienda] = useState('');
  const [error, setError] = useState('');

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setError('');
    const user = usuarios.find(u => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password);
    if (!user) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      return;
    }
    onLogin(user);
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

  const handleDemoLogin = (correoDemo, passDemo) => {
    setCorreo(correoDemo);
    setPassword(passDemo);
    const user = usuarios.find(u => u.correo === correoDemo);
    if (user) onLogin(user);
  };

  return (
    <div className="login-pagina">
      <div className="login-card">
        <div className="login-header">
          <span className="icono-app">🏘️</span>
          <h1>Residencial Los Robles</h1>
          <p>Sistema de Gestión Vecinal · Sprint 2 (React 18)</p>
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
                  <option value="Casa 08">Casa 08</option>
                  <option value="Casa 09">Casa 09</option>
                  <option value="Casa 10">Casa 10</option>
                  <option value="Casa 11">Casa 11</option>
                  <option value="Casa 12">Casa 12</option>
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
              onClick={() => handleDemoLogin('pedro@losrobles.mx', 'losrobles123')}
            >
              👔 Entrar como Don Pedro (Presidente / Admin)
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('laura@losrobles.mx', 'losrobles123')}
            >
              💼 Entrar como Doña Laura (Tesorera / Admin)
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('rosa@losrobles.mx', 'losrobles123')}
            >
              🏠 Entrar como Rosa Martínez (Vecino / Casa 01)
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => handleDemoLogin('jose@losrobles.mx', 'losrobles123')}
            >
              🏠 Entrar como José González (Vecino / Casa 02)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
