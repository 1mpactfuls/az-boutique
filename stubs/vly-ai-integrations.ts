/**
 * Stand-in for the `@vly-ai/integrations` package during CI builds.
 *
 * The real package's Vite plugin wires up Freebuff preview-tooling internals
 * that only exist inside the Freebuff environment. On GitHub Actions we don't
 * need any of it — the app itself never calls the plugin at runtime — so this
 * stub keeps the import in vite.config.ci.ts resolving while contributing
 * nothing to the bundle. The real package is used unchanged in dev/preview.
 */
export default function vlyPlugin() {
  return {
    name: "vly-plugin-stub",
    // No transforms, no virtual modules — deliberately empty.
  };
}

export const vly = undefined;
