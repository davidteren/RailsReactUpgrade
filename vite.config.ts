import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
  plugins: [RubyPlugin()],
  optimizeDeps: {
    include: ["import.meta.glob"],
  },
});
