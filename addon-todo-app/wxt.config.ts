import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  entrypointsDir: "./entrypoints/popup", // Define dónde están los entrypoints
  outDir: "./.output/firefox", // Define el directorio de salida
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
});
