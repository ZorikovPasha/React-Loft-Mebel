/*
  Warnings:

  - You are about to drop the column `cartId` on the `OrderedFurniture` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `OrderedFurniture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderedFurniture" DROP CONSTRAINT "OrderedFurniture_cartId_fkey";

-- AlterTable
ALTER TABLE "OrderedFurniture" DROP COLUMN "cartId",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderedFurniture" ADD CONSTRAINT "OrderedFurniture_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
