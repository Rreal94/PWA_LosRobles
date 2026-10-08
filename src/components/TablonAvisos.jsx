import React, { useState } from 'react';

export default function TablonAvisos({ usuario, avisos, onPublicarAviso }) {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [contenido, setContenido] = useState('');

  const esAdmin = usuario && usuario.tipo === 'admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) return;

    const nuevoAviso = {
      id: Date.now(),
      titulo: titulo.trim(),
      autor: `${usuario.nombre} (${usuario.cargo || 'Mesa Directiva'})`,
      fecha: new Date().toISOString().split('T')[0],
      prioridad: prioridad,
      contenido: contenido.trim()
    };

    onPublicarAviso(nuevoAviso);
    setTitulo('');
    setContenido('');
    setPrioridad('Media');
    setMostrarForm(false);
  };

  const avisosFiltrados = filtro === 'Todos'
    ? avisos
    : avisos.filter(a => a.prioridad === filtro);

  return (
    <div className="modulo-avisos">
      <div className="card-seccion">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>📢 Tablón de Avisos Oficiales (US-006)</h2>
            <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '13px' }}>
              Comunicados de la Mesa Directiva para la comunidad de Los Robles
            </p>
          </div>
          {esAdmin && (
            <button
              className="btn-primario"
              style={{ padding: '8px 14px', fontSize: '13px' }}
              onClick={() => setMostrarForm(!mostrarForm)}
            >
              {mostrarForm ? '✕ Cerrar Formulario' : '➕ Publicar Nuevo Aviso'}
            </button>
          )}
        </div>

        {esAdmin && mostrarForm && (
          <div className="formulario-nuevo-aviso" style={{ marginTop: '16px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <h4 style={{ color: '#1F4E78', margin: '0 0 10px 0' }}>✍️ Redactar Comunicado de la Mesa Directiva</h4>
            <form onSubmit={handleSubmit}>
              <div className="campo">
                <label>Título del comunicado</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej. Convocatoria a jornada de mantenimiento"
                  required
                />
              </div>

              <div className="campo">
                <label>Nivel de prioridad vecinal</label>
                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                  <option value="Alta">🔴 Alta (Urgente / Afectación de servicios)</option>
                  <option value="Media">🟡 Media (Informativo de asamblea / cuotas)</option>
                  <option value="Baja">🟢 Baja (Recomendaciones y convivencia)</option>
                </select>
              </div>

              <div className="campo">
                <label>Contenido del aviso</label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows="4"
                  placeholder="Describe a detalle el comunicado para los residentes..."
                  required
                />
              </div>

              <button type="submit" className="btn-primario">
                Publicar en el Tablón Vecinal →
              </button>
            </form>
          </div>
        )}

        <div className="filtros-avisos" style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
          {['Todos', 'Alta', 'Media', 'Baja'].map((cat) => (
            <button
              key={cat}
              className={`btn-filtro ${filtro === cat ? 'activo' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat === 'Todos' ? '📋 Todos' : cat === 'Alta' ? '🔴 Urgentes' : cat === 'Media' ? '🟡 Informativos' : '🟢 Generales'}
            </button>
          ))}
        </div>

        <div className="lista-avisos" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {avisosFiltrados.length === 0 ? (
            <p style={{ color: '#64748B' }}>No hay comunicados registrados con este filtro.</p>
          ) : (
            avisosFiltrados.map((av) => (
              <div
                key={av.id}
                className="tarjeta-aviso"
                style={{
                  padding: '16px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderLeft: av.prioridad === 'Alta' ? '4px solid #DC2626' : av.prioridad === 'Media' ? '4px solid #F59E0B' : '4px solid #10B981',
                  borderRadius: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#1E293B' }}>{av.titulo}</h3>
                  <span
                    className={`badge-prioridad ${av.prioridad.toLowerCase()}`}
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      background: av.prioridad === 'Alta' ? '#FEE2E2' : av.prioridad === 'Media' ? '#FEF3C7' : '#D1FAE5',
                      color: av.prioridad === 'Alta' ? '#991B1B' : av.prioridad === 'Media' ? '#92400E' : '#065F46'
                    }}
                  >
                    Prioridad {av.prioridad}
                  </span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#475569', lineHeight: '1.45' }}>
                  {av.contenido}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8' }}>
                  <span>✍️ {av.autor}</span>
                  <span>📅 {av.fecha}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
