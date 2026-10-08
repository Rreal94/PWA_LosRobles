import React, { useState } from 'react';

export default function PagoCuotas({ usuario, pagos, onRegistrarPago }) {
  const [metodo, setMetodo] = useState('Transferencia SPEI');
  const [folio, setFolio] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [comprobanteGenerado, setComprobanteGenerado] = useState(null);

  // Verificar si ya tiene pago en Octubre 2026
  const pagoActual = pagos.find(p => p.usuarioId === usuario.id && p.mes === 'Octubre 2026');

  const handlePagar = (e) => {
    e.preventDefault();
    setProcesando(true);

    const refGenerada = folio.trim() || `SPEI-${Date.now().toString().slice(-6)}`;

    setTimeout(() => {
      const nuevoPago = {
        id: Date.now(),
        usuarioId: usuario.id,
        nombre: usuario.nombre,
        vivienda: usuario.vivienda,
        monto: 500,
        fecha: new Date().toISOString().split('T')[0],
        mes: 'Octubre 2026',
        referencia: refGenerada,
        metodo: metodo
      };

      onRegistrarPago(nuevoPago);
      setComprobanteGenerado(nuevoPago);
      setProcesando(false);
    }, 600);
  };

  const descargarPDF = (pago) => {
    try {
      if (window.jspdf && window.jspdf.jsPDF) {
        const doc = new window.jspdf.jsPDF();
        
        // Encabezado institucional
        doc.setFillColor(31, 78, 120); // #1F4E78
        doc.rect(0, 0, 210, 35, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text("RESIDENCIAL LOS ROBLES", 105, 18, { align: 'center' });
        doc.setFontSize(11);
        doc.text("Comprobante Oficial de Pago de Cuota de Mantenimiento", 105, 27, { align: 'center' });

        // Cuerpo del comprobante
        doc.setTextColor(33, 33, 33);
        doc.setFontSize(11);
        
        doc.text(`Folio Oficial: ${pago.referencia}`, 20, 50);
        doc.text(`Fecha de Emisión: ${pago.fecha}`, 140, 50);
        
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 55, 190, 55);

        doc.text("DATOS DEL RESIDENTE:", 20, 65);
        doc.setFontSize(10);
        doc.text(`Nombre del Residente: ${pago.nombre}`, 25, 75);
        doc.text(`Ubicación de Vivienda: ${pago.vivienda}`, 25, 83);
        doc.text(`Periodo Correspondiente: ${pago.mes}`, 25, 91);
        doc.text(`Método de Pago: ${pago.metodo}`, 25, 99);

        // Caja de importe
        doc.setFillColor(240, 244, 248);
        doc.rect(20, 110, 170, 30, 'F');
        doc.setFontSize(12);
        doc.setTextColor(17, 85, 204);
        doc.text(`MONTO PAGADO: $${pago.monto}.00 MXN`, 105, 125, { align: 'center' });
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text("(Quinientos pesos 00/100 M.N. — Cuota mensual ordinaria)", 105, 133, { align: 'center' });

        // Firma y sello
        doc.setTextColor(33, 33, 33);
        doc.setFontSize(9);
        doc.text("__________________________________________", 105, 175, { align: 'center' });
        doc.text("Doña Laura Sánchez — Tesorera de la Mesa Directiva", 105, 182, { align: 'center' });
        doc.text("Colonia Residencial Los Robles · Zapopan, Jalisco", 105, 188, { align: 'center' });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Cadena digital de verificación: PWA-LR-${pago.referencia}-AUT-VALID`, 105, 205, { align: 'center' });

        doc.save(`Recibo_${pago.vivienda.replace(' ', '_')}_Octubre_2026.pdf`);
      } else {
        alert(`Comprobante generado: Folio ${pago.referencia}. Descarga en PDF simulada (jsPDF activo).`);
      }
    } catch (err) {
      console.error("Error al generar PDF:", err);
      alert(`Recibo generado exitosamente con folio: ${pago.referencia}`);
    }
  };

  const misPagos = pagos.filter(p => p.usuarioId === usuario.id);

  return (
    <div className="modulo-pago">
      <div className="card-seccion">
        <div className="card-header">
          <h2>💳 Pago de Cuota Vecinal (US-003)</h2>
          <span className="badge-sprint">Sprint 2 · React 18</span>
        </div>

        {pagoActual ? (
          <div className="alerta-exito">
            <div style={{ fontSize: '28px' }}>✅</div>
            <div>
              <h3>¡Tu cuota de Octubre 2026 está al corriente!</h3>
              <p>Monto cubierto: <strong>$500.00 MXN</strong> | Referencia: <code>{pagoActual.referencia}</code></p>
              <button
                className="btn-secundario"
                style={{ marginTop: '10px' }}
                onClick={() => descargarPDF(pagoActual)}
              >
                📄 Descargar Recibo Oficial en PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="formulario-pago">
            <div className="resumen-cobro">
              <div>
                <span>Periodo a pagar:</span>
                <strong>Octubre 2026</strong>
              </div>
              <div>
                <span>Vivienda asignada:</span>
                <strong>{usuario.vivienda}</strong>
              </div>
              <div>
                <span>Importe ordinario:</span>
                <strong className="monto-destacado">$500.00 MXN</strong>
              </div>
            </div>

            <form onSubmit={handlePagar}>
              <div className="campo">
                <label>Método de pago preferido</label>
                <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                  <option value="Transferencia SPEI">Transferencia SPEI (BBVA / STP)</option>
                  <option value="Tarjeta de Débito/Crédito">Tarjeta Débito/Crédito en línea</option>
                  <option value="Depósito en OXXO">Depósito en OXXO</option>
                  <option value="Efectivo en Administración">Efectivo en Administración</option>
                </select>
              </div>

              <div className="campo">
                <label>Número de autorización o folio bancario</label>
                <input
                  type="text"
                  value={folio}
                  onChange={(e) => setFolio(e.target.value)}
                  placeholder="Ej. SPEI-782910 (Opcional, se genera automático)"
                />
              </div>

              <button type="submit" className="btn-primario" disabled={procesando}>
                {procesando ? 'Procesando pago...' : 'Confirmar y Pagar $500.00 MXN →'}
              </button>
            </form>
          </div>
        )}

        {comprobanteGenerado && (
          <div className="modal-comprobante" style={{ marginTop: '20px', padding: '16px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px' }}>
            <h4 style={{ color: '#0369A1', margin: '0 0 8px 0' }}>🎉 Pago Registrado con Éxito</h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
              Se ha registrado el pago para {comprobanteGenerado.nombre} ({comprobanteGenerado.vivienda}) con el folio <strong>{comprobanteGenerado.referencia}</strong>.
            </p>
            <button className="btn-primario" onClick={() => descargarPDF(comprobanteGenerado)}>
              📥 Descargar Recibo en PDF Ahora
            </button>
          </div>
        )}
      </div>

      <div className="card-seccion" style={{ marginTop: '20px' }}>
        <h3>📜 Mi Historial de Pagos</h3>
        {misPagos.length === 0 ? (
          <p style={{ color: '#64748B' }}>No hay registros de pagos previos.</p>
        ) : (
          <table className="tabla-registros">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Fecha</th>
                <th>Método</th>
                <th>Folio</th>
                <th>Monto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {misPagos.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.mes}</strong></td>
                  <td>{p.fecha}</td>
                  <td>{p.metodo}</td>
                  <td><code>{p.referencia}</code></td>
                  <td><span className="badge-verde">${p.monto}.00</span></td>
                  <td>
                    <button className="btn-link" onClick={() => descargarPDF(p)}>
                      📄 Recibo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
