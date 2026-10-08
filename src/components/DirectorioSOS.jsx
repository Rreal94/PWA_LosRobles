import React from 'react';

export default function DirectorioSOS({ emergencias }) {
  return (
    <div className="modulo-sos">
      <div className="card-seccion">
        <div className="card-header">
          <h2>🚨 Directorio Telefónico de Emergencias (US-005)</h2>
          <span className="badge-sprint">Zapopan, Jalisco</span>
        </div>
        <p style={{ margin: '6px 0 16px 0', color: '#64748B', fontSize: '13.5px' }}>
          Líneas de auxilio y atención inmediata con marcación directa desde tu dispositivo móvil.
        </p>

        <div className="grid-emergencias" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {emergencias.map((item) => (
            <div
              key={item.id}
              className="tarjeta-sos"
              style={{
                padding: '14px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '28px' }}>{item.icono}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#1E293B' }}>{item.nombre}</h4>
                <span style={{ fontSize: '11px', color: '#64748B' }}>{item.tipo}</span>
                <div style={{ marginTop: '4px' }}>
                  <a
                    href={`tel:${item.telefono}`}
                    style={{
                      display: 'inline-block',
                      color: '#1D4ED8',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      textDecoration: 'none'
                    }}
                  >
                    📞 {item.telefono}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
