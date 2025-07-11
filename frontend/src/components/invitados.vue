<template>
  <div>
    <h2>Lista de Invitados</h2>
    <button @click="cargarInvitados" :disabled="cargando">
      {{ cargando ? 'Cargando...' : 'Cargar Invitados' }}
    </button>
    <ul v-if="invitados.length > 0">
      <li v-for="invitado in invitados" :key="invitado.id">
        {{ invitado.nombre }} - DNI: {{ invitado.dni }} - Estado: {{ invitado.status }}
      </li>
    </ul>
    <p v-else>No hay invitados cargados.</p>
    <p v-if="error" style="color:red;">Error: {{ error }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const invitados = ref([])
const cargando = ref(false)
const error = ref(null)

async function cargarInvitados() {
  cargando.value = true
  error.value = null
  try {
    const res = await fetch('http://localhost:3000/api/invitados')
    if (!res.ok) throw new Error('Error al cargar invitados')
    const data = await res.json()
    console.log('Datos recibidos:', data)  // <-- Agregado
    invitados.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}

</script>
