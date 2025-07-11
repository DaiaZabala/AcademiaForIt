import express from 'express';

export const router = express.Router();

let invitados = [];
let nextId = 1;




// GET /api/invitados
router.get('/', (req, res) => {
    try {
    res.json(invitados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los invitados.' });
  }
});

router.get('/total', (req, res) => {
  try {
    res.send(`Total de invitados: ${invitados.length}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al calcular el total de invitados.' });
  }
});

router.post('/', (req, res) => {
  try {
    // Validar que body sea objeto y tenga nombre y dni no vacíos o solo espacios
    if (
  !req.body.nombre ||
  req.body.nombre.trim() === '' ||
  !req.body.dni ||
  req.body.dni.trim() === ''
) {
  return res.status(400).json({ error: 'Debe ingresar nombre y DNI válidos.' });
}

    const { nombre, dni, email, status } = req.body;

    const nuevoInvitado = {
      id: String(nextId++),
      nombre: nombre.trim(),
      dni: dni.trim(),
      email: email || '',
      status: status || 'pendiente',
      createdAt: new Date(),
    };

    invitados.push(nuevoInvitado);

    res.status(201).json(nuevoInvitado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar el invitado.' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dni, email, status } = req.body;

    // Validar que nombre y dni sean strings no vacíos
    if (
      !nombre || nombre.trim() === '' ||
      !dni || dni.trim() === ''
    ) {
      return res.status(400).json({ error: 'El nombre y el DNI son obligatorios.' });
    }

    const invitado = invitados.find(inv => inv.id === id);

    if (!invitado) {
      return res.status(404).json({ error: 'Invitado no encontrado.' });
    }

    // Actualizar campos
    invitado.nombre = nombre.trim();
    invitado.dni = dni.trim();
    if (email !== undefined) invitado.email = email;
    if (status !== undefined) invitado.status = status;

    res.json({
      mensaje: 'Datos actualizados correctamente.',
      invitado
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el invitado.' });
  }
});



// DELETE /api/invitados/:id
router.delete('/:id', (req, res) => {
  try{
  const { id } = req.params;

  const index = invitados.findIndex((inv) => inv.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Invitado no encontrado.' });
  }

  const eliminado = invitados.splice(index, 1); // elimina 1 invitado

    res.json({
      mensaje: `El invitado con ID ${id} fue eliminado correctamente.`,
      eliminado: eliminado[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el invitado.' });
  }
});
