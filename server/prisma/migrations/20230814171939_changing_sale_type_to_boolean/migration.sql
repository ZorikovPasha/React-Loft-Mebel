/*
  Warnings:

  - Changed the type of `sale` on the `Furniture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Furniture" DROP COLUMN "sale",
ADD COLUMN     "sale" BOOLEAN NOT NULL;
