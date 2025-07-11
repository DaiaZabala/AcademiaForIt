<template>
  <div class="d-flex flex-column min-vh-100 bg-light">

    <!-- Header -->
    <header class="bg-white shadow-sm">
      <nav class="container d-flex justify-content-between align-items-center py-3" aria-label="Global">

        <!-- Logo -->
        <router-link to="/" class="d-flex align-items-center text-decoration-none">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
            height="32"
            class="me-2"
          />
          <span class="h5 mb-0 text-primary fw-semibold">EventosApp</span>
        </router-link>

        <!-- Menú hamburguesa -->
        <button
          class="btn d-lg-none"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Menú desktop    -->
        <div class="d-none d-lg-flex gap-3">
          <router-link
            to="/features"
            class="text-dark fw-semibold text-decoration-none"
            @mouseover="$event.target.classList.add('text-primary')"
            @mouseleave="$event.target.classList.remove('text-primary')"
          >
            Crear Evento
          </router-link>
          <router-link
            to="/marketplace"
            class="text-dark fw-semibold text-decoration-none"
            @mouseover="$event.target.classList.add('text-primary')"
            @mouseleave="$event.target.classList.remove('text-primary')"
          >
            Iniciar Sesión
          </router-link>
        </div>
      </nav>
   

      <!-- Menú mobile -->
      <div v-if="mobileMenuOpen" class="d-lg-none bg-white shadow-sm p-3">
        <router-link
          to="/features"
          class="d-block text-dark fw-semibold text-decoration-none mb-2"
          @click="mobileMenuOpen = false"
        >
          Crear Evento
        </router-link>
        <router-link
          to="/marketplace"
          class="d-block text-dark fw-semibold text-decoration-none"
          @click="mobileMenuOpen = false"
        >
          Iniciar Sesión
        </router-link>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 bg-white">
      <h1 class="display-4 text-primary text-center mb-5">
        ¡Bienvenido a la App de Eventos!
      </h1>

      <div class="d-flex flex-column flex-md-row gap-3">
        <button
          @click="goToCreateEvent"
          type="button"
          class="btn btn-primary px-4 py-2"
        >
          Crear Evento
        </button>

        <button
          @click="goToLogin"
          type="button"
          class="btn btn-outline-primary px-4 py-2"
        >
          Iniciar Sesión
        </button>
      </div>

    
    </main>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const mobileMenuOpen = ref(false);

function goToCreateEvent() {
  router.push("/crear-evento");
}

function goToLogin() {
  router.push("/login");
}
</script>
