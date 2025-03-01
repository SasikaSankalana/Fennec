/*
  Warnings:

  - You are about to drop the column `clubNightId` on the `user_promotion_events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_promotion_events" DROP CONSTRAINT "user_promotion_events_clubNightId_fkey";

-- AlterTable
ALTER TABLE "user_promotion_events" DROP COLUMN "clubNightId";
