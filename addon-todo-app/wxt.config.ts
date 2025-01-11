import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  entrypointsDir: "./entrypoints/popup",
  outDir: "./.output/firefox",
  manifest: {
    name: "Todo App",
    version: "0.0.5",
    description:
      "Cet addon permet de gérer une liste de tâche à faire et de la partager.",
    permissions: ["identity"],
    host_permissions: [],
    browser_specific_settings: {
      gecko: {
        id:  process.env.FIREFOX_ADDON_ID,
        strict_min_version: "109.0",
      },
    },
  },
});
