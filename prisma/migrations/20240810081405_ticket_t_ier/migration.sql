/*
  Warnings:

  - You are about to drop the column `ticketTypeId` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `ticketTierId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_ticketTypeId_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ticketTypeId",
ADD COLUMN     "ticketTierId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketTierId_fkey" FOREIGN KEY ("ticketTierId") REFERENCES "ticket_tiers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
