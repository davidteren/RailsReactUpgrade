import { defineConfig } from "vite";
import { resolve } from "path";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
  plugins: [RubyPlugin()],
  optimizeDeps: {},
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "app/assets"),
    },
  },
  build: {
    rollupOptions: {
      // Safely ignores MODULE_LEVEL_DIRECTIVE warnings https://github.com/TanStack/query/issues/5175#issuecomment-1499120399
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
