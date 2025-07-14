<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img src="/src/assets/img/android-chrome-512x512.png" alt="Logo" width="40" height="40" class="me-2" />
        </a>
        <div class="navbar-center position-absolute top-50 start-50 translate-middle">
          <span class="fw-bold fs-4 text-black">EventDai</span>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link to="/" class="nav-link active">HOME</router-link></li>
            <li class="nav-item"><router-link to="/crear-evento" class="nav-link">Crear Evento</router-link></li>
            <li class="nav-item"><router-link to="/login" class="nav-link">Iniciar Sesión</router-link></li>
            <li class="nav-item"><router-link to="/mis-eventos" class="nav-link">Ver mis eventos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="carrusel text-center">
        <h1>Gestor de invitados</h1>
        <h2 class="mt-3 mb-4">Administre sus listas y confirme la asistencia rápidamente</h2>
        <button class="btn btn-dark fw-bold px-4 py-2 shadow" @click="empezarGratis">
          Empezar Gratis
        </button>
      </div>
    </div>

    <section class="container my-5">
      <div class="text-center mb-5">
        <p>
          Independientemente del tipo de evento, necesitas una solución confiable y sencilla para manejar tus invitaciones en línea.
        </p>
        <p>
          Nuestra herramienta de gestión de invitados te ofrece todo lo que precisas para crear, enviar y administrar tus invitaciones fácilmente.
          Podrás agregar nuevos invitados, actualizar su información y eliminar a quienes no puedan asistir, manteniendo siempre tu lista de invitados al día.
        </p>
        <p>
          Se adapta a cualquier ocasión: eventos corporativos, lanzamientos, estrenos, cumpleaños, reuniones familiares, bodas y más.
        </p>
      </div>
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <img src="/src/assets/img/organizador-de-eventos.png" width="80" alt="Paso 1" />
          <h5 class="mt-3">1 - Cree un evento</h5>
          <p>Elija un modelo, personalice el tema y establezca la información práctica de su evento.</p>
        </div>
        <div class="col-md-4 mb-4">
          <img src="/src/assets/img/enviar-correo.png" width="80" alt="Paso 2" />
          <h5 class="mt-3">2 - Envíe sus invitaciones</h5>
          <p>Adapte el texto, importe sus contactos y cree todos los grupos de invitados que quiera.</p>
        </div>
        <div class="col-md-4 mb-4">
          <img src="/src/assets/img/asistencia.png" width="80" alt="Paso 3" />
          <h5 class="mt-3">3 - Siga la participación</h5>
          <p>Siga en tiempo real quién asistirá a su evento, avise a sus invitados y contacte con ellos fácilmente.</p>
        </div>
      </div>
    </section>

    <footer class="py-4" style="background: linear-gradient(90deg, #8e44ad, #9b59b6); color: white">
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
  methods: {
    empezarGratis() {
      // Por ejemplo, redirigir a crear evento o login
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.carrusel {
  text-align: center;
  margin-top: 30px;
}
</style>
