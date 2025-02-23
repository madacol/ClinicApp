// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Componentes comunes
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import Inicio from './pages/Inicio';
import RegistroPaciente from './pages/RegistroPaciente';
import ReservarCita from './pages/ReservarCita';
import SeleccionDiaHora from './pages/SeleccionDiaHora';
import SeleccionServicio from './pages/SeleccionServicio';
import SolicitarPresupuesto from './pages/SolicitarPresupuesto';
import SugerenciasReclamos from './pages/SugerenciasReclamos';
import HistoriaMedica from './pages/HistoriaMedica';
import ConfirmarCondiciones from './pages/ConfirmarCondiciones';
import ConfirmarReserva from './pages/ConfirmarReserva';
import CitaConfirmada from './pages/CitaConfirmada';
import ListaMedicos from './pages/ListaMedicos';
import MediosDePago from './pages/MediosDePago';
import Precios from './pages/Precios';

function App() {
  return (
    <div className="App">
      <Header />

      <nav className="menu-container">
        <Link to="/registro-paciente">
          <button className="menu-button">Registrar paciente</button>
        </Link>
        <Link to="/historia-medica">
          <button className="menu-button">Historia Médica</button>
        </Link>
        <Link to="/reservar-cita">
          <button className="menu-button">Reservar cita</button>
        </Link>
        <Link to="/solicitar-presupuesto">
          <button className="menu-button">Solicitar presupuesto</button>
        </Link>
        <Link to="/precios">
          <button className="menu-button">Precios</button>
        </Link>
        <Link to="/medios-de-pago">
          <button className="menu-button">Medios de pago</button>
        </Link>
        <Link to="/sugerencias-reclamos">
          <button className="menu-button">Sugerencias y reclamos</button>
        </Link>
        <Link to="/confirmar-condiciones">
          <button className="menu-button">Confirmar condiciones</button>
        </Link>
        <Link to="/confirmar-reserva">
          <button className="menu-button">Confirmar reserva</button>
        </Link>
        <Link to="/cita-confirmada">
          <button className="menu-button">Cita confirmada</button>
        </Link>
        <Link to="/medicos">
          <button className="menu-button">Ver Médicos</button>
        </Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro-paciente" element={<RegistroPaciente />} />
          <Route path="/reservar-cita" element={<ReservarCita />} />
          <Route path="/seleccion-dia-hora" element={<SeleccionDiaHora />} />
          <Route path="/seleccion-servicio" element={<SeleccionServicio />} />
          <Route path="/solicitar-presupuesto" element={<SolicitarPresupuesto />} />
          <Route path="/sugerencias-reclamos" element={<SugerenciasReclamos />} />
          <Route path="/historia-medica" element={<HistoriaMedica />} />
          <Route path="/confirmar-condiciones" element={<ConfirmarCondiciones />} />
          <Route path="/confirmar-reserva" element={<ConfirmarReserva />} />
          <Route path="/cita-confirmada" element={<CitaConfirmada />} />
          <Route path="/medicos" element={<ListaMedicos />} />
          <Route path="/medios-de-pago" element={<MediosDePago />} />
          <Route path="/precios" element={<Precios />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
