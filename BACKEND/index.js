import express from 'express';
import cors from 'cors'; // Importa cors

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Usa el middleware de CORS

app.get('/', (req, res) => {
  res.send('Challenge Academia ForIt');
});

// ... el resto de tu código

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});