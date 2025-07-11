import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CrearEvento from '../views/CrearEvento.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/crear-evento', component: CrearEvento },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
