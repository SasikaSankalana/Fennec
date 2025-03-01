/*
  Warnings:

  - You are about to drop the column `ticketId` on the `ticket_add_ons` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `ticket_types` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `clubNightId` to the `ticket_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `ticket_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketTypeId` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketAddOnId` to the `user_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket_add_ons" DROP CONSTRAINT "ticket_add_ons_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_types" DROP CONSTRAINT "ticket_types_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_eventId_fkey";

-- AlterTable
ALTER TABLE "ticket_add_ons" DROP COLUMN "ticketId";

-- AlterTable
ALTER TABLE "ticket_types" DROP COLUMN "ticketId",
ADD COLUMN     "clubNightId" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "eventId",
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "ticketTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "ticketAddOnId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "club_nights" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "club_nights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "user_tickets_ticketAddOnId_fkey" FOREIGN KEY ("ticketAddOnId") REFERENCES "ticket_add_ons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_nights" ADD CONSTRAINT "club_nights_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
