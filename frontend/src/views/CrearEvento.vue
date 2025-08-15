<template>
  <div class="bg-light py-4">
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

    <div class="container my-5">
      <h1 class="text-center text-dark mb-4">Crear un Nuevo Evento</h1>

      <form @submit.prevent="crearEvento" class="bg-white p-4 rounded shadow-sm mx-auto" style="max-width: 700px;">
        <div class="mb-3">
          <label class="form-label fw-semibold" for="nombre">Nombre del evento</label>
          <input v-model="evento.nombre" id="nombre" type="text" class="form-control" required />
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label fw-semibold" for="fecha">Fecha</label>
            <input v-model="evento.fecha" id="fecha" type="date" class="form-control" required />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label fw-semibold" for="ubicacion">Ubicación</label>
            <input v-model="evento.ubicacion" id="ubicacion" type="text" class="form-control" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold" for="descripcion">Descripción</label>
          <textarea v-model="evento.descripcion" id="descripcion" rows="3" class="form-control"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold" for="contraseña">Contraseña del evento</label>
          <input v-model="evento.contraseña" id="contraseña" type="password" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold" for="invitadosMax">Máximo de invitados</label>
          <input v-model="evento.invitadosMax" id="invitadosMax" type="number" class="form-control" />
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-dark fw-bold">Guardar Evento</button>
        </div>
      </form>
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
  name: 'CrearEvento',
  data() {
    return {
      evento: {
        nombre: '',
        fecha: '',
        ubicacion: '',
        descripcion: '',
        contraseña: '', 
        invitadosMax: null, 
      },
    };
  },
  methods: {
    async crearEvento() {
      const API_BASE = import.meta.env.VITE_BACKEND_URL || '';
        console.log("Usando API_BASE:", API_BASE);
      try {
        const res = await fetch(`${API_BASE}/api/eventos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.evento),
        });

        if (!res.ok) throw new Error('Error al crear el evento');

        alert('Evento creado correctamente');
        // Limpiar formulario
        this.evento = { nombre: '', fecha: '', ubicacion: '', descripcion: '', contraseña: '', invitadosMax: null }; // Se limpian los nuevos campos
      } catch (error) {
        alert(error.message || 'Error al crear el evento');
      }
    },
  },
};
</script>