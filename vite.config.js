// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/React-Task-Management/', // MUST match GitHub repo name
  plugins: [react()],
});
