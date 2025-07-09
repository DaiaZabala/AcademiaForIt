import express from 'express';

export const router = express.Router();

let invitados = [];
let nextId = 1;

// GET /api/invitados
router.get('/', (req, res) => {
  res.json(invitados);
});


router.post('/', (req, res) => {
  const { nombre, dni,email,status } = req.body;

  if (!nombre || !dni) {
    return res.status(400).json({ error: 'El nombre y el DNI son obligatorios.' });
  }

  const nuevoInvitado = {
    id: String(nextId++),
    nombre,
    dni,
    email: email || '',
    status: status || 'pendiente',
    createdAt: new Date()
  };

  invitados.push(nuevoInvitado);

  res.status(201).json(nuevoInvitado);
});
