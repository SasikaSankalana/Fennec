/*
  Warnings:

  - Added the required column `clubNightId` to the `user_promotion_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_promotion_events" ADD COLUMN     "clubNightId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
