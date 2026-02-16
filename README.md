# Joyce Art Studio

Portfolio and custom order website for Joyce Art Studio built with Next.js 16.

## Features

- **Portfolio** — Filterable gallery of artwork loaded from PostgreSQL
- **Shop** — Cart-based custom order flow for miniature houses, animal magnets, and framed houses with image uploads, multi-item Stripe checkout, and order confirmation emails
- **Contact** — Contact form powered by Resend
- **SEO** — JSON-LD structured data, Open Graph images, and meta tags

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Prisma** with PostgreSQL
- **TailwindCSS 4** with oklch color tokens and shadcn/ui
- **Stripe** for payments
- **Cloudinary** for image hosting and uploads
- **Resend** for transactional emails
- **Zod** + **react-hook-form** for validation
- Deployed on **Vercel**

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Fill in values for `DATABASE_URL`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `NEXT_PUBLIC_SITE_URL`. Set `NEXT_PUBLIC_SHOP_ENABLED="true"` to enable the shop.

3. **Set up the database:**

   ```bash
   npm run db:start       # Start local PostgreSQL
   npx prisma generate
   npx prisma migrate dev
   npm run db:seed         # Optional: seed with sample data
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Testing Stripe Webhooks Locally

The shop checkout flow requires Stripe webhooks to mark orders as paid. To test this locally:

1. **Install the Stripe CLI:**

   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Other platforms: https://docs.stripe.com/stripe-cli
   ```

2. **Log in to your Stripe account:**

   ```bash
   stripe login
   ```

3. **Forward webhook events to your local server:**

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook signing secret** printed by the CLI (starts with `whsec_`) and set it as `STRIPE_WEBHOOK_SECRET` in your `.env` file. Restart your dev server.

5. **Place a test order** through the shop. The CLI will forward Stripe events to your local endpoint and you should see `[200]` responses.

> **Note:** The CLI generates a new signing secret each time you run `stripe listen`. Update your `.env` if you restart it.

## Scripts

```bash
npm run dev              # Start dev server (Turbopack, port 3000)
npm run build            # Production build (runs prisma generate first)
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier format
npm run format:check     # Prettier check

# Database
npm run db:start         # Start local PostgreSQL
npm run db:stop          # Stop local PostgreSQL
npm run db:migrate       # Run Prisma migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
```

## Project Structure

```
src/
  app/                   # Pages and API routes (App Router)
    api/
      artwork/           # GET artwork listings
      contact/           # POST contact form
      orders/            # POST create order, GET order by ID
      upload/            # POST image upload to Cloudinary
      webhooks/stripe/   # POST Stripe webhook handler
    shop/                # Shop pages (product, success)
    cart/                # Cart page (items, customer form, checkout)
    portfolio/           # Portfolio gallery
    about/               # About page
    contact/             # Contact page
  components/            # React components
    ui/                  # shadcn/ui primitives
  context/               # React context providers (cart)
  lib/                   # Utilities (prisma, stripe, cloudinary, orders, products, shop)
  types/                 # TypeScript types and Zod schemas
prisma/
  schema.prisma          # Database schema (Artwork, Order, OrderItem)
```

## Environment Variables

See `.env.example` for full descriptions. Required:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `RESEND_API_KEY` | Resend API key for emails |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_SITE_URL` | Site URL for redirects (use `http://localhost:3000` locally) |
| `NEXT_PUBLIC_SHOP_ENABLED` | Set to `"true"` to enable the shop |
