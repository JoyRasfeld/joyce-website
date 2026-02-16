# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (Next.js + Turbopack on port 3000)
npm run build            # Build for production (runs prisma generate first)
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier format
npm run format:check     # Prettier check

# Database
npm run db:start         # Start local PostgreSQL
npm run db:stop          # Stop local PostgreSQL
npm run db:migrate       # Run Prisma migrations (npx prisma migrate dev)
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Stripe (local webhook testing)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the whsec_ secret into STRIPE_WEBHOOK_SECRET in .env, restart dev server
```

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Prisma** with PostgreSQL for data persistence
- **TailwindCSS 4** with oklch color tokens and shadcn/ui (new-york style)
- **Stripe** for checkout and payment processing
- **Cloudinary** for image hosting and user uploads
- **Resend** for contact form and order notification emails
- **Zod** for schema validation (forms + API routes)
- **react-hook-form** for form state management
- Deployed on **Vercel** with `@vercel/analytics` and `@vercel/og`

## Architecture

**Data flow:** Client components use `useArtwork` hook → fetches `/api/artwork` → Prisma queries PostgreSQL.

**Shop cart flow:**

1. User configures product on `/shop/[productSlug]` (uploads images to Cloudinary via `/api/upload`), clicks "Add to Cart"
2. `ProductForm` adds item to cart context (localStorage-backed, no DB cart)
3. User reviews cart on `/cart`, enters contact info, clicks "Proceed to Checkout"
4. `POST /api/orders` creates Order + OrderItems (status: DRAFT), creates Stripe Checkout Session with multiple line items, returns checkout URL
5. Order marked PENDING_PAYMENT, user redirected to Stripe
6. Stripe webhook (`/api/webhooks/stripe`) handles `checkout.session.completed` → marks order PAID, sends notification email via Resend
7. User redirected to `/shop/success/[orderId]` which verifies PAID status, clears cart, shows confirmation

**Cart state:** Client-side only via React Context + localStorage (`joyce-cart` key). `CartProvider` wraps the app in `layout.tsx`. No auth/DB cart — acceptable for custom art pieces ordered in a single session.

**Feature flag:** Shop pages are gated by `NEXT_PUBLIC_SHOP_ENABLED` env var. Check `src/lib/shop.ts` — pages redirect to home when disabled.

**Structured data:** JSON-LD schemas for SEO are generated in `src/lib/structured-data.ts` and applied in layouts/pages.

**Images:** All artwork images are hosted on Cloudinary (`res.cloudinary.com`), configured as a remote pattern in `next.config.ts`.

## Prisma Models

- **Artwork** — title, medium, dimensions, price, imageUrl, category, available, completedAt
- **Order** — customer info (name, email, phone), shipping address, amount (total cents), Stripe session/payment IDs, status (DRAFT → PENDING_PAYMENT → PAID), has many OrderItems
- **OrderItem** — productType (enum), quantity, notes, imageUrls, unitPrice (line total cents), belongs to Order

After modifying `prisma/schema.prisma`, run `npx prisma generate` to update the client and `npx prisma migrate dev` to create a migration.

## Key Paths

- `src/app/` — Pages and API routes (App Router)
- `src/app/api/orders/` — Order creation and management
- `src/app/api/webhooks/stripe/` — Stripe webhook handler
- `src/app/api/upload/` — Cloudinary image upload
- `src/app/shop/` — Shop pages (product, success)
- `src/app/cart/` — Cart page (items, customer form, checkout)
- `src/components/ui/` — shadcn/ui components
- `src/components/` — App components (header, footer, contact-form, product-form, image-upload, quantity-selector, order-summary, clear-cart, artwork-card)
- `src/context/cart-context.tsx` — CartProvider, useCart hook, localStorage sync
- `src/lib/prisma.ts` — Prisma client singleton
- `src/lib/stripe.ts` — Stripe client singleton
- `src/lib/order.ts` — Order CRUD and status transitions
- `src/lib/products.ts` — Product catalog and pricing logic
- `src/lib/shop.ts` — Shop feature flag
- `src/lib/cloudinary.ts` — Cloudinary upload utility
- `src/lib/structured-data.ts` — JSON-LD schema generators
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/types/artwork.ts` — Artwork type definition
- `src/types/order.ts` — Order Zod schemas and types
- `prisma/schema.prisma` — Database schema

## Environment Variables

Requires: `DATABASE_URL`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SHOP_ENABLED`. See `.env.example`.

For local development, set `NEXT_PUBLIC_SITE_URL="http://localhost:3000"` so Stripe redirects back to localhost after checkout.

## Style Conventions

- Path alias: `@/*` maps to `src/*`
- Prettier: single quotes, no arrow parens, 80-char width
- Custom oklch color tokens defined in `src/app/globals.css` (earth-brown, earth-green, peach)
- Font: Playfair Display for display typography (set as default via `--font-sans` CSS variable)
