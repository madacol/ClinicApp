// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Componentes comunes
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas de autenticación
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccesoDenegado from './pages/AccesoDenegado';

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

const Navigation = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  
  return (
    <nav className="menu-container">
      {isAuthenticated() ? (
        <>
          <div className="user-info">
            <span>Hola, {currentUser.username}</span>
            <button onClick={logout} className="logout-button">Cerrar sesión</button>
          </div>
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
          <Link to="/medicos">
            <button className="menu-button">Ver Médicos</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="menu-button">Iniciar sesión</button>
          </Link>
          <Link to="/register">
            <button className="menu-button">Registrarse</button>
          </Link>
          <Link to="/precios">
            <button className="menu-button">Precios</button>
          </Link>
          <Link to="/medicos">
            <button className="menu-button">Ver Médicos</button>
          </Link>
        </>
      )}
    </nav>
  );
};

function AppContent() {
  return (
    <div className="App">
      <Header />
      <Navigation />

      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/medicos" element={<ListaMedicos />} />
          <Route path="/acceso-denegado" element={<AccesoDenegado />} />
          
          {/* Rutas protegidas que requieren autenticación */}
          <Route element={<ProtectedRoute />}>
            <Route path="/registro-paciente" element={<RegistroPaciente />} />
            <Route path="/historia-medica" element={<HistoriaMedica />} />
            <Route path="/reservar-cita" element={<ReservarCita />} />
            <Route path="/seleccion-dia-hora" element={<SeleccionDiaHora />} />
            <Route path="/seleccion-servicio" element={<SeleccionServicio />} />
            <Route path="/solicitar-presupuesto" element={<SolicitarPresupuesto />} />
            <Route path="/sugerencias-reclamos" element={<SugerenciasReclamos />} />
            <Route path="/confirmar-condiciones" element={<ConfirmarCondiciones />} />
            <Route path="/confirmar-reserva" element={<ConfirmarReserva />} />
            <Route path="/cita-confirmada" element={<CitaConfirmada />} />
            <Route path="/medios-de-pago" element={<MediosDePago />} />
          </Route>
          
          {/* Rutas que requieren rol de administrador */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            {/* Añadir rutas de administración aquí */}
          </Route>
          
          {/* Rutas que requieren rol de médico */}
          <Route element={<ProtectedRoute roles={['medico']} />}>
            {/* Añadir rutas de médicos aquí */}
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
