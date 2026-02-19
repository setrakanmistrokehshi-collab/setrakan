import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ← THIS DISABLES ROLLDOWN (forces stable Rollup)
  experimental: {
    enableRolldown: false,
  },

  // Extra safety for EmailJS
  optimizeDeps: {
    include: ['@emailjs/browser'],
  },
});