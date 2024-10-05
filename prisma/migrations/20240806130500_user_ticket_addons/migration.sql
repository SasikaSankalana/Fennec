/*
  Warnings:

  - You are about to drop the column `ticketAddOnId` on the `user_tickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_tickets" DROP CONSTRAINT "user_tickets_ticketAddOnId_fkey";

-- AlterTable
ALTER TABLE "user_tickets" DROP COLUMN "ticketAddOnId";

-- CreateTable
CREATE TABLE "UserTicketAddOn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ticketAddOnId" TEXT NOT NULL,
    "userTicketId" TEXT NOT NULL,

    CONSTRAINT "UserTicketAddOn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTicketAddOn" ADD CONSTRAINT "UserTicketAddOn_ticketAddOnId_fkey" FOREIGN KEY ("ticketAddOnId") REFERENCES "ticket_add_ons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicketAddOn" ADD CONSTRAINT "UserTicketAddOn_userTicketId_fkey" FOREIGN KEY ("userTicketId") REFERENCES "user_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
