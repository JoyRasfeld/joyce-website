-- CreateTable (order_items)
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productType" "public"."ProductType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "imageUrls" TEXT[],
    "unitPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "public"."order_items"("orderId");

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrate existing order data into order_items
INSERT INTO "public"."order_items" ("id", "orderId", "productType", "quantity", "notes", "imageUrls", "unitPrice", "createdAt")
SELECT
    gen_random_uuid()::text,
    "id",
    "productType",
    "quantity",
    "notes",
    "imageUrls",
    "amount",
    "createdAt"
FROM "public"."orders"
WHERE "productType" IS NOT NULL;

-- Update CONFIRMED orders to PAID (PAID is now the terminal success state)
UPDATE "public"."orders" SET "status" = 'PAID' WHERE "status" = 'CONFIRMED';

-- AlterEnum: Remove CONFIRMED from OrderStatus
BEGIN;
CREATE TYPE "public"."OrderStatus_new" AS ENUM ('DRAFT', 'PENDING_PAYMENT', 'PAID', 'CANCELLED');
ALTER TABLE "public"."orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."orders" ALTER COLUMN "status" TYPE "public"."OrderStatus_new" USING ("status"::text::"public"."OrderStatus_new");
ALTER TYPE "public"."OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "public"."OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "public"."orders" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- Drop migrated columns from orders
ALTER TABLE "public"."orders" DROP COLUMN "imageUrls",
DROP COLUMN "notes",
DROP COLUMN "productType",
DROP COLUMN "quantity";
