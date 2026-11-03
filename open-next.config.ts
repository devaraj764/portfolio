import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Content pages are prerendered and served from the Workers asset store.
  // The dynamic contact POST endpoint does not use the incremental cache.
  // Swap in `r2IncrementalCache` if ISR or on-demand revalidation is added.
  incrementalCache: staticAssetsIncrementalCache,
});
