/**
 * Programmatic production build for GitHub Pages.
 *
 * Builds the site with the /az-boutique/ Pages base path into dist/.
 * Equivalent to `vite build --config vite.config.ci.ts --base=/az-boutique/`,
 * but as a script so it runs anywhere without extra flags.
 *
 * Usage:
 *   VITE_CONVEX_URL=https://<your-deployment>.convex.cloud node build-dist.mjs
 *   cp dist/index.html dist/404.html   # SPA fallback for deep links
 *
 * Then copy dist/ into docs/ and push — GitHub Pages redeploys automatically.
 */
import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

await build({
  configFile: false,
  root,
  base: "/az-boutique/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(root, "./src") },
    dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "esnext",
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router"],
          convex: ["convex"],
          "framer-motion": ["framer-motion"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  logLevel: "info",
});

console.log("BUILD DONE — now: cp dist/index.html dist/404.html, then sync dist/ -> docs/");
