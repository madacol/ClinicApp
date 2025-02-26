// backend/server.js
require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const cors = require('cors');
const { mysql, config } = require('./config/db.config'); // Configuración de MySQL

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Probar la conexión a MySQL al iniciar el servidor
(async () => {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Conexión a MySQL establecida correctamente');
    await connection.end();
  } catch (err) {
    console.error('Error conectando a MySQL:', err);
  }
})();

// Importa las rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pacientes', require('./routes/pacienteRoutes'));
app.use('/api/historia-medica', require('./routes/historiaRoutes'));
app.use('/api/medicos', require('./routes/medicoRoutes'));
app.use('/api/centros-salud', require('./routes/centroSaludRoutes'));

app.get('/', (req, res) => {
  res.send('Bienvenido a Clinica_rosmarian_castillo API');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
