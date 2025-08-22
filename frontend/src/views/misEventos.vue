<template>
  <div class="bg-light">
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
            <li class="nav-item"><router-link to="/login" class="nav-link">Iniciar Sesión</router-link></li>
            <li class="nav-item"><router-link to="/mis-eventos" class="nav-link active">Mis Eventos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <h2 class="text-2xl font-bold text-center mb-6">Mis Eventos</h2>
      <ul class="list-group">
        <li v-if="eventos.length === 0" class="list-group-item text-center text-muted">
          Todavía no se cargaron eventos.
        </li>
        <li v-for="evento in eventos" :key="evento.id" class="list-group-item mb-3">
          <h3>{{ evento.nombre }}</h3>
          <router-link to="/login" class="btn btn-dark fw-bold mt-2">
            Iniciar sesión para agregar invitados
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MisEventos',
  data() {
    return {
      eventos: [],
      isMenuOpen: false, // <-- Nuevo estado para el menú
    };
  },
  methods: {
    // Nuevo método para abrir y cerrar el menú
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  async created() {
    try {
      const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173';
      const res = await fetch(`${apiBaseUrl}/api/eventos`);
      if (!res.ok) throw new Error('Error al cargar eventos');
      this.eventos = await res.json();
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      this.eventos = [];
    }
  },
};
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