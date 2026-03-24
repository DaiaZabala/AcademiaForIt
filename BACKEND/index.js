import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS.
// Esto es la clave para que el frontend pueda hacer peticiones al backend.
app.use(cors());

// Middleware para que Express pueda leer JSON (útil para peticiones POST, etc.)
app.use(express.json());

// ---------------- Rutas del Backend ----------------

// Ruta raíz. La que ves cuando visitas la URL del backend directamente.
app.get('/', (req, res) => {
  res.send('Challenge Academia ForIt');
});

// Ruta de "healthcheck". Tu frontend la usa para verificar la conexión.
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

// ---------------- Iniciar el Servidor ----------------

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});