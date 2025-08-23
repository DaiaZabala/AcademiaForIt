import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { router as invitadosRouter } from "../backend/routes.js";
import eventosRouter from '../backend/eventos.js';

const app = express();
// Usa el puerto de la variable de entorno (para Vercel) o el 3000 (para desarrollo local)
//const port = process.env.PORT || 5173;
// server.js o index.js
const port = process.env.PORT || 5000;

// Configura CORS de forma condicional para desarrollo y producción.
// En producción (Vercel), permite solo el origen de Vercel.
// En desarrollo, permite cualquier origen para evitar problemas con los puertos locales.
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? 'https://eventdai.vercel.app'
  : '*'; // Permite cualquier origen en desarrollo

app.use(cors({
  origin: allowedOrigins
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/invitados', invitadosRouter);
app.use('/api/eventos', eventosRouter); 

// Agrega esta nueva ruta para el healthcheck
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Challenge Academia ForIt');
});

// Middleware de manejo de errores (syntax error JSON)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON inválido:', err.message);
    return res.status(400).json({ error: 'Debe ingresar nombre, DNI y status válidos.' });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});