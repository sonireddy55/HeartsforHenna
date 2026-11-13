import { defineConfig } from "astro/config";

// Static build deployed to Cloudflare Pages.
// build.format "file" keeps the existing URLs (/gallery.html, /404.html).
export default defineConfig({
  site: "https://heartsforhenna.org",
  output: "static",
  build: { format: "file" },
  trailingSlash: "ignore",
});
