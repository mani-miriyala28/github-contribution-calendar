import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    dts({
      include: ["src"],
      // Ensure the plugin uses the app tsconfig (which only includes `src`) so
      // unrelated root JS config files aren't picked up.
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
      // Also explicitly exclude ESLint config by absolute path and glob as a fallback.
      exclude: [resolve(__dirname, "eslint.config.js"), "**/eslint.config.js"],
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactGitHubContributionCalendar",
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
      },
    },
    sourcemap: true,
    minify: false,
  },
});
