import express from 'express';

export const router = express.Router();

let invitados = [];
let nextId = 1;




// GET /api/invitados
router.get('/', (req, res) => {
  res.json(invitados);
});

router.get('/total', (req, res) => {
  res.send(`Total de invitados: ${invitados.length}`);
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

//UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, dni, email, status } = req.body;

  // Validar que nombre y dni vengan en el body
  if (!nombre || !dni) {
    return res.status(400).json({ error: 'El nombre y el DNI son obligatorios.' });
  }

  const invitado = invitados.find(inv => inv.id === id);

  if (!invitado) {
    return res.status(404).json({ error: 'Invitado no encontrado.' });
  }

  // Actualizar campos
  invitado.nombre = nombre;
  invitado.dni = dni;
  if (email !== undefined) invitado.email = email;
  if (status !== undefined) invitado.status = status;

  res.json(invitado);
});


// DELETE /api/invitados/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = invitados.findIndex((inv) => inv.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Invitado no encontrado.' });
  }

  const eliminado = invitados.splice(index, 1); // elimina 1 invitado

  res.json({ mensaje: 'Invitado eliminado.', eliminado: eliminado[0] });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});
