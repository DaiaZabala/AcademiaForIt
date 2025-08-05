<template>
  <div>
    <!-- Tu navbar y contenido igual -->

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

    <!-- Resto igual -->
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
        // Suponiendo que tienes una ruta /healthcheck que devuelve 200 OK si el backend está bien
        
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
