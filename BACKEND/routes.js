import express from 'express';

export const router = express.Router();

let tasks = [];
let nextId = 1;

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(tasks);
});


router.post('/', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio.' });
  }

  const newTask = {
    id: String(nextId++),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});
