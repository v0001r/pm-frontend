// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Render (and most Node hosts) need the node-server preset — the Lovable default
  // targets Cloudflare and the Nitro bundle step is very memory-heavy without tuning.
  nitro: {
    preset: "node-server",
  },
  vite: {
    build: {
      sourcemap: false,
      // Fewer parallel file ops lowers peak memory during Rollup/Nitro on small CI boxes.
      reportCompressedSize: false,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
