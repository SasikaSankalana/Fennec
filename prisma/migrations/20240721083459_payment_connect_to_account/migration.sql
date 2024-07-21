/*
  Warnings:

  - You are about to drop the column `userId` on the `payment_details` table. All the data in the column will be lost.
  - Added the required column `userAccountId` to the `payment_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment_details" DROP CONSTRAINT "payment_details_userId_fkey";

-- AlterTable
ALTER TABLE "payment_details" DROP COLUMN "userId",
ADD COLUMN     "userAccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
