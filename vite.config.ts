import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/saudi-luxury-furniture-Palenro/",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
