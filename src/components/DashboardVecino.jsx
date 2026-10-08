import React from 'react';

export default function DashboardVecino({ usuario, pagos, avisos, fallas, onNavegar }) {
  const pagoActual = pagos.find(p => p.usuarioId === usuario.id && p.mes === 'Octubre 2026');
  const ultimosAvisos = avisos.slice(0, 2);

  return (
    <div className="dashboard-vecino">
      <div className="tarjeta-bienvenida">
        <h2>Hola, {usuario.nombre} 👋</h2>
        <p>Residente de <strong>{usuario.vivienda}</strong> · Fraccionamiento Los Robles</p>
      </div>

      <div className="grid-resumen" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', margin: '20px 0' }}>
        <div className="card-kpi" style={{ background: pagoActual ? '#F0FDF4' : '#FFFBEB', border: pagoActual ? '1px solid #BBF7D0' : '1px solid #FDE68A', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Cuota de Octubre 2026</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '6px 0', color: pagoActual ? '#166534' : '#B45309' }}>
            {pagoActual ? 'Al Corriente ($500)' : 'Pendiente ($500)'}
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#475569' }}>
            {pagoActual ? `Cubierto el ${pagoActual.fecha} (${pagoActual.metodo})` : 'Vence el 10 de octubre. Realiza tu pago digital.'}
          </p>
          <button
            className="btn-primario"
            style={{ width: '100%', fontSize: '13px' }}
            onClick={() => onNavegar('pagos')}
          >
            {pagoActual ? '📄 Ver Comprobante' : '💳 Pagar Cuota Ahora'}
          </button>
        </div>

        <div className="card-kpi" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Avisos de la Mesa Directiva</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '6px 0', color: '#1E293B' }}>
            {avisos.length} Comunicados
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#475569' }}>
            Último: {avisos[0] ? avisos[0].titulo.slice(0, 38) + '...' : 'Sin avisos'}
          </p>
          <button
            className="btn-secundario"
            style={{ width: '100%', fontSize: '13px' }}
            onClick={() => onNavegar('avisos')}
          >
            📢 Ver Tablón Oficial
          </button>
        </div>

        <div className="card-kpi" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Mantenimiento y Reportes</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '6px 0', color: '#1E293B' }}>
            {fallas.length} Reportes
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#475569' }}>
            Reporta desperfectos en alumbrado, áreas verdes o portón.
          </p>
          <button
            className="btn-secundario"
            style={{ width: '100%', fontSize: '13px' }}
            onClick={() => onNavegar('fallas')}
          >
            🛠️ Reportar Incidencia
          </button>
        </div>
      </div>

      <div className="card-seccion">
        <h3>📢 Avisos Recientes de Don Pedro (Presidente)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          {ultimosAvisos.map(av => (
            <div key={av.id} style={{ padding: '12px', background: '#F8FAFC', borderLeft: '3px solid #1155CC', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '14px', color: '#1E293B' }}>{av.titulo}</strong>
                <span style={{ fontSize: '11px', color: '#64748B' }}>{av.fecha}</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#475569' }}>
                {av.contenido.slice(0, 110)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
