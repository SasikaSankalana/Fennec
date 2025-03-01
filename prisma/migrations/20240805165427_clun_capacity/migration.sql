/*
  Warnings:

  - You are about to drop the column `clubNightId` on the `ticket_types` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `ticket_types` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `clubs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubNightId` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket_types" DROP CONSTRAINT "ticket_types_clubNightId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_types" DROP CONSTRAINT "ticket_types_eventId_fkey";

-- AlterTable
ALTER TABLE "clubs" ADD COLUMN     "capacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket_types" DROP COLUMN "clubNightId",
DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "clubNightId" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
