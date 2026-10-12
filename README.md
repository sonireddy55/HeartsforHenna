# Hearts for Henna at UF

### 👉 [Open the live site](https://sonireddy55.github.io/HeartsforHenna/)

> Hosted free on GitHub Pages. The link works once Pages is turned on; see [Hosting](#hosting).

Website for Hearts for Henna, a service-based student organization at the University of Florida.

Plain static site: no build step, no dependencies. Open `index.html` in a browser to preview it locally.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page: about, what is henna, impact, officers, events, gallery preview, contact |
| `gallery.html` | Full gallery page with a tap-to-enlarge viewer |
| `data.js` | **All editable content**: officers and bios, fundraising total, charities, event sign-ups, gallery photos, links |
| `site.js` | Shared code: photo placeholders, auto-scrolling carousels, scroll-in animations |
| `styles.css` | All styling |
| `logo.png` | Club logo |
| `og-image.png` | Preview image shown when the link is shared (iMessage, Instagram, GroupMe, LinkedIn) |
| `404.html` | Page shown for broken links |
| `sitemap.xml` | Lists the pages for search engines (submit it in Google Search Console) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is, with no processing |

## Updating content

Edit `data.js`; both pages read from it.

- **Fundraising total:** change `fundraised.amount` and `fundraised.asOf`.
- **New sign-up:** add an entry to `openEvents` with `name`, `when`, `details`, and the `signup` link. Move it to `pastEvents` when it's over.
- **Gallery (biweekly):** put images in an `images/` folder and add `{ src: "images/your-photo.jpg", caption: "" }` to the **top** of `gallery`. The home page shows the first 3.
- **Officer photos and bios:** set `photo: "images/name.jpg"` and replace the bracketed placeholder text in `bio`.

Any `src` or `photo` left as `null` shows a placeholder.

## Hosting

Hosted free on **GitHub Pages** at https://sonireddy55.github.io/HeartsforHenna/

### Turn it on (one time)

1. In this repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Pick branch **`main`** and folder **`/ (root)`**, then **Save**.
4. After about a minute, the site is live at the link above. Every push to `main` updates it automatically.

### Get it on Google (one time, after Pages is on)

1. Go to [Google Search Console](https://search.google.com/search-console) and sign in with the club Gmail.
2. **Add property → URL prefix** → `https://sonireddy55.github.io/HeartsforHenna/`.
3. Choose the **HTML file** verification method and download the file Google gives you (named like `google1234abcd.html`).
4. Add that file to the root of this repo and push. Wait a minute for Pages to update, then click **Verify**.
5. Go to **Sitemaps**, enter `sitemap.xml`, and submit.
6. Go to **URL inspection**, paste the home page URL, and click **Request indexing**.

Google usually indexes a new site within a few days to a couple of weeks. To help it rank for "Hearts for Henna", put the site link in the Instagram bio and on the Linktree.

### Moving to a custom domain later (optional)

If the club buys a domain later (for example `heartsforhennaatuf.org`, about $9 the first year and $11/year after at Cloudflare):

1. Register it under the **club account** (heartsforhennauf@gmail.com) and turn on auto-renew.
2. In **Settings → Pages → Custom domain**, enter the domain and follow GitHub's DNS instructions, then check **Enforce HTTPS**.
3. Find and replace `https://sonireddy55.github.io/HeartsforHenna` with the new domain in `index.html`, `gallery.html`, and `sitemap.xml`, and change `/HeartsforHenna/` to `/` in `404.html`.

**Board handoff:** when the technical director changes, give the next one access to this GitHub repo (and the domain account, if one exists).
