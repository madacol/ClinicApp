// src/pages/MediosDePago.js
import React from 'react';

const MediosDePago = () => {
  const paymentOptions = [
    { method: 'Pago con tarjeta de crédito' },
    { method: 'Pago con tarjeta de débito' },
    { method: 'Transferencia bancaria nacional' },
    { method: 'Transferencia bancaria Bank of America' },
    { method: 'Transferencia bancaria Banesco Panama' },
    { method: 'Pago en efectivo' },
    { method: 'Zelle' }
  ];

  return (
    <div>
      <h1>Medios de Pago</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }} border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Método de Pago</th>
          </tr>
        </thead>
        <tbody>
          {paymentOptions.map((option, index) => (
            <tr key={index}>
              <td>{option.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediosDePago;
