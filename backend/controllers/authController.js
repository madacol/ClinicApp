// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbquery = require('../dbquery');
const Usuario = require('../models/usuarioModel');

// Configuración del JWT
const JWT_SECRET = process.env.JWT_SECRET || 'clinicapp-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Registro de nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password, role = 'paciente' } = req.body;
    
    // Crear y validar el objeto usuario
    const usuario = new Usuario({ username, email, password, role });
    usuario.validar();

    // Verificar si el usuario ya existe
    const checkQuery = 'SELECT id FROM usuarios WHERE username = ? OR email = ?';
    const existingUsers = await dbquery(checkQuery, [username, email]);
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'El usuario o correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el usuario en la base de datos
    const insertQuery = `
      INSERT INTO usuarios (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const result = await dbquery(insertQuery, [username, email, hashedPassword, role]);

    // Generar token JWT
    const token = jwt.sign(
      { id: result.insertId, username, role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      userId: result.insertId,
      token
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: error.message || 'Error al registrar el usuario' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar datos de entrada
    if (!username || !password) {
      return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
    }

    // Buscar el usuario en la base de datos
    const query = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    const users = await dbquery(query, [username, username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = users[0];

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Obtener perfil del usuario actual
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Se obtiene del middleware de autenticación
    
    const query = 'SELECT id, username, email, role, created_at, updated_at FROM usuarios WHERE id = ?';
    const users = await dbquery(query, [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json(users[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};