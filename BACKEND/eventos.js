// backend/eventos.js

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

export default router;
