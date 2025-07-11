import express from "express";
import morgan from "morgan";
import { router } from "../backend/routes.js";

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json()); 
app.use('/api/invitados', router);


app.get('/', (req, res) => {
  res.send('Challenge Academia ForIt');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


// Error de ingreso de datos
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON inválido:', err.message);
    return res.status(400).json({ error: 'Debe ingresar nombre, DNI y status válidos.' });
  }
  next(err);
});
