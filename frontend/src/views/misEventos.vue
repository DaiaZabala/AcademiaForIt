<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold text-center mb-6">Mis Eventos</h2>
    <ul>
      <li v-for="e in eventos" :key="e.id" class="mb-4 border p-3 rounded">
        <h3 class="font-semibold">{{ e.nombre }}</h3>
        <p>{{ new Date(e.fecha).toLocaleDateString() }} - {{ e.ubicacion }}</p>
        <p>{{ e.descripcion }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const eventos = ref([])

onMounted(async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/eventos') // fijate que la ruta coincida
  eventos.value = await res.json()
})
</script>
