/*
  Warnings:

  - You are about to drop the column `ImageUrl` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnails` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Furniture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[photoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Furniture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Furniture" DROP COLUMN "ImageUrl",
DROP COLUMN "image",
DROP COLUMN "thumbnails",
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "photo",
ADD COLUMN     "photoId" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alternativeText" TEXT,
    "caption" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "furnitureId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_furnitureId_key" ON "Image"("furnitureId");

-- CreateIndex
CREATE UNIQUE INDEX "Furniture_imageId_key" ON "Furniture"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "User_photoId_key" ON "User"("photoId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Furniture" ADD CONSTRAINT "Furniture_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
