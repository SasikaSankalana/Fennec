-- DropForeignKey
ALTER TABLE "user_promotion_events" DROP CONSTRAINT "user_promotion_events_clubNightId_fkey";

-- DropForeignKey
ALTER TABLE "user_promotion_events" DROP CONSTRAINT "user_promotion_events_eventId_fkey";

-- AlterTable
ALTER TABLE "user_promotion_events" ALTER COLUMN "eventId" DROP NOT NULL,
ALTER COLUMN "clubNightId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE SET NULL ON UPDATE CASCADE;
