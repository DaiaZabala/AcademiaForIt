<template>
  <div class="bg-light min-h-screen">
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
            <li class="nav-item"><router-link to="/mis-eventos" class="nav-link">Mis Eventos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <h2 class="text-center mb-4">Cargar Invitados</h2>

      <div v-if="invitadosMax !== null" class="alert alert-info text-center">
        Límite de invitados para este evento: <strong>{{ invitadosMax }}</strong>
        <span v-if="invitados.length >= invitadosMax" class="ms-2 badge bg-danger">¡Límite alcanzado!</span>
        <span v-else class="ms-2 badge bg-success">{{ invitadosMax - invitados.length }} restantes</span>
      </div>

      <form @submit.prevent="guardarInvitado" class="border p-4 rounded bg-white shadow-sm">
        <div class="row g-3">
          <div class="col-md-4">
            <input v-model="form.nombre" type="text" class="form-control" placeholder="Nombre completo" required />
          </div>
          <div class="col-md-3">
            <input v-model="form.dni" type="text" class="form-control" placeholder="DNI" required />
          </div>
          <div class="col-md-3">
            <input v-model="form.email" type="email" class="form-control" placeholder="Correo (opcional)" />
          </div>
          <div class="col-md-2">
            <select v-model="form.status" class="form-select">
              <option value="pendiente">Pendiente</option>
              <option value="confirmado">Confirmado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
        </div>
        <br />
        <div class="d-grid">
          <button
            type="submit"
            class="btn btn-dark fw-bold"
            :disabled="!idEditando && invitadosMax !== null && invitados.length >= invitadosMax"
          >
            {{ idEditando ? 'Actualizar Invitado' : 'Agregar Invitado' }}
          </button>
        </div>
        <div v-if="!idEditando && invitadosMax !== null && invitados.length >= invitadosMax" class="alert alert-warning mt-3 text-center">
          No puedes agregar más invitados. Has alcanzado el límite de {{ invitadosMax }}.
        </div>
      </form>

      <h4 class="mt-5 mb-3">
        Lista de invitados
        <span class="badge bg-secondary ms-2">{{ invitadosFiltrados.length }}</span>
      </h4>

      <div class="btn-group mb-3" role="group">
        <button class="btn btn-outline-dark" @click="filtro = 'todos'">Todos</button>
        <button class="btn btn-outline-success" @click="filtro = 'confirmado'">Confirmados</button>
        <button class="btn btn-outline-warning" @click="filtro = 'pendiente'">Pendientes</button>
        <button class="btn btn-outline-danger" @click="filtro = 'rechazado'">Rechazados</button>
      </div>

      <ul class="list-group">
        <li
          v-for="inv in invitadosFiltrados"
          :key="inv.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{{ inv.nombre }}</strong> ({{ inv.dni }}) - {{ inv.status }}
            <br v-if="inv.email" />
            <small v-if="inv.email">{{ inv.email }}</small>
          </div>
          <div class="d-flex gap-2">
            <button @click="editarInvitado(inv)" class="btn btn-sm btn-primary">Editar</button>
            <button @click="eliminarInvitado(inv.id)" class="btn btn-sm btn-danger">Eliminar</button>
            <button
              v-if="inv.email"
              @click="enviarInvitacion(inv.id)"
              :disabled="inv.enviado"
              :class="['btn btn-sm', inv.enviado ? 'btn-secondary' : 'btn-success']"
            >
              {{ inv.enviado ? 'Invitación enviada' : 'Enviar invitación' }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const API_BASE = import.meta.env.VITE_BACKEND_URL || '';
    const route = useRoute();
    const eventoId = route.query.eventoId;

    const API_INVITADOS = `${API_BASE}/api/invitados`;
    const API_EVENTOS = `${API_BASE}/api/eventos`;

    const invitados = ref([]);
    const invitadosMax = ref(null);
    const idEditando = ref(null);
    const filtro = ref("todos");
    const isMenuOpen = ref(false); // <-- Nuevo estado para el menú

    const form = ref({
      nombre: "",
      dni: "",
      email: "",
      status: "pendiente",
    });

    // Nuevo método para abrir y cerrar el menú
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const cargarDatosEvento = async () => {
      try {
        const res = await fetch(`${API_EVENTOS}/${eventoId}`);
        if (!res.ok) throw new Error("Error al obtener datos del evento");
        const data = await res.json();
        invitadosMax.value = data.invitadosMax;
      } catch (err) {
        console.error("Error al cargar datos del evento:", err);
      }
    };

    const cargarInvitados = async () => {
      try {
        const res = await fetch(`${API_INVITADOS}?eventoId=${eventoId}`);
        if (!res.ok) throw new Error("Error al obtener invitados");
        const data = await res.json();
        invitados.value = data.map((inv) => ({ ...inv, enviado: false }));
      } catch (err) {
        console.error("Error al cargar invitados:", err);
      }
    };

    const guardarInvitado = async () => {
      // Nueva validación: si el formulario no está en modo edición y se ha alcanzado el límite,
      // se detiene la ejecución.
      if (!idEditando.value && invitadosMax.value !== null && invitados.value.length >= invitadosMax.value) {
        // En lugar de una alerta, ahora tenemos un mensaje de advertencia en el template,
        // pero podemos mantener esta alerta para una retroalimentación adicional.
        console.warn('Límite de invitados alcanzado, no se puede agregar más.');
        return;
      }

      const nuevo = {
        nombre: form.value.nombre.trim(),
        dni: form.value.dni.trim(),
        email: form.value.email.trim(),
        status: form.value.status,
        eventoId,
      };

      try {
        let res;
        if (idEditando.value) {
          res = await fetch(`${API_INVITADOS}/${idEditando.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo),
          });
        } else {
          res = await fetch(API_INVITADOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo),
          });
        }
        if (!res.ok) throw new Error("Error en la operación");
        resetForm();
        // Recargamos los invitados después de guardar para actualizar el conteo.
        await cargarInvitados();
      } catch (err) {
        alert("Hubo un error al guardar el invitado.");
        console.error(err);
      }
    };

    const editarInvitado = (inv) => {
      form.value = {
        nombre: inv.nombre,
        dni: inv.dni,
        email: inv.email,
        status: inv.status,
      };
      idEditando.value = inv.id;
    };

    const eliminarInvitado = async (id) => {
      try {
        const res = await fetch(`${API_INVITADOS}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar");
        await cargarInvitados();
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    };

    const enviarInvitacion = async (id) => {
      try {
        const res = await fetch(`${API_INVITADOS}/${id}/enviar-invitacion`, { method: "POST" });
        if (!res.ok) throw new Error();
        const inv = invitados.value.find((i) => i.id === id);
        if (inv) inv.enviado = true;
      } catch {
        alert("No se pudo enviar la invitación");
      }
    };

    const resetForm = () => {
      form.value = {
        nombre: "",
        dni: "",
        email: "",
        status: "pendiente",
      };
      idEditando.value = null;
    };

    const invitadosFiltrados = computed(() => {
      if (filtro.value === "todos") return invitados.value;
      return invitados.value.filter((inv) => inv.status === filtro.value);
    });

    onMounted(() => {
      cargarInvitados();
      cargarDatosEvento();
    });

    return {
      invitados,
      invitadosMax,
      invitadosFiltrados,
      form,
      idEditando,
      filtro,
      guardarInvitado,
      editarInvitado,
      eliminarInvitado,
      enviarInvitacion,
      toggleMenu, // <-- Exportamos el método
      isMenuOpen, // <-- Exportamos el estado
    };
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