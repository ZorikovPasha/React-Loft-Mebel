/*
  Warnings:

  - Added the required column `furnitureId` to the `FavoriteFurniture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteFurniture" ADD COLUMN     "furnitureId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "house" DROP NOT NULL,
ALTER COLUMN "apartment" DROP NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FavoriteFurniture" ADD CONSTRAINT "FavoriteFurniture_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
