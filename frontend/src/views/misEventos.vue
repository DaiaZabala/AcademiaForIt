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
          <div class="d-flex gap-2 mt-2">
            <router-link to="/login" class="btn btn-dark fw-bold">
              Iniciar sesión para agregar invitados
            </router-link>
            <button class="btn btn-danger fw-bold" @click="eliminarEvento(evento.id)">
              Eliminar
            </button>
          </div>
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
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async eliminarEvento(id) {
      // Paso 1: Confirmación de eliminación
      if (!confirm("¿Seguro que deseas eliminar este evento?")) return;

      // Paso 2: Pedir contraseña del evento
      const password = prompt("Ingresá la contraseña del evento para eliminarlo:");
      if (!password) return alert("Debés ingresar la contraseña.");

      try {
        const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173';
        const res = await fetch(`${apiBaseUrl}/api/eventos/${id}`, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }) // enviamos la contraseña al backend
        });

        const data = await res.json();

        // Validación de respuesta
        if (!res.ok) throw new Error(data.error || "Error al eliminar evento");

        // Filtramos la lista para que desaparezca del frontend
        this.eventos = this.eventos.filter(evento => evento.id !== id);

        alert(data.mensaje); // mostramos mensaje de éxito
      } catch (error) {
        console.error("Error al eliminar evento:", error);
        alert(error.message || "No se pudo eliminar el evento");
      }
    }
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
.navbar-collapse.show {
  background-color: #f8f9fa; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  padding: 1rem; 
}
</style>
