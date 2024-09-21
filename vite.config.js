import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
// Carregar as variáveis de ambiente
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    // eslint-disable-next-line no-undef
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_PUBLIC_TEST_KEY),
  },
  server: {
    proxy: {
      '/create-checkout-session': 'http://localhost:5000', // Apontando para o backend rodando na porta 5000
    },
  }
})
