<template>
  <div class="bg-light">
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
            <li class="nav-item"><router-link to="/crear-evento" class="nav-link">Crear Evento</router-link></li>
            <li class="nav-item"><router-link to="/login" class="nav-link">Iniciar Sesión</router-link></li>
            <li class="nav-item"><router-link to="/mis-eventos" class="nav-link">Mis Eventos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <h2 class="text-center mb-4">Cargar Invitados</h2>

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
          <button type="submit" class="btn btn-dark fw-bold">
            {{ idEditando ? 'Actualizar Invitado' : 'Agregar Invitado' }}
          </button>
        </div>
      </form>

      <h4 class="mt-5 mb-3">
        Lista de invitados
        <span class="badge bg-secondary ms-2">{{ invitados.length }}</span>
      </h4>
      <ul class="list-group">
        <li
          v-for="inv in invitados"
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
              @click="enviarInvitacion(inv.id, $event.target)"
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const API = "http://localhost:3000/api/invitados";
    const eventoId = route.query.eventoId;

    const invitados = ref([]);
    const idEditando = ref(null);

    const form = ref({
      nombre: "",
      dni: "",
      email: "",
      status: "pendiente",
    });

    const cargarInvitados = async () => {
      try {
        const res = await fetch(`${API}?eventoId=${eventoId}`);
        const data = await res.json();
        invitados.value = data.map((inv) => ({ ...inv, enviado: false }));
      } catch (err) {
        console.error("Error al cargar invitados:", err);
      }
    };

    const guardarInvitado = async () => {
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
          res = await fetch(`${API}/${idEditando.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo),
          });
        } else {
          res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo),
          });
        }
        if (!res.ok) throw new Error("Error en la operación");
        resetForm();
        cargarInvitados();
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
        await fetch(`${API}/${id}`, { method: "DELETE" });
        cargarInvitados();
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    };

    const enviarInvitacion = async (id, boton) => {
      try {
        const res = await fetch(`${API}/${id}/enviar-invitacion`, { method: "POST" });
        if (!res.ok) throw new Error();
        // Marcar como enviado para cambiar estado y botón
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

    onMounted(() => {
      cargarInvitados();
    });

    return {
      invitados,
      form,
      idEditando,
      guardarInvitado,
      editarInvitado,
      eliminarInvitado,
      enviarInvitacion,
    };
  },
};
</script>
