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
```

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Prisma** with PostgreSQL for data persistence
- **TailwindCSS 4** with oklch color tokens and shadcn/ui (new-york style)
- **Resend** for contact form emails
- **Zod** for schema validation (forms + API routes)
- **react-hook-form** for form state management
- Deployed on **Vercel** with `@vercel/analytics` and `@vercel/og`

## Architecture

**Data flow:** Client components use `useArtwork` hook → fetches `/api/artwork` → Prisma queries PostgreSQL. The single Prisma model is `Artwork` (title, medium, dimensions, price, imageUrl, category, available, completedAt).

**Feature flag:** Shop/checkout pages are gated by `SHOP_ENABLED` env var. Check `src/lib/shop.ts` — pages redirect to home when disabled.

**Structured data:** JSON-LD schemas for SEO are generated in `src/lib/structured-data.ts` and applied in layouts/pages.

**Images:** All artwork images are hosted on Cloudinary (`res.cloudinary.com`), configured as a remote pattern in `next.config.ts`.

## Key Paths

- `src/app/` — Pages and API routes (App Router)
- `src/components/ui/` — shadcn/ui components
- `src/lib/prisma.ts` — Prisma client singleton
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/types/artwork.ts` — Artwork type definition
- `prisma/schema.prisma` — Database schema

## Environment Variables

Requires `DATABASE_URL`, `RESEND_API_KEY`, `SHOP_ENABLED`, `NEXT_PUBLIC_SITE_URL`. See `.env.example`.

## Style Conventions

- Path alias: `@/*` maps to `src/*`
- Prettier: single quotes, no arrow parens, 80-char width
- Custom oklch color tokens defined in `src/app/globals.css` (earth-brown, earth-green, peach)
- Font: Playfair Display for display typography
