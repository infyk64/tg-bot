import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // Автоматически создаст HTTPS сертификаты
  ],
  server: {
    host: true, // Доступ по IP
    port: 5173,
    https: true // Включаем HTTPS
  }
})