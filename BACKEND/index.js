<<<<<<< HEAD
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { router as invitadosRouter } from "../backend/routes.js";
import eventosRouter from '../backend/eventos.js';
=======
import express from 'express';
import cors from 'cors'; // Importa cors
>>>>>>> 792083b6c6595918c6ebc40078f33bccc40de846

const app = express();
const port = process.env.PORT || 3000;

<<<<<<< HEAD
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

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});
=======
app.use(cors()); // Usa el middleware de CORS
>>>>>>> 792083b6c6595918c6ebc40078f33bccc40de846

app.get('/', (req, res) => {
  res.send('Challenge Academia ForIt');
});

// ... el resto de tu código

app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Servidor escuchando en http://localhost:${port}`);
=======
  console.log(`Servidor corriendo en el puerto ${port}`);
>>>>>>> 792083b6c6595918c6ebc40078f33bccc40de846
});