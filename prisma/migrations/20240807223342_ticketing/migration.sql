/*
  Warnings:

  - You are about to drop the column `clubNightId` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the `UserTicketAddOn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_tickets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clubNightId` to the `ticket_add_ons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `ticket_add_ons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketAddOnId` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTicketAddOn" DROP CONSTRAINT "UserTicketAddOn_ticketAddOnId_fkey";

-- DropForeignKey
ALTER TABLE "UserTicketAddOn" DROP CONSTRAINT "UserTicketAddOn_userTicketId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_clubNightId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_eventId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "user_tickets" DROP CONSTRAINT "user_tickets_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "user_tickets" DROP CONSTRAINT "user_tickets_userId_fkey";

-- AlterTable
ALTER TABLE "ticket_add_ons" ADD COLUMN     "clubNightId" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "clubNightId",
DROP COLUMN "eventId",
DROP COLUMN "eventType",
ADD COLUMN     "ticketAddOnId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserTicketAddOn";

-- DropTable
DROP TABLE "ticket_types";

-- DropTable
DROP TABLE "user_tickets";

-- CreateTable
CREATE TABLE "ticket_tiers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currentQuantity" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "eventId" TEXT NOT NULL,
    "clubNightId" TEXT NOT NULL,

    CONSTRAINT "ticket_tiers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketAddOnId_fkey" FOREIGN KEY ("ticketAddOnId") REFERENCES "ticket_add_ons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_tiers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_add_ons" ADD CONSTRAINT "ticket_add_ons_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_add_ons" ADD CONSTRAINT "ticket_add_ons_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_tiers" ADD CONSTRAINT "ticket_tiers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_tiers" ADD CONSTRAINT "ticket_tiers_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
