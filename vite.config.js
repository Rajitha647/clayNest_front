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
