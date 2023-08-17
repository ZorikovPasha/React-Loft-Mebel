-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_photoId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "photoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
