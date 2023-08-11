/*
  Warnings:

  - You are about to drop the column `furnitureId` on the `Image` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Image_furnitureId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "furnitureId";
