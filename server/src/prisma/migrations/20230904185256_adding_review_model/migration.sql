-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "reviewId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "furnitureId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
