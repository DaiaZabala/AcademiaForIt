<template>
  <div class="bg-light d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="/img/android-chrome-512x512.png" alt="Logo" width="40" height="40" class="me-2" />
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

    <main class="flex-grow-1 container mt-4">
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

      <hr class="my-5" />

      <section class="container my-5">
        <h2 class="text-center mb-5 display-6 fw-bold">Descubre las funciones que necesitas para gestionar tus invitaciones con éxito</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 p-3 shadow-sm border-0">
              <div class="card-body text-center">
                <img src="/img/exam_9528410.png" alt="Crear un evento" width="60" height="60" />
                <h3 class="card-title mt-4">Crear un evento</h3>
                <p class="card-text text-muted">Elige una plantilla, personaliza tu tema y define la información práctica de tu evento.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 p-3 shadow-sm border-0">
              <div class="card-body text-center">
                <img src="/img/email_17254724.png" alt="Enviar invitaciones" width="60" height="60" />
                <h3 class="card-title mt-4">Envíe sus invitaciones</h3>
                <p class="card-text text-muted">Adapta el texto, importa tus contactos y crea tantos grupos de invitados como quieras.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 p-3 shadow-sm border-0">
              <div class="card-body text-center">
                <img src="/img/consensus_5431538.png" alt="Siga la participación" width="60" height="60" />
                <h3 class="card-title mt-4">Siga la participación</h3>
                <p class="card-text text-muted">Consulta en tiempo real quién asistirá a tu evento, haz un seguimiento de tus invitados y ponte en contacto con ellos fácilmente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

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
// Elimina todas las importaciones de imágenes, ya no son necesarias.
// Tu componente se verá más limpio.
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
        const backendUrl = import.meta.env.VITE_BACKEND_URL.endsWith('/')
          ? import.meta.env.VITE_BACKEND_URL.slice(0, -1)
          : import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${backendUrl}/healthcheck`);

        if (!response.ok) {
          throw new Error('Error en la conexión con el backend');
        }
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