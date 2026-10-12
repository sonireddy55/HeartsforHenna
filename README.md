# Hearts for Henna at UF

### 👉 [Open the live site](https://sonireddy55.github.io/HeartsforHenna/)

> Current link is GitHub Pages (works once Pages is turned on in repo **Settings → Pages**, `main` / root). The permanent address will be **https://heartsforhennaatuf.org** once the domain is registered and connected; see [Domain and hosting](#domain-and-hosting).

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
| `robots.txt`, `sitemap.xml` | Help search engines find and index the site |

## Updating content

Edit `data.js`; both pages read from it.

- **Fundraising total:** change `fundraised.amount` and `fundraised.asOf`.
- **New sign-up:** add an entry to `openEvents` with `name`, `when`, `details`, and the `signup` link. Move it to `pastEvents` when it's over.
- **Gallery (biweekly):** put images in an `images/` folder and add `{ src: "images/your-photo.jpg", caption: "" }` to the **top** of `gallery`. The home page shows the first 3.
- **Officer photos and bios:** set `photo: "images/name.jpg"` and replace the bracketed placeholder text in `bio`.

Any `src` or `photo` left as `null` shows a placeholder.

## Domain and hosting

Domain: `heartsforhennaatuf.org`. Host: Cloudflare Pages, which redeploys automatically on every push to `main` and gives each pull request its own preview link.

### 1. Register the domain (Cloudflare Registrar)

1. Sign in to Cloudflare with the **club account** (heartsforhennauf@gmail.com), not a personal one, so the domain stays with the club.
2. Go to **Domain Registration → Register Domains**, search `heartsforhennaatuf.org`, and buy it.
3. Turn on **auto-renew**.

### 2. Deploy the site (Cloudflare Pages)

1. In the dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub and pick the `HeartsforHenna` repo.
3. Build settings: framework preset **None**, build command **empty**, output directory **`/`**. Save and deploy.
4. The site goes live at a `*.pages.dev` address within a minute.

### 3. Connect the domain

1. In the Pages project, open **Custom domains → Set up a custom domain**.
2. Enter `heartsforhennaatuf.org` and confirm. Since the domain is already on Cloudflare, DNS and HTTPS are set up automatically.
3. Optionally add `www.heartsforhennaatuf.org` too, and set it to redirect to the main domain.
4. Update the live-site link at the top of this README to the new domain, and turn off GitHub Pages (**Settings → Pages**) so there's only one copy of the site online.

### Ownership and renewal

| | |
|---|---|
| Domain owner account | heartsforhennauf@gmail.com |
| Registrar | Cloudflare |
| Renews | _fill in after purchase_ |
| Approximate renewal cost | ~$11/year for .org at Cloudflare (check the dashboard for the current price) |

**Board handoff:** when the technical director changes, transfer access to the Cloudflare and GitHub accounts and update this table.
