import express from 'express';

const router = express.Router();

let eventos = [];
let nextEventoId = 1;

// POST /api/eventos - Crear evento
router.post('/', (req, res) => {
  try {
    const { nombre, fecha, ubicacion, descripcion, invitadosMax } = req.body;

    if (!nombre || !fecha || !ubicacion) {
      return res.status(400).json({ error: 'Nombre, fecha y ubicación son obligatorios.' });
    }

    const nuevoEvento = {
      id: String(nextEventoId++),
      nombre: nombre.trim(),
      fecha: new Date(fecha),
      ubicacion: ubicacion.trim(),
      descripcion: descripcion?.trim() || '',
      invitadosMax: invitadosMax ?? null,
      creadoEn: new Date(),
    };

    eventos.push(nuevoEvento);
    res.status(201).json(nuevoEvento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el evento.' });
  }
});

// GET /api/eventos - Listar eventos
router.get('/', (req, res) => {
  try {
    res.json(eventos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los eventos.' });
  }
});

// POST /api/eventos/login - Login por nombre del evento
router.post('/login', (req, res) => {
  const { nombreEvento } = req.body;

  if (!nombreEvento || nombreEvento.trim() === '') {
    return res.status(400).json({ error: 'Debe ingresar el nombre del evento.' });
  }

  const eventoEncontrado = eventos.find(e =>
    e.nombre.toLowerCase() === nombreEvento.trim().toLowerCase()
  );

  if (!eventoEncontrado) {
    return res.status(404).json({ error: 'Evento no encontrado.' });
  }

  return res.json({ mensaje: 'Login exitoso', evento: eventoEncontrado });
});

export default router;
