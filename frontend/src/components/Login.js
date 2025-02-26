import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        credentials
      );
      
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setLoading(false);
      
      // Redireccionar al usuario según su rol
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else if (response.data.user.role === 'medico') {
        navigate('/medico');
      } else {
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || 
        'Error al iniciar sesión. Intente nuevamente.'
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario o Email</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      
      <div className="login-links">
        <p>
          ¿No tienes cuenta? <span onClick={() => navigate('/registro')}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default Login;