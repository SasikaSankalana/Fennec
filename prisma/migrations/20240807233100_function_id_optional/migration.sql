-- DropForeignKey
ALTER TABLE "ticket_tiers" DROP CONSTRAINT "ticket_tiers_clubNightId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_tiers" DROP CONSTRAINT "ticket_tiers_eventId_fkey";

-- AlterTable
ALTER TABLE "ticket_tiers" ALTER COLUMN "eventId" DROP NOT NULL,
ALTER COLUMN "clubNightId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_tiers" ADD CONSTRAINT "ticket_tiers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_tiers" ADD CONSTRAINT "ticket_tiers_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE SET NULL ON UPDATE CASCADE;
