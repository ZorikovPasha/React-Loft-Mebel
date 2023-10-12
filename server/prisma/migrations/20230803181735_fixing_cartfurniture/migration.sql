/*
  Warnings:

  - Added the required column `orderId` to the `CartFurniture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartFurniture" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartFurniture" ADD CONSTRAINT "CartFurniture_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
