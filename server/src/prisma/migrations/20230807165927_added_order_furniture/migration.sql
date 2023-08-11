-- CreateTable
CREATE TABLE "OrderedFurniture" (
    "id" SERIAL NOT NULL,
    "furnitureId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "quintity" INTEGER NOT NULL,

    CONSTRAINT "OrderedFurniture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderedFurniture" ADD CONSTRAINT "OrderedFurniture_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedFurniture" ADD CONSTRAINT "OrderedFurniture_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
