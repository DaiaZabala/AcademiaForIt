import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { router as invitadosRouter } from "./backend/routes.js"; // Ajustá ruta si es necesario
import eventosRouter from './backend/eventos.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Permite cualquier origen temporalmente
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/invitados', invitadosRouter);
app.use('/api/eventos', eventosRouter);

app.get('/', (req, res) => {
  res.send('Challenge Academia ForIt');
});

// Middleware para manejar error de JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON inválido:', err.message);
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
