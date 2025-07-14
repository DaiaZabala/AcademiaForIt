import express from 'express';

export const router = express.Router();

let invitados = [];
let nextId = 1;

let evento = [];
let nextEventoId = 1;

// GET /api/invitados
router.get('/', (req, res) => {
  try {
    const { eventoId } = req.query;

    if (eventoId) {
      // Filtro por eventoId como string (por si viene como número)
      const invitadosFiltrados = invitados.filter(inv => String(inv.eventoId) === String(eventoId));
      return res.json(invitadosFiltrados);
    }

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
    if (
      !req.body.nombre ||
      req.body.nombre.trim() === '' ||
      !req.body.dni ||
      req.body.dni.trim() === ''
    ) {
      return res.status(400).json({ error: 'Debe ingresar nombre y DNI válidos.' });
    }

    const { nombre, dni, email, status, eventoId } = req.body;

    const nuevoInvitado = {
      id: String(nextId++),
      nombre: nombre.trim(),
      dni: dni.trim(),
      email: email || '',
      status: status || 'pendiente',
      eventoId: eventoId ? String(eventoId) : null, 
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
    const { nombre, dni, email, status, eventoId } = req.body;

    if (!nombre || nombre.trim() === '' || !dni || dni.trim() === '') {
      return res.status(400).json({ error: 'El nombre y el DNI son obligatorios.' });
    }

    const invitado = invitados.find(inv => inv.id === id);

    if (!invitado) {
      return res.status(404).json({ error: 'Invitado no encontrado.' });
    }

    invitado.nombre = nombre.trim();
    invitado.dni = dni.trim();
    if (email !== undefined) invitado.email = email;
    if (status !== undefined) invitado.status = status;
    if (eventoId !== undefined) invitado.eventoId = String(eventoId);

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
  try {
    const { id } = req.params;

    const index = invitados.findIndex(inv => inv.id === id);

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

// POST /api/invitados/:id/enviar-invitacion
router.post('/:id/enviar-invitacion', (req, res) => {
  try {
    const { id } = req.params;
    const invitado = invitados.find(inv => inv.id === id);

    if (!invitado) {
      return res.status(404).json({ error: 'Invitado no encontrado.' });
    }

    if (!invitado.email || invitado.email.trim() === '') {
      return res.status(400).json({ error: 'El invitado no tiene email para enviar la invitación.' });
    }

    // Simulación de envío de correo
    console.log(`🟢 Simulando envío de invitación a: ${invitado.email}`);

    // Aquí podrías integrar tu servicio de email real si quieres

    return res.json({ mensaje: 'Invitación enviada correctamente' });
  } catch (err) {
    console.error('Error al enviar invitación:', err);
    res.status(500).json({ error: 'Error al enviar la invitación.' });
  }
});