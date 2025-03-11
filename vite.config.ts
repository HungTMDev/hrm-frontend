import { defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const ENV = loadEnv(mode, process.cwd());
  const port = ENV.VITE_PORT || 8080;
  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: +port,
    },
    preview: {
      port: +port,
    },
  };
});
