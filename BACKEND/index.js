import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { router as invitadosRouter } from "../BACKEND/routes.js";
import eventosRouter from '../BACKEND/eventos.js';

const app = express();
const port = 3000;

// Configura CORS para permitir solicitudes solo desde tu dominio de Vercel
app.use(cors({
  origin: 'https://eventdai.vercel.app'
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