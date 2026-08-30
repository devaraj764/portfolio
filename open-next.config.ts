import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Every route is prerendered at build time and nothing revalidates, so the
  // prerendered payloads are served straight from the Workers asset store.
  // Swap in `r2IncrementalCache` if ISR or on-demand revalidation is added.
  incrementalCache: staticAssetsIncrementalCache,
});
