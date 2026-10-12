# Hearts for Henna UF

### 👉 [Open the live site](https://sonireddy55.github.io/HeartsforHenna/)

> The link works once GitHub Pages is turned on (see *Hosting on GitHub Pages* below).

Website for Hearts for Henna, a service-based student organization at the University of Florida.

Plain static site: no build step, no dependencies. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify, or Vercel.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page: about, what is henna, impact, officers, events, gallery preview, contact |
| `gallery.html` | Full gallery page with a tap-to-enlarge viewer |
| `data.js` | **All editable content**: officers and bios, fundraising total, charities, event sign-ups, gallery photos, links |
| `site.js` | Shared code: photo placeholders, auto-scrolling carousels, scroll-in animations |
| `styles.css` | All styling, with light and dark color themes |
| `logo.png` | Club logo |

## Updating content

Edit `data.js`; both pages read from it.

- **Fundraising total:** change `fundraised.amount` and `fundraised.asOf`.
- **New sign-up:** add an entry to `openEvents` with `name`, `when`, `details`, and the `signup` link. Move it to `pastEvents` when it's over.
- **Gallery (biweekly):** put images in an `images/` folder and add `{ src: "images/your-photo.jpg", caption: "" }` to the **top** of `gallery`. The home page shows the first 3.
- **Officer photos and bios:** set `photo: "images/name.jpg"` and replace the bracketed placeholder text in `bio`.

Any `src` or `photo` left as `null` shows a placeholder.

## Hosting on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
