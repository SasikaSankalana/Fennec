/*
  Warnings:

  - You are about to drop the column `userId` on the `UserLocation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `onboardings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `payment_details` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_promotion_events` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_accounts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `UserLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `onboardings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `payment_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_promotion_events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserLocation" DROP CONSTRAINT "UserLocation_userId_fkey";

-- DropForeignKey
ALTER TABLE "clubs" DROP CONSTRAINT "clubs_clubOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "onboardings" DROP CONSTRAINT "onboardings_userId_fkey";

-- DropForeignKey
ALTER TABLE "payment_details" DROP CONSTRAINT "payment_details_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_promotion_events" DROP CONSTRAINT "user_promotion_events_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_tickets" DROP CONSTRAINT "user_tickets_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userId_fkey";

-- AlterTable
ALTER TABLE "UserLocation" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "onboardings" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment_details" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_promotion_events" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_tickets" DROP COLUMN "userId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "user_accounts";

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_clubOwnerId_fkey" FOREIGN KEY ("clubOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "user_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
