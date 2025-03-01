/*
  Warnings:

  - Made the column `clubLocationId` on table `clubs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "clubs" DROP CONSTRAINT "clubs_clubLocationId_fkey";

-- AlterTable
ALTER TABLE "clubs" ALTER COLUMN "clubLocationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_clubLocationId_fkey" FOREIGN KEY ("clubLocationId") REFERENCES "club_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
