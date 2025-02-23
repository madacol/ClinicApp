// backend/config/db.config.js
require('dotenv').config(); // Carga las variables de entorno desde .env

const mysql = require('mysql2/promise');

const config = {
  host: process.env.DB_HOST || 'localhost',      // Dirección del servidor MySQL
  user: process.env.DB_USER || 'ricardo',  // Usuario de MySQL
  password: process.env.DB_PASSWORD || 'ricardo123', // Contraseña
  database: process.env.DB_DATABASE || 'clinicaDB', // Nombre de la base de datos
  port: process.env.DB_PORT || 3306,               // Puerto (3306 es el predeterminado de MySQL)
  // Opcional: puedes agregar otras opciones, por ejemplo, connectionLimit para pools
};

module.exports = { mysql, config };
