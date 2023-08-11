/*
  Warnings:

  - You are about to drop the column `quintity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `quintity` to the `CartFurniture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartFurniture" ADD COLUMN     "quintity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quintity";
