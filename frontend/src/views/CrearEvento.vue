<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold text-center mb-6">Crear Evento</h2>
    <form @submit.prevent="crearEvento">
      <input v-model="evento.nombre" type="text" placeholder="Nombre del evento" required class="mb-3 w-full p-2 border rounded" />
      <input v-model="evento.fecha" type="date" required class="mb-3 w-full p-2 border rounded" />
      <input v-model="evento.ubicacion" type="text" placeholder="Ubicación" required class="mb-3 w-full p-2 border rounded" />
      <textarea v-model="evento.descripcion" placeholder="Descripción" class="mb-3 w-full p-2 border rounded"></textarea>
      <button type="submit" class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 w-full">Crear Evento</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const evento = reactive({ nombre: '', fecha: '', ubicacion: '', descripcion: '' })

const crearEvento = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento)
  })
  if (res.ok) {
    alert('Evento creado correctamente')
    // Limpiar form o redirigir
  } else {
    alert('Error al crear evento')
  }
}
</script>
