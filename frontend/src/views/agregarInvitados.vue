<template>
  <div class="bg-light">
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
          <button type="submit" class="btn btn-dark fw-bold" :disabled="!idEditando && invitados.length >= invitadosMax">
            {{ idEditando ? 'Actualizar Invitado' : 'Agregar Invitado' }}
          </button>
        </div>
        
        <div v-if="invitadosMax !== null && !idEditando && invitados.length >= invitadosMax" class="alert alert-warning mt-3 text-center">
          No puedes agregar más invitados. Has alcanzado el límite de {{ invitadosMax }}.
        </div>
      </form>

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
    const invitadosMax = ref(null); // Valor inicial null
    const idEditando = ref(null);
    const filtro = ref("todos");

    const form = ref({
      nombre: "",
      dni: "",
      email: "",
      status: "pendiente",
    });

    // Carga los datos del evento, incluido el límite de invitados
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
      // La validación se mantiene igual, pero ahora invitadosMax tendrá un valor
      if (!idEditando.value && invitados.value.length >= invitadosMax.value) {
        alert('Has alcanzado el límite máximo de invitados para este evento.');
        return;
      }
      
      // ... (el resto de la función guardarInvitado) ...
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
    };
  },
};
</script>