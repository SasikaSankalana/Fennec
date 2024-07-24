/*
  Warnings:

  - You are about to drop the column `clubId` on the `club_locations` table. All the data in the column will be lost.
  - Added the required column `clubLocationId` to the `clubs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "club_locations" DROP CONSTRAINT "club_locations_clubId_fkey";

-- AlterTable
ALTER TABLE "club_locations" DROP COLUMN "clubId";

-- AlterTable
ALTER TABLE "clubs" ADD COLUMN     "clubLocationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_clubLocationId_fkey" FOREIGN KEY ("clubLocationId") REFERENCES "club_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
