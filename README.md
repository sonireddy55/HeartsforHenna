# Hearts for Henna at UF

### 👉 [heartsforhenna.org](https://heartsforhenna.org)

Website for Hearts for Henna, a service-based student organization at the University of Florida.

Built with [Astro](https://astro.build) and deployed on Cloudflare Pages. Pages are rendered to static HTML at build time; a small amount of client JavaScript handles the menu, carousels, officer cards, and gallery viewer.

## Project structure

| Path | What it is |
|---|---|
| `src/pages/index.astro` | Home page: about, what is henna, impact, officers, events, gallery preview, contact |
| `src/pages/gallery.astro` | Full gallery page with a tap-to-enlarge viewer |
| `src/pages/404.astro` | Page shown for broken links |
| `src/layouts/Base.astro` | Shared `<head>`: SEO tags, social share tags, fonts |
| `src/components/` | `Photo`, `Marquee`, `OfficerCard`, `EventCard` |
| `src/data/site.js` | **All editable content**: officers and bios, fundraising total, charities, event sign-ups, gallery photos, links |
| `src/scripts/` | Client scripts: carousels, reveal-on-scroll, menu, officer flip cards, gallery viewer |
| `src/styles/global.css` | All styling |
| `public/` | `logo.png`, `og-image.png`, `robots.txt`, `sitemap.xml` (served as-is) |

## Running it locally

Requires Node 18 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Updating content

Edit `src/data/site.js`; both pages read from it.

- **Fundraising total:** change `fundraised.amount` and `fundraised.asOf`.
- **New sign-up:** add an entry to `openEvents` with `name`, `when`, `details`, and the `signup` link. Move it to `pastEvents` when it's over.
- **Gallery (biweekly):** put images in `public/images/` and add `{ src: "/images/your-photo.jpg", caption: "" }` to the **top** of `gallery`. The home page shows the first 3.
- **Officer photos and bios:** set `photo: "/images/name.jpg"` and replace the bracketed placeholder text in `bio`.

Any `src` or `photo` left as `null` shows a placeholder.

## Hosting (Cloudflare Pages)

Every push to `main` builds and deploys automatically.

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Custom domain: **heartsforhenna.org** (set in the Cloudflare Pages dashboard under Custom domains)
