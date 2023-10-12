-- CreateTable
CREATE TABLE "CartFurniture" (
    "id" SERIAL NOT NULL,
    "furnitureId" INTEGER NOT NULL,

    CONSTRAINT "CartFurniture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartFurniture" ADD CONSTRAINT "CartFurniture_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
