import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { router } from "../backend/routes.js";

const app = express();
const port = 3000;

// Primero cors para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/invitados', router);

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
