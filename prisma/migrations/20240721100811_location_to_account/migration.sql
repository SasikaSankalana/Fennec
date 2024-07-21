/*
  Warnings:

  - You are about to drop the column `userId` on the `UserLocation` table. All the data in the column will be lost.
  - Added the required column `userAccountId` to the `UserLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserLocation" DROP CONSTRAINT "UserLocation_userId_fkey";

-- AlterTable
ALTER TABLE "UserLocation" DROP COLUMN "userId",
ADD COLUMN     "userAccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
