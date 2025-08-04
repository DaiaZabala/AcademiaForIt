import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { router as invitadosRouter } from "../backend/routes.js";
import eventosRouter from '../backend/eventos.js';



const port = process.env.PORT || 3000;
const app = express();


app.use(cors()); // Permite cualquier origen temporalmente

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/invitados', invitadosRouter);
app.use('/api/eventos', eventosRouter);  

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
  console.log(`Servidor corriendo en el puerto ${port}`);
});
