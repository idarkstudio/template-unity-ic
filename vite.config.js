import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import { defineConfig } from "vite";
import dotenv from "dotenv";
import environment from "vite-plugin-environment";
/// <reference types="vitest" />
import react from "@vitejs/plugin-react";

dotenv.config();

export default defineConfig({
  root: "./src/frontend/src/",
  build: {
    outDir: "../../../dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
    plugins: [GlobalPolyFill({ process: true, buffer: true })],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment({ BACKEND_CANISTER_ID: "" }),
  ],
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
  //   test: {
  //     environment: "jsdom",
  //     setupFiles: "setupTests.ts",
  //     cache: { dir: "../node_modules/.vitest" },
  //   },
});
