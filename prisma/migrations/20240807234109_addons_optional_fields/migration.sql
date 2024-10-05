-- DropForeignKey
ALTER TABLE "ticket_add_ons" DROP CONSTRAINT "ticket_add_ons_clubNightId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_add_ons" DROP CONSTRAINT "ticket_add_ons_eventId_fkey";

-- AlterTable
ALTER TABLE "ticket_add_ons" ALTER COLUMN "clubNightId" DROP NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_add_ons" ADD CONSTRAINT "ticket_add_ons_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_add_ons" ADD CONSTRAINT "ticket_add_ons_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE SET NULL ON UPDATE CASCADE;
