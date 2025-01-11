import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  entrypointsDir: "./entrypoints/popup",
  outDir: "./.output/firefox",
  manifest: {
    name: "Todo App",
    version: process.env.VERSION || "0.0.6",
    description:
      "Cet addon permet de gérer une liste de tâche à faire et de la partager.",
    permissions: ["identity"],
    host_permissions: [],
    browser_specific_settings: {
      gecko: {
        id:  process.env.FIREFOX_ADDON_ID || "default@email.com",
        strict_min_version: "109.0",
      },
    },
  },
});
