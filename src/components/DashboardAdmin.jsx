import React, { useState } from 'react';

export default function DashboardAdmin({ usuario, usuarios, pagos, onNavegar }) {
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const vecinos = usuarios.filter(u => u.tipo === 'vecino');
  const pagosOctubre = pagos.filter(p => p.mes === 'Octubre 2026');

  const totalRecaudado = pagosOctubre.reduce((acc, p) => acc + p.monto, 0);
  const totalEsperado = vecinos.length * 500;
  const porcentajeRecaudacion = Math.round((totalRecaudado / totalEsperado) * 100) || 0;

  const listaVecinosConEstado = vecinos.map(v => {
    const pago = pagosOctubre.find(p => p.usuarioId === v.id);
    return {
      ...v,
      alCorriente: !!pago,
      folioPago: pago ? pago.referencia : null,
      fechaPago: pago ? pago.fecha : null
    };
  });

  const vecinosFiltrados = filtroEstado === 'Todos'
    ? listaVecinosConEstado
    : filtroEstado === 'Pagados'
      ? listaVecinosConEstado.filter(v => v.alCorriente)
      : listaVecinosConEstado.filter(v => !v.alCorriente);

  return (
    <div className="dashboard-admin">
      <div className="tarjeta-bienvenida">
        <h2>Panel de la Mesa Directiva 👔</h2>
        <p>Bienvenido, <strong>{usuario.nombre}</strong> ({usuario.cargo}) · Residencial Los Robles</p>
      </div>

      <div className="grid-resumen" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '20px 0' }}>
        <div className="card-kpi" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Recaudación Octubre</span>
          <div style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0', color: '#166534' }}>
            ${totalRecaudado.toLocaleString()} MXN
          </div>
          <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${porcentajeRecaudacion}%`, height: '100%', background: '#16A34A' }}></div>
          </div>
          <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '6px' }}>
            {porcentajeRecaudacion}% de la meta mensual (${totalEsperado.toLocaleString()})
          </span>
        </div>

        <div className="card-kpi" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Vecinos al Corriente</span>
          <div style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0', color: '#1E293B' }}>
            {pagosOctubre.length} / {vecinos.length} Casas
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#16A34A' }}>
            ✅ Cuotas ordinarias registradas
          </p>
        </div>

        <div className="card-kpi" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Vecinos con Adeudo</span>
          <div style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0', color: '#DC2626' }}>
            {vecinos.length - pagosOctubre.length} Casas
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#DC2626' }}>
            ⚠️ Pendiente de cobro o conciliación
          </p>
        </div>
      </div>

      <div className="card-seccion">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3>📋 Padrón de Residentes y Estatus de Cuotas</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              Control y conciliación de aportaciones vecinales de Los Robles
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['Todos', 'Pagados', 'Pendientes'].map(f => (
              <button
                key={f}
                className={`btn-filtro ${filtroEstado === f ? 'activo' : ''}`}
                onClick={() => setFiltroEstado(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="tabla-registros">
          <thead>
            <tr>
              <th>Vivienda</th>
              <th>Residente</th>
              <th>Correo</th>
              <th>Estado Octubre</th>
              <th>Folio</th>
            </tr>
          </thead>
          <tbody>
            {vecinosFiltrados.map(v => (
              <tr key={v.id}>
                <td><strong>{v.vivienda}</strong></td>
                <td>{v.nombre}</td>
                <td>{v.correo}</td>
                <td>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      background: v.alCorriente ? '#DCFCE7' : '#FEE2E2',
                      color: v.alCorriente ? '#166534' : '#991B1B'
                    }}
                  >
                    {v.alCorriente ? '✅ Al corriente' : '❌ Adeudo'}
                  </span>
                </td>
                <td>
                  {v.alCorriente ? <code>{v.folioPago}</code> : <span style={{ color: '#94A3B8' }}>Sin pago</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
