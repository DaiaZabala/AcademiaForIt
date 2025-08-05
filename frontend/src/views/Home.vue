<template>
  <div class="bg-light py-4">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="/src/assets/img/android-chrome-512x512.png" alt="Logo" width="40" height="40" class="me-2" />
        </router-link>
        <div class="navbar-center position-absolute top-50 start-50 translate-middle">
          <span class="fw-bold fs-4 text-black">EventDai</span>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link to="/" class="nav-link">HOME</router-link></li>
            <li class="nav-item"><router-link to="/crear-evento" class="nav-link active">Crear Evento</router-link></li>
            <li class="nav-item"><router-link to="/login" class="nav-link">Iniciar Sesión</router-link></li>
            <li class="nav-item"><router-link to="/mis-eventos" class="nav-link">Mis Eventos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="carrusel text-center">
        <h1>Gestor de invitados</h1>
        <h2 class="mt-3 mb-4">Administre sus listas y confirme la asistencia rápidamente</h2>
        <button 
          class="btn btn-dark fw-bold px-4 py-2 shadow" 
          @click="empezarGratis"
          :disabled="loading"
        >
          {{ loading ? 'Comprobando conexión...' : 'Empezar Gratis' }}
        </button>
        <p v-if="errorMsg" class="text-danger mt-3">{{ errorMsg }}</p>
      </div>
    </div>
    <footer class="py-4 mt-5" style="background: linear-gradient(90deg, #8e44ad, #9b59b6); color: white;">
      <div class="container">
        <div class="row text-center text-md-start">
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="mb-1">Daiana Antonella Zabala</h5>
            <p class="mb-0">© 2025 EventDai. Todos los derechos reservados.</p>
          </div>
          <div class="col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <div class="mb-2">
              <a class="text-white me-3 text-decoration-none">Política de privacidad</a>
              <a class="text-white text-decoration-none">Términos de uso</a>
            </div>
            <div>
              <a href="https://github.com/DaiaZabala" target="_blank" class="text-white me-3 text-decoration-none">
                <i class="bi bi-github me-1">GitHub</i>
              </a>
              <a href="https://www.linkedin.com/in/daiana-antonella-zabala" target="_blank" class="text-white text-decoration-none">
                <i class="bi bi-linkedin me-1">LinkedIn</i>
              </a>
            </div>
          </div>
          <div class="col-md-4 text-md-end">
            <p class="mb-0">
              Contacto:<br />
              <a href="mailto:daiana.azabala@email.com" class="text-white text-decoration-underline">daiana.azabala@email.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      errorMsg: '',
    };
  },
  methods: {
    async empezarGratis() {
      this.errorMsg = '';
      this.loading = true;
      try {
        // Intentamos hacer una petición simple al backend para validar que está OK
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/healthcheck`); 
        
        if (!response.ok) {
          throw new Error('Error en la conexión con el backend');
        }
        // Si todo bien, redirigimos
        this.$router.push('/crear-evento');
      } catch (error) {
        this.errorMsg = 'No se pudo conectar con la base de datos. Por favor, intente más tarde.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.carrusel {
  text-align: center;
  margin-top: 30px;
}
.text-danger {
  color: red;
}
</style>