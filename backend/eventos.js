import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const DB_FILE = path.join(__dirname, 'eventos.json');

// Función para cargar eventos desde el archivo
const cargarEventos = async () => {
     try {
          const data = await fs.readFile(DB_FILE, 'utf-8');
          return JSON.parse(data);
     } catch (error) {
          if (error.code === 'ENOENT') {
               // El archivo no existe, devuelve un array vacío
               return [];
          }
          console.error('Error al leer el archivo de la base de datos:', error);
          return [];
     }
};

// Función para guardar eventos en el archivo
const guardarEventos = async (data) => {
     try {
          await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
     } catch (error) {
          console.error('Error al escribir en el archivo de la base de datos:', error);
     }
};

// POST /api/eventos - Crear evento
router.post('/', async (req, res) => {
     try {
          const eventos = await cargarEventos();
          const nextEventoId = eventos.length > 0 ? Math.max(...eventos.map(e => Number(e.id))) + 1 : 1;
          const { nombre, fecha, ubicacion, descripcion, invitadosMax, contraseña } = req.body;

          if (!nombre || !fecha || !ubicacion || !contraseña) {
               return res.status(400).json({ error: 'Nombre, fecha, ubicación y contraseña son obligatorios.' });
          }

          let hashedPassword;
          try {
               hashedPassword = await bcrypt.hash(contraseña, 10);
          } catch (err) {
               console.error('Error al hashear la contraseña:', err);
               return res.status(500).json({ error: 'Error al hashear la contraseña.' });
          }

          const nuevoEvento = {
               id: String(nextEventoId),
               nombre: nombre.trim(),
               fecha: new Date(fecha),
               ubicacion: ubicacion.trim(),
               descripcion: descripcion?.trim() || '',
               invitadosMax: invitadosMax ? Number(invitadosMax) : null,
               contraseña: hashedPassword,
               creadoEn: new Date(),
          };

          eventos.push(nuevoEvento);
          await guardarEventos(eventos); // Guarda los cambios en el archivo

          res.status(201).json(nuevoEvento);
     } catch (err) {
          console.error('Error general al crear el evento:', err);
          res.status(500).json({ error: 'Error al crear el evento.' });
     }
});

// GET /api/eventos - Listar todos los eventos
router.get('/', async (req, res) => {
     try {
          const eventos = await cargarEventos();
          res.json(eventos);
     } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener los eventos.' });
     }
});

// NUEVA RUTA: GET /api/eventos/:id - Obtener un solo evento por su ID
router.get('/:id', async (req, res) => {
     try {
          const eventos = await cargarEventos();
          const evento = eventos.find(e => e.id === req.params.id);

          if (!evento) {
               return res.status(404).json({ error: 'Evento no encontrado.' });
          }

          res.json(evento);
     } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener el evento.' });
     }
});

// POST /api/eventos/login - Login por nombre y contraseña
router.post('/login', async (req, res) => {
     try {
          const eventos = await cargarEventos();
          const { nombreEvento, password } = req.body; // <-- Aquí se obtiene la contraseña

          if (!nombreEvento || nombreEvento.trim() === '' || !password) {
               return res.status(400).json({ error: 'Debe ingresar el nombre del evento y la contraseña.' });
          }

          const eventoEncontrado = eventos.find(e =>
               e.nombre.toLowerCase() === nombreEvento.trim().toLowerCase()
          );

          if (!eventoEncontrado) {
               return res.status(404).json({ error: 'Evento no encontrado.' });
          }

          // Comparar la contraseña ingresada con la contraseña hasheada
          const match = await bcrypt.compare(password, eventoEncontrado.contraseña);

          if (!match) {
               return res.status(401).json({ error: 'Contraseña incorrecta.' }); // <-- Retorna un error si no coinciden
          }

          return res.json({
               mensaje: 'Login exitoso',
               evento: {
                    id: eventoEncontrado.id,
                    nombre: eventoEncontrado.nombre
               }
          });
     } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al procesar el login.' });
     }
});

router.delete('/:id', async (req, res) => {
  try {
    const eventos = await cargarEventos();
    const eventoIndex = eventos.findIndex(e => e.id === req.params.id);

    if (eventoIndex === -1) return res.status(404).json({ error: 'Evento no encontrado.' });

    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Debe ingresar la contraseña del evento.' });

    const evento = eventos[eventoIndex];
    const match = await bcrypt.compare(password, evento.contraseña);

    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta.' });

    const [eventoEliminado] = eventos.splice(eventoIndex, 1);
    await guardarEventos(eventos);

    res.json({
      mensaje: 'Evento eliminado correctamente.',
      evento: { id: eventoEliminado.id, nombre: eventoEliminado.nombre }
    });
  } catch (err) {
    console.error('Error al eliminar el evento:', err);
    res.status(500).json({ error: 'Error al eliminar el evento.' });
  }
});



export default router;