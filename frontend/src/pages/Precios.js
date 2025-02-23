// src/pages/PreciosOftalmologia.js
import React from 'react';

const PreciosOftalmologia = () => {
  const procedimientos = [
    "PROCEDIMIENTOS QUIRÚRGICOS COSMÉTICOS",
    "Blefaroplastia (quirúrgica)",
    "Rellenos (Ácido hialurónico)",
    "Toxina botulínica (Botox)",
    "PÁRPADOS",
    "Levantar párpados pesados o caídos (ptosis)",
    "Mejorar la apariencia de los párpados superiores e inferiores (blefaroplastia)",
    "Corregir los párpados hacia adentro / hacia afuera (entropión, ectropión)",
    "Corrección de la retracción palpebral por enfermedad tiroidea",
    "Tratar las cicatrices de los párpados",
    "Eliminar manchas y crecimientos (tumores) de párpados",
    "Extirpar cánceres de piel y reconstrucción de párpados (cáncer de piel periocular)",
    "Controlar los espasmos de los párpados (espasmo hemifacial, blefaroespasmo)",
    "CEJAS",
    "Levantar y contornear las cejas",
    "Elevar las cejas y suavizar las arrugas de la frente (Levantamiento de cejas)",
    "VÍAS LAGRIMALES",
    "Evaluación y manejo de todas las causas de lagrimeo",
    "Reparar vías lagrimales bloqueados en adultos (dacriocistorrinostomía, dacriointubación cerrada)",
    "Apertura de vías lagrimales bloqueados en lactantes y niños (obstrucción lagrimal congénita)",
    "Tratamiento médico y quirúrgico de los ojos secos",
    "Tratar las infecciones de las vías lagrimales",
    "Reparar el trauma de las vías lagrimales",
    "Puntos lagrimales inflamados u obstruídos",
    "PROCEDIMIENTOS ORBITARIOS",
    "Reparación de fracturas orbitarias",
    "Extirparción de tumores orbitarios",
    "Reducción de los ojos saltones en la enfermedad de la tiroides",
    "PRÓTESIS",
    "Adaptación y fabricación de prótesis oculares",
    "Eliminación de ojos ciegos dolorosos",
    "Recubrimiento conjuntival",
    "Preparar la cuenca del ojo para la prótesis",
    "Mejorar la apariencia de los ojos artificiales"
  ];

  return (
    <div>
      <h1>Lista de Precios - Oftalmología</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Procedimiento</th>
            <th>Precio (USD)</th>
            <th>Precio (Bs)</th>
          </tr>
        </thead>
        <tbody>
          {procedimientos.map((procedimiento, index) => {
            const isUpperCase = procedimiento === procedimiento.toUpperCase();
            return (
              <tr key={index}>
                <td>{isUpperCase ? <strong>{procedimiento}</strong> : procedimiento}</td>
                <td>{/* Precio en USD (dejar en blanco para completar) */}</td>
                <td>{/* Precio en Bs (dejar en blanco para completar) */}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PreciosOftalmologia;
