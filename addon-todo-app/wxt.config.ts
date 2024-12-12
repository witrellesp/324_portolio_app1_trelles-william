import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  manifest: {
    name: "Todo App",
    version: "0.0.4",
    description: "Cet addon permet de gérer une liste de tâche à faire et de la partager.",
    permissions: ["identity"],
    host_permissions: [],
    browser_specific_settings: {
        gecko: {
            id: "{31901f6a-26c8-4605-92de-062f7c7f11e5}",
            strict_min_version: "109.0"
        }
    },
  },
});