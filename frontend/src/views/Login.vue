<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="/img/android-chrome-512x512.png" alt="Logo" width="40" height="40" class="me-2" />
          <span class="fw-bold fs-4 text-black">EventDai</span>
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          @click="toggleMenu"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div :class="['collapse', 'navbar-collapse', 'justify-content-end', { 'show': isMenuOpen }]" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link to="/" class="nav-link">HOME</router-link></li>
            <li class="nav-item"><router-link to="/crear-evento" class="nav-link">Crear Evento</router-link></li>
            <li class="nav-item"><router-link to="/login" class="nav-link active">Iniciar Sesión</router-link></li>
            <li class="nav-item"><router-link to="/mis-eventos" class="nav-link">Mis Eventos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
        <h3 class="mb-4 text-center">Iniciar Sesión</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="nombreEvento" class="form-label">Nombre del Evento</label>
            <input
              v-model="nombreEvento"
              type="text"
              class="form-control"
              id="nombreEvento"
              placeholder="Ingrese el nombre del evento"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-dark w-100 fw-bold" :disabled="loading">
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nombreEvento = ref('');
const password = ref('');
const loading = ref(false);
const API_BASE = import.meta.env.VITE_BACKEND_URL;
const isMenuOpen = ref(false); // <-- Nuevo estado para el menú

// Nuevo método para abrir y cerrar el menú
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

async function handleSubmit() {
  if (!nombreEvento.value.trim() || !password.value.trim()) {
    alert('Por favor, ingrese el nombre del evento y la contraseña.');
    return;
  }

  loading.value = true;
  try {
    const res = await fetch(`${API_BASE}/api/eventos/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombreEvento: nombreEvento.value.trim(),
        password: password.value.trim()
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Error al iniciar sesión');
      return;
    }

    localStorage.setItem('eventoLogueado', JSON.stringify(data.evento));
    router.push({ name: 'AgregarInvitados', query: { eventoId: data.evento.id } });
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('Error de conexión con el servidor');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Estilos para el menú desplegable en móviles */
.navbar-collapse.show {
  /* Añade un fondo ligeramente gris para que resalte */
  background-color: #f8f9fa; 
  /* Agrega una sombra sutil */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  /* Opcional: añade un poco de padding para que se vea mejor */
  padding: 1rem; 
}
</style>