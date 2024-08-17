/*
  Warnings:

  - You are about to drop the column `ticketAddOnId` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `price` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_ticketAddOnId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_userId_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ticketAddOnId",
DROP COLUMN "total",
DROP COLUMN "userId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reservationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationAddOns" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reservationId" TEXT NOT NULL,
    "ticketAddOnId" TEXT NOT NULL,

    CONSTRAINT "ReservationAddOns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationAddOns" ADD CONSTRAINT "ReservationAddOns_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationAddOns" ADD CONSTRAINT "ReservationAddOns_ticketAddOnId_fkey" FOREIGN KEY ("ticketAddOnId") REFERENCES "ticket_add_ons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
