-- DropForeignKey
ALTER TABLE "clubs" DROP CONSTRAINT "clubs_clubLocationId_fkey";

-- AlterTable
ALTER TABLE "clubs" ALTER COLUMN "clubLocationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_clubLocationId_fkey" FOREIGN KEY ("clubLocationId") REFERENCES "club_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
