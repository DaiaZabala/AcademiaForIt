import { defineConfig } from 'vite' 
import vue from '@vitejs/plugin-vue' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Aquí se agrega el proxy para las peticiones de la API
  server: {
    // Para resolver el problema de CORS, creamos un proxy
    proxy: {
      // Cualquier petición que comience con '/api' será redirigida
      '/api': {
        // El destino de la petición, que es la URL de tu API
        target: 'https://academiaforit1.onrender.com', 
        // Es importante para que el origen de la petición parezca venir del servidor de destino
        changeOrigin: true,
        // Re-escribe la ruta para eliminar el prefijo '/api' antes de enviarla
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
