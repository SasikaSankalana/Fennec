/*
  Warnings:

  - You are about to drop the column `status` on the `friend_requests` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "splitType" AS ENUM ('EQUALLY', 'UNEQUALLY', 'BYPERCENTAGE');

-- AlterTable
ALTER TABLE "friend_requests" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripeCustomerId" TEXT;

-- DropEnum
DROP TYPE "FriendRequestStatus";

-- CreateTable
CREATE TABLE "split_groups" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "split_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "split_group_members" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "splitGroupId" TEXT NOT NULL,

    CONSTRAINT "split_group_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "split_payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentType" TEXT NOT NULL,
    "splitType" "splitType" NOT NULL,
    "splitGroupId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "split_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "split_payment_users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "splitPaymentId" TEXT NOT NULL,

    CONSTRAINT "split_payment_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "split_groups" ADD CONSTRAINT "split_groups_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "split_group_members" ADD CONSTRAINT "split_group_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "split_group_members" ADD CONSTRAINT "split_group_members_splitGroupId_fkey" FOREIGN KEY ("splitGroupId") REFERENCES "split_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "split_payments" ADD CONSTRAINT "split_payments_splitGroupId_fkey" FOREIGN KEY ("splitGroupId") REFERENCES "split_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "split_payments" ADD CONSTRAINT "split_payments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "split_payment_users" ADD CONSTRAINT "split_payment_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "split_payment_users" ADD CONSTRAINT "split_payment_users_splitPaymentId_fkey" FOREIGN KEY ("splitPaymentId") REFERENCES "split_payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
