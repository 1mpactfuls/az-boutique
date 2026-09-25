/**
 * CI-only Vite config for the GitHub Pages deployment.
 *
 * Difference from vite.config.ts: the `vlyPlugin()` from @vly-ai/integrations
 * is replaced with a local stub. The real plugin is tied to the Freebuff
 * preview environment, and keeping it out of CI makes the Pages build
 * hermetic and fast. Everything else — React, Tailwind, chunking — is
 * identical to the dev config.
 *
 * Used by .github/workflows/deploy.yml via `vite build --config vite.config.ci.ts`.
 */
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local no-op stand-in for @vly-ai/integrations (see file for details).
import vlyPlugin from "./stubs/vly-ai-integrations";

export default defineConfig({
  plugins: [react(), vlyPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force a single copy of React across all packages.
    dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router"],
          convex: ["convex"],
          radix: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
          ],
          "framer-motion": ["framer-motion"],
          charts: ["recharts"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 1000,
    target: "esnext",
    minify: "esbuild",
  },
});
