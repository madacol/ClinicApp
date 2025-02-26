// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dbquery = require('../dbquery');

const JWT_SECRET = process.env.JWT_SECRET || 'clinicapp-secret-key';

// Middleware para verificar token JWT
exports.authenticateToken = async (req, res, next) => {
  // Obtener el token del header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token requerido' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verificar si el usuario aún existe en la base de datos
    const query = 'SELECT id, username, role FROM usuarios WHERE id = ?';
    const users = await dbquery(query, [decoded.id]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Usuario no válido' });
    }
    
    // Añadir información del usuario al objeto request
    req.user = users[0];
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(403).json({ message: 'Token inválido' });
  }
};

// Middleware para verificar roles
exports.authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    
    next();
  };
};