# Hearts for Henna at UF

### 👉 [heartsforhenna.org](https://heartsforhenna.org)

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
| `robots.txt`, `sitemap.xml` | Tell search engines what to index (submit the sitemap in Google Search Console) |
| `CNAME` | Tells GitHub Pages to serve the site at heartsforhenna.org (created by GitHub when the domain is saved in settings; don't delete it) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is, with no processing |

## Updating content

Edit `data.js`; both pages read from it.

- **Fundraising total:** change `fundraised.amount` and `fundraised.asOf`.
- **New sign-up:** add an entry to `openEvents` with `name`, `when`, `details`, and the `signup` link. Move it to `pastEvents` when it's over.
- **Gallery (biweekly):** put images in an `images/` folder and add `{ src: "images/your-photo.jpg", caption: "" }` to the **top** of `gallery`. The home page shows the first 3.
- **Officer photos and bios:** set `photo: "images/name.jpg"` and replace the bracketed placeholder text in `bio`.

Any `src` or `photo` left as `null` shows a placeholder.

## Hosting

Hosted on **GitHub Pages** (free) at the custom domain **heartsforhenna.org**. Every push to `main` updates the site automatically.

### Domain setup (one time)

Do these in order. GitHub requires the domain to be saved in Pages settings **before** the DNS records are added, so no one else can claim it.

1. **Buy `heartsforhenna.org`** signed in with the club account (heartsforhennauf@gmail.com). Turn on auto-renew.
2. **Turn on Pages:** repo **Settings → Pages** → Source **Deploy from a branch** → branch **`main`**, folder **`/ (root)`** → **Save**.
3. **Save the domain:** on the same page, under **Custom domain**, enter `heartsforhenna.org` → **Save**. GitHub commits a `CNAME` file to `main`.
4. **Add DNS records** at the registrar. Delete any default parking records first, then add:

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `sonireddy55.github.io` |

5. **Wait for the green check** next to the domain in Pages settings (minutes to 24 hours), then check **Enforce HTTPS**.
6. **Recommended:** verify the domain at **GitHub → your profile Settings → Pages → Add a domain**. This protects it from takeover if Pages is ever turned off.

Source: [GitHub Docs: Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

### Get it on Google (one time, after the domain works)

1. Go to [Google Search Console](https://search.google.com/search-console) and sign in with the club Gmail.
2. **Add property → Domain** → `heartsforhenna.org`. Google gives you a **TXT** record; add it at the registrar (Host `@`), then click **Verify**.
3. Go to **Sitemaps**, enter `sitemap.xml`, and submit.
4. Go to **URL inspection**, paste `https://heartsforhenna.org/`, and click **Request indexing**.

Google usually indexes a new site within a few days to a couple of weeks. To help it rank for "Hearts for Henna", put the site link in the Instagram bio and on the Linktree.

### Ownership and renewal

| | |
|---|---|
| Domain | heartsforhenna.org |
| Owner account | heartsforhennauf@gmail.com |
| Registrar | _fill in after purchase_ |
| Renews | _fill in after purchase_ |

**Board handoff:** when the technical director changes, give the next one access to this GitHub repo and the registrar account, and update this table.
