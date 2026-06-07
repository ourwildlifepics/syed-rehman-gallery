# OurWildlifePics

Custom fine-art wildlife photography site for Syed Rehman.

## Current Phase

- Custom website frontend is running locally.
- Sanity schema is prepared for galleries and artworks.
- Shopify is intentionally inactive. Shop actions show "Coming soon".

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Connect Sanity

1. Create a Sanity project.
2. Copy `.env.example` to `.env`.
3. Add your Sanity project ID and dataset.
4. Add matching Studio env vars in the same `.env` file.
5. Run the website and the Studio in separate terminals:

```bash
npm run dev
npm run studio
```

Website: `http://localhost:5173`

Studio: `http://localhost:3333`

## Content Model

- `Site Settings`: homepage image, name, signature font.
- `Gallery`: title, slug, cover image, display order, artworks.
- `Artwork`: image, title, description, location, year, future Shopify handle.

## Shopify Later

When ecommerce is ready:

- Each artwork becomes a Shopify product.
- Each print size becomes a product variant.
- Variant inventory tracks edition limits.
- Existing "Coming soon" buttons become real product/checkout links.
