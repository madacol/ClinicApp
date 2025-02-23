// backend/dbquery.js
require('dotenv').config(); // Carga las variables de entorno desde .env
const { mysql, config } = require('./config/db.config');

async function dbquery(...arguments) {
  try {
    // Crea una conexión usando la configuración
    const connection = await mysql.createConnection(config);
    
    // Realiza una consulta de prueba
    const [rows] = await connection.query(...arguments);

    // Cierra la conexión
    await connection.end();

    return rows;
  } catch (err) {
    console.error('Error conectando a MySQL:', err);
  }
}
module.exports = dbquery;


