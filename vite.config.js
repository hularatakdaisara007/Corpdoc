import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Corpdoc/',
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: false
  }
});
