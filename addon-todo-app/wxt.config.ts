import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome", // Cambia a 'firefox' si es necesario
  entrypointsDir: "./entrypoints/popup", // Define el directorio de entrypoints
  outDir: "./.output/firefox", // Define el directorio de salida para Firefox
  manifest: {
    name: "Todo App",
    version: "0.0.5",
    description: "Addon para manejar tareas pendientes",
    permissions: ["identity"],
    browser_specific_settings: {
      gecko: {
        id: "{addon-id}",
        strict_min_version: "109.0",
      },
    },
  },
  vite: {
    build: {
      rollupOptions: {
        input: "./entrypoints/popup/index.html", // Especifica el archivo principal
      },
    },
  },
});
