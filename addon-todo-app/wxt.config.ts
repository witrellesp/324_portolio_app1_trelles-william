import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  entrypointsDir: "./entrypoints/popup",
  outDir: "./build/firefox",
  manifest: {
    name: "Todo App",
    version: "0.0.4",
    description:
      "Cet addon permet de gérer une liste de tâche à faire et de la partager.",
    permissions: ["identity"],
    host_permissions: [],
    browser_specific_settings: {
      gecko: {
        id: "{47176d92-f9c3-4cb8-ab6f-eef99bdbd667}",
        strict_min_version: "109.0",
      },
    },
  },
});
