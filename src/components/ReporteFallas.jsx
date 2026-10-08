import React, { useState } from 'react';

export default function ReporteFallas({ usuario, fallas, onRegistrarFalla, onActualizarEstatus }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Alumbrado público');
  const [descripcion, setDescripcion] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  const esAdmin = usuario && usuario.tipo === 'admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descripcion.trim()) return;

    const nuevaFalla = {
      id: Date.now(),
      titulo: titulo.trim(),
      reportante: `${usuario.nombre} (${usuario.vivienda || 'Vecino'})`,
      fecha: new Date().toISOString().split('T')[0],
      categoria: categoria,
      estatus: 'Reportado',
      descripcion: descripcion.trim()
    };

    onRegistrarFalla(nuevaFalla);
    setTitulo('');
    setDescripcion('');
    setCategoria('Alumbrado público');
    setMostrarForm(false);
  };

  return (
    <div className="modulo-fallas">
      <div className="card-seccion">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>🛠️ Reporte de Fallas e Incidencias (US-008)</h2>
            <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '13px' }}>
              Atención a servicios y mantenimiento de áreas comunes de Los Robles
            </p>
          </div>
          <button
            className="btn-primario"
            style={{ padding: '8px 14px', fontSize: '13px' }}
            onClick={() => setMostrarForm(!mostrarForm)}
          >
            {mostrarForm ? '✕ Cancelar' : '➕ Levantar Reporte'}
          </button>
        </div>

        {mostrarForm && (
          <div className="formulario-falla" style={{ marginTop: '16px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <h4 style={{ color: '#1F4E78', margin: '0 0 10px 0' }}>📝 Nueva Incidencia en Áreas Comunes</h4>
            <form onSubmit={handleSubmit}>
              <div className="campo">
                <label>Título breve del problema</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej. Fuga de agua en el parque frente a casa 04"
                  required
                />
              </div>

              <div className="campo">
                <label>Categoría del servicio</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="Alumbrado público">💡 Alumbrado público y luminarias</option>
                  <option value="Acceso y Seguridad">🚪 Portón eléctrico y caseta</option>
                  <option value="Agua y Drenaje">💧 Tuberías y red hidráulica</option>
                  <option value="Áreas verdes">🌳 Jardinería y juegos infantiles</option>
                  <option value="Limpieza y Basura">🧹 Recolección y aseo común</option>
                </select>
              </div>

              <div className="campo">
                <label>Descripción detallada</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows="3"
                  placeholder="Indica la ubicación exacta y lo que ocurre..."
                  required
                />
              </div>

              <button type="submit" className="btn-primario">
                Registrar Falla en el Sistema →
              </button>
            </form>
          </div>
        )}

        <div className="lista-fallas" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {fallas.length === 0 ? (
            <p style={{ color: '#64748B' }}>No hay reportes de fallas activos en la colonia.</p>
          ) : (
            fallas.map((f) => (
              <div
                key={f.id}
                className="tarjeta-falla"
                style={{
                  padding: '14px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: '#0F172A' }}>{f.titulo}</h3>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      background: f.estatus === 'Resuelto' ? '#DCFCE7' : f.estatus === 'En proceso' ? '#FEF3C7' : '#FEE2E2',
                      color: f.estatus === 'Resuelto' ? '#166534' : f.estatus === 'En proceso' ? '#92400E' : '#991B1B'
                    }}
                  >
                    ● {f.estatus}
                  </span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '13.5px', color: '#475569' }}>
                  {f.descripcion}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94A3B8' }}>
                  <span>📂 {f.categoria} · 👤 {f.reportante}</span>
                  <span>📅 {f.fecha}</span>
                </div>

                {esAdmin && (
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #E2E8F0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#64748B' }}>Actualizar estado:</span>
                    <button
                      className="btn-link"
                      style={{ fontSize: '11.5px' }}
                      onClick={() => onActualizarEstatus(f.id, 'En proceso')}
                    >
                      🟡 En proceso
                    </button>
                    <button
                      className="btn-link"
                      style={{ fontSize: '11.5px', color: '#16A34A' }}
                      onClick={() => onActualizarEstatus(f.id, 'Resuelto')}
                    >
                      🟢 Marcar Resuelto
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
