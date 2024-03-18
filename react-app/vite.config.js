/* eslint-disable no-undef */
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});