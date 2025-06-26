<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // ✅ This is important for SPA routing
  plugins: [react()],
  server: {
    port: 5005, // Local dev port
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
