import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5005, // Ensure your frontend runs on this port if necessary
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
