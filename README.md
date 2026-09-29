# Mr Painting Houses LLC — website

Next.js 15 (App Router) site built from the "v4 — Fresh Coat" Figma design. 67 static pages, one API route for leads.

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in LEAD_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Deploy (Railway, Render, a VPS — any Node 20+ host)
- Build command: `npm run build` — Start command: `npm start` (listens on `$PORT`, default 3000)
- Vercel works with zero config.
- Environment variables:
  - `LEAD_WEBHOOK_URL` — **required for the forms**. Every estimate request is POSTed here as JSON (GoHighLevel inbound webhook, Zapier, Make…). Without it the forms show a "call us" error.
  - `NEXT_PUBLIC_SITE_URL` — e.g. `https://mrpaintinghousesaz.com` (sitemap + canonical URLs).
  - `NEXT_PUBLIC_LOCAL_MEDIA=1` — only after mirroring photos (below).

## Photos
All photos are the client's real project photos, currently served from the old site builder's CDN (resized to ~100 KB each).
**Before cancelling the old site builder**, run `npm run images:mirror` (downloads every photo into `public/media`), commit the files, set `NEXT_PUBLIC_LOCAL_MEDIA=1` and redeploy.

## Pages
| Route | Source |
|---|---|
| `/` | v4 homepage: roller-reveal hero + quick form, services, yard sign, process, gallery, Google reviews, Valley map, FAQ, full form |
| `/services`, `/services/[8 slugs]` | original service copy from the old site (`content/services.json`) |
| `/service-areas`, `/service-areas/[9 cities]` | 5 original cities + Goodyear, Paradise Valley, Fountain Hills, San Tan Valley |
| `/showcases` | 28 original project showcases, filterable |
| `/reviews` | 28 text reviews from the old site (Google + Facebook) |
| `/blog`, `/blog/[33 slugs]` | original posts, text unchanged (`content/blog/*.json`) |
| `/about`, `/faq`, `/contact`, `/thank-you`, `/privacy-policy` | new |

Old URLs are 301/308-redirected in `next.config.mjs`:
`/service-areas/single-area-served(-2..5)` → city pages, `/blog-<slug>` → `/blog/<slug>`, `/galleries/*` → `/showcases`.

## Editing content
- Business facts (phone, hours, license, cities, FAQ): `lib/site.ts`
- Services / reviews / showcases / blog: JSON in `content/`
- Design tokens (colors, type, spacing): top of `app/globals.css`

## Confirm with the client before launch
- Years in business: site uses **30** (intake form); old site said "20+".
- Hours: site uses intake-form hours (Mon–Fri 6–7, Sat 7–5, Sun 8–3). Google Business Profile says "closes 6 PM"; old footer had a "6:00am – 6:00am" bug.
- "Se habla español" is shown site-wide — confirm.
- Privacy policy is a starter template — have the client review it.
