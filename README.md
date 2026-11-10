# Jibby Foods website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where to update business information

| What | File |
|---|---|
| Phone, WhatsApp, email, address, opening hours, social links, legal name | `src/config/site.ts` |
| Products (names, descriptions, sizes, ingredients, NAFDAC no., storage, preparation) | `src/content/products.ts` |
| Recipe / blog article list | `src/content/articles.ts` |
| Live domain, Google Analytics, Search Console, email delivery | `.env.local` (copy from `.env.example`) |

Any value set to `null` is treated as **not yet supplied** and is hidden on the site, so nothing invented is
ever shown. In development, content that still needs confirming shows a red dashed **"To confirm"** tag.

## Replacing photos

Product photos live in `public/images/products/`. To upgrade a photo, replace the file **using the same
filename** (e.g. `jibby-foods-guinea-corn-pap-powder-pack.jpg`) and update its `width`/`height` in
`products.ts`. Next.js automatically serves optimised AVIF/WebP at the right size.

Recommended: at least 1600 px tall, pack facing the camera, plain light background, daylight.

## Adding a product

Copy an entry in `src/content/products.ts`, change the values, add its photo. The catalogue, product page,
sitemap and structured data pick it up automatically. Its grain artwork style is set in `src/lib/grain.ts`.

## Logo

`src/components/ui/Logo.tsx` currently uses an interim typographic version of the JF mark. Supply the
official logo (SVG preferred) and it will replace this.
