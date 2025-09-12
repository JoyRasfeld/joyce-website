-- AlterTable
ALTER TABLE "public"."artworks" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "public"."artworks" ADD COLUMN "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
