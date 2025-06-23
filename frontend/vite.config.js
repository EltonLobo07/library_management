import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import frappeui from "frappe-ui/vite";
import path from "path";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    frappeui({
      frappeProxy: true,
      lucideIcons: true,
      jinjaBootData: true,
      buildConfig: {
        outDir: `../library_management/public/frontend`,
        emptyOutDir: true,
        indexHtmlPath: "../library_management/www/frontend/index.html",
      },
    }),
    vue(),
    vueJsx(),
    Components({
      resolvers: IconsResolver({
        prefix: false,
        enabledCollections: ["lucide"],
      }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
    },
  },
  optimizeDeps: {
    include: [
      "feather-icons",
      "showdown",
      "tailwind.config.js",
      "prosemirror-state",
      "prosemirror-view",
      "lowlight",
    ],
  },
});