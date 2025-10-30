import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/shelfie",
  plugins: [react(), svgr()],
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
