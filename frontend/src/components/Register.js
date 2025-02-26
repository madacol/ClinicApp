import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Verificar que las contraseñas coincidan
    if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    // Verificar longitud mínima de la contraseña
    if (userData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    // Verificar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError('El formato del correo electrónico no es válido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Omitir confirmPassword al enviar los datos al servidor
      const { confirmPassword, ...dataToSend } = userData;
      
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        dataToSend
      );
      
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        username: userData.username,
        email: userData.email,
        role: 'paciente' // Por defecto, todos los usuarios nuevos son pacientes
      }));
      
      setLoading(false);
      navigate('/'); // Redireccionar al inicio después del registro exitoso
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || 
        'Error al registrar usuario. Intente nuevamente.'
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <small>Mínimo 6 caracteres</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      
      <div className="register-links">
        <p>
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Iniciar Sesión</span>
        </p>
      </div>
    </div>
  );
};

export default Register;