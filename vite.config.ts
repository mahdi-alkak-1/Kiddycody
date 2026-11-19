import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: {
        academy: fileURLToPath(new URL("./index.html", import.meta.url)),
        aiVideo: fileURLToPath(new URL("./ai-video/index.html", import.meta.url)),
      },
    },
  },
});
